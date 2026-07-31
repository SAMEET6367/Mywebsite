"use client";

import { useEffect, useState } from "react";

const URL_TEXT = "sameetahmed.dev";

/**
 * The page's thesis, rendered: a browser window where a grid of guidelines
 * resolves into a real layout, block by block, while the address bar types
 * itself out. This is the one place the design spends its boldness.
 */
export function BrowserBuild() {
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setTyped(URL_TEXT);
      setStarted(true);
      return;
    }

    const startTimer = setTimeout(() => setStarted(true), 200);
    let i = 0;
    const typeTimer = setInterval(() => {
      i += 1;
      setTyped(URL_TEXT.slice(0, i));
      if (i >= URL_TEXT.length) clearInterval(typeTimer);
    }, 55);

    return () => {
      clearTimeout(startTimer);
      clearInterval(typeTimer);
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 animate-float rounded-[2rem] bg-hero-glow blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 shadow-soft">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1 rounded-full border border-ink-700 bg-ink-950/70 px-3 py-1">
            <span className="font-mono text-xs text-fog">
              {typed}
              <span className="animate-blink text-violet-bright">|</span>
            </span>
          </div>
        </div>

        {/* Canvas: grid resolving into a layout */}
        <div
          className="relative grid aspect-[4/3] grid-cols-6 grid-rows-6 gap-2 bg-grid-fade bg-[length:16.6%_16.6%] p-4 sm:aspect-[5/4]"
        >
          {started && (
            <>
              <div
                className="col-span-6 row-span-1 animate-build-block rounded-lg bg-ink-800"
                style={{ animationDelay: "120ms" }}
              />
              <div
                className="col-span-2 row-span-4 animate-build-block rounded-lg bg-gradient-to-br from-violet/70 to-cyan/50"
                style={{ animationDelay: "260ms" }}
              />
              <div
                className="col-span-4 row-span-1 animate-build-block rounded-lg bg-ink-700"
                style={{ animationDelay: "380ms" }}
              />
              <div
                className="col-span-4 row-span-1 animate-build-block rounded-lg bg-ink-800"
                style={{ animationDelay: "460ms" }}
              />
              <div
                className="col-span-2 row-span-2 animate-build-block rounded-lg bg-ink-800"
                style={{ animationDelay: "540ms" }}
              />
              <div
                className="col-span-4 row-span-1 animate-build-block self-end rounded-lg bg-gradient-to-r from-violet to-cyan"
                style={{ animationDelay: "640ms" }}
              />
              <div
                className="col-span-6 row-span-1 animate-build-block rounded-lg border border-ink-700 bg-ink-900/60"
                style={{ animationDelay: "740ms" }}
              />
            </>
          )}
        </div>
      </div>

      <div className="absolute -bottom-5 -right-5 hidden rounded-xl border border-ink-700 bg-ink-900/90 px-4 py-3 shadow-soft backdrop-blur sm:block">
        <p className="font-mono text-[11px] text-fog">build time</p>
        <p className="font-display text-lg font-semibold text-paper">
          ~0.4s <span className="text-cyan">first paint</span>
        </p>
      </div>
    </div>
  );
}
