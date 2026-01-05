"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Méthode", href: "/methode-materis" },
  { name: "Formations", href: "/formations" },
  { name: "Réseau", href: "/reseau-materis" },
  { name: "Ressources", href: "/ressources" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Don't render on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  
  // Only use transparent/light header on homepage
  const isHomepage = pathname === "/";
  const useTransparentHeader = isHomepage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        useTransparentHeader
          ? "bg-transparent py-5"
          : "glass shadow-soft py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={useTransparentHeader ? "/logo_white.svg" : "/logo_full_header.svg"}
              alt="MATERIS"
              width={180}
              height={56}
              className="h-10 md:h-12 w-auto transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={`text-sm font-medium transition-colors duration-300 link-underline ${
                  useTransparentHeader
                    ? "text-blanc/90 hover:text-blanc"
                    : "text-noir-light hover:text-dore"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://calendly.com/sandrine-mosse-materis/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                useTransparentHeader
                  ? "bg-blanc/15 backdrop-blur-sm text-blanc border border-blanc/30 hover:bg-blanc/25"
                  : "btn-gradient text-blanc"
              }`}
            >
              <Phone size={16} />
              Prendre RDV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              useTransparentHeader ? "text-blanc" : "text-noir"
            }`}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:hidden bg-clair border-t border-beige"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 space-y-4">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    prefetch={true}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-medium text-noir-light hover:text-dore transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.length * 0.05 }}
                className="pt-4"
              >
                <a
                  href="https://calendly.com/sandrine-mosse-materis/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 btn-gradient text-blanc font-medium rounded-full"
                >
                  <Phone size={18} />
                  Prendre RDV
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
