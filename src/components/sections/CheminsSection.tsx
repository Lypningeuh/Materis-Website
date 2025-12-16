"use client";

import { motion } from "framer-motion";
import { Smartphone, Users, Sparkles, ArrowRight, Gift, Calendar } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const chemins = [
  {
    icon: Smartphone,
    name: "PRAKTIKA",
    accroche: "J'aime l'autonomie",
    description:
      "Formation digitale complète. Je vous guide à distance avec le Pack ENDO, vidéos détaillées et support WhatsApp illimité.",
    features: [
      "100% en ligne, à votre rythme",
      "8 modules vidéo complets",
      "Support WhatsApp illimité",
      "Accès à vie aux contenus",
    ],
    color: "from-dore/25 to-dore-light/15",
    href: "/formations/pack-endo",
    featured: true,
  },
  {
    icon: Users,
    name: "IN SITU",
    accroche: "J'ai besoin d'être accompagnée",
    description:
      "Je viens dans votre cabinet. Formation personnalisée sur vos patientes + journée de pratique incluse.",
    features: [
      "Formation dans votre cabinet",
      "Sur vos vraies patientes",
      "1 journée de pratique incluse",
      "Pas de perte de revenus",
    ],
    color: "from-bronze/15 to-dore-dark/10",
    href: "/formations/in-situ-aurizon",
  },
  {
    icon: Sparkles,
    name: "AURIZON",
    accroche: "Je veux tout changer",
    description:
      "Transformation complète de votre pratique. Accompagnement intensif sur plusieurs mois.",
    features: [
      "Parcours premium personnalisé",
      "Accompagnement intensif",
      "Transformation totale",
      "Suivi sur plusieurs mois",
    ],
    color: "from-noir/5 to-beige/30",
    href: "/formations/in-situ-aurizon",
  },
];

export default function CheminsSection() {
  return (
    <SectionWrapper background="creme">
      <SectionHeader
        eyebrow="Votre chemin"
        title="Trois façons de se former"
        subtitle="Chaque praticien est unique. Choisissez le format qui correspond à votre situation et à vos besoins."
      />

      {/* Offre spéciale banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-dore/20 via-dore/10 to-dore/20 border border-dore/30"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Gift size={20} className="text-dore" />
            <span className="font-semibold text-noir">Offre de lancement</span>
          </div>
          <span className="hidden md:block text-dore">•</span>
          <p className="text-noir-light text-sm md:text-base">
            Formation <strong className="text-dore">Endométriose offerte</strong> pour les 3 premiers inscrits au module présentiel avec gynéco, chirurgien & sage-femme
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {chemins.map((chemin, index) => (
          <motion.div
            key={chemin.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className={`relative group ${chemin.featured ? "md:-mt-4 md:mb-4" : ""}`}
          >
            {/* Featured badge */}
            {chemin.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="px-4 py-1.5 bg-dore text-blanc text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles size={12} />
                  Recommandé
                </span>
              </div>
            )}

            {/* Card */}
            <div
              className={`h-full p-8 rounded-2xl bg-gradient-to-br ${chemin.color} border-2 ${
                chemin.featured ? "border-dore shadow-lg" : "border-transparent"
              } hover:border-dore/50 transition-all duration-400 group-hover:shadow-soft`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-105 transition-transform ${
                chemin.featured ? "bg-dore" : "bg-blanc/80"
              }`}>
                <chemin.icon size={32} className={chemin.featured ? "text-blanc" : "text-dore"} />
              </div>

              {/* Name & Accroche */}
              <h3 className="text-2xl font-serif text-noir mb-1">{chemin.name}</h3>
              <p className="text-dore font-medium mb-4">&ldquo;{chemin.accroche}&rdquo;</p>

              {/* Description */}
              <p className="text-noir-light leading-relaxed mb-6">
                {chemin.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {chemin.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-noir-light"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${chemin.featured ? "bg-dore" : "bg-dore/60"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                href={chemin.href}
                variant={chemin.featured ? "primary" : "outline"}
                size="sm"
                className="w-full"
                icon={<ArrowRight size={16} />}
              >
                {chemin.featured ? "Commencer maintenant" : `Découvrir ${chemin.name}`}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Présentiel teaser - plus léger */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-14 pt-10 border-t border-beige/60"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-beige/50 flex items-center justify-center">
              <Calendar size={20} className="text-noir-light" />
            </div>
            <div>
              <p className="text-noir-light">
                <span className="font-medium text-noir">Formation présentielle</span> également disponible
              </p>
              <p className="text-sm text-noir-light/70">
                5 sessions thématiques • 2025-2026 • Toulouse • Intervenants experts
              </p>
            </div>
          </div>
          <a
            href="/formations/presentiel"
            className="text-sm text-dore hover:text-dore-dark transition-colors flex items-center gap-1 link-underline"
          >
            Voir le programme
            <ArrowRight size={14} />
          </a>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
