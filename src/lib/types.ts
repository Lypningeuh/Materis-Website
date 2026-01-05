export interface RessourceCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Ressource {
  id: string;
  category_id: string | null;
  title: string;
  description: string | null;
  sections_count: number;
  lessons_count: number;
  members_count: number;
  external_url: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  category?: RessourceCategory;
}

export interface Session {
  id: string;
  title: string;
  date_start: string;
  date_end: string | null;
  location: string | null;
  instructor: string | null;
  price: number | null;
  places_total: number | null;
  places_remaining: number | null;
  description: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Praticien {
  id: string;
  name: string;
  specialty: string | null;
  city: string | null;
  department: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  photo_url: string | null;
  formation_year: number | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface FormationExample {
  id: string;
  type: 'pdf' | 'video';
  title: string;
  description: string | null;
  file_url: string;
  thumbnail_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

