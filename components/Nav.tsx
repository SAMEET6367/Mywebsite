"use client";

import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Container } from "@/components/ui/Primitives";
import { createClient } from "@/lib/supabase/client";

const LINKEDIN = "https://www.linkedin.com/in/sameet-ahmed-262833304/";
const RESUME_PATH = "/resume/Sameet Ahmed Resume.pdf";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
];

function initialsFor(user: User) {
  const name = (user.user_metadata?.full_name as string) || user.email || "?";
  return name.trim().charAt(0).toUpperCase();
}

function nameFor(user: User) {
  return (user.user_metadata?.full_name as string) || user.email || "Account";
}

// Shown when logged out: Log in / Sign up, visually set apart from the
// regular nav links and the "Let's talk" / resume buttons — a distinct
// auth section, the way most sites separate account actions from the
// main menu.
function AuthLinks() {
  return (
    <div className="flex items-center gap-3 border-l border-ink-700 pl-4">
      <a
        href="/login"
        className="text-sm text-fog transition-colors hover:text-paper"
      >
        Log in
      </a>
      <a
        href="/signup"
        className="rounded-full border border-ink-700 px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-900"
      >
        Sign up
      </a>
    </div>
  );
}

// Shown when logged in: an avatar + name that opens a small dropdown with
// the account tab and logout — replaces Log in / Sign up entirely.
function UserMenu({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div ref={menuRef} className="relative border-l border-ink-700 pl-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-ink-700 py-1 pl-1 pr-3 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-900"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan text-xs font-semibold text-ink-950">
          {initialsFor(user)}
        </span>
        {nameFor(user)}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl2 border border-ink-700 bg-ink-900/95 p-2 shadow-soft backdrop-blur-sm">
          <div className="border-b border-ink-700 px-3 py-2">
            <p className="truncate text-sm font-medium text-paper">
              {nameFor(user)}
            </p>
            <p className="truncate text-xs text-fog">{user.email}</p>
          </div>
          <a
            href="/account"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-lg px-3 py-2 text-sm text-fog transition-colors hover:bg-ink-800 hover:text-paper"
          >
            Account
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-fog transition-colors hover:bg-ink-800 hover:text-paper"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      // Supabase isn't configured yet (no env vars) — just show the
      // logged-out state instead of crashing the whole nav.
      setAuthLoaded(true);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setAuthLoaded(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/70 bg-ink-950/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="/#top" className="font-display text-lg font-semibold text-paper">
          sameetonline@outlook.com<span className="text-violet-bright">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-fog transition-colors hover:text-paper">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-fog transition-colors hover:text-paper">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
            </svg>
          </a>
          <a href="/#contact" className="rounded-full border border-ink-700 px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-900">
            Let's talk
          </a>
          <a href={RESUME_PATH} download className="rounded-full border border-ink-700 px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-900">
            Download my Resume
          </a>

          {authLoaded && (user ? <UserMenu user={user} /> : <AuthLinks />)}
        </div>

        <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-paper md:hidden">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-ink-700/70 bg-ink-950/95 backdrop-blur-md md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base text-fog transition-colors hover:bg-ink-900 hover:text-paper">
                {link.label}
              </a>
            ))}
            <a href={LINKEDIN} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base text-fog transition-colors hover:bg-ink-900 hover:text-paper">
              LinkedIn
            </a>
            <a href={RESUME_PATH} download onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base text-fog transition-colors hover:bg-ink-900 hover:text-paper">
              Download my Resume
            </a>

            <div className="mt-2 border-t border-ink-700 pt-3">
              {user ? (
                <>
                  <div className="px-2 pb-2">
                    <p className="truncate text-sm font-medium text-paper">{nameFor(user)}</p>
                    <p className="truncate text-xs text-fog">{user.email}</p>
                  </div>
                  <a href="/account" onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-base text-fog transition-colors hover:bg-ink-900 hover:text-paper">
                    Account
                  </a>
                  <button
                    type="button"
                    onClick={async () => {
                      const supabase = createClient();
                      await supabase.auth.signOut();
                      window.location.href = "/";
                    }}
                    className="block w-full rounded-lg px-2 py-3 text-left text-base text-fog transition-colors hover:bg-ink-900 hover:text-paper"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-base text-fog transition-colors hover:bg-ink-900 hover:text-paper">
                    Log in
                  </a>
                  <a href="/signup" onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-base text-fog transition-colors hover:bg-ink-900 hover:text-paper">
                    Sign up
                  </a>
                </>
              )}
            </div>

            <a href="/#contact" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-gradient-to-r from-violet to-cyan px-4 py-3 text-center text-sm font-medium text-ink-950">
              Let's talk
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
