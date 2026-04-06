import { useEffect, useRef } from "react";
import { GreenHeroScene } from "./HomeHeroThreeBackground";

/** Same wireframe shapes as the home hero, for the About section corner. */
export function AboutThreeCornerAccent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<GreenHeroScene | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    sceneRef.current = new GreenHeroScene(el, {
      scrollDrivenCamera: false,
      particleCount: 220,
    });
    return () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none h-[200px] w-[240px] overflow-hidden rounded-2xl border border-emerald-200/80 shadow-md sm:h-[240px] sm:w-[280px]"
      aria-hidden="true"
    />
  );
}
