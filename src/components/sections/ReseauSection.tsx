"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { Praticien } from "@/lib/types";

// Dictionnaire des villes françaises avec coordonnées sur la carte SVG
const CITY_COORDINATES: Record<string, { top: string; left: string }> = {
  // Nord
  "Lille": { top: "12%", left: "52%" },
  "Amiens": { top: "18%", left: "48%" },
  // Est
  "Strasbourg": { top: "20%", left: "72%" },
  "Metz": { top: "22%", left: "62%" },
  "Nancy": { top: "25%", left: "64%" },
  "Dijon": { top: "38%", left: "58%" },
  // Île-de-France
  "Paris": { top: "26%", left: "52%" },
  // Ouest
  "Rennes": { top: "28%", left: "29%" },
  "Nantes": { top: "38%", left: "25%" },
  "Brest": { top: "25%", left: "15%" },
  // Centre
  "Orléans": { top: "32%", left: "48%" },
  "Tours": { top: "36%", left: "40%" },
  "Clermont-Ferrand": { top: "48%", left: "48%" },
  // Sud-Ouest
  "Bordeaux": { top: "62%", left: "31%" },
  "Toulouse": { top: "72%", left: "42%" },
  "Montpellier": { top: "72%", left: "55%" },
  "Pau": { top: "75%", left: "30%" },
  // Sud-Est
  "Lyon": { top: "52%", left: "58%" },
  "Grenoble": { top: "55%", left: "62%" },
  "Marseille": { top: "78%", left: "60%" },
  "Nice": { top: "72%", left: "72%" },
  "Toulon": { top: "80%", left: "64%" },
  // Autres
  "Limoges": { top: "50%", left: "40%" },
  "Poitiers": { top: "42%", left: "38%" },
  "Angers": { top: "38%", left: "32%" },
  "Le Mans": { top: "32%", left: "38%" },
  "Caen": { top: "22%", left: "32%" },
  "Rouen": { top: "20%", left: "44%" },
  "Reims": { top: "22%", left: "56%" },
  "Besançon": { top: "38%", left: "64%" },
  "Saint-Étienne": { top: "55%", left: "55%" },
  "Perpignan": { top: "82%", left: "48%" },
  "Avignon": { top: "72%", left: "58%" },
  "Aix-en-Provence": { top: "76%", left: "62%" },
  "Cannes": { top: "75%", left: "70%" },
  "Annecy": { top: "50%", left: "64%" },
  "Chambéry": { top: "52%", left: "64%" },
  "Valence": { top: "58%", left: "58%" },
  "Nîmes": { top: "72%", left: "55%" },
  "Béziers": { top: "78%", left: "52%" },
  "Carcassonne": { top: "78%", left: "46%" },
  "Tarbes": { top: "78%", left: "34%" },
  "Agen": { top: "68%", left: "36%" },
  "La Rochelle": { top: "48%", left: "28%" },
  "Angoulême": { top: "52%", left: "34%" },
  "Périgueux": { top: "55%", left: "38%" },
  "Bayonne": { top: "78%", left: "26%" },
  "Biarritz": { top: "78%", left: "24%" },
  // Petites villes ajoutées
  "Saint-Gaudens": { top: "78%", left: "38%" },
  "Saint Marcel Les Valence": { top: "58%", left: "58%" },
  "Le Porge": { top: "60%", left: "26%" },
  "Saint-Jean": { top: "72%", left: "44%" },
  "Quint-Fonsegrives": { top: "72%", left: "44%" },
  "Colomiers": { top: "72%", left: "40%" },
  "Blagnac": { top: "71%", left: "41%" },
  "Muret": { top: "74%", left: "42%" },
  "Balma": { top: "72%", left: "44%" },
  "L'Union": { top: "71%", left: "44%" },
  "Ramonville": { top: "73%", left: "44%" },
  "Castanet-Tolosan": { top: "74%", left: "44%" },
  "Labège": { top: "73%", left: "45%" },
  "Tournefeuille": { top: "72%", left: "40%" },
  "Cugnaux": { top: "73%", left: "41%" },
  "Portet-sur-Garonne": { top: "74%", left: "42%" },
};

// Mapping département → ville principale pour regrouper les praticiens
const DEPARTMENT_TO_CITY: Record<string, string> = {
  "01": "Lyon",           // Ain
  "06": "Nice",           // Alpes-Maritimes
  "13": "Marseille",      // Bouches-du-Rhône
  "26": "Valence",        // Drôme
  "31": "Toulouse",       // Haute-Garonne
  "33": "Bordeaux",       // Gironde
  "34": "Montpellier",    // Hérault
  "35": "Rennes",         // Ille-et-Vilaine
  "38": "Grenoble",       // Isère
  "44": "Nantes",         // Loire-Atlantique
  "59": "Lille",          // Nord
  "64": "Pau",            // Pyrénées-Atlantiques
  "67": "Strasbourg",     // Bas-Rhin
  "69": "Lyon",           // Rhône
  "75": "Paris",          // Paris
  "76": "Rouen",          // Seine-Maritime
  "77": "Paris",          // Seine-et-Marne
  "78": "Paris",          // Yvelines
  "83": "Toulon",         // Var
  "84": "Avignon",        // Vaucluse
  "91": "Paris",          // Essonne
  "92": "Paris",          // Hauts-de-Seine
  "93": "Paris",          // Seine-Saint-Denis
  "94": "Paris",          // Val-de-Marne
  "95": "Paris",          // Val-d'Oise
};

