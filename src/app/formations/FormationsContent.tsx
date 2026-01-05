"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Shield,
  AlertTriangle,
  Check
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import CheminsSection from "@/components/sections/CheminsSection";

export default function FormationsContent() {
  return (
    <>
      {/* Votre chemin - Selection e-learning / présentiel */}
      <CheminsSection background="clair" />

      {/* Présentiel */}
      <SectionWrapper background="creme" immediate>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={20} className="text-dore" />
              <p className="text-sm font-medium tracking-widest uppercase text-dore">
                Formation présentielle
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-noir mb-6">
              Formation en présentiel
            </h2>

            <p className="text-noir-light mb-6 text-lg">
              Apprendre <strong>au contact du terrain</strong>, avec un regard croisé 
              (ostéo, sage-femme, chirurgien, médecin). Passer de la technique au <em>geste juste</em>.
            </p>

            <div className="bg-blanc p-6 rounded-xl shadow-soft mb-6">
              <h4 className="font-medium text-noir mb-4">Intervenants</h4>
              <ul className="space-y-2 text-noir-light text-sm">
                <li>• <strong>Sandrine</strong> — Ostéopathe formatrice, 25+ ans</li>
                <li>• <strong>Yannig</strong> — Sage-femme, ostéopathe</li>
                <li>• Chirurgien spécialisé en endométriose</li>
                <li>• Médecin</li>
              </ul>
            </div>

            <Button href="/formations/presentiel" variant="primary" icon={<ArrowRight size={18} />}>
              Voir le programme 2025-2026
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-blanc p-8 rounded-2xl shadow-soft"
          >
            <h4 className="font-serif text-xl text-noir mb-6">Sessions disponibles</h4>
            
            <div className="space-y-4">
              {[
                { num: 1, title: "Présentation gynéco — Douleurs coccygiennes", dates: "26-27 sept 2025", price: "230€", duration: "8h" },
                { num: 2, title: "Endométriose", dates: "21-22 nov 2025", price: "280€", duration: "10h30" },
                { num: 3, title: "Dyspareunie — Névralgie pudendale", dates: "23-24 jan 2026", price: "230€", duration: "8h" },
                { num: 4, title: "Infertilité & PMA", dates: "13-14 mars 2026", price: "230€", duration: "8h" },
                { num: 5, title: "Grossesse, accouchement & post-partum", dates: "10-11 avr 2026", price: "280€", duration: "10h30" },
              ].map((session) => (
                <div key={session.num} className="flex items-center justify-between p-4 bg-creme/50 rounded-lg hover:bg-creme transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-dore/10 text-dore text-xs font-medium flex items-center justify-center">
                        {session.num}
                      </span>
                      <span className="text-noir text-sm font-medium">{session.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-noir-light ml-8">
                      <span>{session.dates}</span>
                      <span className="w-1 h-1 rounded-full bg-beige" />
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  <span className="text-dore font-serif text-lg">{session.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-dore/10 to-dore/5 rounded-lg text-center">
              <p className="text-noir">
                <span className="font-medium">Pack 5 sessions :</span>{" "}
                <span className="text-dore font-serif text-xl">1 100€</span>
                <span className="text-noir-light text-sm block mt-1">(au lieu de 1 250€)</span>
              </p>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Cadre & Sécurité */}
      <SectionWrapper background="blanc">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-creme rounded-2xl p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield size={24} className="text-dore" />
              <h3 className="text-xl font-serif text-noir">Cadre & Sécurité</h3>
            </div>

            <div className="flex items-start gap-4 mb-6 p-4 bg-blanc rounded-lg">
              <AlertTriangle size={20} className="text-dore flex-shrink-0 mt-0.5" />
              <p className="text-noir-light">
                <strong>Important</strong> : Cette formation n&apos;est pas un acte médical. 
                Elle s&apos;inscrit en complément des parcours de soins.
              </p>
            </div>

            <ul className="space-y-3 text-noir-light">
              <li className="flex items-center gap-3">
                <Check size={18} className="text-dore flex-shrink-0" />
                Respect des contre-indications
              </li>
              <li className="flex items-center gap-3">
                <Check size={18} className="text-dore flex-shrink-0" />
                Importance des red flags
              </li>
              <li className="flex items-center gap-3">
                <Check size={18} className="text-dore flex-shrink-0" />
                Orientation vers spécialistes quand nécessaire
              </li>
              <li className="flex items-center gap-3">
                <Check size={18} className="text-dore flex-shrink-0" />
                Consentement et confort de la patiente
              </li>
            </ul>
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
            Besoin d&apos;aide pour choisir ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-noir-light mb-8 max-w-xl mx-auto"
          >
            Prenez 20 minutes pour en discuter avec moi. Je vous aiderai à trouver 
            le format le plus adapté à votre situation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              href="https://calendly.com/sandrine-mosse-materis/30min"
              external
              variant="primary"
              size="lg"
              icon={<Calendar size={20} />}
            >
              Prendre RDV (20 min)
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}

