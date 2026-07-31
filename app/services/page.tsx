import type { Metadata } from "next";
import { Globe, Bot, Palette, Puzzle, RefreshCw, Rocket, LifeBuoy, Search } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, SectionHeading, PrimaryButton, SecondaryButton } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services — Sameet Ahmed",
  description:
    "Websites, AI chatbots, and graphic design for businesses — built fast, modern, and made to convert.",
};

type Service = {
  icon: typeof Globe;
  title: string;
  text: string;
  bullets: string[];
};

// Edit this list to add, remove, or reword any service. Each card follows
// the same shape: an icon, a one-line pitch, and a few bullets describing
// what's included.
const SERVICES: Service[] = [
  {
    icon: Globe,
    title: "Full-Fledged Website",
    text: "A complete, custom-built website for your business, startup, or personal brand — not a template.",
    bullets: [
      "Multi-page site: home, about, services, portfolio, contact",
      "Built with Next.js/React — fast, responsive, mobile-first",
      "Clean, modern UI designed around your business",
    ],
  },
  {
    icon: Bot,
    title: "AI Chatbot for Your Existing Website",
    text: "Already have a website? I'll add an AI chatbot to it — trained on your business — so it can answer visitor questions and capture leads 24/7.",
    bullets: [
      "Works alongside your current site, no rebuild needed",
      "Trained on your services, FAQs, and contact details",
      "Answers visitors and points serious leads to you",
    ],
  },
  {
    icon: Puzzle,
    title: "AI Chatbot for WordPress Websites",
    text: "The same AI chatbot, embedded into your WordPress site through a simple, lightweight integration.",
    bullets: [
      "No need to migrate off WordPress",
      "Simple embed — doesn't slow your site down",
      "Same 24/7 lead-capturing chatbot as above",
    ],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    text: "Simple, clean visuals to go with your website or brand — logos, banners, and social media graphics.",
    bullets: [
      "Logos and simple brand marks",
      "Social media graphics and banners",
      "Assets sized correctly for web and social",
    ],
  },
  {
    icon: RefreshCw,
    title: "Website Redesign / Revamp",
    text: "Modernize an outdated site's look, speed, and mobile experience without starting from zero.",
    bullets: [
      "Updated, current design on your existing content",
      "Faster load times and proper mobile support",
      "Keep your domain and content, improve the experience",
    ],
  },
  {
    icon: Rocket,
    title: "Landing Page for a Product or Campaign",
    text: "A single, focused page built to convert — for a product launch, ad campaign, or specific offer.",
    bullets: [
      "One clear goal per page: sign up, buy, or book a call",
      "Fast-loading and built for ad traffic",
      "Ready quickly since it's a single page",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Website Care & Support",
    text: "Ongoing help after launch — fixes, content updates, and small new features as your business grows.",
    bullets: [
      "Content and copy updates",
      "Bug fixes and small feature additions",
      "Someone to call when something needs changing",
    ],
  },
  {
    icon: Search,
    title: "Basic SEO Setup",
    text: "The on-page groundwork that helps your site actually get found on Google.",
    bullets: [
      "Page titles, meta descriptions, and sitemap",
      "Fast load times (a real ranking factor)",
      "Clean, crawlable page structure",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-ink-950">
      <Nav />

      <section className="relative overflow-hidden pt-16 sm:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-hero-glow" />
        <Container className="py-16 sm:py-20">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-violet-bright">
              Services
            </p>
            <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-tight text-paper sm:text-5xl">
              Everything you need to look professional online.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
              From a brand-new website to an AI chatbot on the site you already
              have — pick what fits, or tell me what you're trying to solve and
              I'll suggest the right combination.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <PrimaryButton href="/#contact">Start a project</PrimaryButton>
              <SecondaryButton href="/#work">See my work</SecondaryButton>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="section-divider" />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={(i % 3) * 100}>
                  <div className="group flex h-full flex-col rounded-xl2 border border-ink-700 bg-ink-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-bright/50 hover:shadow-glow sm:p-7">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-ink-950" strokeWidth={2} />
                    </div>
                    <p className="font-display text-lg font-semibold text-paper">
                      {service.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-fog">
                      {service.text}
                    </p>
                    <ul className="mt-4 space-y-2 border-t border-ink-700 pt-4">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm text-fog">
                          <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-violet-bright" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <div className="section-divider" />

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col items-center gap-6 rounded-xl2 border border-ink-700 bg-ink-900/60 py-16 text-center shadow-soft">
          <SectionHeading
            eyebrow="Not sure what you need?"
            title="Tell me what you're trying to solve — I'll recommend the right service."
          />
          <PrimaryButton href="/#contact">Get in touch</PrimaryButton>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
