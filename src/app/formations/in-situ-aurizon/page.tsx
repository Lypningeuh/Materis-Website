import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

const InSituAurizonContent = dynamic(() => import("./InSituAurizonContent"), {
  loading: () => <SectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Formation In Situ & Aurizon — MATERIS vient chez vous",
  description:
    "Formation personnalisée dans votre cabinet. In Situ : accompagnement sur vos patientes. Aurizon : transformation complète de votre pratique.",
};

export default function InSituAurizonPage() {
  return (
    <>
      <PageHeader
        overtitle="Accompagnement premium"
        title="In Situ & Aurizon"
        subtitle="Des formules d'accompagnement personnalisé pour transformer votre pratique en profondeur."
      />
      <Suspense fallback={<SectionSkeleton />}>
        <InSituAurizonContent />
      </Suspense>
    </>
  );
}

