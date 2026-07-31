import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const PRINCIPLES = [
  {
    number: "01",
    label: "Simplicity first",
    text: "The best interface is the one a visitor never has to think about. I strip away anything that doesn't help someone understand your business faster.",
  },
  {
    number: "02",
    label: "Built to perform",
    text: "A beautiful site that loads slowly still loses customers. I build with performance in mind from the first component, not as an afterthought.",
  },
  {
    number: "03",
    label: "Made to be used",
    text: "Every layout is tested down to mobile, because that's where most of your visitors actually are.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="About me"
              title="I enjoy turning complex problems into simple, effective solutions through code and web development."
            />
            <p className="mt-6 text-base leading-relaxed text-fog sm:text-lg">
              Many businesses have great products or services, but their websites don't reflect their quality. 
              They're slow, cluttered, or built from generic templates that fail to stand out. I enjoy turning those ideas into fast,
               modern, and intuitive websites that clearly communicate a brand's value and create a great user experience.
            </p>
            <p className="mt-4 text-base leading-relaxed text-fog sm:text-lg">
              I'm still a Software Engineering student, which means I'm constantly learning new technologies, 
              improving my skills, and building better solutions. But the principles I bring to every project stay the same: 
              write clean code, pay attention to the details, keep the design simple, and build websites 
              that genuinely help businesses grow.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:gap-5">
            {PRINCIPLES.map((item, i) => (
              <Reveal key={item.label} delay={i * 100}>
                <div className="group relative overflow-hidden rounded-xl2 border border-ink-700 bg-ink-900/60 p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-bright/50 hover:shadow-lg sm:p-7">
                  <div className="pointer-events-none absolute -right-6 -top-6 font-display text-6xl font-bold text-ink-800/60 transition-colors duration-300 group-hover:text-violet-bright/10">
                    {item.number}
                  </div>
                  <p className="relative font-display text-lg font-semibold text-paper">
                    {item.label}
                  </p>
                  <p className="relative mt-3 text-sm leading-relaxed text-fog sm:text-base">
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