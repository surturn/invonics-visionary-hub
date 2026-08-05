import { useState } from "react";
import { z } from "zod";
import { Reveal } from "./Reveal";
import { WA_LINK, WhatsAppIcon } from "./FloatingWhatsApp";
import { Send } from "lucide-react";
import mascot from "@/assets/invonics-mascot.webp";

const step1Schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
});

const step2Schema = z.object({
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Add a few more details").max(1500),
});

const fullSchema = step1Schema.merge(step2Schema);

export function Contact() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleNext = () => {
    const r = step1Schema.safeParse(formData);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      handleNext();
      return;
    }

    const r = fullSchema.safeParse(formData);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const { name, email, company, message } = r.data;
      const subject = encodeURIComponent(
        `New Project Inquiry from ${name}${company ? ` (${company})` : ""}`
      );
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\n\nProject Brief:\n${message}`
      );
      window.location.href = `mailto:sales@invonicstechnologies.com?subject=${subject}&body=${body}`;
      setSent(true);
    } catch (err) {
      setErrors({ message: "Failed to open email client. Please try WhatsApp instead." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border/60 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 assistant-grid opacity-70" />

      <div className="mx-auto max-w-7xl px-5 relative">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Column (Mascot / Visual) */}
          <Reveal className="w-full min-w-0 order-2 lg:order-1" variant="left">
            <div className="assistant-panel relative overflow-hidden rounded-[2rem] border border-border bg-card/70 p-8 md:p-12">
              <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="relative mx-auto w-full max-w-[340px]">
                {/* Glow behind the robot */}
                <div className="absolute inset-x-8 bottom-4 h-12 rounded-full bg-primary/15 blur-2xl" />
                <img
                  src={mascot}
                  alt="Invonics Assistant robot mascot"
                  loading="lazy"
                  decoding="async"
                  className="relative w-full h-auto object-contain drop-shadow-none"
                />
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
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
                    Need a faster reply? Chat on WhatsApp
                  </span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Column (Form / Copy) */}
          <Reveal delay={120} className="w-full min-w-0 order-1 lg:order-2" variant="right">
            <div>
              <div className="label-mono mb-4">
                <span className="text-primary">●</span>&nbsp; Contact · KE
              </div>
              <h2 className="font-display text-4xl leading-[1.04] text-gradient md:text-5xl">
                Let&rsquo;s build something intelligent.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
                Whether you need a custom software system, workflow automation, or a web platform,
                we&rsquo;re ready to help you build what&rsquo;s next.
              </p>

              <div className="mt-10">
                <form
                  id="inquiry-form"
                  onSubmit={onSubmit}
                  className="glass-strong rounded-3xl p-6 md:p-8 shadow-card noise"
                >
                  {sent ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                      <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                        <Send className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-2xl text-foreground mb-2">Message Sent</h3>
                      <p className="text-muted-foreground text-sm max-w-[250px] mx-auto">
                        We&rsquo;ve received your brief and will get back to you within 1 business day.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Step Indicator */}
                      <div className="mb-8 flex items-center justify-between">
                        <div className="text-xs uppercase tracking-widest text-muted-foreground">
                          Step {step} of 2
                        </div>
                        <div className="flex gap-1.5">
                          <div
                            className={`h-1.5 w-8 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-border"}`}
                          />
                          <div
                            className={`h-1.5 w-8 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-border"}`}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {step === 1 && (
                          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                            <Field
                              name="name"
                              label="Full name"
                              placeholder="Ada Okafor"
                              value={formData.name}
                              onChange={handleChange}
                              error={errors.name}
                            />
                            <Field
                              name="email"
                              label="Email"
                              type="email"
                              placeholder="ada@company.com"
                              value={formData.email}
                              onChange={handleChange}
                              error={errors.email}
                            />
                            <div className="pt-2">
                              <button
                                type="button"
                                onClick={handleNext}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent-gradient px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow hover:translate-y-[-1px] transition-transform"
                              >
                                Continue
                                <svg
                                  className="h-4 w-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    d="M5 12h14M13 5l7 7-7 7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                            <Field
                              name="company"
                              label="Company / Organization"
                              placeholder="Acme Inc."
                              value={formData.company}
                              onChange={handleChange}
                              error={errors.company}
                              required={false}
                            />
                            <div>
                              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                                Project brief
                              </label>
                              <textarea
                                name="message"
                                rows={4}
                                maxLength={1500}
                                placeholder="Tell us about your goals, timeline and what should happen next…"
                                value={formData.message}
                                onChange={handleChange}
                                className={`mt-2 w-full rounded-xl bg-background/40 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                                  errors.message
                                    ? "border-destructive/60"
                                    : "border-border focus:border-primary/60"
                                }`}
                              />
                              {errors.message && (
                                <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
                              )}
                            </div>
                            <div className="pt-2 flex gap-3">
                              <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-border/50"
                              >
                                Back
                              </button>
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent-gradient px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow hover:translate-y-[-1px] transition-transform disabled:opacity-70 disabled:hover:translate-y-0"
                              >
                                {isSubmitting ? "Sending..." : "Send inquiry"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  error,
  required = true,
  value,
  onChange,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
        {!required && (
          <span className="ml-1 normal-case text-muted-foreground/60">(optional)</span>
        )}
      </span>
      <input
        name={name}
        type={type}
        maxLength={255}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`mt-2 w-full rounded-xl bg-background/40 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
          error ? "border-destructive/60" : "border-border focus:border-primary/60"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </label>
  );
}
