import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TextSplitter: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={`char-item inline-block whitespace-pre ${className}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
};

interface CylinderTextProps {
  text: string;
  trigger?: 'load' | 'viewport';
  className?: string;
  delay?: number;
  primaryColor?: string;
  ready?: boolean;
}

export const CylinderText: React.FC<CylinderTextProps> = ({ 
  text, 
  trigger = 'load', 
  className = "", 
  delay = 0,
  primaryColor = "#e41c62",
  ready = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !primaryRef.current || !ready) return;

    const ctx = gsap.context(() => {
      const primaryChars = primaryRef.current?.querySelectorAll('.char-item');
      
      const tl = gsap.timeline({
        scrollTrigger: trigger === 'viewport' ? {
          trigger: containerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        } : undefined
      });

      if (trigger === 'viewport' || trigger === 'load') {
        // Ensure static state before animation
        tl.set(primaryChars, { y: '100%', rotationX: -90 });

        // Automatic entrance: Roll in from hidden state to Primary
        tl.to(primaryChars, {
          y: '0%',
          rotationX: 0,
          stagger: 0.02,
          duration: 1.2,
          ease: 'expo.out',
          delay: delay,
        });
        
        // Premium "glimmer" bounce
        tl.to(primaryChars, {
          y: '-10%',
          rotationX: 10,
          duration: 0.3,
          stagger: 0.01,
          ease: 'power2.out'
        }, "-=0.6");
        tl.to(primaryChars, {
          y: '0%',
          rotationX: 0,
          duration: 0.3,
          stagger: 0.01,
          ease: 'power2.in'
        }, "-=0.2");
      }
    }, containerRef);

    return () => ctx.revert();
  }, [trigger, delay, text, ready]);

  return (
    <div 
      ref={containerRef} 
      className={`relative inline-block overflow-hidden [perspective:1000px] pb-1 ${className}`}
      style={{ height: 'auto', minHeight: '1.2em' }}
    >
      {/* Primary Layer */}
      <div 
        ref={primaryRef} 
        className={`relative flex whitespace-nowrap ${className.includes('text-center') ? 'justify-center' : ''} ${className.includes('text-right') ? 'justify-end' : ''}`}
      >
        <h2 className="leading-none flex py-1" style={{ color: primaryColor }}>
          <TextSplitter text={text} />
        </h2>
      </div>
    </div>
  );
};
