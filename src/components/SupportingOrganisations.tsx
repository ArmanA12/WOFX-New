import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CylinderText } from './CylinderText';

const LOGOS = [
  { name: 'AFA', url: 'https://www.wofxworldexpo.com/assests/orgnization/6.webp' },
  { name: 'MHEA', url: 'https://www.wofxworldexpo.com/assests/orgnization/13.webp' },
  { name: 'maccia', url: 'https://www.wofxworldexpo.com/assests/orgnization/maccia.png' },
  { name: 'AIN', url: 'https://www.wofxworldexpo.com/assests/orgnization/AIN.jpg' },
  { name: 'SMEChamber', url: 'https://www.wofxworldexpo.com/assests/orgnization/SME-Chamber.png' },
  { name: 'IIA', url: 'https://www.wofxworldexpo.com/assests/orgnization/IIA.webp' },
  { name: 'fumma', url: 'https://www.wofxworldexpo.com/assests/orgnization/fumma.png' },
  { name: 'bai', url: 'https://www.wofxworldexpo.com/assests/orgnization/5.webp' },
  { name: 'AESA', url: 'https://www.wofxworldexpo.com/assests/orgnization/9.webp' },
  { name: 'fhandra', url: 'https://www.wofxworldexpo.com/assests/orgnization/fhandra.webp' },
  { name: 'piai', url: 'https://www.wofxworldexpo.com/assests/orgnization/piai.png' },
];

const SupportingOrganisations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const items = Array.from(slider.children) as HTMLElement[];
    const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0);

    // Initial positioning
    gsap.set(slider, { x: 0 });

    const animation = gsap.to(slider, {
      x: `-50%`,
      duration: 30,
      ease: "none",
      repeat: -1,
      onReverseComplete: () => {
        gsap.set(slider, { x: 0 });
      }
    });

    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    slider.parentElement?.addEventListener('mouseenter', handleMouseEnter);
    slider.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      animation.kill();
      slider.parentElement?.removeEventListener('mouseenter', handleMouseEnter);
      slider.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#f0f0f0] pt-10 pb-16 md:pt-12 md:pb-24 overflow-hidden border-t-[1.5px] border-[#DFDFDF] z-20">
      {/* Cinematic Grain Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-[10] opacity-[0.4] mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px'
        }}
      />

      <div className="relative z-20 w-full max-w-screen-2xl mx-auto px-6">
        <div className="mb-10 flex justify-center">
          <CylinderText 
            text="SUPPORTING ORGANISATIONS" 
            trigger="viewport"
            className="text-2xl md:text-4xl font-black text-center tracking-tighter"
            primaryColor="#e41c62"
          />
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Gradients to mask edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f0f0f0] to-transparent z-30 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f0f0f0] to-transparent z-30 pointer-events-none" />
          
          <div 
            ref={sliderRef}
            className="flex items-center gap-12 whitespace-nowrap will-change-transform py-4"
            style={{ width: 'fit-content' }}
          >
            {/* Double the logos for seamless loop */}
            {[...LOGOS, ...LOGOS].map((logo, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 flex items-center justify-center px-4 md:px-6 h-20 md:h-24 group"
                style={{ width: '220px' }}
              >
                <img 
                  src={logo.url} 
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain transition-all duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportingOrganisations;
