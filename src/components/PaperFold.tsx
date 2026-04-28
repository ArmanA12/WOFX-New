import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextSplitterProps {
  text: string;
  type: 'chars' | 'words';
}

const TextSplitter: React.FC<TextSplitterProps> = ({ text, type }) => {
  const items = type === 'chars' ? text.split('') : text.split(' ');
  return (
    <>
      {items.map((item, i) => (
        <span 
          key={i} 
          className={`inline-block whitespace-pre ${type === 'chars' ? 'char-item' : 'word-item'}`}
        >
          {item}{type === 'words' && i !== items.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
};

interface PaperFoldProps {
  text: string;
  type?: 'chars' | 'words';
  className?: string; // For size and color
  containerClassName?: string;
  style?: React.CSSProperties;
}

export const PaperFold: React.FC<PaperFoldProps> = ({ 
  text, 
  type = 'chars', 
  className = "text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter",
  containerClassName = "w-full min-h-[400px] flex items-center justify-center p-8 overflow-hidden bg-transparent",
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    
    // Scoped GSAP context
    const ctx = gsap.context(() => {
      const items = textRef.current?.querySelectorAll(type === 'chars' ? '.char-item' : '.word-item');
      const target = (items && items.length > 0) ? items : textRef.current;
      
      gsap.from(target, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
        y: 25, // 50 * 0.5
        opacity: 0,
        rotationX: -45,
        stagger: 0.04,
        duration: 1.76,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [type]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <div ref={textRef} className="text-center overflow-visible">
        <h2 className={className} style={style}>
          <TextSplitter text={text} type={type} />
        </h2>
      </div>
    </div>
  );
};
