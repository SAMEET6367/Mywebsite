"use client";

import { useState } from "react";
import Image from "next/image";
import { Container, PrimaryButton, SecondaryButton } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden pb-0 pt-16 sm:pt-24 lg:pb-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-hero-glow" />
      <Container className="grid items-center gap-16 pb-20 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:pb-0">
        <div className="animate-fade-up pb-0 lg:pb-20">
          <p className="mb-4 text-sm text-fog">
            Sameet Ahmed · Software Engineer &amp; Web Developer
          </p>

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

        {/*
          Cutout photo: remove the background from a headshot/half-body
          photo (remove.bg, Photoroom, or Photoshop all work) and export a
          transparent PNG to /public/images/profile-cutout.png. Portrait
          orientation, subject filling the frame top-to-bottom, works best —
          it bleeds off the bottom edge of this section the same way the
          reference image does. Until that file exists, this shows a dashed
          placeholder instead of a broken image icon.
        */}
        <Reveal delay={150}>
          <div className="relative mx-auto -mb-1 h-[360px] w-full max-w-sm sm:h-[440px] lg:mx-0 lg:h-[600px] lg:max-w-none">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 -z-10 rounded-[3rem] bg-hero-glow blur-3xl" />
            {!imgError ? (
              <Image
                src="/images/profile-cutout.png"
                alt="Sameet Ahmed"
                fill
                sizes="(min-width: 1024px) 520px, 384px"
                className="object-contain object-bottom"
                onError={() => setImgError(true)}
                priority
              />
            ) : (
              <div className="flex h-full items-end justify-center rounded-2xl border border-dashed border-ink-700 bg-ink-900/40 pb-10 text-center text-sm text-fog">
                Drop a background-removed photo at
                <br />
                /public/images/profile-cutout.png
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
