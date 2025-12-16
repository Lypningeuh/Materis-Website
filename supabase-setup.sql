-- =============================================
-- MATERIS Database Setup
-- Exécuter ce script dans le SQL Editor de Supabase
-- =============================================

-- SUPPRIMER LES TABLES EXISTANTES
DROP TABLE IF EXISTS ressources CASCADE;
DROP TABLE IF EXISTS ressource_categories CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS praticiens CASCADE;

-- Categories de ressources (= ONGLETS / TYPES)
CREATE TABLE ressource_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ressources (= CONTENUS individuels)
CREATE TABLE ressources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES ressource_categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  sections_count INT DEFAULT 0,
  lessons_count INT DEFAULT 0,
  members_count INT DEFAULT 0,
  external_url TEXT,
  is_published BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sessions de formation
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date_start DATE NOT NULL,
  date_end DATE,
  location TEXT,
  instructor TEXT,
  price DECIMAL(10,2),
  places_total INT,
  places_remaining INT,
  description TEXT,
  is_published BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Praticiens du réseau
CREATE TABLE praticiens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialty TEXT,
  city TEXT,
  department TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  photo_url TEXT,
  formation_year INT,
  is_published BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE ressource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ressources ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE praticiens ENABLE ROW LEVEL SECURITY;

-- Policies: Public read
CREATE POLICY "Public read ressource_categories" ON ressource_categories FOR SELECT USING (true);
CREATE POLICY "Public read published ressources" ON ressources FOR SELECT USING (is_published = true);
CREATE POLICY "Public read published sessions" ON sessions FOR SELECT USING (is_published = true);
CREATE POLICY "Public read published praticiens" ON praticiens FOR SELECT USING (is_published = true);

-- Policies: Service role full access (for admin operations)
CREATE POLICY "Service role all ressource_categories" ON ressource_categories FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all ressources" ON ressources FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all sessions" ON sessions FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role all praticiens" ON praticiens FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =============================================
-- DONNÉES DE DÉMONSTRATION
-- =============================================

-- CATEGORIES = Types/Onglets de ressources
INSERT INTO ressource_categories (name, slug, description, icon, display_order) VALUES
('Modules vidéo', 'modules-video', 'Formations vidéo complètes', 'Video', 1),
('Anatomie & Théorie', 'anatomie-theorie', 'Bases anatomiques et théoriques', 'BookOpen', 2),
('Techniques pratiques', 'techniques-pratiques', 'Démonstrations de techniques', 'Hand', 3),
('Cas cliniques', 'cas-cliniques', 'Études de cas réels', 'FileText', 4);

-- RESSOURCES = Contenus individuels dans chaque catégorie
-- Modules vidéo
INSERT INTO ressources (category_id, title, description, sections_count, lessons_count, members_count, is_published, display_order)
SELECT id, 'Introduction à l''ostéopathie gynécologique', 'Bienvenue dans la formation - vue d''ensemble de la spécialité', 1, 2, 3, true, 1 
FROM ressource_categories WHERE slug = 'modules-video';

INSERT INTO ressources (category_id, title, description, sections_count, lessons_count, members_count, is_published, display_order)
SELECT id, 'Cadre légal de la pratique', 'Aspects juridiques et réglementaires essentiels', 1, 2, 4, true, 2 
FROM ressource_categories WHERE slug = 'modules-video';

INSERT INTO ressources (category_id, title, description, sections_count, lessons_count, members_count, is_published, display_order)
SELECT id, 'Présentation complète de l''ostéopathie gynéco', 'Formation approfondie sur la spécialité', 3, 8, 10, true, 3 
FROM ressource_categories WHERE slug = 'modules-video';

-- Anatomie & Théorie
INSERT INTO ressources (category_id, title, description, sections_count, lessons_count, members_count, is_published, display_order)
SELECT id, 'Principes des manipulations viscérales pelviennes', 'Fondamentaux ostéopathiques du bassin', 2, 6, 3, true, 1 
FROM ressource_categories WHERE slug = 'anatomie-theorie';

