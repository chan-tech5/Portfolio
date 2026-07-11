'use client';
import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FolderOpen, Briefcase, Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';
import portfolioData from '@/data/portfolio.json';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  action: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleEscape]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const actions: QuickAction[] = [
    {
      icon: <FileText size={18} />,
      label: 'Open Resume',
      action: () => window.open(portfolioData.personal.socials.resume, '_blank'),
    },
    {
      icon: <Github size={18} />,
      label: 'View GitHub',
      action: () => window.open(portfolioData.personal.socials.github, '_blank'),
    },
    {
      icon: <FolderOpen size={18} />,
      label: 'Go to Projects',
      hint: '#projects',
      action: () => scrollTo('projects'),
    },
    {
      icon: <Briefcase size={18} />,
      label: 'Go to Experience',
      hint: '#experience',
      action: () => scrollTo('experience'),
    },
    {
      icon: <Mail size={18} />,
      label: 'Contact Me',
      hint: '#contact',
      action: () => scrollTo('contact'),
    },
    {
      icon: <Linkedin size={18} />,
      label: 'Open LinkedIn',
      action: () => window.open(portfolioData.personal.socials.linkedin, '_blank'),
    },
  ];

  const handleAction = (action: QuickAction) => {
    action.action();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
            }}
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <h3 className="text-sm font-semibold text-white tracking-wide">
                Quick Actions
              </h3>
              <span className="text-xs text-zinc-500">ESC to close</span>
            </div>

            {/* Actions list */}
            <div className="px-2 pb-2">
              {actions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAction(item)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors group"
                >
                  <span className="text-zinc-500 group-hover:text-purple-400 transition-colors">
                    {item.icon}
                  </span>
                  <span className="flex-1 text-sm text-left">{item.label}</span>
                  {item.hint && (
                    <span className="text-xs text-zinc-600 font-mono">
                      {item.hint}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
