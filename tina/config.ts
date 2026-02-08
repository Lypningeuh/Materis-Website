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
    ],
  },
});
