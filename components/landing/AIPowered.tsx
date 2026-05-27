'use client';

import React from 'react';
import { Brain, Target, FileSearch, Users2 } from 'lucide-react';

const aiFeatures = [
  {
    icon: Brain,
    title: 'Semantic Understanding',
    desc: 'Our models understand context — not just keywords. We know that “3 years on a 50m Feadship” means something very different from the same time on a busy charter 35m.',
  },
  {
    icon: Target,
    title: 'Precision Matching',
    desc: 'Beyond hard skills, we factor in soft attributes: leadership style, crew dynamics, owner preferences, and even language nuances that make or break a placement.',
  },
  {
    icon: FileSearch,
    title: 'Intelligent Screening',
    desc: 'AI pre-screens every application, surfaces red flags, and highlights exceptional candidates so captains spend time only on the very best fits.',
  },
  {
    icon: Users2,
    title: 'Crew Chemistry Engine',
    desc: 'We analyze team composition across the entire yacht. Our system can recommend a Chief Stewardess who will thrive with your existing interior team.',
  },
];

export function AIPowered() {
  return (
    <section id="ai-powered" className="py-20 bg-[var(--navy)] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <div className="uppercase tracking-[3px] text-xs font-medium text-[var(--gold)] mb-3">THE DIFFERENCE</div>
          <h2 className="font-display text-6xl tracking-tighter font-semibold leading-none">
            AI built exclusively for<br />superyacht placements.
          </h2>
          <p className="mt-5 text-2xl text-white/70">
            Most platforms use generic algorithms. Ours was trained on 12+ years of real superyacht placements — understanding vessel size, owner profiles, crew dynamics, and the subtle factors that determine whether a placement succeeds or fails.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="border border-white/10 rounded-3xl p-9 hover:border-[var(--gold)]/40 transition group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-7 group-hover:bg-[var(--gold)]/10">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-semibold tracking-tight mb-4">{feature.title}</h3>
                <p className="text-lg text-white/70 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center text-sm text-white/50">
          Powered by advanced large language models + 12 years of curated placement data from the world’s top agencies.
        </div>
      </div>
    </section>
  );
}
