"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import histoireContent from "../../../content/histoire.json";

export default function HistoireSection() {
  const content = histoireContent;

  return (
    <SectionWrapper background="clair">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative order-2 lg:order-1"
        >
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-dore/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-creme rounded-full blur-2xl" />
          
          <div className="relative rounded-2xl overflow-hidden shadow-soft">
            <div className="aspect-[4/5] relative">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-noir/30 via-transparent to-transparent" />
            
            {/* Quote card */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-blanc/95 backdrop-blur-sm p-5 rounded-xl shadow-soft">
                <p className="text-noir-light italic text-sm leading-relaxed">
                  &ldquo;{content.quote}&rdquo;
                </p>
                <p className="mt-2 text-dore text-sm font-medium">— {content.quoteAuthor}</p>
              </div>
            </div>
          </div>

          {/* Experience badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute -right-4 top-8 bg-dore text-blanc p-4 rounded-xl shadow-lg"
          >
            <p className="text-3xl font-serif">{content.experienceYears}</p>
            <p className="text-xs mt-1">{content.experienceLabel}</p>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-dore mb-4">
            {content.sectionLabel}
          </p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-noir leading-tight mb-6">
            {content.title}{" "}
            <span className="text-dore">{content.titleHighlight}</span>
          </h2>

          <div className="space-y-5 text-noir-light leading-relaxed mb-8">
            {content.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <Button
            href={content.ctaHref}
            variant="outline"
            icon={<ArrowRight size={18} />}
          >
            {content.ctaText}
          </Button>

          {/* Timeline preview */}
          <div className="mt-10 pt-8 border-t border-beige">
            <p className="text-sm text-noir-light mb-4">{content.timelineLabel}</p>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {content.timeline.map((item, i) => (
                <div key={item.year} className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-lg font-serif text-dore">{item.year}</p>
                    <p className="text-xs text-noir-light whitespace-nowrap">
                      {item.event}
                    </p>
                  </div>
                  {i < content.timeline.length - 1 && <div className="w-8 h-px bg-beige" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
