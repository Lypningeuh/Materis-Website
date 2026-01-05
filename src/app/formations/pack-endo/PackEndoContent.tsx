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

const modules = [
  {
    num: 1,
    title: "Protocole de tests MATERIS",
    content: ["Objectifs et séquence de tests", "Critères d'arrêt, red flags", "Notes de sécurité"],
  },
  {
    num: 2,
    title: "Coccyx",
    content: ["Techniques spécifiques", "Liens fasciaux et neurologiques", "Indications/contre-indications"],
  },
  {
    num: 3,
    title: "Techniques de base ostéo gynéco",
    content: ["Approches musculaires", "Approches fasciales", "Techniques d'écoute"],
  },
  {
    num: 4,
    title: "Péritoine",
    content: ["Travail doux des feuillets péritonéaux", "Gestion des adhérences"],
  },
  {
    num: 5,
    title: "Mobilité de l'utérus",
    content: ["Évaluations", "Mobilisations non douloureuses", "Consentement et limites"],
  },
  {
    num: 6,
    title: "LUS (Ligaments utéro-sacrés)",
    content: ["Repères anatomiques", "Lecture tissulaire", "Prudences"],
  },
  {
    num: 7,
    title: "Endométriose — Théorie",
    content: [
      "Définition OMS, origines",
      "Formes : superficielle, profonde, endométriome, adénomyose",
      "Diagnostic médical (retard jusqu'à 7 ans)",
      "Traitements médical/chirurgical",
      "Place de l'ostéopathie (complémentaire)",
    ],
  },
  {
    num: 8,
    title: "Endométriose — Pratiques",
    content: ["Cas guidés", "Séquences et progressions", "Critères de non-indication"],
  },
];

const ressources = [
  { icon: FileText, title: "PDF pédagogiques", desc: "Rappels anat/physio, protocoles, checklists", hasExamples: true, exampleType: "pdf" as const },
  { icon: PlayCircle, title: "Vidéos", desc: "Démonstrations détaillées, focus posture & ressenti", hasExamples: true, exampleType: "video" as const },
  { icon: MessageCircle, title: "Support WhatsApp", desc: "Questions en temps réel avec Sandrine", hasExamples: false, exampleType: null },
];

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
            Programme complet
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-noir"
          >
            8 modules structurés
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
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
            <h2 className="text-2xl font-serif text-noir">Ce que vous allez apprendre</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4 text-left"
          >
            {[
              "Les fondamentaux de l'ostéopathie gynécologique",
              "Le protocole de tests MATERIS",
              "Les techniques spécifiques pour chaque structure",
              "La théorie complète de l'endométriose",
              "L'application pratique sur cas réels",
              "Les red flags et critères de sécurité",
            ].map((item, index) => (
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
            Prêt(e) à commencer ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-noir-light mb-8 max-w-xl mx-auto"
          >
            Discutons de votre projet et de vos objectifs pour voir si le Pack ENDO 
            est adapté à votre situation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              href="https://calendly.com/sandrine-mosse-materis/30min"
              external
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
            >
              Réserver un appel découverte
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Me contacter
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

