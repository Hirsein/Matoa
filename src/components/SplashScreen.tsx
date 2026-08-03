import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, minDurationMs = 2800 }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusText, setStatusText] = useState('Initialisation de Matoa...');

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));
      setProgress(currentProgress);

      if (currentProgress < 25) {
        setStatusText('Initialisation de Matoa SaaS...');
      } else if (currentProgress < 55) {
        setStatusText('Chargement des modules & sécurité...');
      } else if (currentProgress < 85) {
        setStatusText('Vérification de l\'espace auto-école...');
      } else {
        setStatusText('Bienvenue sur Matoa !');
      }

      if (elapsed >= minDurationMs) {
        clearInterval(interval);
        setIsExiting(true);
        setTimeout(() => {
          onFinish();
        }, 600); // Smooth exit animation duration
      }
    }, 30);

    return () => clearInterval(interval);
  }, [minDurationMs, onFinish]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden font-sans select-none"
        >
          {/* Subtle Grid Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Animated Background Glowing Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center px-4">
            
            {/* Logo Container with Glowing Ring & Floating Motion */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8 group"
            >
              {/* Outer Pulsing Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 opacity-60 blur-xl animate-pulse" />

              {/* Rotating Light Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2 rounded-[28px] bg-gradient-to-r from-blue-500 via-transparent to-emerald-400 opacity-40 p-[2px]"
              />

              {/* Logo Frame */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-blue-500/30 shadow-2xl flex items-center justify-center p-4 overflow-hidden">
                {/* Logo Image */}
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  src="/matoa-logo.png"
                  alt="Matoa Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_20px_rgba(37,99,235,0.4)]"
                />

                {/* Shimmer effect across the logo */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', repeatDelay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                />
              </div>

              {/* Verified Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-2 -right-2 p-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 rounded-2xl shadow-xl border-2 border-slate-950 flex items-center justify-center"
              >
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </motion.div>
            </motion.div>

            {/* Application Title & Subtitle */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 uppercase italic flex items-center justify-center space-x-2">
                <span>MATOA</span>
                <Sparkles className="w-6 h-6 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
              </h1>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-slate-400 uppercase">
                Plateforme SaaS Multi-Tenant & Formation Conduite
              </p>
            </motion.div>

            {/* Progress Bar & Status Text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 w-72 sm:w-80 space-y-3 text-center"
            >
              {/* Progress Track */}
              <div className="h-2 w-full bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between text-xs font-mono font-medium text-slate-400">
                <span className="flex items-center space-x-1.5 truncate max-w-[200px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                  <span className="truncate">{statusText}</span>
                </span>
                <span className="font-bold text-emerald-400 shrink-0 ml-2">{progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Footer Security Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-6 flex items-center space-x-2 text-[11px] text-slate-500 font-medium tracking-wide uppercase bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-800/60 backdrop-blur-md"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accès sécurisé & SSL 256-bit — Matoa SaaS Engine</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

