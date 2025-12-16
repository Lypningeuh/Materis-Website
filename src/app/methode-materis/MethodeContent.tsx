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

const piliers = [
  {
    icon: BookOpen,
    title: "Formation Technique Complète",
    description: "Un socle solide de connaissances et de pratiques",
    details: [
      "Plateforme vschool avec modules structurés",
      "Documents PDF téléchargeables",
      "Vidéos de démonstration",
      "Support WhatsApp",
      "1 coaching inclus",
    ],
  },
  {
    icon: MessageCircle,
    title: "Accompagnement Continu",
    description: "Vous n'êtes jamais seul(e) dans votre apprentissage",
    details: [
      "Groupe WhatsApp : réponse garantie",
      "Lives BI-mensuels : études de cas en direct",
      "Communauté de praticiens formés",
      "Échanges et partages d'expériences",
    ],
  },
  {
    icon: Target,
    title: "Application Terrain",
    description: "La théorie prend vie dans votre pratique quotidienne",
    details: [
      "Formation dans votre cabinet",
      "Travail sur vos vraies patientes",
      "Pas de perte de revenus",
      "Adaptation à votre rythme",
    ],
  },
];

const comparatif = [
  {
    classique: "2 jours de séminaire isolé",
    materis: "Un parcours sur plusieurs mois",
  },
  {
    classique: "Exercices sur modèles",
    materis: "Application sur vraies patientes",
  },
  {
    classique: "Fin de formation = fin du lien",
    materis: "Accompagnement continu WhatsApp + lives",
  },
  {
    classique: "Théorie descendante",
    materis: "Pratique terrain immédiate",
  },
  {
    classique: "Week-ends sacrifiés",
    materis: "Pas de perte de revenus",
  },
];

const profils = [
  { title: "Ostéopathes", desc: "Expérimentés ou débutants en gynéco" },
  { title: "Sages-femmes", desc: "Souhaitant élargir leur pratique" },
  { title: "Kinésithérapeutes", desc: "En rééducation périnéale" },
];

export default function MethodeContent() {
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
            Les fondamentaux
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-noir"
          >
            Les 3 piliers de la méthode
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {piliers.map((pilier, index) => (
            <motion.div
              key={pilier.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-blanc p-8 rounded-2xl shadow-soft"
            >
              <div className="w-14 h-14 mb-6 rounded-xl bg-dore/10 flex items-center justify-center">
                <pilier.icon size={28} className="text-dore" />
              </div>
              <h3 className="text-xl font-serif text-noir mb-3">{pilier.title}</h3>
              <p className="text-noir-light mb-6">{pilier.description}</p>
              <ul className="space-y-3">
                {pilier.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <Check size={18} className="text-dore mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-noir-light">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
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
              La différence
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-noir"
            >
              Ce qui change par rapport à une formation classique
            </motion.h2>
          </div>

          <div className="bg-blanc rounded-2xl shadow-soft overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 bg-noir text-blanc p-4">
              <div className="font-medium text-center">Formation classique</div>
              <div className="font-medium text-center text-dore">Méthode MATERIS</div>
            </div>

            {/* Rows */}
            {comparatif.map((row, index) => (
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
              L&apos;essence de la méthode
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-noir mb-6">
              Le geste juste & le ressenti
            </h2>
            <div className="prose prose-lg text-noir-light">
              <p>
                Ensemble, nous allons travailler ce <strong>ressenti subtil</strong> qui permet, 
                en quelques secondes, de savoir :
              </p>
              <ul>
                <li>Si l&apos;on doit poser les mains… ou au contraire ne pas toucher</li>
                <li>Comment accueillir pleinement la patiente</li>
                <li>À quel moment intervenir pour que le soin devienne réellement transformateur</li>
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
              Ce &quot;petit plus&quot; qui fait la différence
            </h3>
            <div className="space-y-6">
              {[
                { icon: Hand, text: "Percevoir ce que le corps raconte avant même qu'il ne parle" },
                { icon: Target, text: "Choisir le bon timing d'intervention" },
                { icon: Heart, text: "Adapter son geste à chaque situation unique" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-dore/20 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-dore" />
                  </div>
                  <p className="text-noir-light pt-2">{item.text}</p>
                </motion.div>
              ))}
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
              Pour qui ?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-noir"
            >
              Pour quels praticiens ?
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {profils.map((profil, index) => (
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
              Diplôme en règle • Assurance professionnelle • Base en anatomie/physiologie recommandée
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
            Prêt(e) à découvrir nos formations ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-noir-light mb-8 max-w-xl mx-auto"
          >
            Choisissez le format qui vous correspond : digital, présentiel ou accompagnement personnalisé.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button href="/formations" variant="primary" size="lg" icon={<ArrowRight size={20} />}>
              Voir les formations
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}

