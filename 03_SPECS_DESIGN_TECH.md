# 🎨 SPÉCIFICATIONS DESIGN & TECHNIQUES

---

## 🎯 Objectif UX

**Sensation recherchée** : Luxueux, calme, zen. Beaucoup de douceur et de lumière.

**Ambiance** :
- Effet "whaou" élégant et apaisant
- Confiance et expertise
- Respiration et espace
- MATERIS = le réseau de référence en ostéo gynéco

---

## 🎨 Palette de Couleurs

### Couleurs principales

| Couleur | Hex | RGB | Usage |
|---------|-----|-----|-------|
| **Noir** | `#221D2B` | RGB(34, 29, 43) | Textes, titres, éléments forts |
| **Clair** | `#FAF8F4` | RGB(250, 248, 244) | Fonds, espaces, luminosité |
| **Doré** | `#D6A647` | RGB(214, 166, 71) | Accents, CTAs, touches luxe |

### Variantes suggérées

#### Noir (du plus clair au plus foncé)
| Variante | Hex | Usage |
|----------|-----|-------|
| **Noir léger** | `#3D3549` | Textes secondaires, sous-titres |
| **Noir principal** | `#221D2B` | Titres, textes importants |
| **Noir profond** | `#1A1520` | Éléments de contraste fort |

#### Clair (variations lumineuses)
| Variante | Hex | Usage |
|----------|-----|-------|
| **Blanc pur** | `#FFFFFF` | Cartes, zones mises en avant |
| **Clair principal** | `#FAF8F4` | Fond de page principal |
| **Crème doux** | `#F5F2EB` | Sections alternées, séparations |
| **Beige léger** | `#EDE9E0` | Hover states, bordures douces |

#### Doré (du plus clair au plus foncé)
| Variante | Hex | Usage |
|----------|-----|-------|
| **Doré clair** | `#E8C777` | Highlights subtils, icônes |
| **Doré principal** | `#D6A647` | CTAs, accents, éléments luxe |
| **Doré foncé** | `#B8892F` | Hover CTAs, emphase |
| **Bronze** | `#9A7328` | États actifs, détails |

### Règles d'utilisation

| Contexte | Couleur recommandée |
|----------|---------------------|
| **Fond de page** | Clair `#FAF8F4` |
| **Titres H1** | Noir `#221D2B` |
| **Texte courant** | Noir léger `#3D3549` |
| **CTAs principaux** | Doré `#D6A647` sur fond clair |
| **CTAs secondaires** | Bordure doré, fond transparent |
| **Liens** | Doré `#D6A647` |
| **Sections alternées** | Crème `#F5F2EB` |
| **Cartes/Blocs** | Blanc `#FFFFFF` avec ombre douce |
| **Bordures** | Beige `#EDE9E0` |
| **Footer** | Noir `#221D2B` avec texte clair |

---

## 🔤 Typographie

### Recommandations pour l'ambiance luxe/zen

| Usage | Style | Exemples de fonts |
|-------|-------|-------------------|
| **Titres H1** | Serif élégante, fine, espacement généreux | Cormorant Garamond, Playfair Display, Libre Baskerville |
| **Titres H2-H3** | Serif ou sans-serif légère | Cormorant, Lora, Montserrat Light |
| **Citations** | Italique serif, ou manuscrite élégante | Cormorant Italic, Caveat |
| **Corps de texte** | Sans-serif fine, très lisible | Raleway, Nunito Sans, Source Sans Pro |
| **CTAs / Boutons** | Sans-serif, espacement large (letter-spacing) | Montserrat, Raleway |

### Principes typographiques
- **Espacement généreux** : line-height 1.6 à 1.8
- **Letter-spacing** : légèrement espacé sur les titres
- **Contraste doux** : éviter le noir pur, utiliser `#221D2B`
- **Respiration** : marges généreuses entre les blocs

---

## 📸 Visuels

### Photos à utiliser
Les photos seront dans un **dossier dédié** du projet (pas de liens externes).

| Type | Description |
|------|-------------|
| **Sandrine portrait** | Souriante, lumineuse, professionnelle |
| **Sandrine en action** | En cabinet, gestes doux, concentrée |
| **Mains** | Photos des mains en action, lumière douce |
| **Cabinet** | Ambiance zen, moments de transmission |
| **Captures WhatsApp** | Témoignages authentiques (anonymisés) |

### Style photographique — Ambiance luxe/zen
- **Lumière naturelle** : douce, baignée de clarté
- **Tons neutres** : beiges, blancs cassés, touches dorées
- **Espace négatif** : respiration dans les compositions
- **Douceur** : pas de contrastes trop forts
- **Authenticité** : naturel mais soigné

