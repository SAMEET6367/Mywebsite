import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

// Placeholder testimonials — swap in real client quotes as they come in.
const TESTIMONIALS = [
  {
    quote:
      "Sameet took a vague idea and turned it into a landing page that actually looked like our brand. Communication was easy the whole way through.",
    name: "Client name",
    role: "Founder, Early-stage startup",
  },
  {
    quote:
      "The site loads instantly and looks great on mobile, which is where most of our customers find us. Exactly what we needed.",
    name: "Client name",
    role: "Owner, Local business",
  },
  {
    quote:
      "What stood out was the attention to detail — spacing, fonts, small animations. It felt like a much bigger agency built it.",
    name: "Client name",
    role: "Marketing lead, Small business",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What clients say"
            title="Placeholder feedback — ready to be replaced with the real thing."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-xl2 border border-ink-700 bg-ink-900/60 p-6">
                <blockquote className="flex-1 text-sm leading-relaxed text-fog">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-700 pt-4">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet/70 to-cyan/70" />
                  <div>
                    <p className="text-sm font-medium text-paper">{t.name}</p>
                    <p className="text-xs text-fog">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
