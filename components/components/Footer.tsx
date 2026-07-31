import { Container } from "@/components/ui/Primitives";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-700 py-12">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg font-semibold text-paper">
            Sameet<span className="text-violet-bright">.</span>
          </p>
          <p className="mt-1 text-sm text-fog">
            Building websites that make businesses look as good as they are.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
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

        <p className="text-xs text-fog">
          © {new Date().getFullYear()} Sameet Ahmed. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
