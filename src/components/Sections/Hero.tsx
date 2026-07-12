'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';
import Button from '../ui/Button';
import { Mail, FileText, ArrowDown, Globe } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';

interface StatsProps {
  label: string;
  value: number;
  suffix?: string;
}

function StatCounter({ label, value, suffix = '' }: StatsProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2.5,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [count, value]);

  useEffect(() => {
    return rounded.on('change', (latest) => setDisplayVal(latest));
  }, [rounded]);

  return (
    <div className="glass p-4 rounded-xl flex flex-col items-center justify-center text-center border-white/5 hover:border-purple-500/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300">
      <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
        {displayVal}
        {suffix}
      </span>
      <span className="text-[10px] md:text-xs font-medium text-zinc-500 uppercase mt-1 tracking-wider">
        {label}
      </span>
    </div>
  );
}

interface HeroProps {
  personal: {
    name: string;
    taglines: string[];
    socials: {
      github: string;
      linkedin: string;
      email: string;
      resume: string;
    };
    stats: {
      certifications: number;
      projects: number;
      internships: number;
      leadership: number;
      impact: number;
    };
    heroMedia?: {
      profilePhoto: string;
      hoverPhoto: string;
      backgroundCover: string;
      resumePdf: string;
      profileShape: string;
      glowColor: string;
      effects: {
        floating: boolean;
        parallax: boolean;
        hoverRotate: boolean;
        neonBorder: boolean;
        spotlight: boolean;
      };
    };
    ctas?: Array<{
      id: string;
      label: string;
      url: string;
      variant: string;
    }>;
  };
}

