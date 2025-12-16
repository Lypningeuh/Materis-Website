import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

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
        overtitle="La méthode"
        title="La signature pédagogique MATERIS"
        subtitle="Une approche unique qui allie technique, accompagnement continu et application terrain."
      />
      <Suspense fallback={<SectionSkeleton />}>
        <MethodeContent />
      </Suspense>
    </>
  );
}

