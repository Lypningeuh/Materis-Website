"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Play, Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

const videoTestimonials = [
  { id: "e2eaa810", title: "Expérience Transformatrice" },
  { id: "06e9a9ad", title: "Témoignage Formation" },
  { id: "4458d5ea", title: "Retour d'expérience" },
  { id: "f51923f9", title: "Avis praticienne" },
  { id: "e288458a", title: "Mon parcours Materis" },
];

const googleReviews = [
  { author: "Lauriane Jammes", text: "Depuis presque 15ans..... Une personne au top professionnellement parlant et toujours attentionnée", rating: 5 },
  { author: "Lucile Florac", text: "Impossible de savoir ce que mon genou avait : médecins diverses radio irm ... et depuis remise en place! Super", rating: 5 },
  { author: "Huhu Patafix", text: "Ma mère avais un gros problème de santé grâce à Sandrine elle n'a plus rien. Merci", rating: 5 },
  { author: "Sophie Garcia", text: "Super rencontre avec cette professionnelle qui est à la fois humaine et compétente dans son domaine... elle prend le temps de vous écouter ce qui aide pour la suite de la séance. Je vous recommande fortement Sandrine.", rating: 5 },
  { author: "Le Pisciniste", text: "Sandrine et ses collaborateurs sont des magiciens à l'écoute de leurs patients. Ils sont juste au top du top et je les consulte plus que mon généraliste. Je commande et recommande", rating: 5 },
  { author: "Stéphanie", text: "Vu pour mes deux grossesses. Aide a la préparation du bassin et du périné, rassure, enlève les tensions dùes à la grossesse, avec bienveillance et douceur. A sauver ma vie intime apres ma 1ere grossesse ! Je recommande a 100%!", rating: 5 },
  { author: "Alison Payne", text: "Sandrine a l'habitude des nourrissons et ça se voit ! Elle a su soulager les douleurs de notre nouveau-né avec une grande douceur. C'est grâce à elle que j'ai pu continuer l'allaitement !", rating: 5 },
  { author: "Laura", text: "Sandrine est une excellente ostéopathe, humaine, douce et de très bon conseils. Elle m'a suivie durant ma grossesse et m'a beaucoup soulagée. Je recommande vivement !", rating: 5 },
  { author: "Sonia Borull", text: "Sandrine est une ostéopathe exceptionnelle tant au niveau professionnel et qu'humain. J'ai pu beneficier de ses multiples compétences. Ses soins très précieux m'ont beaucoup aidés et soulagés. Je la recommande fortement.", rating: 5 },
  { author: "Marion", text: "Sandrine, Sandrine, Sandrine, Milles merci. Ma magicienne, fée Marabout. J'ai passé une bonne nuit. Je me sens comme la reine des neiges … libérée, délivrée de la cage thoracique et du bassin. Je me sens tellement mieux. Mais qu'est ce que je suis contente de te connaître et d'être accompagnée et chouchoutée par toi pendant cette grossesse.", rating: 5 },
  { author: "Manon", text: "Un grand grand merci. Mon dos va beaucoup mieux, je ressens encore quelques douleurs mais ça n'a pas absolument plus rien à voir. Ça s'est soulagé petit à Petit depuis notre rdv. Merci beaucoup pour ton soin, tes mots et ta présence.", rating: 5 },
];

const topRowReviews = googleReviews.filter((_, i) => i % 2 === 0);
const bottomRowReviews = googleReviews.filter((_, i) => i % 2 === 1);

// Composant pour les étoiles (évite la duplication)
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={14} className="text-dore fill-dore" />
      ))}
    </div>
  );
}

// Composant pour l'auteur (évite la duplication)
function Author({ author }: { author: string }) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="w-8 h-8 rounded-full bg-dore/20 flex items-center justify-center flex-shrink-0">
        <span className="text-dore text-sm font-medium">{author.charAt(0)}</span>
      </div>
      <div>
        <p className="text-blanc text-sm font-medium">{author}</p>
        <p className="text-blanc/40 text-xs">Avis Google</p>
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  containerRef
}: {
  review: typeof googleReviews[0];
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ left: number; top: number; width: number } | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pour éviter les erreurs SSR avec createPortal
  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Fermer l'overlay au scroll
  useEffect(() => {
    if (!isHovered) return;

    const handleScroll = () => {
      setIsHovered(false);
      setPosition(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHovered]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (cardRef.current && containerRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Zone morte de 150px près des bords - pas d'overlay
      const EDGE_MARGIN = 150;
      if (rect.left < containerRect.left + EDGE_MARGIN ||
          rect.right > containerRect.right - EDGE_MARGIN) {
        return;
      }

      setPosition({ left: rect.left, top: rect.top, width: rect.width });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setPosition(null);
    }, 150);
  };

  const handleOverlayMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleOverlayMouseLeave = () => {
    setIsHovered(false);
    setPosition(null);
  };

  // L'overlay est rendu via Portal dans document.body pour échapper au transform du marquee
  // z-index 50 pour passer sous les dégradés (qui seront à z-index 100)
  const overlay = isHovered && position && isMounted ? createPortal(
    <div
      className="rounded-2xl border border-dore/50 bg-noir shadow-2xl animate-card-appear"
      style={{
        position: "fixed",
        left: position.left,
        top: position.top,
        width: position.width,
        minHeight: 180,
        zIndex: 50,
      }}
      onMouseEnter={handleOverlayMouseEnter}
      onMouseLeave={handleOverlayMouseLeave}
    >
      <div className="p-5">
        <Stars rating={review.rating} />
        <p className="text-blanc/85 text-sm leading-relaxed">
          &ldquo;{review.text}&rdquo;
        </p>
        <Author author={review.author} />
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div
        ref={cardRef}
        className="relative w-[320px] md:w-[380px] flex-shrink-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Carte de base - hauteur fixe, texte tronqué */}
        <div className="h-[180px] p-5 rounded-2xl border border-blanc/10 bg-noir">
          <Stars rating={review.rating} />
          <p className="text-blanc/85 text-sm leading-relaxed line-clamp-3">
            &ldquo;{review.text}&rdquo;
          </p>
          <Author author={review.author} />
        </div>
      </div>
      {overlay}
    </>
  );
}