export default function Hero({ personal }: HeroProps) {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Mouse tracking states for Parallax, Spotlight, and 3D skew
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0, rx: 0, ry: 0, px: 0, py: 0 });

  const media = personal.heroMedia || {
    profilePhoto: '/images/chandru_portrait.png',
    hoverPhoto: '',
    backgroundCover: '',
    resumePdf: '#',
    profileShape: 'rounded',
    glowColor: 'gradient',
    effects: { floating: true, parallax: true, hoverRotate: true, neonBorder: true, spotlight: true }
  };

  const ctasList = personal.ctas || [
    { id: 'cta_1', label: 'Contact Me', url: '#contact', variant: 'glow' },
    { id: 'cta_2', label: 'Resume', url: '#', variant: 'primary' }
  ];

  useEffect(() => {
    if (personal.taglines.length === 0) return;
    let timer: NodeJS.Timeout;
    const currentFullText = personal.taglines[taglineIndex] || '';

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText((prev) => currentFullText.substring(0, prev.length + 1));
        
        if (displayText === currentFullText) {
          setIsPaused(true);
          timer = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, 1500);
        } else {
          timer = setTimeout(handleTyping, 100);
        }
      } else {
        setDisplayText((prev) => currentFullText.substring(0, prev.length - 1));
        
        if (displayText === '') {
          setIsPaused(true);
          setIsDeleting(false);
          setTaglineIndex((prev) => (prev + 1) % personal.taglines.length);
          timer = setTimeout(() => {
            setIsPaused(false);
            handleTyping();
          }, 300);
        } else {
          timer = setTimeout(handleTyping, 50);
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, taglineIndex, personal.taglines]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    
    // Limits
    const rx = media.effects.hoverRotate ? ((y - cy) / cy) * -12 : 0;
    const ry = media.effects.hoverRotate ? ((x - cx) / cx) * 12 : 0;
    const px = media.effects.parallax ? ((x - cx) / cx) * 15 : 0;
    const py = media.effects.parallax ? ((y - cy) / cy) * 15 : 0;

    setMouseOffset({ x, y, rx, ry, px, py });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0, rx: 0, ry: 0, px: 0, py: 0 });
    setIsHovered(false);
  };

  // Helper classes for Shape
  const getShapeClass = () => {
    switch (media.profileShape) {
      case 'circle': return 'rounded-full';
      case 'square': return 'rounded-none';
      case 'glass': return 'rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md';
      case 'rounded':
      default:
        return 'rounded-[2.2rem]';
    }
  };

  // Helper classes for Glow
  const getGlowStyles = () => {
    switch (media.glowColor) {
      case 'purple':
        return 'from-purple-600 via-fuchsia-600 to-purple-800 opacity-20 group-hover:opacity-40 shadow-[0_0_50px_rgba(168,85,247,0.3)]';
      case 'blue':
        return 'from-blue-600 via-indigo-600 to-blue-800 opacity-20 group-hover:opacity-40 shadow-[0_0_50px_rgba(59,130,246,0.3)]';
      case 'gradient':
      default:
        return 'from-purple-600 via-pink-600 to-blue-600 opacity-20 group-hover:opacity-45 shadow-[0_0_60px_rgba(217,70,239,0.35)]';
    }
  };

  // Smart Icon Resolver for CTAs
  const renderCTAIcon = (label: string, url: string) => {
    const l = label.toLowerCase();
    const u = url.toLowerCase();
    
    if (l.includes('contact') || l.includes('mail') || u.includes('mailto')) {
      return <Mail size={16} />;
    }
    if (l.includes('resume') || l.includes('cv') || l.includes('pdf')) {
      return <FileText size={16} />;
    }
    if (l.includes('github') || u.includes('github')) {
      return <Github size={16} />;
    }
    if (l.includes('linkedin') || u.includes('linkedin')) {
      return <Linkedin size={16} />;
    }
    return <Globe size={16} />;
  };

  const handleCTAClick = (e: React.MouseEvent, url: string) => {
    if (url.startsWith('#')) {
      e.preventDefault();
      const el = document.getElementById(url.replace('#', ''));
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative flex flex-col justify-center items-center py-16 md:py-20 px-4 overflow-hidden grid-bg"
      style={{
        minHeight: 'calc(100dvh)',
        backgroundImage: media.backgroundCover ? `radial-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.95)), url(${media.backgroundCover})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background radial lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 z-10">
        
        {/* Left column: Text Narrative & CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs text-purple-400 font-semibold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Available for Opportunities
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Hey, I'm <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {personal.name}.
            </span>
          </h1>

          <div className="h-10 text-xl md:text-2xl font-semibold text-zinc-300">
            <span className={`pr-1 py-1 border-r-2 ${isPaused ? 'border-transparent' : 'typing-cursor border-purple-500'}`}>
              {displayText}
            </span>
          </div>

          <p className="text-zinc-400 max-w-md text-sm md:text-base leading-relaxed">
            Information Technology student building AI-powered applications, scalable backend systems, and cloud-native solutions while leading technical communities and innovation initiatives.
          </p>

          {/* Socials & Dynamic CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
            {ctasList.map((cta) => {
              const isAnchor = cta.url.startsWith('#');
              const isResumePlaceholder = cta.url === '#' && cta.label.toLowerCase().includes('resume');
              const finalUrl = isResumePlaceholder ? media.resumePdf : cta.url;

              return (
                <a 
                  key={cta.id}
                  href={finalUrl}
                  target={isAnchor ? undefined : '_blank'}
                  rel={isAnchor ? undefined : 'noopener noreferrer'}
                  onClick={(e) => handleCTAClick(e, finalUrl)}
                >
                  <Button variant={cta.variant as any}>
                    {renderCTAIcon(cta.label, finalUrl)}
                    {cta.label}
                  </Button>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Right column: Dynamic Media Frame */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsHovered(true)}
          style={{
            perspective: 1000,
          }}
          className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 select-none group"
        >
          {/* Glowing neon borders */}
          <div 
            className={`absolute -inset-1.5 ${getShapeClass()} bg-gradient-to-r transition duration-500 ${getGlowStyles()} ${
              media.effects.neonBorder ? 'border border-white/10' : ''
            }`} 
            style={{
              transform: `translate3d(${mouseOffset.px * 0.4}px, ${mouseOffset.py * 0.4}px, 0)`,
            }}
          />
          
          {/* Main Photo Frame */}
          <motion.div
            animate={media.effects.floating ? { y: [0, -8, 0] } : {}}
            transition={media.effects.floating ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : undefined}
            style={{
              transformStyle: 'preserve-3d',
              rotateX: mouseOffset.rx,
              rotateY: mouseOffset.ry,
              x: mouseOffset.px * 0.8,
              y: mouseOffset.py * 0.8,
              transition: isHovered ? 'none' : 'transform 0.5s ease-out',
            }}
            className={`relative w-full h-full ${getShapeClass()} overflow-hidden glass border-white/10 flex items-center justify-center`}
          >
            {/* Spotlight reflection */}
            {media.effects.spotlight && isHovered && (
              <div 
                className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(150px circle at ${mouseOffset.x}px ${mouseOffset.y}px, rgba(255,255,255,0.08), transparent 80%)`,
                }}
              />
            )}

            <Image
              src={isHovered && media.hoverPhoto ? media.hoverPhoto : media.profilePhoto}
              alt={personal.name}
              fill
              priority
              sizes="(max-width: 768px) 256px, 320px"
              className="object-cover object-center transition-all duration-300 ease-out"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Counter Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full container max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 mt-20 z-10"
      >
        <StatCounter label="Certifications" value={personal.stats.certifications} suffix="+" />
        <StatCounter label="AI/Web Projects" value={personal.stats.projects} />
        <StatCounter label="Internships" value={personal.stats.internships} />
        <StatCounter label="Leadership Roles" value={personal.stats.leadership} />
        <StatCounter label="Students Reached" value={personal.stats.impact} suffix="+" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 cursor-pointer text-zinc-500 hover:text-white transition-colors duration-200 z-10"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
