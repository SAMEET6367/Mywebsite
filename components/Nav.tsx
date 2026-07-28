"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Primitives";

const LINKEDIN = "https://www.linkedin.com/in/sameet-ahmed-262833304/";
const RESUME_PATH = "/resume/Sameet Ahmed Resume.pdf";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/70 bg-ink-950/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg font-semibold text-paper">
          Sameet<span className="text-violet-bright">.</span>
        </a>
        <a href="#top" className="font-display text-lg font-semibold text-paper">
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
          <a href="#contact" className="rounded-full border border-ink-700 px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-900">
            Let's talk
          </a>
         <a href={RESUME_PATH} download className="rounded-full border border-ink-700 px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-900">
            Download my Resume
          </a>
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
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-gradient-to-r from-violet to-cyan px-4 py-3 text-center text-sm font-medium text-ink-950">
              Let's talk
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}