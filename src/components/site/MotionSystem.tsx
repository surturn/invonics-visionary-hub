import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function MotionSystem({ children }: { children: ReactNode }) {
  useCursorLight();
  useScrollTelemetry();

  return (
    <>
      <div className="motion-field" aria-hidden>
        <div className="motion-field__grid" />
        <div className="motion-field__cursor" />
        <div className="motion-field__grain" />
      </div>
      <div className="scroll-progress" aria-hidden />
      {children}
    </>
  );
}

function useCursorLight() {
  const target = useRef({ x: 0.5, y: 0.35 });
  const current = useRef({ x: 0.5, y: 0.35 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    const root = document.documentElement;

    const tick = () => {
      const x = current.current.x + (target.current.x - current.current.x) * 0.12;
      const y = current.current.y + (target.current.y - current.current.y) * 0.12;
      current.current = { x, y };
      root.style.setProperty("--cursor-x", `${(x * 100).toFixed(3)}%`);
      root.style.setProperty("--cursor-y", `${(y * 100).toFixed(3)}%`);

      if (Math.abs(target.current.x - x) > 0.001 || Math.abs(target.current.y - y) > 0.001) {
        frame = window.requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      target.current.x = event.clientX / window.innerWidth;
      target.current.y = event.clientY / window.innerHeight;
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function useScrollTelemetry() {
  useEffect(() => {
    let frame = 0;
    const root = document.documentElement;

    const tick = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = window.scrollY / max;
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-y", `${Math.round(window.scrollY)}px`);
      root.style.setProperty("--scroll-drift-x", `${(-44 * progress).toFixed(2)}px`);
      root.style.setProperty("--scroll-drift-y", `${(-88 * progress).toFixed(2)}px`);
      frame = 0;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

export function Magnetic({
  children,
  className = "",
  href,
  strength = 0.18,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const animate = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      tx = (event.clientX - rect.left - rect.width / 2) * strength;
      ty = (event.clientY - rect.top - rect.height / 2) * strength;
      el.style.setProperty("--magnet-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--magnet-y", `${event.clientY - rect.top}px`);
      schedule();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      schedule();
    };

    (el as HTMLElement).addEventListener("pointermove", onMove as EventListener, { passive: true });
    (el as HTMLElement).addEventListener("pointerleave", onLeave as EventListener);

    return () => {
      (el as HTMLElement).removeEventListener("pointermove", onMove as EventListener);
      (el as HTMLElement).removeEventListener("pointerleave", onLeave as EventListener);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength]);

  if (href) {
    const isExternal = href.startsWith("http");

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`magnetic ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={`magnetic ${className}`}
    >
      {children}
    </button>
  );
}

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      el.style.setProperty("--tilt-x", `${((0.5 - y) * 4).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${((x - 0.5) * 4).toFixed(2)}deg`);
      el.style.setProperty("--card-x", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--card-y", `${(y * 100).toFixed(2)}%`);
    };

    const onLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      el.style.setProperty("--card-x", "50%");
      el.style.setProperty("--card-y", "0%");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.08,
}: {
  children?: ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={className} style={{ "--parallax-speed": speed } as CSSProperties}>
      {children}
    </div>
  );
}
