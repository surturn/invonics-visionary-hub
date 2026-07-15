import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FrameProps = {
  /** e.g. "01 / NIKE" */
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Shared "canvas" pedestal for a poster composition — matches the hub's
 * card treatment (glass + border) so the gallery reads as part of the same
 * design system rather than a bolted-on demo.
 */
export function Frame({ eyebrow, title, children, className }: FrameProps) {
  return (
    <figure className={cn("group relative rounded-2xl glass p-3 sm:p-4", className)}>
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-secondary/20">
        {children}
      </div>
      <figcaption className="mt-4 flex items-center justify-between px-1">
        <span className="label-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
          {eyebrow}
        </span>
        <span className="font-display text-sm text-foreground">{title}</span>
      </figcaption>
    </figure>
  );
}
