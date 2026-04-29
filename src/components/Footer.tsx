import React, { useRef, useState, useEffect } from 'react';
import { Mail, Phone, ArrowUp, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import RevealWrapper from './RevealWrapper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Magnetic: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Limits the magnetic pull
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIcons: Record<string, React.ReactNode> = {
    Facebook: <Facebook size={24} className="md:w-8 md:h-8" />,
    Instagram: <Instagram size={24} className="md:w-8 md:h-8" />,
    LinkedIn: <Linkedin size={24} className="md:w-8 md:h-8" />,
    X: <Twitter size={24} className="md:w-8 md:h-8" />,
    YouTube: <Youtube size={24} className="md:w-8 md:h-8" />
  };

  const socialMedia = [
    { name: 'Facebook' },
    { name: 'Instagram' },
    { name: 'LinkedIn' },
    { name: 'X' },
    { name: 'YouTube' }
  ];

  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      const words = footerRef.current.querySelectorAll('.word');
      gsap.fromTo(words, 
        { 
          opacity: 0, 
          x: 60, 
          fontWeight: 900,
          scale: 1.1,
        },
        {
          opacity: 1,
          x: 0,
          fontWeight: 400,
          scale: 1,
          duration: 1.2,
          stagger: 0.02,
          ease: "expo.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block mr-[0.25em] will-change-transform transform-gpu">
        {word}
      </span>
    ));
  };

  return (
    <footer ref={footerRef} className="w-full bg-[#1a1a18] text-[#fbfbfb99]  relative overflow-hidden">
      <RevealWrapper type="slide" direction="up" >
        {/* Background Grain Overlay */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
          style={{ 
            backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
            backgroundSize: '200px'
          }}
        />

        <div className="relative z-10 w-[90%] mx-auto border-l border-r border-white/10">
          {/* Top Section: Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10">
            {/* Column 1: Organised By */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
              <h3 className="text-[22px] font-black mb-6 tracking-wider uppercase text-[#e41c62]">{splitWords("ORGANISED BY")}</h3>
                 <div className="">
                  <img 
                    src="https://www.wofxworldexpo.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FWORLDEX.ee3fab01.png&w=256&q=75&dpl=dpl_9TTGzHYezibYPkiRPAGLB3PUm1i4" 
                    alt="Worldex India" 
                    className="h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
              <div className="space-y-4 text-[14px] leading-relaxed">
                <p>
                  {splitWords("309, Parvati Premises, Sun Mill Complex, Lower Parel (W), Mumbai - 400 013, India")}
                </p>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{splitWords("(+91) 022-4037-6700")}</span>
                </div>
                <div>
                  <motion.a 
                    href="mailto:contactus@worldexindia.com" 
                    className="hover:text-white transition-colors inline-block"
                    whileHover={{ rotate: -2, skewX: -10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {splitWords("contactus@worldexindia.com")}
                  </motion.a>
                </div>
             
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
              <h3 className="text-[22px] font-black mb-6 tracking-wider uppercase text-[#e41c62]">{splitWords("QUICK LINKS")}</h3>
              <ul className="space-y-3 text-[14px]">
                {['Exhibitor Enquiry Form', 'Buyer Registration Form', 'Exhibitor Profile', 'Buyer Profile', 'Terms and Conditions'].map((link) => (
                  <li key={link}>
                    <motion.a 
                      href="#" 
                      className="hover:text-white transition-colors inline-block origin-left"
                      whileHover={{ rotate: -1, skewX: -5, x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {splitWords(link)}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: About WOFX */}
            <div className="p-8 md:p-12">
              <h3 className="text-[22px] font-black mb-6 tracking-wider uppercase text-[#e41c62]">{splitWords("ABOUT WOFX")}</h3>
              <p className="text-[14px] leading-relaxed">
                {splitWords("WOFX is a professional B2B trade show dedicated exclusively to the furniture + design industry in India. It is a show where all categories of furniture and décor come together on one industry platform.")}
              </p>
            </div>
          </div>

          {/* Middle Section: Social Media Circles */}
          <div className="flex flex-wrap justify-around border-b border-white/10 py-8 md:py-16">
            {socialMedia.map((social) => (
              <Magnetic key={social.name}>
                <motion.div 
                  initial="initial"
                  whileHover="hover"
                  className="w-[104px] h-[104px] md:w-[166px] md:h-[166px] bg-transparent rounded-full border border-white/10 flex flex-col items-center justify-center hover:bg-[#e41c62] transition-colors duration-500 cursor-pointer group overflow-hidden"
                >
                  <div className="relative h-12 md:h-16 w-full flex flex-col items-center justify-center">
                    {/* Top Layer: Name */}
                    <motion.div 
                      variants={{
                        initial: { y: 0, opacity: 1 },
                        hover: { y: -40, opacity: 0 }
                      }}
                      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                      className="text-[12px] md:text-[14px] font-bold text-[#e41c62] group-hover:text-white tracking-widest uppercase absolute"
                    >
                      {social.name}
                    </motion.div>
                    
                    {/* Bottom Layer: Icon (Slide In) */}
                    <motion.div 
                      variants={{
                        initial: { y: 40, opacity: 0, scale: 0.5 },
                        hover: { y: 0, opacity: 1, scale: 1 }
                      }}
                      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                      className="text-white absolute"
                    >
                      {socialIcons[social.name]}
                    </motion.div>
                  </div>
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-xl scale-50" />
                </motion.div>
              </Magnetic>
            ))}
          </div>


          {/* Bottom Section: Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-3 text-center border-b border-white/10 text-white/60">
            <div className="py-6 md:py-8 border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center">
              <motion.a 
                href="#" 
                className="text-[15px] font-medium hover:text-white uppercase tracking-wide transition-colors inline-block"
                whileHover={{ rotate: -3, skewX: -15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {splitWords("Contact US")}
              </motion.a>
            </div>
            <div className="py-6 md:py-8 border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center">
              <p className="text-[15px] font-medium tracking-wide">
                {splitWords("© WOFX 2026 | All Rights Reserved.")}
              </p>
            </div>
            <div className="py-6 md:py-8 flex items-center justify-center">
              <motion.button 
                onClick={scrollToTop}
                className="text-[15px] font-medium hover:text-white uppercase tracking-wide cursor-pointer flex items-center gap-2 transition-colors origin-right"
                whileHover={{ rotate: 3, skewX: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {splitWords("Back to Top")}
                <ArrowUp size={16} />
              </motion.button>
            </div>
          </div>
          
          {/* Visual padding at very bottom like the image */}
          <div className="h-20" />
        </div>
      </RevealWrapper>
    </footer>
  );
};


export default Footer;
