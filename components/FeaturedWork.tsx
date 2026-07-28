import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

type Project = {
  title: string;
  description: string;
  tech: string[];
  href: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    title: "Real Estate Website",
    description:
      "An AI-assisted flyer generator for real estate listings, with drag-and-drop image management and multiple ready-to-export templates.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://listing-card-generator.vercel.app/",
    // Drop a screenshot of the app at /public/images/listing-card-generator.png
    image: "/images/listing-card-generator.png",
  },
  /*{
    title: "SaaS Landing Page",
    description:
      "A conversion-focused landing page template for SaaS products — clear pricing, feature breakdown, and a strong above-the-fold pitch.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    href: "#",
    image: "/images/saas-landing-page.png",
  },
  {
    title: "Business Landing Page",
    description:
      "A clean, modern one-page site built for a local business — fast-loading, mobile-first, and easy for the owner to update.",
    tech: ["React", "Tailwind CSS", "HTML/CSS"],
    href: "#",
    image: "/images/business-landing-page.png",
  },*/
];

export function FeaturedWork() {
  return (
    <section id="work" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Featured work"
            title="A few examples of what I build."
            description="More projects are in progress — this page itself is one example of the standard I hold my work to."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:max-w-xl md:max-w-none md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i * 100}>
              <a href={project.href} target="_blank" rel="noreferrer" className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-ink-700 bg-ink-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-violet-bright/50 hover:shadow-glow">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800">
                  <Image src={project.image} alt={`${project.title} preview`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-lg font-semibold text-paper">
                    {project.title}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-fog">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-full border border-ink-700 px-2.5 py-1 font-mono text-[11px] text-fog">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-violet-bright">
                    View project
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}