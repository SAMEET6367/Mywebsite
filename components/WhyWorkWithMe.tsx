import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Smartphone, Sparkles, Zap, Code2, MessageCircle, Eye } from "lucide-react";

const BENEFITS = [
  {
    icon: Smartphone,
    title: "Responsive by default",
    text: "Every site is built to work on phones, tablets, and desktops from day one — not patched afterward.",
  },
  {
    icon: Sparkles,
    title: "Modern UI",
    text: "Clean layouts, thoughtful spacing, and typography that make your business look current and credible.",
  },
  {
    icon: Zap,
    title: "Fast performance",
    text: "Lightweight, optimized builds so your site loads quickly — for visitors and for search engines.",
  },
  {
    icon: Code2,
    title: "Clean code",
    text: "Organized, reusable components that are easy to maintain or hand off to another developer later.",
  },
  {
    icon: MessageCircle,
    title: "Easy communication",
    text: "Clear updates at every step, in plain language — no jargon, no guessing where things stand.",
  },
  {
    icon: Eye,
    title: "Attention to detail",
    text: "Alignment, contrast, spacing, states — the small things that separate a good site from a great one.",
  },
];

export function WhyWorkWithMe() {
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why work with me"
            title="Everything you'd want from a developer, without the overhead."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={(i % 3) * 100}>
                <div className="group h-full rounded-xl2 border border-ink-700 bg-ink-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-bright/50 hover:shadow-glow sm:p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-ink-950" strokeWidth={2} />
                  </div>
                  <p className="font-display text-base font-semibold text-paper sm:text-lg">
                    {benefit.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fog">
                    {benefit.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}