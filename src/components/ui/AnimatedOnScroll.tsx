import React, { useRef, useState, useEffect } from "react";

type AnimatedOnScrollProps = {
  children: React.ReactNode;
  /** Stagger index (0-based) for sequential delay. Default 0. */
  staggerIndex?: number;
  /** Delay in ms per stagger index. Default 80. */
  staggerMs?: number;
  /** Root margin for Intersection Observer. */
  rootMargin?: string;
  /** Minimum fraction of element visible to trigger (0-1). Default 0.15. */
  threshold?: number;
  className?: string;
};

export const AnimatedOnScroll: React.FC<AnimatedOnScrollProps> = ({
  children,
  staggerIndex = 0,
  staggerMs = 80,
  rootMargin = "0px 0px -40px 0px",
  threshold = 0.15,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Defer by one frame so initial hidden state paints first (fixes nav-to-page case)
            requestAnimationFrame(() => {
              setIsVisible(true);
              setHasAnimated(true);
            });
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, hasAnimated]);

  const delayMs = staggerIndex * staggerMs;
  const style: React.CSSProperties = isVisible
    ? { animationDelay: `${delayMs}ms` }
    : {};

  return (
    <div
      ref={ref}
      className={`animate-in-scroll ${isVisible ? "animate-in-scroll-visible" : ""} ${className}`.trim()}
      style={Object.keys(style).length ? style : undefined}
    >
      {children}
    </div>
  );
};
