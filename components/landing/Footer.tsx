import React from 'react';
import Link from 'next/link';
import { Anchor } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--navy-dark)] text-white/70 pt-16 pb-10 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-y-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Anchor className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <span className="font-display text-2xl text-white tracking-tighter">TopYachtCrew</span>
          </div>
          <p className="text-xs max-w-[220px]">The intelligent platform for the world’s elite superyacht professionals.</p>
        </div>

        <div>
          <div className="font-medium text-white mb-4 tracking-widest text-xs">FOR CREW</div>
          <div className="space-y-2.5">
            <Link href="/signup" className="block hover:text-white">Join Now</Link>
            <Link href="#ai-powered" className="block hover:text-white">AI Matching</Link>
            <Link href="/crew" className="block hover:text-white">Browse Opportunities</Link>
          </div>
        </div>

        <div>
          <div className="font-medium text-white mb-4 tracking-widest text-xs">FOR EMPLOYERS</div>
          <div className="space-y-2.5">
            <Link href="/employers/post-job" className="block hover:text-white">Post a Job</Link>
            <Link href="/employers" className="block hover:text-white">Search Crew</Link>
            <Link href="#for-employers" className="block hover:text-white">How We Help</Link>
          </div>
        </div>

        <div>
          <div className="font-medium text-white mb-4 tracking-widest text-xs">COMPANY</div>
          <div className="space-y-2.5">
            <a href="#" className="block hover:text-white">About Us</a>
            <a href="#" className="block hover:text-white">Our Story</a>
            <a href="#" className="block hover:text-white">Careers</a>
            <a href="#" className="block hover:text-white">Press</a>
          </div>
        </div>

        <div>
          <div className="font-medium text-white mb-4 tracking-widest text-xs">SUPPORT</div>
          <div className="space-y-2.5">
            <a href="#" className="block hover:text-white">Help Center</a>
            <a href="#" className="block hover:text-white">Contact Concierge</a>
            <a href="#" className="block hover:text-white">Privacy &amp; Trust</a>
            <a href="#" className="block hover:text-white">Legal</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-white/50 gap-y-2">
        <div>© {currentYear} TopYachtCrew Ltd. All rights reserved.</div>
        <div className="flex gap-x-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Modern Slavery Statement</a>
        </div>
      </div>
    </footer>
  );
}
