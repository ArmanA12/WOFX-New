import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CylinderText } from './CylinderText';

import AnimatedButton from './AnimatedButton';

gsap.registerPlugin(ScrollTrigger);

const BUYER_IMAGES = [
  {
    id: 'A',
    url: 'https://www.worldexindia.com/assets/newassests/1.png',
    title: 'Dealers and Distributors',
    items: ["Dealers", "Distributors", "Wholesalers", "Importers", "Trading & Buying Houses", "Agents"]
  },
  {
    id: 'B',
    url: 'https://www.worldexindia.com/assets/newassests/2.png',
    title: 'Retail Connects',
    items: ["Retailers", "E-Tailers", "Large Format Retailers", "Online Traders"]
  },
  {
    id: 'C',
    url: 'https://www.worldexindia.com/assets/newassests/3.png',
    title: 'Furniture Franchise',
    items: ["Franchisees", "Entrepreneurs", "Agents", "Consultants"]
  },
  {
    id: 'D',
    url: 'https://www.worldexindia.com/assets/newassests/4.png',
    title: 'Project Professional',
    items: ["Project Management Consultant", "Architects & Interior Designers", "Real Estate Developers", "HORECA", "Corporate Sourcing Heads", "Institutional"]
  },
  {
    id: 'E',
    url: 'https://www.worldexindia.com/assets/newassests/5.png',
    title: 'Investor Link',
    items: ["Private Equity", "Family Offices", "Venture Capital", "Investment Consultants", "International Companies", "Corporates"]
  },

];

export default function BuyerProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for pinning and stacking
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200%", // Long scroll for slow feel
          pin: true,
          scrub: 3,       // Heavy scrub for weight
          anticipatePin: 1,
        }
      });

      // Animate cards on the right
      const stackCards = imagesRef.current.filter(card => card !== null);
      
      stackCards.slice(1).forEach((card, idx) => {
        const stepDuration = 8;
        
        tl.fromTo(card, 
          { yPercent: 120 },
          { 
            yPercent: 0,
            ease: "expo.inOut",
            duration: stepDuration,
          }
        );

        // Subtle scale down for the previous card
        if (idx >= 0) {
          tl.to(stackCards[idx], {
            scale: 0.95,
            opacity: 0.8,
            duration: stepDuration / 2,
            ease: "expo.inOut"
          }, `-=${stepDuration}`);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#1a1a18] overflow-hidden flex flex-col md:flex-row border-t border-white/5"
    >
      {/* Background Grain Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{ 
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px'
        }}
      />

      {/* LEFT SIDE: Persistent Content (Matches Reference) */}
      <div 
        className="relative w-full md:w-[40%] h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 z-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <div className="mb-10 flex flex-col items-start translate-x-[-0.05em]">
            <CylinderText 
              text="Buyer" 
              trigger="viewport"
              className="text-3xl md:text-5xl font-bold tracking-tight uppercase"
              primaryColor="#e41c62"
            />
            <CylinderText 
              text="Profiles" 
              trigger="viewport"
              className="text-3xl md:text-5xl font-bold tracking-tight uppercase mt-[-0.2em]"
              primaryColor="#e41c62"
              delay={0.1}
            />
          </div>
          
          <p 
            className="text-lg md:text-xl font-normal leading-tight max-w-sm mb-12"
            style={{ color: '#fbfbfbb3' }}
          >
            WOFX is the gateway to global trends, connecting industry leaders to the future of furniture and design.
          </p>

          <div className="flex">
            <AnimatedButton 
              initialText="REGISTER NOW" 
              primaryColor="#e41c62"
              secondaryColor="#FFCC29"
              initialTextColor="white"
              hoverTextColor="white"
              padding="px-12 py-5"
              className="text-sm font-black"
            />
          </div>
        </motion.div>


      </div>

      {/* RIGHT SIDE: Heavy Stacking Cards */}
      <div 
        className="relative w-full md:w-[60%] h-full overflow-hidden flex items-center justify-center p-8 md:p-12 lg:p-20"
      >
        <div className="relative w-full h-full max-w-4xl max-h-[85vh] border border-white/10 p-3">
          {BUYER_IMAGES.map((image, idx) => (
            <div
              key={image.id}
              ref={(el) => { if(el) imagesRef.current[idx] = el; }}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
              style={{ zIndex: idx + 10 }}
            >
              <div className="relative w-full h-full bg-[#1a1a18] border border-white/10 overflow-hidden flex flex-col group">
                {/* Individual Card Grain Overlay */}
                <div 
                  className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
                  style={{ 
                    backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
                    backgroundSize: '200px'
                  }}
                />
                
                {/* Image Container (50% space) */}
                <div className="relative h-[65%] w-full flex items-center justify-center bg-white/[0.01]">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="max-w-[100%]  object-fill filter group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Text and Items Section (50% space) */}
                <div className="relative h-[35%] w-full p-4 md:p-6 z-20 flex flex-col items-start justify-center gap-4 bg-[#1a1a18] border-t border-white/5">
                  <h3 className="text-white font-semibold capitalize tracking-tight text-xl md:text-2xl lg:text-3xl max-w-lg leading-tight">
                    {image.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {image.items.map((item, i) => (
                      <span 
                        key={i}
                        className="text-white/60 text-[10px] md:text-sm capitalize font-medium tracking-wide whitespace-nowrap"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .border-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
      `}} />
    </section>
  );
}
