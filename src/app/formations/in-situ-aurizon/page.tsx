import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import inSituContent from "../../../../content/in-situ-aurizon.json";

const InSituAurizonContent = dynamic(() => import("./InSituAurizonContent"), {
  loading: () => <SectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Formation In Situ & Aurizon — MATERIS vient chez vous",
  description:
    "Accompagnement personnalisée dans votre cabinet. In Situ : accompagnement sur vos patientes. Aurizon : transformation complète de votre pratique avec Boosttoncab.fr.",
};

export default function InSituAurizonPage() {
  return (
    <>
      <PageHeader
        overtitle={inSituContent.pageHeader.overtitle}
        title={inSituContent.pageHeader.title}
        subtitle={inSituContent.pageHeader.subtitle}
      />
      <Suspense fallback={<SectionSkeleton />}>
        <InSituAurizonContent />
      </Suspense>
    </>
  );
}

