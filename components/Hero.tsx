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
      <Container className="grid items-center gap-8 pb-20 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:pb-0">
        <div className="animate-fade-up pb-0 lg:pb-20">
          <p className="mb-4 text-sm text-fog">
            Sameet Ahmed · Software Engineer &amp; Web Developer
          </p>

          <h1 className="font-display font-semibold leading-[1.1] text-paper">
            <span className="block text-3xl sm:text-4xl lg:text-5xl">
              Need a website for your business or a personal landing page?
            </span>

            <span className="mt-4 block text-4xl sm:text-5xl lg:text-6xl">
              Just let me know!
            </span>
          </h1>
  

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
            I'm a Software Engineering student and web developer who designs and 
            builds clean, modern, responsive websites that are fast, user-friendly, 
            and built to convert. I help businesses and individuals create landing 
            pages and websites that look professional, build trust, and turn visitors into customers.
            
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PrimaryButton href="#work">View my work</PrimaryButton>
            <SecondaryButton href="#contact">Let&apos;s build your website</SecondaryButton>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink-700 pt-6 text-sm text-fog">
            <span>Next.js &amp; React</span>
            <span>Tailwind CSS</span>
            <span>Secure</span>
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

          NOTE: the wrapper below is overflow-hidden and the image is scaled
          up + shifted right to close the empty gutter created by transparent
          padding baked into the source PNG. If you re-export the cutout
          cropped tight to the body with no margin, you can drop the
          scale/translate classes and go back to a plain fill.
        */}
        <Reveal delay={150}>
          <div className="relative mx-auto -mb-1 h-[360px] w-full max-w-sm overflow-hidden sm:h-[440px] lg:mx-0 lg:h-[680px] lg:max-w-none">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 -z-10 rounded-[3rem] bg-hero-glow blur-3xl" />
            {!imgError ? (
              <div className="absolute inset-0 origin-bottom-right lg:scale-[1.08] lg:translate-x-[6%]">
                <Image
                  src="/images/profile-cutout.png"
                  alt="Sameet Ahmed"
                  fill
                  sizes="(min-width: 1024px) 620px, 384px"
                  className="object-contain object-bottom lg:object-right-bottom"
                  onError={() => setImgError(true)}
                  priority
                />
              </div>
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