---

## ✨ Animations & Micro-interactions

### Principes — Douceur & Fluidité
- **Timing long** : transitions de 400-600ms (pas de rapidité agressive)
- **Easing doux** : `ease-out`, `cubic-bezier(0.25, 0.1, 0.25, 1)`
- **Respiration** : animations qui évoquent le calme
- **Subtilité** : effets discrets, jamais intrusifs

### Micro-interactions

| Élément | Interaction | Durée |
|---------|-------------|-------|
| **CTAs** | Scale léger (1.02) + légère lueur dorée | 300ms |
| **Liens** | Underline qui se déploie de gauche à droite | 250ms |
| **Sections** | Fade-in + léger slide-up au scroll | 600ms |
| **Cards** | Ombre qui s'intensifie doucement au hover | 400ms |
| **Images** | Léger zoom (1.03) au hover | 500ms |
| **Formulaires** | Bordure dorée au focus | 200ms |
| **Témoignages** | Crossfade doux entre slides | 500ms |

### Effets visuels

| Effet | Application |
|-------|-------------|
| **Ombres douces** | `box-shadow: 0 4px 20px rgba(34, 29, 43, 0.08)` |
| **Bordures subtiles** | `border: 1px solid #EDE9E0` |
| **Glassmorphism léger** | `backdrop-filter: blur(10px)` sur header sticky |
| **Gradient doré** | Sur certains CTAs : `linear-gradient(135deg, #E8C777, #D6A647)` |

---

## 🔧 Fonctionnalités Techniques

### Intégrations obligatoires

| Fonctionnalité | Outil | Notes |
|----------------|-------|-------|
| **Prise de RDV** | Calendly | Iframe ou popup |
| **WhatsApp** | Lien direct | `https://wa.me/33631702848` |
| **Lead Capture** | Formulaire | Prénom + Email + Téléphone |
| **Carte praticiens** | Map interactive | ~12 praticiens |
| **PDF téléchargeable** | Programme présentiel | |

### Contacts

| Canal | Coordonnées |
|-------|-------------|
| **Téléphone 1** | 06 82 94 06 18 |
| **Téléphone 2** | 06 87 52 88 22 |
| **WhatsApp** | 06 31 70 28 48 |
| **Email 1** | sandrine_osteo@yahoo.fr |
| **Email 2** | legorrecyannig@yahoo.fr |

### Formulaire Lead Magnet
**Offre** : "3 techniques gratuites"

**Champs** :
- Prénom *
- Email *
- Téléphone *

**Action** : Envoi automatique PDF/vidéo

### Formulaire Contact
**Champs** :
- Profil (select : Ostéo / Sage-femme / Kiné / Autre)
- Message *
- Comment puis-je vous aider ?

### Quiz "Parlons de vous"
**Checkboxes** :
- "Je débute et je me sens perdue face aux problématiques gynéco"
- "Je veux me spécialiser"
- "Je veux développer mon cabinet autrement"
- "Je ne sais pas trop, j'aimerais discuter"

**Action** : Redirection vers Calendly

---

## 📍 Carte des Praticiens

### Données par praticien
- Nom
- Ville / Localisation
- Profession (Ostéo / SF / Kiné)
- Année de formation Materis

### Fonctionnalités
- Carte interactive de France
- Points cliquables
- Liste filtrable par région
- ~12 praticiens à afficher

---

## 📱 Responsive Design

| Device | Priorité | Notes |
|--------|----------|-------|
| **Mobile** | ★★★★★ | Cible principale |
| **Tablet** | ★★★★ | Lecture confortable |
| **Desktop** | ★★★★ | Expérience complète |

### Mobile-first
- CTAs accessibles au pouce
- Téléphone cliquable (`tel:`)
- WhatsApp en 1 tap
- Formulaires adaptés

---

## 🗂️ SEO

### Mots-clés principaux
- formation endométriose
- formation ostéopathie gynécologique
- formation douleurs pelviennes
- formation santé féminine
- réseau ostéopathes gynéco

### Meta par page

| Page | Title |
|------|-------|
| **Accueil** | "MATERIS — Formations endométriose & ostéopathie gynécologique" |
| **À propos** | "Sandrine & l'histoire de MATERIS" |
| **Méthode** | "La méthode MATERIS — Signature pédagogique" |
| **Formations** | "Formations ostéopathie gynécologique — MATERIS" |
| **Présentiel** | "Formation présentielle santé féminine — MATERIS" |
| **Pack ENDO** | "Pack ENDO — Formation digitale endométriose" |
| **In Situ** | "Formation In Situ — MATERIS vient chez vous" |
| **Réseau** | "Réseau MATERIS — Praticiens formés" |
| **Ressources** | "Ressources & cadeaux — MATERIS" |
| **Contact** | "Contact & RDV — MATERIS" |

