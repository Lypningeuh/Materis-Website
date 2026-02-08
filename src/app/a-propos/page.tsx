import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import aProposContent from "../../../content/a-propos.json";

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
        overtitle={aProposContent.pageHeader.overtitle}
        title={aProposContent.pageHeader.title}
        subtitle={aProposContent.pageHeader.subtitle}
      />
      <Suspense fallback={<SectionSkeleton />}>
        <AProposContent />
      </Suspense>
    </>
  );
}
