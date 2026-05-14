import { useState } from "react";
import { z } from "zod";
import { Reveal } from "./Reveal";
import { WA_LINK, WhatsAppIcon } from "./FloatingWhatsApp";
import { Bot, Send, FolderOpen } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Add a few more details").max(1500),
});

export function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 border-t border-border/60 overflow-hidden"
    >
      <ContactBackdrop />

      <div className="mx-auto max-w-7xl px-5 relative">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
              <span className="tracking-[0.18em] uppercase">Contact · KE</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] tracking-tight">
              <span className="text-gradient">Let&rsquo;s build something </span>
              <span className="text-gradient-accent">intelligent.</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              Whether you need software systems, branding, automation, digital experiences, IT
              equipment supply, Starlink installation, or modern business solutions — Invonics
              Technologies is ready to bring your vision to life.
            </p>
          </Reveal>
        </div>

        {/* CTA stack — WhatsApp dominant */}
        <Reveal delay={200}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 max-w-5xl mx-auto">
            {/* Primary — WhatsApp */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative md:col-span-6 overflow-hidden rounded-3xl p-6 md:p-7 text-white"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.18 150) 0%, oklch(0.5 0.16 160) 100%)",
              }}
            >
              <div className="absolute -top-16 -right-12 h-56 w-56 rounded-full bg-white/15 blur-3xl group-hover:scale-110 transition-transform duration-700" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-80">
                    <span className="h-1.5 w-1.5 rounded-full bg-white pulse-glow" /> Primary
                  </div>
                  <div className="mt-3 font-display text-2xl md:text-3xl leading-tight">
                    Chat on WhatsApp
                  </div>
                  <div className="mt-2 text-sm opacity-85 max-w-xs">
                    Pre-filled inquiry · we usually reply in under 5 minutes.
                  </div>
                </div>
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 wa-pulse">
                  <WhatsAppIcon className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="relative mt-7 inline-flex items-center gap-2 text-sm font-medium">
                Start chat <span aria-hidden>→</span>
              </div>
            </a>

            {/* Secondary trio */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <SecondaryCTA
                href="#booking"
                icon={<Bot className="h-4 w-4" />}
                label="Ask the Assistant"
                sub="Guided project intake"
              />
              <SecondaryCTA
                href="#inquiry-form"
                icon={<Send className="h-4 w-4" />}
                label="Send an Inquiry"
                sub="48-hr response"
              />
              <SecondaryCTA
                href="/#work"
                icon={<FolderOpen className="h-4 w-4" />}
                label="View Portfolio"
                sub="Selected work"
              />
            </div>
          </div>
        </Reveal>

        {/* Inquiry form */}
        <Reveal delay={260}>
          <form
            id="inquiry-form"
            onSubmit={onSubmit}
            className="mt-14 max-w-4xl mx-auto glass-strong rounded-3xl p-6 md:p-8 shadow-card noise"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field name="name" label="Full name" placeholder="Ada Okafor" error={errors.name} />
              <Field
                name="email"
                label="Email"
                type="email"
                placeholder="ada@company.com"
                error={errors.email}
              />
              <Field
                name="company"
                label="Company / Organization"
                placeholder="Acme Inc."
                error={errors.company}
                required={false}
              />
            </div>
            <div className="mt-4">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                Project brief
              </label>
              <textarea
                name="message"
                rows={5}
                maxLength={1500}
                placeholder="Tell us about your goals, timeline and what should happen next…"
                className={`mt-2 w-full rounded-xl bg-background/40 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                  errors.message ? "border-destructive/60" : "border-border focus:border-primary/60"
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-xs text-muted-foreground">
                We never share your details. Replies in &lt; 1 business day.
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:translate-y-[-1px] transition-transform"
              >
                {sent ? "Message sent ✓" : "Send inquiry"}
                {!sent && (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function SecondaryCTA({
  href,
  icon,
  label,
  sub,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <a
      href={href}
      className="group h-full rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:ring-glow flex flex-col justify-between"
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary border border-border text-primary">
        {icon}
      </div>
      <div className="mt-6">
        <div className="font-display text-base text-foreground leading-tight">{label}</div>
        <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
      </div>
    </a>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  error,
  required = true,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
        {!required && <span className="ml-1 normal-case text-muted-foreground/60">(optional)</span>}
      </span>
      <input
        name={name}
        type={type}
        maxLength={255}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-xl bg-background/40 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
          error ? "border-destructive/60" : "border-border focus:border-primary/60"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </label>
  );
}

function ContactBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-28 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-2xl" />
    </div>
  );
}
