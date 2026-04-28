/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowRight, Calendar, MapPin } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import AnimatedButton from './components/AnimatedButton';
import { CylinderText } from './components/CylinderText';
import AboutUs from './components/AboutUs/AboutUs';
import ShowHighlights from './components/ShowHighlights/ShowHighlights';
import { WOFXAdvantage } from './components/WOFXAdvantage';
import BrandsMarquee from './components/BrandsMarquee';
import Testimonials from './components/Testimonials';
import BuyerProfile from './components/BuyerProfile';
import IndustryBodies from './components/IndustryBodies';
import SupportingOrganisations from './components/SupportingOrganisations';
import PhilosophyGrid from './components/PhilosophyGrid';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import { LatestUpdates } from './components/LatestUpdates';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@#$%&';

const PHASES = [
  { id: 'INIT', label: 'Loading...' },
  { id: 'SYNC', label: 'WOFX 2026' },
];

export default function App() {
  const [phase, setPhase] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [displayText, setDisplayText] = useState(PHASES[0].label);
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Progress Counter for premium feel
  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 3000;
    const increment = end / (duration / 10);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setProgress(100);
      } else {
        setProgress(Math.floor(start));
      }
    }, 10);
    return () => clearInterval(timer);
  }, []);

  // Advanced Scramble - variable speed for organic feel
  useEffect(() => {
    let iter = 0;
    const target = PHASES[phase] ? PHASES[phase].label : 'READY';
    const interval = setInterval(() => {
      if (iter >= target.length + 5) {
        clearInterval(interval);
        return;
      }
      setDisplayText(
        target.split('').map((ch, i) => {
          const center = (target.length - 1) / 2;
          const dist = Math.abs(i - center);
          if (iter > dist * 1.2) return ch;
          return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
        }).join('')
      );
      iter += 0.45;
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  // Master Orchestration
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < PHASES.length; i++) {
      timers.push(setTimeout(() => setPhase(i), 1500 * i));
    }
    // Deep-Sequence Trigger
    timers.push(setTimeout(() => setRevealed(true), 3500));
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (revealed) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 4000);
    }
  }, [revealed]);

  return (
    <SmoothScroll onScroll={(scroll) => setIsScrolled(scroll > 50)}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#e41c62] origin-left z-[300]"
        style={{ scaleX }}
      />
      <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* Loading Overlay: Premium Reveal */}
      <AnimatePresence mode="wait">
        {!revealed && (
          <motion.div
            key="loader-env"
            exit={{ 
              opacity: 0,
              y: '-100%',
              transition: { duration: 1.2, ease: [0.87, 0, 0.13, 1], delay: 0.2 } 
            }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col items-center translate-y-[-20px]">
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                src="https://www.worldexindia.com/assets/newassests/TRIAL_WOFX%20LOGO.png" 
                alt="WOFX Logo"
                className="mb-12 h-32 md:h-48 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center justify-center overflow-hidden">
                <motion.h1 
                  key={phase}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans text-white text-3xl md:text-5xl uppercase text-center font-black"
                >
                  {displayText}
                </motion.h1>
              </div>
            </div>

            {/* Bottom Progress Bar - Full Width & Very Bottom */}
            <div className="absolute bottom-0 left-0 w-full flex flex-col items-center">
              <motion.span 
                className="text-white font-mono text-2xl md:text-3xl mb-6 md:mb-8 opacity-100 font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {progress}%
              </motion.span>
              <div className="w-full h-[16px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: `${progress - 100}%` }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0 bg-white"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE APP CONTENT (Revealed via ClipPath) */}
      <AnimatePresence>
        {revealed && (
          <motion.div 
            initial={{ 
              clipPath: 'circle(0% at 50% 50%)',
            }}
            animate={{ 
              clipPath: 'circle(150% at 50% 50%)',
            }}
            transition={{ 
              duration: 3.5, 
              ease: [0.87, 0, 0.13, 1],
            }}
            className="relative h-screen w-full"
          >
            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source
                  src="https://www.wofxworldexpo.com/assests/WOFX-Short-Video-2025.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Atmosphere Particles */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 4, delay: 1 }}
              className="absolute inset-0 z-[1] pointer-events-none"
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: [0, 0.3, 0],
                    y: [Math.random() * 100 + '%', Math.random() * -20 + '%'],
                    x: [Math.random() * 100 + '%', (Math.random() * 100 + 10) + '%']
                  }}
                  transition={{ 
                    duration: 15 + i * 2, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: i * 0.5
                  }}
                  className="absolute w-[1px] h-[1px] bg-white rounded-full"
                />
              ))}
            </motion.div>

      {/* Grainy Texture Overlay (Hero & Nav) */}
      <div 
        className="pointer-events-none absolute inset-0 z-[100] opacity-[0.4] mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px'
        }}
      />

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-12">
          {/* Left Side: Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <img 
              src="https://www.worldexindia.com/assets/newassests/TRIAL_WOFX%20LOGO.png" 
              alt="WOFX Logo"
              className="h-12 w-auto object-contain lg:h-16"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Right Side: Info & Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Date & Venue */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-accent flex flex-col items-end pr-8 text-right leading-tight"
            >
              <div className="flex items-center gap-2 font-display text-xl font-normal tracking-tight leading-none">
                <Calendar className="h-5 w-5" strokeWidth={2.5} />
                8 - 9 - 10 Dec. 2026
              </div>
              <div className="flex items-center gap-2 text-sm font-normal tracking-widest opacity-90 leading-none -mt-0.5">
                <MapPin className="h-4 w-4" strokeWidth={2.5} />
                Bombay Exhibition Center, Mumbai
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <AnimatedButton 
                initialText="EXHIBITOR ENQUIRY" 
                padding="px-4 py-3"
                className="text-xs"
              />
              <AnimatedButton 
                initialText="BUYER REGISTRATION" 
                primaryColor="#FFCC29"
                secondaryColor="#e41c62"
                initialTextColor="black"
                hoverTextColor="white"
                padding="px-4 py-3"
                className="text-xs"
              />
              <motion.button
                onClick={() => setMobileMenuOpen(true)}
                whileHover={{ 
                  backgroundColor: "#FFCC29",
                  rotate: -2,
                  scale: 1.05 
                }}
                transition={{ duration: 0.3 }}
                className="group bg-accent flex h-[46px] w-[46px] items-center justify-center text-white shadow-lg active:scale-95"
              >
                <div className="flex flex-col gap-1.5 transition-colors group-hover:text-black">
                  <div className="h-0.5 w-6 bg-current" />
                  <div className="h-0.5 w-6 bg-current" />
                  <div className="h-0.5 w-6 bg-current" />
                </div>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-2 lg:hidden">
            <AnimatedButton 
              className="px-4 py-3 text-sm"
              initialText="CONTACT"
              hoverText="CLICK"
            />
            <motion.button 
              onClick={() => setMobileMenuOpen(true)} 
              whileHover={{ rotate: -5, scale: 1.1, color: "#FFCC29" }}
              className="text-white transition-colors"
            >
              <Menu className="h-8 w-8" strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
        {/* Content removed per user request */}
      </main>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {revealed && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className="relative z-10"
    >
      {/* About Section */}
      <AboutUs ready={revealed} />

  

      {/* Show Highlights Section */}
      <ShowHighlights />

      {/* Philosophy Grid Section */}
      

     

      {/* Latest Updates Section */}
      <LatestUpdates />
  <WOFXAdvantage />
      <BrandsMarquee />
      <Testimonials />
      <PhilosophyGrid />
      <BuyerProfile />
      <IndustryBodies />
      <SupportingOrganisations />
      <Footer />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ 
              duration: 1.2, 
              ease: [0.87, 0, 0.13, 1] 
            }}
            className="fixed inset-0 z-[60] flex flex-col bg-black p-8 text-white overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-8">
              <img 
                src="https://www.worldexindia.com/assets/newassests/TRIAL_WOFX%20LOGO.png" 
                alt="WOFX Logo"
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X className="h-8 w-8" strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4 text-4xl font-bold uppercase md:text-7xl">
              {['Program', 'Exhibitors', 'Venue', 'About', 'Contact'].map((item, idx) => (
                <div key={item} className="flex">
                  <CylinderText 
                    text={item} 
                    trigger="load" 
                    ready={mobileMenuOpen}
                    delay={0.6 + idx * 0.1}
                    className="font-bold tracking-tighter"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </SmoothScroll>
  );
}

