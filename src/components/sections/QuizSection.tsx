"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

const options = [
  {
    id: "debutant",
    label: "Je débute et je me sens perdue face aux problématiques gynéco",
  },
  {
    id: "specialiser",
    label: "Je veux me spécialiser",
  },
  {
    id: "cabinet",
    label: "Je veux développer mon cabinet autrement",
  },
  {
    id: "discuter",
    label: "Je ne sais pas trop, j'aimerais discuter",
  },
];

export default function QuizSection() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <SectionWrapper background="blanc">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
        >
          Parlons de vous
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif text-noir leading-tight mb-6"
        >
          Et vous, où en êtes-vous ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-noir-light mb-12"
        >
          Cochez ce qui vous correspond et prenons le temps d&apos;en parler
          ensemble.
        </motion.p>

        {/* Options */}
        <div className="space-y-4 mb-10">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1 }}
              onClick={() => toggleOption(option.id)}
              className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
                selected.includes(option.id)
                  ? "border-dore bg-dore/5"
                  : "border-beige hover:border-dore/30 bg-clair"
              }`}
            >
              {/* Checkbox */}
              <div
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  selected.includes(option.id)
                    ? "border-dore bg-dore"
                    : "border-beige"
                }`}
              >
                <AnimatePresence>
                  {selected.includes(option.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check size={14} className="text-blanc" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Label */}
              <span
                className={`text-base ${
                  selected.includes(option.id) ? "text-noir font-medium" : "text-noir-light"
                }`}
              >
                {option.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button
            href="https://calendly.com"
            variant="primary"
            size="lg"
            external
            icon={<Calendar size={20} />}
          >
            On en parle pendant 20 minutes ?
          </Button>
          <p className="mt-4 text-sm text-noir-light">
            Appel gratuit et sans engagement
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

