import { useState } from "react";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-28 md:py-36 border-t border-border/60 overflow-hidden">
      {/* Animated map-style background */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="g1" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="oklch(0.72 0.18 245 / 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#g1)" />
          {Array.from({ length: 30 }).map((_, i) => (
            <line
              key={i}
              x1={0}
              x2={1200}
              y1={i * 22}
              y2={i * 22 + 8}
              stroke="oklch(1 0 0 / 0.05)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 73) % 1200}
              cy={((i * 41) % 600) + 30}
              r="1.5"
              fill="oklch(0.72 0.18 245 / 0.6)"
            >
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur={`${3 + (i % 5)}s`}
                repeatCount="indefinite"
                begin={`${(i % 7) * 0.3}s`}
              />
            </circle>
          ))}
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <span className="text-primary">●</span>&nbsp; Contact
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04]">
              Let&rsquo;s engineer
              <br />
              <span className="text-gradient-accent">your next move.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              Tell us about your project. We respond to every inquiry within one
              business day.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="https://wa.me/0000000000"
                className="flex items-center gap-3 group"
              >
                <span className="h-10 w-10 grid place-items-center rounded-xl glass group-hover:ring-glow transition-all">
                  <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.5 0 .14 5.36.14 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.66a11.93 11.93 0 005.74 1.46h.01c6.56 0 11.92-5.36 11.92-11.92 0-3.18-1.24-6.17-3.45-8.4zM12.05 21.5a9.55 9.55 0 01-4.87-1.34l-.35-.21-3.74.98 1-3.65-.23-.37a9.5 9.5 0 0114.7-11.6 9.43 9.43 0 012.79 6.74c0 5.27-4.3 9.55-9.3 9.45zm5.43-7.13c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.78.96-.95 1.16-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.34.45-.5.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.62.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35z" />
                  </svg>
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">WhatsApp</div>
                  <div className="text-sm text-foreground">Chat with our team</div>
                </div>
              </a>

              <a href="mailto:hello@invonics.tech" className="flex items-center gap-3 group">
                <span className="h-10 w-10 grid place-items-center rounded-xl glass group-hover:ring-glow transition-all">
                  <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="text-sm text-foreground">hello@invonics.tech</div>
                </div>
              </a>

              <div className="flex items-center gap-3 pt-3">
                {["Linkedin", "X", "Instagram", "Behance"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="rounded-full glass px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:ring-glow transition-all"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="glass-strong rounded-3xl p-6 md:p-8 shadow-card"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full name" placeholder="Ada Okafor" />
                <Field label="Email" type="email" placeholder="ada@company.com" />
                <Field label="Company" placeholder="Acme Inc." />
                <Field label="Budget" placeholder="$10k – $50k" />
              </div>
              <div className="mt-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Project brief
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your goals, timelines and any references…"
                  className="mt-2 w-full rounded-xl bg-background/40 border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all"
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-xs text-muted-foreground">
                  By submitting, you agree to our terms. We never share your details.
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:translate-y-[-1px] transition-transform"
                >
                  {sent ? "Message sent ✓" : "Send inquiry"}
                  {!sent && (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-background/40 border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all"
      />
    </label>
  );
}