---

## 📋 Checklist Développeur

### Pages à créer
- [ ] Accueil (/)
- [ ] À propos (/a-propos)
- [ ] Méthode Materis (/methode-materis)
- [ ] Formations index (/formations)
- [ ] Présentiel (/formations/presentiel)
- [ ] Pack ENDO (/formations/pack-endo)
- [ ] In Situ & Aurizon (/formations/in-situ-aurizon)
- [ ] Réseau Materis (/reseau-materis)
- [ ] Ressources (/ressources)
- [ ] Contact (/contact)
- [ ] Mentions légales (/mentions-legales)

### Composants
- [ ] Header avec navigation
- [ ] Footer humain avec contacts
- [ ] Hero section
- [ ] Section 3 piliers (cards)
- [ ] Cards offres de formation (PRAKTIKA / IN SITU / AURIZON)
- [ ] Carousel témoignages
- [ ] Quiz "Parlons de vous" (checkboxes + CTA)
- [ ] Formulaire lead magnet
- [ ] Formulaire contact
- [ ] Intégration Calendly
- [ ] Bouton WhatsApp
- [ ] Carte interactive praticiens
- [ ] Timeline parcours
- [ ] Grille tarifaire
- [ ] Bloc "Compteur praticiens formés"

### Intégrations
- [ ] Calendly (RDV)
- [ ] WhatsApp Business link
- [ ] Service emailing (lead magnet)
- [ ] Analytics
- [ ] Map provider (carte praticiens)

---

## 🧘 Esthétique Globale — Luxe & Zen

### Principes directeurs
| Principe | Application |
|----------|-------------|
| **Espace blanc** | Marges généreuses (80px+ entre sections) |
| **Respiration** | Beaucoup d'air, pas de surcharge |
| **Lumière** | Fond clair dominant `#FAF8F4` |
| **Touches dorées** | Accents précieux mais discrets |
| **Élégance** | Lignes fines, typographie soignée |
| **Calme** | Animations lentes, pas d'agressivité |

### Références visuelles
- Spa haut de gamme
- Hôtellerie de luxe
- Studios de yoga premium
- Marques de bien-être élégantes

### Ne pas faire
- ❌ Couleurs vives ou saturées
- ❌ Animations rapides ou saccadées
- ❌ Typographies lourdes ou grasses
- ❌ Trop d'éléments sur une même vue
- ❌ Contrastes agressifs
- ❌ Pop-ups intrusifs

---

## 🚀 Points d'attention

### Must-have
1. **Ambiance luxe/zen** cohérente sur toutes les pages
2. **Logo MATERIS** élégant et visible
3. **Beaucoup d'espace blanc** (respiration)
4. **Touches dorées** subtiles (CTAs, accents)
5. **Calendly accessible** facilement
6. **WhatsApp** en 1 clic
7. **3 piliers** bien mis en avant
8. **Photos lumineuses** de Sandrine
9. **Mobile-first**

### Nice-to-have
1. Vidéos de présentation (ambiance douce)
2. Blog / Articles cas cliniques
3. Espace membre (futur)
4. Paiement en ligne (futur)

### À éviter
- Design chargé ou agressif
- Couleurs vives (rose, bordeaux, etc.)
- Animations rapides
- Trop de texte sans respiration
- Images stock génériques
- Typographies lourdes

---

## 📎 Ressources

| Élément | Localisation |
|---------|--------------|
| **Photos** | Dossier `/images` du projet |
| **Programme PDF** | À fournir |
| **Témoignages praticiens** | À récupérer (~12 personnes) |
| **Liste praticiens réseau** | À récupérer |

---

## ✅ Informations techniques confirmées

| Élément | Statut |
|---------|--------|
| **Ton** | Vouvoiement |
| **Vidéos** | Pas encore disponibles |
| **Lead magnet** | PDF + Podcast |
| **Photos** | (dossier `/images`) |

---

## ⚠️ Checklist technique

- [ ] PDF programme présentiel
- [ ] PDF des 3 techniques (lead magnet)
- [ ] Fichier audio podcast (si applicable)

> **Note** : Tarifs, praticiens, témoignages → voir `02_CONTENU_PAGES.md`
