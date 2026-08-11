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

  // Array of your images located in the /public folder
  const slides = [
    { src: '/slide1.png', alt: 'Cinematic Security 1' },
    { src: '/slide2.png', alt: 'Cinematic Security 2' },
    { src: '/slide3.png', alt: 'Cinematic Security 3' },
    { src: '/slide4.png', alt: 'Cinematic Security 4' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline to crossfade the 4 images based on scroll position (0 to 1)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,           // Keeps the section pinned in the center
          scrub: 1,            // Ties the animation perfectly to your scroll speed
          markers: false,      // Set to true if you want to debug the boundaries
        },
      });

      // Fade out Image 1, fade in Image 2 (at 25% of the scroll)
      tl.to('.slide-1', { opacity: 0, duration: 0.5 }, 0)
        .to('.slide-2', { opacity: 1, duration: 0.5 }, 0)
        
        // Fade out Image 2, fade in Image 3 (at 50% of the scroll)
        .to('.slide-2', { opacity: 0, duration: 0.5 }, 0.15)
        .to('.slide-3', { opacity: 1, duration: 0.5 }, 0.15)

        // Fade out Image 3, fade in Image 4 (at 75% of the scroll)
        .to('.slide-3', { opacity: 0, duration: 0.5 }, 0.30)
        .to('.slide-4', { opacity: 1, duration: 0.5 }, 0.30);

      // Animate the text fading in at the start
      tl.fromTo('.story-text', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0);
      
      // Animate the glass cards sliding in from the sides
      tl.fromTo('.glass-card-1', { x: -100, opacity: 0, rotate: -5 }, { x: 0, opacity: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4')
        .fromTo('.glass-card-2', { x: 100, opacity: 0, rotate: 5 }, { x: 0, opacity: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4');

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      
      {/* 🖼️ 4 BACKGROUND IMAGES (Layered on top of each other) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 slide-${index + 1} ${index === 0 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0} // Only load the first image instantly
            />
            {/* Constant Dark Overlay so white text stays readable over any image */}
            <div className="absolute inset-0 bg-black/40 z-10"></div> 
          </div>
        ))}
      </div>

      {/* The Pinned Text & Glass Cards Container */}
      <div ref={triggerRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 md:p-16">
        <div className="max-w-5xl text-center relative z-10 story-text">
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Elevate Your Security <br />
            with <span className="text-primary">Five Star</span>
          </h2>

          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md">
            We combine cutting-edge technology with expert installation, 
            tailored specifically for the needs of Multan.
          </p>

          {/* Glassmorphism Cards sliding in from left and right */}
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <div className="glass-card-1 bg-white/20 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-2xl w-full md:w-1/3 text-left">
              <div className="text-primary text-3xl mb-2">🔒</div>
              <h4 className="font-bold text-white">Unmatched Safety</h4>
              <p className="text-gray-200 text-sm mt-2">Top-tier CCTV & Access Control systems for your peace of mind.</p>
            </div>
            
            <div className="glass-card-2 bg-white/20 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-2xl w-full md:w-1/3 text-left">
              <div className="text-primary text-3xl mb-2">⚡</div>
              <h4 className="font-bold text-white">Rapid Support</h4>
              <p className="text-gray-200 text-sm mt-2">Expert installation and after-sales support right here in Multan.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}