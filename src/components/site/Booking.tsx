import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { WA_LINK, WhatsAppIcon } from "./FloatingWhatsApp";

const ROBOT_MASCOT_URL = "/images/invonics-robot-mascot.png";

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
              Tell the assistant what you want to modernize. We&rsquo;ll continue the conversation
              on WhatsApp, clarify scope, and recommend the leanest path forward.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat with Invonics
              </a>
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
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px]">
                  <div className="absolute inset-x-8 bottom-8 h-14 rounded-full bg-primary/15 blur-2xl" />
                  <img
                    src={ROBOT_MASCOT_URL}
                    alt="Invonics Assistant robot mascot"
                    loading="lazy"
                    decoding="async"
                    className="assistant-mascot relative h-full w-full object-contain"
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
                  <div className="pt-3">
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-full items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-5 py-4 text-sm text-foreground transition-colors hover:bg-primary/15"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[oklch(0.62_0.18_150)] text-white">
                          <WhatsAppIcon className="h-5 w-5" />
                        </span>
                        Start a WhatsApp inquiry
                      </span>
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
