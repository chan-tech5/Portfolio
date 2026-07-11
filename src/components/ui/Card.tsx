'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverGlow?: boolean;
}

export default function Card({
  children,
  className = '',
  glowColor = 'rgba(168, 85, 247, 0.15)',
  hoverGlow = true,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty(
        '--mouse-x',
        `${e.clientX - rect.left}px`,
      );
      cardRef.current.style.setProperty(
        '--mouse-y',
        `${e.clientY - rect.top}px`,
      );
    },
    [],
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative overflow-hidden rounded-2xl glass transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Interactive mouse track shine glow */}
      {hoverGlow && isFocused && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      
      {/* Light border reflection glow */}
      {hoverGlow && (
        <div
          className={`absolute inset-px -z-10 rounded-2xl bg-black/60 transition-opacity duration-300`}
        />
      )}
      
      <div className="relative z-10 p-6 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
