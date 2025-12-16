"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-clair flex items-center justify-center">
      <div className="text-center">
        {/* Logo animé */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="w-16 h-16 mx-auto relative">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dore/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-t-dore border-r-transparent border-b-transparent border-l-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-dore font-serif text-xl font-semibold">M</span>
            </div>
          </div>
        </motion.div>
        
        {/* Texte */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-noir/60 font-sans text-sm tracking-wide"
        >
          Chargement...
        </motion.p>
      </div>
    </div>
  );
}

