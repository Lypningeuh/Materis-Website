"use client";

import { ReactNode, useEffect, useRef, useState, memo } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  background?: "clair" | "creme" | "blanc" | "noir";
  id?: string;
  immediate?: boolean;
}

// Use CSS transitions instead of Framer Motion for better performance
function SectionWrapper({
  children,
  className = "",
  background = "clair",
  id,
  immediate = false,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(immediate);

  useEffect(() => {
    if (immediate || revealed) return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [immediate, revealed]);

  const backgrounds = {
    clair: "bg-clair",
    creme: "bg-creme",
    blanc: "bg-blanc",
    noir: "bg-noir text-blanc",
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`py-20 md:py-28 ${backgrounds[background]} ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-500 ease-out ${
          revealed 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-6"
        }`}
        style={{ willChange: revealed ? "auto" : "transform, opacity" }}
      >
        {children}
      </div>
    </section>
  );
}

export default memo(SectionWrapper);
