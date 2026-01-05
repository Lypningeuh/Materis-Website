"use client";

import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

const stats = [
  { value: "12+", label: "Praticiens formés" },
  { value: "8", label: "Régions couvertes" },
  { value: "100%", label: "Accompagnement" },
];

// Positions des villes sur la carte (basées sur viewBox 512x512)
const cities = [
  { top: "12%", left: "52%", city: "Lille" },
  { top: "20%", left: "72%", city: "Strasbourg" },
  { top: "28%", left: "29%", city: "Rennes" },
  { top: "26%", left: "52%", city: "Paris" },
  { top: "52%", left: "62%", city: "Lyon" },
  { top: "79%", left: "31%", city: "Bordeaux" },
  { top: "82%", left: "49%", city: "Toulouse", main: true },
  { top: "78%", left: "76%", city: "Marseille" },
  { top: "72%", left: "80%", city: "Nice" },
  { top: "55%", left: "68%", city: "Grenoble" },
  { top: "38%", left: "25%", city: "Nantes" },
  { top: "48%", left: "48%", city: "Clermont-F." },
];

export default function ReseauSection() {
  return (
    <SectionWrapper background="creme">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Content */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
          >
            Le réseau MATERIS
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-noir leading-tight mb-6"
          >
            Un réseau français d&apos;ostéopathes {" "}
            <span className="text-dore">formés en santé féminine</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-noir-light leading-relaxed mb-8"
          >
            Materis, c&apos;est des praticiens spécialisés en techniques ostéopathique uro-gynéco... Mais bien plus aussi en partageant avec vous les liens, le subtil et les valeurs.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-6 mb-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-3xl md:text-4xl font-serif text-dore mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-noir-light">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <Button
            href="/reseau-materis"
            variant="outline"
            icon={<ArrowRight size={18} />}
          >
            Découvrir le réseau
          </Button>
        </div>

        {/* Map illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="relative bg-blanc rounded-2xl p-6 md:p-8 shadow-soft">
            {/* France map with dots */}
            <div className="aspect-square relative">
              {/* SVG France outline */}
              <svg
                viewBox="0 0 512 512"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="mapGlow" cx="45%" cy="85%" r="40%">
                    <stop offset="0%" stopColor="#D6A647" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#D6A647" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <path 
                  d="M283.4 19.83c-3.2 0-31.2 5.09-31.2 5.09-1.3 41.61-30.4 78.48-90.3 84.88l-12.8-23.07-25.1 2.48 11.3 60.09-113.79-4.9 12.2 41.5C156.3 225.4 150.7 338.4 124 439.4c47 53 141.8 47.8 186 43.1 3.1-62.2 52.4-64.5 135.9-32.2 11.3-17.6 18.8-36 44.6-50.7l-46.6-139.5-27.5 6.2c11-21.1 32.2-49.9 50.4-63.4l15.6-86.9c-88.6-6.3-146.4-46.36-199-96.17z" 
                  fill="#F5F2EB"
                  stroke="#EDE9E0"
                  strokeWidth="3"
                />
                <path 
                  d="M283.4 19.83c-3.2 0-31.2 5.09-31.2 5.09-1.3 41.61-30.4 78.48-90.3 84.88l-12.8-23.07-25.1 2.48 11.3 60.09-113.79-4.9 12.2 41.5C156.3 225.4 150.7 338.4 124 439.4c47 53 141.8 47.8 186 43.1 3.1-62.2 52.4-64.5 135.9-32.2 11.3-17.6 18.8-36 44.6-50.7l-46.6-139.5-27.5 6.2c11-21.1 32.2-49.9 50.4-63.4l15.6-86.9c-88.6-6.3-146.4-46.36-199-96.17z" 
                  fill="url(#mapGlow)"
                />
              </svg>
              
              {/* City dots */}
              {cities.map((loc, i) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="absolute group cursor-pointer z-10"
                  style={{ top: loc.top, left: loc.left, transform: "translate(-50%, -50%)" }}
                >
                  {/* Pulse effect for main city */}
                  {"main" in loc && loc.main && (
                    <span className="absolute inset-0 w-6 h-6 -m-1 rounded-full bg-dore/30 animate-ping" />
                  )}
                  <div
                    className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                      "main" in loc && loc.main
                        ? "bg-dore ring-4 ring-dore/30 scale-125"
                        : "bg-dore/70 hover:bg-dore hover:scale-125"
                    }`}
                  />
                  {/* City label */}
                  <span 
                    className={`absolute left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                      "main" in loc && loc.main 
                        ? "opacity-100 -bottom-5 text-dore" 
                        : "opacity-0 group-hover:opacity-100 -bottom-5 text-noir-light"
                    }`}
                  >
                    {loc.city}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-beige">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-dore ring-2 ring-dore/30" />
                <span className="text-sm text-noir-light">Siège MATERIS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-dore/70" />
                <span className="text-sm text-noir-light">Praticiens formés</span>
              </div>
            </div>
          </div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="absolute -right-2 md:-right-4 top-1/4 bg-blanc p-4 rounded-xl shadow-soft border border-beige"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center">
                <Users size={20} className="text-dore" />
              </div>
              <div>
                <p className="font-medium text-noir text-sm">Communauté active</p>
                <p className="text-xs text-noir-light">WhatsApp & lives mensuels</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
