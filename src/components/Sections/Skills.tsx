'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import { 
  Database, Cloud, Cpu, Terminal, Users,
  X, ExternalLink, Calendar, Info
} from 'lucide-react';

interface SkillObject {
  name: string;
  level: number;
  years: number;
}

interface SkillsProps {
  skills: {
    backend: SkillObject[];
    cloud: SkillObject[];
    ai: SkillObject[];
    tools: SkillObject[];
    leadership: SkillObject[];
  };
  projects: any[];
  experience: any[];
  leadership: any[];
}

export default function Skills({ skills, projects, experience, leadership: leadershipData }: SkillsProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillObject | null>(null);
  const [activeCategoryName, setActiveCategoryName] = useState<string>('');

  // Escape key handler for modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedSkill) setSelectedSkill(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedSkill]);

  const categories = [
    {
      title: 'Backend Systems',
      icon: <Database size={20} />,
      items: skills.backend,
      color: 'rgba(168, 85, 247, 0.15)', // Purple
      textColor: 'text-purple-400',
      borderColor: 'group-hover:border-purple-500/20',
      pillBg: 'hover:bg-purple-950/20 hover:text-purple-300 hover:border-purple-500/30 shadow-purple-500/5',
    },
    {
      title: 'Cloud Engineering',
      icon: <Cloud size={20} />,
      items: skills.cloud,
      color: 'rgba(59, 130, 246, 0.15)', // Blue
      textColor: 'text-blue-400',
      borderColor: 'group-hover:border-blue-500/20',
      pillBg: 'hover:bg-blue-950/20 hover:text-blue-300 hover:border-blue-500/30 shadow-blue-500/5',
    },
    {
      title: 'Artificial Intelligence',
      icon: <Cpu size={20} />,
      items: skills.ai,
      color: 'rgba(217, 70, 239, 0.15)', // Pink
      textColor: 'text-pink-400',
      borderColor: 'group-hover:border-pink-500/20',
      pillBg: 'hover:bg-pink-950/20 hover:text-pink-300 hover:border-pink-500/30 shadow-pink-500/5',
    },
    {
      title: 'Developer Tools',
      icon: <Terminal size={20} />,
      items: skills.tools,
      color: 'rgba(34, 197, 94, 0.15)', // Green
      textColor: 'text-green-400',
      borderColor: 'group-hover:border-green-500/20',
      pillBg: 'hover:bg-green-950/20 hover:text-green-300 hover:border-green-500/30 shadow-green-500/5',
    },
    {
      title: 'Leadership & Strategy',
      icon: <Users size={20} />,
      items: skills.leadership,
      color: 'rgba(249, 115, 22, 0.15)', // Orange
      textColor: 'text-orange-400',
      borderColor: 'group-hover:border-orange-500/20',
      pillBg: 'hover:bg-orange-950/20 hover:text-orange-300 hover:border-orange-500/30 shadow-orange-500/5',
    },
  ];

  const handleOpenSkill = (skill: SkillObject, categoryTitle: string) => {
    setSelectedSkill(skill);
    setActiveCategoryName(categoryTitle);
  };

  const handleScrollTo = (elementId: string) => {
    setSelectedSkill(null);
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 250);
  };

  // Memoized cross-reference filters (prevents recomputing on every render)
  const selectedName = selectedSkill?.name?.toLowerCase() || '';

  const matchedProjects = useMemo(() => {
    if (!selectedName) return [];
    return projects.filter(p => p.tech?.some((t: string) => {
      const tl = t.toLowerCase();
      return tl === selectedName || tl.includes(selectedName) || selectedName.includes(tl);
    }));
  }, [selectedName, projects]);

  const matchedExperiences = useMemo(() => {
    if (!selectedName) return [];
    return experience.filter(e => e.tech?.some((t: string) => {
      const tl = t.toLowerCase();
      return tl === selectedName || tl.includes(selectedName) || selectedName.includes(tl);
    }));
  }, [selectedName, experience]);

  const matchedLeadership = useMemo(() => {
    if (!selectedName) return [];
    return leadershipData.filter(l => l.tech?.some((t: string) => {
      const tl = t.toLowerCase();
      return tl === selectedName || tl.includes(selectedName) || selectedName.includes(tl);
    }));
  }, [selectedName, leadershipData]);

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="container max-w-5xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-500">
            Expertise
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Skill Catalog & Capabilities
          </p>
        </div>

        {/* Skill Clouds Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card 
                glowColor={cat.color} 
                className={`h-full group hover:shadow-lg transition-all duration-300 ${cat.borderColor}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 ${cat.textColor} group-hover:scale-105 transition-transform`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-extrabold text-white text-base">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => {
                    const skillName = typeof skill === 'string' ? skill : skill.name;
                    const skillLevel = typeof skill === 'string' ? 80 : skill.level;

                    return (
                      <motion.button
                        key={skillName}
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 12 }}
                        onClick={() => handleOpenSkill(typeof skill === 'string' ? { name: skill, level: 80, years: 1 } : skill, cat.title)}
                        className={`px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs font-semibold text-zinc-400 cursor-pointer shadow-sm transition-all duration-300 flex items-center group/skill ${cat.pillBg}`}
                      >
                        {skillName}
                        <span className="text-[9px] bg-zinc-950/60 border border-zinc-850/80 text-zinc-500 font-bold px-1.5 py-0.5 rounded-md ml-1.5 group-hover/skill:text-purple-300 transition-colors">
                          {skillLevel}%
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Skill Detail Modal Overlay */}
        <AnimatePresence>
          {selectedSkill && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSkill(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
              />

              {/* Centered details box */}
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`Skill details: ${selectedSkill.name}`}
                initial={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }}
                animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }}
                transition={{ duration: 0.2 }}
                className="fixed top-1/2 left-1/2 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl z-50 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.85)] cursor-default p-6 space-y-5 flex flex-col max-h-[85vh]"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-black tracking-widest text-zinc-500">{activeCategoryName}</span>
                    <h3 className="text-2xl font-black text-white">{selectedSkill.name}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedSkill(null)}
                    className="p-1.5 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-850 text-zinc-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Proficiency Level visual scale */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Proficiency Level</span>
                    <span className="text-purple-400 font-black text-sm">{selectedSkill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 border border-zinc-850 rounded-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.45)]"
                    />
                  </div>
                </div>

                {/* Years of Usage */}
                <div className="flex items-center gap-2.5 bg-zinc-900/30 border border-zinc-900 p-3 rounded-xl">
                  <Calendar size={14} className="text-purple-400 shrink-0" />
                  <span className="text-xs text-zinc-300">
                    Application History: <strong className="text-white font-extrabold">{selectedSkill.years} {selectedSkill.years === 1 ? 'Year' : 'Years'}</strong>
                  </span>
                </div>

                {/* Dynamic Cross-Reference Lists */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">
                  
                  {/* Used in projects list */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-zinc-500 font-black uppercase tracking-wider block">Used in Projects ({matchedProjects.length})</span>
                    {matchedProjects.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => handleScrollTo('projects')}
                        className="flex items-center justify-between p-3 bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-850 hover:border-purple-500/20 rounded-xl transition-all cursor-pointer group/item"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] uppercase font-bold text-zinc-500 block">{p.category}</span>
                          <span className="text-xs font-extrabold text-white block mt-0.5 group-hover/item:text-purple-300 transition-colors truncate">{p.title}</span>
                        </div>
                        <ExternalLink size={12} className="text-zinc-500 group-hover/item:text-white transition-colors shrink-0" />
                      </div>
                    ))}
                    {matchedProjects.length === 0 && (
                      <span className="text-[11px] text-zinc-655 italic block pl-1">No cataloged projects use this skill.</span>
                    )}
                  </div>

                  {/* Applied in experiences/leadership list */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-zinc-500 font-black uppercase tracking-wider block">Applied in Experience ({matchedExperiences.length + matchedLeadership.length})</span>
                    
                    {/* Work Experiences */}
                    {matchedExperiences.map(e => (
                      <div 
                        key={e.id}
                        onClick={() => handleScrollTo('experience')}
                        className="flex items-center justify-between p-3 bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-850 hover:border-purple-500/20 rounded-xl transition-all cursor-pointer group/item"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] uppercase font-bold text-zinc-500 block">{e.role}</span>
                          <span className="text-xs font-extrabold text-white block mt-0.5 group-hover/item:text-purple-300 transition-colors truncate">{e.company}</span>
                        </div>
                        <ExternalLink size={12} className="text-zinc-500 group-hover/item:text-white transition-colors shrink-0" />
                      </div>
                    ))}

                    {/* Leadership Positions */}
                    {matchedLeadership.map(l => (
                      <div 
                        key={l.id}
                        onClick={() => handleScrollTo('leadership')}
                        className="flex items-center justify-between p-3 bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-850 hover:border-purple-500/20 rounded-xl transition-all cursor-pointer group/item"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] uppercase font-bold text-zinc-500 block">{l.role}</span>
                          <span className="text-xs font-extrabold text-white block mt-0.5 group-hover/item:text-purple-300 transition-colors truncate">{l.organization}</span>
                        </div>
                        <ExternalLink size={12} className="text-zinc-500 group-hover/item:text-white transition-colors shrink-0" />
                      </div>
                    ))}

                    {(matchedExperiences.length === 0 && matchedLeadership.length === 0) && (
                      <span className="text-[11px] text-zinc-655 italic block pl-1">No cataloged professional experiences apply this skill.</span>
                    )}
                  </div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
