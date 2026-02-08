import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import packEndoContent from "../../../../content/pack-endo.json";

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
        overtitle={packEndoContent.pageHeader.overtitle}
        title={packEndoContent.pageHeader.title}
        subtitle={packEndoContent.pageHeader.subtitle}
      />
      <Suspense fallback={<SectionSkeleton />}>
        <PackEndoContent />
      </Suspense>
    </>
  );
}

