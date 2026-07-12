'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Star, Calendar, Grid3X3, Clock, Tag } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  featured?: boolean;
  tags: string[];
}

interface MediaVaultProps {
  media: MediaItem[];
}

const CATEGORIES = ['All', 'CSI Event', 'Hackathon', 'Internship', 'Project', 'Certificate', 'Workshop', 'Stage', 'Campus', 'Award', 'Personal'];

const CATEGORY_COLORS: Record<string, string> = {
  'CSI Event':    'text-blue-400 bg-blue-950/40 border-blue-800/40',
  'Hackathon':    'text-pink-400 bg-pink-950/40 border-pink-800/40',
  'Internship':   'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
  'Project':      'text-cyan-400 bg-cyan-950/40 border-cyan-800/40',
  'Certificate':  'text-yellow-400 bg-yellow-950/40 border-yellow-800/40',
  'Workshop':     'text-orange-400 bg-orange-950/40 border-orange-800/40',
  'Stage':        'text-purple-400 bg-purple-950/40 border-purple-800/40',
  'Campus':       'text-zinc-300 bg-zinc-800/40 border-zinc-700/40',
  'Award':        'text-amber-400 bg-amber-950/40 border-amber-800/40',
  'Personal':     'text-rose-400 bg-rose-950/40 border-rose-800/40',
};

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatMonthYear(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/** Lightbox component */
function Lightbox({ items, startIdx, onClose }: { items: MediaItem[]; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const current = items[idx];

  const prev = useCallback(() => setIdx(i => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  if (!current) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl cursor-zoom-out"
        onClick={onClose}
      />

      {/* Main content */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full">
          {current.image ? (
            <img
              loading="lazy"
              src={current.image}
              alt={current.title}
              className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/5"
            />
          ) : (
            <div className="w-full h-64 bg-zinc-900 rounded-2xl flex items-center justify-center">
              <span className="text-zinc-600 text-sm">No image</span>
            </div>
          )}

          {/* Featured badge */}
          {current.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-500/90 text-black text-[10px] font-extrabold px-2 py-1 rounded-full backdrop-blur-sm">
              <Star size={10} fill="currentColor" /> Featured
            </div>
          )}

          {/* Prev / Next */}
          {items.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/10 cursor-pointer transition-all hover:scale-110"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/10 cursor-pointer transition-all hover:scale-110"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Caption panel */}
        <div className="w-full bg-zinc-950/90 backdrop-blur-md border border-white/5 rounded-2xl p-5 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[current.category] || 'text-zinc-400 bg-zinc-900 border-zinc-800'}`}>
                  {current.category}
                </span>
                <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                  <Calendar size={10} /> {formatDate(current.date)}
                </span>
              </div>
              <h3 className="text-white font-extrabold text-base">{current.title}</h3>
              {current.description && (
                <p className="text-zinc-400 text-xs leading-relaxed">{current.description}</p>
              )}
              {current.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap pt-1">
                  {current.tags.map((tag, ti) => (
                    <span key={ti} className="text-[9px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-md">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white cursor-pointer transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Counter */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-1 pt-1">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`rounded-full cursor-pointer transition-all ${i === idx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}

/** Individual masonry card */
function MediaCard({ item, index, onOpen }: { item: MediaItem; index: number; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.07 }}
      className="break-inside-avoid mb-4 group cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/60 hover:border-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5 hover:-translate-y-0.5">
        {/* Image */}
        {item.image ? (
          <img
            loading="lazy"
            src={item.image}
            alt={item.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ display: 'block' }}
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
            <span className="text-zinc-600 text-xs font-semibold">{item.category}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <p className="text-white font-bold text-xs leading-tight">{item.title}</p>
          {item.description && (
            <p className="text-zinc-300 text-[10px] mt-0.5 line-clamp-2 leading-relaxed">{item.description}</p>
          )}
        </div>

        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-500/90 rounded-full flex items-center justify-center shadow-lg">
            <Star size={10} fill="white" className="text-white" />
          </div>
        )}

        {/* Category pill - always visible */}
        <div className="absolute top-2 right-2">
          <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border backdrop-blur-sm ${CATEGORY_COLORS[item.category] || 'text-zinc-400 bg-zinc-900/80 border-zinc-700'}`}>
            {item.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MediaVault({ media }: MediaVaultProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'masonry' | 'timeline'>('masonry');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? media
    : media.filter(m => m.category === activeCategory);

  // For timeline: group by month-year
  const timelineGroups = filtered.reduce<Record<string, MediaItem[]>>((acc, item) => {
    const key = formatMonthYear(item.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const sortedGroups = Object.entries(timelineGroups).sort(([a], [b]) => {
    return new Date(b + ' 1').getTime() - new Date(a + ' 1').getTime();
  });

  const openLightbox = (item: MediaItem) => {
    const idx = filtered.indexOf(item);
    setLightboxIdx(idx >= 0 ? idx : 0);
  };

  // Count per category for badges
  const countByCategory = media.reduce<Record<string, number>>((acc, m) => {
    acc[m.category] = (acc[m.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <section id="gallery" className="py-12 md:py-24 px-4 bg-zinc-950/30 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-pink-500">Gallery</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Life Gallery</p>
            <p className="text-zinc-400 text-sm max-w-md">
              Moments behind the code — events, hackathons, stages &amp; campus life.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Count badge */}
            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
              {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}
            </span>
            {/* View toggles */}
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'masonry' ? 'bg-purple-500/20 text-purple-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="Grid view"
              >
                <Grid3X3 size={14} />
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'timeline' ? 'bg-purple-500/20 text-purple-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="Timeline view"
              >
                <Clock size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.filter(c => c === 'All' || (countByCategory[c] || 0) > 0).map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-lg shadow-purple-500/10'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
              {cat !== 'All' && countByCategory[cat] && (
                <span className={`ml-1.5 text-[9px] ${activeCategory === cat ? 'text-purple-400' : 'text-zinc-600'}`}>
                  {countByCategory[cat]}
                </span>
              )}
              {cat === 'All' && (
                <span className={`ml-1.5 text-[9px] ${activeCategory === cat ? 'text-purple-400' : 'text-zinc-600'}`}>
                  {media.length}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* No results */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 space-y-3"
            >
              <div className="text-4xl">📸</div>
              <p className="text-zinc-400 font-semibold">No photos in this category yet.</p>
              <p className="text-zinc-600 text-sm">Upload photos in the CMS Panel → Media Vault tab.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MASONRY VIEW ── */}
        {viewMode === 'masonry' && filtered.length > 0 && (
          <motion.div
            key="masonry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ columnCount: undefined }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            {filtered.map((item, i) => (
              <MediaCard
                key={item.id}
                item={item}
                index={i}
                onOpen={() => openLightbox(item)}
              />
            ))}
          </motion.div>
        )}

        {/* ── TIMELINE VIEW ── */}
        {viewMode === 'timeline' && filtered.length > 0 && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            {sortedGroups.map(([monthYear, items]) => (
              <div key={monthYear} className="relative">
                {/* Month label */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                    <Calendar size={14} className="text-purple-400" />
                  </div>
                  <h3 className="font-extrabold text-white text-base">{monthYear}</h3>
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-[10px] text-zinc-600 font-semibold shrink-0">{items.length} photo{items.length > 1 ? 's' : ''}</span>
                </div>

                {/* Photo row for this month */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pl-11">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => openLightbox(item)}
                    >
                      <div className="relative overflow-hidden rounded-xl border border-white/5 hover:border-white/15 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                        {item.image ? (
                          <img
                            loading="lazy"
                            src={item.image}
                            alt={item.title}
                            className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-32 bg-zinc-900 flex items-center justify-center">
                            <Tag size={16} className="text-zinc-700" />
                          </div>
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                          <p className="text-white text-[10px] font-bold line-clamp-2">{item.title}</p>
                        </div>
                        {item.featured && (
                          <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-yellow-500/90 rounded-full flex items-center justify-center text-[9px]">
                            <Star size={8} fill="white" className="text-white" />
                          </div>
                        )}
                        <div className="absolute top-1.5 right-1.5">
                          <span className={`text-[7px] font-bold uppercase px-1 py-0.5 rounded border backdrop-blur-sm ${CATEGORY_COLORS[item.category] || 'text-zinc-400 bg-zinc-900/80 border-zinc-700'}`}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-[9px] text-zinc-500 mt-1.5 font-medium truncate px-0.5">{item.title}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={filtered}
            startIdx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
