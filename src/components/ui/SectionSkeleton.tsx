"use client";

import { motion } from "framer-motion";

export default function SectionSkeleton() {
  return (
    <div className="py-20 md:py-28 bg-clair">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <motion.div
            className="h-4 w-24 bg-beige/60 rounded mx-auto mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="h-8 w-64 bg-beige/60 rounded mx-auto mb-3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="h-4 w-96 max-w-full bg-beige/60 rounded mx-auto"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>

        {/* Content skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="bg-blanc rounded-2xl p-6 shadow-soft"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            >
              <div className="h-6 w-6 bg-beige/60 rounded-full mb-4" />
              <div className="h-5 w-3/4 bg-beige/60 rounded mb-3" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-beige/60 rounded" />
                <div className="h-3 w-5/6 bg-beige/60 rounded" />
                <div className="h-3 w-4/6 bg-beige/60 rounded" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

