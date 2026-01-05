import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

const AProposContent = dynamic(() => import("./AProposContent"), {
  loading: () => <SectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Sandrine & l'histoire de MATERIS — À propos",
  description:
    "Découvrez le parcours de Sandrine, ostéopathe depuis 28 ans, et l'histoire de MATERIS. De l'accident de mobylette à la création du réseau français d'ostéopathes gynéco.",
};

export default function AProposPage() {
  return (
    <>
      <PageHeader
        overtitle="À propos"
        title="Sandrine & l'histoire de MATERIS"
        subtitle="Un parcours de 28 ans au service des femmes, une transmission née d'une épreuve."
      />
      <Suspense fallback={<SectionSkeleton />}>
        <AProposContent />
      </Suspense>
    </>
  );
}

