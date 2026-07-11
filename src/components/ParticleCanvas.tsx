'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Reduce particle count on mobile; further reduce if reduced motion preferred
    const maxParticles = prefersReducedMotion
      ? 20
      : window.innerWidth < 768
        ? 30
        : 60;

    const connectionDistance = 120;
    const disableConnections = prefersReducedMotion;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
        targetAlpha: Math.random() * 0.5 + 0.1,
      });
    }

    // Pre-compute reusable gradient color strings
    const colorPurple = '168, 85, 247';
    const colorBlue = '59, 130, 246';

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      // Skip animation frame when tab is hidden
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid pattern (subtle backup in canvas)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.005)';
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((p, idx) => {
        // Linear interpolation for alpha animation (twinkling)
        p.alpha += (p.targetAlpha - p.alpha) * 0.01;
        if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
          p.targetAlpha = Math.random() * 0.6 + 0.1;
        }

        // Float motion
        p.x += p.vx;
        p.y += p.vy;

        // Interaction with mouse
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            // Attract/Repel effect
            const force = (150 - dist) / 1500;
            p.x -= dx * force * 0.1;
            p.y -= dy * force * 0.1;
          }
        }

        // Wall collisions
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Purple-blue hue depending on index
        const color = idx % 2 === 0 ? colorPurple : colorBlue;
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.fill();

        // Connect lines (disabled when prefers-reduced-motion)
        if (!disableConnections) {
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const lineAlpha = (1 - dist / connectionDistance) * 0.08;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              // Gradient lines — pre-computed color strings
              const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
              const col1 = idx % 2 === 0 ? `rgba(${colorPurple}, ` : `rgba(${colorBlue}, `;
              const col2 = j % 2 === 0 ? `rgba(${colorPurple}, ` : `rgba(${colorBlue}, `;
              grad.addColorStop(0, `${col1}${lineAlpha})`);
              grad.addColorStop(1, `${col2}${lineAlpha})`);
              ctx.strokeStyle = grad;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 w-full h-full bg-black pointer-events-none"
    />
  );
}
