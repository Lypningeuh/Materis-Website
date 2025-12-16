"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, Mail, MapPin, Heart } from "lucide-react";

const contactChannels = [
  {
    icon: Phone,
    label: "M'appeler",
    href: "tel:+33682940618",
    text: "06 82 94 06 18",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/33631702848",
    text: "06 31 70 28 48",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:sandrine_osteo@yahoo.fr",
    text: "sandrine_osteo@yahoo.fr",
  },
];

const quickLinks = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Formations", href: "/formations" },
  { name: "Réseau Materis", href: "/reseau-materis" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "Politique de confidentialité", href: "/confidentialite" },
  { name: "CGV", href: "/cgv" },
];

export default function Footer() {
  const pathname = usePathname();
  
  // Don't render on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  
  return (
    <footer className="bg-noir text-blanc/90">
      {/* Human touch section */}
      <div className="bg-noir-deep py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-blanc mb-4">
              Une question ? Une hésitation ?
            </h2>
            <p className="text-blanc/70 max-w-xl mx-auto">
              Je réponds personnellement à chaque message.
            </p>
          </div>

          {/* Contact channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-blanc/5 hover:bg-blanc/10 border border-blanc/10 hover:border-dore/30 transition-all duration-400 group"
              >
                <div className="w-12 h-12 rounded-full bg-dore/20 flex items-center justify-center group-hover:bg-dore/30 transition-colors">
                  <channel.icon size={22} className="text-dore" />
                </div>
                <span className="font-medium text-blanc">{channel.label}</span>
                <span className="text-sm text-blanc/60">{channel.text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16 border-t border-blanc/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/logo_white.svg"
                  alt="MATERIS"
                  width={220}
                  height={70}
                  className="h-16 md:h-20 w-auto"
                />
              </Link>
              <p className="text-blanc/60 max-w-md mb-6 leading-relaxed">
                Former des praticiens qui prennent vraiment soin des femmes.
                Endométriose, douleurs pelviennes, santé féminine — des formations
                ancrées dans 25 ans de pratique.
              </p>
              {/* Sandrine signature */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-dore/30">
                  <Image
                    src="/photo_sandrine-verticale.png"
                    alt="Sandrine"
                    width={56}
                    height={56}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-blanc font-medium">Sandrine</p>
                  <p className="text-blanc/50 text-sm">Fondatrice de MATERIS</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-lg text-blanc mb-6">Navigation</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-blanc/60 hover:text-dore transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address & Legal */}
            <div>
              <h3 className="font-serif text-lg text-blanc mb-6">Adresse</h3>
              <div className="flex items-start gap-3 text-blanc/60 mb-8">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p>Toulouse & environs</p>
                  <p>Haute-Garonne (31)</p>
                </div>
              </div>

              <h4 className="font-medium text-blanc/80 mb-3">Légal</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-blanc/50 hover:text-blanc/70 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 border-t border-blanc/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blanc/40">
            <p>© {new Date().getFullYear()} MATERIS. Tous droits réservés.</p>
            <p className="flex items-center gap-1">
              Fait avec <Heart size={14} className="text-dore" /> à Toulouse
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

