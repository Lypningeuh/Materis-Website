import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import siteContent from "../../../content/site.json";

const MethodeContent = dynamic(() => import("./MethodeContent"), {
  loading: () => <SectionSkeleton />,
});

export const metadata: Metadata = {
  title: "La méthode MATERIS — Signature pédagogique",
  description:
    "Découvrez la méthode MATERIS : 3 piliers (technique, accompagnement, terrain), le geste juste, et une approche unique de l'ostéopathie gynécologique.",
};

export default function MethodePage() {
  return (
    <>
      <PageHeader
        overtitle={siteContent.methodePageHeader.overtitle}
        title={siteContent.methodePageHeader.title}
        subtitle={siteContent.methodePageHeader.subtitle}
      />
      <Suspense fallback={<SectionSkeleton />}>
        <MethodeContent />
      </Suspense>
    </>
  );
}

