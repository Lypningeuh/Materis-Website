import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

const RessourcesContent = dynamic(() => import("./RessourcesContent"), {
  loading: () => <SectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Ressources & Cadeaux — MATERIS",
  description:
    "Ressources gratuites pour praticiens : 3 techniques offertes, FAQ, articles sur l'endométriose et la santé féminine.",
};

export default function RessourcesPage() {
  return (
    <>
      <PageHeader
        overtitle="Ressources"
        title="Ressources & Cadeaux"
        subtitle="Des contenus gratuits pour vous accompagner dans votre pratique."
      />
      <Suspense fallback={<SectionSkeleton />}>
        <RessourcesContent />
      </Suspense>
    </>
  );
}

