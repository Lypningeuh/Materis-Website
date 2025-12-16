"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  overtitle?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function PageHeader({
  overtitle,
  title,
  subtitle,
  centered = true,
}: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-creme overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-dore/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-beige/60 blur-3xl" />
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--noir-principal) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className={`relative max-w-4xl mx-auto px-6 lg:px-8 ${centered ? "text-center" : ""}`}>
        {overtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-dore" />
              <span className="text-sm font-medium tracking-widest uppercase text-dore">
                {overtitle}
              </span>
              <span className="w-8 h-px bg-dore" />
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-noir leading-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-noir-light leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom curve transition */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[40px] md:h-[60px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V30C360 50 720 10 1080 30C1260 40 1380 35 1440 30V60H0Z"
            fill="var(--clair-principal)"
          />
        </svg>
      </div>
    </section>
  );
}

