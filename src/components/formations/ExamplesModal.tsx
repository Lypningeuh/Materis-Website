"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, PlayCircle, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { FormationExample } from "@/lib/types";

interface ExamplesModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "pdf" | "video";
}

export default function ExamplesModal({ isOpen, onClose, type }: ExamplesModalProps) {
  const [examples, setExamples] = useState<FormationExample[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchExamples();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, type]);

  const fetchExamples = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("formation_examples")
      .select("*")
      .eq("type", type)
      .eq("is_published", true)
      .order("display_order");

    if (data) setExamples(data);
    setLoading(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-noir/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-blanc rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-beige">
              <div className="flex items-center gap-3">
                {type === "pdf" ? (
                  <FileText size={24} className="text-dore" />
                ) : (
                  <PlayCircle size={24} className="text-dore" />
                )}
                <h2 className="text-2xl font-serif text-noir">
                  {type === "pdf" ? "Exemples de PDF" : "Exemples de Vidéos"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-clair rounded-lg transition-colors"
              >
                <X size={24} className="text-noir-light" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-2 border-dore border-t-transparent rounded-full animate-spin" />
                </div>
              ) : examples.length === 0 ? (
                <div className="text-center py-20 text-noir-light">
                  Aucun exemple disponible pour le moment.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {examples.map((example, index) => (
                    <motion.a
                      key={example.id}
                      href={example.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group block bg-clair rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-beige relative overflow-hidden">
                        {example.thumbnail_url ? (
                          <img
                            src={example.thumbnail_url}
                            alt={example.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {type === "pdf" ? (
                              <FileText size={48} className="text-dore/30" />
                            ) : (
                              <PlayCircle size={48} className="text-dore/30" />
                            )}
                          </div>
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-noir/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ExternalLink size={32} className="text-blanc" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-medium text-noir group-hover:text-dore transition-colors">
                          {example.title}
                        </h3>
                        {example.description && (
                          <p className="text-sm text-noir-light mt-1 line-clamp-2">
                            {example.description}
                          </p>
                        )}
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
