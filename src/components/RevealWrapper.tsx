import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealType = 'slide' | 'center-split-v' | 'center-split-h' | 'bands-v' | 'bands-h';

interface RevealWrapperProps {
  children: React.ReactNode;
  text?: string;
  subtext?: string;
  delay?: number;
  type?: RevealType;
  direction?: 'up' | 'left' | 'right' | 'down';
  scrub?: boolean | number;
}

const RevealWrapper: React.FC<RevealWrapperProps> = ({ 
  children, 
  text = "", 
  subtext = "FURNITURE + DESIGN",
  type = 'slide',
  direction = 'up',
  scrub = 1 // Smoothing for scroll reveal
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shutterRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const shutters = shutterRef.current?.querySelectorAll('.shutter-piece');
    const commonEase = "none"; // Scrubbing usually feels better with linear ease
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", // Animation starts when top of container hits bottom of viewport
        end: "bottom bottom", // Animation finishes when bottom of container hits bottom of viewport
        scrub: scrub,
      }
    });

    // 1. Initial State
    gsap.set(contentRef.current, { opacity: 0.2 }); // Start slightly visible 

    // 2. Animate Text Layer
    if (textLayerRef.current) {
      tl.to(textLayerRef.current.children[0] || {}, { 
        opacity: 0, 
        y: -100, 
        ease: "power2.inOut" 
      }, 0)
      .to(textLayerRef.current.children[1] || {}, { 
        opacity: 0, 
        scale: 0.8,
        ease: "power2.inOut" 
      }, 0);
    }

    // 3. Shutter Animation Logic
    if (type === 'slide') {
      const move = {
        up: { y: '-100%' },
        down: { y: '100%' },
        left: { x: '-100%' },
        right: { x: '100%' }
      };
      tl.to(shutters || {}, { ...move[direction], ease: commonEase }, 0);
    } 
    else if (type === 'center-split-v') {
      tl.to('.shutter-top', { y: '-100%', ease: commonEase }, 0)
        .to('.shutter-bottom', { y: '100%', ease: commonEase }, 0);
    }

    // 4. Reveal Content
    tl.to(contentRef.current, { 
      opacity: 1, 
      ease: "none" 
    }, 0);

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, [type, direction, scrub]);

  const renderShutterItems = () => {
    const base = "absolute z-[40] bg-[#e41c62] shutter-piece pointer-events-none";
    
    if (type === 'slide') return <div className={`${base} inset-0`} />;

    if (type === 'center-split-v') {
      return (
        <>
          <div className={`${base} shutter-top top-0 left-0 w-full h-1/2 border-b border-white/5`} />
          <div className={`${base} shutter-bottom bottom-0 left-0 w-full h-1/2`} />
        </>
      );
    }

    return null;
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full bg-[#1a1a18] min-h-[50vh]">
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>

      <div ref={shutterRef} className="absolute inset-0 z-40 pointer-events-none">
        {renderShutterItems()}
      </div>

      <div ref={textLayerRef} className="absolute inset-0 z-[41] flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-6">
          <div className="text-white text-5xl md:text-8xl font-serif font-black uppercase tracking-[0.1em] italic px-12 text-center">
            {text}
          </div>
          <div className="text-zinc-500 text-[10px] font-mono font-black tracking-[0.8em] uppercase">
            {subtext}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevealWrapper;
