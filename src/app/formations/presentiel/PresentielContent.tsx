"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Calendar, 
  Clock, 
  Euro,
  Users,
  Target,
  Check,
  Phone,
  Mail,
  Download,
  MapPin,
  Loader2
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import type { Session } from "@/lib/types";

const objectifs = [
  "Comprendre les tableaux cliniques de l'endométriose et diagnostics différentiels",
  "Savoir accueillir et orienter en complément du suivi médical",
  "Acquérir des tests et techniques sécuritaires en ostéo gynéco",
  "Développer le ressenti et la posture clinique",
];

const intervenants = [
  { name: "Sandrine", role: "Ostéopathe formatrice, 25+ ans d'expérience" },
  { name: "Yannig", role: "Sage-femme, ostéopathe" },
  { name: "Chirurgien", role: "Spécialisé en endométriose (invité)" },
  { name: "Médecin", role: "Intervenant invité" },
];

export default function PresentielContent() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    async function fetchSessions() {
      const { data } = await supabase
        .from('sessions')
        .select('*')
        .eq('is_published', true)
        .order('date_start');
      
      if (mounted) {
        if (data) setSessions(data);
        setLoading(false);
      }
    }
    
    fetchSessions();
    return () => { mounted = false; };
  }, []);

  const formatDate = useCallback((dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, []);

  return (
    <>
      {/* Sessions */}
      <SectionWrapper background="clair" immediate>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest uppercase text-dore mb-4">
            Sessions disponibles
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-noir">
            Prochaines formations
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="text-dore animate-spin" />
          </div>
        ) : sessions.length > 0 ? (
          <div className="space-y-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-blanc p-6 md:p-8 rounded-2xl shadow-soft"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-dore/10 flex items-center justify-center flex-shrink-0">
                      <Calendar size={24} className="text-dore" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-noir mb-2">{session.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-noir-light">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {formatDate(session.date_start)}
                          {session.date_end && session.date_end !== session.date_start && (
                            <> - {formatDate(session.date_end)}</>
                          )}
                        </span>
                        {session.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {session.location}
                          </span>
                        )}
                        {session.instructor && (
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {session.instructor}
                          </span>
                        )}
                      </div>
                      {session.description && (
                        <p className="text-sm text-noir-light mt-2">{session.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 lg:flex-col lg:items-end">
                    {session.price && (
                      <span className="text-2xl font-serif text-dore">{session.price}€</span>
                    )}
                    {session.places_remaining !== null && session.places_total !== null && (
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        session.places_remaining === 0 
                          ? 'bg-red-100 text-red-600' 
                          : session.places_remaining <= 3 
                            ? 'bg-orange-100 text-orange-600'
                            : 'bg-green-100 text-green-600'
                      }`}>
                        {session.places_remaining === 0 
                          ? 'Complet' 
                          : `${session.places_remaining}/${session.places_total} places`
                        }
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-blanc rounded-2xl">
            <Calendar size={48} className="mx-auto text-beige mb-4" />
            <p className="text-noir-light">Aucune session programmée pour le moment.</p>
            <p className="text-sm text-noir-light mt-2">Contactez-nous pour connaître les prochaines dates.</p>
          </div>
        )}
      </SectionWrapper>

      {/* Tarifs */}
      <SectionWrapper background="creme" immediate>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-dore mb-4">
              Tarification
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-noir">
              Grille tarifaire
            </h2>
          </div>

          <div className="bg-blanc rounded-2xl shadow-soft overflow-hidden">
            <table className="w-full">
              <thead className="bg-noir text-blanc">
                <tr>
                  <th className="p-4 text-left font-medium">Formule</th>
                  <th className="p-4 text-center font-medium">Session 8h</th>
                  <th className="p-4 text-center font-medium">Session 10h30</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-beige">
                  <td className="p-4 text-noir">À l&apos;unité</td>
                  <td className="p-4 text-center text-noir-light">230€</td>
                  <td className="p-4 text-center text-noir-light">280€</td>
                </tr>
                <tr className="border-b border-beige bg-creme/30">
                  <td className="p-4 text-noir">2 sessions et +</td>
                  <td className="p-4 text-center text-dore font-medium">220€</td>
                  <td className="p-4 text-center text-dore font-medium">270€</td>
                </tr>
                <tr className="bg-dore/10">
                  <td className="p-4 text-noir font-medium">Pack 5 sessions</td>
                  <td className="p-4 text-center text-dore font-medium">200€</td>
                  <td className="p-4 text-center text-dore font-medium">250€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-blanc p-6 rounded-xl shadow-soft text-center">
              <Euro size={24} className="mx-auto mb-3 text-dore" />
              <p className="text-2xl font-serif text-dore mb-2">1 100€</p>
              <p className="text-noir-light text-sm">Total pack complet (5 sessions)</p>
            </div>
            <div className="bg-blanc p-6 rounded-xl shadow-soft text-center">
              <Calendar size={24} className="mx-auto mb-3 text-dore" />
              <p className="text-2xl font-serif text-noir mb-2">20%</p>
              <p className="text-noir-light text-sm">Acompte à la réservation</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Objectifs & Intervenants */}
      <SectionWrapper background="blanc">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Objectifs */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Target size={24} className="text-dore" />
              <h3 className="text-2xl font-serif text-noir">Objectifs pédagogiques</h3>
            </div>
            <ul className="space-y-4">
              {objectifs.map((objectif, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check size={20} className="text-dore flex-shrink-0 mt-0.5" />
                  <span className="text-noir-light">{objectif}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Intervenants */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Users size={24} className="text-dore" />
              <h3 className="text-2xl font-serif text-noir">Intervenants</h3>
            </div>
            <div className="space-y-4">
              {intervenants.map((intervenant) => (
                <div key={intervenant.name} className="p-4 bg-creme rounded-lg">
                  <p className="font-medium text-noir">{intervenant.name}</p>
                  <p className="text-sm text-noir-light">{intervenant.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Public visé */}
      <SectionWrapper background="clair">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-dore mb-4">
            Public visé
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-noir mb-8">
            Pour qui ?
          </h2>
          <p className="text-noir-light mb-8">
            Ostéopathes, sages-femmes, kinésithérapeutes impliqués en santé féminine.
          </p>
          <div className="bg-dore/10 p-6 rounded-xl inline-block">
            <p className="text-noir">
              <strong>Pré-requis :</strong> Diplôme et assurance professionnelle en règle
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Contact & Inscription */}
      <SectionWrapper background="creme">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-noir mb-8">
            Contact & inscriptions
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <a
              href="mailto:sandrine.mosse@materis.fr"
              className="flex items-center justify-center gap-3 p-6 bg-blanc rounded-xl shadow-soft hover:shadow-lg transition-shadow"
            >
              <Mail size={20} className="text-dore" />
              <span className="text-noir">sandrine.mosse@materis.fr</span>
            </a>
            <a
              href="tel:+33631702848"
              className="flex items-center justify-center gap-3 p-6 bg-blanc rounded-xl shadow-soft hover:shadow-lg transition-shadow"
            >
              <Phone size={20} className="text-dore" />
              <span className="text-noir">06 31 70 28 48</span>
            </a>
          </div>

          <Button href="#" variant="outline" icon={<Download size={18} />}>
            Télécharger le programme PDF
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
