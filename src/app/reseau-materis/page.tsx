import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import reseauContent from "../../../content/reseau-page.json";

const ReseauContent = dynamic(() => import("./ReseauContent"), {
  loading: () => <SectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Réseau MATERIS — Praticiens formés en ostéopathie gynécologique",
  description:
    "Découvrez le réseau MATERIS : une communauté de praticiens formés à une même méthode d'ostéopathie gynécologique. Trouvez un praticien près de chez vous.",
};

export default function ReseauPage() {
  return (
    <>
      <PageHeader
        overtitle={reseauContent.pageHeader.overtitle}
        title={reseauContent.pageHeader.title}
        subtitle={reseauContent.pageHeader.subtitle}
      />
      <Suspense fallback={<SectionSkeleton />}>
        <ReseauContent />
      </Suspense>
    </>
  );
}

