"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Gift, 
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Send,
  BookOpen,
  Hand,
  FileText,
  Video,
  Layers,
  Users,
  GraduationCap,
  ExternalLink
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import type { RessourceCategory, Ressource } from "@/lib/types";
import ressourcesContent from "../../../content/ressources.json";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Hand,
  FileText,
  Video,
};

const faqItems = ressourcesContent.faqItems;

const getIcon = (iconName: string | null) => {
  if (!iconName || !iconMap[iconName]) return BookOpen;
  return iconMap[iconName];
};

export default function RessourcesContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ prenom: "", email: "", telephone: "" });
  const [categories, setCategories] = useState<RessourceCategory[]>([]);
  const [ressources, setRessources] = useState<Ressource[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    async function fetchData() {
      const [catsRes, resRes] = await Promise.all([
        supabase
          .from('ressource_categories')
          .select('*')
          .order('display_order'),
        supabase
          .from('ressources')
          .select('*, category:ressource_categories(*)')
          .eq('is_published', true)
          .order('display_order')
      ]);
      
      if (mounted) {
        if (catsRes.data) setCategories(catsRes.data);
        if (resRes.data) setRessources(resRes.data);
        setLoading(false);
      }
    }
    
    fetchData();
    return () => { mounted = false; };
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci ! Vous recevrez les 3 techniques par email.");
  }, []);

  const filteredRessources = useMemo(() => 
    activeCategory === "all"
      ? ressources
      : ressources.filter(r => r.category?.slug === activeCategory),
    [activeCategory, ressources]
  );

  const categoryCountsMap = useMemo(() => {
    const counts: Record<string, number> = {};
    ressources.forEach(r => {
      if (r.category?.slug) {
        counts[r.category.slug] = (counts[r.category.slug] || 0) + 1;
      }
    });
    return counts;
  }, [ressources]);

  const totalLessons = useMemo(() => 
    ressources.reduce((acc, r) => acc + r.lessons_count, 0),
    [ressources]
  );

  return (
    <>
      {/* Lead Magnet */}
      <SectionWrapper background="clair" immediate>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Gift size={24} className="text-dore" />
              <p className="text-sm font-medium tracking-widest uppercase text-dore">
                {ressourcesContent.leadMagnetLabel}
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-noir mb-6">
              {ressourcesContent.leadMagnetTitle}
            </h2>

            <p className="text-noir-light text-lg mb-6">
              {ressourcesContent.leadMagnetDescription}
            </p>

            <ul className="space-y-3 text-noir-light">
              {ressourcesContent.leadMagnetTechniques.map((technique, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-dore font-serif text-lg">{i + 1}.</span>
                  <span>{technique}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blanc p-8 rounded-2xl shadow-soft">
            <h3 className="text-xl font-serif text-noir mb-6 text-center">
              {ressourcesContent.leadMagnetFormTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-noir mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="prenom"
                  required
                  value={formData.prenom}
                  onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore focus:ring-2 focus:ring-dore/20 outline-none transition-all"
                  placeholder="Votre prénom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-noir mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore focus:ring-2 focus:ring-dore/20 outline-none transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-noir mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="telephone"
                  required
                  value={formData.telephone}
                  onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore focus:ring-2 focus:ring-dore/20 outline-none transition-all"
                  placeholder="06 XX XX XX XX"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-gradient text-blanc py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                <Send size={18} />
                {ressourcesContent.leadMagnetSubmitText}
              </button>
            </form>
          </div>
        </div>
      </SectionWrapper>

      {/* Resource Hub */}
      <SectionWrapper background="creme" immediate>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap size={24} className="text-dore" />
            <p className="text-sm font-medium tracking-widest uppercase text-dore">
              {ressourcesContent.resourceHubLabel}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-noir">
            {ressourcesContent.resourceHubTitle}
          </h2>
          <p className="text-noir-light mt-4 max-w-2xl mx-auto">
            {ressourcesContent.resourceHubSubtitle}
          </p>
        </div>

        {/* Category Tabs */}
        {!loading && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-dore text-blanc shadow-md"
                  : "bg-blanc text-noir-light hover:bg-beige/50"
              }`}
            >
              <Layers size={16} />
              Tout voir
            </button>
            {categories.map((cat) => {
              const IconComponent = getIcon(cat.icon);
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.slug
                      ? "bg-dore text-blanc shadow-md"
                      : "bg-blanc text-noir-light hover:bg-beige/50"
                  }`}
                >
                  <IconComponent size={16} />
                  {cat.name}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.slug ? "bg-blanc/20" : "bg-beige"
                  }`}>
                    {categoryCountsMap[cat.slug] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Resource Cards */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-blanc rounded-2xl p-6 animate-pulse">
                <div className="h-6 w-3/4 bg-beige rounded mb-4" />
                <div className="h-4 w-full bg-beige/60 rounded mb-2" />
                <div className="h-4 w-2/3 bg-beige/60 rounded" />
              </div>
            ))}
          </div>
        ) : filteredRessources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRessources.map((ressource) => {
              const IconComponent = ressource.category ? getIcon(ressource.category.icon) : BookOpen;
              return (
                <div
                  key={ressource.id}
                  className="bg-blanc rounded-2xl p-6 shadow-soft hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dore/20 to-dore/5 flex items-center justify-center flex-shrink-0">
                      <IconComponent size={24} className="text-dore" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg text-noir group-hover:text-dore transition-colors line-clamp-2">
                        {ressource.title}
                      </h3>
                      {ressource.category && (
                        <span className="text-xs text-dore/80 font-medium">
                          {ressource.category.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {ressource.description && (
                    <p className="text-sm text-noir-light mb-4 line-clamp-2">
                      {ressource.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-noir-light border-t border-beige pt-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Layers size={14} className="text-dore" />
                        {ressource.sections_count} section{ressource.sections_count > 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={14} className="text-dore" />
                        {ressource.lessons_count} leçon{ressource.lessons_count > 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={14} className="text-dore" />
                        {ressource.members_count}
                      </span>
                    </div>
                    {ressource.external_url && (
                      <ExternalLink size={14} className="text-dore" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-noir-light">Aucune ressource dans cette catégorie pour le moment.</p>
          </div>
        )}

        {/* Stats */}
        {!loading && (
          <div className="mt-12 pt-8 border-t border-beige flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-serif text-dore">{ressources.length}</p>
              <p className="text-sm text-noir-light">ressources</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-dore">{categories.length}</p>
              <p className="text-sm text-noir-light">catégories</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-dore">{totalLessons}</p>
              <p className="text-sm text-noir-light">leçons au total</p>
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="blanc" immediate>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-dore mb-4">
              {ressourcesContent.faqLabel}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-noir">
              {ressourcesContent.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-clair rounded-xl shadow-soft overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-noir pr-4">{item.question}</span>
                  {openFaq === index ? (
                    <ChevronUp size={20} className="text-dore flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-noir-light flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-noir-light">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper background="clair">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-noir mb-6">
            {ressourcesContent.ctaTitle}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/formations" variant="primary" icon={<ArrowRight size={18} />}>
              Découvrir les formations
            </Button>
            <Button href="/contact" variant="outline">
              Me contacter
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
