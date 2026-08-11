'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { categories } from '@/data/categories';
import { motion } from 'framer-motion'; // <--- Added import

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-white text-center text-sm py-1">
        0300-8733555 | 03006773555 | 1-Babar Commercial Center, Kutchery Road, Multan
      </div>

      {/* Glassmorphism Main navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo Image */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Five Star Electronics Plus" 
              width={180} 
              height={60} 
              className="object-contain h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <div
              className="relative group"
              onMouseEnter={() => setHoveredCategory('CCTV Cameras')}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link href="#" className="text-gray-700 font-medium hover:text-primary transition-colors">
                Our Products
              </Link>
              {/* Mega menu */}
              {hoveredCategory && (
                <div className="absolute top-full left-0 w-96 bg-white/95 backdrop-blur-sm border border-border p-4 shadow-xl rounded-lg mt-2 transition-all duration-300 ease-in-out">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {categories.map(cat => (
                        <div
                          key={cat.name}
                          onMouseEnter={() => setHoveredCategory(cat.name)}
                          className="cursor-pointer hover:text-primary transition-colors"
                        >
                          {cat.emoji} {cat.name}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Browse all {hoveredCategory} products
                      </p>
                      <Link
                        href={`/category?slug=${categories.find(c => c.name === hoveredCategory)?.slug || ''}`}
                        className="mt-2 inline-block text-primary text-sm font-semibold hover:underline"
                      >
                        View All &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link href="/deals" className="text-gray-700 hover:text-primary transition-colors">Deals</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact Us</Link>
            <Link href="/faqs" className="text-gray-700 hover:text-primary transition-colors">FAQs</Link>
          </div>

          {/* Right side WhatsApp button */}
          <div className="hidden md:flex">
            <motion.a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-bright transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-b border-border p-4 fixed w-full z-40 top-23 shadow-lg"> {/* <--- Replaced calc with top-23 */}
          <div className="space-y-4">
            {categories.map(cat => (
              <div key={cat.name} className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                <span>{cat.emoji}</span>
                <Link href={`/category?slug=${cat.slug}`} onClick={() => setMobileMenuOpen(false)}>
                  {cat.name}
                </Link>
              </div>
            ))}
            <div className="pt-4 border-t border-border">
              <Link href="/deals" className="block text-gray-700 hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>Deals</Link>
              <Link href="/contact" className="block text-gray-700 hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
              <Link href="/faqs" className="block text-gray-700 hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
            </div>
            <div className="pt-4">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-primary text-white text-center py-2 rounded hover:bg-primary-bright transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}