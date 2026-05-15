import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ThemeToggle } from "./Theme";
import logo from "@/assets/logo.jpeg";

const CALENDLY_LINK = "https://calendly.com/invonicstechnologies/30min";

const links = [
  { href: "/#services", label: "Services", index: "01" },
  { href: "/#work", label: "Work", index: "02" },
  { href: "/#process", label: "Process", index: "03" },
  { href: "/#team", label: "Team", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view for hash links on the homepage
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveHash("");
      return;
    }
    const ids = links.filter((l) => l.href.startsWith("/#")).map((l) => l.href.replace("/#", ""));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHash(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return location.pathname === "/" && activeHash === href.replace("/", "");
    }
    return location.pathname === href;
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Top engineering meta-bar */}
      <div className="hidden md:block border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 flex items-center justify-between label-mono py-1.5">
          <div className="flex items-center gap-5">
            <span>
              <span className="text-primary">◆</span>&nbsp; INV-001
            </span>
            <span className="opacity-60">NAIROBI · KE</span>
            <span className="opacity-60">v2026.05</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.18_150)] pulse-glow" />
              OPERATIONAL
            </span>
            <span className="opacity-60">EAT · 24h</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex items-stretch justify-between h-16">
          {/* Logo block — sharp, bracketed */}
          <Link
            to="/"
            className="group flex items-center gap-3 pr-5 md:pr-7 border-r border-border/60"
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden border border-border bg-secondary">
              <img
                src={logo}
                alt="Invonics Technologies logo"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-semibold tracking-tight text-foreground text-[15px]">
                Invonics
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground/80 mt-1">
                Technologies
              </span>
            </span>
          </Link>

          {/* Modular nav grid */}
          <nav className="hidden md:flex items-stretch flex-1">
            {links.map((l) => {
              const active = isActive(l.href);
              const inner = (
                <>
                  <span className="label-mono text-[10px] opacity-50 group-hover:opacity-100 group-hover:text-primary transition-colors">
                    {l.index}
                  </span>
                  <span
                    className={`text-sm transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </span>
                  <span
                    className={`absolute left-5 right-5 bottom-0 h-px origin-left transition-transform duration-500 ${
                      active
                        ? "scale-x-100 bg-primary"
                        : "scale-x-0 bg-foreground/40 group-hover:scale-x-100"
                    }`}
                  />
                </>
              );
              const classes =
                "group relative flex flex-col justify-center gap-1 px-5 border-r border-border/40 last:border-r-0";
              return l.href.startsWith("/#") ? (
                <a key={l.href} href={l.href} className={classes}>
                  {inner}
                </a>
              ) : (
                <Link key={l.href} to={l.href} className={classes}>
                  {inner}
                </Link>
              );
            })}
          </nav>

          {/* Right action cluster */}
          <div className="flex items-stretch">
            <div className="hidden sm:flex items-center px-3 border-l border-border/60">
              <ThemeToggle />
            </div>
            <a
              href={CALENDLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 border-l border-border/60 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              Book a call
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden inline-flex items-center justify-center w-12 border-l border-border/60"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="relative block w-4 h-3">
                <span
                  className={`absolute left-0 top-0 h-px w-4 bg-foreground transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-4 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-3 h-px w-4 bg-foreground transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md animate-fade-in">
          <div className="mx-auto max-w-[1400px] px-4">
            {links.map((l) => {
              const cls =
                "flex items-center justify-between py-3.5 border-b border-border/40 text-sm text-foreground/90";
              return l.href.startsWith("/#") ? (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={cls}>
                  <span>{l.label}</span>
                  <span className="label-mono opacity-60">{l.index}</span>
                </a>
              ) : (
                <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className={cls}>
                  <span>{l.label}</span>
                  <span className="label-mono opacity-60">{l.index}</span>
                </Link>
              );
            })}
            <div className="flex items-center justify-between py-4">
              <ThemeToggle />
              <a
                href={CALENDLY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 text-sm"
              >
                Book a call
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/80" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
