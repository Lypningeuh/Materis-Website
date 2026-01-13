"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Send, Check, Loader2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function LeadMagnetSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
    telephone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      setIsSubmitted(true);
      setFormData({ prenom: "", email: "", telephone: "" });
    } catch (err) {
      console.error("Error:", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <SectionWrapper background="creme">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dore/10 border border-dore/20 mb-6">
            <Gift size={18} className="text-dore" />
            <span className="text-sm font-medium text-dore">Cadeau offert</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-noir leading-tight mb-6">
            En attendant qu&apos;on se rencontre...
          </h2>

          <p className="text-lg text-noir-light leading-relaxed mb-8">
            J&apos;ai préparé <strong className="text-noir">3 techniques</strong> que
            j&apos;utilise tous les jours. Simples, efficaces, vos patientes vont
            adorer.
          </p>

          {/* What you get */}
          <div className="space-y-4">
            {[
              "Vidéo explicative pas à pas",
              "PDF récapitulatif téléchargeable",
              "Conseils d'application clinique",
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-dore/20 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-dore" />
                </div>
                <span className="text-noir-light">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-blanc p-8 md:p-10 rounded-2xl shadow-soft border border-beige">
            {!isSubmitted ? (
              <>
                <h3 className="text-2xl font-serif text-noir mb-2">
                  Recevez vos 3 techniques
                </h3>
                <p className="text-noir-light mb-8">
                  Remplissez le formulaire, je vous les envoie avec plaisir.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Prénom */}
                  <div>
                    <label
                      htmlFor="prenom"
                      className="block text-sm font-medium text-noir mb-2"
                    >
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      required
                      value={formData.prenom}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-beige bg-clair focus:outline-none focus:border-dore focus:ring-2 focus:ring-dore/10 transition-all"
                      placeholder="Votre prénom"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-noir mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-beige bg-clair focus:outline-none focus:border-dore focus:ring-2 focus:ring-dore/10 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label
                      htmlFor="telephone"
                      className="block text-sm font-medium text-noir mb-2"
                    >
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      required
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-beige bg-clair focus:outline-none focus:border-dore focus:ring-2 focus:ring-dore/10 transition-all"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 btn-gradient text-blanc font-medium rounded-xl disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Je vous les envoie avec plaisir
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-4 text-xs text-noir-light text-center">
                  Vos données restent confidentielles. Pas de spam, promis.
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-dore/20 flex items-center justify-center mx-auto mb-6">
                  <Check size={32} className="text-dore" />
                </div>
                <h3 className="text-2xl font-serif text-noir mb-3">
                  C&apos;est envoyé !
                </h3>
                <p className="text-noir-light">
                  Vérifiez votre boîte mail (et les spams, au cas où).
                  <br />À très vite !
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

