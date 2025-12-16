import HeroSection from "@/components/sections/HeroSection";
import ReseauSection from "@/components/sections/ReseauSection";
import PiliersSection from "@/components/sections/PiliersSection";
import HistoireSection from "@/components/sections/HistoireSection";
import CheminsSection from "@/components/sections/CheminsSection";
import QuizSection from "@/components/sections/QuizSection";
import TemoignagesSection from "@/components/sections/TemoignagesSection";
import LeadMagnetSection from "@/components/sections/LeadMagnetSection";

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero Materis */}
      <HeroSection />

      {/* Section 2 — Pourquoi Materis ? (Réseau/franchise) */}
      <ReseauSection />

      {/* Section 3 — Les 3 piliers de la méthode */}
      <PiliersSection />

      {/* Section 4 — Histoire & confession courte */}
      <HistoireSection />

      {/* Section 5 — Les 3 chemins possibles */}
      <CheminsSection />

      {/* Section 6 — Parlons de vous (Quiz) */}
      <QuizSection />

      {/* Section 7 — Témoignages praticiens + patientes */}
      <TemoignagesSection />

      {/* Section 8 — Lead Magnet (3 techniques gratuites) */}
      <LeadMagnetSection />

      {/* Section 9 — Footer humain (dans le layout) */}
    </>
  );
}
