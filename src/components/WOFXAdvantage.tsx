import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { CylinderText } from './CylinderText';
import AnimatedButton from './AnimatedButton';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ADVANTAGE_DATA = [
  {
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    heading: "Focused B2B Trade Fair",
    text: "A focused B2B trade show dedicated to the furniture and design industry.",
  },
  {
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
    heading: "Business & Networking",
    text: "Directly connect with leading industry buyers and network via business forums, seminars and awards.",
  },
  {
    img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1200&auto=format&fit=crop",
    heading: "Global Platform",
    text: "Leading International and Indian brands showcasing latest collections to volume buyers.",
  },
  {
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    heading: "Gateway to India Market",
    text: "Explore business opportunities in the high growth India market.",
  },
];

export const WOFXAdvantage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.advantage-card');
      
      // Main Timeline for the pinned section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000", // Long scroll for cinematic feel
          pin: true,
          scrub: 1.5,
          refreshPriority: 1,
        }
      });

      // 1. Subtle Hero Depth Shift
      tl.to(heroRef.current, {
        z: 100, // Move towards viewer
        scale: 1.1,
        duration: 8,
        ease: "none",
      }, 0);

      // 2. Orbital/3D Entrance for Cards
      // Final positions in a grid around the center hero
      const positions = [
        { x: -265, y: -165, rotateY: 5, rotateX: 5 }, // Top Left
        { x: 265, y: -165, rotateY: -5, rotateX: 5 }, // Top Right
        { x: -265, y: 165, rotateY: 5, rotateX: -5 }, // Bottom Left
        { x: 265, y: 165, rotateY: -5, rotateX: -5 }, // Bottom Right
      ];

      // Initial fanned offsets for "rummy" look
      const initialOffsets = [
        { x: -180, rotate: -35, skewX: -20 },
        { x: -80, rotate: -15, skewX: -10 },
        { x: 80, rotate: 15, skewX: 10 },
        { x: 180, rotate: 35, skewX: 20 },
      ];

      cards.forEach((card, i) => {
        const pos = positions[i];
        const offset = initialOffsets[i];
        
        tl.fromTo(card,
          { 
            x: offset.x,
            y: 280,    // Lifted slightly more due to reduced height
            z: -200,      
            opacity: 1,   
            scale: 0.85,
            rotation: offset.rotate,
            skewX: offset.skewX,
            rotateX: 20,
            rotateY: (i % 2 === 0 ? 10 : -10),
          },
          { 
            x: pos.x,
            y: pos.y,
            z: 0,
            rotation: 0,
            skewX: 0,
            opacity: 1,
            scale: 1,
            rotateX: pos.rotateX,
            rotateY: pos.rotateY,
            duration: 6,
            ease: "power3.inOut",
          },
          0 // Start peeking state immediately or at same time
        );
        
        // Final settle: adjust rotation slightly at the very end
        tl.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 2,
          ease: "power1.out"
        }, ">-1");
      });

      // 3. Cinematic Pause at the end
      tl.to({}, { duration: 4 }); 

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="wofx-advantage" 
      className="relative w-full overflow-hidden bg-[#1a1a18] "
      style={{ perspective: '1500px' }}
    >
      {/* Sticky Content Container */}
      <div 
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        

        {/* Background Grain Effect */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
          style={{ 
            backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
            backgroundSize: '200px',
            transform: 'translateZ(-100px)'
          }}
        />

        {/* Hero Section - FIXED IN CENTER (Z-Buffer logic via translateZ) */}
        <div 
          ref={heroRef}
          className="absolute inset-0 z-0 flex flex-col items-center justify-start pt-32 text-center px-4"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div style={{ transform: 'translateZ(50px)' }}>
            <CylinderText 
              text="WOFX Advantage" 
              primaryColor="#FFCC29"
              className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter border-t border-b border-white/10"
            />
            <p className="mt-4 text-sm md:text-lg text-center font-black text-[#FFCC29]  leading-tight border-t border-b border-white/10">
              Unlock a World of Opportunities in Furniture & Design
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <AnimatedButton 
                initialText="EXHIBITOR ENQUIRY" 
                padding="px-6 py-3 md:px-10 md:py-4"
                className="text-xs md:text-lg font-black"
              />
              <AnimatedButton 
                initialText="BUYER REGISTRATION" 
                primaryColor="#FFCC29"
                secondaryColor="#e41c62"
                initialTextColor="black"
                hoverTextColor="white"
                padding="px-6 py-3 md:px-10 md:py-4"
                className="text-xs md:text-lg font-black"
              />
            </div>
          </div>
        </div>

        {/* Cards Wrapper - Positioned relatively for GSAP control */}
        <div 
          ref={cardsContainerRef}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {ADVANTAGE_DATA.map((item, idx) => {
              const COLORS = ['#e41c62', '#B0CB1F', '#000000'];
              
              // Custom color mapping based on user history and "make black both" request
              let cardColor = '';
              if (idx === 1 || idx === 2) {
                cardColor = COLORS[2]; // Black
              } else if (idx === 0 || idx === 3) {
                cardColor = COLORS[0]; // Pink
              } else {
                cardColor = COLORS[1]; // Green
              }
              
              const isDark = cardColor === '#e41c62' || cardColor === '#000000';
              const textColor = isDark ? '#ffffff' : '#000000';
              const textMuted = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
              
              const pos = ["bottom-right", "bottom-left", "top-right", "top-left"][idx] || "bottom-right";
              
              // Positioning logic
              const isLeft = pos.includes("left");
              const isTop = pos.startsWith("top");
              
              return (
                <div
                  key={idx}
                  className="advantage-card absolute pointer-events-auto group overflow-hidden rounded-[2.5rem] p-10 pb-12 transition-all duration-700 hover:z-50 shadow-2xl"
                  style={{ 
                    width: '500px', 
                    height: '300px',
                    backgroundColor: cardColor,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Grainy Texture Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.2] mix-blend-overlay z-0" 
                    style={{ 
                      backgroundImage: 'url("https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif")',
                      backgroundSize: '200px 200px'
                    }} 
                  />

                  {/* Content Container */}
                  <div className={`relative z-10 flex flex-col h-full justify-between ${isLeft ? "items-end text-right" : "items-start"} ${isTop ? "flex-col-reverse" : ""}`}>
                    {/* Text Content */}
                    <div className="space-y-3">
                      <h3 
                        style={{ color: textColor }}
                        className="text-[1.75rem] leading-[1.2] font-black tracking-tight transform group-hover:translateZ(20px) transition-transform duration-500"
                      >
                        {item.heading}
                      </h3>
                      <p 
                        style={{ color: textMuted }}
                        className="text-lg leading-[1.3] font-normal tracking-tight"
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>

                  {/* Custom Cutout Corner */}
                  <div className={`absolute pointer-events-none w-[160px] h-[160px] ${pos === "bottom-right" ? "bottom-0 right-0" : pos === "bottom-left" ? "bottom-0 left-0" : pos === "top-right" ? "top-0 right-0" : "top-0 left-0"}`}>
                    {/* The "Notch" - matched to background #1a1a18 */}
                    <div className={`absolute w-[120px] h-[120px] bg-[#1a1a18] ${pos === "bottom-right" ? "bottom-0 right-0 rounded-tl-[2.5rem]" : pos === "bottom-left" ? "bottom-0 left-0 rounded-tr-[2.5rem]" : pos === "top-right" ? "top-0 right-0 rounded-bl-[2.5rem]" : "top-0 left-0 rounded-br-[2.5rem]"}`} />
                    
                    {/* Concave Curve 1 (Vertical edge) */}
                    <div className={`absolute w-10 h-10 bg-[#1a1a18] ${pos === "bottom-right" ? "top-0 right-0" : pos === "bottom-left" ? "top-0 left-0" : pos === "top-right" ? "bottom-0 right-0" : "bottom-0 left-0"}`}>
                      <div className={`w-full h-full ${pos === "bottom-right" ? "rounded-br-[2.5rem]" : pos === "bottom-left" ? "rounded-bl-[2.5rem]" : pos === "top-right" ? "rounded-tr-[2.5rem]" : "rounded-tl-[2.5rem]"}`} style={{ backgroundColor: cardColor }} />
                    </div>

                    {/* Concave Curve 2 (Horizontal edge) */}
                    <div className={`absolute w-10 h-10 bg-[#1a1a18] ${pos === "bottom-right" ? "bottom-0 left-0" : pos === "bottom-left" ? "bottom-0 right-0" : pos === "top-right" ? "top-0 left-0" : "top-0 right-0"}`}>
                      <div className={`w-full h-full ${pos === "bottom-right" ? "rounded-br-[2.5rem]" : pos === "bottom-left" ? "rounded-bl-[2.5rem]" : pos === "top-right" ? "rounded-tr-[2.5rem]" : "rounded-tl-[2.5rem]"}`} style={{ backgroundColor: cardColor }} />
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`absolute w-[92px] h-[92px] border border-white/5 rounded-[1.8rem] flex items-center justify-center shadow-lg cursor-pointer group/btn z-40 overflow-hidden ${pos === "bottom-right" ? "bottom-[14px] right-[14px]" : pos === "bottom-left" ? "bottom-[14px] left-[14px]" : pos === "top-right" ? "top-[14px] right-[14px]" : "top-[14px] left-[14px]"}`}
                    style={{ backgroundColor: cardColor }}
                  >
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-[0.2] mix-blend-overlay z-0" 
                      style={{ 
                        backgroundImage: 'url("https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif")',
                        backgroundSize: '200px 200px'
                      }} 
                    />
                    <ArrowUpRight 
                      style={{ color: textColor }}
                      className={`w-11 h-11 transition-transform relative z-10 
                      ${pos.includes("right") ? "group-hover/btn:translate-x-1" : "group-hover/btn:-translate-x-1"} 
                      ${pos.includes("top") ? "group-hover/btn:translate-y-1" : "group-hover/btn:-translate-y-1"}
                      ${pos === "top-left" ? "rotate-[-90deg]" : pos === "top-right" ? "rotate-[0deg]" : pos === "bottom-left" ? "rotate-[-180deg]" : "rotate-[90deg]"}`} 
                    />
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
