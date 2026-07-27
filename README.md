# Sameet Ahmed — Portfolio Landing Page

A premium, dark-mode landing page built with Next.js, React, TypeScript, and
Tailwind CSS. The goal of the page: convince a visitor that Sameet can build
a modern, fast, responsive website for their business.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
npm run start
```

## Where to customize

- **Contact details** — `components/Contact.tsx` has three placeholder
  constants at the top: `EMAIL`, `LINKEDIN`, `GITHUB`. Replace with your real
  links.
- **Contact form submissions** — the form currently just shows a "message
  sent" confirmation with no backend. Wire `handleSubmit` in
  `components/Contact.tsx` to an API route or a service like Resend or
  Formspree when you're ready to receive real messages.
- **Featured work** — `components/FeaturedWork.tsx` has a `PROJECTS` array.
  The Real Estate project links to a real GitHub repo; the other two are
  placeholders — swap in real project links, screenshots, and descriptions
  as you have them. Screenshots can replace the gradient placeholder blocks.
- **Testimonials** — `components/Testimonials.tsx` has placeholder quotes,
  clearly marked in a comment. Replace with real client feedback.
- **Photo** — the hero currently uses an initials badge as a photo
  placeholder (`components/Hero.tsx`). Swap it for a real headshot with
  `next/image` when you have one.

## Design tokens

Colors, fonts, and animation keyframes are defined in `tailwind.config.ts`
and `app/globals.css` — change the palette or type scale there and it will
propagate through every component.

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- No external animation library — scroll reveals use a small
  IntersectionObserver hook (`lib/useReveal.ts`) to keep the bundle lean.
