import React, { useEffect, useRef } from "react";
import { AnimatedOnScroll } from "./ui/AnimatedOnScroll";

const TECH_ITEMS = [
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Vite",
  "PostgreSQL",
  "REST APIs",
  "Secure APIs",
];

export const TechRail: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const pause = () => {
      rail.style.animationPlayState = "paused";
    };
    const resume = () => {
      rail.style.animationPlayState = "running";
    };
    rail.addEventListener("mouseenter", pause);
    rail.addEventListener("mouseleave", resume);
    return () => {
      rail.removeEventListener("mouseenter", pause);
      rail.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="tech-rail" id="tech" aria-label="Technology stack">
      <div className="tech-rail__container">
        <AnimatedOnScroll>
          <div className="tech-rail-header">
            <p className="tech-rail-eyebrow">Technology Stack</p>
            <h2 className="tech-rail-title">Powered by Modern Technology</h2>
          </div>
        </AnimatedOnScroll>
      </div>
      <div ref={railRef} className="tech-rail-track">
        {[...TECH_ITEMS, ...TECH_ITEMS].map((t, i) => (
          <div key={`${t}-${i}`} className="tech-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="3" className="tech-item-dot" />
            </svg>
            <span className="tech-label">{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
