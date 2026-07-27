"use client";

import Image from "next/image";
import { Container, PrimaryButton, SecondaryButton } from "@/components/ui/Primitives";
import { BrowserBuild } from "@/components/BrowserBuild";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-hero-glow" />
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="animate-fade-up">
          <div className="mb-8 flex items-center gap-3">
            {/*
              Photo: drop a square headshot at /public/images/profile.jpg
              (min. 200x200px) and it will render here automatically. Until
              that file exists, this falls back to an initials badge instead
              of a broken image icon.
            */}
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-violet to-cyan">
              <Image
                src="/images/profile.jpg"
                alt="Sameet Ahmed"
                fill
                sizes="40px"
                className="object-cover"
                onError={(e) => {
                  // No photo uploaded yet — hide the broken image and let
                  // the gradient + initials fallback show through.
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold text-ink-950">
                SA
              </span>
            </div>
            <p className="text-sm text-fog">
              Sameet Ahmed · Software Engineer &amp; Web Developer
            </p>
          </div>

          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.1] text-paper sm:text-5xl lg:text-6xl">
            I build websites that make businesses look as good as they really are.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
            I&apos;m a software engineering student and developer who designs and
            builds clean, modern, responsive websites — the kind that load fast,
            feel effortless, and turn visitors into customers. If your business
            needs a landing page or website that actually converts, that&apos;s
            what I do.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PrimaryButton href="#work">View my work</PrimaryButton>
            <SecondaryButton href="#contact">Let&apos;s build your website</SecondaryButton>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink-700 pt-6 text-sm text-fog">
            <span>Next.js &amp; React</span>
            <span>Tailwind CSS</span>
            <span>TypeScript</span>
            <span>Fully responsive</span>
          </div>
        </div>

        <Reveal delay={150}>
          <BrowserBuild />
        </Reveal>
      </Container>
    </section>
  );
}
