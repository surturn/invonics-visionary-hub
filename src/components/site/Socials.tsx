import { Reveal } from "./Reveal";
import { Instagram, Twitter, Facebook, Mail, Bot } from "lucide-react";
import { WhatsAppIcon, WA_LINK } from "./FloatingWhatsApp";

const socials = [
  {
    name: "WhatsApp",
    handle: "Chat now · ~5 min reply",
    href: WA_LINK,
    icon: <WhatsAppIcon className="h-5 w-5" />,
    accent: "oklch(0.62 0.18 150)",
  },
  {
    name: "Instagram",
    handle: "@invonicstechnologies",
    href: "https://www.instagram.com/invonicstechnologies",
    icon: <Instagram className="h-5 w-5" strokeWidth={1.6} />,
    accent: "oklch(0.62 0.22 20)",
  },
  {
    name: "TikTok",
    handle: "@invonicstechnologies",
    href: "https://www.tiktok.com/@invonicstechnologies?/",
    icon: <TikTokIcon className="h-５ w-５" />,
    accent: "oklch(0.7 0.18 200)",
  },
  {
    name: "X (Twitter)",
    handle: "@invonicstechnologies",
    href: "https://x.com/invonicstech",
    icon: <Twitter className="h-5 w-5" strokeWidth={1.6} />,
    accent: "oklch(0.6 0.05 260)",
  },
  {
    name: "Facebook",
    handle: "Invonics Technologies",
    href: "https://www.facebook.com/share/1BFcFJHC1w/",
    icon: <Facebook className="h-5 w-5" strokeWidth={1.6} />,
    accent: "oklch(0.55 0.2 250)",
  },
  {
    name: "Email",
    handle: "hello@invonics.tech",
    href: "mailto:invonicstechnologies@gmail.com",
    icon: <Mail className="h-5 w-5" strokeWidth={1.6} />,
    accent: "oklch(0.7 0.16 80)",
  },
  {
    name: "Assistant",
    handle: "Guided project intake",
    href: "#booking",
    icon: <Bot className="h-5 w-5" strokeWidth={1.6} />,
    accent: "oklch(0.65 0.18 200)",
  },
];

function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.5 3a5.5 5.5 0 0 0 4.5 4.5v3a8.5 8.5 0 0 1-4.5-1.4v6.7a6.2 6.2 0 1 1-6.2-6.2c.36 0 .7.03 1.04.1v3.2a3 3 0 1 0 2.16 2.9V3h3z" />
    </svg>
  );
}

export function Socials() {
  return (
    <section
      id="social"
      className="relative py-28 md:py-36 border-t border-border/60 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-primary/15 blur-3xl float-slow" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <span className="text-primary">●</span>&nbsp; Connect
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-2xl">
              Find us where you already are.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="md:max-w-sm text-muted-foreground">
              Real humans. Fast replies. Pick the room you&rsquo;re most comfortable in.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {socials.map((s, i) => (
            <Reveal key={s.name} delay={i * 50}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-full overflow-hidden rounded-2xl glass p-5 transition-all duration-500 hover:-translate-y-1 hover:ring-glow"
              >
                <div
                  className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
                  style={{ background: s.accent }}
                />
                <div
                  className="relative grid h-11 w-11 place-items-center rounded-xl border border-border text-foreground"
                  style={{ background: `color-mix(in oklab, ${s.accent} 12%, transparent)` }}
                >
                  <span style={{ color: s.accent }}>{s.icon}</span>
                </div>
                <div className="relative mt-5">
                  <div className="font-display text-lg text-foreground">{s.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.handle}</div>
                </div>
                <div className="relative mt-5 flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-foreground/60 group-hover:text-primary transition-colors">
                  Open
                  <svg
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
