"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { CONTACT_CARD_MARKER } from "@/lib/chatbot-persona";
import { EMAIL, LINKEDIN, WHATSAPP } from "@/lib/contact-links";

type ChatMessage = {
  role: "user" | "model";
  text: string;
  showContactCard?: boolean;
};

const GREETING: ChatMessage = {
  role: "model",
  text:
    "Hey, I'm Sam — Sameet's AI Assistant 👋 Ask me about his background, the tech behind this site, or what he could build for your project.",
};

// How long to wait before the "talk to me" bubble first appears, and how
// long it stays up before auto-hiding if ignored.
const TOOLTIP_DELAY_MS = 2000;
const TOOLTIP_AUTOHIDE_MS = 7000;
const TOOLTIP_DISMISSED_KEY = "sameetai_tooltip_dismissed";

// Chat history persists across refreshes (localStorage, not sessionStorage)
// so it survives closing/reopening the tab too. Cleared only by "New chat".
const HISTORY_KEY = "sameetai_chat_history";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load any saved conversation once, on mount (client-side only —
  // localStorage doesn't exist during server rendering).
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(HISTORY_KEY);
      if (saved) {
        const parsed: ChatMessage[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Corrupt/unreadable saved state — just fall back to the greeting.
    } finally {
      setHasLoadedHistory(true);
    }
  }, []);

  // Persist every change so a refresh (or reopening the tab) picks the
  // conversation back up. Skipped until the initial load above has run,
  // so we don't overwrite saved history with the default greeting first.
  useEffect(() => {
    if (!hasLoadedHistory || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
    } catch {
      // Storage full or unavailable (e.g. private browsing) — non-fatal.
    }
  }, [messages, hasLoadedHistory]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  // Keep the input focused while the panel is open, so the visitor can
  // start typing straight away and after each reply — without forcing
  // focus back if they've deliberately clicked elsewhere on the page.
  useEffect(() => {
    if (isOpen && !isLoading) {
      inputRef.current?.focus();
    }
  }, [isOpen, isLoading]);

  // Show the attention-grabbing bubble once per visit (unless the visitor
  // already dismissed it earlier), then auto-hide it after a while.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(TOOLTIP_DISMISSED_KEY)) return;

    const showTimer = setTimeout(() => setShowTooltip(true), TOOLTIP_DELAY_MS);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showTooltip) return;
    const hideTimer = setTimeout(() => dismissTooltip(), TOOLTIP_AUTOHIDE_MS);
    return () => clearTimeout(hideTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTooltip]);

  function dismissTooltip() {
    setShowTooltip(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(TOOLTIP_DISMISSED_KEY, "1");
    }
  }

  function handleToggle() {
    setIsOpen((v) => !v);
    dismissTooltip();
  }

  function handleNewChat() {
    setMessages([GREETING]);
    setInput("");
    setError(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(HISTORY_KEY);
    }
  }

  function handleEndChat() {
    setIsOpen(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", text: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok || !data.reply) {
        setError(data.error ?? "Something went wrong. Try again.");
        return;
      }

      const showContactCard: boolean = data.reply.includes(CONTACT_CARD_MARKER);
      const cleanText: string = data.reply.replaceAll(CONTACT_CARD_MARKER, "").trim();

      setMessages((prev) => [
        ...prev,
        { role: "model", text: cleanText, showContactCard },
      ]);
    } catch {
      setError("Couldn't reach Sam. Check your connection and try again.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {/* Attention bubble */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex max-w-[220px] items-start gap-2 rounded-xl2 border border-ink-700 bg-ink-900 px-4 py-3 text-sm text-paper shadow-soft animate-fade-up">
          <p className="leading-snug">
            💬 Talk to <span className="font-semibold">Sam, Sameet&apos;s AI Assistant</span>
          </p>
          <button
            type="button"
            onClick={dismissTooltip}
            aria-label="Dismiss"
            className="shrink-0 text-fog transition-colors hover:text-paper"
          >
            <X size={14} />
          </button>
          {/* Little pointer nub aiming at the launcher button */}
          <span className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 border-b border-r border-ink-700 bg-ink-900" />
        </div>
      )}

      {/* Launcher button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isOpen ? "Close chat" : "Open chat with Sam"}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet to-cyan text-ink-950 shadow-glow transition-transform duration-300 hover:scale-105 ${
          showTooltip && !isOpen ? "animate-pulse" : ""
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[70vh] max-h-[560px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-xl2 border border-ink-700 bg-ink-900/95 shadow-soft backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-950/60 px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet to-cyan">
              <Sparkles size={16} className="text-ink-950" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-semibold text-paper">
                Sam · Sameet&apos;s AI Assistant
              </p>
              <p className="truncate text-xs text-fog">The AI version of me — ask away</p>
            </div>
            <button
              type="button"
              onClick={handleNewChat}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-fog transition-colors hover:bg-ink-800 hover:text-paper"
              title="Start a new chat"
            >
              <RotateCcw size={13} />
              New chat
            </button>
            <button
              type="button"
              onClick={handleEndChat}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-fog transition-colors hover:bg-ink-800 hover:text-paper"
              title="End chat"
            >
              <X size={13} />
              End chat
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-violet to-cyan text-ink-950"
                      : "border border-ink-700 bg-ink-950 text-paper"
                  }`}
                >
                  {m.text}
                </div>

                {m.showContactCard && (
                  <div className="mt-2 flex max-w-[85%] flex-wrap gap-2">
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-ink-700 bg-ink-950 px-3 py-1.5 text-xs text-paper transition-colors hover:border-violet-bright hover:text-violet-bright"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={LINKEDIN}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-ink-700 bg-ink-950 px-3 py-1.5 text-xs text-paper transition-colors hover:border-violet-bright hover:text-violet-bright"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="rounded-full border border-ink-700 bg-ink-950 px-3 py-1.5 text-xs text-paper transition-colors hover:border-violet-bright hover:text-violet-bright"
                    >
                      Email
                    </a>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-fog">
                  <Loader2 size={14} className="animate-spin" />
                  Thinking…
                </div>
              </div>
            )}

            {error && (
              <p className="text-center text-xs text-amber" role="status">
                {error}
              </p>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-ink-700 bg-ink-950/60 p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a project, my skills, or working together…"
              disabled={isLoading}
              className="flex-1 rounded-lg border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-paper placeholder:text-fog/60 focus:border-violet-bright disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-violet to-cyan text-ink-950 transition-transform duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
