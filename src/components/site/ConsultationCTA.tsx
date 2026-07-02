import { Link } from "@tanstack/react-router";

interface ConsultationCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export function ConsultationCTA({
  title = "Ready to start?",
  description = "Book a free consultation to discuss how we can engineer a solution for your operations.",
  buttonText = "Project Inquiry",
  href = "/contact",
}: ConsultationCTAProps) {
  return (
    <div className="mt-12 p-10 rounded-3xl bg-primary/5 border border-primary/20 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md bg-primary/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10">
        <h3 className="font-display text-3xl text-foreground mb-4">{title}</h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">{description}</p>
        <Link
          to={href}
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
