"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Send,
  MapPin,
  Users,
  Loader2,
  CheckCircle
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { supabase } from "@/lib/supabase";
import contactContent from "../../../content/contact.json";

const content = contactContent;
const contactIcons = [Phone, MessageCircle, Mail] as const;

export default function ContactContent() {
  const { settings } = useSiteSettings();
  const whatsappLink = settings.whatsapp_link;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profil: "",
    message: "",
    aide: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactChannels = content.contactChannels.map((ch, i) => ({
    ...ch,
    icon: contactIcons[i],
    href: i === 1 ? whatsappLink : ch.href,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name || null,
        email: formData.email || null,
        profil: formData.profil || null,
        message: formData.message,
        aide: formData.aide || null,
        is_read: false,
      });

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: "", email: "", profil: "", message: "", aide: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Formulaire + Contacts */}
      <SectionWrapper background="clair" immediate>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif text-noir mb-6">
              {content.formTitle}
            </h2>

            {isSubmitted ? (
              <div className="bg-blanc p-8 rounded-2xl shadow-soft text-center">
                <CheckCircle size={48} className="mx-auto text-dore mb-4" />
                <h3 className="text-xl font-serif text-noir mb-2">{content.successTitle}</h3>
                <p className="text-noir-light mb-6">
                  {content.successMessage}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-dore hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-noir mb-2">
                      Votre nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore focus:ring-2 focus:ring-dore/20 outline-none transition-all"
                      placeholder="Prénom Nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-noir mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore focus:ring-2 focus:ring-dore/20 outline-none transition-all"
                      placeholder="vous@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="profil" className="block text-sm font-medium text-noir mb-2">
                    Votre profil
                  </label>
                  <select
                    id="profil"
                    value={formData.profil}
                    onChange={(e) => setFormData({ ...formData, profil: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore focus:ring-2 focus:ring-dore/20 outline-none transition-all bg-blanc"
                  >
                    <option value="">Sélectionnez votre profil</option>
                    <option value="osteopathe">Ostéopathe</option>
                    <option value="sage-femme">Sage-femme</option>
                    <option value="kine">Kinésithérapeute</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-noir mb-2">
                    Votre message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore focus:ring-2 focus:ring-dore/20 outline-none transition-all resize-none"
                    placeholder="Décrivez votre situation ou posez votre question..."
                  />
                </div>

                <div>
                  <label htmlFor="aide" className="block text-sm font-medium text-noir mb-2">
                    Comment puis-je vous aider ?
                  </label>
                  <input
                    type="text"
                    id="aide"
                    value={formData.aide}
                    onChange={(e) => setFormData({ ...formData, aide: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore focus:ring-2 focus:ring-dore/20 outline-none transition-all"
                    placeholder="Ex: Je cherche une formation adaptée à mon niveau..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gradient text-blanc py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer mon message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contacts directs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif text-noir mb-6">
              {content.contactTitle}
            </h2>

            <div className="space-y-4 mb-8">
              {contactChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-5 bg-blanc rounded-xl shadow-soft hover:shadow-lg transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0 group-hover:bg-dore/20 transition-colors">
                    <channel.icon size={22} className="text-dore" />
                  </div>
                  <div>
                    <p className="font-medium text-noir mb-1">{channel.label}</p>
                    <p className="text-noir-light">{channel.value}</p>
                    {channel.secondValue && (
                      <p className="text-noir-light text-sm">{channel.secondValue}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Adresse */}
            <div className="p-5 bg-creme rounded-xl">
              <div className="flex items-start gap-4">
                <MapPin size={22} className="text-dore flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-noir mb-1">Adresse</p>
                  <p className="text-noir-light">{content.address}</p>
                  <p className="text-noir-light text-sm">{content.addressDetail}</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-noir-light italic text-center">
              &quot;{content.personalQuote}&quot;
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Calendly */}
      <SectionWrapper background="creme" immediate>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Calendar size={40} className="mx-auto text-dore mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif text-noir mb-4">
              {content.calendlyTitle}
            </h2>
            <p className="text-noir-light text-lg">
              {content.calendlyDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-blanc p-8 rounded-2xl shadow-soft"
          >
            {/* Calendly placeholder - En production, intégrer le widget Calendly ici */}
            <div className="aspect-video bg-clair rounded-lg flex items-center justify-center mb-6">
              <p className="text-noir-light">
                Widget Calendly à intégrer ici
              </p>
            </div>

            <Button
              href={content.calendlyUrl}
              external
              variant="primary"
              size="lg"
              icon={<Calendar size={20} />}
            >
              {content.calendlyCtaText}
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Pour praticiens formés */}
      <SectionWrapper background="blanc">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-creme p-8 md:p-10 rounded-2xl text-center"
          >
            <Users size={40} className="mx-auto text-dore mb-4" />
            <h2 className="text-2xl font-serif text-noir mb-4">
              {content.praticiensTitle}
            </h2>
            <p className="text-noir-light mb-6">
              {content.praticiensDescription}
            </p>
            <Button
              href={whatsappLink}
              external
              variant="outline"
              icon={<MessageCircle size={18} />}
            >
              {content.praticiensCtaText}
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}

