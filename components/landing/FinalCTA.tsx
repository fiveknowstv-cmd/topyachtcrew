'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <section className="py-24 bg-[var(--cream)] border-t border-b border-[var(--navy)]/10">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="font-display text-6xl md:text-7xl tracking-tighter font-semibold mb-6 leading-none">
          Ready to find your perfect match at sea?
        </div>
        <p className="text-2xl text-[var(--text-muted)] max-w-md mx-auto mb-10">
          Join the most exclusive network in professional yachting today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gold" size="lg" asChild>
            <Link href="/signup">Create Crew Profile</Link>
          </Button>
          <Button variant="navy" size="lg" asChild>
            <Link href="/employers/post-job">Post a Position</Link>
          </Button>
        </div>

        <p className="text-xs text-[var(--text-muted)] mt-8">
          Free for crew. Transparent pricing for employers.
        </p>
      </div>
    </section>
  );
}