INSERT INTO ressources (category_id, title, description, sections_count, lessons_count, members_count, is_published, display_order)
SELECT id, 'L''endométriose - Théorie', 'Comprendre la pathologie en profondeur', 4, 11, 4, true, 2 
FROM ressource_categories WHERE slug = 'anatomie-theorie';

-- Techniques pratiques
INSERT INTO ressources (category_id, title, description, sections_count, lessons_count, members_count, is_published, display_order)
SELECT id, 'Le Coccyx - Techniques complètes', 'Anatomie, tests et techniques du coccyx', 4, 11, 12, true, 1 
FROM ressource_categories WHERE slug = 'techniques-pratiques';

INSERT INTO ressources (category_id, title, description, sections_count, lessons_count, members_count, is_published, display_order)
SELECT id, 'Techniques ostéopathiques gynécologiques', 'Pratique des techniques essentielles', 3, 9, 8, true, 2 
FROM ressource_categories WHERE slug = 'techniques-pratiques';

-- Cas cliniques
INSERT INTO ressources (category_id, title, description, sections_count, lessons_count, members_count, is_published, display_order)
SELECT id, 'Cas clinique : Dyspareunie', 'Étude de cas - douleurs pendant les rapports', 1, 3, 5, true, 1 
FROM ressource_categories WHERE slug = 'cas-cliniques';

INSERT INTO ressources (category_id, title, description, sections_count, lessons_count, members_count, is_published, display_order)
SELECT id, 'Cas clinique : Endométriose stade III', 'Accompagnement d''une patiente complexe', 1, 4, 6, true, 2 
FROM ressource_categories WHERE slug = 'cas-cliniques';

-- PRATICIENS
INSERT INTO praticiens (name, specialty, city, department, phone, email, formation_year, is_published) VALUES
('Marie Dupont', 'Ostéopathe D.O.', 'Paris', '75', '06 12 34 56 78', 'marie.dupont@email.com', 2023, true),
('Sophie Martin', 'Ostéopathe D.O.', 'Lyon', '69', '06 23 45 67 89', 'sophie.martin@email.com', 2022, true),
('Claire Bernard', 'Sage-femme', 'Marseille', '13', '06 34 56 78 90', 'claire.bernard@email.com', 2024, true),
('Julie Petit', 'Ostéopathe D.O.', 'Bordeaux', '33', '06 45 67 89 01', 'julie.petit@email.com', 2023, true),
('Emma Leroy', 'Kinésithérapeute', 'Toulouse', '31', '06 56 78 90 12', 'emma.leroy@email.com', 2024, true),
('Laura Moreau', 'Ostéopathe D.O.', 'Nantes', '44', '06 67 89 01 23', 'laura.moreau@email.com', 2022, true),
('Camille Durand', 'Ostéopathe D.O.', 'Strasbourg', '67', '06 78 90 12 34', 'camille.durand@email.com', 2023, true);

-- SESSIONS
INSERT INTO sessions (title, date_start, date_end, location, instructor, price, places_total, places_remaining, description, is_published) VALUES
('Endométriose - Niveau 1', '2025-03-15', '2025-03-16', 'Paris', 'Sandrine', 650.00, 12, 8, 'Introduction à l''accompagnement des patientes atteintes d''endométriose', true),
('Dyspareunie & Douleurs pelviennes', '2025-04-12', '2025-04-13', 'Lyon', 'Sandrine', 650.00, 12, 10, 'Comprendre et traiter les douleurs pendant les rapports', true),
('Infertilité & Accompagnement', '2025-05-17', '2025-05-18', 'Paris', 'Sandrine', 650.00, 12, 12, 'Accompagnement ostéopathique du parcours PMA', true),
('Grossesse & Post-partum', '2025-06-14', '2025-06-15', 'Bordeaux', 'Sandrine', 650.00, 12, 11, 'Suivi de la femme enceinte et récupération post-accouchement', true),
('Endométriose - Niveau 2', '2025-09-20', '2025-09-21', 'Paris', 'Sandrine', 750.00, 10, 10, 'Approfondissement - cas complexes', true);

