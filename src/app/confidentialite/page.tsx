import { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — MATERIS",
  description:
    "Politique de confidentialité et protection des données personnelles du site MATERIS.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        overtitle="Légal"
        title="Politique de Confidentialité"
      />

      <SectionWrapper background="clair">
        <div className="max-w-3xl mx-auto prose prose-lg prose-noir">

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Introduction</h2>
            <p className="text-noir-light">
              La protection de vos données personnelles est une priorité pour <strong>MATERIS</strong>.
              Cette politique de confidentialité vous informe sur la manière dont vos données sont
              collectées, utilisées et protégées conformément au Règlement Général sur la Protection
              des Données (RGPD) et à la loi Informatique et Libertés.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Responsable du traitement</h2>
            <ul className="text-noir-light space-y-1">
              <li><strong>Responsable :</strong> Sandrine Mosse — MATERIS</li>
              <li><strong>Email :</strong> sandrine.mosse@materis.fr</li>
              <li><strong>Téléphone :</strong> 06 31 70 28 48</li>
              <li><strong>Adresse :</strong> Toulouse et environs, Haute-Garonne (31)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Données collectées</h2>
            <p className="text-noir-light">
              Nous collectons les données suivantes dans le cadre de notre activité :
            </p>
            <ul className="text-noir-light space-y-2">
              <li>
                <strong>Données d&apos;identification :</strong> nom, prénom, adresse email,
                numéro de téléphone
              </li>
              <li>
                <strong>Données professionnelles :</strong> profession, numéro ADELI/RPPS (le cas échéant),
                lieu d&apos;exercice
              </li>
              <li>
                <strong>Données de navigation :</strong> adresse IP, type de navigateur,
                pages consultées (via cookies analytiques)
              </li>
              <li>
                <strong>Données de paiement :</strong> traitées de manière sécurisée par nos
                prestataires de paiement (non stockées sur notre site)
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Finalités du traitement</h2>
            <p className="text-noir-light">
              Vos données sont collectées pour les finalités suivantes :
            </p>
            <ul className="text-noir-light space-y-1">
              <li>Gestion des inscriptions aux formations</li>
              <li>Suivi pédagogique et accompagnement personnalisé</li>
              <li>Communication relative à nos formations (informations, mises à jour)</li>
              <li>Réponse à vos demandes de contact</li>
              <li>Établissement des factures et documents administratifs</li>
              <li>Amélioration de nos services et de notre site web</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Base légale</h2>
            <p className="text-noir-light">
              Le traitement de vos données repose sur :
            </p>
            <ul className="text-noir-light space-y-1">
              <li><strong>L&apos;exécution du contrat</strong> : pour la gestion de votre inscription
                et le suivi de votre formation</li>
              <li><strong>Le consentement</strong> : pour l&apos;envoi de communications marketing
                (newsletter, offres)</li>
              <li><strong>L&apos;intérêt légitime</strong> : pour l&apos;amélioration de nos services
                et la sécurité du site</li>
              <li><strong>Les obligations légales</strong> : pour la conservation des factures
                et documents comptables</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Durée de conservation</h2>
            <p className="text-noir-light">
              Vos données sont conservées pendant les durées suivantes :
            </p>
            <ul className="text-noir-light space-y-1">
              <li><strong>Données clients :</strong> pendant la durée de la relation contractuelle
                + 3 ans après la dernière interaction</li>
              <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
              <li><strong>Données de navigation :</strong> 13 mois maximum</li>
              <li><strong>Données de prospects :</strong> 3 ans après le dernier contact</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Destinataires des données</h2>
            <p className="text-noir-light">
              Vos données peuvent être partagées avec :
            </p>
            <ul className="text-noir-light space-y-1">
              <li>Nos prestataires techniques (hébergement, paiement en ligne)</li>
              <li>Nos outils de communication (email, WhatsApp)</li>
              <li>Les organismes de financement (OPCO, FIF-PL) si vous faites une demande de prise en charge</li>
            </ul>
            <p className="text-noir-light mt-4">
              <strong>Nous ne vendons jamais vos données à des tiers.</strong>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Transferts hors UE</h2>
            <p className="text-noir-light">
              Certains de nos prestataires (hébergement, outils) peuvent être situés hors de l&apos;Union
              Européenne. Dans ce cas, nous nous assurons qu&apos;ils offrent des garanties appropriées
              (clauses contractuelles types, certification Privacy Shield, etc.).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Vos droits</h2>
            <p className="text-noir-light">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="text-noir-light space-y-2">
              <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
              <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la limitation :</strong> limiter le traitement dans certains cas</li>
              <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
            </ul>
            <p className="text-noir-light mt-4">
              Pour exercer ces droits, contactez-nous à : <strong>sandrine.mosse@materis.fr</strong>
            </p>
            <p className="text-noir-light">
              Vous pouvez également introduire une réclamation auprès de la CNIL :
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-dore hover:underline ml-1">
                www.cnil.fr
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Cookies</h2>
            <p className="text-noir-light">
              Notre site utilise des cookies pour :
            </p>
            <ul className="text-noir-light space-y-1">
              <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
              <li><strong>Cookies analytiques :</strong> pour comprendre comment vous utilisez le site
                (statistiques anonymes)</li>
            </ul>
            <p className="text-noir-light mt-4">
              Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté
              lorsqu&apos;un cookie est déposé.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-noir mb-4">Sécurité</h2>
            <p className="text-noir-light">
              Nous mettons en oeuvre des mesures techniques et organisationnelles appropriées
              pour protéger vos données contre tout accès non autorisé, modification, divulgation
              ou destruction :
            </p>
            <ul className="text-noir-light space-y-1">
              <li>Connexion sécurisée (HTTPS)</li>
              <li>Accès restreint aux données</li>
              <li>Mots de passe sécurisés</li>
              <li>Sauvegardes régulières</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-noir mb-4">Modifications</h2>
            <p className="text-noir-light">
              Cette politique de confidentialité peut être mise à jour. En cas de modification
              substantielle, nous vous en informerons par email ou via une notification sur le site.
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
