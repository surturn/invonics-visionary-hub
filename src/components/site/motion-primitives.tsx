import { useEffect, useRef, type CSSProperties } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  animate,
  type Variants,
} from "motion/react";

/**
 * Shared motion primitives for the stacked-scroll "feel" (overlay panels,
 * count-up metrics, on-load cascade). Single source of truth so /concept-node
 * and /home-v2 (and any future rollout onto /) can't drift apart.
 *
 * Everything collapses to instant/visible under prefers-reduced-motion.
 */

// Snappy, slightly settling ease — mechanical, not floaty.
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * On-load cascade variants for a container + its children. Defaults match the
 * home-v2 tuning; callers can dial the stagger/travel/duration to preserve a
 * lighter feel (e.g. concept-node) without forking the shape.
 */
export function makeCascade({
  stagger = 0.08,
  delayChildren = 0.05,
  itemY = 16,
  duration = 0.5,
}: {
  stagger?: number;
  delayChildren?: number;
  itemY?: number;
  duration?: number;
} = {}): { container: Variants; item: Variants } {
  return {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: stagger, delayChildren } },
    },
    item: {
      hidden: { opacity: 0, y: itemY },
      show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
    },
  };
}

/**
 * A sticky, full-height panel. Because it pins to top:0, it paints over
 * whatever precedes it as you scroll — the "overlay then replace" behavior.
 * Content cross-fades + rises in as the panel scrolls up into view.
 *
 * The panel owns only the sticky-overlay MECHANICS. The caller owns the paint:
 * pass the opaque background / borders / padding via `className` (+ `style` for
 * an inline color), and the content-wrapper layout via `innerClassName`. This
 * keeps the primitive theme-agnostic (dark home-v2 vs. light concept-node).
 *
 * CONSTRAINT: only content that fits within the viewport may be pinned here —
 * taller content is clipped by the min-h-[100svh] panel. Tall sections should
 * be a normal opaque section that scrolls over the stack instead.
 */
export function StackPanel({
  children,
  id,
  className = "",
  innerClassName = "",
  style,
  fromOpacity = 0.15,
  fromY = 56,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  fromOpacity?: number;
  fromY?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // 0 as the section's top enters from the bottom → 1 as it pins at the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [fromOpacity, 0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [fromY, 0]);

  return (
    <section
      ref={ref}
      id={id}
      className={`sticky top-0 flex min-h-[100svh] flex-col justify-center ${className}`}
      style={style}
    >
      <motion.div className={innerClassName} style={reduced ? undefined : { opacity, y }}>
        {children}
      </motion.div>
    </section>
  );
}

/**
 * Counts a metric up when it scrolls into view, preserving any non-numeric
 * prefix/suffix ("100+", "48-hr", "99.9%"). Written imperatively to textContent
 * so the per-frame tick never re-renders React (avoids stutter).
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || !inView) return;
    if (reduced) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6, // slower, deliberate build-up
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, target, suffix, decimals, match]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
