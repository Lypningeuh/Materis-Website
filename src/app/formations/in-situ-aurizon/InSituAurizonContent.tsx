"use client";

import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  MapPin,
  Clock,
  Check,
  AlertTriangle,
  Calendar,
  ArrowRight,
  Smartphone,
  Video
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import inSituContent from "../../../../content/in-situ-aurizon.json";

const content = inSituContent;

const conceptIcons = [Smartphone, Users, Video, Clock] as const;

export default function InSituAurizonContent() {
  return (
    <>
      {/* In Situ */}
      <SectionWrapper background="clair">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Users size={24} className="text-dore" />
              <p className="text-sm font-medium tracking-widest uppercase text-dore">
                {content.inSituLabel}
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-noir mb-6">
              {content.inSituTitle}
            </h2>

            <p className="text-xl text-noir-light mb-6 italic">
              &quot;{content.inSituAccroche}&quot;
            </p>

            <div className="prose prose-lg text-noir-light mb-8">
              <p>
                {content.inSituParagraphs[0]}
              </p>
              <p>
                <strong>{content.inSituParagraphs[1]}</strong>
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {content.inSituAvantages.map((avantage) => (
                <li key={avantage} className="flex items-center gap-3">
                  <Check size={18} className="text-dore flex-shrink-0" />
                  <span className="text-noir-light">{avantage}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-blanc p-8 rounded-2xl shadow-soft"
          >
            <h3 className="text-xl font-serif text-noir mb-6">Le concept</h3>

            <div className="space-y-5">
              {content.inSituConcept.map((item, index) => {
                const Icon = conceptIcons[index];
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-dore" />
                    </div>
                    <div>
                      <p className="font-medium text-noir mb-1">{item.title}</p>
                      <p className="text-sm text-noir-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Special feature with scarcity */}
            <div className="mt-6 p-4 bg-blanc border border-dore/40 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-dore" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-noir">{content.inSituSpecialFeature}</p>
                  <p className="text-xs text-dore mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-dore animate-pulse" />
                    {content.inSituPlacesLeft} de disponibles
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-dore/10 rounded-lg flex items-center gap-3">
              <AlertTriangle size={20} className="text-dore flex-shrink-0" />
              <p className="text-sm text-noir">
                <strong>{content.inSituScarcity}</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Aurizon */}
      <SectionWrapper background="noir">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dore/20 mb-6">
              <Sparkles size={18} className="text-dore" />
              <span className="text-dore text-sm font-medium">{content.aurizonBadge}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-blanc mb-4">
              {content.aurizonTitle}
            </h2>

            <p className="text-xl text-blanc/70 italic">
              &quot;{content.aurizonAccroche}&quot;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-blanc/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-blanc/20"
          >
            <p className="text-blanc/80 text-lg mb-8 text-center">
              {content.aurizonDescription}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {content.aurizonInclus.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-blanc/5 rounded-lg"
                >
                  <Check size={18} className="text-dore flex-shrink-0" />
                  <span className="text-blanc/90">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-blanc/60 text-sm mb-6">
                {content.aurizonPricing}
              </p>
              <Button
                href={content.aurizonCalendlyUrl}
                external
                variant="primary"
                size="lg"
                icon={<Calendar size={20} />}
              >
                {content.aurizonCtaText}
              </Button>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Comparatif */}
      <SectionWrapper background="creme">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-noir"
            >
              {content.comparatifTitle}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-blanc rounded-2xl shadow-soft overflow-hidden"
          >
            <div className="grid grid-cols-3 bg-noir text-blanc p-4">
              <div className="font-medium"></div>
              <div className="font-medium text-center">{content.inSituTitle}</div>
              <div className="font-medium text-center text-dore">{content.aurizonTitle}</div>
            </div>

            {content.comparatif.map((row, index) => (
              <div key={index} className="grid grid-cols-3 border-b border-beige last:border-b-0">
                <div className="p-4 flex items-center text-left font-medium text-noir">{row.critere}</div>
                <div className="p-4 flex items-center justify-center text-center text-noir-light">{row.inSitu}</div>
                <div className="p-4 flex items-center justify-center text-center text-noir bg-dore/5">{row.aurizon}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper background="clair">
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
            {content.ctaDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              href={content.ctaCalendlyUrl}
              external
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
            >
              {content.ctaPrimaryText}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              {content.ctaSecondaryText}
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}
