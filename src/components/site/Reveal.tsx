import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "grid" | "dock" | "trace";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if the element is already visible in the viewport right now.
    // If it is, skip the animation entirely and keep it visible.
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (inViewport) {
      // Already on screen — never hide it, just mark it done
      el.classList.add("in");
      return;
    }

    // Element is below the fold — hide it and animate on scroll
    el.classList.add("reveal-hidden");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            el.classList.add("in");
            el.classList.remove("reveal-hidden");
          }, delay);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0 },
    );

    io.observe(el);

    return () => io.disconnect();
  }, [delay]);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      data-reveal={variant}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
