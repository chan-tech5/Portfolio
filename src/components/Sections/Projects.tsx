'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { 
  ExternalLink, X, Code, Database, Globe, Layers,
  Clock, Users, Star, Play, Image as ImageIcon,
  ChevronLeft, ChevronRight, BookOpen, Cpu,
  AlertTriangle, TrendingUp, Compass, Info, CheckCircle
} from 'lucide-react';
import { Github } from '@/components/ui/BrandIcons';
import { trackEvent } from '@/utils/analytics';
import DOMPurify from 'dompurify';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  live: string;
  category: string;
  thumbnail?: string;
  video?: string;
  screenshots?: string[];
  status?: string;
  difficulty?: string;
  teamSize?: number;
  duration?: string;
  featured?: boolean;
  story?: {
    problem?: string;
    solution?: string;
    architecture?: string;
    challenges?: string;
    impact?: string;
    learning?: string;
  };
}

interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Tab states for active project modal details
  const [modalTab, setModalTab] = useState<'overview' | 'media' | 'story'>('overview');
  const [storySubTab, setStorySubTab] = useState<'problem' | 'solution' | 'architecture' | 'challenges' | 'impact' | 'learning'>('problem');
  const [screenshotIdx, setScreenshotIdx] = useState<number>(0);

  const selectedProject = projects.find((p) => p.id === selectedId);

  // Escape key handler for modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedId) setSelectedId(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedId]);

  // Extract unique categories dynamically
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const handleOpenProject = (id: string) => {
    setSelectedId(id);
    setModalTab('overview');
    setStorySubTab('problem');
    setScreenshotIdx(0);
    trackEvent('project_view', { projectId: id });
  };

  // Get project tech category background colors
  const getCategoryColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('ai') || cat.includes('intelligence')) {
      return 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30';
    }
    if (cat.includes('green') || cat.includes('waste') || cat.includes('eco')) {
      return 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30';
    }
    if (cat.includes('saas') || cat.includes('web') || cat.includes('app')) {
      return 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30';
    }
    if (cat.includes('security') || cat.includes('connection') || cat.includes('auth')) {
      return 'from-rose-500/20 to-orange-500/20 text-rose-400 border-rose-500/30';
    }
    return 'from-zinc-500/20 to-zinc-700/20 text-zinc-400 border-zinc-700/30';
  };

  const getStatusBadge = (status?: string) => {
    const st = (status || 'Completed').toLowerCase();
    switch (st) {
      case 'live':
        return (
          <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-black text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        );
      case 'ongoing':
        return (
          <span className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-[9px] font-black text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Ongoing
          </span>
        );
      case 'archived':
        return (
          <span className="flex items-center gap-1.5 bg-zinc-800 border border-zinc-700 text-[9px] font-black text-zinc-400 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            Archived
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-[9px] font-black text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            Completed
          </span>
        );
    }
  };

  const getDifficultyBadge = (difficulty?: string) => {
    const diff = (difficulty || 'Intermediate').toLowerCase();
    switch (diff) {
      case 'beginner':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      case 'advanced':
        return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
      default:
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    }
  };

  return (
    <section id="projects" className="py-12 md:py-24 px-4 bg-zinc-950/40 relative">
      <div className="container max-w-5xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-purple-500">
              Portfolio
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Selected Creations
            </p>
          </div>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap justify-center md:justify-end gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  activeCategory === cat
                    ? 'bg-purple-600/20 border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                    : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`card-container-${project.id}`}
              onClick={() => handleOpenProject(project.id)}
              className="cursor-pointer group h-full flex flex-col"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                hoverGlow 
                glowColor="rgba(168, 85, 247, 0.08)"
                className="h-full flex flex-col overflow-hidden p-0 group-hover:border-purple-500/20 transition-all duration-300 bg-zinc-950/80 border-zinc-900 flex-1 justify-between"
              >
                {/* Visual Thumbnail */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-900 border-b border-zinc-900 relative shrink-0">
                  {project.thumbnail ? (
                    <img loading="lazy" 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-950/20 via-zinc-950 to-blue-950/20 flex flex-col items-center justify-center p-4">
                      <Code size={40} className="text-purple-500/40 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-600 mt-2">Architecture Blueprint</span>
                    </div>
                  )}

                  {/* Badges layered on top of thumbnail */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r border backdrop-blur-md shadow-sm ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                      {getStatusBadge(project.status)}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {project.featured ? (
                        <span className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/40 text-[9px] font-black text-yellow-500 px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-sm">
                          <Star size={9} className="fill-yellow-500 text-yellow-500" /> Featured
                        </span>
                      ) : (
                        <div />
                      )}
                      <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-extrabold border backdrop-blur-sm ${getDifficultyBadge(project.difficulty)}`}>
                        {project.difficulty || 'Intermediate'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {/* Tech stack row (limit to 3 tags) */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 rounded-md text-zinc-500 font-medium">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-[10px] text-purple-400/80 font-bold px-1 py-0.5">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Interactive trigger label */}
                    <div className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                      View Blueprint & Narrative →
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Floating Detail Overlay Modal */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
              />

              {/* Centered Expanded Blueprint Dialog */}
              <motion.div
                layoutId={`card-container-${selectedProject.id}`}
                role="dialog"
                aria-modal="true"
                aria-label={`Project details: ${selectedProject.title}`}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-3xl bg-zinc-950 border border-zinc-800/80 rounded-3xl z-50 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.85)] cursor-default max-h-[90vh] flex flex-col"
              >
                {/* Header Section */}
                <div className="relative p-6 border-b border-zinc-900 bg-gradient-to-r from-purple-950/20 via-blue-950/20 to-zinc-950 flex justify-between items-center shrink-0">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r border ${getCategoryColor(selectedProject.category)}`}>
                        {selectedProject.category}
                      </span>
                      {selectedProject.featured && (
                        <span className="flex items-center gap-0.5 bg-yellow-500/10 border border-yellow-500/30 text-[9px] font-black text-yellow-500 px-2 py-0.5 rounded-full">
                          <Star size={9} className="fill-yellow-500 text-yellow-500 animate-pulse" /> Featured
                        </span>
                      )}
                      {getStatusBadge(selectedProject.status)}
                    </div>
                    <h2 className="text-2xl font-black text-white">{selectedProject.title}</h2>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="p-2.5 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Navigation Tab Bar */}
                <div className="flex border-b border-zinc-900 bg-zinc-950/50 px-6 shrink-0 gap-2 overflow-x-auto scrollbar-none py-2">
                  <button
                    onClick={() => setModalTab('overview')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      modalTab === 'overview'
                        ? 'bg-zinc-900 border border-zinc-800 text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Info size={14} /> Overview Specifications
                  </button>
                  <button
                    onClick={() => setModalTab('media')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      modalTab === 'media'
                        ? 'bg-zinc-900 border border-zinc-800 text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <ImageIcon size={14} /> Demonstration & Gallery
                  </button>
                  <button
                    onClick={() => setModalTab('story')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      modalTab === 'story'
                        ? 'bg-zinc-900 border border-zinc-800 text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <BookOpen size={14} /> Project Story Blueprint
                  </button>
                </div>

                {/* Body Content - Scrollable container */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1 min-h-0 space-y-6">
                  
                  {/* TAB 1: OVERVIEW */}
                  {modalTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      
                      {/* Metric Specifications Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl flex flex-col justify-center gap-1">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1"><Clock size={12} /> Duration</span>
                          <span className="text-xs text-white font-extrabold mt-0.5">{selectedProject.duration || '2 months'}</span>
                        </div>
                        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl flex flex-col justify-center gap-1">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1"><Users size={12} /> Team Size</span>
                          <span className="text-xs text-white font-extrabold mt-0.5">
                            {selectedProject.teamSize === 1 ? '1 member (Solo)' : `${selectedProject.teamSize || 1} members`}
                          </span>
                        </div>
                        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl flex flex-col justify-center gap-1">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1"><Layers size={12} /> Level</span>
                          <span className="text-xs text-white font-extrabold mt-0.5">{selectedProject.difficulty || 'Intermediate'}</span>
                        </div>
                        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl flex flex-col justify-center gap-1">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1"><Info size={12} /> Scope</span>
                          <span className="text-xs text-zinc-300 font-bold mt-0.5 truncate">{selectedProject.category}</span>
                        </div>
                      </div>

                      {/* Main Long Description */}
                      <div className="space-y-2">
                        <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Concept Summary & Tech Scope</h4>
                        <p className="text-zinc-300 text-sm leading-relaxed">
                          {selectedProject.longDescription}
                        </p>
                      </div>

                      {/* Tech stack tags cloud */}
                      <div className="space-y-3 bg-zinc-900/20 p-5 rounded-2xl border border-zinc-900">
                        <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Database size={13} className="text-purple-400" /> Technology Ecosystem Stack
                        </h4>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {selectedProject.tech.map((t) => (
                            <span 
                              key={t} 
                              className="text-xs font-semibold px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg hover:border-purple-500/20 hover:text-purple-300 transition-colors cursor-default"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Call to Actions & Links */}
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-900">
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('link_click', { linkType: 'github', projectId: selectedProject.id })}
                        >
                          <Button variant="secondary" className="cursor-pointer">
                            <Github size={16} /> Repository Code
                          </Button>
                        </a>
                        
                        {selectedProject.live !== '#' && selectedProject.live !== '' && (
                          <a 
                            href={selectedProject.live} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('link_click', { linkType: 'live_demo', projectId: selectedProject.id })}
                          >
                            <Button variant="glow" className="cursor-pointer">
                              <ExternalLink size={16} /> Live Simulation
                            </Button>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: DEMONSTRATION & GALLERY */}
                  {modalTab === 'media' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      
                      {/* Video / GIF Uploader View */}
                      {selectedProject.video ? (
                        <div className="space-y-2">
                          <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <Play size={13} className="text-purple-400 animate-pulse" /> Live Execution Video Demo
                          </h4>
                          <div className="w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-850 shadow-inner flex justify-center items-center">
                            {selectedProject.video.includes('<iframe') ? (
                              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedProject.video, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'src'] }) }} className="w-full aspect-video" />
                            ) : selectedProject.video.startsWith('data:video') || selectedProject.video.endsWith('.mp4') || selectedProject.video.endsWith('.webm') ? (
                              <video 
                                src={selectedProject.video} 
                                controls 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-auto max-h-[380px] object-contain bg-black" 
                              />
                            ) : (
                              // GIF or static URL fallback
                              <img loading="lazy" 
                                src={selectedProject.video} 
                                alt="Demo video placeholder" 
                                className="w-full h-auto max-h-[380px] object-contain bg-black" 
                              />
                            )}
                          </div>
                        </div>
                      ) : null}

                      {/* Screenshot Slider Section */}
                      {selectedProject.screenshots && selectedProject.screenshots.length > 0 ? (
                        <div className="space-y-3">
                          <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <ImageIcon size={13} className="text-purple-400" /> Interface Screenshots
                          </h4>

                          {/* Slider Window */}
                          <div className="relative aspect-[16/10] bg-black/90 border border-zinc-900 rounded-2xl overflow-hidden flex items-center justify-center group/slider">
                            <img loading="lazy" 
                              src={selectedProject.screenshots[screenshotIdx]} 
                              alt={`Screenshot ${screenshotIdx + 1}`} 
                              className="w-full h-full object-contain" 
                            />

                            {/* Navigations buttons */}
                            {selectedProject.screenshots.length > 1 && (
                              <>
                                <button
                                  onClick={() => setScreenshotIdx((prev) => (prev - 1 + selectedProject.screenshots!.length) % selectedProject.screenshots!.length)}
                                  className="absolute left-4 p-2.5 bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-white rounded-xl cursor-pointer opacity-70 sm:opacity-0 group-hover/slider:opacity-100 transition-opacity"
                                >
                                  <ChevronLeft size={16} />
                                </button>
                                <button
                                  onClick={() => setScreenshotIdx((prev) => (prev + 1) % selectedProject.screenshots!.length)}
                                  className="absolute right-4 p-2.5 bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-white rounded-xl cursor-pointer opacity-70 sm:opacity-0 group-hover/slider:opacity-100 transition-opacity"
                                >
                                  <ChevronRight size={16} />
                                </button>
                              </>
                            )}

                            {/* Page count */}
                            <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-black/60 border border-zinc-800 text-[10px] text-zinc-400 rounded-lg">
                              {screenshotIdx + 1} / {selectedProject.screenshots.length}
                            </div>
                          </div>

                          {/* Mini Thumbnails list */}
                          {selectedProject.screenshots.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none">
                              {selectedProject.screenshots.map((screen, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => setScreenshotIdx(sIdx)}
                                  className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border transition-all ${
                                    sIdx === screenshotIdx
                                      ? 'border-purple-500 scale-[1.03] shadow-md shadow-purple-500/10'
                                      : 'border-zinc-850 hover:border-zinc-700 opacity-60 hover:opacity-100'
                                  }`}
                                >
                                  <img loading="lazy" src={screen} alt="Thumb" className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        !selectedProject.video && (
                          <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
                            <ImageIcon size={32} className="text-zinc-700" />
                            <p className="text-zinc-500 text-xs">No media demonstration assets uploaded for this project card.</p>
                          </div>
                        )
                      )}
                    </motion.div>
                  )}

                  {/* TAB 3: PROJECT STORY BLUEPRINT */}
                  {modalTab === 'story' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      
                      {/* Nested subtabs list */}
                      <div className="flex flex-wrap gap-1 bg-zinc-950 p-1 border border-zinc-900 rounded-2xl overflow-x-auto scrollbar-none">
                        {[
                          { key: 'problem', label: 'Problem Statement', icon: <AlertTriangle size={12} /> },
                          { key: 'solution', label: 'Proposed Solution', icon: <Compass size={12} /> },
                          { key: 'architecture', label: 'Architecture Topology', icon: <Cpu size={12} /> },
                          { key: 'challenges', label: 'Key Challenges', icon: <Layers size={12} /> },
                          { key: 'impact', label: 'Real-world Impact', icon: <TrendingUp size={12} /> },
                          { key: 'learning', label: 'Lessons Learned', icon: <BookOpen size={12} /> }
                        ].map((sub) => (
                          <button
                            key={sub.key}
                            onClick={() => setStorySubTab(sub.key as any)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all whitespace-nowrap ${
                              storySubTab === sub.key
                                ? 'bg-zinc-900 text-white border border-zinc-800 shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                            }`}
                          >
                            {sub.icon} {sub.label}
                          </button>
                        ))}
                      </div>

                      {/* Modular Content Display */}
                      <div className="min-h-[160px] p-6 bg-zinc-900/20 border border-zinc-900 rounded-2xl relative overflow-hidden">
                        
                        {/* PROBLEM */}
                        {storySubTab === 'problem' && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-400">
                              <AlertTriangle size={14} /> The Problem Statement
                            </div>
                            <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-rose-500/40 pl-4 py-1">
                              {selectedProject.story?.problem || 'No description provided.'}
                            </p>
                          </div>
                        )}

                        {/* SOLUTION */}
                        {storySubTab === 'solution' && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400">
                              <Compass size={14} /> The Programmatic Solution
                            </div>
                            <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-emerald-500/40 pl-4 py-1">
                              {selectedProject.story?.solution || 'No description provided.'}
                            </p>
                          </div>
                        )}

                        {/* ARCHITECTURE */}
                        {storySubTab === 'architecture' && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400">
                              <Cpu size={14} /> System Architecture Topology
                            </div>
                            <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-blue-500/40 pl-4 py-1">
                              {selectedProject.story?.architecture || 'No description provided.'}
                            </p>
                          </div>
                        )}

                        {/* CHALLENGES */}
                        {storySubTab === 'challenges' && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400">
                              <Layers size={14} /> Key Challenges & Workarounds
                            </div>
                            <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-amber-500/40 pl-4 py-1">
                              {selectedProject.story?.challenges || 'No description provided.'}
                            </p>
                          </div>
                        )}

                        {/* IMPACT */}
                        {storySubTab === 'impact' && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-400">
                              <TrendingUp size={14} /> Real-world Impact & Outcomes
                            </div>
                            <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-purple-500/40 pl-4 py-1">
                              {selectedProject.story?.impact || 'No description provided.'}
                            </p>
                          </div>
                        )}

                        {/* LEARNING */}
                        {storySubTab === 'learning' && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-teal-400">
                              <CheckCircle size={14} /> Lessons & Engineering Takeaways
                            </div>
                            <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-teal-500/40 pl-4 py-1">
                              {selectedProject.story?.learning || 'No description provided.'}
                            </p>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
