'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ExternalLink, ChevronLeft, ChevronRight, Sparkles, Eye } from 'lucide-react';
import { Linkedin } from '@/components/ui/BrandIcons';

interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  rank: string;
  description: string;
  badgeImage?: string;
  achievementPhoto?: string;
  certificateUpload?: string;
  galleryUpload?: string[];
  linkedinLink?: string;
  type: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  if (dateStr.includes('-')) {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  }
  return dateStr;
};

export default function Achievements({ achievements }: AchievementsProps) {
  const [selectedAch, setSelectedAch] = useState<Achievement | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedProof, setSelectedProof] = useState<{ title: string; proof: string } | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  // Escape key handler for modals
  const handleClose = useCallback(() => {
    if (selectedProof) {
      setSelectedProof(null);
    } else if (selectedAch) {
      setSelectedAch(null);
    }
  }, [selectedProof, selectedAch]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleClose]);

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Combine achievementPhoto and galleryUpload for the slideshow
  const getGalleryImages = (ach: Achievement) => {
    const list: string[] = [];
    if (ach.achievementPhoto) {
      list.push(ach.achievementPhoto);
    }
    if (ach.galleryUpload && ach.galleryUpload.length > 0) {
      list.push(...ach.galleryUpload);
    }
    return list;
  };

  const handleNextSlide = (max: number) => {
    setCarouselIndex((prev) => (prev + 1) % max);
  };

  const handlePrevSlide = (max: number) => {
    setCarouselIndex((prev) => (prev - 1 + max) % max);
  };

  return (
    <section id="achievements" className="py-24 px-4 bg-black relative">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-5xl mx-auto space-y-16">
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-500 flex items-center justify-center md:justify-start gap-1.5">
            <Sparkles size={12} className="text-blue-500" /> Milestones
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Achievements & Collectibles
          </p>
          <p className="text-zinc-500 text-xs max-w-md">
            Click on any badge token to inspect verification certificates, event galleries, and official milestones.
          </p>
        </div>

        {/* 3D Showcase Wall */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {achievements.map((ach, index) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`badge-3d w-full h-[230px] ${flippedCards.has(ach.id) ? 'flipped' : ''}`}
              tabIndex={0}
              role="button"
              aria-label={`${ach.title} - ${ach.organization}. Click to flip or press Enter for details.`}
              onClick={() => toggleFlip(ach.id)}
              onDoubleClick={() => {
                setSelectedAch(ach);
                setCarouselIndex(0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSelectedAch(ach);
                  setCarouselIndex(0);
                } else if (e.key === ' ') {
                  e.preventDefault();
                  toggleFlip(ach.id);
                }
              }}
            >
              <div className="badge-3d-inner w-full h-full relative cursor-pointer">
                {/* Front Face */}
                <div className="badge-front absolute inset-0 glass rounded-3xl p-6 flex flex-col items-center justify-center text-center border-white/5 shadow-lg shadow-black/50">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-center overflow-hidden mb-4 shadow-inner">
                    {ach.badgeImage ? (
                      <img loading="lazy" src={ach.badgeImage} alt={ach.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">🏆</span>
                    )}
                  </div>
                  <h3 className="text-sm font-black text-white line-clamp-1">{ach.title}</h3>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mt-1.5">
                    {ach.organization}
                  </p>
                  <span className="text-[8px] text-zinc-500 mt-5 uppercase tracking-widest font-bold">
                    Click to Flip · Enter for Details
                  </span>
                </div>

                {/* Back Face */}
                <div className="badge-back absolute inset-0 bg-zinc-950 border border-blue-500/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                    <Award size={18} />
                  </div>
                  <h4 className="text-xs font-black text-white">{ach.rank || ach.title}</h4>
                  <p className="text-[10px] text-zinc-400 mt-2 line-clamp-3">
                    {ach.description}
                  </p>
                  <span className="text-[8px] text-blue-400 font-extrabold uppercase tracking-widest mt-4">
                    Click to Open Full View
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details Dialog Modal */}
      <AnimatePresence>
        {selectedAch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Achievement details: ${selectedAch.title}`}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAch(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[85vh]"
            >
              {/* Left Column: Image/Slideshow */}
              {getGalleryImages(selectedAch).length > 0 ? (
                <div className="md:w-1/2 relative bg-zinc-900 border-r border-white/5 flex items-center justify-center aspect-video md:aspect-auto h-48 md:h-auto overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={carouselIndex}
                      src={getGalleryImages(selectedAch)[carouselIndex]}
                      alt="Gallery slide"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {getGalleryImages(selectedAch).length > 1 && (
                    <>
                      {/* Nav Controls */}
                      <button
                        onClick={() => handlePrevSlide(getGalleryImages(selectedAch).length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() => handleNextSlide(getGalleryImages(selectedAch).length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronRight size={16} />
                      </button>
                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 bg-black/40 px-2 py-1 rounded-full border border-white/5">
                        {getGalleryImages(selectedAch).map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              idx === carouselIndex ? 'bg-blue-400 w-3' : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="md:w-1/2 bg-zinc-900/60 border-r border-white/5 flex flex-col items-center justify-center p-8 text-center aspect-video md:aspect-auto">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-4xl mb-4">
                    {selectedAch.badgeImage ? (
                      <img loading="lazy" src={selectedAch.badgeImage} className="w-full h-full object-cover" />
                    ) : (
                      <span>🏆</span>
                    )}
                  </div>
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                    {selectedAch.type} Milestone
                  </span>
                </div>
              )}

              {/* Right Column: Information & CTAs */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-none">
                <div className="space-y-6">
                  {/* Top Close Button */}
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      {selectedAch.type}
                    </span>
                    <button
                      onClick={() => setSelectedAch(null)}
                      className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-white leading-tight">
                      {selectedAch.title}
                    </h3>
                    <p className="text-zinc-400 text-xs font-bold">
                      {selectedAch.organization}
                    </p>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px]">
                      <Calendar size={11} />
                      <span>{formatDate(selectedAch.date)}</span>
                      {selectedAch.rank && (
                        <>
                          <span>•</span>
                          <span className="text-blue-400 font-bold">{selectedAch.rank}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 border-t border-zinc-900 pt-4">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-black block">Milestone details</span>
                    <p className="text-zinc-350 text-xs leading-relaxed">
                      {selectedAch.description}
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 pt-4 border-t border-zinc-900 flex flex-col gap-2">
                  {selectedAch.certificateUpload && (
                    <button
                      onClick={() => setSelectedProof({ title: selectedAch.title, proof: selectedAch.certificateUpload! })}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-white font-bold text-xs rounded-xl border border-blue-500/20 hover:border-blue-500/30 transition-all cursor-pointer"
                    >
                      <Eye size={14} /> View Certificate Proof
                    </button>
                  )}
                  <div className="flex gap-2">
                    {selectedAch.linkedinLink && (
                      <a
                        href={selectedAch.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] hover:text-[#00a0dc] font-bold text-[10px] sm:text-xs rounded-xl border border-[#0077b5]/20 hover:border-[#0077b5]/30 transition-all cursor-pointer"
                      >
                        <Linkedin size={12} /> Share / View Post
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedAch(null)}
                      className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 text-[10px] sm:text-xs text-zinc-400 hover:text-white font-bold rounded-xl cursor-pointer"
                    >
                      Dismiss View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Embedded Certificate Proof Modal */}
      <AnimatePresence>
        {selectedProof && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Certificate proof viewer">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProof(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
            />
            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl h-[80vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md">
                <h3 className="font-extrabold text-white text-xs sm:text-sm line-clamp-1">
                  {selectedProof.title} - Certificate Proof
                </h3>
                <button
                  onClick={() => setSelectedProof(null)}
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  Close Proof
                </button>
              </div>
              {/* Preview body */}
              <div className="flex-1 bg-zinc-900 overflow-auto flex items-center justify-center p-4">
                {selectedProof.proof.startsWith('data:application/pdf') ? (
                  <object
                    data={selectedProof.proof}
                    type="application/pdf"
                    className="w-full h-full rounded-xl"
                  >
                    <div className="text-center p-6 space-y-3">
                      <p className="text-zinc-400 text-xs">Your browser doesn't support embedding PDFs directly.</p>
                      <a
                        href={selectedProof.proof}
                        download={`${selectedProof.title.replace(/\s+/g, '_')}_Certificate.pdf`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
                      >
                        Download PDF
                      </a>
                    </div>
                  </object>
                ) : (
                  <img
                    src={selectedProof.proof}
                    alt={selectedProof.title}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-lg border border-white/5"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
