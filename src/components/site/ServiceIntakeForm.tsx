import { useEffect, useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/contact";
import type { IntakeField, IntakeForm, IntakeStep } from "@/types/content";

type Answers = Record<string, string | string[]>;

const CONTACT_STEP: IntakeStep = {
  title: "How do we reach you?",
  blurb: "Last step. We reply to this address.",
  fields: [
    { id: "contact_name", label: "Your name", type: "text", required: true },
    { id: "contact_email", label: "Email", type: "text", required: true },
    { id: "contact_phone", label: "Phone or WhatsApp", type: "text" },
    { id: "contact_org", label: "Business or organisation", type: "text" },
  ],
};

const inputClass =
  "mt-2 w-full rounded-xl bg-background/40 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/60 transition-all";

function isVisible(field: IntakeField, answers: Answers): boolean {
  if (!field.showIf) return true;
  const value = answers[field.showIf.field];
  if (field.showIf.equals !== undefined) return value === field.showIf.equals;
  if (field.showIf.includes !== undefined) {
    return Array.isArray(value) && value.includes(field.showIf.includes);
  }
  return true;
}

function isEmpty(value: string | string[] | undefined): boolean {
  return Array.isArray(value) ? value.length === 0 : !value || !value.trim();
}

function readSaved(key: string): { answers: Answers; step: number } | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSaved(key: string, value: unknown) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage can be blocked; the form still works without it */
  }
}

export function ServiceIntakeForm({
  serviceSlug,
  serviceTitle,
  form,
}: {
  serviceSlug: string;
  serviceTitle: string;
  form: IntakeForm;
}) {
  const storageKey = `intake:${serviceSlug}`;
  const steps = useMemo(() => [...form.steps, CONTACT_STEP], [form.steps]);
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hydrated = useRef(false);

  // Restore progress after hydration, so server and client markup match.
  useEffect(() => {
    const saved = readSaved(storageKey);
    if (saved) {
      setAnswers(saved.answers ?? {});
      setStepIndex(Math.min(saved.step ?? 0, steps.length - 1));
    }
    hydrated.current = true;
  }, [storageKey, steps.length]);

  useEffect(() => {
    if (hydrated.current && !sent) writeSaved(storageKey, { answers, step: stepIndex });
  }, [answers, stepIndex, sent, storageKey]);

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  const visibleFields = step.fields.filter((f) => isVisible(f, answers));

  const setValue = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => (prev[id] ? { ...prev, [id]: "" } : prev));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    for (const f of visibleFields) {
      const v = answers[f.id];
      if (f.required && isEmpty(v)) next[f.id] = "This one is needed";
      if (f.id === "contact_email" && !isEmpty(v) && !/^\S+@\S+\.\S+$/.test(String(v).trim())) {
        next[f.id] = "That email does not look right";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const focusHeading = () => window.setTimeout(() => headingRef.current?.focus(), 0);

  const goNext = () => {
    if (!validate()) return;
    setStepIndex((i) => i + 1);
    focusHeading();
  };

  const goBack = () => {
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
    focusHeading();
  };

  const buildSummary = (): string => {
    const lines: string[] = [`Service: ${serviceTitle}`, ""];
    for (const s of steps) {
      const rows = s.fields
        .filter((f) => isVisible(f, answers) && !isEmpty(answers[f.id]))
        .map((f) => {
          const v = answers[f.id];
          return `${f.label}: ${Array.isArray(v) ? v.join(", ") : String(v).trim()}`;
        });
      if (rows.length) lines.push(`[${s.title}]`, ...rows, "");
    }
    return lines.join("\n").trim();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLast) {
      goNext();
      return;
    }
    if (!validate()) return;
    const name = String(answers.contact_name ?? "").trim();
    const subject = encodeURIComponent(`${serviceTitle} brief from ${name}`);
    const body = encodeURIComponent(buildSummary());
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (sent) {
    return (
      <div className="glass-strong rounded-3xl p-8 md:p-10 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 border border-primary/20 text-primary">
          <Send className="h-5 w-5" />
        </div>
        <h3 className="font-display text-2xl mb-2">One last click in your email app</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Your email app should have opened with your answers filled in. Press send there and we
          will reply within 1 business day. If nothing opened, copy your answers and email them to{" "}
          <a className="text-primary underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={copySummary}
          className="mt-6 inline-flex items-center justify-center rounded-xl border border-border bg-background/50 px-5 py-3 text-sm font-medium hover:bg-border/50 transition-colors"
        >
          {copied ? "Copied" : "Copy my answers"}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass-strong rounded-3xl p-6 md:p-8 shadow-card"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Step {stepIndex + 1} of {steps.length}
          </div>
          <div
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-valuenow={stepIndex + 1}
            aria-label="Form progress"
            className="flex gap-1.5"
          >
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={`h-1.5 w-6 rounded-full transition-colors ${i <= stepIndex ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>
        </div>
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-2xl outline-none"
          aria-live="polite"
        >
          {step.title}
        </h3>
        {step.blurb && <p className="mt-1 text-sm text-muted-foreground">{step.blurb}</p>}
      </div>

      <div className="space-y-5">
        {visibleFields.map((f) => (
          <FieldInput
            key={f.id}
            field={f}
            value={answers[f.id]}
            error={errors[f.id]}
            onChange={(v) => setValue(f.id, v)}
          />
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-border bg-background/50 px-5 py-3.5 text-sm font-medium hover:bg-border/50 transition-colors"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-xl bg-accent-gradient px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow hover:translate-y-[-1px] transition-transform"
        >
          {isLast ? "Send my brief" : "Continue"}
        </button>
      </div>
    </form>
  );
}

function FieldInput({
  field,
  value,
  error,
  onChange,
}: {
  field: IntakeField;
  value: string | string[] | undefined;
  error?: string;
  onChange: (v: string | string[]) => void;
}) {
  const id = `f-${field.id}`;
  const labelEl = (
    <span className="text-xs uppercase tracking-wider text-muted-foreground">
      {field.label}
      {!field.required && (
        <span className="ml-1 normal-case text-muted-foreground/60">(optional)</span>
      )}
    </span>
  );
  const help = field.help ? (
    <p className="mt-1 text-xs text-muted-foreground/80">{field.help}</p>
  ) : null;
  const err = error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null;

  if (field.type === "radio" || field.type === "multi") {
    const selected = Array.isArray(value) ? value : value ? [value] : [];
    const toggle = (opt: string) => {
      if (field.type === "radio") onChange(opt);
      else
        onChange(selected.includes(opt) ? selected.filter((o) => o !== opt) : [...selected, opt]);
    };
    return (
      <fieldset aria-invalid={!!error}>
        <legend>{labelEl}</legend>
        {help}
        <div className="mt-2 flex flex-wrap gap-2">
          {field.options?.map((opt) => {
            const on = selected.includes(opt);
            return (
              <label
                key={opt}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors focus-within:ring-2 focus-within:ring-ring ${
                  on
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary/40"
                }`}
              >
                <input
                  type={field.type === "radio" ? "radio" : "checkbox"}
                  name={field.id}
                  checked={on}
                  onChange={() => toggle(opt)}
                  className="sr-only"
                />
                {opt}
              </label>
            );
          })}
        </div>
        {err}
      </fieldset>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="block">
        {labelEl}
      </label>
      {help}
      {field.type === "textarea" ? (
        <textarea
          id={id}
          rows={4}
          maxLength={1200}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      ) : field.type === "select" ? (
        <select
          id={id}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          <option value="">Choose one</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={field.id === "contact_email" ? "email" : "text"}
          maxLength={200}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
      {err}
    </div>
  );
}
