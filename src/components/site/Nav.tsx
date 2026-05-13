import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#vision", label: "Vision" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5">
        <div
          className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 transition-all duration-500 ${
            scrolled ? "glass-strong" : "bg-transparent border border-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent-gradient shadow-glow">
              <span className="absolute inset-0 rounded-md blur-md bg-accent-gradient opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="relative font-display font-bold text-primary-foreground text-sm">
                I
              </span>
            </span>
            <span className="font-display font-semibold tracking-tight text-foreground">
              Invonics
            </span>
            <span className="hidden sm:inline text-xs uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">
              Technologies
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-foreground hover:ring-glow transition-all"
          >
            Book a call
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full glass"
            aria-label="Menu"
          >
            <span className="relative block w-4 h-3">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-foreground transition-transform ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-4 bg-foreground transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-px w-4 bg-foreground transition-transform ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-4 animate-fade-in">
            <div className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-sm text-foreground/90 border-b border-border last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex justify-center rounded-full bg-accent-gradient px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Book a call
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
