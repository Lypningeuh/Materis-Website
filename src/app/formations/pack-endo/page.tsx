import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

const PackEndoContent = dynamic(() => import("./PackEndoContent"), {
  loading: () => <SectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Pack ENDO — Formation digitale endométriose — MATERIS",
  description:
    "Formation 100% digitale en ostéopathie gynécologique. 8 modules : tests, coccyx, péritoine, mobilité utérus, endométriose théorie et pratique.",
};

export default function PackEndoPage() {
  return (
    <>
      <PageHeader
        overtitle="Formation digitale"
        title="Pack ENDO"
        subtitle="Un parcours 100% digital pour intégrer pas à pas les fondamentaux de l'ostéopathie gynécologique et les spécificités de l'endométriose."
      />
      <Suspense fallback={<SectionSkeleton />}>
        <PackEndoContent />
      </Suspense>
    </>
  );
}

