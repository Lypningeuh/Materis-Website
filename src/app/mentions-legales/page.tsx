import { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Mentions Légales — MATERIS",
  description:
    "Mentions légales du site MATERIS - Formations en ostéopathie gynécologique par Sandrine Mosse.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        overtitle="Légal"
        title="Mentions légales"
      />

      <SectionWrapper background="clair">
        <div className="max-w-3xl mx-auto prose prose-lg prose-noir">

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Éditeur du site</h2>
            <p className="text-noir-light">
              Le site <strong>materis.fr</strong> est édité par :
            </p>
            <ul className="text-noir-light space-y-1">
              <li><strong>Nom :</strong> Sandrine Mosse</li>
              <li><strong>Activité :</strong> Formation professionnelle en ostéopathie gynécologique</li>
              <li><strong>Adresse :</strong> Toulouse et environs, Haute-Garonne (31)</li>
              <li><strong>Email :</strong> sandrine.mosse@materis.fr</li>
              <li><strong>Téléphone :</strong> 06 31 70 28 48</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Responsable de la publication</h2>
            <p className="text-noir-light">
              La responsable de la publication est <strong>Sandrine Mosse</strong>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Hébergement</h2>
            <p className="text-noir-light">
              Le site est hébergé par :
            </p>
            <ul className="text-noir-light space-y-1">
              <li><strong>Vercel Inc.</strong></li>
              <li>440 N Barranca Ave #4133</li>
              <li>Covina, CA 91723, États-Unis</li>
              <li>Site web : vercel.com</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Propriété intellectuelle</h2>
            <p className="text-noir-light">
              L&apos;ensemble des contenus présents sur le site MATERIS (textes, images, vidéos, logos,
              supports pédagogiques) sont la propriété exclusive de Sandrine Mosse / MATERIS,
              sauf mention contraire.
            </p>
            <p className="text-noir-light">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou
              partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite
              sans autorisation écrite préalable.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Protection des données personnelles</h2>
            <p className="text-noir-light">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification,
              de suppression et d&apos;opposition aux données vous concernant.
            </p>
            <p className="text-noir-light">
              Les données collectées via les formulaires de contact ou d&apos;inscription sont
              utilisées uniquement dans le cadre de la relation commerciale et ne sont jamais
              cédées à des tiers.
            </p>
            <p className="text-noir-light">
              Pour exercer vos droits, contactez-nous à : <strong>sandrine.mosse@materis.fr</strong>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Cookies</h2>
            <p className="text-noir-light">
              Le site MATERIS peut utiliser des cookies pour améliorer l&apos;expérience utilisateur
              et analyser le trafic. Vous pouvez configurer votre navigateur pour refuser les cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Limitation de responsabilité</h2>
            <p className="text-noir-light">
              MATERIS s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur ce site.
              Toutefois, MATERIS ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité
              des informations mises à disposition.
            </p>
            <p className="text-noir-light">
              Les formations proposées ne constituent pas des actes médicaux et s&apos;inscrivent
              en complément des parcours de soins.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-noir mb-4">Droit applicable</h2>
            <p className="text-noir-light">
              Les présentes mentions légales sont régies par le droit français. En cas de litige,
              les tribunaux français seront seuls compétents.
            </p>
          </section>

        </div>
      </SectionWrapper>
    </>
  );
}
