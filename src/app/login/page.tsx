'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Eye, EyeOff, ArrowRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from '@/components/ParticleCanvas';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);

  useEffect(() => {
    if (lockoutTime && lockoutTime > 0) {
      const timer = setTimeout(() => {
        setLockoutTime(lockoutTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (lockoutTime === 0) {
      setLockoutTime(null);
      setError(null);
    }
  }, [lockoutTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Success: Redirect to workspace dashboard
        router.push('/workspace');
      } else {
        setError(data.error || "Authentication failed");
        if (data.locked && data.remainingTime) {
          setLockoutTime(data.remainingTime);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Network or system error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono select-none">
      <ParticleCanvas />
      
      {/* Retro monitor scanline effect overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-20" />

      {/* Main glass card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full z-10 glass p-8 rounded-3xl border border-white/5 shadow-[0_0_50px_rgba(255,255,255,0.02)] relative"
      >
        <div className="text-center space-y-6">
          {/* Animated Shield Logo */}
          <motion.div 
            animate={{ 
              boxShadow: [
                "0 0 10px rgba(168,85,247,0.05)",
                "0 0 25px rgba(168,85,247,0.2)",
                "0 0 10px rgba(168,85,247,0.05)"
              ]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mx-auto"
          >
            <ShieldCheck size={36} className="animate-pulse" />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-base font-black tracking-widest uppercase text-zinc-200">
              AUTHENTICATE WORKSPACE
            </h1>
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-wider">
              Restricted creator environment. Authorized access only.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">
                Security Passphrase
              </label>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">
                  Secure Node
                </span>
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
                <Lock size={14} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                disabled={loading || lockoutTime !== null}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-zinc-950/80 border border-zinc-900 focus:border-purple-500/40 rounded-xl outline-none focus:ring-0 text-xs text-zinc-300 font-mono transition-all duration-300 placeholder:text-zinc-700 focus:text-white"
                placeholder="Enter workspace key..."
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Feedback Area */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[10px] font-bold text-red-400 bg-red-950/20 border border-red-900/30 px-4 py-2.5 rounded-xl uppercase tracking-wider flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping animate-duration-1000 shrink-0" />
                <span className="flex-1 leading-normal">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || lockoutTime !== null || !password}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-500 font-bold uppercase tracking-widest text-[10px] transition-all disabled:opacity-40 disabled:cursor-not-allowed select-none shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-2.5 h-2.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Verifying Key...
              </>
            ) : lockoutTime !== null ? (
              `Locked (${lockoutTime}s)`
            ) : (
              <>
                Initialize Studio
                <ArrowRight size={12} />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 pt-4 border-t border-zinc-900 text-center">
          <Link href="/" className="text-[9px] uppercase font-bold tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors">
            ← Return to main node
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
