"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  MapPin, 
  Users,
  Shield,
  Check,
  MessageCircle,
  ArrowRight,
  Award,
  Phone,
  Mail,
  Globe,
  Loader2
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { useSiteSettings } from "@/lib/useSiteSettings";
import type { Praticien } from "@/lib/types";

const charteItems = [
  "Respect du cadre médical",
  "Formation continue",
  "Éthique et consentement",
  "Complémentarité avec le parcours de soins",
  "Orientation vers spécialistes quand nécessaire",
];

export default function ReseauContent() {
  const { settings } = useSiteSettings();
  const whatsappLink = settings.whatsapp_link;

  const [praticiens, setPraticiens] = useState<Praticien[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    async function fetchPraticiens() {
      const { data } = await supabase
        .from('praticiens')
        .select('*')
        .eq('is_published', true)
        .order('name');
      
      if (mounted) {
        if (data) setPraticiens(data);
        setLoading(false);
      }
    }
    
    fetchPraticiens();
    return () => { mounted = false; };
  }, []);

  const uniqueDepartments = useMemo(() => 
    new Set(praticiens.map(p => p.department).filter(Boolean)),
    [praticiens]
  );

  const stats = useMemo(() => [
    { value: loading ? "..." : `${praticiens.length}+`, label: "Praticiens formés" },
    { value: loading ? "..." : uniqueDepartments.size.toString(), label: "Départements couverts" },
    { value: "100%", label: "Accompagnement" },
  ], [loading, praticiens.length, uniqueDepartments.size]);

  return (
    <>
      {/* Présentation */}
      <SectionWrapper background="clair" immediate>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-noir-light leading-relaxed">
            Materis, c&apos;est aussi une <strong>communauté de praticiens formés</strong> à 
            une approche spécifique d&apos;ostéo gynéco. Notre ambition : créer <strong>LE réseau 
            français d&apos;ostéopathes gynéco</strong>, formés à une même méthode, partageant les mêmes valeurs.
          </p>
        </div>
      </SectionWrapper>

      {/* Stats */}
      <SectionWrapper background="creme" immediate>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-5xl md:text-6xl font-serif text-dore mb-2">{stat.value}</p>
              <p className="text-noir-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Liste des praticiens */}
      <SectionWrapper background="blanc">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users size={24} className="text-dore" />
            <p className="text-sm font-medium tracking-widest uppercase text-dore">
              Nos praticiens
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-noir">
            Trouver un praticien MATERIS
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="text-dore animate-spin" />
          </div>
        ) : praticiens.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {praticiens.map((praticien) => (
              <div
                key={praticien.id}
                className="bg-clair p-5 rounded-xl hover:shadow-soft transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-noir mb-1">{praticien.name}</h3>
                    <p className="text-sm text-dore">{praticien.specialty}</p>
                  </div>
                  {praticien.formation_year && (
                    <span className="text-xs text-noir-light bg-beige px-2 py-1 rounded">
                      {praticien.formation_year}
                    </span>
                  )}
                </div>
                
                {(praticien.city || praticien.department) && (
                  <p className="text-sm text-noir-light flex items-center gap-1 mb-3">
                    <MapPin size={14} />
                    {praticien.city}{praticien.department && ` (${praticien.department})`}
                  </p>
                )}

                <div className="flex items-center gap-3 pt-3 border-t border-beige">
                  {praticien.phone && (
                    <a
                      href={`tel:${praticien.phone}`}
                      className="text-noir-light hover:text-dore transition-colors"
                      title="Téléphone"
                    >
                      <Phone size={16} />
                    </a>
                  )}
                  {praticien.email && (
                    <a
                      href={`mailto:${praticien.email}`}
                      className="text-noir-light hover:text-dore transition-colors"
                      title="Email"
                    >
                      <Mail size={16} />
                    </a>
                  )}
                  {praticien.website && (
                    <a
                      href={praticien.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-noir-light hover:text-dore transition-colors"
                      title="Site web"
                    >
                      <Globe size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-noir-light">Aucun praticien pour le moment.</p>
          </div>
        )}
      </SectionWrapper>

      {/* Charte */}
      <SectionWrapper background="clair">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield size={24} className="text-dore" />
              <p className="text-sm font-medium tracking-widest uppercase text-dore">
                Engagement qualité
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-noir mb-6">
              La Charte MATERIS
            </h2>

            <p className="text-noir-light mb-8">
              Chaque praticien du réseau MATERIS s&apos;engage à respecter une charte 
              de qualité et d&apos;éthique commune.
            </p>

            <ul className="space-y-4">
              {charteItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check size={20} className="text-dore flex-shrink-0" />
                  <span className="text-noir-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-creme p-8 rounded-2xl">
            <Award size={40} className="text-dore mb-6" />
            <h3 className="text-xl font-serif text-noir mb-4">
              Certification MATERIS
            </h3>
            <p className="text-noir-light">
              Tous nos praticiens ont suivi une formation complète et validé 
              les compétences nécessaires pour intégrer le réseau. Ils bénéficient 
              d&apos;un accompagnement continu et participent aux formations continues.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Comment rejoindre */}
      <SectionWrapper background="creme">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-noir">
              Comment rejoindre le réseau ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blanc p-8 rounded-2xl shadow-soft text-center">
              <h3 className="text-xl font-serif text-noir mb-4">
                Je veux me former
              </h3>
              <p className="text-noir-light mb-6">
                Découvrez nos formations pour développer vos compétences en 
                ostéopathie gynécologique et rejoindre le réseau.
              </p>
              <Button href="/formations" variant="primary" icon={<ArrowRight size={18} />}>
                Voir les formations
              </Button>
            </div>

            <div className="bg-blanc p-8 rounded-2xl shadow-soft text-center">
              <h3 className="text-xl font-serif text-noir mb-4">
                Je suis déjà formé(e)
              </h3>
              <p className="text-noir-light mb-6">
                Vous avez déjà suivi une formation MATERIS ? Demandez votre 
                accès au réseau et à la communauté.
              </p>
              <Button href="/contact" variant="outline">
                Demander l&apos;accès
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Communauté WhatsApp */}
      <SectionWrapper background="blanc">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-creme p-8 md:p-12 rounded-2xl">
            <MessageCircle size={40} className="mx-auto text-dore mb-6" />
            <h2 className="text-2xl md:text-3xl font-serif text-noir mb-4">
              Rejoignez la communauté WhatsApp
            </h2>
            <p className="text-noir-light mb-8">
              Un groupe privé réservé aux praticiens formés MATERIS pour échanger, 
              poser vos questions et partager vos cas cliniques.
            </p>
            <Button
              href={whatsappLink}
              external
              variant="primary"
              icon={<MessageCircle size={18} />}
            >
              Accès réservé aux membres
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
