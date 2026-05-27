'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Award, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Matching',
    desc: 'Our proprietary engine analyzes 70+ data points — experience, certifications, personality fit, yacht type preference, and voyage history — to surface perfect matches in seconds.',
  },
  {
    icon: Shield,
    title: 'Verified Professionals',
    desc: 'Every crew member undergoes rigorous identity, reference, and certification verification. Employers receive complete, trustworthy profiles.',
  },
  {
    icon: Award,
    title: 'Premium Placements',
    desc: 'We specialize in 40m+ yachts. Our crew are placed on the most prestigious vessels in the Mediterranean, Caribbean, Pacific, and beyond.',
  },
  {
    icon: Users,
    title: 'Dedicated Concierge',
    desc: 'Human expertise when you need it. Every placement is supported by our specialist team with decades of superyacht experience.',
  },
  {
    icon: Globe,
    title: 'Global Opportunities',
    desc: 'Seasonal contracts, permanent positions, relief work, and delivery voyages across every major yachting destination worldwide.',
  },
  {
    icon: Clock,
    title: 'Rapid Turnaround',
    desc: 'Qualified crew can be shortlisted and contacted within hours. Most positions are filled within 5 days of posting.',
  },
];

export function Features() {
  return (
    <section id="for-crew" className="py-20 bg-[var(--navy-dark)] border-t border-b border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <div className="uppercase tracking-[3px] text-xs font-medium text-[var(--gold)] mb-3">FOR CREW</div>
          <h2 className="section-heading text-6xl tracking-tighter font-semibold text-balance">
            Your career, elevated.
          </h2>
          <p className="mt-5 text-xl text-[var(--text-muted)]">
            Stop scrolling through generic job boards. Get discovered by captains and owners who value experience and professionalism.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                className="card p-8 rounded-2xl group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--gold)]/20 transition">
                  <Icon className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-3">{feature.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a href="/signup" className="inline-flex items-center text-sm font-medium text-[var(--text)] hover:text-[var(--gold)]">
            Create your free crew profile →
          </a>
        </div>
      </div>
    </section>
  );
}
