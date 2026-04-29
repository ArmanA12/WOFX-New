import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { CylinderText } from './CylinderText';

const TESTIMONIALS = [
  {
    name: "Aastha Gupta",
    company: "Co-Founder, AP Studios, Delhi",
    text: "For us as distributors, WOFX was a strong sourcing platform. Pen Workers and Urban Living stood out in presentation and product line. The designs were attractive and commercially relevant. SmartTalk and the Conclave were insightful. The show had great professional energy",
    img: "https://www.wofxworldexpo.com/_next/image?url=%2Fassests%2Fbuyer-feedback%2F2026%2Faastha.png&w=128&q=75&dpl=dpl_9TTGzHYezibYPkiRPAGLB3PUm1i4",
    color: "#000000",
  }
];

export default function Testimonials() {
  const t = TESTIMONIALS[0];
  const cardColor = "#ffffff";
  const textColor = "#000000";
  const textMuted = "#666666";
  const borderColor = "border-[#DFDFDF]";
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');
      
      gsap.fromTo(words, 
        { 
          opacity: 0, 
          x: 120, 
          y: 10,
          fontWeight: 900,
          scale: 1.1,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          fontWeight: 400,
          scale: 1,
          duration: 1.8,
          stagger: 0.04,
          ease: "expo.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, []);

  return (
    <section className="relative w-full bg-[#f0f0f0] overflow-hidden border-t-[1.5px] border-[#DFDFDF]">
      {/* Grain Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-[10] opacity-[0.4] mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px'
        }}
      />
      <div className="w-[95%] mx-auto border-x-[1.5px] border-[#DFDFDF] bg-white relative z-20">

        {/* Row 1: Header/Title */}
        <div className="grid grid-cols-4 min-h-[160px] md:min-h-[200px]">
          <div className={`border-r-[1.5px] border-b-[1.5px] ${borderColor}`} />
          <div className={`col-span-2 border-r-[1.5px] border-b-[1.5px] ${borderColor} flex flex-col items-center justify-center p-8 text-center`}>
            <CylinderText
              text="Testimonials"
              primaryColor="#000000"
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
            />
          </div>
          <div className={`border-b-[1.5px] ${borderColor}`} />
        </div>

        {/* Row 2: Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[500px] md:min-h-[600px]">

          {/* Column 1: Image (Row 1) + Name/Company (Row 2) */}
          <div className={`border-r-[1.5px] border-b-[1.5px] ${borderColor} flex flex-col`}>
            {/* Image Row */}
            <div className={`flex-[1.2] border-b-[1.5px] ${borderColor} relative overflow-hidden group`}>
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                className="w-full h-full"
              >
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-full object-cover p-2 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
            {/* Name/Company Row */}
            <div className="flex-1 p-6 justify-center bg-white">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex flex-col">
                  <div className="bg-white px-3 py-0 border-[1.5px] border-[#DFDFDF] -skew-x-12 transform inline-block w-fit mb-2" id="testi-badge">
                    <span className="text-black text-[10px] font-black italic tracking-tighter uppercase block skew-x-12">
                      Buyer
                    </span>
                  </div>
                  <div
                    className="bg-black px-4 py-1 -skew-x-12 transform inline-block w-fit mb-4"
                  >
                    <span className="text-white text-base md:text-lg font-black italic tracking-tighter uppercase block skew-x-12" id="testi-name">
                      {t.name}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] leading-tight" id="testi-company">
                    {t.company}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className={`col-span-2 border-r-[1.5px] border-b-[1.5px] ${borderColor} flex flex-col items-start justify-center p-8 md:p-16 bg-white overflow-hidden`}>
            <div>
              <p
                ref={textRef}
                style={{ color: textColor }}
                className="text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-normal tracking-tight italic"
                id="testi-quote"
              >
                "{t.text.split(' ').map((word, i) => (
                  <span 
                    key={i} 
                    className="word inline-block mr-[0.25em] will-change-transform transform-gpu"
                  >
                    {word}
                  </span>
                ))}"
              </p>
            </div>
          </div>

          {/* Column 4: Arrows (Split into 2 Rows) */}
          <div className={`border-b-[1.5px] ${borderColor} flex flex-col`}>
            {/* Left Arrow Row */}
            <motion.div
              whileHover={{ backgroundColor: '#f9f9f9' }}
              className={`flex-1 border-b-[1.5px] ${borderColor} flex items-center justify-center cursor-pointer group transition-colors`}
              id="testi-prev"
            >
              <ArrowLeft className="w-20 h-20 text-black transition-transform group-hover:-translate-x-2" />
            </motion.div>
            {/* Right Arrow Row */}
            <motion.div
              whileHover={{ backgroundColor: '#f9f9f9' }}
              className="flex-1 flex items-center justify-center cursor-pointer group transition-colors"
              id="testi-next"
            >
              <ArrowRight className="w-20 h-20 text-black transition-transform group-hover:translate-x-2" />
            </motion.div>
          </div>
        </div>

        {/* Row 3: Bottom Empty Boxes */}
        <div className="grid grid-cols-4 h-20">
          <div className={`border-r-[1.5px] border-b-[1.5px] ${borderColor}`} />
          <div className={`border-r-[1.5px] border-b-[1.5px] ${borderColor}`} />
          <div className={`border-r-[1.5px] border-b-[1.5px] ${borderColor}`} />
          <div className={`border-b-[1.5px] ${borderColor}`} />
        </div>
      </div>
    </section>
  );
}

