"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

export default function HistoireSection() {
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
                src="/sandrine_avec_patient-pdt-massage_danscabinet_verticale.png"
                alt="Sandrine en consultation avec une patiente"
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
                  &ldquo;Il est temps de transmettre. De former d&apos;autres mains
                  pour qu&apos;elles soulagent encore plus de femmes.&rdquo;
                </p>
                <p className="mt-2 text-dore text-sm font-medium">— Sandrine</p>
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
            <p className="text-3xl font-serif">25+</p>
            <p className="text-xs mt-1">ans de pratique</p>
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
            Mon histoire
          </p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-noir leading-tight mb-6">
            D&apos;un accident à une{" "}
            <span className="text-dore">vocation</span>
          </h2>

          <div className="space-y-5 text-noir-light leading-relaxed mb-8">
            <p>
              Un accident de mobylette m&apos;a conduite vers la kinésithérapie.
              Puis l&apos;ostéopathie. Puis l&apos;ostéopathie gynécologique — un
              bouleversement qui a orienté 25 ans de pratique auprès des femmes.
            </p>
            <p>
              En 2024, une maladie aux mains m&apos;a stoppée. Et un message
              m&apos;est venu : <em className="text-noir font-medium">&ldquo;Il est temps de transmettre.&rdquo;</em>
            </p>
            <p>
              C&apos;est ainsi que <span className="text-dore font-semibold">MATERIS</span> est née.
              Pour former d&apos;autres mains, sensibles et justes.
            </p>
          </div>

          <Button
            href="/a-propos"
            variant="outline"
            icon={<ArrowRight size={18} />}
          >
            Découvrir mon parcours
          </Button>

          {/* Timeline preview */}
          <div className="mt-10 pt-8 border-t border-beige">
            <p className="text-sm text-noir-light mb-4">Étapes clés</p>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {[
                { year: "1997", event: "Diplôme kiné" },
                { year: "2004", event: "Diplôme ostéo" },
                { year: "2015", event: "EndoFrance" },
                { year: "2024", event: "MATERIS" },
              ].map((item, i) => (
                <div key={item.year} className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-lg font-serif text-dore">{item.year}</p>
                    <p className="text-xs text-noir-light whitespace-nowrap">
                      {item.event}
                    </p>
                  </div>
                  {i < 3 && <div className="w-8 h-px bg-beige" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

