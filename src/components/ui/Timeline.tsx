'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  GraduationCap, 
  Briefcase, 
  Trophy, 
  Users, 
  Code2, 
  Award, 
  Calendar,
  ExternalLink,
  FileText,
  X,
  Eye,
  Maximize2
} from 'lucide-react';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  month?: string;
  order?: number;
  organization?: string;
  type?: string;
  image?: string;
  proof?: string;
  link?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const typeConfig: Record<string, { icon: React.ReactNode; label: string; textClass: string; bgClass: string; borderClass: string; glowClass: string; glowColor: string }> = {
  education: {
    icon: <GraduationCap size={12} />,
    label: 'Education',
    textClass: 'text-blue-400',
    bgClass: 'bg-blue-500/10',
    borderClass: 'border-blue-500/20',
    glowClass: 'shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:border-blue-500/30',
    glowColor: 'rgba(59, 130, 246, 0.25)',
  },
  internship: {
    icon: <Briefcase size={12} />,
    label: 'Internship',
    textClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10',
    borderClass: 'border-cyan-500/20',
    glowClass: 'shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:border-cyan-500/30',
    glowColor: 'rgba(34, 211, 238, 0.25)',
  },
  award: {
    icon: <Trophy size={12} />,
    label: 'Award',
    textClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10',
    borderClass: 'border-amber-500/20',
    glowClass: 'shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-500/30',
    glowColor: 'rgba(245, 158, 11, 0.25)',
  },
  leadership: {
    icon: <Users size={12} />,
    label: 'Leadership',
    textClass: 'text-purple-400',
    bgClass: 'bg-purple-500/10',
    borderClass: 'border-purple-500/20',
    glowClass: 'shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:border-purple-500/30',
    glowColor: 'rgba(168, 85, 247, 0.25)',
  },
  project: {
    icon: <Code2 size={12} />,
    label: 'Project',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/20',
    glowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:border-emerald-500/30',
    glowColor: 'rgba(16, 185, 129, 0.25)',
  },
  achievement: {
    icon: <Award size={12} />,
    label: 'Achievement',
    textClass: 'text-rose-400',
    bgClass: 'bg-rose-500/10',
    borderClass: 'border-rose-500/20',
    glowClass: 'shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:border-rose-500/30',
    glowColor: 'rgba(244, 63, 94, 0.25)',
  },
};

const defaultConfig = {
  icon: <Calendar size={12} />,
  label: 'Milestone',
  textClass: 'text-purple-400',
  bgClass: 'bg-purple-500/10',
  borderClass: 'border-purple-500/20',
  glowClass: 'shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:border-purple-500/30',
  glowColor: 'rgba(168, 85, 247, 0.25)',
};

