import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type FlatPosterProps = {
  src: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. "1414 / 2000". */
  aspectRatio: string;
  variant: "hoverLift" | "suspend";
  className?: string;
};

const SCALE_FROM = 0.85;
const Y_FROM = 20; // px

/**
 * Single flat poster (no layer separation) — gets the same scroll-scrubbed
 * product-reveal entrance as LayeredPoster's hero layer (scale + opacity,
 * spring riding on scroll progress, reversible as the poster scrolls
 * in/out of view), then a variant-specific idle/interaction treatment once
 * settled.
 */
export function FlatPoster({ src, alt, aspectRatio, variant, className }: FlatPosterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [settled, setSettled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "start 38%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 210, damping: 16, mass: 0.7 });

  useMotionValueEvent(progress, "change", (v) => setSettled(v > 0.97));

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const scale = useTransform(progress, [0, 1], [SCALE_FROM, 1], { clamp: false });
  const revealY = useTransform(progress, [0, 1], [Y_FROM, 0], { clamp: false });

  if (reduceMotion) {
    return (
      <div
        ref={containerRef}
        className={cn("relative w-full overflow-hidden", className)}
        style={{ aspectRatio }}
      >
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio }}
    >
      <motion.div className="h-full w-full" style={{ opacity, scale, y: revealY }}>
        {variant === "suspend" ? (
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover"
            animate={settled ? { y: [0, -12, 0] } : undefined}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          // HOVER REVEAL — this is a single flat raster, so the treatment here is a
          // whole-poster lift/scale. The brief's cloche-lift + leaf-scatter reveal
          // needs this poster re-exported into layers (cloche / dish / leaves) so
          // they can animate as independent elements — not achievable from one
          // flat image.
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.035, y: -8 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          />
        )}
      </motion.div>
    </div>
  );
}
