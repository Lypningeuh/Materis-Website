import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

const ContactContent = dynamic(() => import("./ContactContent"), {
  loading: () => <SectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Contact & RDV — MATERIS",
  description:
    "Contactez MATERIS pour vos questions sur les formations en ostéopathie gynécologique. Prenez RDV pour un appel découverte de 20 minutes.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        overtitle="Contact"
        title="Parlons de vous"
        subtitle="Une question ? Une hésitation ? Je suis là pour vous accompagner."
      />
      <Suspense fallback={<SectionSkeleton />}>
        <ContactContent />
      </Suspense>
    </>
  );
}

