'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { calculateMatch } from '@/lib/ai-matching';
import { mockCrew, mockJobs } from '@/lib/mock-data';
import { CrewProfile, Job } from '@/types';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AIMatchingPage() {
  const [minScore, setMinScore] = useState(65);
  const [positionFilter, setPositionFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'score' | 'experience'>('score');
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

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

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      results = results.filter(m =>
        m.crew.fullName.toLowerCase().includes(term) ||
        m.crew.position.toLowerCase().includes(term) ||
        m.job.title.toLowerCase().includes(term) ||
        m.job.yachtType.toLowerCase().includes(term)
      );
    }

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
  }, [allMatches, minScore, positionFilter, sortBy, searchTerm]);

  const toggleShortlist = (id: string) => {
    const newSet = new Set(shortlisted);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setShortlisted(newSet);
  };

  const uniquePositions = ['All', 'Chief Stewardess', 'Second Stewardess', 'Deckhand', 'Bosun', 'Chief Engineer', 'Second Engineer', 'Head of Interior'];

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
          {/* Search */}
          <div className="flex-1 min-w-[260px]">
            <label className="block text-sm text-[var(--text-muted)] mb-2">Search candidates</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or position..."
              className="input-luxury w-full px-4 py-2.5 rounded-2xl"
            />
          </div>

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
          filteredMatches.map((match, index) => {
            const isShortlisted = shortlisted.has(match.id);

            const openProfile = (e?: React.MouseEvent) => {
              if (e) e.stopPropagation();
              setSelectedMatch(match);
            };

            const handleShortlist = (e: React.MouseEvent) => {
              e.stopPropagation();
              toggleShortlist(match.id);
              
              if (!isShortlisted) {
                toast.success(`${match.crew.fullName} added to shortlist`, {
                  description: `Strong ${match.score}% match for ${match.job.title} on ${match.job.yachtType}.`,
                  action: {
                    label: "View Shortlist",
                    onClick: () => console.log("Shortlist view (demo)"),
                  },
                });
              } else {
                toast.info(`Removed ${match.crew.fullName} from shortlist`);
              }
            };

            return (
              <motion.div 
                key={match.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.4) }}
                whileHover={{ scale: 1.005, y: -1 }}
                onClick={openProfile}
                className="card p-8 rounded-3xl hover:border-[var(--gold)] hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col xl:flex-row xl:items-center gap-6">
                  {/* Crew Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-semibold group-hover:text-[var(--gold)] transition-colors">{match.crew.fullName}</h3>
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
                    <div key={key} className="bg-[var(--navy)] rounded-2xl p-4 border border-[var(--border-subtle)] group-hover:border-[var(--gold)]/30 transition-colors">
                      <div className="text-xs text-[var(--text-muted)] tracking-wide mb-1">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="text-3xl font-semibold text-[var(--gold)]">{value}<span className="text-base font-normal">%</span></div>
                    </div>
                  ))}
                </div>

                {/* Elevated, Luxurious Explanations */}
                <div className="mt-6">
                  <div className="text-sm font-medium text-[var(--text-muted)] mb-3 tracking-[0.5px] uppercase">
                    Why this is an exceptional match
                  </div>
                  <ul className="space-y-2.5 text-[15px] text-white/90 leading-relaxed">
                    {match.reasons.map((reason, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-[var(--gold)] mt-1.5">→</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex flex-wrap gap-3" onClick={(e) => e.stopPropagation()}>
                  <Button variant="gold" size="sm" onClick={openProfile}>
                    View Full Profile
                  </Button>
                  <Button 
                    variant="navy" 
                    size="sm"
                    onClick={handleShortlist}
                  >
                    {isShortlisted ? '★ Shortlisted' : 'Shortlist Candidate'}
                  </Button>
                  <Button variant="navy" size="sm">
                    Message Crew Member
                  </Button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-16 text-[var(--text-muted)]">
            No matches found above {minScore}% with current filters.
          </div>
        )}
      </div>

      {/* Premium Profile Preview Modal */}
      <Modal
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
        title={selectedMatch ? `${selectedMatch.crew.fullName} — Profile Preview` : ''}
        size="xl"
        footer={
          selectedMatch && (
            <div className="flex gap-3">
              <Button variant="navy" onClick={() => setSelectedMatch(null)}>
                Close
              </Button>
              <Button 
                variant="gold" 
                onClick={() => {
                  if (selectedMatch) {
                    toggleShortlist(selectedMatch.id);
                    const isNowShortlisted = !shortlisted.has(selectedMatch.id);
                    if (isNowShortlisted) {
                      toast.success(`Added ${selectedMatch.crew.fullName} to shortlist`);
                    }
                  }
                  setSelectedMatch(null);
                }}
              >
                {selectedMatch && shortlisted.has(selectedMatch.id) ? 'Remove from Shortlist' : 'Add to Shortlist'}
              </Button>
              <Button variant="navy">Contact via Platform</Button>
            </div>
          )
        }
      >
        {selectedMatch && (
          <div className="space-y-8">
            {/* Header with Photo + Key Info */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-[var(--gold)]/70 flex-shrink-0 bg-[var(--navy)]">
                {selectedMatch.crew.photoUrl ? (
                  <img 
                    src={selectedMatch.crew.photoUrl} 
                    alt={selectedMatch.crew.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-semibold text-[var(--gold)]">
                    {selectedMatch.crew.fullName.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-3xl font-semibold">{selectedMatch.crew.fullName}</h2>
                  <div className="px-3 py-1 rounded-full bg-[var(--navy)] border border-[var(--gold)]/50 text-sm text-[var(--gold)]">
                    {selectedMatch.crew.position}
                  </div>
                  {selectedMatch.crew.verified && (
                    <div className="text-xs px-2.5 py-1 rounded bg-[var(--gold)]/10 text-[var(--gold)]">VERIFIED</div>
                  )}
                </div>
                
                <div className="text-[var(--text-muted)] text-lg">
                  {selectedMatch.crew.yearsExperience} years • {selectedMatch.crew.location} • {selectedMatch.crew.availability === 'immediate' ? 'Available immediately' : 'Available in 1 month'}
                </div>

                <div className="mt-3 text-[var(--gold)] text-5xl font-semibold tracking-[-2px]">
                  {selectedMatch.score}<span className="text-2xl align-super">%</span>
                  <span className="text-base align-middle ml-2 text-[var(--text-muted)] font-normal tracking-normal">match for this role</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <div className="uppercase text-xs tracking-[1px] text-[var(--text-muted)] mb-2">Professional Profile</div>
              <p className="text-[15px] leading-relaxed text-white/90">{selectedMatch.crew.bio}</p>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[var(--navy)] rounded-2xl p-4 border border-[var(--border-subtle)]">
                <div className="text-xs text-[var(--text-muted)]">Languages</div>
                <div className="mt-1 text-lg font-medium">{selectedMatch.crew.languages.join(' • ')}</div>
              </div>
              <div className="bg-[var(--navy)] rounded-2xl p-4 border border-[var(--border-subtle)]">
                <div className="text-xs text-[var(--text-muted)]">Yacht Types</div>
                <div className="mt-1 text-lg font-medium">{selectedMatch.crew.preferredYachtTypes.join(', ')}</div>
              </div>
              <div className="bg-[var(--navy)] rounded-2xl p-4 border border-[var(--border-subtle)]">
                <div className="text-xs text-[var(--text-muted)]">Availability</div>
                <div className="mt-1 text-lg font-medium capitalize">{selectedMatch.crew.availability}</div>
              </div>
              <div className="bg-[var(--navy)] rounded-2xl p-4 border border-[var(--border-subtle)]">
                <div className="text-xs text-[var(--text-muted)]">Current Match</div>
                <div className="mt-1 text-lg font-semibold text-[var(--gold)]">{selectedMatch.job.title} on {selectedMatch.job.yachtType}</div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="uppercase text-xs tracking-[1px] text-[var(--text-muted)] mb-3">Verified Certifications</div>
              <div className="flex flex-wrap gap-2">
                {selectedMatch.crew.certifications.map((cert: string, i: number) => (
                  <div key={i} className="px-4 py-1.5 rounded-full bg-[var(--navy)] border border-[var(--border-subtle)] text-sm">
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Personality & Cultural Notes (new luxurious section) */}
            <div>
              <div className="uppercase text-xs tracking-[1px] text-[var(--text-muted)] mb-2">Personality &amp; Cultural Fit</div>
              <div className="text-[15px] text-white/90 leading-relaxed bg-[var(--navy)]/60 p-5 rounded-2xl border border-[var(--border-subtle)]">
                {selectedMatch.crew.position.includes('Engineer') || selectedMatch.crew.position.includes('Bosun') ? 
                  "A steady, respected leader who brings calm authority to the deck and engine room. Previous captains praise his mentorship of junior crew and his ability to maintain impeccable standards during long passages and high-pressure operations." :
                  "Discreet, warm, and deeply intuitive. Brings a rare combination of polished service excellence and genuine emotional intelligence that resonates with sophisticated owners and their families. Known for anticipating needs before they arise."}
              </div>
            </div>

            {/* Match Reasons in modal */}
            <div>
              <div className="uppercase text-xs tracking-[1px] text-[var(--text-muted)] mb-3">Why this pairing is exceptional</div>
              <ul className="space-y-2 text-[15px]">
                {selectedMatch.reasons.map((reason: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-white/90">
                    <span className="text-[var(--gold)] mt-1">→</span> {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

