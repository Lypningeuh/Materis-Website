import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

const PresentielContent = dynamic(() => import("./PresentielContent"), {
  loading: () => <SectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Formation présentielle santé féminine — MATERIS",
  description:
    "Formation présentielle en ostéopathie gynécologique. Programme 2025-2026 : endométriose, dyspareunie, infertilité, grossesse. Avec Sandrine et intervenants experts.",
};

export default function PresentielPage() {
  return (
    <>
      <PageHeader
        overtitle="Formation présentielle"
        title="Santé féminine & endométriose"
        subtitle="Apprendre au contact du terrain, avec un regard croisé. Passer de la technique au geste juste."
      />
      <Suspense fallback={<SectionSkeleton />}>
        <PresentielContent />
      </Suspense>
    </>
  );
}

