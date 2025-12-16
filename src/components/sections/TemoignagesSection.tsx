"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

const temoignagesPraticiens = [
  {
    quote:
      "La formation avec Sandrine a complètement transformé ma pratique. Je me sens enfin légitime face aux patientes souffrant d'endométriose.",
    author: "Marie D.",
    role: "Ostéopathe, Lyon",
    year: 2024,
  },
  {
    quote:
      "Ce qui m'a le plus marquée, c'est l'accompagnement sur le terrain. Travailler sur mes propres patientes avec Sandrine à mes côtés, c'était exactement ce dont j'avais besoin.",
    author: "Sophie M.",
    role: "Ostéopathe, Bordeaux",
    year: 2024,
  },
  {
    quote:
      "Le groupe WhatsApp est une mine d'or. Pouvoir poser mes questions en temps réel et avoir une réponse dans l'heure, ça change tout.",
    author: "Julie L.",
    role: "Sage-femme, Montpellier",
    year: 2024,
  },
  {
    quote:
      "Après 10 ans de pratique, je pensais tout savoir. Sandrine m'a ouvert les yeux sur le \"geste juste\" et l'importance du ressenti.",
    author: "Laura M.",
    role: "Ostéopathe, Toulouse",
    year: 2023,
  },
];

const temoignagesPatientes = [
  {
    quote:
      "8 ans que je dis que j'ai mal, 8 ans que je souffre et en une séance, vous m'avez changée, libérée.",
  },
  {
    quote: "J'aime mon corps à présent.",
  },
  {
    quote: "Grand grand merci. Mon dos va beaucoup mieux.",
  },
  {
    quote:
      "J'ai réussi à m'asseoir sur les toilettes sans cette douleur qui part de la fesse.",
  },
];

export default function TemoignagesSection() {
  const [currentPraticien, setCurrentPraticien] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPraticien((prev) => (prev + 1) % temoignagesPraticiens.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentPraticien((prev) => (prev + 1) % temoignagesPraticiens.length);
  };

  const prevSlide = () => {
    setCurrentPraticien(
      (prev) =>
        (prev - 1 + temoignagesPraticiens.length) % temoignagesPraticiens.length
    );
  };

  return (
    <SectionWrapper background="noir" className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-dore/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-dore/5 rounded-full blur-3xl" />

      <div className="relative">
        <SectionHeader
          eyebrow="Témoignages"
          title="Ils ont transformé leur pratique"
          subtitle="Les retours des praticiens formés et de leurs patientes."
          light
        />

        {/* Praticiens carousel */}
        <div className="relative mb-20">
          <div className="max-w-4xl mx-auto">
            {/* Main testimonial */}
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPraticien}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 md:p-12 rounded-2xl bg-blanc/5 border border-blanc/10 backdrop-blur-sm"
                >
                  {/* Quote icon */}
                  <Quote size={40} className="text-dore/40 mb-6" />

                  {/* Quote */}
                  <p className="text-xl md:text-2xl text-blanc leading-relaxed mb-8 font-serif">
                    &ldquo;{temoignagesPraticiens[currentPraticien].quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-dore">
                        {temoignagesPraticiens[currentPraticien].author}
                      </p>
                      <p className="text-blanc/60 text-sm">
                        {temoignagesPraticiens[currentPraticien].role}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-dore fill-dore"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-blanc/20 flex items-center justify-center text-blanc/60 hover:text-blanc hover:border-dore transition-colors"
                aria-label="Précédent"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {temoignagesPraticiens.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPraticien(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentPraticien
                        ? "w-8 bg-dore"
                        : "bg-blanc/30 hover:bg-blanc/50"
                    }`}
                    aria-label={`Témoignage ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-blanc/20 flex items-center justify-center text-blanc/60 hover:text-blanc hover:border-dore transition-colors"
                aria-label="Suivant"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Patientes section */}
        <div>
          <h3 className="text-center text-lg font-serif text-blanc/80 mb-8">
            Ce que disent les patientes
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {temoignagesPatientes.map((temoignage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-blanc/5 border border-blanc/10"
              >
                <Quote size={20} className="text-dore/40 mb-3" />
                <p className="text-blanc/80 text-sm italic leading-relaxed">
                  &ldquo;{temoignage.quote}&rdquo;
                </p>
                <p className="mt-3 text-xs text-blanc/40">Patiente anonyme</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

