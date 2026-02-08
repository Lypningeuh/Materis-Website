"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlayCircle,
  FileText,
  MessageCircle,
  Check,
  ArrowRight,
  BookOpen
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import ExamplesModal from "@/components/formations/ExamplesModal";
import packEndoContent from "../../../../content/pack-endo.json";

const content = packEndoContent;

const ressourceIcons = [FileText, PlayCircle, MessageCircle] as const;

const ressources = content.ressources.map((r, index) => ({
  icon: ressourceIcons[index],
  title: r.title,
  desc: r.desc,
  hasExamples: index === 0 || index === 1,
  exampleType: index === 0 ? ("pdf" as const) : index === 1 ? ("video" as const) : null,
}));

export default function PackEndoContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"pdf" | "video">("pdf");

  const openExamplesModal = (type: "pdf" | "video") => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      {/* Présentation */}
      <SectionWrapper background="clair">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {ressources.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-blanc p-6 rounded-xl shadow-soft text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-dore/10 flex items-center justify-center">
                  <item.icon size={24} className="text-dore" />
                </div>
                <h3 className="font-medium text-noir mb-2">{item.title}</h3>
                <p className="text-sm text-noir-light mb-4">{item.desc}</p>
                {item.hasExamples && item.exampleType && (
                  <button
                    onClick={() => openExamplesModal(item.exampleType!)}
                    className="text-sm text-dore hover:text-dore-dark font-medium transition-colors"
                  >
                    Voir des exemples →
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Modules */}
      <SectionWrapper background="creme">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
          >
            {content.modulesLabel}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-noir"
          >
            {content.modulesTitle}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {content.modules.map((module, index) => (
            <motion.div
              key={module.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-blanc p-6 rounded-xl shadow-soft"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-dore font-serif">{module.num}</span>
                </div>
                <div>
                  <h3 className="font-medium text-noir mb-3">{module.title}</h3>
                  <ul className="space-y-2">
                    {module.content.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-noir-light">
                        <Check size={14} className="text-dore mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Points clés */}
      <SectionWrapper background="blanc">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <BookOpen size={24} className="text-dore" />
            <h2 className="text-2xl font-serif text-noir">{content.learningTitle}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4 text-left"
          >
            {content.learningItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-creme rounded-lg">
                <Check size={18} className="text-dore mt-0.5 flex-shrink-0" />
                <span className="text-noir-light">{item}</span>
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

      {/* Examples Modal */}
      <ExamplesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </>
  );
}
