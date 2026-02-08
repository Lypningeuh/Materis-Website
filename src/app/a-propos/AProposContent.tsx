"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, BookOpen, Stethoscope, Quote, MessageCircle, ChevronDown } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import aProposContent from "../../../content/a-propos.json";

// Icons for quotidien stats cards
const quotidienIcons = [Heart, Users, Stethoscope, BookOpen];

export default function AProposContent() {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);
  const content = aProposContent;

  return (
    <>
      {/* Section Parcours */}
      <SectionWrapper background="clair" immediate>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-soft">
              <div className="aspect-[4/5] relative">
                <Image
                  src={content.parcoursImage}
                  alt={content.parcoursImageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-dore/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Content */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
            >
              {content.parcoursLabel}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-noir leading-tight mb-6"
            >
              {content.parcoursTitle}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg text-noir-light"
            >
              {content.parcoursParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Suite de l'histoire - Expandable */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <div className="relative">
                <div
                  className={`transition-all duration-500 ease-out overflow-hidden ${
                    isStoryExpanded
                      ? "max-h-[600px]"
                      : "max-h-[120px]"
                  }`}
                >
                  <div className="prose prose-lg text-noir-light space-y-4">
                    {content.parcoursExpandedParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {!isStoryExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-clair via-clair/80 to-transparent pointer-events-none" />
                )}
              </div>

              <button
                onClick={() => setIsStoryExpanded(!isStoryExpanded)}
                className="mt-4 flex items-center gap-2 text-dore hover:text-dore-dark font-medium transition-colors"
              >
                <span>{isStoryExpanded ? "Réduire" : "Lire la suite"}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${isStoryExpanded ? "rotate-180" : ""}`}
                />
              </button>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper background="creme" immediate>
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-noir text-center mb-12"
          >
            {content.timelineTitle}
          </motion.h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-beige md:-translate-x-px" />

            {content.timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-6 mb-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-dore rounded-full -translate-x-1/2 ring-4 ring-creme" />

                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-dore font-serif text-lg">{item.year}</span>
                  <p className="text-noir-light mt-1">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Confession */}
      <section className="relative py-20 md:py-28 bg-noir overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-dore blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-dore blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-medium tracking-widest uppercase text-dore mb-4">
              {content.confessionLabel}
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-blanc leading-tight">
              {content.confessionTitle}
            </h2>
          </motion.div>

          <div className="space-y-8">
            {content.confessionParagraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`text-lg md:text-xl leading-relaxed ${
                  index === 1 ? "text-blanc/80 italic" : "text-blanc/70"
                }`}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Quote highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative my-12 py-8 px-8 md:px-12"
            >
              <Quote size={48} className="absolute top-0 left-0 text-dore/30" />
              <blockquote className="text-2xl md:text-3xl font-serif text-dore text-center leading-relaxed">
                &ldquo;{content.confessionQuote}&rdquo;
              </blockquote>
              <Quote size={48} className="absolute bottom-0 right-0 text-dore/30 rotate-180" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ma façon d'accompagner */}
      <SectionWrapper background="clair">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
          >
            {content.philosophieLabel}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-noir mb-8"
          >
            {content.philosophieTitle}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg text-noir-light mx-auto"
          >
            {content.philosophieParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 p-6 bg-dore/10 rounded-xl inline-block"
          >
            <p className="text-noir-light text-sm">
              {content.philosophieDisclaimer}
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Mon quotidien */}
      <SectionWrapper background="creme">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium tracking-widest uppercase text-dore mb-4">
              {content.quotidienLabel}
            </p>

            <h2 className="text-3xl md:text-4xl font-serif text-noir mb-6">
              {content.quotidienTitle}
            </h2>

            <p className="text-noir-light text-lg mb-8">
              {content.quotidienDescription}
            </p>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {content.quotidienStats.map((stat, index) => {
                const Icon = quotidienIcons[index] || Heart;
                return (
                  <div key={stat.title} className="bg-blanc p-5 rounded-xl shadow-soft">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={20} className="text-dore" />
                      <span className="font-medium text-noir">{stat.title}</span>
                    </div>
                    <p className="text-sm text-noir-light">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* WhatsApp teaser */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-blanc rounded-2xl shadow-soft p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle size={28} className="text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-medium text-noir">Groupe WhatsApp</h3>
                  <p className="text-sm text-noir-light">Échanges quotidiens avec les praticiens</p>
                </div>
              </div>

              {/* Fake chat messages */}
              <div className="space-y-4">
                <div className="bg-creme rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm text-noir-light">
                    &quot;Sandrine, j&apos;ai un cas complexe aujourd&apos;hui. Patiente avec endométriose 
                    stade 4, qu&apos;est-ce que tu me conseilles ?&quot;
                  </p>
                  <span className="text-xs text-noir-light/60 mt-2 block">Marie • 09:34</span>
                </div>

                <div className="bg-dore/10 rounded-2xl rounded-tr-none p-4 max-w-[80%] ml-auto">
                  <p className="text-sm text-noir-light">
                    &quot;Je te réponds par vocal, c&apos;est plus simple ! Mais en attendant, 
                    commence par le protocole de tests qu&apos;on a vu ensemble...&quot;
                  </p>
                  <span className="text-xs text-noir-light/60 mt-2 block">Sandrine • 09:41</span>
                </div>

                <div className="bg-creme rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm text-noir-light">
                    &quot;Merci ! C&apos;est tellement rassurant de pouvoir te demander en direct 💛&quot;
                  </p>
                  <span className="text-xs text-noir-light/60 mt-2 block">Marie • 09:45</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-beige">
                <p className="text-noir-light text-sm italic text-center">
                  &quot;Je partage beaucoup en direct avec mes praticiens via WhatsApp.&quot;
                </p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-dore/10 rounded-full blur-2xl" />
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button href="/formations" variant="primary" icon={<ArrowRight size={18} />}>
              Découvrir les formations
            </Button>
            <Button href="/reseau-materis" variant="outline">
              Rejoindre le réseau
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}
