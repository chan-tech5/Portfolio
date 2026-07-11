'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { GraduationCap, Code2, Compass, MapPin, Clock, Languages, CalendarCheck, Sparkles, Flame } from 'lucide-react';

interface AboutProps {
  about: {
    college: string;
    department: string;
    cgpa: string;
    corePassions: string;
    interests: string;
    location: string;
    facts?: {
      languages: string[];
      availability: {
        internship: boolean;
        fullTime: boolean;
        remote: boolean;
        hybrid?: boolean;
        relocation: boolean;
      };
      timezone: string;
      yearsCoding: string;
      openToOpportunities: boolean;
    };
    nowSection?: {
      title: string;
      focus: string[];
    };
  };
}

export default function About({ about }: AboutProps) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const facts = about.facts || {
    languages: ["English", "Tamil", "Hindi"],
    availability: { internship: true, fullTime: true, remote: true, hybrid: true, relocation: true },
    timezone: "IST (UTC+5:30)",
    yearsCoding: "3+ Years",
    openToOpportunities: true
  };

  const nowSection = about.nowSection || {
    title: "What I'm currently doing",
    focus: [
      "Building AI-powered applications",
      "Preparing for software engineering roles",
      "Leading CSI technical initiatives",
      "Exploring cloud-native architectures"
    ]
  };

  return (
    <section id="about" className="py-24 px-4 bg-zinc-950/40 relative">
      <div className="container max-w-5xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-purple-500">
            About Me
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            The Engineer & Communicator
          </p>
        </div>

        {/* Bento Grid Layout (3x2/3x3 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Academic Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <Card glowColor="rgba(59, 130, 246, 0.15)" className="h-full group">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 glow-blue">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    Academic Foundation
                  </h3>
                  <p className="text-zinc-400 text-sm font-semibold">
                    {about.college}
                  </p>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    B.Tech — {about.department}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Building a strong foundation in software engineering, algorithms, system design, and scalable backend development at St. Joseph's College of Engineering.
                  </p>
                </div>
                <div className="flex items-center justify-start sm:justify-end gap-4 border-l border-zinc-800 sm:pl-8 py-2">
                  <div className="text-left sm:text-right">
                    <h4 className="text-3xl font-black text-blue-400">{about.cgpa}</h4>
                    <p className="text-xs font-bold text-white mt-1">Cumulative GPA</p>
                    <p className="text-xs text-zinc-500">Scale of 10.00</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Location & Clock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Card glowColor="rgba(34, 197, 94, 0.15)" className="h-full flex flex-col justify-between group">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 glow-green">
                  <MapPin size={22} />
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold">
                  <Clock size={14} /> IST timezone
                </div>
              </div>

              <div className="my-6">
                <div className="text-3xl font-black text-white tracking-tight tabular-nums">
                  {time || '00:00:00 AM'}
                </div>
                <div className="text-zinc-400 text-sm font-semibold mt-1">
                  {about.location}
                </div>
              </div>

              <div className="text-xs text-green-400/80 font-medium">
                {facts.openToOpportunities ? '✓ Available for software & AI opportunities' : 'Involved in roles'}
              </div>
            </Card>
          </motion.div>

          {/* Card 3: Core Passions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card glowColor="rgba(168, 85, 247, 0.15)" className="h-full flex flex-col justify-between group">
              <div>
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 glow-purple mb-4 w-fit">
                  <Code2 size={22} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  Core Passions
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {about.corePassions}
                </p>
              </div>
              <div className="text-[10px] text-zinc-500 uppercase mt-4 tracking-wider">
                #BACKEND #AI #CLOUD #LEADERSHIP
              </div>
            </Card>
          </motion.div>

          {/* Card 4: Interests & Tech Scope */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="md:col-span-2"
          >
            <Card glowColor="rgba(217, 70, 239, 0.15)" className="h-full flex flex-col justify-between group">
              <div>
                <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 glow-pink mb-4 w-fit">
                  <Compass size={22} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                  Interests & Exploration
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {about.interests}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Docker Workflows', 'FastAPI Microservices', 'CI/CD Pipelines', 'Cloud Deployment', 'Generative Agents', 'Tech Symposia', 'Distributed Systems', 'DevOps', 'Open Source'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-pink-500/30 hover:text-pink-400 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Card 5: Personal Facts Panel (NEW) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2"
          >
            <Card glowColor="rgba(168, 85, 247, 0.12)" className="h-full group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 glow-purple">
                  <Languages size={20} />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  Professional Snapshot
                </h3>
              </div>

              {/* Grid of Micro-cards inside */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Languages Micro-card */}
                <div className="bg-black/30 border border-zinc-900 rounded-2xl p-4 space-y-2.5">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Languages spoken</span>
                  <div className="flex flex-wrap gap-1.5">
                    {facts.languages.map(lang => (
                      <span key={lang} className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md font-semibold">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability Micro-card */}
                <div className="bg-black/30 border border-zinc-900 rounded-2xl p-4 space-y-2 col-span-2">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Active Availability</span>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    {Object.entries(facts.availability)
                      .filter(([key]) => key !== 'relocation')
                      .map(([key, val]) => (
                      <div key={key} className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${val ? 'bg-green-500 shadow-[0_0_6px_#22c55e]' : 'bg-zinc-700'}`} />
                        <span className={`text-[10px] capitalize font-semibold ${val ? 'text-zinc-300' : 'text-zinc-600'}`}>
                          {key}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timezone / Exp Micro-card */}
                <div className="bg-black/30 border border-zinc-900 rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Experience Age</span>
                  <span className="text-sm font-black text-white pt-1">{facts.yearsCoding.replace(/coding/i, '').trim()} Building Software</span>
                </div>

                <div className="bg-black/30 border border-zinc-900 rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Work Timezone</span>
                  <span className="text-sm font-black text-white pt-1">{facts.timezone}</span>
                </div>

                <div className="bg-black/30 border border-zinc-900 rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Open to Relocation</span>
                  <span className={`text-sm font-black pt-1 ${facts.availability.relocation ? 'text-green-400' : 'text-zinc-500'}`}>
                    {facts.availability.relocation ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 6: "Now" Section (NEW) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Card glowColor="rgba(217, 70, 239, 0.15)" className="h-full flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 glow-pink">
                    <Flame size={20} className="animate-pulse" />
                  </div>
                  <span className="flex items-center gap-1 text-[9px] font-bold text-pink-400 uppercase tracking-wider bg-pink-950/20 border border-pink-800/30 px-2 py-0.5 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-pink-400 animate-ping" /> Live focus
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">
                  {nowSection.title}
                </h3>

                <ul className="space-y-3.5 pl-0 list-none">
                  {nowSection.focus.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-1.5 shadow-[0_0_6px_#d946ef]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
