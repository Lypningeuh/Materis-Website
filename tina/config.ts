import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "cms",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ========================================
      // HERO SECTION (Page d'accueil)
      // ========================================
      {
        name: "hero",
        label: "Accueil — Hero",
        path: "content",
        match: { include: "hero" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "badge",
            label: "Badge (texte au-dessus du titre)",
          },
          {
            type: "string",
            name: "titleBefore",
            label: "Titre — avant le mot doré",
          },
          {
            type: "string",
            name: "titleHighlight",
            label: "Titre — mot en doré",
          },
          {
            type: "string",
            name: "titleAfter",
            label: "Titre — après le mot doré",
          },
          {
            type: "string",
            name: "subtitle",
            label: "Sous-titre",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "backgroundImage",
            label: "Image de fond",
          },
          {
            type: "string",
            name: "ctaPrimary",
            label: "Bouton principal — texte",
          },
          {
            type: "string",
            name: "ctaPrimaryHref",
            label: "Bouton principal — lien",
          },
          {
            type: "string",
            name: "ctaSecondary",
            label: "Bouton secondaire — texte",
          },
          {
            type: "string",
            name: "calendlyUrl",
            label: "URL Calendly",
          },
          {
            type: "object",
            name: "stats",
            label: "Statistiques (chiffres clés)",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: `${item?.value} — ${item?.label}`,
              }),
            },
            fields: [
              { type: "string", name: "value", label: "Valeur (ex: 12+)" },
              {
                type: "string",
                name: "label",
                label: "Description (ex: praticiens formés)",
              },
            ],
          },
        ],
      },

      // ========================================
      // HISTOIRE SECTION (Page d'accueil)
      // ========================================
      {
        name: "histoire",
        label: "Accueil — Mon Histoire",
        path: "content",
        match: { include: "histoire" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "sectionLabel",
            label: "Label de section",
          },
          { type: "string", name: "title", label: "Titre (avant highlight)" },
          {
            type: "string",
            name: "titleHighlight",
            label: "Mot en doré dans le titre",
          },
          {
            type: "string",
            name: "paragraphs",
            label: "Paragraphes",
            list: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "quote",
            label: "Citation",
            ui: { component: "textarea" },
          },
          { type: "string", name: "quoteAuthor", label: "Auteur de la citation" },
          { type: "image", name: "image", label: "Photo" },
          { type: "string", name: "imageAlt", label: "Description de la photo" },
          {
            type: "string",
            name: "experienceYears",
            label: "Badge expérience (valeur)",
          },
          {
            type: "string",
            name: "experienceLabel",
            label: "Badge expérience (texte)",
          },
          { type: "string", name: "ctaText", label: "Bouton — texte" },
          { type: "string", name: "ctaHref", label: "Bouton — lien" },
          { type: "string", name: "timelineLabel", label: "Titre timeline" },
          {
            type: "object",
            name: "timeline",
            label: "Étapes clés",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: `${item?.year} — ${item?.event}`,
              }),
            },
            fields: [
              { type: "string", name: "year", label: "Année" },
              { type: "string", name: "event", label: "Événement" },
            ],
          },
        ],
      },

      // ========================================
      // PILIERS SECTION (Page d'accueil)
      // ========================================
      {
        name: "piliers",
        label: "Accueil — 3 Piliers",
        path: "content",
        match: { include: "piliers" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "eyebrow", label: "Surtitre" },
          { type: "string", name: "title", label: "Titre" },
          {
            type: "string",
            name: "subtitle",
            label: "Sous-titre",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "piliers",
            label: "Piliers",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.title,
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Titre" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "features",
                label: "Points clés",
                list: true,
              },
              {
                type: "boolean",
                name: "highlight",
                label: "Mettre en avant ?",
              },
            ],
          },
          { type: "string", name: "advantageLabel", label: "Avantage — surtitre" },
          { type: "string", name: "advantageTitle", label: "Avantage — titre" },
          {
            type: "string",
            name: "advantageDescription",
            label: "Avantage — description",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "advantageStats",
            label: "Avantage — chiffres",
            list: true,
            fields: [
              { type: "string", name: "value", label: "Valeur" },
              { type: "string", name: "label", label: "Description" },
            ],
          },
        ],
      },

      // ========================================
      // TÉMOIGNAGES SECTION
      // ========================================
      {
        name: "temoignages",
        label: "Témoignages",
        path: "content",
        match: { include: "temoignages" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "eyebrow", label: "Surtitre" },
          { type: "string", name: "title", label: "Titre" },
          {
            type: "string",
            name: "subtitle",
            label: "Sous-titre",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "videoTestimonials",
            label: "Témoignages vidéo",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.title,
              }),
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID vidéo OneTake",
              },
              { type: "string", name: "title", label: "Titre" },
            ],
          },
          {
            type: "object",
            name: "googleReviews",
            label: "Avis Google",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.author,
              }),
            },
            fields: [
              { type: "string", name: "author", label: "Auteur" },
              {
                type: "string",
                name: "text",
                label: "Texte de l'avis",
                ui: { component: "textarea" },
              },
              {
                type: "number",
                name: "rating",
                label: "Note (1-5)",
              },
            ],
          },
        ],
      },

      // ========================================
      // MÉTHODE PAGE
      // ========================================
      {
        name: "methode",
        label: "Page Méthode",
        path: "content",
        match: { include: "methode" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "piliersLabel", label: "Piliers — surtitre" },
          { type: "string", name: "piliersTitle", label: "Piliers — titre" },
          {
            type: "object",
            name: "piliers",
            label: "Piliers de la méthode",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.title,
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Titre" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "details",
                label: "Détails (liste)",
                list: true,
              },
            ],
          },
          {
            type: "string",
            name: "comparatifLabel",
            label: "Comparatif — surtitre",
          },
          {
            type: "string",
            name: "comparatifTitle",
            label: "Comparatif — titre",
          },
          {
            type: "object",
            name: "comparatif",
            label: "Tableau comparatif",
            list: true,
            fields: [
              {
                type: "string",
                name: "classique",
                label: "Formation classique",
              },
              { type: "string", name: "materis", label: "Méthode MATERIS" },
            ],
          },
          { type: "string", name: "gesteLabel", label: "Geste juste — surtitre" },
          { type: "string", name: "gesteTitle", label: "Geste juste — titre" },
          {
            type: "string",
            name: "gesteIntro",
            label: "Geste juste — intro",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "gesteBullets",
            label: "Geste juste — points",
            list: true,
          },
          {
            type: "string",
            name: "gesteBoxTitle",
            label: "Geste juste — titre encadré",
          },
          {
            type: "string",
            name: "gesteItems",
            label: "Geste juste — éléments encadré",
            list: true,
          },
          { type: "string", name: "profilsLabel", label: "Profils — surtitre" },
          { type: "string", name: "profilsTitle", label: "Profils — titre" },
          {
            type: "object",
            name: "profils",
            label: "Profils praticiens",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.title,
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "desc", label: "Description" },
            ],
          },
          {
            type: "string",
            name: "prerequis",
            label: "Pré-requis",
            ui: { component: "textarea" },
          },
          { type: "string", name: "ctaTitle", label: "CTA — titre" },
          {
            type: "string",
            name: "ctaSubtitle",
            label: "CTA — sous-titre",
            ui: { component: "textarea" },
          },
          { type: "string", name: "ctaButtonText", label: "CTA — bouton texte" },
          { type: "string", name: "ctaButtonHref", label: "CTA — bouton lien" },
        ],
      },

      // ========================================
      // À PROPOS PAGE
      // ========================================
      {
        name: "aPropos",
        label: "Page À Propos",
        path: "content",
        match: { include: "a-propos" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "pageHeader",
            label: "En-tête de page",
            fields: [
              { type: "string", name: "overtitle", label: "Surtitre" },
              { type: "string", name: "title", label: "Titre" },
              {
                type: "string",
                name: "subtitle",
                label: "Sous-titre",
                ui: { component: "textarea" },
              },
            ],
          },
          { type: "string", name: "parcoursLabel", label: "Parcours — surtitre" },
          { type: "string", name: "parcoursTitle", label: "Parcours — titre" },
          { type: "image", name: "parcoursImage", label: "Photo portrait" },
          {
            type: "string",
            name: "parcoursImageAlt",
            label: "Description photo",
          },
          {
            type: "string",
            name: "parcoursParagraphs",
            label: "Parcours — paragraphes principaux",
            list: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "parcoursExpandedParagraphs",
            label: "Parcours — paragraphes « Lire la suite »",
            list: true,
            ui: { component: "textarea" },
          },
          { type: "string", name: "timelineTitle", label: "Timeline — titre" },
          {
            type: "object",
            name: "timeline",
            label: "Timeline",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: `${item?.year} — ${item?.event}`,
              }),
            },
            fields: [
              { type: "string", name: "year", label: "Année" },
              { type: "string", name: "event", label: "Événement" },
            ],
          },
          {
            type: "string",
            name: "confessionLabel",
            label: "Confession — surtitre",
          },
          { type: "string", name: "confessionTitle", label: "Confession — titre" },
          {
            type: "string",
            name: "confessionParagraphs",
            label: "Confession — paragraphes",
            list: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "confessionQuote",
            label: "Confession — citation",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "philosophieLabel",
            label: "Philosophie — surtitre",
          },
          {
            type: "string",
            name: "philosophieTitle",
            label: "Philosophie — titre",
          },
          {
            type: "string",
            name: "philosophieParagraphs",
            label: "Philosophie — paragraphes",
            list: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "philosophieDisclaimer",
            label: "Disclaimer complémentaire",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "quotidienLabel",
            label: "Quotidien — surtitre",
          },
          { type: "string", name: "quotidienTitle", label: "Quotidien — titre" },
          {
            type: "string",
            name: "quotidienDescription",
            label: "Quotidien — description",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "quotidienStats",
            label: "Quotidien — cartes",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.title,
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "description", label: "Description" },
            ],
          },
          { type: "string", name: "ctaTitle", label: "CTA — titre" },
        ],
      },

      // ========================================
      // FORMATIONS PAGE
      // ========================================
      {
        name: "formations",
        label: "Page Formations",
        path: "content",
        match: { include: "formations" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "pageHeader",
            label: "En-tête de page",
            fields: [
              { type: "string", name: "overtitle", label: "Surtitre" },
              { type: "string", name: "title", label: "Titre" },
              {
                type: "string",
                name: "subtitle",
                label: "Sous-titre",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "string",
            name: "presentielLabel",
            label: "Présentiel — surtitre",
          },
          {
            type: "string",
            name: "presentielTitle",
            label: "Présentiel — titre",
          },
          {
            type: "string",
            name: "presentielDescription",
            label: "Présentiel — description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "intervenants",
            label: "Intervenants (liste)",
            list: true,
          },
          {
            type: "string",
            name: "presentielCtaText",
            label: "Présentiel — bouton texte",
          },
          {
            type: "string",
            name: "presentielCtaHref",
            label: "Présentiel — bouton lien",
          },
          {
            type: "object",
            name: "sessions",
            label: "Sessions présentielles",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: `Session ${item?.num} — ${item?.title}`,
              }),
            },
            fields: [
              { type: "number", name: "num", label: "Numéro" },
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "dates", label: "Dates" },
              { type: "string", name: "price", label: "Prix" },
              { type: "string", name: "duration", label: "Durée" },
            ],
          },
          { type: "string", name: "packLabel", label: "Pack — label" },
          { type: "string", name: "packPrice", label: "Pack — prix" },
          {
            type: "string",
            name: "packOriginalPrice",
            label: "Pack — ancien prix",
          },
          {
            type: "string",
            name: "securiteImportant",
            label: "Sécurité — avertissement",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "securiteItems",
            label: "Sécurité — points",
            list: true,
          },
          { type: "string", name: "ctaTitle", label: "CTA — titre" },
          {
            type: "string",
            name: "ctaDescription",
            label: "CTA — description",
            ui: { component: "textarea" },
          },
          { type: "string", name: "ctaButtonText", label: "CTA — bouton texte" },
          {
            type: "string",
            name: "ctaCalendlyUrl",
            label: "CTA — lien Calendly",
          },
        ],
      },

      // ========================================
      // CHEMINS SECTION (choix formations)
      // ========================================
      {
        name: "chemins",
        label: "Accueil — Choix Formations",
        path: "content",
        match: { include: "chemins" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "eyebrow", label: "Surtitre" },
          { type: "string", name: "title", label: "Titre" },
          { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
          { type: "string", name: "offerTitle", label: "Offre — titre" },
          { type: "string", name: "offerBadge", label: "Offre — badge (ex: 3 places)" },
          { type: "string", name: "offerDescription", label: "Offre — description", ui: { component: "textarea" } },
          { type: "string", name: "offerDetails", label: "Offre — détails" },
          { type: "string", name: "modeSelectionText", label: "Texte choix du format" },
          { type: "string", name: "elearningTitle", label: "E-learning — titre" },
          { type: "string", name: "elearningSubtitle", label: "E-learning — sous-titre" },
          { type: "string", name: "elearningIntro", label: "E-learning — intro" },
          { type: "string", name: "presentielModeTitle", label: "Présentiel — titre choix" },
          { type: "string", name: "presentielModeSubtitle", label: "Présentiel — sous-titre choix" },
          { type: "string", name: "presentielIntro", label: "Présentiel — intro" },
          {
            type: "object", name: "elearningFormations", label: "Formations e-learning", list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.name }) },
            fields: [
              { type: "string", name: "name", label: "Nom" },
              { type: "string", name: "accroche", label: "Accroche" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "features", label: "Points clés", list: true },
              { type: "string", name: "href", label: "Lien" },
              { type: "boolean", name: "featured", label: "Mettre en avant ?" },
              { type: "string", name: "specialFeatureText", label: "Feature spéciale (texte)" },
              { type: "number", name: "specialFeaturePlaces", label: "Feature spéciale (places)" },
            ],
          },
          {
            type: "object", name: "presentielFormations", label: "Formations présentiel", list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.name }) },
            fields: [
              { type: "string", name: "name", label: "Nom" },
              { type: "string", name: "accroche", label: "Accroche" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "features", label: "Points clés", list: true },
              { type: "string", name: "href", label: "Lien" },
            ],
          },
        ],
      },

      // ========================================
      // QUIZ SECTION
      // ========================================
      {
        name: "quiz",
        label: "Accueil — Quiz",
        path: "content",
        match: { include: "quiz" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "eyebrow", label: "Surtitre" },
          { type: "string", name: "title", label: "Titre" },
          { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
          {
            type: "object", name: "options", label: "Options du quiz", list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "id", label: "ID" },
              { type: "string", name: "label", label: "Texte de l'option" },
            ],
          },
          { type: "string", name: "ctaText", label: "Bouton — texte" },
          { type: "string", name: "ctaHref", label: "Bouton — lien Calendly" },
          { type: "string", name: "ctaNote", label: "Note sous le bouton" },
        ],
      },

      // ========================================
      // LEAD MAGNET SECTION
      // ========================================
      {
        name: "leadMagnet",
        label: "Accueil — Lead Magnet",
        path: "content",
        match: { include: "lead-magnet" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "badge", label: "Badge" },
          { type: "string", name: "title", label: "Titre" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "string", name: "benefits", label: "Avantages", list: true },
          { type: "string", name: "formTitle", label: "Formulaire — titre" },
          { type: "string", name: "formSubtitle", label: "Formulaire — sous-titre" },
          { type: "string", name: "submitText", label: "Bouton envoi" },
          { type: "string", name: "privacyNote", label: "Note confidentialité" },
          { type: "string", name: "successTitle", label: "Succès — titre" },
          { type: "string", name: "successMessage", label: "Succès — message" },
        ],
      },

      // ========================================
      // RÉSEAU SECTION (homepage)
      // ========================================
      {
        name: "reseauSection",
        label: "Accueil — Réseau",
        path: "content",
        match: { include: "reseau-section" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "sectionLabel", label: "Label section" },
          { type: "string", name: "title", label: "Titre" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "string", name: "ctaText", label: "Bouton — texte" },
          { type: "string", name: "ctaHref", label: "Bouton — lien" },
          { type: "string", name: "floatingCardTitle", label: "Carte flottante — titre" },
          { type: "string", name: "floatingCardSubtitle", label: "Carte flottante — sous-titre" },
          { type: "string", name: "legendMain", label: "Légende — siège" },
          { type: "string", name: "legendDots", label: "Légende — praticiens" },
        ],
      },

      // ========================================
      // PACK ENDO PAGE
      // ========================================
      {
        name: "packEndo",
        label: "Page Pack Endo",
        path: "content",
        match: { include: "pack-endo" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object", name: "pageHeader", label: "En-tête de page",
            fields: [
              { type: "string", name: "overtitle", label: "Surtitre" },
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object", name: "ressources", label: "Ressources", list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "desc", label: "Description" },
            ],
          },
          { type: "string", name: "modulesLabel", label: "Modules — surtitre" },
          { type: "string", name: "modulesTitle", label: "Modules — titre" },
          {
            type: "object", name: "modules", label: "Modules", list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: `Module ${item?.num} — ${item?.title}` }) },
            fields: [
              { type: "number", name: "num", label: "Numéro" },
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "content", label: "Contenu", list: true },
            ],
          },
          { type: "string", name: "learningTitle", label: "Apprentissage — titre" },
          { type: "string", name: "learningItems", label: "Points d'apprentissage", list: true },
          { type: "string", name: "ctaTitle", label: "CTA — titre" },
          { type: "string", name: "ctaDescription", label: "CTA — description", ui: { component: "textarea" } },
          { type: "string", name: "ctaPrimaryText", label: "CTA — bouton principal" },
          { type: "string", name: "ctaCalendlyUrl", label: "CTA — lien Calendly" },
          { type: "string", name: "ctaSecondaryText", label: "CTA — bouton secondaire" },
        ],
      },

      // ========================================
      // IN SITU & AURIZON PAGE
      // ========================================
      {
        name: "inSituAurizon",
        label: "Page In Situ & Aurizon",
        path: "content",
        match: { include: "in-situ-aurizon" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object", name: "pageHeader", label: "En-tête de page",
            fields: [
              { type: "string", name: "overtitle", label: "Surtitre" },
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "inSituLabel", label: "In Situ — surtitre" },
          { type: "string", name: "inSituTitle", label: "In Situ — titre" },
          { type: "string", name: "inSituAccroche", label: "In Situ — accroche" },
          { type: "string", name: "inSituParagraphs", label: "In Situ — paragraphes", list: true, ui: { component: "textarea" } },
          { type: "string", name: "inSituAvantages", label: "In Situ — avantages", list: true },
          {
            type: "object", name: "inSituConcept", label: "In Situ — concept", list: true,
            fields: [
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "desc", label: "Description" },
            ],
          },
          { type: "string", name: "inSituSpecialFeature", label: "In Situ — feature spéciale" },
          { type: "number", name: "inSituPlacesLeft", label: "In Situ — places restantes" },
          { type: "string", name: "inSituScarcity", label: "In Situ — texte rareté" },
          { type: "string", name: "aurizonBadge", label: "Aurizon — badge" },
          { type: "string", name: "aurizonTitle", label: "Aurizon — titre" },
          { type: "string", name: "aurizonAccroche", label: "Aurizon — accroche" },
          { type: "string", name: "aurizonDescription", label: "Aurizon — description", ui: { component: "textarea" } },
          { type: "string", name: "aurizonInclus", label: "Aurizon — inclus", list: true },
          { type: "string", name: "aurizonPricing", label: "Aurizon — pricing" },
          { type: "string", name: "aurizonCtaText", label: "Aurizon — bouton texte" },
          { type: "string", name: "aurizonCalendlyUrl", label: "Aurizon — lien Calendly" },
          { type: "string", name: "comparatifTitle", label: "Comparatif — titre" },
          {
            type: "object", name: "comparatif", label: "Tableau comparatif", list: true,
            fields: [
              { type: "string", name: "critere", label: "Critère" },
              { type: "string", name: "inSitu", label: "IN SITU" },
              { type: "string", name: "aurizon", label: "AURIZON" },
            ],
          },
          { type: "string", name: "ctaTitle", label: "CTA — titre" },
          { type: "string", name: "ctaDescription", label: "CTA — description", ui: { component: "textarea" } },
          { type: "string", name: "ctaPrimaryText", label: "CTA — bouton principal" },
          { type: "string", name: "ctaCalendlyUrl", label: "CTA — lien Calendly" },
          { type: "string", name: "ctaSecondaryText", label: "CTA — bouton secondaire" },
        ],
      },

      // ========================================
      // PRÉSENTIEL PAGE
      // ========================================
      {
        name: "presentielPage",
        label: "Page Présentiel",
        path: "content",
        match: { include: "presentiel-page" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object", name: "pageHeader", label: "En-tête de page",
            fields: [
              { type: "string", name: "overtitle", label: "Surtitre" },
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "objectifs", label: "Objectifs pédagogiques", list: true },
          {
            type: "object", name: "intervenants", label: "Intervenants", list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.name }) },
            fields: [
              { type: "string", name: "name", label: "Nom" },
              { type: "string", name: "role", label: "Rôle" },
            ],
          },
          { type: "string", name: "pricingUnit8h", label: "Prix unitaire 8h" },
          { type: "string", name: "pricingUnit10h", label: "Prix unitaire 10h30" },
          { type: "string", name: "pricingMulti8h", label: "Prix 2+ sessions 8h" },
          { type: "string", name: "pricingMulti10h", label: "Prix 2+ sessions 10h30" },
          { type: "string", name: "pricingPack8h", label: "Prix pack 8h" },
          { type: "string", name: "pricingPack10h", label: "Prix pack 10h30" },
          { type: "string", name: "packTotal", label: "Pack — prix total" },
          { type: "string", name: "packTotalLabel", label: "Pack — label" },
          { type: "string", name: "depositPercent", label: "Acompte — pourcentage" },
          { type: "string", name: "depositLabel", label: "Acompte — label" },
          { type: "string", name: "publicLabel", label: "Public — surtitre" },
          { type: "string", name: "publicTitle", label: "Public — titre" },
          { type: "string", name: "publicDescription", label: "Public — description" },
          { type: "string", name: "prerequis", label: "Pré-requis" },
          { type: "string", name: "contactTitle", label: "Contact — titre" },
          { type: "string", name: "contactEmail", label: "Contact — email" },
          { type: "string", name: "contactPhone", label: "Contact — téléphone" },
        ],
      },

      // ========================================
      // CONTACT PAGE
      // ========================================
      {
        name: "contact",
        label: "Page Contact",
        path: "content",
        match: { include: "contact" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object", name: "pageHeader", label: "En-tête de page",
            fields: [
              { type: "string", name: "overtitle", label: "Surtitre" },
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "formTitle", label: "Formulaire — titre" },
          { type: "string", name: "contactTitle", label: "Contact direct — titre" },
          {
            type: "object", name: "contactChannels", label: "Canaux de contact", list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "value", label: "Valeur" },
              { type: "string", name: "secondValue", label: "Valeur secondaire" },
              { type: "string", name: "href", label: "Lien" },
            ],
          },
          { type: "string", name: "address", label: "Adresse" },
          { type: "string", name: "addressDetail", label: "Détail adresse" },
          { type: "string", name: "personalQuote", label: "Citation personnelle" },
          { type: "string", name: "calendlyTitle", label: "Calendly — titre" },
          { type: "string", name: "calendlyDescription", label: "Calendly — description" },
          { type: "string", name: "calendlyUrl", label: "Calendly — URL" },
          { type: "string", name: "calendlyCtaText", label: "Calendly — bouton" },
          { type: "string", name: "praticiensTitle", label: "Praticiens — titre" },
          { type: "string", name: "praticiensDescription", label: "Praticiens — description", ui: { component: "textarea" } },
          { type: "string", name: "praticiensCtaText", label: "Praticiens — bouton" },
          { type: "string", name: "successTitle", label: "Succès — titre" },
          { type: "string", name: "successMessage", label: "Succès — message" },
        ],
      },

      // ========================================
      // RÉSEAU PAGE
      // ========================================
      {
        name: "reseauPage",
        label: "Page Réseau",
        path: "content",
        match: { include: "reseau-page" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object", name: "pageHeader", label: "En-tête de page",
            fields: [
              { type: "string", name: "overtitle", label: "Surtitre" },
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "introText", label: "Texte d'introduction", ui: { component: "textarea" } },
          { type: "string", name: "praticiensLabel", label: "Praticiens — surtitre" },
          { type: "string", name: "praticiensTitle", label: "Praticiens — titre" },
          { type: "string", name: "charteLabel", label: "Charte — surtitre" },
          { type: "string", name: "charteTitle", label: "Charte — titre" },
          { type: "string", name: "charteDescription", label: "Charte — description", ui: { component: "textarea" } },
          { type: "string", name: "charteItems", label: "Charte — points", list: true },
          { type: "string", name: "certificationTitle", label: "Certification — titre" },
          { type: "string", name: "certificationDescription", label: "Certification — description", ui: { component: "textarea" } },
          { type: "string", name: "joinTitle", label: "Rejoindre — titre" },
          { type: "string", name: "joinFormTitle", label: "Rejoindre — se former titre" },
          { type: "string", name: "joinFormDescription", label: "Rejoindre — se former description", ui: { component: "textarea" } },
          { type: "string", name: "joinAlreadyTitle", label: "Rejoindre — déjà formé titre" },
          { type: "string", name: "joinAlreadyDescription", label: "Rejoindre — déjà formé description", ui: { component: "textarea" } },
          { type: "string", name: "whatsappTitle", label: "WhatsApp — titre" },
          { type: "string", name: "whatsappDescription", label: "WhatsApp — description", ui: { component: "textarea" } },
          { type: "string", name: "whatsappCtaText", label: "WhatsApp — bouton" },
        ],
      },

      // ========================================
      // RESSOURCES PAGE
      // ========================================
      {
        name: "ressources",
        label: "Page Ressources",
        path: "content",
        match: { include: "ressources" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object", name: "pageHeader", label: "En-tête de page",
            fields: [
              { type: "string", name: "overtitle", label: "Surtitre" },
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "leadMagnetLabel", label: "Lead Magnet — surtitre" },
          { type: "string", name: "leadMagnetTitle", label: "Lead Magnet — titre" },
          { type: "string", name: "leadMagnetDescription", label: "Lead Magnet — description", ui: { component: "textarea" } },
          { type: "string", name: "leadMagnetTechniques", label: "Lead Magnet — techniques", list: true },
          { type: "string", name: "leadMagnetFormTitle", label: "Lead Magnet — titre formulaire" },
          { type: "string", name: "leadMagnetSubmitText", label: "Lead Magnet — bouton" },
          { type: "string", name: "resourceHubLabel", label: "Hub — surtitre" },
          { type: "string", name: "resourceHubTitle", label: "Hub — titre" },
          { type: "string", name: "resourceHubSubtitle", label: "Hub — sous-titre" },
          { type: "string", name: "faqLabel", label: "FAQ — surtitre" },
          { type: "string", name: "faqTitle", label: "FAQ — titre" },
          {
            type: "object", name: "faqItems", label: "Questions FAQ", list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.question }) },
            fields: [
              { type: "string", name: "question", label: "Question" },
              { type: "string", name: "answer", label: "Réponse", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "ctaTitle", label: "CTA — titre" },
        ],
      },

      // ========================================
      // SITE GLOBAL (Header, Footer, page headers)
      // ========================================
      {
        name: "site",
        label: "Site Global (Header, Footer)",
        path: "content",
        match: { include: "site" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "calendlyUrl", label: "URL Calendly globale" },
          {
            type: "object", name: "navigation", label: "Navigation", list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.name }) },
            fields: [
              { type: "string", name: "name", label: "Nom" },
              { type: "string", name: "href", label: "Lien" },
            ],
          },
          { type: "string", name: "headerCtaText", label: "Header — bouton CTA" },
          { type: "string", name: "footerDescription", label: "Footer — description", ui: { component: "textarea" } },
          { type: "string", name: "footerSignatureName", label: "Footer — nom signature" },
          { type: "string", name: "footerSignatureRole", label: "Footer — rôle signature" },
          { type: "string", name: "footerContactTitle", label: "Footer — titre contact" },
          { type: "string", name: "footerContactSubtitle", label: "Footer — sous-titre contact" },
          {
            type: "object", name: "footerContact", label: "Footer — canaux contact", list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "Lien" },
              { type: "string", name: "text", label: "Texte affiché" },
            ],
          },
          { type: "string", name: "footerAddress", label: "Footer — adresse" },
          { type: "string", name: "footerAddressDetail", label: "Footer — détail adresse" },
          { type: "string", name: "footerNewsletter", label: "Footer — texte newsletter", ui: { component: "textarea" } },
          {
            type: "object", name: "methodePageHeader", label: "Page Méthode — en-tête",
            fields: [
              { type: "string", name: "overtitle", label: "Surtitre" },
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
            ],
          },
        ],
      },
    ],
  },
});
