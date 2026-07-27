"use client";

import { FormEvent, useState } from "react";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

// Placeholders — replace with your real contact details.
const EMAIL = "sameet6367254@gmail.com";
const LINKEDIN = "https://linkedin.com/in/your-profile";
const GITHUB = "https://github.com/SAMEET6367";

// Sign up free at https://formspree.io, create a form, and paste your form
// ID below (the part after /f/ in the endpoint Formspree gives you). Every
// submission gets emailed straight to the address you signed up with —
// no backend or API key needed. Leave the placeholder in and the form will
// just show an error instead of silently failing.
const FORMSPREE_FORM_ID: string = "maqradvp";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (FORMSPREE_FORM_ID === "your-form-id") {
      // Not configured yet — tell the developer, not the visitor, why
      // nothing happened. See the comment above FORMSPREE_FORM_ID.
      console.warn(
        "Contact form: set FORMSPREE_FORM_ID in components/Contact.tsx to start receiving submissions."
      );
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Get in touch"
            title="Let's build something amazing together."
            description="Tell me a bit about your business and what you need — I'll get back to you within a day or two."
          />

          <div className="mt-10 space-y-3 text-sm">
            <a
              href={`mailto:${EMAIL}`}
              className="block w-fit text-fog transition-colors hover:text-paper"
            >
              {EMAIL}
            </a>
            <a
              href={LINKEDIN}
              className="block w-fit text-fog transition-colors hover:text-paper"
            >
              LinkedIn
            </a>
            <a
              href={GITHUB}
              className="block w-fit text-fog transition-colors hover:text-paper"
            >
              GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form
            onSubmit={handleSubmit}
            className="rounded-xl2 border border-ink-700 bg-ink-900/60 p-6 shadow-soft sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-paper">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 w-full rounded-lg border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-paper placeholder:text-fog/60 focus:border-violet-bright"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-paper">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-paper placeholder:text-fog/60 focus:border-violet-bright"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-paper">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="mt-2 w-full resize-none rounded-lg border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-paper placeholder:text-fog/60 focus:border-violet-bright"
                  placeholder="What are you looking to build?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3 font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              {status === "sent" && (
                <p className="text-center text-sm text-cyan" role="status">
                  Thanks — your message is in. I&apos;ll reply soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-amber" role="status">
                  Something didn&apos;t go through — email {EMAIL} directly and
                  I&apos;ll get back to you.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
