'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // ✍️ FILLED WITH YOUR PREMIUM PRODUCT COPY
  const slidesData = [
    { 
      src: '/slide1.png', 
      alt: 'CCTV Solutions', 
      title: 'Ultra HD CCTV Systems', 
      desc: 'Advanced surveillance with cutting-edge night vision and AI-powered motion detection for complete peace of mind.' 
    },
    { 
      src: '/slide2.png', 
      alt: 'Access Control', 
      title: 'Smart Access Control', 
      desc: 'Secure every entry point with modern fingerprint and facial recognition entry systems designed for total safety.' 
    },
    { 
      src: '/slide3.png', 
      alt: 'Networking Gear', 
      title: 'Enterprise Networking', 
      desc: 'High-speed routers, POE switches, and fiber optics for seamless connectivity in your home or business.' 
    },
    { 
      src: '/slide4.png', 
      alt: 'Security Solutions', 
      title: 'Integrated Security', 
      desc: 'A complete ecosystem of safes, fire safety, and telecom solutions tailored specifically to protect what matters most.' 
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,
          scrub: 1.2, // Slow, cinematic scroll
          markers: false,
        },
      });

      // --- TRANSITION 1: Slide 1 to Slide 2 ---
      tl.to('.slide-1', { opacity: 0, scale: 1.1, duration: 0.6 }, 0)
        .to('.text-1', { opacity: 0, duration: 0.5 }, 0)
        .to('.slide-2', { opacity: 1, scale: 1.0, duration: 0.6 }, 0)
        .to('.text-2', { opacity: 1, duration: 0.5 }, 0);

      // --- TRANSITION 2: Slide 2 to Slide 3 ---
      tl.to('.slide-2', { opacity: 0, scale: 1.1, duration: 0.6 }, 0.15)
        .to('.text-2', { opacity: 0, duration: 0.5 }, 0.15)
        .to('.slide-3', { opacity: 1, scale: 1.0, duration: 0.6 }, 0.15)
        .to('.text-3', { opacity: 1, duration: 0.5 }, 0.15);

      // --- TRANSITION 3: Slide 3 to Slide 4 ---
      tl.to('.slide-3', { opacity: 0, scale: 1.1, duration: 0.6 }, 0.30)
        .to('.text-3', { opacity: 0, duration: 0.5 }, 0.30)
        .to('.slide-4', { opacity: 1, scale: 1.0, duration: 0.6 }, 0.30)
        .to('.text-4', { opacity: 1, duration: 0.5 }, 0.30);

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      
      {/* 1. LAYERED BACKGROUND IMAGES */}
      <div className="absolute inset-0 z-0">
        {slidesData.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 slide-${index + 1} ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image 
              src={slide.src} 
              alt={slide.alt} 
              fill 
              className="object-cover" 
              priority={index === 0} 
            />
            {/* Dark tint for text readability */}
            <div className="absolute inset-0 bg-black/40 z-10"></div> 
          </div>
        ))}
      </div>

      {/* 2. CROSSFADING TEXT & GLASS CARDS */}
      <div ref={triggerRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 md:p-16">
        
        {/* Text Container - Fixed height prevents layout jumping */}
        <div className="relative w-full max-w-5xl h-[200px] md:h-[280px] flex flex-col items-center justify-center text-center">
          {slidesData.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 flex flex-col items-center justify-center text-center text-${index + 1} ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto mt-4 leading-relaxed drop-shadow-md">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Static Glass Cards (No heavy sliding, just clean UI) */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mt-8 md:mt-12 relative z-30">
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-2xl w-full md:w-1/3 text-left">
            <div className="text-primary text-3xl mb-2">🔒</div>
            <h4 className="font-bold text-white">Unmatched Safety</h4>
            <p className="text-gray-200 text-sm mt-2">Top-tier CCTV & Access Control systems for your peace of mind.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-2xl w-full md:w-1/3 text-left">
            <div className="text-primary text-3xl mb-2">⚡</div>
            <h4 className="font-bold text-white">Rapid Support</h4>
            <p className="text-gray-200 text-sm mt-2">Expert installation and after-sales support right here in Multan.</p>
          </div>
        </div>

      </div>
    </section>
  );
}