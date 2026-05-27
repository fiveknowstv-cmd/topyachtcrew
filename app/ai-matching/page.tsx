'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { calculateMatch } from '@/lib/ai-matching';
import { mockCrew, mockJobs } from '@/lib/mock-data';
import Link from 'next/link';

export default function AIMatchingPage() {
  const [minScore, setMinScore] = useState(65);
  const [positionFilter, setPositionFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'score' | 'experience'>('score');
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set());

  const allMatches = useMemo(() => {
    return mockCrew.flatMap(crew =>
      mockJobs.map(job => {
        const result = calculateMatch(crew, job);
        return {
          id: `${crew.id}-${job.id}`,
          crew,
          job,
          ...result,
        };
      })
    );
  }, []);

  const filteredMatches = useMemo(() => {
    let results = allMatches.filter(m => m.score >= minScore);

    if (positionFilter !== 'All') {
      results = results.filter(m => 
        m.job.position.toLowerCase().includes(positionFilter.toLowerCase()) ||
        m.crew.position.toLowerCase().includes(positionFilter.toLowerCase())
      );
    }

    return results.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      return b.crew.yearsExperience - a.crew.yearsExperience;
    });
  }, [allMatches, minScore, positionFilter, sortBy]);

  const toggleShortlist = (id: string) => {
    const newSet = new Set(shortlisted);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setShortlisted(newSet);
  };

  const uniquePositions = ['All', 'Chief Stewardess', 'Second Engineer', 'Head of Interior'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-display text-5xl tracking-tighter font-semibold">AI Crew Matching</h1>
          <p className="text-[var(--text-muted)] mt-2 text-lg max-w-2xl">
            Our proprietary algorithm analyzes technical skills, experience relevance, verified credentials, 
            cultural fit, and availability to deliver exceptionally accurate matches.
          </p>
        </div>
        <Link href="/dashboard/employer">
          <Button variant="navy">Back to Dashboard</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-[var(--navy-elevated)] border border-[var(--border-subtle)] rounded-3xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-end">
          <div className="flex-1">
            <label className="block text-sm text-[var(--text-muted)] mb-2">Minimum Match Score</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-[var(--gold)]"
              />
              <div className="text-[var(--gold)] font-semibold w-14 text-right">{minScore}%+</div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[var(--text-muted)] mb-2">Position</label>
            <select 
              value={positionFilter} 
              onChange={(e) => setPositionFilter(e.target.value)}
              className="input-luxury px-4 py-2.5 rounded-2xl w-52"
            >
              {uniquePositions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-[var(--text-muted)] mb-2">Sort by</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-luxury px-4 py-2.5 rounded-2xl"
            >
              <option value="score">Highest Match Score</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => {
            const isShortlisted = shortlisted.has(match.id);

            return (
              <div 
                key={match.id} 
                className="card p-8 rounded-3xl hover:border-[var(--gold)] transition-all duration-200"
              >
                <div className="flex flex-col xl:flex-row xl:items-center gap-6">
                  {/* Crew Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-semibold">{match.crew.fullName}</h3>
                      <div className="text-sm px-3 py-1 rounded-full bg-[var(--navy)] border border-[var(--border-subtle)]">
                        {match.crew.position}
                      </div>
                    </div>
                    <div className="text-[var(--text-muted)]">
                      {match.crew.yearsExperience} years experience • Based in {match.crew.location}
                    </div>
                  </div>

                  {/* Match Score - Large and Prominent */}
                  <div className="text-center xl:text-right">
                    <div className="text-7xl font-semibold text-[var(--gold)] tracking-[-3px] leading-none">
                      {match.score}
                      <span className="text-3xl align-super font-medium">%</span>
                    </div>
                    <div className="text-xs uppercase tracking-[1px] text-[var(--text-muted)] mt-1">Match Score</div>
                  </div>
                </div>

                {/* Job Info */}
                <div className="mt-5 pt-5 border-t border-[var(--border-subtle)]">
                  <div className="font-medium text-lg text-white">
                    {match.job.title} — {match.job.yachtType}
                  </div>
                  <div className="text-[var(--text-muted)]">{match.job.location}</div>
                </div>

                {/* AI Breakdown - More Detailed */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(match.breakdown).map(([key, value]) => (
                    <div key={key} className="bg-[var(--navy)] rounded-2xl p-4 border border-[var(--border-subtle)]">
                      <div className="text-xs text-[var(--text-muted)] tracking-wide mb-1">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="text-3xl font-semibold text-[var(--gold)]">{value}<span className="text-base font-normal">%</span></div>
                    </div>
                  ))}
                </div>

                {/* Rich Explanations */}
                <div className="mt-6">
                  <div className="text-sm font-medium text-[var(--text-muted)] mb-3 tracking-wide">
                    Why this is an exceptional match
                  </div>
                  <ul className="space-y-2.5 text-[15px] text-white/90">
                    {match.reasons.map((reason, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-[var(--gold)] mt-1">→</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex flex-wrap gap-3">
                  <Button variant="gold" size="sm">
                    View Full Profile
                  </Button>
                  <Button 
                    variant="navy" 
                    size="sm"
                    onClick={() => toggleShortlist(match.id)}
                  >
                    {isShortlisted ? '★ Shortlisted' : 'Shortlist Candidate'}
                  </Button>
                  <Button variant="navy" size="sm">
                    Message Crew Member
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 text-[var(--text-muted)]">
            No matches found above {minScore}% with current filters.
          </div>
        )}
      </div>
    </div>
  );
}

