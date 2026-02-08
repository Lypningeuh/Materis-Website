"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Play, Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import temoignagesContent from "../../../content/temoignages.json";

const content = temoignagesContent;

const topRowReviews = content.googleReviews.filter((_, i) => i % 2 === 0);
const bottomRowReviews = content.googleReviews.filter((_, i) => i % 2 === 1);

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
  review: typeof content.googleReviews[0];
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ left: number; top: number; width: number } | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
  reviews: typeof content.googleReviews;
  direction: "left" | "right";
  isPaused: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
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

  useEffect(() => {
    const toLoad = new Set(loadedVideos);
    for (let i = 0; i < 3; i++) {
      toLoad.add((currentVideoIndex + i) % content.videoTestimonials.length);
    }
    toLoad.add((currentVideoIndex + 3) % content.videoTestimonials.length);
    toLoad.add((currentVideoIndex - 1 + content.videoTestimonials.length) % content.videoTestimonials.length);

    setLoadedVideos(toLoad);
  }, [currentVideoIndex]);

  const getVisibleIndices = () => {
    return [0, 1, 2].map(i => (currentVideoIndex + i) % content.videoTestimonials.length);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % content.videoTestimonials.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + content.videoTestimonials.length) % content.videoTestimonials.length);
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
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
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

          <div className="flex gap-4 md:gap-6">
            {content.videoTestimonials.map((video, index) => {
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
          {content.videoTestimonials.map((_, index) => (
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

        <div ref={reviewsContainerRef} className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-noir to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-noir to-transparent z-10" />

          <div
            className="mb-4"
            onMouseEnter={() => setTopRowPaused(true)}
            onMouseLeave={() => setTopRowPaused(false)}
          >
            <MarqueeRow reviews={topRowReviews} direction="left" isPaused={topRowPaused} containerRef={reviewsContainerRef} />
          </div>

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