export default function Timeline({ items }: TimelineProps) {
  const [activeItem, setActiveItem] = useState<TimelineItem | null>(null);

  const monthMap: Record<string, number> = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
  };

  const getSortableYear = (yearStr: string): number => {
    if (!yearStr) return 0;
    const part = yearStr.split('-')[0].trim();
    const num = parseInt(part, 10);
    return isNaN(num) ? 0 : num;
  };

  const sortedItems = [...items].sort((a, b) => {
    const yearA = getSortableYear(a.year);
    const yearB = getSortableYear(b.year);
    if (yearA !== yearB) return yearA - yearB;
    
    const monthA = a.month ? (monthMap[a.month] || 0) : 0;
    const monthB = b.month ? (monthMap[b.month] || 0) : 0;
    if (monthA !== monthB) return monthA - monthB;

    const timeA = parseInt(a.id.replace('t_', ''), 10) || 0;
    const timeB = parseInt(b.id.replace('t_', ''), 10) || 0;
    return timeA - timeB;
  });

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-12">
      {/* Mobile: left-side line | Desktop: center line */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-zinc-900" />
      
      {/* Dynamic scrolling glow mask */}
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500 to-transparent origin-top shadow-[0_0_15px_rgba(236,72,153,0.5)]"
      />

      <div className="space-y-10 md:space-y-16">
        {sortedItems.map((item, index) => {
          const isLeft = index % 2 === 0;
          const typeKey = (item.type || 'event').toLowerCase();
          const cfg = typeConfig[typeKey] || defaultConfig;

          return (
            <div key={item.id} className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
              
              {/* Mobile: left bullet | Desktop: center bullet */}
              <div className="absolute left-6 md:left-1/2 top-4 md:top-auto transform -translate-x-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-zinc-900 bg-black z-20 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, margin: '-100px' }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                  className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"
                />
              </div>

              {/* Mobile: full-width card offset from left line | Desktop: alternating */}
              <div className={`w-full pl-12 md:pl-0 md:w-[45%] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'} flex ${isLeft ? 'md:justify-end justify-start' : 'justify-start'} mt-0 md:mt-0`}>
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  className="w-full text-left"
                >
                  <div 
                    onClick={() => setActiveItem(item)}
                    className={`glass p-5 rounded-2xl relative overflow-hidden group border border-white/5 ${cfg.glowClass} transition-all duration-300 cursor-pointer`}
                    style={{
                      boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)`
                    }}
                  >
                    {/* Hover Glow Highlight */}
                    <div 
                      className="absolute -inset-px bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.02), ${cfg.glowColor})`
                      }}
                    />
                    
                    <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
                      <span className="px-3 py-0.5 text-xs font-semibold rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {item.year}
                      </span>
                      
                      {/* Milestone Category Badge */}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-full border ${cfg.bgClass} ${cfg.borderClass} ${cfg.textClass}`}>
                        {cfg.icon}
                        {cfg.label}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-extrabold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300 relative z-10 flex items-center gap-1.5">
                      {item.title}
                      {(item.image || item.proof || item.link) && (
                        <Maximize2 size={12} className="text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </h3>

                    {/* Image Preview inside Timeline card */}
                    {item.image && (
                      <div className="relative w-full h-28 rounded-xl overflow-hidden mb-3 border border-white/5 bg-zinc-950">
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          sizes="300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                          <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1 shadow-lg">
                            <Eye size={10} /> Open Gallery
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-zinc-400 text-xs leading-relaxed relative z-10 mb-2">
                      {item.description}
                    </p>

                    {/* Indicators for links/proofs */}
                    {(item.proof || item.link) && (
                      <div className="flex gap-1.5 pt-1">
                        {item.proof && (
                          <span className="inline-flex items-center gap-1 text-[9px] text-zinc-500 font-semibold bg-zinc-900/50 px-1.5 py-0.5 rounded-md border border-zinc-800/40">
                            <FileText size={10} /> Has Proof
                          </span>
                        )}
                        {item.link && (
                          <span className="inline-flex items-center gap-1 text-[9px] text-zinc-500 font-semibold bg-zinc-900/50 px-1.5 py-0.5 rounded-md border border-zinc-800/40">
                            <ExternalLink size={10} /> Link
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Immersive Gallery Overlay Modal */}
      <AnimatePresence>
        {activeItem && (() => {
          const typeKey = (activeItem.type || 'event').toLowerCase();
          const cfg = typeConfig[typeKey] || defaultConfig;
          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              onClick={() => setActiveItem(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative max-w-2xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Visual Section: Image display or gradient backdrop */}
                <div className="relative w-full md:w-1/2 h-56 md:h-auto min-h-[220px] bg-zinc-900 flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800 overflow-hidden">
                  {activeItem.image ? (
                    <>
                      <Image 
                        src={activeItem.image} 
                        alt={activeItem.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                    </>
                  ) : (
                    <div 
                      className="absolute inset-0 bg-gradient-to-br opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, ${cfg.glowColor}, #09090b)`
                      }}
                    />
                  )}

                  {/* Ambient glowing orb representing type */}
                  <div 
                    className="absolute w-44 h-44 rounded-full blur-[70px] pointer-events-none opacity-40"
                    style={{
                      background: cfg.glowColor
                    }}
                  />

                  {/* Icon details overlay */}
                  <div className="relative z-10 text-center p-6 flex flex-col items-center justify-center gap-3">
                    <div className={`p-4 rounded-2xl bg-zinc-900/80 border ${cfg.borderClass} ${cfg.textClass} shadow-xl backdrop-blur-sm`}>
                      {React.cloneElement(cfg.icon as React.ReactElement<any>, { size: 28 })}
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                      Chandru's Timeline
                    </span>
                  </div>
                </div>

                {/* Narrative Details Section */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {activeItem.year}
                      </span>
                      
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-full border ${cfg.bgClass} ${cfg.borderClass} ${cfg.textClass}`}>
                        {cfg.icon}
                        {cfg.label}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white leading-tight">
                      {activeItem.title}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed max-h-48 overflow-y-auto pr-1">
                      {activeItem.description}
                    </p>
                  </div>

                  {/* Actions Grid */}
                  <div className="space-y-2 pt-2">
                    <div className="flex flex-col gap-2">
                      {activeItem.link && (
                        <a 
                          href={activeItem.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2 bg-white text-black font-extrabold text-xs rounded-xl hover:bg-zinc-200 transition-colors"
                        >
                          <ExternalLink size={12} />
                          Visit Milestone Link
                        </a>
                      )}
                      
                      {activeItem.proof && (
                        <a 
                          href={activeItem.proof} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-extrabold text-xs rounded-xl transition-colors"
                        >
                          <FileText size={12} />
                          Verify Milestone Proof
                        </a>
                      )}
                    </div>

                    <button 
                      onClick={() => setActiveItem(null)}
                      className="w-full py-2 bg-transparent text-zinc-500 hover:text-white text-xs font-semibold rounded-xl text-center transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                </div>

                {/* Absolute Top-Right Exit Button */}
                <button 
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer z-20"
                >
                  <X size={14} />
                </button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
