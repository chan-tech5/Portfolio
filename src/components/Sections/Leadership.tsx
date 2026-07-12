'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import { 
  Users, Award, X, ChevronLeft, ChevronRight, ExternalLink, 
  Star, Calendar, ArrowUpRight, Sparkles, Globe, Image as ImageIcon
} from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';

interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  fromMonth?: string;
  fromYear?: string;
  toMonth?: string;
  toYear?: string;
  currentlyActive?: boolean;
  logo?: string;
  category?: string;
  featured?: boolean;
  tagline?: string;
  metrics?: {
    eventsConducted?: number;
    studentsReached?: number;
    volunteersCount?: number;
    sponsorsClosed?: number;
  };
  gallery?: string[];
  links?: {
    github?: string;
    linkedin?: string;
    certificate?: string;
    project?: string;
    blog?: string;
  };
}

interface LeadershipProps {
  leadership: LeadershipItem[];
}

export default function Leadership({ leadership }: LeadershipProps) {
  const [selectedRole, setSelectedRole] = useState<LeadershipItem | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Escape key handler for modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedRole) setSelectedRole(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedRole]);

  // Find the featured role (defaults to first item if none is set as featured)
  const featuredRole = leadership.find((item) => item.featured) || leadership[0];
  const otherRoles = leadership.filter((item) => item.id !== featuredRole?.id);

  const renderLogo = (logo?: string) => {
    if (!logo) return <Users size={20} />;
    if (logo.startsWith('data:image') || logo.startsWith('/') || logo.startsWith('http')) {
      return <img loading="lazy" src={logo} alt="Logo" className="w-full h-full object-cover" />;
    }
    return <span className="text-lg">{logo}</span>;
  };

  const getMetricLabel = (key: string, val: number) => {
    switch (key) {
      case 'eventsConducted':
        return `${val}+ Events Organized`;
      case 'studentsReached':
        return `${val}+ Students Reached`;
      case 'volunteersCount':
        return `${val}+ Volunteers Managed`;
      case 'sponsorsClosed':
        return `${val}+ Sponsorships Closed`;
      default:
        return `${val}+ Impact Metric`;
    }
  };

  const handleNextSlide = (galleryLength: number) => {
    setActiveSlide((prev) => (prev + 1) % galleryLength);
  };

  const handlePrevSlide = (galleryLength: number) => {
    setActiveSlide((prev) => (prev - 1 + galleryLength) % galleryLength);
  };

  return (
    <section id="leadership" className="py-12 md:py-24 px-4 bg-zinc-950/20 relative overflow-hidden">
      {/* Blurred background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-pink-500 flex items-center gap-1.5 justify-center md:justify-start">
            <Sparkles size={12} className="text-pink-500 animate-pulse" /> Community
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Leadership & Impact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left/Featured: Hero Card */}
          {featuredRole && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <Card glowColor="rgba(217, 70, 239, 0.18)" className="h-full flex flex-col justify-between p-6 md:p-8 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-500/15 transition-all duration-500" />
                
                <div>
                  {/* Category and Period */}
                  <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400">
                      {featuredRole.category || 'Student Chapter'}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/60 text-zinc-400 flex items-center gap-1.5">
                      <Calendar size={12} className="text-zinc-500" /> {featuredRole.period}
                    </span>
                  </div>

                  {/* Header info */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-pink-500/5 group-hover:border-pink-500/30 transition-all duration-300">
                      {renderLogo(featuredRole.logo)}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-pink-300 transition-colors">
                        {featuredRole.role}
                      </h3>
                      <p className="text-zinc-400 text-sm font-bold mt-0.5">
                        {featuredRole.organization}
                      </p>
                    </div>
                  </div>

                  {/* Tagline */}
                  {featuredRole.tagline && (
                    <p className="mt-5 text-sm text-pink-400/90 font-semibold italic flex items-center gap-2">
                      <Award size={14} className="shrink-0 text-pink-500" />
                      {featuredRole.tagline}
                    </p>
                  )}

                  {/* Description */}
                  <p className="mt-4 text-zinc-400 text-sm leading-relaxed font-medium">
                    {featuredRole.description}
                  </p>

                  {/* Dynamic Photo Preview under description */}
                  {featuredRole.gallery && featuredRole.gallery.length > 0 && (
                    <div className="mt-6 w-full aspect-[16/7] md:aspect-[21/8] relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/40 group/img-preview">
                      <img loading="lazy" 
                        src={featuredRole.gallery[0]} 
                        alt={`${featuredRole.role} preview`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img-preview:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] text-zinc-300 font-extrabold uppercase tracking-wider bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5 w-fit">
                        <span className="flex items-center gap-1.5"><ImageIcon size={10} className="text-pink-400" /> Event Gallery</span>
                      </div>
                    </div>
                  )}

                  {/* Impact metrics highlight */}
                  {featuredRole.metrics && Object.values(featuredRole.metrics).some(v => v > 0) && (
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-zinc-900/80 pt-6">
                      {Object.entries(featuredRole.metrics).map(([key, val]) => {
                        if (!val || val === 0) return null;
                        let label = '';
                        switch (key) {
                          case 'eventsConducted': label = 'Events'; break;
                          case 'studentsReached': label = 'Students'; break;
                          case 'volunteersCount': label = 'Volunteers'; break;
                          case 'sponsorsClosed': label = 'Sponsors'; break;
                          default: label = 'Impact';
                        }
                        return (
                          <div key={key} className="space-y-0.5 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/40 hover:border-pink-500/20 transition-colors">
                            <div className="text-lg font-black text-pink-400">{val}+</div>
                            <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-extrabold">{label}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-900/50 flex flex-wrap gap-3 items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedRole(featuredRole);
                      setActiveSlide(0);
                    }}
                    className="px-5 py-2.5 bg-pink-600 hover:bg-pink-500 hover:scale-[1.02] active:scale-[0.98] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-pink-500/10 cursor-pointer flex items-center gap-1.5"
                  >
                    View Impact Story <ArrowUpRight size={14} />
                  </button>

                  <div className="flex gap-2">
                    {featuredRole.links?.linkedin && (
                      <a
                        href={featuredRole.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
                        title="LinkedIn Profile / Post"
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                    {featuredRole.links?.project && (
                      <a
                        href={featuredRole.links.project}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
                        title="Website"
                      >
                        <Globe size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Right: Stacked other roles */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {otherRoles.map((role, idx) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-1"
              >
                <Card glowColor="rgba(168, 85, 247, 0.12)" className="h-full flex flex-col justify-between p-5 group relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-purple-500/30 transition-all duration-300">
                          {renderLogo(role.logo)}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                            {role.role}
                          </h4>
                          <p className="text-zinc-500 text-xs font-semibold mt-0.5">
                            {role.organization}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center text-[9px] font-bold">
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 uppercase tracking-wider">
                        {role.category || 'Representative'}
                      </span>
                      <span className="text-zinc-500 bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 rounded">
                        {role.period}
                      </span>
                    </div>

                    <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                      {role.description.length > 120 ? `${role.description.substring(0, 115)}...` : role.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-900/40 flex justify-between items-center">
                    <button
                      onClick={() => {
                        setSelectedRole(role);
                        setActiveSlide(0);
                      }}
                      className="text-xs text-purple-400 hover:text-purple-300 font-extrabold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                    >
                      View Story <ArrowUpRight size={12} />
                    </button>
                    
                    <div className="flex gap-1.5">
                      {role.links?.linkedin && (
                        <a
                          href={role.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors"
                        >
                          <Linkedin size={11} />
                        </a>
                      )}
                      {role.links?.project && (
                        <a
                          href={role.links.project}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors"
                        >
                          <Globe size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Glassmorphic Overlay Modal for Gallery/Impact Story */}
      <AnimatePresence>
        {selectedRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRole(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Leadership details: ${selectedRole.role} at ${selectedRole.organization}`}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="glass border border-white/10 rounded-3xl overflow-hidden max-w-4xl w-full mx-4 shadow-2xl relative z-10 max-h-[85vh] flex flex-col bg-zinc-950"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedRole(null)}
                className="absolute top-4 right-4 z-20 p-3 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-6">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start border-b border-zinc-900/60 pb-5">
                  <div className="flex gap-4 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-pink-500/5">
                      {renderLogo(selectedRole.logo)}
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20 text-pink-400">
                        {selectedRole.category || 'Leadership Item'}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white mt-1">
                        {selectedRole.role}
                      </h3>
                      <p className="text-zinc-400 text-sm font-bold">
                        {selectedRole.organization}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center gap-1.5 mt-2 md:mt-0">
                    <Calendar size={12} className="text-zinc-500" /> {selectedRole.period}
                  </span>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Left Column: Slideshow or Fallback */}
                  <div className="space-y-4">
                    {selectedRole.gallery && selectedRole.gallery.length > 0 ? (
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 group/slideshow">
                        {/* Slide image */}
                        <img loading="lazy" 
                          src={selectedRole.gallery[activeSlide]} 
                          alt={`Gallery slide ${activeSlide + 1}`}
                          className="w-full h-full object-cover" 
                        />
                        
                        {/* Navigation arrows */}
                        {selectedRole.gallery.length > 1 && (
                          <>
                            <button
                              onClick={() => handlePrevSlide(selectedRole.gallery!.length)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/80 rounded-lg text-white border border-white/5 transition-all opacity-70 sm:opacity-0 group-hover/slideshow:opacity-100 cursor-pointer"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={() => handleNextSlide(selectedRole.gallery!.length)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/80 rounded-lg text-white border border-white/5 transition-all opacity-70 sm:opacity-0 group-hover/slideshow:opacity-100 cursor-pointer"
                            >
                              <ChevronRight size={16} />
                            </button>

                            {/* Bullet indicators */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                              {selectedRole.gallery.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveSlide(idx)}
                                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                                    idx === activeSlide ? 'bg-pink-500 w-3' : 'bg-white/40'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                        
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 border border-white/5 text-[9px] font-bold text-white uppercase tracking-wider">
                          Proof / Gallery
                        </div>
                      </div>
                    ) : (
                      // Fallback visual display
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800/80 bg-gradient-to-br from-zinc-900/40 to-pink-950/10 flex flex-col items-center justify-center p-6 text-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/5 rounded-full blur-2xl" />
                        <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mb-3 text-2xl relative z-10 shadow-lg shadow-pink-500/5">
                          {renderLogo(selectedRole.logo)}
                        </div>
                        <h4 className="text-zinc-200 text-sm font-bold relative z-10">{selectedRole.role} Story</h4>
                        <p className="text-zinc-500 text-xs mt-1 max-w-[200px] relative z-10">Empowering student builders and cultivating tech knowledge on campus</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Details, Metrics, Links */}
                  <div className="space-y-6">
                    {/* Tagline / Statement */}
                    {selectedRole.tagline && (
                      <div className="bg-pink-500/5 border border-pink-500/10 rounded-2xl p-4">
                        <h4 className="text-[10px] text-pink-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                          <Star size={10} className="fill-pink-500 text-pink-500" /> Mission Statement
                        </h4>
                        <p className="text-zinc-200 text-xs font-semibold italic mt-1 leading-relaxed">
                          "{selectedRole.tagline}"
                        </p>
                      </div>
                    )}

                    {/* Detailed narrative */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider">Role Narrative</h4>
                      <p className="text-zinc-300 text-xs leading-relaxed font-medium">
                        {selectedRole.description}
                      </p>
                    </div>

                    {/* Metrics Grid */}
                    {selectedRole.metrics && Object.values(selectedRole.metrics).some(v => v > 0) && (
                      <div className="space-y-2">
                        <h4 className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider">Verified Achievements</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(selectedRole.metrics).map(([key, val]) => {
                            if (!val || val === 0) return null;
                            return (
                              <div key={key} className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3">
                                <div className="text-xs font-medium text-zinc-400">{getMetricLabel(key, val)}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* External links */}
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider">Proof & External Links</h4>
                      <div className="flex flex-col gap-2">
                        {selectedRole.links?.linkedin && (
                          <a
                            href={selectedRole.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white text-xs font-bold transition-all"
                          >
                            <span className="flex items-center gap-2"><Linkedin size={14} className="text-pink-400" /> View LinkedIn Announcement</span>
                            <ExternalLink size={12} className="text-zinc-500" />
                          </a>
                        )}
                        {selectedRole.links?.github && (
                          <a
                            href={selectedRole.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white text-xs font-bold transition-all"
                          >
                            <span className="flex items-center gap-2"><Github size={14} className="text-pink-400" /> GitHub Repository / Org</span>
                            <ExternalLink size={12} className="text-zinc-500" />
                          </a>
                        )}
                        {selectedRole.links?.certificate && (
                          <a
                            href={selectedRole.links.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white text-xs font-bold transition-all"
                          >
                            <span className="flex items-center gap-2"><Award size={14} className="text-pink-400" /> View Leadership Certificate</span>
                            <ExternalLink size={12} className="text-zinc-500" />
                          </a>
                        )}
                        {selectedRole.links?.project && (
                          <a
                            href={selectedRole.links.project}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white text-xs font-bold transition-all"
                          >
                            <span className="flex items-center gap-2"><Globe size={14} className="text-pink-400" /> Event / Organization Website</span>
                            <ExternalLink size={12} className="text-zinc-500" />
                          </a>
                        )}
                        
                        {(!selectedRole.links || Object.keys(selectedRole.links).length === 0) && (
                          <div className="text-xs text-zinc-500 italic">No external links attached for this position.</div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
