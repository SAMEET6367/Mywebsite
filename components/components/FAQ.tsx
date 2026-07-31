import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "How long does a landing page take?",
    a: "It depends on scope, but a typical single landing page takes about one to two weeks from our first conversation to final delivery, including revisions.",
  },
  {
    q: "Is it mobile responsive?",
    a: "Yes — every site I build is designed and tested for phones, tablets, and desktops from the start, not adjusted afterward.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. I can rebuild an existing site with a modern design and cleaner code while keeping the content and structure you want to carry over.",
  },
  {
    q: "Can you host the website?",
    a: "I can help you get it deployed on a modern host and walk you through keeping it updated afterward.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="Common questions"
            title="FAQ"
          />
        </Reveal>

        <div className="mt-12 divide-y divide-ink-700 border-t border-ink-700">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-medium text-paper marker:content-none">
                  {item.q}
                  <span className="flex-shrink-0 font-mono text-lg text-violet-bright transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fog">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
