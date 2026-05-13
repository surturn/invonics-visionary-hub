import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-hero pt-36 pb-28 md:pt-48 md:pb-40">
      {/* Background image with mask */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 -z-10 grid-bg grid-drift opacity-60" />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl float-slow" />
      <div className="pointer-events-none absolute top-40 left-[-10%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl float-slow" style={{ animationDelay: "2s" }} />

      <div className="mx-auto max-w-7xl px-5 relative">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
            <span className="tracking-[0.18em] uppercase">Now engineering · v2026</span>
          </div>
        </div>

        <h1 className="font-display mt-7 text-center text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-tight">
          <span className="text-gradient">Engineering</span>{" "}
          <span className="relative inline-block">
            <span className="text-gradient-accent">Tomorrow</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 8 Q 80 -2 150 6 T 298 5"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-primary/60"
              />
            </svg>
          </span>
          <span className="text-gradient">, Today.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-center text-base sm:text-lg text-muted-foreground leading-relaxed">
          Invonics Technologies builds intelligent digital ecosystems through software,
          automation, branding, IT supply, Starlink installations, and modern digital
          experiences engineered for the next decade.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow hover:translate-y-[-1px] transition-transform"
          >
            View Our Work
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-medium text-foreground hover:ring-glow transition-all"
          >
            Book Consultation
          </a>
        </div>

        {/* Floating UI cards */}
        <div className="relative mt-20 mx-auto max-w-5xl">
          <div className="glass-strong rounded-2xl p-2 shadow-card ring-1 ring-white/5">
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-card/40">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="ml-3 text-[11px] font-mono text-muted-foreground/70">
                  invonics.tech / console
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gradient-to-b from-card/30 to-card/10">
                <StatCard label="Uptime" value="99.99%" sub="last 90d" trend="+0.04" />
                <StatCard label="Active Systems" value="142" sub="across 6 sectors" trend="+12" />
                <StatCard label="Automations" value="3.4M" sub="executions / mo" trend="+18%" />
              </div>
            </div>
          </div>

          {/* Floating chip — left */}
          <div className="hidden md:flex absolute -left-10 top-10 items-center gap-2 glass rounded-full px-3 py-2 shadow-card float-slow">
            <span className="h-2 w-2 rounded-full bg-primary pulse-glow" />
            <span className="text-xs text-foreground">Starlink link · 184 ms</span>
          </div>
          {/* Floating chip — right */}
          <div
            className="hidden md:flex absolute -right-8 -bottom-6 items-center gap-3 glass rounded-2xl px-4 py-3 shadow-card float-slow"
            style={{ animationDelay: "1.4s" }}
          >
            <div className="h-8 w-8 rounded-lg bg-accent-gradient grid place-items-center">
              <svg className="h-4 w-4 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18M3 12h18" strokeLinecap="round" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-xs text-muted-foreground">Deploy</div>
              <div className="text-sm font-medium">Shipped to prod</div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 overflow-hidden">
          <div className="flex items-center justify-center gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground/60">
            <span>Schools</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Enterprise</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Events</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Government</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>SMEs</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  sub,
  trend,
}: {
  label: string;
  value: string;
  sub: string;
  trend: string;
}) {
  return (
    <div className="rounded-lg glass p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-[11px] text-primary">{trend}</span>
      </div>
      <div className="mt-2 font-display text-2xl text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
      <div className="mt-3 h-1 w-full rounded-full bg-foreground/5 overflow-hidden">
        <div className="h-full w-3/4 bg-accent-gradient" />
      </div>
    </div>
  );
}
