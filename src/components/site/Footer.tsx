import { Link } from "@tanstack/react-router";
import { WA_LINK, WhatsAppIcon } from "./FloatingWhatsApp";

export function Footer() {
  return (
    <footer className="relative pt-24 pb-10 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="glow-divider mb-16" />

      <div className="mx-auto max-w-7xl px-5">
        {/* Slogan banner */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Invonics Technologies
          </div>
          <div className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
            <span className="text-gradient">Engineering Tomorrow, </span>
            <span className="text-gradient-accent">Today.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent-gradient shadow-glow">
                <span className="font-display font-bold text-primary-foreground text-sm">I</span>
              </span>
              <span className="font-display font-semibold tracking-tight text-foreground">
                Invonics Technologies
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Software, infrastructure, automation and brand — engineered to compound for the
              institutions of the next decade.
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed footer-geo-desc">
              Custom software development, AI automation, web design and branding company based in
              Nairobi, Kenya. Serving SMEs, schools and institutions across East Africa.
            </p>

            <address className="mt-6 text-sm text-muted-foreground not-italic footer-nap">
              259a, Njambi road, Oreteti Heights, Ongata Rongai, Nairobi, Kenya &nbsp;&middot;&nbsp;
              <a
                href="mailto:hello@invonicstechnologies.com"
                className="hover:text-primary transition-colors"
              >
                hello@invonicstechnologies.com
              </a>
              &nbsp;&middot;&nbsp;
              <a href="tel:+254786669572" className="hover:text-primary transition-colors">
                +254 786 669 572
              </a>
            </address>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-white"
                style={{ background: "oklch(0.62 0.18 150)" }}
              >
                <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a
                href="mailto:hello@invonicstechnologies.com"
                className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-2 text-xs"
              >
                hello@invonicstechnologies.com
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-4">
              Studio
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a className="text-foreground/80 hover:text-foreground" href="/#services">
                  Our Services in Kenya
                </a>
              </li>
              <li>
                <Link className="text-foreground/80 hover:text-foreground" to="/portfolio">
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <a className="text-foreground/80 hover:text-foreground" href="/#process">
                  Process
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link className="text-foreground/80 hover:text-foreground" to="/about">
                  About Invonics Technologies
                </Link>
              </li>
              <li>
                <a className="text-foreground/80 hover:text-foreground" href="/#team">
                  Team
                </a>
              </li>
              <li>
                <Link className="text-foreground/80 hover:text-foreground" to="/contact">
                  Contact Us — Nairobi, Kenya
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-4">
              Stay in the loop
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 glass rounded-full p-1 pl-4"
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="bg-transparent flex-1 text-sm placeholder:text-muted-foreground/60 outline-none text-foreground"
              />
              <button className="rounded-full bg-accent-gradient px-3.5 py-2 text-xs font-medium text-primary-foreground">
                Subscribe
              </button>
            </form>
            <div className="mt-4 text-[11px] text-muted-foreground">
              Send a brief or DM us for a tailored quote.
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Invonics Technologies. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/80 font-mono">
            v2026.01 · Nairobi · Built in the dark.
          </p>
        </div>
      </div>
    </footer>
  );
}
