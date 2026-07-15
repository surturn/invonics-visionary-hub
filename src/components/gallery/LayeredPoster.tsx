import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import type { PosterLayer } from "./types";

type LayeredPosterProps = {
  layers: PosterLayer[];
  /** CSS aspect-ratio value, e.g. "1414 / 2000". */
  aspectRatio: string;
  className?: string;
};

const STAGGER = 0.16; // scroll-progress offset between layers, back-to-front
const WINDOW = 0.7; // fraction of the scroll range each layer's reveal spans

/**
 * Stacks a set of transparent layer images into one composition. Assembly is
 * a scroll-scrubbed "product reveal" — each layer materializes via scale +
 * opacity (no falling/tumbling) with a spring riding on top of raw scroll
 * progress so it still overshoots and settles with a slight pop, back-to-
 * front. Fully reversible as the poster scrolls in/out of view. Pointer
 * parallax takes over once the front layer has settled, and is skipped
 * entirely on touch devices.
 */
export function LayeredPoster({ layers, aspectRatio, className }: LayeredPosterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [assembled, setAssembled] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(true);

  useEffect(() => {
    setCoarsePointer(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "start 38%"],
  });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 20, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 20, mass: 0.6 });

  const orderedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);
  const frontIndex = orderedLayers.length - 1;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!assembled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  if (reduceMotion) {
    return (
      <div className={cn("relative w-full overflow-hidden", className)} style={{ aspectRatio }}>
        {orderedLayers.map((layer, index) => (
          <img
            key={layer.src}
            src={layer.src}
            alt={layer.alt}
            loading={index === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-contain"
            style={{ zIndex: layer.zIndex }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio }}
      // Parallax is a pointer-hover effect with no touch equivalent — skip
      // wiring it up at all on coarse-pointer (touch) devices.
      onPointerMove={coarsePointer ? undefined : handlePointerMove}
      onPointerLeave={coarsePointer ? undefined : handlePointerLeave}
    >
      {orderedLayers.map((layer, index) => (
        <PosterLayerImage
          key={layer.src}
          layer={layer}
          index={index}
          scrollYProgress={scrollYProgress}
          springX={springX}
          springY={springY}
          parallaxEnabled={!coarsePointer}
          onSettleChange={index === frontIndex ? setAssembled : undefined}
        />
      ))}
    </div>
  );
}

function PosterLayerImage({
  layer,
  index,
  scrollYProgress,
  springX,
  springY,
  parallaxEnabled,
  onSettleChange,
}: {
  layer: PosterLayer;
  index: number;
  scrollYProgress: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  parallaxEnabled: boolean;
  onSettleChange?: (settled: boolean) => void;
}) {
  const parallax = parallaxEnabled ? (layer.parallax ?? 0) : 0;
  const parallaxX = useTransform(springX, (v) => v * parallax);
  const parallaxY = useTransform(springY, (v) => v * parallax);

  // Back layer starts materializing first; each subsequent layer's window
  // starts later, so they settle back-to-front as the poster scrolls into view.
  const start = index * STAGGER;
  const end = Math.min(1, start + WINDOW);
  const rawProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const progress = useSpring(rawProgress, { stiffness: 210, damping: 16, mass: 0.7 });

  useMotionValueEvent(progress, "change", (v) => {
    onSettleChange?.(v > 0.97);
  });

  // Product-reveal materialization: scale + opacity, no tumbling. Background
  // barely moves; the hero (front) layer has the most dramatic scale-in and
  // a gentle upward settle + faint rotation for a "landing into focus" feel.
  const scaleFrom = index === 0 ? 1.06 : index === 1 ? 0.88 : 0.78;
  const yFrom = index === 0 ? 0 : 14 + index * 8;
  const rotateFrom = index === 0 ? 0 : index === 1 ? -1.5 : 3;

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const scale = useTransform(progress, [0, 1], [scaleFrom, 1], { clamp: false });
  const revealY = useTransform(progress, [0, 1], [yFrom, 0], { clamp: false });
  const rotate = useTransform(progress, [0, 1], [rotateFrom, 0], { clamp: false });

  // Sized as an explicit fraction of the shared canvas (not left to
  // object-contain, which would just blow a small crop up to fill its box —
  // see LayeredPoster's docstring). Centered within the full-bleed parent.
  const widthPct = (layer.widthPct ?? 1) * 100;
  const heightPct = (layer.heightPct ?? 1) * 100;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: layer.zIndex, x: parallaxX, y: parallaxY }}
    >
      <motion.div
        style={{ opacity, scale, y: revealY, rotate, width: `${widthPct}%`, height: `${heightPct}%` }}
      >
        <img
          src={layer.src}
          alt={layer.alt}
          loading={index === 0 ? "eager" : "lazy"}
          className="h-full w-full object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
