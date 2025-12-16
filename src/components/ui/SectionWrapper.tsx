"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  background?: "clair" | "creme" | "blanc" | "noir";
  id?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  background = "clair",
  id,
}: SectionWrapperProps) {
  const backgrounds = {
    clair: "bg-clair",
    creme: "bg-creme",
    blanc: "bg-blanc",
    noir: "bg-noir text-blanc",
  };

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`py-20 md:py-28 ${backgrounds[background]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
    </motion.section>
  );
}

