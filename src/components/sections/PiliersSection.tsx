"use client";

import { motion } from "framer-motion";
import { Play, MessageCircle, HandHeart } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

const piliers = [
  {
    icon: Play,
    title: "Formation digitale complète",
    description:
      "Accès immédiat à la plateforme vschool avec 8 modules vidéo, documents PDF téléchargeables et replay illimité.",
    features: ["8 modules vidéo HD", "PDF & fiches pratiques", "Accès à vie"],
    highlight: true,
  },
  {
    icon: MessageCircle,
    title: "Accompagnement continu",
    description:
      "Groupe WhatsApp pour vos questions en temps réel, lives bi-mensuels pour les études de cas avec la communauté.",
    features: ["Réponse sous 24h", "Lives bi-mensuels", "Communauté active"],
  },
  {
    icon: HandHeart,
    title: "Pratique guidée",
    description:
      "Application sur vos vraies patientes avec possibilité de journée de pratique accompagnée en cabinet.",
    features: ["Cas réels", "Journée pratique", "Supervision personnalisée"],
  },
];

export default function PiliersSection() {
  return (
    <SectionWrapper background="blanc">
      <SectionHeader
        eyebrow="La méthode MATERIS"
        title="3 piliers pour une transformation durable"
        subtitle="Un accompagnement e-learning complet : autonomie, coaching personnalisé et lives de groupe pour ne plus être seule dans votre cabinet."
      />

      <div className="grid md:grid-cols-3 gap-8">
        {piliers.map((pilier, index) => (
          <motion.div
            key={pilier.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="group relative"
          >
            {/* Card */}
            <div className={`h-full p-8 rounded-2xl border transition-all duration-400 shadow-soft-hover ${
              pilier.highlight 
                ? "bg-gradient-to-br from-dore/10 to-dore/5 border-dore/30 hover:border-dore/50" 
                : "bg-clair border-beige hover:border-dore/30"
            }`}>
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                pilier.highlight 
                  ? "bg-dore group-hover:bg-dore-dark" 
                  : "bg-dore/10 group-hover:bg-dore/20"
              }`}>
                <pilier.icon size={28} className={pilier.highlight ? "text-blanc" : "text-dore"} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif text-noir mb-3">
                {pilier.title}
              </h3>
              <p className="text-noir-light leading-relaxed mb-6">
                {pilier.description}
              </p>

              {/* Features list */}
              <ul className="space-y-2">
                {pilier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-noir-light"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${pilier.highlight ? "bg-dore" : "bg-dore/60"}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Number indicator */}
            <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center shadow-lg ${
              pilier.highlight ? "bg-dore text-blanc" : "bg-blanc text-dore border border-dore/30"
            }`}>
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Digital advantage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-dore/10 via-creme to-dore/10 border border-dore/20"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm font-medium text-dore mb-2">Avantage digital</p>
            <h3 className="text-2xl font-serif text-noir mb-3">
              Formez-vous quand vous voulez, où vous voulez
            </h3>
            <p className="text-noir-light">
              Pas de week-ends sacrifiés, pas de déplacements coûteux.
              Apprenez à votre rythme avec un accès illimité aux contenus.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-blanc rounded-xl shadow-soft">
              <p className="text-2xl font-serif text-dore mb-1">24/7</p>
              <p className="text-sm text-noir-light">Accès aux modules</p>
            </div>
            <div className="p-4 bg-blanc rounded-xl shadow-soft">
              <p className="text-2xl font-serif text-dore mb-1">∞</p>
              <p className="text-sm text-noir-light">Replay illimité</p>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
