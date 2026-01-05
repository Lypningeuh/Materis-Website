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
  Users
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

const contactChannels = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "06 31 70 28 48",
    secondValue: "06 87 52 88 22",
    href: "tel:+33631702848",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "06 31 70 28 48",
    href: "https://wa.me/33631702848",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sandrine.mosse@materis.fr",
    secondValue: "legorrecyannig@yahoo.fr",
    href: "mailto:sandrine.mosse@materis.fr",
  },
];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    profil: "",
    message: "",
    aide: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Merci ! Je vous répondrai très rapidement.");
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
              Envoyez-moi un message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full btn-gradient text-blanc py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                <Send size={18} />
                Envoyer mon message
              </button>
            </form>
          </motion.div>

          {/* Contacts directs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif text-noir mb-6">
              Ou contactez-moi directement
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
                  <p className="text-noir-light">Toulouse & environs</p>
                  <p className="text-noir-light text-sm">Haute-Garonne (31)</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-noir-light italic text-center">
              &quot;Je réponds personnellement à chaque message.&quot;
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
              Appel d&apos;information
            </h2>
            <p className="text-noir-light text-lg">
              20 minutes pour faire le point ensemble et voir comment je peux vous aider.
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
              href="https://calendly.com/sandrine-mosse-materis/30min"
              external
              variant="primary"
              size="lg"
              icon={<Calendar size={20} />}
            >
              Réserver un créneau
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
              Pour les praticiens déjà formés
            </h2>
            <p className="text-noir-light mb-6">
              Vous faites déjà partie du réseau MATERIS ? Accédez au groupe 
              WhatsApp privé pour échanger avec la communauté.
            </p>
            <Button
              href="https://wa.me/33631702848"
              external
              variant="outline"
              icon={<MessageCircle size={18} />}
            >
              Accès groupe WhatsApp (membres)
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}

