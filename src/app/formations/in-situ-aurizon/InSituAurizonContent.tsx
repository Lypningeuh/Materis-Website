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

const inSituAvantages = [
  "Pas de déplacement pour vous",
  "Cas réels (vos patientes)",
  "Moins de perte de revenus",
  "Personnalisé à votre niveau",
  "Accompagnement sur plusieurs mois",
];

const aurizonInclus = [
  "Audit complet de votre pratique",
  "Plan de transformation personnalisé",
  "Sessions de formation intensives",
  "Suivi hebdomadaire WhatsApp",
  "Coaching individualisé",
  "Accès à vie aux ressources",
];

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
                Accompagnement personnalisé
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-noir mb-6">
              IN SITU
            </h2>

            <p className="text-xl text-noir-light mb-6 italic">
              &quot;J&apos;ai besoin d&apos;être accompagnée&quot;
            </p>

            <div className="prose prose-lg text-noir-light mb-8">
              <p>
                Oubliez les formations classiques. Je ne veux pas vous faire perdre
                vos week-ends. Je ne veux pas vous faire perdre vos consultations.
              </p>
              <p>
                <strong>3 mois d&apos;accompagnement</strong> pour une vraie transformation
                de votre pratique. Pas juste des techniques, mais une nouvelle façon d&apos;exercer.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {inSituAvantages.map((avantage) => (
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
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0">
                  <Smartphone size={20} className="text-dore" />
                </div>
                <div>
                  <p className="font-medium text-noir mb-1">Accès complet à Praktika</p>
                  <p className="text-sm text-noir-light">
                    Toute la formation digitale incluse
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-dore" />
                </div>
                <div>
                  <p className="font-medium text-noir mb-1">4 sessions de coaching</p>
                  <p className="text-sm text-noir-light">
                    Accompagnement individuel personnalisé
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0">
                  <Video size={20} className="text-dore" />
                </div>
                <div>
                  <p className="font-medium text-noir mb-1">Lives bi-mensuels</p>
                  <p className="text-sm text-noir-light">
                    Masterclass en direct incluses
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-dore" />
                </div>
                <div>
                  <p className="font-medium text-noir mb-1">Suivi sur 3 mois</p>
                  <p className="text-sm text-noir-light">
                    Accompagnement étalé dans le temps
                  </p>
                </div>
              </div>
            </div>

            {/* Special feature with scarcity */}
            <div className="mt-6 p-4 bg-blanc border border-dore/40 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-dore" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-noir">1 journée présentiel dans votre cabinet</p>
                  <p className="text-xs text-dore mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-dore animate-pulse" />
                    11 de disponibles
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-dore/10 rounded-lg flex items-center gap-3">
              <AlertTriangle size={20} className="text-dore flex-shrink-0" />
              <p className="text-sm text-noir">
                <strong>Places très limitées</strong> : 12 par trimestre limité
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
              <span className="text-dore text-sm font-medium">Premium</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-blanc mb-4">
              AURIZON
            </h2>

            <p className="text-xl text-blanc/70 italic">
              &quot;Je veux tout changer&quot;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-blanc/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-blanc/20"
          >
            <p className="text-blanc/80 text-lg mb-8 text-center">
              On révolutionne votre pratique ensemble. Un parcours de transformation 
              complète sur plusieurs mois pour celles et ceux qui veulent aller au bout.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {aurizonInclus.map((item, index) => (
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
                Parcours sur-mesure • Tarif sur devis
              </p>
              <Button
                href="https://calendly.com/sandrine-mosse-materis/30min"
                external
                variant="primary"
                size="lg"
                icon={<Calendar size={20} />}
              >
                Discuter de mon projet
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
              Quelle formule choisir ?
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
              <div className="font-medium text-center">IN SITU</div>
              <div className="font-medium text-center text-dore">AURIZON</div>
            </div>

            {[
              { critere: "Durée", inSitu: "3 Mois", aurizon: "4 Mois" },
              { critere: "Lieu", inSitu: "Distanciel & Pratique avec Sandrine", aurizon: "Distanciel & Pratique avec Sandrine" },
              { critere: "Temps présentiel", inSitu: "1 Jour", aurizon: "2 Jours pour les 3 premiers" },
              { critere: "Accompagnement", inSitu: "Intensif & Continu", aurizon: "Intensif & continu avec développement de votre cabinet" },
              { critere: "Suivi", inSitu: "WhatsApp + 4 Coaching Hebdo", aurizon: "WhatsApp + 5 Coaching Hebdo" },
              { critere: "Objectif", inSitu: "Compétences ciblées & Transformation", aurizon: "Transformation complète Pratique & Cabinet Boosttoncab.fr" },
            ].map((row, index) => (
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
            Prêt(e) à passer à l&apos;action ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-noir-light mb-8 max-w-xl mx-auto"
          >
            Prenons 20 minutes pour discuter de votre situation et définir 
            ensemble la formule la plus adaptée à vos besoins.
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
    </>
  );
}

