'use client';

import React from 'react';

const testimonials = [
  {
    quote: "In 11 years running yachts I’ve never seen anything like it. The quality of candidates and the speed of the process is unmatched. We filled our entire interior team in 8 days.",
    name: "Capt. Marcus Hale",
    role: "Captain, 58m Motor Yacht — Mediterranean",
  },
  {
    quote: "I had three offers within 48 hours of creating my profile. The AI matched me perfectly with a 47m sailing yacht that wanted exactly my combination of dive instructor + stew experience.",
    name: "Elena Voss",
    role: "Chief Stewardess, 47m Sailing Yacht",
  },
  {
    quote: "The chemistry engine is real. They recommended a Second Engineer who not only had the right tickets but whose personality fit perfectly with our existing deck team. It just worked.",
    name: "Sarah Kensington",
    role: "Owner, 42m Explorer Yacht",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-[var(--navy-dark)] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="uppercase tracking-[3px] text-xs font-medium text-[var(--gold)] mb-3">REAL RESULTS</div>
          <h2 className="font-display text-6xl tracking-tighter font-semibold">Loved by the best in the business.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-9 flex flex-col">
              <blockquote className="text-xl leading-tight flex-1">
                “{t.quote}”
              </blockquote>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="font-semibold tracking-tight">{t.name}</div>
                <div className="text-sm text-white/60 mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
