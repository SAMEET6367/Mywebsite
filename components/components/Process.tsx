import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    step: "01",
    title: "We discuss your idea",
    text: "We talk through what your business needs, who your visitors are, and what the site has to do for you.",
  },
  {
    step: "02",
    title: "I design the layout",
    text: "I put together a layout and visual direction so you can see the shape of the site before any code is written.",
  },
  {
    step: "03",
    title: "I build the website",
    text: "I develop the site with clean, responsive code — checking it against real devices as I go, not just at the end.",
  },
  {
    step: "04",
    title: "Review and revisions",
    text: "You review the working site and I make the adjustments needed until it feels right.",
  },
  {
    step: "05",
    title: "Final delivery",
    text: "You get a finished, launch-ready website, along with anything you need to keep it running.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How we'd work together"
            title="A simple, five-step process from idea to launch."
          />
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-px bg-ink-700 sm:block" />
          <div className="space-y-10">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <div className="flex gap-6">
                  <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-ink-700 bg-ink-900 font-mono text-sm font-medium text-violet-bright">
                    {s.step}
                  </div>
                  <div className="flex-1 rounded-xl2 border border-ink-700 bg-ink-900/50 p-6">
                    <p className="font-display text-lg font-semibold text-paper">
                      {s.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-fog">
                      {s.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