function MarqueeRow({
  reviews,
  direction,
  isPaused,
  containerRef
}: {
  reviews: typeof googleReviews;
  direction: "left" | "right";
  isPaused: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Duplication 2x pour boucle parfaite avec -50%
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div
      className="flex gap-4"
      style={{
        animation: `marquee-${direction} 40s linear infinite`,
        animationPlayState: isPaused ? "paused" : "running",
      }}
    >
      {duplicatedReviews.map((review, index) => (
        <ReviewCard
          key={`${review.author}-${index}`}
          review={review}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}

export default function TemoignagesSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set([0, 1, 2]));
  const [topRowPaused, setTopRowPaused] = useState(false);
  const [bottomRowPaused, setBottomRowPaused] = useState(false);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  // Preload adjacent videos when index changes
  useEffect(() => {
    const toLoad = new Set(loadedVideos);
    // Current visible videos
    for (let i = 0; i < 3; i++) {
      toLoad.add((currentVideoIndex + i) % videoTestimonials.length);
    }
    // Preload next video
    toLoad.add((currentVideoIndex + 3) % videoTestimonials.length);
    // Preload previous video
    toLoad.add((currentVideoIndex - 1 + videoTestimonials.length) % videoTestimonials.length);

    setLoadedVideos(toLoad);
  }, [currentVideoIndex]);

  const getVisibleIndices = () => {
    return [0, 1, 2].map(i => (currentVideoIndex + i) % videoTestimonials.length);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoTestimonials.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length);
  };

  const visibleIndices = getVisibleIndices();

  return (
    <SectionWrapper background="noir" className="overflow-hidden">
      <style jsx global>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes card-appear {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-card-appear {
          animation: card-appear 0.25s ease-in-out forwards;
        }
      `}</style>

      <SectionHeader
        eyebrow="Témoignages"
        title="Ce qu'ils disent de Sandrine"
        subtitle="Découvrez les retours authentiques des patients et praticiens formés."
        light
      />

      {/* Video testimonials */}
      <div className="mb-16">
        <h3 className="text-xl font-serif text-blanc flex items-center justify-center gap-2 mb-8">
          <Play size={20} className="text-dore" />
          Témoignages vidéo
        </h3>

        <div className="flex items-center justify-center gap-4 md:gap-6">
          <button
            onClick={prevVideo}
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-blanc/20 flex items-center justify-center text-blanc/60 hover:text-blanc hover:border-dore hover:bg-dore/10 transition-all"
            aria-label="Vidéo précédente"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Video container with all videos preloaded */}
          <div className="flex gap-4 md:gap-6">
            {videoTestimonials.map((video, index) => {
              const isVisible = visibleIndices.includes(index);
              const isLoaded = loadedVideos.has(index);
              const pos = visibleIndices.indexOf(index);

              return (
                <div
                  key={video.id}
                  className="w-[240px] md:w-[280px] flex-shrink-0 transition-all duration-500 ease-out"
                  style={{
                    display: isVisible ? "block" : "none",
                    order: pos,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0.9)",
                  }}
                >
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg">
                    {isLoaded && (
                      <iframe
                        src={`https://my.onetake.ai/558e05a7/${video.id}/index.html`}
                        loading="lazy"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen"
                        allowFullScreen
                        title={video.title}
                        className="absolute inset-0 w-full h-full border-0"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={nextVideo}
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-blanc/20 flex items-center justify-center text-blanc/60 hover:text-blanc hover:border-dore hover:bg-dore/10 transition-all"
            aria-label="Vidéo suivante"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {videoTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentVideoIndex
                  ? "w-6 bg-dore"
                  : "bg-blanc/30 hover:bg-blanc/50"
              }`}
              aria-label={`Aller à la vidéo ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Written Reviews */}
      <div>
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-dore fill-dore" />
            ))}
          </div>
          <span className="text-blanc/60 text-sm">Témoignages écrits</span>
        </div>

        {/* Container avec overflow-hidden pour clipper les cartes */}
        <div ref={reviewsContainerRef} className="relative overflow-hidden">
          {/* Dégradés - z-10 suffit car la zone morte (150px) empêche les overlays près des bords (128px) */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-noir to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-noir to-transparent z-10" />

          {/* Top row */}
          <div
            className="mb-4"
            onMouseEnter={() => setTopRowPaused(true)}
            onMouseLeave={() => setTopRowPaused(false)}
          >
            <MarqueeRow reviews={topRowReviews} direction="left" isPaused={topRowPaused} containerRef={reviewsContainerRef} />
          </div>

          {/* Bottom row */}
          <div
            onMouseEnter={() => setBottomRowPaused(true)}
            onMouseLeave={() => setBottomRowPaused(false)}
          >
            <MarqueeRow reviews={bottomRowReviews} direction="right" isPaused={bottomRowPaused} containerRef={reviewsContainerRef} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
