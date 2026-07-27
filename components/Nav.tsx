import { Container } from "@/components/ui/Primitives";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/70 bg-ink-950/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg font-semibold text-paper">
          Sameet<span className="text-violet-bright">.</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-fog transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-ink-700 px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-900"
        >
          Let&apos;s talk
        </a>
      </Container>
    </header>
  );
}