// Liste des villes disponibles (exportée pour l'admin)
export const AVAILABLE_CITIES = Object.keys(CITY_COORDINATES).sort();

// Fonction pour normaliser les noms de villes
function normalizeCity(city: string): string {
  return city.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Trouver les coordonnées d'une ville (case-insensitive)
function findCityCoordinates(city: string): { top: string; left: string } | null {
  const normalized = normalizeCity(city).toLowerCase();
  for (const [key, coords] of Object.entries(CITY_COORDINATES)) {
    if (normalizeCity(key).toLowerCase() === normalized) {
      return coords;
    }
  }
  return null;
}

// Fonction pour extraire le département du format "Ville (XX)" ou du champ department
function extractDepartment(city: string | null, department: string | null): string | null {
  // D'abord essayer le champ department
  if (department) {
    const deptClean = department.trim().replace(/[()]/g, "");
    if (deptClean && DEPARTMENT_TO_CITY[deptClean]) {
      return deptClean;
    }
  }
  // Sinon extraire du city format "Toulouse (31)"
  if (city) {
    const match = city.match(/\((\d{2,3})\)/);
    if (match && DEPARTMENT_TO_CITY[match[1]]) {
      return match[1];
    }
  }
  return null;
}

export default function ReseauSection() {
  const [praticiens, setPraticiens] = useState<Praticien[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPraticiens() {
      const { data } = await supabase
        .from("praticiens")
        .select("*")
        .eq("is_published", true);

      if (data) setPraticiens(data);
      setLoading(false);
    }
    fetchPraticiens();
  }, []);

  // Grouper les praticiens par département (pour regrouper les villes d'un même département)
  const citiesWithPraticiens = useMemo(() => {
    const grouped = new Map<string, { count: number; coords: { top: string; left: string }; displayName: string }>();

    // Debug: log les praticiens reçus
    if (process.env.NODE_ENV === "development" && praticiens.length > 0) {
      console.log("[ReseauSection] Praticiens reçus:", praticiens.map(p => ({
        name: p.name,
        city: p.city,
        department: p.department
      })));
    }

    praticiens.forEach((p) => {
      const dept = extractDepartment(p.city, p.department);
      const cityRaw = p.city?.trim();
      // Nettoyer le nom de ville (enlever le (XX) si présent)
      const city = cityRaw?.replace(/\s*\(\d{2,3}\)\s*$/, "").trim();

      if (dept) {
        // Grouper par département
        const mainCity = DEPARTMENT_TO_CITY[dept];
        const existing = grouped.get(dept);
        if (existing) {
          existing.count += 1;
        } else {
          grouped.set(dept, {
            count: 1,
            coords: CITY_COORDINATES[mainCity],
            displayName: mainCity
          });
        }
      } else if (city) {
        // Pas de département reconnu, essayer la ville directement
        // Vérifier si c'est une ville principale d'un département connu
        const deptForCity = Object.entries(DEPARTMENT_TO_CITY).find(
          ([, mainCity]) => mainCity.toLowerCase() === city.toLowerCase()
        );

        if (deptForCity) {
          // C'est une ville principale (ex: Toulouse) → grouper avec son département
          const [deptCode, mainCity] = deptForCity;
          const existing = grouped.get(deptCode);
          if (existing) {
            existing.count += 1;
          } else {
            grouped.set(deptCode, {
              count: 1,
              coords: CITY_COORDINATES[mainCity],
              displayName: mainCity
            });
          }
        } else {
          // Ville non principale, utiliser son nom comme clé
          const coords = findCityCoordinates(city);
          if (coords) {
            const existing = grouped.get(city);
            if (existing) {
              existing.count += 1;
            } else {
              grouped.set(city, { count: 1, coords, displayName: city });
            }
          } else if (process.env.NODE_ENV === "development") {
            console.log("[ReseauSection] Ville non reconnue:", city, "pour", p.name);
          }
        }
      }
    });

    // Toujours inclure Toulouse (siège) si pas déjà présent
    if (!grouped.has("31") && !grouped.has("Toulouse")) {
      grouped.set("31", { count: 0, coords: CITY_COORDINATES["Toulouse"], displayName: "Toulouse" });
    }

    return Array.from(grouped.entries()).map(([key, data]) => ({
      id: key, // Clé unique (code département ou nom de ville)
      city: data.displayName,
      count: data.count,
      top: data.coords.top,
      left: data.coords.left,
      main: key === "31",
    }));
  }, [praticiens]);

  // Stats dynamiques
  const stats = useMemo(() => {
    const uniqueDepts = new Set(praticiens.map((p) => p.department).filter(Boolean));
    return [
      { value: loading ? "..." : `${praticiens.length}+`, label: "Praticiens formés" },
      { value: loading ? "..." : `${uniqueDepts.size || 8}`, label: "Départements" },
      { value: "100%", label: "Accompagnement" },
    ];
  }, [praticiens, loading]);

  // Utiliser uniquement les villes avec praticiens (pas de fallback)
  const displayCities = citiesWithPraticiens;
  return (
    <SectionWrapper background="creme">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Content */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
          >
            Le réseau MATERIS
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-noir leading-tight mb-6"
          >
            Un réseau français d&apos;ostéopathes {" "}
            <span className="text-dore">formés en santé féminine</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-noir-light leading-relaxed mb-8"
          >
            Materis, c&apos;est des praticiens spécialisés en techniques ostéopathique uro-gynéco... Mais bien plus aussi en partageant avec vous les liens, le subtil et les valeurs.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-6 mb-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-3xl md:text-4xl font-serif text-dore mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-noir-light">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <Button
            href="/reseau-materis"
            variant="outline"
            icon={<ArrowRight size={18} />}
          >
            Découvrir le réseau
          </Button>
        </div>

        {/* Map illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="relative bg-blanc rounded-2xl p-6 md:p-8 shadow-soft">
            {/* France map with dots */}
            <div className="aspect-square relative">
              {/* SVG France outline */}
              <svg
                viewBox="0 0 512 512"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="mapGlow" cx="45%" cy="85%" r="40%">
                    <stop offset="0%" stopColor="#D6A647" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#D6A647" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <path 
                  d="M283.4 19.83c-3.2 0-31.2 5.09-31.2 5.09-1.3 41.61-30.4 78.48-90.3 84.88l-12.8-23.07-25.1 2.48 11.3 60.09-113.79-4.9 12.2 41.5C156.3 225.4 150.7 338.4 124 439.4c47 53 141.8 47.8 186 43.1 3.1-62.2 52.4-64.5 135.9-32.2 11.3-17.6 18.8-36 44.6-50.7l-46.6-139.5-27.5 6.2c11-21.1 32.2-49.9 50.4-63.4l15.6-86.9c-88.6-6.3-146.4-46.36-199-96.17z" 
                  fill="#F5F2EB"
                  stroke="#EDE9E0"
                  strokeWidth="3"
                />
                <path 
                  d="M283.4 19.83c-3.2 0-31.2 5.09-31.2 5.09-1.3 41.61-30.4 78.48-90.3 84.88l-12.8-23.07-25.1 2.48 11.3 60.09-113.79-4.9 12.2 41.5C156.3 225.4 150.7 338.4 124 439.4c47 53 141.8 47.8 186 43.1 3.1-62.2 52.4-64.5 135.9-32.2 11.3-17.6 18.8-36 44.6-50.7l-46.6-139.5-27.5 6.2c11-21.1 32.2-49.9 50.4-63.4l15.6-86.9c-88.6-6.3-146.4-46.36-199-96.17z" 
                  fill="url(#mapGlow)"
                />
              </svg>
              
              {/* City dots */}
              {displayCities.map((loc, i) => (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="absolute group cursor-pointer z-10"
                  style={{ top: loc.top, left: loc.left, transform: "translate(-50%, -50%)" }}
                >
                  {/* Pulse effect for main city */}
                  {loc.main && (
                    <span className="absolute inset-0 w-6 h-6 -m-1 rounded-full bg-dore/30 animate-ping" />
                  )}
                  <div
                    className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                      loc.main
                        ? "bg-dore ring-4 ring-dore/30 scale-125"
                        : "bg-dore/70 hover:bg-dore hover:scale-125"
                    }`}
                  />
                  {/* City label with count */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                      loc.main
                        ? "opacity-100 -bottom-5 text-dore"
                        : "opacity-0 group-hover:opacity-100 -bottom-5 text-noir-light"
                    }`}
                  >
                    {loc.city}{loc.count > 0 && ` (${loc.count})`}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-beige">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-dore ring-2 ring-dore/30" />
                <span className="text-sm text-noir-light">Siège MATERIS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-dore/70" />
                <span className="text-sm text-noir-light">Praticiens formés</span>
              </div>
            </div>
          </div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="absolute -right-2 md:-right-4 top-1/4 bg-blanc p-4 rounded-xl shadow-soft border border-beige"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-dore/10 flex items-center justify-center">
                <Users size={20} className="text-dore" />
              </div>
              <div>
                <p className="font-medium text-noir text-sm">Communauté active</p>
                <p className="text-xs text-noir-light">WhatsApp & lives mensuels</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
