"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  MessageCircle, 
  Target, 
  Check, 
  X, 
  Hand, 
  Heart,
  ArrowRight 
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import methodeContent from "../../../content/methode.json";

// Map icon names to components (icons can't be stored in JSON)
const pilierIcons = [BookOpen, MessageCircle, Target];
const gesteIcons = [Hand, Target, Heart];

export default function MethodeContent() {
  const content = methodeContent;

  return (
    <>
      {/* Les 3 piliers */}
      <SectionWrapper background="clair" immediate>
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
          >
            {content.piliersLabel}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-noir"
          >
            {content.piliersTitle}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.piliers.map((pilier, index) => {
            const Icon = pilierIcons[index] || BookOpen;
            return (
              <motion.div
                key={pilier.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-blanc p-8 rounded-2xl shadow-soft"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-dore/10 flex items-center justify-center">
                  <Icon size={28} className="text-dore" />
                </div>
                <h3 className="text-xl font-serif text-noir mb-3">{pilier.title}</h3>
                <p className="text-noir-light mb-6">{pilier.description}</p>
                <ul className="space-y-3">
                  {pilier.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <Check size={18} className="text-dore mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-noir-light whitespace-pre-line">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Comparatif */}
      <SectionWrapper background="creme" immediate>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
            >
              {content.comparatifLabel}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-noir"
            >
              {content.comparatifTitle}
            </motion.h2>
          </div>

          <div className="bg-blanc rounded-2xl shadow-soft overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 bg-noir text-blanc p-4">
              <div className="font-medium text-center">Formation classique</div>
              <div className="font-medium text-center text-dore">Méthode MATERIS</div>
            </div>

            {/* Rows */}
            {content.comparatif.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-2 border-b border-beige last:border-b-0"
              >
                <div className="p-4 md:p-6 flex items-center gap-3 bg-creme/50">
                  <X size={18} className="text-noir-light/50 flex-shrink-0" />
                  <span className="text-noir-light text-sm md:text-base">{row.classique}</span>
                </div>
                <div className="p-4 md:p-6 flex items-center gap-3">
                  <Check size={18} className="text-dore flex-shrink-0" />
                  <span className="text-noir text-sm md:text-base font-medium">{row.materis}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Le geste juste */}
      <SectionWrapper background="blanc">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium tracking-widest uppercase text-dore mb-4">
              {content.gesteLabel}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-noir mb-6">
              {content.gesteTitle}
            </h2>
            <div className="prose prose-lg text-noir-light">
              <p>{content.gesteIntro}</p>
              <ul>
                {content.gesteBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-creme rounded-2xl p-8 md:p-10"
          >
            <h3 className="text-xl font-serif text-noir mb-6">
              {content.gesteBoxTitle}
            </h3>
            <div className="space-y-6">
              {content.gesteItems.map((item, index) => {
                const Icon = gesteIcons[index] || Target;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-dore/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-dore" />
                    </div>
                    <p className="text-noir-light pt-2">{item}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Pour quels praticiens */}
      <SectionWrapper background="clair">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
            >
              {content.profilsLabel}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-noir"
            >
              {content.profilsTitle}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {content.profils.map((profil, index) => (
              <motion.div
                key={profil.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-blanc p-6 rounded-xl shadow-soft text-center"
              >
                <h3 className="text-lg font-serif text-noir mb-2">{profil.title}</h3>
                <p className="text-sm text-noir-light">{profil.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-dore/10 rounded-xl p-6 text-center"
          >
            <p className="text-noir font-medium mb-2">Pré-requis</p>
            <p className="text-noir-light">
              {content.prerequis}
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper background="creme">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-noir mb-6"
          >
            {content.ctaTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-noir-light mb-8 max-w-xl mx-auto"
          >
            {content.ctaSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button href={content.ctaButtonHref} variant="primary" size="lg" icon={<ArrowRight size={20} />}>
              {content.ctaButtonText}
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}
