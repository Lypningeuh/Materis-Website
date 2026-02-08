import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import presentielContent from "../../../../content/presentiel-page.json";

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
        overtitle={presentielContent.pageHeader.overtitle}
        title={presentielContent.pageHeader.title}
        subtitle={presentielContent.pageHeader.subtitle}
      />
      <Suspense fallback={<SectionSkeleton />}>
        <PresentielContent />
      </Suspense>
    </>
  );
}

