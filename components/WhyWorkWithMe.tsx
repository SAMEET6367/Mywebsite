import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const BENEFITS = [
  {
    title: "Responsive by default",
    text: "Every site is built to work on phones, tablets, and desktops from day one — not patched afterward.",
  },
  {
    title: "Modern UI",
    text: "Clean layouts, thoughtful spacing, and typography that make your business look current and credible.",
  },
  {
    title: "Fast performance",
    text: "Lightweight, optimized builds so your site loads quickly — for visitors and for search engines.",
  },
  {
    title: "Clean code",
    text: "Organized, reusable components that are easy to maintain or hand off to another developer later.",
  },
  {
    title: "Easy communication",
    text: "Clear updates at every step, in plain language — no jargon, no guessing where things stand.",
  },
  {
    title: "Attention to detail",
    text: "Alignment, contrast, spacing, states — the small things that separate a good site from a great one.",
  },
];

export function WhyWorkWithMe() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why work with me"
            title="Everything you'd want from a developer, without the overhead."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} delay={(i % 3) * 100}>
              <div className="h-full rounded-xl2 border border-ink-700 bg-ink-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-bright/50 hover:shadow-glow">
                <div className="mb-4 h-8 w-8 rounded-full bg-gradient-to-br from-violet to-cyan" />
                <p className="font-display text-lg font-semibold text-paper">
                  {benefit.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fog">
                  {benefit.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
