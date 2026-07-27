import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const PRINCIPLES = [
  {
    label: "Simplicity first",
    text: "The best interface is the one a visitor never has to think about. I strip away anything that doesn't help someone understand your business faster.",
  },
  {
    label: "Built to perform",
    text: "A beautiful site that loads slowly still loses customers. I build with performance in mind from the first component, not as an afterthought.",
  },
  {
    label: "Made to be used",
    text: "Every layout is tested down to mobile, because that's where most of your visitors actually are.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="About me"
              title="I got into software engineering because I like taking something messy and making it click."
            />
            <p className="mt-6 text-lg leading-relaxed text-fog">
              That's true of code, and it's true of websites. A lot of small
              businesses and startups have a great product but a website that
              doesn't say so — slow, cluttered, or built from a template that
              looks like everyone else's. I enjoy the process of fixing that:
              taking an idea and turning it into a site that's fast, clear, and
              genuinely nice to use.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-fog">
              I'm still a student, and I'm always learning — new tools, better
              patterns, cleaner ways to build. But the fundamentals I bring to
              every project don't change: pay attention to the details, keep
              the layout simple, and make sure the site actually helps the
              business behind it.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((item, i) => (
              <Reveal key={item.label} delay={i * 100}>
                <div className="h-full rounded-xl2 border border-ink-700 bg-ink-900/60 p-6 shadow-soft transition-colors hover:border-violet-bright/50">
                  <p className="font-display text-base font-semibold text-paper">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
