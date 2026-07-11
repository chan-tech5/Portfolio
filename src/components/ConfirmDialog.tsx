'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Focus cancel button on open & handle Escape
  useEffect(() => {
    if (!isOpen) return;
    cancelRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel]);

  const variantColors = {
    danger: {
      icon: 'bg-red-500/10 text-red-400 border-red-500/20',
      button: 'bg-red-600 hover:bg-red-500 text-white',
    },
    warning: {
      icon: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      button: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
    info: {
      icon: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      button: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
  };

  const colors = variantColors[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="relative w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-10 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {/* Icon + Title */}
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl border ${colors.icon} shrink-0`}>
                  <AlertTriangle size={18} />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="text-sm font-extrabold text-white">{title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{message}</p>
                </div>
                <button
                  onClick={onCancel}
                  className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  ref={cancelRef}
                  onClick={onCancel}
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${colors.button}`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
