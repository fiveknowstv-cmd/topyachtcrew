'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

const employerBenefits = [
  'Post a position in under 90 seconds',
  'Receive an AI-curated shortlist of 5–8 perfect matches',
  'Access full verified profiles, references & sea time logs',
  'In-platform messaging, scheduling & e-contracts',
  'Dedicated placement concierge at no extra cost',
  'Post seasonal, permanent, relief, or delivery roles',
];

export function ForEmployers() {
  return (
    <section id="for-employers" className="py-20 border-t border-b border-[var(--border-subtle)] bg-[var(--navy-dark)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
          <div>
            <div className="uppercase tracking-[3px] text-xs font-medium text-[var(--gold)] mb-3">FOR OWNERS & CAPTAINS</div>
            <h2 className="section-heading text-6xl tracking-tighter font-semibold leading-none mb-6">
              Hire with confidence.<br />Every single time.
            </h2>
            <p className="text-2xl text-[var(--text-muted)] max-w-md">
              Stop wasting weeks reviewing hundreds of unsuitable CVs. Our AI + expert team delivers only the candidates who truly fit.
            </p>

            <div className="mt-8">
              <Button variant="navy" size="lg" asChild>
                <Link href="/employers/post-job">Post Your First Position — Free</Link>
              </Button>
              <p className="text-xs text-[var(--text-muted)] mt-3">No subscription required for your first placement.</p>
            </div>
          </div>

          <div className="space-y-4">
            {employerBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--navy-elevated)] border border-[var(--border-subtle)]">
                <CheckCircle2 className="w-6 h-6 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <span className="text-lg text-[var(--text)]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
