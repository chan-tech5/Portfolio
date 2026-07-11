'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, X, Users, ExternalLink } from 'lucide-react';

interface ActivityUpdate {
  id: string;
  date: string;
  category: string;
  content: string;
  images?: string[];
  linkedinUrl?: string;
  taggedPeople?: string[];
  status?: string;
  scheduledAt?: string;
}

interface ActivityFeedProps {
  updates: ActivityUpdate[];
}

/** Returns true if a post should be shown publicly */
const isVisible = (item: { status?: string; scheduledAt?: string }) => {
  const s = item.status || 'published';
  if (s === 'draft') return false;
  if (s === 'published') return true;
  if (s === 'scheduled' && item.scheduledAt) {
    return new Date(item.scheduledAt) <= new Date();
  }
  return true;
};

/** Image carousel component */
function ImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!images || images.length === 0) return null;

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); };

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden mt-3 group/carousel">
        <img
          src={images[idx]}
          alt=""
          className="w-full h-44 object-cover cursor-zoom-in transition-transform duration-500 group-hover/carousel:scale-105"
          onClick={() => setLightbox(true)}
        />
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer">
              <ChevronLeft size={14} />
            </button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer">
              <ChevronRight size={14} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }} className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${i === idx ? 'bg-white scale-125' : 'bg-white/40'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <LightboxModal 
            images={images} 
            currentIdx={idx} 
            onClose={() => setLightbox(false)} 
            onChangeIdx={setIdx} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

/** Lightbox modal with Escape key support */
function LightboxModal({ images, currentIdx, onClose, onChangeIdx }: { 
  images: string[]; 
  currentIdx: number; 
  onClose: () => void;
  onChangeIdx: (idx: number) => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Image lightbox">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-zoom-out"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative z-10 max-w-3xl w-full"
      >
        <img loading="lazy" src={images[currentIdx]} alt="" className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button key={i} onClick={() => onChangeIdx(i)} className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === currentIdx ? 'bg-white scale-125' : 'bg-white/30'}`} />
            ))}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition-colors"
          aria-label="Close lightbox"
        >
          <X size={14} />
        </button>
      </motion.div>
    </div>
  );
}

export default function ActivityFeed({ updates }: ActivityFeedProps) {
  const visibleUpdates = updates.filter(isVisible);

  const getCategoryColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('cert')) return 'text-purple-400 bg-purple-950/30 border-purple-800/30';
    if (cat.includes('csi') || cat.includes('event')) return 'text-blue-400 bg-blue-950/30 border-blue-800/30';
    if (cat.includes('intern') || cat.includes('work')) return 'text-emerald-400 bg-emerald-950/30 border-emerald-800/30';
    if (cat.includes('award') || cat.includes('hack')) return 'text-pink-400 bg-pink-950/30 border-pink-800/30';
    if (cat.includes('project')) return 'text-cyan-400 bg-cyan-950/30 border-cyan-800/30';
    return 'text-zinc-400 bg-zinc-900 border-zinc-800';
  };

  return (
    <section id="updates" className="py-24 px-4 relative">
      <div className="container max-w-5xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-500">
            Activity
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Latest Updates
          </p>
        </div>

        {/* Full-width Updates Feed */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <h3 className="font-extrabold text-white text-lg">Live updates feed</h3>
          </div>

          <div className="glass p-6 rounded-3xl border-white/5 bg-black/40 relative overflow-hidden space-y-6 max-h-[700px] overflow-y-auto pr-2">
            {visibleUpdates.length === 0 ? (
              <p className="text-zinc-500 text-sm">No updates posted yet. Use /workspace to add milestones.</p>
            ) : (
              <div className="relative border-l border-zinc-800 pl-4 ml-2 space-y-8">
                {visibleUpdates.map((update, idx) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Live bullet pin */}
                    <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border border-zinc-800 bg-black flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                    </span>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-zinc-500 font-semibold flex items-center gap-1">
                          <Calendar size={10} /> {update.date}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getCategoryColor(update.category)}`}>
                          {update.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                        {update.content}
                      </p>

                      {/* Image carousel */}
                      {(update.images || []).length > 0 && (
                        <ImageCarousel images={update.images!} />
                      )}

                      {/* Footer: tags + linkedin */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {(update.taggedPeople || []).length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap">
                            <Users size={9} className="text-zinc-600" />
                            {(update.taggedPeople || []).map((person, pi) => (
                              <span key={pi} className="text-[9px] font-semibold text-blue-400/70 bg-blue-950/20 px-1.5 py-0.5 rounded-md">
                                {person.startsWith('@') ? person : `@${person}`}
                              </span>
                            ))}
                          </div>
                        )}
                        {update.linkedinUrl && (
                          <a
                            href={update.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto flex items-center gap-1 text-[9px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <ExternalLink size={9} /> View on LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
