import React from 'react';
import { motion } from 'motion/react';
import { CylinderText } from './CylinderText';

const TESTIMONIALS = [
  {
    name: "Aastha Gupta",
    company: "Co-Founder, AP Studios, Delhi",
    text: "For us as distributors, WOFX was a strong sourcing platform. Pen Workers and Urban Living stood out in presentation and product line. The designs were attractive and commercially relevant. SmartTalk and the Conclave were insightful. The show had great professional energy",
    img: "https://www.wofxworldexpo.com/_next/image?url=%2Fassests%2Fbuyer-feedback%2F2026%2Faastha.png&w=128&q=75&dpl=dpl_9TTGzHYezibYPkiRPAGLB3PUm1i4",
    color: "#e41c62",
  }
];

export default function Testimonials() {
  const t = TESTIMONIALS[0];
  const cardColor = "#ffffff";
  const textColor = "#000000";
  const textMuted = "#666666";

  return (
    <section className="relative w-full bg-[#f0f0f0]    overflow-hidden h-[850px] flex flex-col justify-center">
      {/* Background Grain Effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.4] mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px',
        }} 
      />

      <div className="relative z-10 w-full px-0">
        <div className="mb-14 text-center">
          <CylinderText 
            text="Testimonials" 
            primaryColor="#e41c62"
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          />
        </div>

        {/* The Grid - Scaled up to overflow the container (half boxes visible) */}
        <div className="relative left-1/2 -translate-x-1/2 w-[115%] md:w-[125%] lg:w-[130%]">
          <div className="grid grid-cols-[15%_1fr_15%] gap-6 auto-rows-fr">
            {/* Row 1 */}
            <div className="border border-[#DFDFDF] rounded-[1.2rem] min-h-[140px]" />
            <div className="border border-[#DFDFDF] rounded-[1.2rem] min-h-[140px]" />
            <div className="border border-[#DFDFDF] rounded-[1.2rem] min-h-[140px]" />

            {/* Row 2 */}
            <div className="border border-[#DFDFDF] rounded-[1.2rem]" />
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="relative group overflow-hidden rounded-[1.2rem] p-10 md:p-14 transition-all duration-700 flex flex-col justify-between w-full min-h-[460px]"
              style={{ 
                backgroundColor: cardColor,
              }}
            >
              {/* Grainy Texture Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay z-0" 
                style={{ 
                  backgroundImage: 'url("https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif")',
                  backgroundSize: '200px 200px'
                }} 
              />

              {/* Custom Cutout Corner (Top-Left) */}
              <div className="absolute pointer-events-none w-[170px] h-[170px] top-0 left-0">
                {/* The "Notch" - matched to background #f0f0f0 */}
                <div className="absolute w-full h-full bg-[#f0f0f0] top-0 left-0 rounded-br-[1.2rem]" />
                
                {/* Concave Curves (The "Inverted" corners) */}
                <div className="absolute w-12 h-12 bg-[#f0f0f0] -bottom-12 left-0">
                  <div className="w-full h-full rounded-tl-[1.2rem]" style={{ backgroundColor: cardColor }} />
                </div>
                <div className="absolute w-12 h-12 bg-[#f0f0f0] top-0 -right-12">
                  <div className="w-full h-full rounded-tl-[1.2rem]" style={{ backgroundColor: cardColor }} />
                </div>
              </div>

              {/* Custom Cutout Corner (Bottom-Right) */}
              <div className="absolute pointer-events-none w-[180px] h-[80px] bottom-0 right-0">
                {/* The "Notch" - Now primary color */}
                <div className="absolute w-full h-full bg-[#e41c62] bottom-0 right-0 rounded-tl-[1.2rem]" />
                
                {/* Concave Curves (The "Inverted" corners) */}
                <div className="absolute w-12 h-12 bg-[#e41c62] -top-12 right-0">
                  <div className="w-full h-full rounded-br-[1.2rem]" style={{ backgroundColor: cardColor }} />
                </div>
                <div className="absolute w-12 h-12 bg-[#e41c62] bottom-0 -left-12">
                  <div className="w-full h-full rounded-br-[1.2rem]" style={{ backgroundColor: cardColor }} />
                </div>
              </div>

              {/* Label in the Bottom-Right Notch */}
              <div 
                className="absolute bottom-0 right-0 z-20 flex items-center justify-center"
                style={{ width: '180px', height: '80px' }}
              >
                <span className="text-xl md:text-2xl font-black uppercase tracking-widest text-white">
                  BUYER
                </span>
              </div>

              {/* Top Row: Identity (Image + Name/Details) */}
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* IMAGE container positioned to sit nicely in the Notch */}
                <div 
                   className="shrink-0 p-2 bg-[#d1d5db] rounded-[1.2rem] shadow-sm z-20"
                   style={{ 
                     marginTop: '-40px', 
                     marginLeft: '-40px'
                   }}
                >
                  <style dangerouslySetInnerHTML={{ __html: `
                    @media (min-width: 768px) {
                      .group .shrink-0 {
                        margin-top: -56px !important;
                        margin-left: -56px !important;
                      }
                    }
                  `}} />
                  <div className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] overflow-hidden rounded-[0.8rem] bg-white">
                    <img 
                      src={t.img} 
                      alt={t.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <h3 
                    style={{ color: textColor }}
                    className="text-2xl md:text-3xl font-bold tracking-tight mb-1"
                  >
                    {t.name}
                  </h3>
                  <p 
                    style={{ color: textMuted }}
                    className="text-base md:text-lg font-normal tracking-normal"
                  >
                    {t.company}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Testimonial Paragraph */}
              <div className="relative z-10 mt-10 md:mt-0 mb-10 md:mb-4 px-2">
                <p 
                  style={{ color: textColor }}
                  className="text-lg md:text-2xl lg:text-3xl leading-[1.3] font-bold tracking-tight italic"
                >
                  "{t.text}"
                </p>
              </div>
            </motion.div>

            <div className="border border-[#DFDFDF] rounded-[1.2rem]" />

            {/* Row 3 */}
            <div className="border border-[#DFDFDF] rounded-[1.2rem] min-h-[140px]" />
            <div className="border border-[#DFDFDF] rounded-[1.2rem] min-h-[140px]" />
            <div className="border border-[#DFDFDF] rounded-[1.2rem] min-h-[140px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

