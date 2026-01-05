import { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — MATERIS",
  description:
    "Conditions générales de vente des formations MATERIS en ostéopathie gynécologique.",
};

export default function CGVPage() {
  return (
    <>
      <PageHeader
        overtitle="Légal"
        title="Conditions Générales de Vente"
      />

      <SectionWrapper background="clair">
        <div className="max-w-3xl mx-auto prose prose-lg prose-noir">

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 1 — Objet</h2>
            <p className="text-noir-light">
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
              entre <strong>MATERIS</strong>, représentée par Sandrine Mosse, organisme de formation
              professionnelle, et toute personne physique ou morale souhaitant bénéficier des
              formations proposées.
            </p>
            <p className="text-noir-light">
              Toute inscription à une formation implique l&apos;acceptation sans réserve des présentes CGV.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 2 — Formations proposées</h2>
            <p className="text-noir-light">
              MATERIS propose des formations en ostéopathie gynécologique destinées aux
              professionnels de santé (ostéopathes, kinésithérapeutes, sages-femmes, etc.).
            </p>
            <p className="text-noir-light">
              Les formations sont dispensées :
            </p>
            <ul className="text-noir-light space-y-1">
              <li>En <strong>e-learning</strong> (formation à distance)</li>
              <li>En <strong>présentiel</strong> (sessions à Toulouse ou dans votre cabinet)</li>
              <li>En <strong>format hybride</strong> (combinaison des deux)</li>
            </ul>
            <p className="text-noir-light">
              Le contenu détaillé de chaque formation est disponible sur le site materis.fr.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 3 — Inscription</h2>
            <p className="text-noir-light">
              L&apos;inscription à une formation s&apos;effectue via le site internet ou par contact direct
              (email, téléphone, WhatsApp). Elle est considérée comme définitive après :
            </p>
            <ul className="text-noir-light space-y-1">
              <li>Réception du formulaire d&apos;inscription complété</li>
              <li>Versement de l&apos;acompte ou du paiement intégral</li>
              <li>Envoi de la confirmation d&apos;inscription par MATERIS</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 4 — Tarifs et paiement</h2>
            <p className="text-noir-light">
              Les prix des formations sont indiqués en euros TTC sur le site materis.fr.
              MATERIS se réserve le droit de modifier ses tarifs à tout moment, les formations
              étant facturées au tarif en vigueur au moment de l&apos;inscription.
            </p>
            <p className="text-noir-light">
              <strong>Modalités de paiement :</strong>
            </p>
            <ul className="text-noir-light space-y-1">
              <li>Paiement intégral à l&apos;inscription</li>
              <li>Ou paiement en plusieurs fois (selon les conditions spécifiques à chaque formation)</li>
            </ul>
            <p className="text-noir-light">
              <strong>Moyens de paiement acceptés :</strong> Virement bancaire, carte bancaire, PayPal.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 5 — Droit de rétractation</h2>
            <p className="text-noir-light">
              Conformément à l&apos;article L221-18 du Code de la consommation, le client dispose d&apos;un
              délai de <strong>14 jours</strong> à compter de la date d&apos;inscription pour exercer
              son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
            </p>
            <p className="text-noir-light">
              Ce droit de rétractation ne peut être exercé si la formation en ligne a été
              commencée (accès aux contenus) avec l&apos;accord du client.
            </p>
            <p className="text-noir-light">
              Pour exercer ce droit, le client doit notifier sa décision par email à :
              <strong> sandrine.mosse@materis.fr</strong>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 6 — Annulation et report</h2>
            <p className="text-noir-light">
              <strong>Annulation par le client :</strong>
            </p>
            <ul className="text-noir-light space-y-1">
              <li>Plus de 30 jours avant la formation : remboursement intégral</li>
              <li>Entre 15 et 30 jours : remboursement de 50% ou report gratuit</li>
              <li>Moins de 15 jours : aucun remboursement, report possible selon disponibilités</li>
            </ul>
            <p className="text-noir-light mt-4">
              <strong>Annulation par MATERIS :</strong> En cas d&apos;annulation d&apos;une formation
              par MATERIS (nombre insuffisant de participants, cas de force majeure),
              le client sera intégralement remboursé ou pourra reporter son inscription.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 7 — Accès aux formations en ligne</h2>
            <p className="text-noir-light">
              Pour les formations e-learning, l&apos;accès aux contenus est personnel et non cessible.
              Le client s&apos;engage à ne pas partager ses identifiants de connexion.
            </p>
            <p className="text-noir-light">
              La durée d&apos;accès aux contenus est précisée pour chaque formation (généralement
              accès à vie pour les formations PRAKTIKA).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 8 — Propriété intellectuelle</h2>
            <p className="text-noir-light">
              L&apos;ensemble des contenus de formation (vidéos, PDF, documents, supports) sont
              protégés par le droit d&apos;auteur et restent la propriété exclusive de MATERIS.
            </p>
            <p className="text-noir-light">
              Toute reproduction, diffusion ou utilisation à des fins commerciales sans
              autorisation écrite est strictement interdite.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 9 — Responsabilité</h2>
            <p className="text-noir-light">
              Les formations MATERIS sont des formations professionnelles complémentaires et
              ne se substituent en aucun cas à une formation médicale initiale.
            </p>
            <p className="text-noir-light">
              <strong>Important :</strong> Les techniques enseignées ne constituent pas des actes
              médicaux et s&apos;inscrivent en complément des parcours de soins. Le participant
              reste seul responsable de l&apos;application des techniques dans sa pratique professionnelle.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 10 — Réclamations</h2>
            <p className="text-noir-light">
              Toute réclamation doit être adressée par email à <strong>sandrine.mosse@materis.fr</strong>.
              MATERIS s&apos;engage à apporter une réponse dans un délai de 15 jours ouvrés.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Article 11 — Protection des données</h2>
            <p className="text-noir-light">
              Les données personnelles collectées sont traitées conformément au RGPD.
              Elles sont utilisées uniquement pour la gestion des inscriptions et le suivi
              pédagogique. Elles ne sont jamais cédées à des tiers.
            </p>
            <p className="text-noir-light">
              Pour toute demande relative à vos données, contactez : <strong>sandrine.mosse@materis.fr</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-noir mb-4">Article 12 — Droit applicable</h2>
            <p className="text-noir-light">
              Les présentes CGV sont soumises au droit français. En cas de litige,
              une solution amiable sera recherchée avant toute action judiciaire.
              À défaut, les tribunaux de Toulouse seront seuls compétents.
            </p>
            <p className="text-noir-light mt-6 text-sm">
              <em>Dernière mise à jour : Janvier 2025</em>
            </p>
          </section>

        </div>
      </SectionWrapper>
    </>
  );
}
