import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@#$%&';

const PHASES = [
  { id: 'INIT', label: 'CORE_BOOT' },
  { id: 'SYNC', label: 'WOFX_SYNC' },
];

export default function PremiumLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [displayText, setDisplayText] = useState(PHASES[0].label);

  // Advanced Scramble - variable speed for organic feel
  useEffect(() => {
    let iter = 0;
    const target = PHASES[phase] ? PHASES[phase].label : 'READY';
    const interval = setInterval(() => {
      setDisplayText(
        target.split('').map((ch, i) => {
          const center = (target.length - 1) / 2;
          const dist = Math.abs(i - center);
          // Variable iteration threshold based on position
          if (iter > dist * 1.2) return ch;
          return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
        }).join('')
      );
      iter += 0.75;
      if (iter >= target.length + 5) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [phase]);

  // Master Orchestration
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < PHASES.length; i++) {
      timers.push(setTimeout(() => setPhase(i), 1200 * i));
    }
    // Final reveal trigger
    timers.push(setTimeout(() => {
      setRevealed(true);
      // Wait for the iris animation to complete before calling onComplete
      setTimeout(onComplete, 2500); 
    }, 1200 * PHASES.length + 300));
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden bg-black font-sans pointer-events-none select-none">
      {/* High-Resolution Dynamic Grain */}
      <motion.div 
        animate={{ x: [-10, 10, -5, 5, 0], y: [5, -5, 10, -10, 0] }}
        transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[length:200px_200px]" 
      />

      {/* Loading Overlay: Pure Brutalist Center */}
      <AnimatePresence mode="wait">
        {!revealed && (
          <motion.div
            key="loader-env"
            exit={{ 
              opacity: 0, 
              scale: 0.95,
              transition: { duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.4 } 
            }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="mb-4">
                 <img 
                  src="https://www.worldexindia.com/assets/newassests/TRIAL_WOFX%20LOGO.png" 
                  alt="WOFX Logo"
                  className="h-12 w-auto object-contain brightness-0 invert opacity-40 grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="h-12 flex items-center justify-center">
                <motion.h1 
                  key={phase}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-mono text-white text-base md:text-xl tracking-[0.8em] uppercase text-center font-light ml-[0.8em]"
                >
                  {displayText}
                </motion.h1>
              </div>
              
              <div className="w-48 h-px bg-white/5 relative overflow-hidden">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: (phase + 1) / PHASES.length }}
                  transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute inset-0 bg-accent origin-left"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE IRIS REVEAL MASK */}
      <AnimatePresence>
        {revealed && (
          <motion.div 
            initial={{ 
              clipPath: 'circle(0% at 50% 50%)',
            }}
            animate={{ 
              clipPath: 'circle(150% at 50% 50%)',
            }}
            transition={{ 
              duration: 2.2, 
              ease: [0.87, 0, 0.13, 1],
            }}
            className="fixed inset-0 z-[210] bg-transparent pointer-events-none"
          >
             {/* This panel "punches a hole" by using clipPath on a full-screen black overlay */}
             <div className="absolute inset-0 bg-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* We need the black curtain to actually exist until reveal is finished */}
      {revealed && (
         <motion.div 
           initial={{ clipPath: 'circle(0% at 50% 50%)' }}
           animate={{ clipPath: 'circle(150% at 50% 50%)' }}
           transition={{ duration: 2.2, ease: [0.87, 0, 0.13, 1] }}
           className="fixed inset-0 z-[209] bg-black mix-blend-difference invert pointer-events-none"
         />
      )}
    </div>
  );
}
