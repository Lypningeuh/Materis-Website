import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import ressourcesContent from "../../../content/ressources.json";

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
        overtitle={ressourcesContent.pageHeader.overtitle}
        title={ressourcesContent.pageHeader.title}
        subtitle={ressourcesContent.pageHeader.subtitle}
      />
      <Suspense fallback={<SectionSkeleton />}>
        <RessourcesContent />
      </Suspense>
    </>
  );
}

