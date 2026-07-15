import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type MotionReelProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Once a real cut exists, pass its URL — the placeholder is replaced automatically. */
  videoSrc?: string;
  posterImage?: string;
  className?: string;
};

/**
 * Reserved slot for motion-graphic video content. Renders a real <video>
 * once videoSrc is supplied; until then, shows an intentionally-designed
 * "coming soon" placeholder so the section reads as planned, not broken.
 */
export function MotionReel({
  eyebrow,
  title,
  description,
  videoSrc,
  posterImage,
  className,
}: MotionReelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "start 45%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 210, damping: 18, mass: 0.7 });
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const scale = useTransform(progress, [0, 1], reduceMotion ? [1, 1] : [0.94, 1], { clamp: false });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-dashed border-border/70 bg-secondary/10",
        className,
      )}
      style={{ aspectRatio: "16 / 9" }}
    >
      <motion.div className="relative h-full w-full" style={{ opacity, scale }}>
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={posterImage}
            controls
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-6 text-center">
            <PulsingPlayIcon reduceMotion={!!reduceMotion} />
            <div>
              <div className="label-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                {eyebrow}
              </div>
              <h3 className="mt-2 font-display text-xl text-foreground sm:text-2xl">{title}</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function PulsingPlayIcon({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      {!reduceMotion && (
        <motion.span
          className="absolute inset-0 rounded-full border border-primary/40"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary">
        <Play className="ml-0.5 h-6 w-6 text-primary" strokeWidth={1.6} />
      </span>
    </div>
  );
}
