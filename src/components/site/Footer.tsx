export function Footer() {
  return (
    <footer className="relative pt-20 pb-10">
      <div className="glow-divider mb-16" />
      <div className="mx-auto max-w-7xl px-5">
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
              Engineering Tomorrow, Today. Software, infrastructure, automation and
              brand — built to compound.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-4">
              Studio
            </div>
            <ul className="space-y-2.5 text-sm">
              <li><a className="text-foreground/80 hover:text-foreground" href="#services">Services</a></li>
              <li><a className="text-foreground/80 hover:text-foreground" href="#work">Work</a></li>
              <li><a className="text-foreground/80 hover:text-foreground" href="#process">Process</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-sm">
              <li><a className="text-foreground/80 hover:text-foreground" href="#about">About</a></li>
              <li><a className="text-foreground/80 hover:text-foreground" href="#vision">Vision</a></li>
              <li><a className="text-foreground/80 hover:text-foreground" href="#contact">Contact</a></li>
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
                className="bg-transparent flex-1 text-sm placeholder:text-muted-foreground/60 outline-none"
              />
              <button className="rounded-full bg-accent-gradient px-3.5 py-2 text-xs font-medium text-primary-foreground">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Invonics Technologies. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/80 font-mono">
            v2026.01 · Built in the dark.
          </p>
        </div>
      </div>
    </footer>
  );
}
