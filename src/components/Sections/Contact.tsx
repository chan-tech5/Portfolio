'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Mail, MapPin, Send, CheckCircle2, Copy, Check, Calendar, FileText, Download, AlertCircle } from 'lucide-react';
import { Github, Linkedin, Whatsapp, Twitter, Instagram } from '@/components/ui/BrandIcons';
import confetti from 'canvas-confetti';
import { trackEvent } from '@/utils/analytics';
import emailjs from '@emailjs/browser';
import portfolioData from '@/data/portfolio.json';

interface ContactProps {
  personal: {
    socials: {
      github: string;
      linkedin: string;
      email: string;
      whatsapp?: string;
      calendly?: string;
      twitter?: string;
      instagram?: string;
      resume?: string;
      resumeLabel?: string;
    };
    about: {
      location: string;
    };
  };
}

export default function Contact({ personal }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Check if EmailJS is configured
  const emailjsConfig = (portfolioData.settings as any)?.emailjs;
  const isEmailjsConfigured = emailjsConfig?.serviceId && emailjsConfig?.templateId && emailjsConfig?.publicKey;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personal.socials.email);
    setCopiedEmail(true);
    trackEvent('link_click', { linkType: 'email' });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setErrorMessage('');

    // If EmailJS not configured, fallback to mailto
    if (!isEmailjsConfigured) {
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
      window.open(`mailto:${personal.socials.email}?subject=${subject}&body=${body}`, '_blank');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Chandru S',
        },
        emailjsConfig.publicKey
      );

      setIsSubmitting(false);
      setIsSuccess(true);

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#3b82f6', '#d946ef'],
      });

      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage('Failed to send message. Please try emailing directly.');
      console.error('EmailJS error:', error);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 px-4 bg-zinc-950/20 relative">
      <div className="container max-w-5xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-purple-500">
            Connect
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Initiate Contact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block (col-span-5): Social Info Cards */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Card glowColor="rgba(59, 130, 246, 0.1)" className="p-6">
              <div className="space-y-4">
                <h3 className="font-extrabold text-white text-lg">Contact Channels</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Feel free to reach out via email or connect on professional networks. Whether you want to discuss backend scale, community building, or custom AI integrations — I am active and ready.
                </p>
              </div>

              <div className="space-y-3 mt-6">
                {/* Email link */}
                <a 
                  href={`mailto:${personal.socials.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-zinc-800 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Send Email</div>
                    <div className="text-xs font-bold text-zinc-300 group-hover:text-purple-300 transition-colors truncate">
                      {personal.socials.email}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                    className="p-3 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all shrink-0 ml-2"
                  >
                    {copiedEmail ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  </button>
                </a>

                {/* LinkedIn Link */}
                <a 
                  href={personal.socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('link_click', { linkType: 'linkedin' })}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-zinc-800 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                    <Linkedin size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">LinkedIn Profile</div>
                    <div className="text-xs font-bold text-zinc-300 group-hover:text-blue-300 transition-colors truncate">
                      {personal.socials.linkedin.split('/').filter(Boolean).pop() || 'linkedin'}
                    </div>
                  </div>
                </a>

                {/* Github Link */}
                <a 
                  href={personal.socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('link_click', { linkType: 'github' })}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-zinc-800 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-zinc-800 text-zinc-300 group-hover:scale-105 transition-transform shrink-0">
                    <Github size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">GitHub Portfolios</div>
                    <div className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors truncate">
                      {personal.socials.github.split('/').filter(Boolean).pop() || 'github'}
                    </div>
                  </div>
                </a>

                {/* WhatsApp Link */}
                {personal.socials.whatsapp && (
                  <a 
                    href={personal.socials.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('link_click', { linkType: 'whatsapp' })}
                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-zinc-800 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                      <Whatsapp size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">WhatsApp Message</div>
                      <div className="text-xs font-bold text-zinc-300 group-hover:text-emerald-300 transition-colors truncate">
                        Direct Chat Link
                      </div>
                    </div>
                  </a>
                )}

                {/* Twitter Link */}
                {personal.socials.twitter && (
                  <a 
                    href={personal.socials.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('link_click', { linkType: 'twitter' })}
                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-zinc-800 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform shrink-0">
                      <Twitter size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Twitter / X</div>
                      <div className="text-xs font-bold text-zinc-300 group-hover:text-sky-300 transition-colors truncate">
                        {personal.socials.twitter.split('/').filter(Boolean).pop() || 'twitter'}
                      </div>
                    </div>
                  </a>
                )}

                {/* Instagram Link */}
                {personal.socials.instagram && (
                  <a 
                    href={personal.socials.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('link_click', { linkType: 'instagram' })}
                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-zinc-800 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400 group-hover:scale-105 transition-transform shrink-0">
                      <Instagram size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Instagram</div>
                      <div className="text-xs font-bold text-zinc-300 group-hover:text-pink-300 transition-colors truncate">
                        {personal.socials.instagram.split('/').filter(Boolean).pop() || 'instagram'}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </Card>

            {/* Calendly Booking Card */}
            {personal.socials.calendly && (
              <Card glowColor="rgba(168, 85, 247, 0.15)" className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">Schedule a Meeting</h4>
                    <p className="text-[10px] text-zinc-500 leading-normal">
                      Pick a slot on my Calendly to discuss projects or opportunities.
                    </p>
                  </div>
                </div>
                <a
                  href={personal.socials.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('link_click', { linkType: 'calendly' })}
                  className="inline-flex items-center justify-center gap-2 w-full py-2 bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white rounded-xl transition-all shadow-lg hover:shadow-purple-500/20 active:scale-[0.98]"
                >
                  <Calendar size={12} /> Book Calendar Slot
                </a>
              </Card>
            )}

            {/* Resume Download Card */}
            {personal.socials.resume && personal.socials.resume !== '#' && (
              <Card glowColor="rgba(219, 70, 239, 0.15)" className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400 shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-extrabold text-white">Official Resume</h4>
                    <p className="text-[10px] text-zinc-500 leading-normal truncate">
                      {personal.socials.resumeLabel || 'Download Resume'} (PDF)
                    </p>
                  </div>
                </div>
                <a
                  href={personal.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('resume_download')}
                  className="inline-flex items-center justify-center gap-2 w-full py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-200 hover:text-white rounded-xl transition-all active:scale-[0.98]"
                >
                  <Download size={12} /> {personal.socials.resumeLabel || 'Download Resume'}
                </a>
              </Card>
            )}

            {/* Location Card */}
            <Card glowColor="rgba(34, 197, 94, 0.1)" className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-400 shrink-0">
                <MapPin size={16} />
              </div>
              <div className="text-xs">
                <span className="text-zinc-500">Operating from:</span> <span className="font-bold text-zinc-300">{personal.about.location}</span>
              </div>
            </Card>
          </div>

          {/* Right Block (col-span-7): Custom Interactive Contact Form */}
          <div className="md:col-span-7">
            <Card glowColor="rgba(168, 85, 247, 0.12)" className="h-full relative p-6">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 h-full flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <h3 className="font-extrabold text-white text-lg">Leave a Message</h3>
                      
                      {/* Name input */}
                      <div className="space-y-1">
                        <label htmlFor="name" className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Your Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500/20 transition-all"
                          placeholder="E.g., Chandru S"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1">
                        <label htmlFor="email" className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500/20 transition-all"
                          placeholder="E.g., developer@domain.com"
                        />
                      </div>

                      {/* Message input */}
                      <div className="space-y-1">
                        <label htmlFor="message" className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Message Content</label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
                          placeholder="Enter your inquiry details here..."
                        />
                      </div>
                    </div>

                    <div className="pt-4 mt-auto space-y-3">
                      {errorMessage && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
                          <AlertCircle size={14} />
                          {errorMessage}
                        </div>
                      )}
                      <Button 
                        type="submit" 
                        variant="glow" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>Dispatching Transmission...</>
                        ) : (
                          <>
                            <Send size={14} /> Send Message
                          </>
                        )}
                      </Button>
                      {!isEmailjsConfigured && (
                        <p className="text-[10px] text-zinc-600 text-center">
                          Opens your email client with the message pre-filled.
                        </p>
                      )}
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center glow-purple">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-xl font-black text-white">Transmission Successful</h3>
                    <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                      Thank you for your message! I will review and respond to your inquiry shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-purple-400 hover:text-white text-xs font-semibold underline pt-2 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Fallback: Direct Email */}
            <div className="mt-4 flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/50">
              <Mail size={12} className="text-zinc-500" />
              <span className="text-[11px] text-zinc-500">
                Prefer email directly?{' '}
                <a 
                  href={`mailto:${personal.socials.email}`} 
                  className="text-purple-400 hover:text-purple-300 font-bold transition-colors"
                >
                  {personal.socials.email}
                </a>
              </span>
                <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-500 hover:text-white transition-colors ml-1"
                title="Copy email"
              >
                {copiedEmail ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
