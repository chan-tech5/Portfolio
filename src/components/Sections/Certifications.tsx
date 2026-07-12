'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import { ExternalLink, Eye } from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  icon: string;
  verificationProof?: string;
  certImage?: string;
  verificationUrl?: string;
  credentialId?: string;
  expiryDate?: string;
  skillsEarned?: string[];
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  if (dateStr.includes('-')) {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
  }
  return dateStr;
};

/**
 * Returns:
 *  'active'  – no expiry OR expiry date is in the future
 *  'expired' – expiry date is today or in the past
 *  'none'    – no expiry date info at all (don't show any badge)
 */
const getActiveStatus = (expiryDate?: string): 'active' | 'expired' | 'none' => {
  if (!expiryDate) return 'none';
  if (expiryDate === 'No Expiration') return 'active';
  // Parse the date string (expected format: YYYY-MM-DD from the date picker)
  const expiry = new Date(expiryDate);
  if (isNaN(expiry.getTime())) return 'none';
  const today = new Date();
  today.setHours(0, 0, 0, 0); // compare date only, not time
  return expiry >= today ? 'active' : 'expired';
};

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const [selectedProof, setSelectedProof] = useState<{ name: string; proof: string } | null>(null);

  return (
    <section id="credentials" className="py-12 md:py-24 px-4 bg-zinc-950/40 relative">
      <div className="container max-w-5xl mx-auto space-y-12">
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-purple-500">
            Credentials
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Professional Certifications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                glowColor="rgba(168, 85, 247, 0.15)"
                className="h-full flex flex-col justify-between group hover:border-purple-500/30 p-6 relative bg-zinc-900/40 border border-white/5"
              >
                <div className="space-y-5">
                  {/* Logo or Emoji */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                      {cert.certImage ? (
                        <img loading="lazy" src={cert.certImage} alt={cert.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">{cert.icon}</span>
                      )}
                    </div>
                    {getActiveStatus(cert.expiryDate) === 'active' && (
                      <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Active
                      </span>
                    )}
                    {getActiveStatus(cert.expiryDate) === 'expired' && (
                      <span className="text-[9px] font-extrabold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Expired
                      </span>
                    )}
                  </div>

                  {/* Cert details */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-purple-300 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-zinc-400 text-xs font-semibold">
                      {cert.issuer}
                    </p>
                    {cert.credentialId && (
                      <p className="text-[10px] text-zinc-500 font-mono">
                        ID: {cert.credentialId}
                      </p>
                    )}
                    <div className="text-[10px] text-zinc-500 font-medium">
                      <span>Issued: {formatDate(cert.date)}</span>
                      {cert.expiryDate && cert.expiryDate !== 'No Expiration' && (
                        <span> • Expires: {formatDate(cert.expiryDate)}</span>
                      )}
                    </div>
                  </div>

                  {/* Skills tags */}
                  {cert.skillsEarned && cert.skillsEarned.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {cert.skillsEarned.map((skill, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="text-[9px] font-bold text-zinc-350 bg-zinc-950 border border-zinc-850 px-2 py-0.5 rounded-md hover:border-purple-500/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="mt-6 pt-4 border-t border-zinc-950 flex gap-2">
                  {cert.verificationProof && (
                    <button
                      onClick={() => setSelectedProof({ name: cert.name, proof: cert.verificationProof! })}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-350 hover:text-white font-bold text-xs rounded-xl border border-purple-500/20 hover:border-purple-500/30 transition-all cursor-pointer"
                    >
                      <Eye size={12} /> View PDF
                    </button>
                  )}
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white font-bold text-xs rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer text-center"
                    >
                      <ExternalLink size={12} /> Verify Link
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / PDF Modal */}
      <AnimatePresence>
        {selectedProof && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProof(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
            />
            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl h-[80vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md">
                <h3 className="font-extrabold text-white text-xs sm:text-sm line-clamp-1">
                  {selectedProof.name} - Certificate Proof
                </h3>
                <button
                  onClick={() => setSelectedProof(null)}
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
              {/* Preview body */}
              <div className="flex-1 bg-zinc-900 overflow-auto flex items-center justify-center p-4">
                {selectedProof.proof.startsWith('data:application/pdf') ? (
                  <object
                    data={selectedProof.proof}
                    type="application/pdf"
                    className="w-full h-full rounded-xl"
                  >
                    <div className="text-center p-6 space-y-3">
                      <p className="text-zinc-400 text-xs">Your browser doesn't support embedding PDFs directly.</p>
                      <a
                        href={selectedProof.proof}
                        download={`${selectedProof.name.replace(/\s+/g, '_')}_Certificate.pdf`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl"
                      >
                        Download PDF
                      </a>
                    </div>
                  </object>
                ) : (
                  <img
                    src={selectedProof.proof}
                    alt={selectedProof.name}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-lg border border-white/5"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
