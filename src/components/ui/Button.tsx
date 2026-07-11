'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glow' | 'ghost';
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-white text-black font-semibold hover:bg-zinc-200 shadow-lg shadow-white/5 border border-white/20';
      case 'secondary':
        return 'glass text-white font-medium hover:bg-white/5 border border-white/10';
      case 'glow':
        return 'relative text-white font-semibold overflow-hidden border border-purple-500/30 bg-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:border-purple-400/50 transition-all duration-300';
      case 'ghost':
        return 'text-zinc-400 hover:text-white font-medium hover:bg-white/5';
      default:
        return '';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 text-sm transition-all duration-200 select-none ${getVariantStyles()} ${className}`}
      {...(props as any)}
    >
      {/* For glowing variant, add a subtle back glow */}
      {variant === 'glow' && (
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 opacity-50 hover:opacity-100 transition-opacity" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
