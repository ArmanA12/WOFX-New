"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BODIES = [
  { 
    id: 1, 
    name: "Alliance Partner", 
    logo: "https://www.wofxworldexpo.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAFMT.823a63bf.png&w=384&q=75&dpl=dpl_9TTGzHYezibYPkiRPAGLB3PUm1i4" 
  },
  { 
    id: 2, 
    name: "Industry Association Partner", 
    logo: "https://www.wofxworldexpo.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.dda0353a.webp&w=256&q=75&dpl=dpl_9TTGzHYezibYPkiRPAGLB3PUm1i4" 
  },
  { 
    id: 3, 
    name: "Skilling Partner", 
    logo: "https://www.wofxworldexpo.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFFSC.178e6a54.png&w=256&q=75&dpl=dpl_9TTGzHYezibYPkiRPAGLB3PUm1i4" 
  },
  { 
    id: 4, 
    name: "House of Brands Partner", 
    logo: "https://www.wofxworldexpo.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.55ce7b45.png&w=256&q=75&dpl=dpl_9TTGzHYezibYPkiRPAGLB3PUm1i4" 
  },
];

import { CylinderText } from "./CylinderText";

export default function IndustryBodies() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    // Initial State: Huddled together in the center with slight overlap
    gsap.set(cards, { 
      x: (i) => (i - 1.5) * 15, // Slight horizontal stagger for huddled look
      y: (i) => (i % 2 === 0 ? 5 : -5), // Slight vertical stagger
      opacity: 0, 
      scale: 0.85,
      rotate: (i) => (i - 1.5) * 2, // Slight rotation for natural look
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate Cards spreading out into the final horizontal row
    tl.to(cards, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: (i) => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) return 0;
        return (i - 1.5) * 310; // Final spread width
      },
      y: (i) => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) return (i - 1.5) * 230;
        return 0;
      },
      duration: 2, // Slower for smoothness
      stagger: 0.1,
      ease: "expo.inOut", // More premium feel
    }, "+=0.4");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative py-12 md:py-20 w-full overflow-hidden bg-[#f0f0f0] z-10"
    >
      {/* Cinematic Grain Overlay (Section-Specific) */}
      <div 
        className="pointer-events-none absolute inset-0 z-[10] opacity-[0.4] mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px'
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-start h-full w-full max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <CylinderText 
            text="INDUSTRY BODIES ENDORSING WOFX" 
            trigger="viewport"
            className="text-xl md:text-[1.75rem] font-bold tracking-tight uppercase text-center"
            primaryColor="#e41c62"
          />
        </div>
        {/* Card Stage */}
        <div className="relative w-full flex items-center justify-center min-h-[250px]">
          {BODIES.map((body, i) => (
            <div
              key={body.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="absolute group"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Secondary offset border (bottom and right only) */}
              <div className="absolute -bottom-2.5 -right-2.5 w-full h-full border-b border-r border-black/10 pointer-events-none" />
              
              <div className="relative w-[260px] h-[200px] bg-white border border-black/10 p-8 flex flex-col items-center justify-center transition-all duration-300">
                <p className="text-[14px] font-bold text-black mb-6 text-center capitalize tracking-wider">
                  {body.name.toLowerCase()}
                </p>
                <div className="relative w-full h-20 flex items-center justify-center px-2">
                  <img 
                    src={body.logo} 
                    alt={body.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
