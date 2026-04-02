import React, { useEffect, useRef } from "react";
import { AnimatedOnScroll } from "./ui/AnimatedOnScroll";

import dockerIcon from "../../images/icon/2c54f65a03c35ac90f5c73b92da39779-removebg-preview.png";
import awsIcon from "../../images/icon/4a417d1f8cab870d4e93498ae1ae2d21-removebg-preview.png";
import reactIcon from "../../images/icon/8dfe0a99a74efbec4af0d8e440c00282-removebg-preview.png";
import githubIcon from "../../images/icon/23b6a54bb91af033768b372cb7591b41-removebg-preview.png";
import tailwindIcon from "../../images/icon/35f4a6a73282c5da5c44d14127f08cc3-removebg-preview.png";
import nextIcon from "../../images/icon/329ad85f4ab2047cae13d582274f9270-removebg-preview.png";
import flutterIcon from "../../images/icon/560c4353b21b4948e5f0e9508ea07597-removebg-preview.png";
import nodeIcon from "../../images/icon/c3ab7c376b4406efed269d8fa914822d-removebg-preview.png";
import openaiIcon from "../../images/icon/c54e7facca8edc97b11051071f9d235f-removebg-preview.png";
import cursorIcon from "../../images/icon/ce5b1916c72bf055d9cf9c391f9b7237-removebg-preview.png";
import mysqlIcon from "../../images/icon/f8ee696f018c1a4ad6b9972b85fc6b2e-removebg-preview.png";

type TechItem = {
  id: string;
  label: string;
  src: string;
};

const TECH_ITEMS: TechItem[] = [
  { id: "docker", label: "Docker", src: dockerIcon },
  { id: "aws", label: "AWS", src: awsIcon },
  { id: "react", label: "React", src: reactIcon },
  { id: "github", label: "GitHub", src: githubIcon },
  { id: "tailwind", label: "Tailwind CSS", src: tailwindIcon },
  { id: "next", label: "Next.js", src: nextIcon },
  { id: "flutter", label: "Flutter", src: flutterIcon },
  { id: "node", label: "Node.js", src: nodeIcon },
  { id: "openai", label: "OpenAI", src: openaiIcon },
  { id: "cursor", label: "Cursor", src: cursorIcon },
  { id: "mysql", label: "MySQL", src: mysqlIcon },
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
        {[...TECH_ITEMS, ...TECH_ITEMS].map((t, i) => {
          let sizeClass = "";

          if (t.id === "react" || t.id === "tailwind") {
            sizeClass = "tech-icon--emphasized";
          } else if (t.id === "next" || t.id === "flutter" || t.id === "openai") {
            sizeClass = "tech-icon--large";
          }

          return (
            <div key={`${t.id}-${i}`} className="tech-item">
              <img
                src={t.src}
                alt={t.label}
                className={`tech-icon ${sizeClass}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
