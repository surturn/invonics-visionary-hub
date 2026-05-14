import { useEffect } from "react";
import { Reveal } from "./Reveal";
import { useTheme } from "./Theme";

const CALENDLY_URL = "https://calendly.com/invonics/strategy-call"; // placeholder

export function Booking() {
  const { theme } = useTheme();

  useEffect(() => {
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const isDark = theme === "dark";
  const calendlyHref = `${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=${
    isDark ? "0f111a" : "ffffff"
  }&text_color=${isDark ? "f5f7fb" : "111522"}&primary_color=4d8bff`;

  return (
    <section
      id="booking"
      className="relative py-28 md:py-36 border-t border-border/60 overflow-hidden"
    >
      <div className="absolute -top-40 left-1/3 h-[480px] w-[480px] rounded-full bg-primary/15 blur-3xl float-slow" />

      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <span className="text-primary">●</span>&nbsp; Strategy Call
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-gradient leading-[1.05]">
              Book a 30-minute strategy call.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              We&rsquo;ll listen, then send a tailored proposal within 48 hours. No decks, no fluff.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
              <Stat label="Avg reply" value="< 5 min" />
              <Stat label="Discovery call" value="Free" />
              <Stat label="Engagement from" value="KES 80,000" />
              <Stat label="First milestone" value="2 weeks" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm hover:ring-glow transition-all"
              >
                Or send a written brief
              </a>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-7">
            <div className="relative rounded-3xl glass-strong p-2 shadow-card noise">
              {/* Calendar header chrome */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                </div>
                <div className="text-[11px] font-mono text-muted-foreground/70">
                  calendly · invonics
                </div>
                <div className="text-[11px] text-primary">● live</div>
              </div>

              <div
                key={theme}
                className="calendly-inline-widget rounded-2xl overflow-hidden border border-border"
                data-url={calendlyHref}
                style={{ minWidth: "320px", height: "680px" }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl glass p-4">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-lg text-foreground">{value}</div>
    </div>
  );
}
