'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import { 
  Calendar, MapPin, Globe, Users, Code, Sparkles, Star, 
  ExternalLink, FileText, BookOpen, 
  ChevronLeft, ChevronRight, X, Layers, Briefcase, HelpCircle, Award
} from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  logo: string;
  highlights: string[];
  fromMonth?: string;
  fromYear?: string;
  toMonth?: string;
  toYear?: string;
  currentlyWorking?: boolean;
  category?: string;
  featured?: boolean;
  tech?: string[];
  metrics?: {
    projects?: number;
    reached?: number;
    teamSize?: number;
    apisBuilt?: number;
    eventsConducted?: number;
  };
  gallery?: string[];
  links?: {
    github?: string;
    linkedin?: string;
    certificate?: string;
    project?: string;
    blog?: string;
  };
  status?: string;
  aiSummary?: string;
  locationType?: string;
  location?: string;
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Leadership' | 'Internship' | 'AI' | 'Research'>('All');
  const [activeExp, setActiveExp] = useState<ExperienceItem | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Escape key handler for modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeExp) setActiveExp(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeExp]);

  // Filter logic
  const filteredExperience = experience.filter(exp => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Leadership') {
      return exp.category === 'Leadership' || exp.role?.toLowerCase().includes('leader') || exp.role?.toLowerCase().includes('secretary');
    }
    if (selectedFilter === 'Internship') {
      return exp.category === 'Internship' || exp.role?.toLowerCase().includes('intern');
    }
    if (selectedFilter === 'AI') {
      const hasAiTech = exp.tech?.some(t => ['gemini', 'ai', 'tensorflow', 'openai', 'llm', 'machine learning', 'artificial intelligence'].includes(t.toLowerCase()));
      const hasAiRole = exp.role ? /\b(ai|gemini|llm|tensorflow|openai)\b/i.test(exp.role) : false;
      const hasAiCompany = exp.company ? /\b(ai|gemini|llm|tensorflow|openai)\b/i.test(exp.company) : false;
      return exp.category === 'AI' || hasAiTech || hasAiRole || hasAiCompany;
    }
    if (selectedFilter === 'Research') {
      return exp.category === 'Research' || exp.role?.toLowerCase().includes('research') || exp.company?.toLowerCase().includes('research');
    }
    return true;
  });

  // Sort: Featured first
  const sortedExperience = [...filteredExperience].sort((a, b) => {
    const aFeat = a.featured ? 1 : 0;
    const bFeat = b.featured ? 1 : 0;
    return bFeat - aFeat;
  });

  // Helper to format bold text: **text**
  const formatBold = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part);
  };

  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-5xl mx-auto space-y-10 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
          <div className="space-y-2 text-left">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-500">
              Employment
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Professional Experience
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Leadership', 'Internship', 'AI', 'Research'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                  selectedFilter === filter
                    ? 'bg-purple-600/25 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                    : 'bg-zinc-950/60 border-zinc-900 text-zinc-400 hover:text-zinc-300 hover:border-zinc-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {sortedExperience.map((exp) => (
              <motion.div
                key={exp.id}
                layoutId={exp.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={exp.featured ? 'col-span-1 md:col-span-2' : 'col-span-1'}
              >
                <Card 
                  glowColor={exp.featured ? 'rgba(245, 158, 11, 0.18)' : 'rgba(168, 85, 247, 0.1)'}
                  className={`h-full flex flex-col justify-between group hover:border-white/15 transition-all duration-300 ${
                    exp.featured ? 'border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.02)]' : ''
                  }`}
                >
                  <div className="space-y-5">
                    {/* Top: Header Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex items-center gap-3.5">
                        {/* Logo Container */}
                        <div className="w-12 h-12 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {exp.logo ? (
                            exp.logo.startsWith('/') || exp.logo.startsWith('data:') ? (
                              <img loading="lazy" src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-extrabold text-white text-base">{exp.logo}</span>
                            )
                          ) : (
                            <Briefcase size={20} className="text-zinc-500" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-extrabold text-white text-base group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                              {exp.role}
                              {exp.featured && (
                                <Star size={12} fill="#f59e0b" className="text-amber-500 shrink-0" />
                              )}
                            </h3>
                            {/* Badges */}
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 capitalize">
                                {exp.category || 'Experience'}
                              </span>
                              {exp.tech?.some(t => ['gemini', 'ai', 'tensorflow', 'openai', 'llm'].includes(t.toLowerCase())) && (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/60 text-purple-300">
                                  AI
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-zinc-400 text-xs font-semibold mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        {/* Status indicators */}
                        <span className="text-[10px] flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-900">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            exp.status === 'Ongoing' ? 'bg-emerald-500 animate-pulse' :
                            exp.status === 'Upcoming' ? 'bg-amber-500' :
                            'bg-zinc-500'
                          }`} />
                          <span className="text-zinc-400 font-semibold text-[8px] uppercase tracking-wider">{exp.status || 'Completed'}</span>
                        </span>
                        
                        {/* Timeframe */}
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-900 text-zinc-400 flex items-center gap-1">
                          <Calendar size={10} className="text-zinc-500" />
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Location type & Location */}
                    <div className="flex items-center gap-1.5 pl-0.5 mt-2">
                      {exp.locationType === 'Remote (Online)' ? (
                        <Globe size={11} className="text-blue-500" />
                      ) : (
                        <MapPin size={11} className="text-emerald-500" />
                      )}
                      <span className="text-[11px] font-semibold text-zinc-400">
                        {exp.locationType || 'Remote'}
                        {exp.location && ` • ${exp.location}`}
                      </span>
                    </div>

                    {/* Highlights list */}
                    <ul className="space-y-2.5 text-xs text-zinc-400 leading-relaxed list-none pl-0 mt-4">
                      {exp.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="relative pl-4 flex items-start gap-2">
                          <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-purple-500/80 shrink-0" />
                          <span className="text-zinc-400">{formatBold(item)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Impact Metrics Grid */}
                    {exp.metrics && Object.values(exp.metrics).some(v => Number(v) > 0) && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                        {exp.metrics.teamSize ? (
                          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 flex flex-col justify-center">
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Team Led</span>
                            <span className="text-xs font-extrabold text-white mt-0.5">{exp.metrics.teamSize} members</span>
                          </div>
                        ) : null}
                        {exp.metrics.apisBuilt ? (
                          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 flex flex-col justify-center">
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">APIs Built</span>
                            <span className="text-xs font-extrabold text-white mt-0.5">{exp.metrics.apisBuilt} endpoints</span>
                          </div>
                        ) : null}
                        {exp.metrics.reached ? (
                          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 flex flex-col justify-center">
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Impacted</span>
                            <span className="text-xs font-extrabold text-white mt-0.5">{exp.metrics.reached}+ students</span>
                          </div>
                        ) : null}
                        {exp.metrics.projects ? (
                          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 flex flex-col justify-center">
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Projects</span>
                            <span className="text-xs font-extrabold text-white mt-0.5">{exp.metrics.projects} shipped</span>
                          </div>
                        ) : null}
                        {exp.metrics.eventsConducted ? (
                          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 flex flex-col justify-center">
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Events</span>
                            <span className="text-xs font-extrabold text-white mt-0.5">{exp.metrics.eventsConducted} conducted</span>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Tech Stack bullet dots list */}
                    {exp.tech && exp.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {exp.tech.map((tName) => (
                          <span 
                            key={tName} 
                            className="text-[10px] font-semibold bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400 hover:text-zinc-300 transition-colors"
                          >
                            {tName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom: Action links and details button */}
                  <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-wrap justify-between items-center gap-3">
                    {/* View Story Button */}
                    <button
                      onClick={() => {
                        setActiveExp(exp);
                        setActiveImageIdx(0);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/30 hover:border-purple-500 text-xs font-bold text-purple-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 select-none hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    >
                      <Sparkles size={13} className="animate-pulse" /> View Experience Story
                    </button>

                    {/* External links */}
                    {exp.links && Object.keys(exp.links).length > 0 && (
                      <div className="flex items-center gap-2">
                        {exp.links.project && (
                          <a
                            href={exp.links.project}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white p-1.5 hover:bg-zinc-950 border border-transparent hover:border-zinc-900 rounded-lg transition-all"
                            title="View Project"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {exp.links.github && (
                          <a
                            href={exp.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white p-1.5 hover:bg-zinc-950 border border-transparent hover:border-zinc-900 rounded-lg transition-all"
                            title="GitHub Repository"
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {exp.links.linkedin && (
                          <a
                            href={exp.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white p-1.5 hover:bg-zinc-950 border border-transparent hover:border-zinc-900 rounded-lg transition-all"
                            title="LinkedIn Announcement"
                          >
                            <Linkedin size={14} />
                          </a>
                        )}
                        {exp.links.certificate && exp.links.certificate !== '#' && (
                          <a
                            href={exp.links.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white p-1.5 hover:bg-zinc-950 border border-transparent hover:border-zinc-900 rounded-lg transition-all"
                            title="View Certificate"
                          >
                            <FileText size={14} />
                          </a>
                        )}
                        {exp.links.blog && (
                          <a
                            href={exp.links.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white p-1.5 hover:bg-zinc-950 border border-transparent hover:border-zinc-900 rounded-lg transition-all"
                            title="Read Blog Post"
                          >
                            <BookOpen size={14} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* DETAILED EXPERIENCE STORY DIALOG */}
      <AnimatePresence>
        {activeExp && (() => {
          const galleryList = activeExp.gallery || [];
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Dark glass backdrop overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveExp(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Body */}
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`Experience details: ${activeExp.role} at ${activeExp.company}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative w-full max-w-3xl max-h-[85vh] bg-zinc-950 border border-zinc-900 rounded-3xl overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveExp(null)}
                  className="absolute top-6 right-6 text-zinc-500 hover:text-white p-2 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-3.5 border-b border-zinc-900 pb-5 pr-12">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl overflow-hidden shrink-0">
                    {activeExp.logo ? (
                      activeExp.logo.startsWith('/') || activeExp.logo.startsWith('data:') ? (
                        <img loading="lazy" src={activeExp.logo} alt={activeExp.company} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-extrabold text-white text-base">{activeExp.logo}</span>
                      )
                    ) : (
                      '💼'
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                      {activeExp.role}
                      {activeExp.featured && (
                        <Star size={14} fill="#f59e0b" className="text-amber-500 shrink-0" />
                      )}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap mt-0.5 text-xs text-zinc-400">
                      <span className="font-bold text-zinc-300">{activeExp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {activeExp.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {activeExp.locationType === 'Remote (Online)' ? <Globe size={11} /> : <MapPin size={11} />}
                        {activeExp.locationType || 'Remote'}
                        {activeExp.location && ` (${activeExp.location})`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI summary storytelling paragraph */}
                {activeExp.aiSummary ? (
                  <div className="relative bg-purple-950/20 border border-purple-900/40 p-5 rounded-2xl space-y-2">
                    <div className="flex items-center gap-1.5 text-purple-300 text-xs font-bold uppercase tracking-wider">
                      <Sparkles size={13} className="text-purple-400 animate-pulse" /> Live Experience Story
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed font-medium italic">
                      "{activeExp.aiSummary}"
                    </p>
                  </div>
                ) : (
                  <div className="relative bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl space-y-2">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                      <Briefcase size={13} className="text-zinc-500" /> Executive Narrative
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed italic">
                      No story summary generated. Use the CMS panel to generate a professional recruiter overview.
                    </p>
                  </div>
                )}

                {/* Highlights & Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Bullets column (spans 2) */}
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Key Responsibilities & Scope</h4>
                    <ul className="space-y-3 text-xs text-zinc-400 leading-relaxed list-none pl-0">
                      {activeExp.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="relative pl-5 flex items-start gap-2">
                          <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
                          <span>{formatBold(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics sidebar */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Key Metrics</h4>
                    <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl divide-y divide-zinc-900 space-y-3">
                      {activeExp.metrics?.teamSize ? (
                        <div className="flex justify-between items-center py-2 first:pt-0">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase">Team Size</span>
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Users size={12} className="text-purple-400" /> {activeExp.metrics.teamSize}
                          </span>
                        </div>
                      ) : null}
                      {activeExp.metrics?.apisBuilt ? (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase">APIs Engineered</span>
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Code size={12} className="text-purple-400" /> {activeExp.metrics.apisBuilt}
                          </span>
                        </div>
                      ) : null}
                      {activeExp.metrics?.reached ? (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase">Students Reached</span>
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Layers size={12} className="text-purple-400" /> {activeExp.metrics.reached}+
                          </span>
                        </div>
                      ) : null}
                      {activeExp.metrics?.projects ? (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase">Projects Delivered</span>
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Briefcase size={12} className="text-purple-400" /> {activeExp.metrics.projects}
                          </span>
                        </div>
                      ) : null}
                      {activeExp.metrics?.eventsConducted ? (
                        <div className="flex justify-between items-center py-2 last:pb-0">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase">Events Conducted</span>
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Award size={12} className="text-purple-400" /> {activeExp.metrics.eventsConducted}
                          </span>
                        </div>
                      ) : null}
                      {(!activeExp.metrics || !Object.values(activeExp.metrics).some(v => Number(v) > 0)) && (
                        <div className="text-[10px] text-zinc-600 text-center py-4">No metrics set.</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Gallery Stories Slideshow */}
                {galleryList && galleryList.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-zinc-900">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Experience Gallery & Attachments</h4>
                    
                    {/* Slider viewport */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center group">
                      <img loading="lazy" 
                        src={galleryList[activeImageIdx]} 
                        alt="Experience attachment" 
                        className="w-full h-full object-contain"
                      />

                      {/* Navigation buttons */}
                      {galleryList.length > 1 && (
                        <>
                          <button
                            onClick={() => setActiveImageIdx((activeImageIdx - 1 + galleryList.length) % galleryList.length)}
                            className="absolute left-4 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-zinc-800/50 hover:bg-black transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={() => setActiveImageIdx((activeImageIdx + 1) % galleryList.length)}
                            className="absolute right-4 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-zinc-800/50 hover:bg-black transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </>
                      )}

                      {/* Index Indicator */}
                      <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg bg-black/70 border border-zinc-800 text-[10px] text-zinc-400 font-bold select-none">
                        {activeImageIdx + 1} / {galleryList.length}
                      </div>
                    </div>

                    {/* Thumbnail indicators */}
                    {galleryList.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none">
                        {galleryList.map((imgSrc, imgIdx) => (
                          <button
                            key={imgIdx}
                            onClick={() => setActiveImageIdx(imgIdx)}
                            className={`w-16 h-10 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                              activeImageIdx === imgIdx ? 'border-purple-500 ring-1 ring-purple-500/30' : 'border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            <img loading="lazy" src={imgSrc} alt="Thumbnail" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom bar of links inside modal */}
                {activeExp.links && Object.keys(activeExp.links).length > 0 && (
                  <div className="pt-4 border-t border-zinc-900 flex flex-wrap gap-3">
                    {activeExp.links.project && (
                      <a
                        href={activeExp.links.project}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
                      >
                        <ExternalLink size={12} /> View Project Demo
                      </a>
                    )}
                    {activeExp.links.github && (
                      <a
                        href={activeExp.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
                      >
                        <Github size={12} /> View Codebase
                      </a>
                    )}
                    {activeExp.links.linkedin && (
                      <a
                        href={activeExp.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
                      >
                        <Linkedin size={12} /> Read LinkedIn Post
                      </a>
                    )}
                    {activeExp.links.certificate && activeExp.links.certificate !== '#' && (
                      <a
                        href={activeExp.links.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
                      >
                        <FileText size={12} /> View Credential
                      </a>
                    )}
                    {activeExp.links.blog && (
                      <a
                        href={activeExp.links.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
                      >
                        <BookOpen size={12} /> Read Deep-Dive Blog
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
