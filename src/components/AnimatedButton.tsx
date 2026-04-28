import { motion, AnimatePresence } from 'motion/react';
import { CornerDownRight, CornerRightUp } from 'lucide-react';
import { useState } from 'react';

interface AnimatedButtonProps {
  initialText?: string;
  hoverText?: string;
  className?: string;
  onClick?: () => void;
  primaryColor?: string;
  secondaryColor?: string;
  initialTextColor?: string;
  hoverTextColor?: string;
  padding?: string;
}

export default function AnimatedButton({
  initialText = "CONTACT US",
  hoverText = "CLICK HERE",
  className = "",
  onClick,
  primaryColor = "#e41c62",
  secondaryColor = "#FFCC29",
  initialTextColor = "white",
  hoverTextColor = "black",
  padding = "px-8 py-4"
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      animate={{ 
        backgroundColor: isHovered ? secondaryColor : primaryColor,
        rotate: isHovered ? -2 : 0,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative flex items-center justify-center overflow-hidden font-bold transition-all duration-300 active:scale-95 ${padding} ${className}`}
      style={{
        boxShadow: isHovered ? `0 0 20px ${secondaryColor}4d` : 'none'
      }}
    >
      {/* Premium Shine Layer */}
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <div className="relative z-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="initial"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-3"
              style={{ color: initialTextColor }}
            >
              <span className="whitespace-nowrap tracking-wider">{initialText}</span>
              <CornerDownRight className="h-5 w-5" strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="hover"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-3"
              style={{ color: hoverTextColor }}
            >
              <span className="whitespace-nowrap tracking-wider">{hoverText}</span>
              <CornerRightUp className="h-5 w-5" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Border Glow */}
      <div className="absolute inset-0 z-10 border border-white/20" />
    </motion.button>
  );
}
