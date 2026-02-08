"use client";

import { motion } from "framer-motion";
import { Play, MessageCircle, HandHeart } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import piliersContent from "../../../content/piliers.json";

// Map icon names to components (icons can't be stored in JSON)
const iconMap = [Play, MessageCircle, HandHeart];

export default function PiliersSection() {
  const content = piliersContent;

  return (
    <SectionWrapper background="blanc">
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="grid md:grid-cols-3 gap-8">
        {content.piliers.map((pilier, index) => {
          const Icon = iconMap[index] || Play;
          return (
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
                  <Icon size={28} className={pilier.highlight ? "text-blanc" : "text-dore"} />
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
          );
        })}
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
            <p className="text-sm font-medium text-dore mb-2">{content.advantageLabel}</p>
            <h3 className="text-2xl font-serif text-noir mb-3">
              {content.advantageTitle}
            </h3>
            <p className="text-noir-light">
              {content.advantageDescription}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            {content.advantageStats.map((stat) => (
              <div key={stat.label} className="p-4 bg-blanc rounded-xl shadow-soft">
                <p className="text-2xl font-serif text-dore mb-1">{stat.value}</p>
                <p className="text-sm text-noir-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
