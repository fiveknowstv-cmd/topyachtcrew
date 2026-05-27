'use client';

import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    desc: 'Upload your CV, certifications, sea time, and preferences. Our AI instantly builds a rich, searchable professional profile.',
  },
  {
    number: '02',
    title: 'Get AI-Matched',
    desc: 'Receive tailored job recommendations based on your experience, desired itinerary, salary expectations, and crew chemistry.',
  },
  {
    number: '03',
    title: 'Connect & Interview',
    desc: 'Message directly, schedule video interviews, and complete reference checks — all within the platform.',
  },
  {
    number: '04',
    title: 'Set Sail',
    desc: 'Accept your placement, sign digital contracts, and receive full onboarding support from our concierge team.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[var(--navy-elevated)] border-y border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="uppercase tracking-[3px] text-xs font-medium text-[var(--gold)] mb-3">THE PROCESS</div>
          <h2 className="section-heading text-6xl tracking-tighter font-semibold">
            How TopYachtCrew works
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-xl text-[var(--text-muted)]">
            From profile to placement in four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="font-display text-[92px] font-semibold tracking-[-6px] text-[var(--gold)]/15 absolute -top-8 -left-1 select-none">
                {step.number}
              </div>
              <div className="pt-10">
                <div className="text-2xl font-semibold tracking-tight mb-4 text-[var(--cream)]">{step.title}</div>
                <p className="text-[var(--text-muted)] leading-relaxed pr-4">{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-px h-2/3 bg-gradient-to-b from-[var(--gold)]/20 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
