"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-clair overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-clair via-clair to-creme/50" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-dore/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-beige/50 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dore/10 border border-dore/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-dore animate-pulse" />
              <span className="text-sm font-medium text-dore">
                25+ ans d&apos;expérience
              </span>
            </motion.div>

            {/* Main title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-noir leading-tight mb-6">
              Former des praticiens qui prennent{" "}
              <span className="text-dore">vraiment</span> soin des femmes
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-noir-light leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Endométriose, douleurs pelviennes, santé féminine : des formations
              ancrées dans 25 ans de pratique pour passer de la technique au{" "}
              <em className="text-noir font-medium">geste juste</em>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                href="/formations"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={20} />}
              >
                Découvrir les formations
              </Button>
              <Button
                href="https://calendly.com"
                variant="outline"
                size="lg"
                external
                icon={<Calendar size={20} />}
              >
                Prendre RDV
              </Button>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 flex items-center gap-8 justify-center lg:justify-start text-noir-light"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif text-dore">12+</span>
                <span className="text-sm">praticiens formés</span>
              </div>
              <div className="w-px h-8 bg-beige" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif text-dore">5</span>
                <span className="text-sm">formations disponibles</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-dore/20 via-transparent to-dore/10 rounded-3xl blur-sm" />
            
            {/* Main image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-soft">
              <div className="aspect-[4/5] lg:aspect-[3/4] relative">
                <Image
                  src="/photo_sandrine-verticale.png"
                  alt="Sandrine, fondatrice de MATERIS"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gold overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-noir/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 p-5 bg-blanc/95 backdrop-blur-sm rounded-xl shadow-soft"
              >
                <p className="text-sm font-medium text-noir mb-1">Sandrine</p>
                <p className="text-xs text-noir-light">
                  Ostéopathe formatrice • Fondatrice de MATERIS
                </p>
              </motion.div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -right-4 top-1/4 w-20 h-20 grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-dore/30" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-noir-light tracking-widest uppercase">
          Découvrir
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-beige flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-dore"
          />
        </div>
      </motion.div>
    </section>
  );
}

