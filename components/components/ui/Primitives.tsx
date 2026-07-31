import { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-6 sm:px-10 xl:px-16 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-violet-bright">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-fog">{description}</p>
      )}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3 font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03] focus-visible:scale-[1.03]"
    >
      <span className="relative z-10">{children}</span>
    </a>
  );
}

export function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-700 bg-ink-900/60 px-6 py-3 font-medium text-paper backdrop-blur transition-colors duration-300 hover:border-violet-bright/60 hover:bg-ink-800"
    >
      {children}
    </a>
  );
}
