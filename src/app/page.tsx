'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import portfolioData from '@/data/portfolio.json';
import ParticleCanvas from '@/components/ParticleCanvas';
import Hero from '@/components/Sections/Hero';
import About from '@/components/Sections/About';
import Timeline from '@/components/ui/Timeline';
import Experience from '@/components/Sections/Experience';
import Leadership from '@/components/Sections/Leadership';
import Projects from '@/components/Sections/Projects';
import Skills from '@/components/Sections/Skills';
import Certifications from '@/components/Sections/Certifications';
import Achievements from '@/components/Sections/Achievements';
import ActivityFeed from '@/components/Sections/ActivityFeed';
import MediaVault from '@/components/Sections/MediaVault';
import Contact from '@/components/Sections/Contact';
import CommandPalette from '@/components/CommandPalette';
import Link from 'next/link';
import { ShieldCheck, Menu, X, Mail, FileText, Command } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyticsTracker from '@/components/AnalyticsTracker';

// --- Utility: Filter published items (no drafts, no future-scheduled) ---
function filterPublished<T>(items: T[]): T[] {
  const now = new Date();
  return (items || []).filter(item => {
    const isDraft = (item as any).publishStatus === 'draft' || (item as any).status === 'draft';
    const isFuture = (item as any).publishedAt && new Date((item as any).publishedAt) > now;
    return !isDraft && !isFuture;
  });
}

