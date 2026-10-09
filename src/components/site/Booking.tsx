import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";

import mascot from "@/assets/invonics-mascot.webp";

const prompts = [
  "Need a system built?",
  "Let’s automate your workflow.",
  "Ready to modernize your business?",
  "Chat with Invonics.",
];

export function Booking() {
  return (
    <section
      id="booking"
      className="relative overflow-hidden border-t border-border/60 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 assistant-grid opacity-70" />

      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" variant="left">
            <div className="label-mono mb-4">
              <span className="text-primary">●</span>&nbsp; Invonics Assistant
            </div>
            <h2 className="font-display text-4xl leading-[1.04] text-gradient md:text-6xl">
              A digital guide for your next build.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground leading-relaxed">
              Tell the assistant what you want to modernize. We&rsquo;ll clarify scope, and
              recommend the leanest path forward.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-foreground transition-colors hover:border-primary/60"
              >
                Send a written brief
                <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7" variant="right">
            <div className="assistant-panel relative overflow-hidden rounded-[2rem] border border-border bg-card/70 p-5 md:p-8">
              <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-center">
                <div className="relative mx-auto w-full max-w-[280px]">
                  {/* Glow behind the robot */}
                  <div className="absolute inset-x-8 bottom-4 h-12 rounded-full bg-primary/15 blur-2xl" />
                  <img
                    src={mascot}
                    alt="Invonics Assistant robot mascot — Invonics Technologies, Nairobi Kenya"
                    loading="lazy"
                    decoding="async"
                    width={700}
                    height={1037}
                    className="relative w-full h-auto object-contain drop-shadow-none"
                  />
                </div>

                <div className="space-y-3">
                  {prompts.map((prompt, index) => (
                    <div
                      key={prompt}
                      className="assistant-bubble"
                      style={{ "--bubble-delay": `${index * 80}ms` } as CSSProperties}
                    >
                      {prompt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
