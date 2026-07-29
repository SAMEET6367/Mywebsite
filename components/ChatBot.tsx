"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, RotateCcw } from "lucide-react";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

const GREETING: ChatMessage = {
  role: "model",
  text:
    "Hey, I'm the AI version of Sameet 👋 Ask me about my background, the tech behind this site, or what I could build for your project.",
};

// How long to wait before the "talk to me" bubble first appears, and how
// long it stays up before auto-hiding if ignored.
const TOOLTIP_DELAY_MS = 2000;
const TOOLTIP_AUTOHIDE_MS = 7000;
const TOOLTIP_DISMISSED_KEY = "sameetai_tooltip_dismissed";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

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

      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch {
      setError("Couldn't reach sameet.ai. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Attention bubble */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex max-w-[220px] items-start gap-2 rounded-xl2 border border-ink-700 bg-ink-900 px-4 py-3 text-sm text-paper shadow-soft animate-fade-up">
          <p className="leading-snug">
            💬 Talk to <span className="font-semibold">Sameet&apos;s AI version</span>
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
        aria-label={isOpen ? "Close chat" : "Open sameet.ai chat"}
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
              <p className="font-display text-sm font-semibold text-paper">sameet.ai</p>
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
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
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
