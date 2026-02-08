"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Users, Sparkles, ArrowRight, Calendar, Laptop, MapPin, Gift } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { useState } from "react";
import cheminsContent from "../../../content/chemins.json";

type ModeType = "elearning" | "presentiel" | null;

const elearningIcons = [Smartphone, Users, Sparkles] as const;

const elearningFormations = cheminsContent.elearningFormations.map((f, i) => ({
  ...f,
  icon: elearningIcons[i],
  color: ["from-dore/25 to-dore-light/15", "from-bronze/15 to-dore-dark/10", "from-noir/5 to-beige/30"][i],
  ...(f.specialFeatureText ? { specialFeature: { text: f.specialFeatureText, placesLeft: f.specialFeaturePlaces } } : {}),
}));

const presentielFormations = cheminsContent.presentielFormations.map((f) => ({
  ...f,
  icon: Calendar,
  color: "from-dore/20 to-dore-light/10",
}));

interface CheminsSectionProps {
  background?: "creme" | "clair" | "blanc";
}

export default function CheminsSection({ background = "creme" }: CheminsSectionProps) {
  const [selectedMode, setSelectedMode] = useState<ModeType>(null);

  return (
    <SectionWrapper background={background}>
      <SectionHeader
        eyebrow={cheminsContent.eyebrow}
        title={cheminsContent.title}
        subtitle={cheminsContent.subtitle}
      />

      {/* Offre spéciale banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <div className="relative rounded-2xl bg-blanc border-2 border-dore/40 p-6 md:p-8 shadow-soft">
          {/* Accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-dore rounded-l-2xl" />

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-dore/10 flex items-center justify-center">
              <Gift size={22} className="text-dore" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-lg md:text-xl font-serif text-noir">
                  {cheminsContent.offerTitle}
                </h3>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-dore text-blanc rounded-full">
                  {cheminsContent.offerBadge}
                </span>
              </div>
              <p className="text-noir-light text-sm md:text-base leading-relaxed mb-3">
                <strong className="text-dore">{cheminsContent.offerDescription}</strong>
              </p>
              <p className="text-sm text-noir-light/80 flex items-center gap-1.5">
                <Users size={14} className="text-dore" />
                {cheminsContent.offerDetails}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Mode selection */}
        {!selectedMode && (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <p className="text-center text-lg text-noir mb-8">
              {cheminsContent.modeSelectionText}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* E-learning option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMode("elearning")}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-dore/20 to-dore-light/10 border-2 border-dore/30 hover:border-dore transition-all duration-300 text-left"
              >
                <div className="w-16 h-16 rounded-2xl bg-dore flex items-center justify-center mb-6 shadow-soft group-hover:scale-105 transition-transform">
                  <Laptop size={32} className="text-blanc" />
                </div>
                <h3 className="text-2xl font-serif text-noir mb-2">
                  {cheminsContent.elearningTitle}
                </h3>
                <p className="text-noir-light mb-4">
                  {cheminsContent.elearningSubtitle}
                </p>
                <div className="flex items-center gap-2 text-dore font-medium">
                  Découvrir les options
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>

              {/* Présentiel option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMode("presentiel")}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-bronze/15 to-beige/20 border-2 border-bronze/30 hover:border-bronze transition-all duration-300 text-left"
              >
                <div className="w-16 h-16 rounded-2xl bg-bronze flex items-center justify-center mb-6 shadow-soft group-hover:scale-105 transition-transform">
                  <MapPin size={32} className="text-blanc" />
                </div>
                <h3 className="text-2xl font-serif text-noir mb-2">
                  {cheminsContent.presentielModeTitle}
                </h3>
                <p className="text-noir-light mb-4">
                  {cheminsContent.presentielModeSubtitle}
                </p>
                <div className="flex items-center gap-2 text-bronze font-medium">
                  Découvrir les options
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* E-learning formations */}
        {selectedMode === "elearning" && (
          <motion.div
            key="elearning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back button */}
            <button
              onClick={() => setSelectedMode(null)}
              className="mb-8 flex items-center gap-2 text-noir-light hover:text-dore transition-colors"
            >
              <ArrowRight size={16} className="rotate-180" />
              Retour au choix
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-serif text-noir mb-3">
                {cheminsContent.elearningTitle}
              </h3>
              <p className="text-noir-light max-w-2xl">
                {cheminsContent.elearningIntro}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {elearningFormations.map((formation, index) => (
                <div
                  key={formation.name}
                  className="relative group"
                >
                  {formation.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-4 py-1.5 bg-dore text-blanc text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5">
                        <Sparkles size={12} />
                        Recommandé
                      </span>
                    </div>
                  )}

                  <div
                    className={`h-full p-8 rounded-2xl bg-gradient-to-br ${formation.color} border-2 ${
                      formation.featured ? "border-dore shadow-lg" : "border-transparent"
                    } hover:border-dore/50 transition-all duration-400 group-hover:shadow-soft`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-105 transition-transform ${
                      formation.featured ? "bg-dore" : "bg-blanc/80"
                    }`}>
                      <formation.icon size={32} className={formation.featured ? "text-blanc" : "text-dore"} />
                    </div>

                    <h3 className="text-2xl font-serif text-noir mb-1">{formation.name}</h3>
                    <p className="text-dore font-medium mb-4">&ldquo;{formation.accroche}&rdquo;</p>

                    <p className="text-noir-light leading-relaxed mb-6">
                      {formation.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {formation.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-noir-light"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${formation.featured ? "bg-dore" : "bg-dore/60"}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Special feature with scarcity */}
                    {"specialFeature" in formation && formation.specialFeature && (
                      <div className="mb-6 relative overflow-hidden">
                        <div className="p-4 bg-blanc border border-dore/40 rounded-xl shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0">
                              <MapPin size={18} className="text-dore" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-noir">{formation.specialFeature.text}</p>
                              <p className="text-xs text-dore mt-0.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-dore animate-pulse" />
                                {formation.specialFeature.placesLeft} de disponibles
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      href={formation.href}
                      variant={formation.featured ? "primary" : "outline"}
                      size="sm"
                      className="w-full"
                      icon={<ArrowRight size={16} />}
                    >
                      Découvrir {formation.name}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Présentiel formations */}
        {selectedMode === "presentiel" && (
          <motion.div
            key="presentiel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back button */}
            <button
              onClick={() => setSelectedMode(null)}
              className="mb-8 flex items-center gap-2 text-noir-light hover:text-dore transition-colors"
            >
              <ArrowRight size={16} className="rotate-180" />
              Retour au choix
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-serif text-noir mb-3">
                {cheminsContent.presentielModeTitle}
              </h3>
              <p className="text-noir-light max-w-2xl">
                {cheminsContent.presentielIntro}
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              {presentielFormations.map((formation) => (
                <div
                  key={formation.name}
                  className="relative group"
                >
                  <div
                    className={`h-full p-8 rounded-2xl bg-gradient-to-br ${formation.color} border-2 border-transparent hover:border-dore/50 transition-all duration-400 group-hover:shadow-soft`}
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-105 transition-transform bg-blanc/80">
                      <formation.icon size={32} className="text-dore" />
                    </div>

                    <h3 className="text-2xl font-serif text-noir mb-1">{formation.name}</h3>
                    <p className="text-dore font-medium mb-4">&ldquo;{formation.accroche}&rdquo;</p>

                    <p className="text-noir-light leading-relaxed mb-6">
                      {formation.description}
                    </p>

                    <ul className="space-y-2 mb-8">
                      {formation.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-noir-light"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-dore/60" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      href={formation.href}
                      variant="outline"
                      size="sm"
                      className="w-full"
                      icon={<ArrowRight size={16} />}
                    >
                      Découvrir {formation.name}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