// --- Magnetic Social Dock Icon ---
const MagneticSocialIcon = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    const factor = 0.35;
    setPosition({ x: x * factor, y: y * factor });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={label}
      className="relative w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors group cursor-pointer"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 180, damping: 12, mass: 0.1 }}
        className="flex items-center justify-center"
      >
        <Icon size={16} />
      </motion.div>
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      {/* Expanding radial glow ripple */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileHover={{ scale: 1.8, opacity: 0.18 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`
        }}
      />
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none select-none">
        {label}
      </span>
    </a>
  );
};

// --- Rotating Typewriter Quotes ---
const FOOTER_QUOTES = [
  "Building what's next.",
  "Turning ideas into systems.",
  "Code. Community. Impact."
];

const RotatingQuote = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullQuote = FOOTER_QUOTES[index];
    
    if (!isDeleting) {
      if (displayedText.length < currentFullQuote.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullQuote.slice(0, displayedText.length + 1));
        }, 60);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2500);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
      } else {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % FOOTER_QUOTES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, index]);

  return (
    <div className="h-6 flex items-center justify-center">
      <p
        className="text-[10px] font-black tracking-widest uppercase text-zinc-400 select-none text-center"
        style={{ textShadow: '0 0 10px rgba(255,255,255,0.05)' }}
        aria-live="polite"
      >
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          className="ml-0.5 inline-block w-1.5 h-3 bg-purple-500 align-middle"
          style={{ backgroundColor: 'var(--primary)' }}
        />
      </p>
    </div>
  );
};

// --- Footer Component (isolated to prevent mouse-tracking re-renders) ---
const PortfolioFooter = ({ selectedAccent }: { selectedAccent: { primary: string; accent: string } }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFooterHovered, setIsFooterHovered] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleFooterMouseMove = (e: React.MouseEvent) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleFooterMouseMove}
      onMouseEnter={() => setIsFooterHovered(true)}
      onMouseLeave={() => setIsFooterHovered(false)}
      className="relative border-t border-zinc-900/40 bg-black/80 py-16 px-6 overflow-hidden text-xs text-zinc-500"
    >
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Ambient Moving Glows */}
      <div className="absolute -top-40 left-1/4 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 right-1/4 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Cursor-Reactive Spotlight Glow */}
      {isFooterHovered && (
        <motion.div
          className="absolute w-[250px] h-[250px] rounded-full pointer-events-none blur-[70px] -z-10"
          animate={{
            x: mousePos.x - 125,
            y: mousePos.y - 125,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
          style={{
            background: `radial-gradient(circle, ${selectedAccent.primary}0d 0%, transparent 70%)`
          }}
        />
      )}

      {/* Thin Animated Pulsing Divider Line */}
      <div className="container max-w-5xl mx-auto w-full relative h-[1.5px] mb-12 overflow-hidden bg-zinc-900">
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
            boxShadow: [
              "0 0 1px var(--primary)",
              "0 0 6px var(--primary)",
              "0 0 1px var(--primary)",
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: 'var(--primary)' }}
        />
      </div>

      <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-10 md:gap-6 relative z-10">
        
        {/* Identity Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <Link 
            href="/"
            className="font-black text-lg tracking-tight hover:opacity-85 transition-opacity cursor-pointer select-none"
          >
            CHANDRU<span className="font-extrabold transition-colors duration-300" style={{ color: 'var(--primary)' }}>.S</span>
          </Link>
          <p className="text-[11px] text-zinc-400 font-medium max-w-xs leading-relaxed">
            Building scalable systems & meaningful tech communities.
          </p>
          <div className="flex items-center flex-wrap justify-center md:justify-start gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1 select-none">
            <ShieldCheck size={13} style={{ color: 'var(--primary)' }} /> Developer Portfolio
            <span className="text-zinc-800 font-normal">•</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Last updated: {(() => {
              const dateStr = (portfolioData.settings as any)?.lastUpdated;
              if (!dateStr) return 'May 2026';
              try {
                const date = new Date(dateStr);
                return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
              } catch {
                return 'May 2026';
              }
            })()}</span>
          </div>
        </div>

        {/* Quote Column */}
        <div className="relative py-4 flex flex-col items-center justify-center">
          {/* Ultra Subtle Animated Glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="absolute w-[180px] h-[55px] rounded-full blur-[35px] pointer-events-none -z-10"
            style={{
              background: `radial-gradient(circle, var(--primary) 15%, transparent 70%)`
            }}
          />
          <RotatingQuote />
        </div>

        {/* Social Dock Column */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-3">
            <MagneticSocialIcon 
              href={portfolioData.personal.socials.github} 
              icon={Github} 
              label="GitHub" 
            />
            <MagneticSocialIcon 
              href={portfolioData.personal.socials.linkedin} 
              icon={Linkedin} 
              label="LinkedIn" 
            />
            <MagneticSocialIcon 
              href={`mailto:${portfolioData.personal.socials.email}`} 
              icon={Mail} 
              label="Email" 
            />
            <MagneticSocialIcon 
              href={
                portfolioData.personal.socials.resume && portfolioData.personal.socials.resume !== '#'
                  ? portfolioData.personal.socials.resume
                  : portfolioData.personal.ctas.find((c: any) => c.label.toLowerCase().includes('resume'))?.url || '#'
              } 
              icon={FileText} 
              label="Resume" 
            />
          </div>
          
          <div className="flex items-center gap-4 text-[10px] uppercase font-extrabold tracking-widest">
            <span className="text-zinc-600">
              © {new Date().getFullYear()} Chandru S. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// Main Home Component
// ============================================
export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // --- Memoized filtered data (prevents recomputation on every render) ---
  const filteredTimeline = useMemo(() => filterPublished(portfolioData.timeline || []), []);
  const filteredExperience = useMemo(() => filterPublished(portfolioData.experience || []), []);
  const filteredLeadership = useMemo(() => filterPublished(portfolioData.leadership || []), []);
  const filteredProjects = useMemo(() => filterPublished(portfolioData.projects || []), []);
  const filteredCertifications = useMemo(() => filterPublished(portfolioData.certifications || []), []);
  const filteredAchievements = useMemo(() => filterPublished(portfolioData.achievements || []), []);
  const filteredUpdates = useMemo(() => filterPublished(portfolioData.updates || []), []);
  const filteredMedia = useMemo(() => filterPublished(portfolioData.media || []), []);

  // --- Scroll-spy IntersectionObserver ---
  useEffect(() => {
    const sections = ['about', 'journey', 'experience', 'leadership', 'projects', 'skills', 'credentials', 'updates', 'gallery', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // --- Ctrl+K Command Palette ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- Smooth scroll helper (bypasses basePath hash issues) ---
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = document.querySelector('header')?.offsetHeight ?? 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'about', label: 'About', visibilityKey: 'about' },
    { id: 'journey', label: 'Journey', visibilityKey: 'timeline' },
    { id: 'experience', label: 'Experience', visibilityKey: 'experience' },
    { id: 'projects', label: 'Projects', visibilityKey: 'projects' },
    { id: 'skills', label: 'Skills', visibilityKey: 'skills' },
    { id: 'credentials', label: 'Credentials', visibilityKey: 'credentials' },
    { id: 'updates', label: 'Updates', visibilityKey: 'updates' },
    { id: 'gallery', label: 'Gallery', visibilityKey: 'gallery' },
  ].filter(link => {
    return (portfolioData.settings as any)?.visibility?.[link.visibilityKey] ?? true;
  });

  // --- Maintenance Mode ---
  if (portfolioData.settings?.maintenanceMode) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative">
        <ParticleCanvas />
        <div className="max-w-md w-full text-center space-y-6 z-10 glass p-8 rounded-3xl border-white/5">
          <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mx-auto animate-bounce">
            <ShieldCheck size={36} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight">System Under Maintenance</h1>
            <p className="text-zinc-400 text-xs leading-relaxed">
              We&apos;re currently updating Chandru S&apos;s portfolio workspace. Please check back in a few minutes.
            </p>
          </div>
          <div className="pt-4 border-t border-zinc-900">
            <Link href="/workspace" className="text-[10px] uppercase font-extrabold tracking-widest text-purple-400 hover:text-purple-300 transition-colors">
              Access CMS Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // --- Accent Color System ---
  const accent = portfolioData.settings?.theme?.accentColor || 'purple';
  const accentColors = {
    purple: { primary: '#a855f7', ring: '#a855f7', accent: '#d946ef' },
    blue: { primary: '#3b82f6', ring: '#3b82f6', accent: '#06b6d4' },
    emerald: { primary: '#10b981', ring: '#10b981', accent: '#14b8a6' },
    pink: { primary: '#ec4899', ring: '#ec4899', accent: '#f43f5e' },
  };
  const selectedAccent = accentColors[accent as keyof typeof accentColors] || accentColors.purple;

  return (
    <main
      className="relative min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-purple-200"
      style={{
        '--primary': selectedAccent.primary,
        '--ring': selectedAccent.ring,
        '--accent': selectedAccent.accent,
      } as React.CSSProperties}
    >
      {/* Client-side analytics tracker */}
      <AnalyticsTracker />

      {/* 60FPS Ambient Particle constellation backdrop */}
      <ParticleCanvas />

      {/* Command Palette */}
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />

      {/* Floating Glass Header */}
      <header className="sticky top-0 z-40 w-full glass border-b border-white/5 backdrop-blur-md">
        <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            href="/"
            className="font-black text-lg tracking-tight hover:opacity-85 transition-opacity select-none"
          >
            CHANDRU<span className="font-extrabold transition-colors duration-300" style={{ color: 'var(--primary)' }}>.S</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-200 z-10 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{ boxShadow: `0 0 15px ${selectedAccent.primary}26` }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Ctrl+K hint */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[10px] font-bold text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-colors cursor-pointer"
              aria-label="Open quick actions"
            >
              <Command size={11} />
              <span className="tracking-wider">K</span>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="hidden md:inline-block px-3.5 py-1.5 rounded-lg bg-white text-black text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
            >
              Contact
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 z-30 md:hidden bg-black/98 border-b border-white/10 backdrop-blur-2xl px-4 py-5 flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-64px)]"
            >
              <nav className="flex flex-col gap-1 text-sm font-semibold uppercase tracking-wider text-zinc-400" aria-label="Mobile navigation">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => {
                        scrollToSection(link.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left py-3 px-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'text-white bg-white/5 font-extrabold border-l-2' 
                          : 'hover:text-white hover:translate-x-1'
                      }`}
                      style={isActive ? { borderLeftColor: 'var(--primary)' } : {}}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </nav>
              
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <button
                  onClick={() => {
                    scrollToSection('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <Hero personal={portfolioData.personal} />

      {/* About Bento Grid */}
      {((portfolioData.settings as any)?.visibility?.about ?? true) && (
        <About about={portfolioData.personal.about} />
      )}

      {/* Timeline Section */}
      {((portfolioData.settings as any)?.visibility?.timeline ?? true) && (
        <section id="journey" className="py-12 md:py-24 px-4 bg-zinc-950/20 relative">
          <div className="container max-w-5xl mx-auto space-y-8 md:space-y-12">
            <div className="text-center md:text-left space-y-3">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-500">
                Narrative
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                My Journey Timeline
              </p>
            </div>
            <Timeline items={filteredTimeline} />
          </div>
        </section>
      )}

      {/* Experience Section */}
      {((portfolioData.settings as any)?.visibility?.experience ?? true) && (
        <Experience experience={filteredExperience} />
      )}

      {/* Leadership Section */}
      {((portfolioData.settings as any)?.visibility?.leadership ?? true) && (
        <Leadership leadership={filteredLeadership} />
      )}

      {/* Projects Grid Section */}
      {((portfolioData.settings as any)?.visibility?.projects ?? true) && (
        <Projects projects={filteredProjects} />
      )}

      {/* Skills Catalog */}
      {((portfolioData.settings as any)?.visibility?.skills ?? true) && (
        <Skills 
          skills={portfolioData.skills} 
          projects={filteredProjects} 
          experience={filteredExperience} 
          leadership={filteredLeadership}
        />
      )}

      {/* Certifications & Badges */}
      {((portfolioData.settings as any)?.visibility?.credentials ?? true) && (
        <Certifications certifications={filteredCertifications} />
      )}

      {/* Achievements */}
      {((portfolioData.settings as any)?.visibility?.achievements ?? true) && (
        <Achievements achievements={filteredAchievements} />
      )}

      {/* Activity Updates */}
      {((portfolioData.settings as any)?.visibility?.updates ?? true) && (
        <ActivityFeed updates={filteredUpdates} />
      )}

      {/* Life Gallery / Media Vault */}
      {((portfolioData.settings as any)?.visibility?.gallery ?? true) && (
        <MediaVault media={filteredMedia} />
      )}

      {/* Contact Forms */}
      <Contact personal={portfolioData.personal} />

      {/* Premium Developer Footer (isolated component) */}
      <PortfolioFooter selectedAccent={selectedAccent} />
    </main>
  );
}
