'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#for-crew', label: 'For Crew' },
    { href: '#for-employers', label: 'For Employers' },
    { href: '#how-it-works', label: 'How it Works' },
    { href: '#ai-powered', label: 'AI Matching' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-dark border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[var(--navy-elevated)] flex items-center justify-center border border-[var(--gold)]/30">
            <Anchor className="w-5 h-5 text-[var(--gold)]" />
          </div>
          <div>
            <div className="font-display text-2xl font-semibold tracking-tighter text-[var(--text)]">
              TopYachtCrew
            </div>
            <div className="text-[10px] text-[var(--gold)] -mt-1.5 tracking-[3px] font-medium">
              EST 2018
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-9 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--text)] hover:text-[var(--gold)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-[var(--text)] hover:text-[var(--gold)] transition-colors px-4"
          >
            Log in
          </Link>
          <Button variant="gold" size="sm" asChild>
            <Link href="/employers/post-job">Post a Job</Link>
          </Button>
          <Button variant="navy" size="sm" asChild>
            <Link href="/signup">Join as Crew</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[var(--text)]"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-[var(--navy-elevated)] px-6 py-6 flex flex-col gap-5 text-base font-medium border-[var(--border-subtle)]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-1 text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col gap-3">
            <Link href="/login" className="py-2 text-center text-[var(--text)]" onClick={() => setIsOpen(false)}>
              Log in
            </Link>
            <Button variant="gold" asChild>
              <Link href="/employers/post-job" onClick={() => setIsOpen(false)}>Post a Job</Link>
            </Button>
            <Button variant="navy" asChild>
              <Link href="/signup" onClick={() => setIsOpen(false)}>Join as Crew</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
