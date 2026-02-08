"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import heroContent from "../../../content/hero.json";

export default function HeroSection() {
  const content = heroContent;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImage}
          alt="Soins et bien-être féminin"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Overlay gradient - dark with golden tint for luxurious feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-deep/70 via-noir/60 to-noir-deep/80" />
      
      {/* Subtle golden radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--dore-principal)_0%,_transparent_70%)] opacity-[0.08]" />

      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-dore/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Main content - centered */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-24 pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blanc/10 backdrop-blur-sm border border-blanc/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-dore" />
          <span className="text-sm font-medium text-blanc/90 tracking-wide">
            {content.badge}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-7xl font-serif text-blanc leading-[1.1] md:leading-[0.95] mb-8"
        >
          {content.titleBefore}
          <span className="relative inline-block">
            <span className="text-dore">{content.titleHighlight}</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-dore to-transparent origin-center"
            />
          </span>
          {content.titleAfter}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-blanc/80 leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          {content.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            href={content.ctaPrimaryHref}
            variant="primary"
            size="lg"
            icon={<ArrowRight size={20} />}
          >
            {content.ctaPrimary}
          </Button>
          <button
            onClick={() => window.open(content.calendlyUrl, "_blank")}
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-blanc/30 text-blanc font-medium transition-all duration-300 hover:bg-blanc/10 hover:border-blanc/50"
          >
            <Calendar size={20} />
            {content.ctaSecondary}
            <span className="text-blanc/50 group-hover:text-blanc/80 transition-colors">→</span>
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {content.stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl font-serif text-dore">{stat.value}</span>
              <span className="text-sm text-blanc/70 text-left leading-tight">
                {stat.label.split(" ").map((word, i) => (
                  <span key={i}>
                    {word}
                    {i < stat.label.split(" ").length - 1 && <br />}
                  </span>
                ))}
              </span>
              {index < content.stats.length - 1 && (
                <div className="w-px h-12 bg-blanc/20 hidden md:block ml-5" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(26,21,32,0.3)_100%)]" />

      {/* Elegant curved transition */}
      <div className="absolute -bottom-1 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[80px] md:h-[130px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 150V70Q360 120 720 60Q1080 0 1440 50V150H0Z"
            fill="var(--creme-doux)"
            fillOpacity="0.35"
          />
          <path
            d="M0 150V90Q360 130 720 75Q1080 20 1440 70V150H0Z"
            fill="var(--creme-doux)"
          />
        </svg>
      </div>
    </section>
  );
}
