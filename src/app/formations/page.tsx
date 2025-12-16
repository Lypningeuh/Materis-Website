import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/ui/PageHeader";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

const FormationsContent = dynamic(() => import("./FormationsContent"), {
  loading: () => <SectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Formations ostéopathie gynécologique — MATERIS",
  description:
    "Découvrez nos formations en ostéopathie gynécologique : Pack ENDO digital, présentiel, In Situ et Aurizon. Choisissez le format adapté à vos besoins.",
};

export default function FormationsPage() {
  return (
    <>
      <PageHeader
        overtitle="Formations"
        title="Formations & Accompagnements"
        subtitle="Choisissez le chemin qui vous correspond pour développer votre expertise en santé féminine."
      />
      <Suspense fallback={<SectionSkeleton />}>
        <FormationsContent />
      </Suspense>
    </>
  );
}

