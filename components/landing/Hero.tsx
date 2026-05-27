'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-[var(--navy-dark)]">
      {/* Cinematic luxury superyacht background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/images/hero-yacht.jpg')` 
        }}
      />
      
      {/* Dark cinematic overlay for premium contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
      
      {/* Subtle elegant grid / tech overlay for futuristic AI feel */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A26F_0.4px,transparent_1px)] bg-[length:8px_8px] opacity-5" />

      <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-24 text-center text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-sm backdrop-blur border border-white/20 mb-6">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full animate-pulse" />
            Trusted by Captains of the World’s Finest Superyachts
          </div>

          <h1 className="font-display text-[80px] md:text-[96px] leading-[0.9] tracking-[-5px] font-semibold mb-6">
            TopYachtCrew.com
          </h1>

          <p className="max-w-2xl mx-auto text-2xl md:text-3xl text-white/90 font-light tracking-[-0.3px] mb-6">
            Elite Crew. AI-Powered Perfect Matches.
          </p>



          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70 mb-8">
            <span>AI Smart Matching</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>Verified Credentials</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>Video Interviews</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>Cultural Fit</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="gold"
              size="lg"
              className="group w-full sm:w-auto text-lg px-10"
              asChild
            >
              <Link href="/signup">
                Join as Crew — It’s Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-lg border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="#for-employers">
                Hire Elite Crew
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex justify-center">
            <a 
              href="#how-it-works" 
              className="flex items-center gap-2 text-sm uppercase tracking-[2px] text-white/60 hover:text-white transition group"
            >
              See how it works
              <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition">
                <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />
    </section>
  );
}
