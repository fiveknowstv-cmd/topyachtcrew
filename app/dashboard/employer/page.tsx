'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import Link from 'next/link';

export default function EmployerDashboard() {
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [newJob, setNewJob] = useState({ title: '', yacht: '', location: '' });

  const openReviewModal = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsReviewModalOpen(true);
  };

  const handlePostJob = () => {
    // Simulate posting
    alert(`Job posted: ${newJob.title} on ${newJob.yacht}`);
    setIsPostJobModalOpen(false);
    setNewJob({ title: '', yacht: '', location: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-display text-5xl tracking-tighter font-semibold">Employer Dashboard</h1>
          <p className="text-[var(--text-muted)] mt-2">Post jobs, review AI-matched candidates, and manage placements.</p>
        </div>
        <Button variant="gold" onClick={() => setIsPostJobModalOpen(true)}>
          Post a New Job
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="card p-6 rounded-3xl">
          <div className="text-[var(--text-muted)] text-sm">Active Jobs</div>
          <div className="text-4xl font-semibold mt-2">4</div>
        </div>
        <div className="card p-6 rounded-3xl">
          <div className="text-[var(--text-muted)] text-sm">New AI Matches</div>
          <div className="text-4xl font-semibold mt-2 text-[var(--gold)]">31</div>
        </div>
        <div className="card p-6 rounded-3xl">
          <div className="text-[var(--text-muted)] text-sm">Applications Received</div>
          <div className="text-4xl font-semibold mt-2">87</div>
        </div>
        <div className="card p-6 rounded-3xl">
          <div className="text-[var(--text-muted)] text-sm">Successful Placements</div>
          <div className="text-4xl font-semibold mt-2">12</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Posted Jobs */}
        <div className="card p-8 rounded-3xl">
          <h3 className="text-2xl font-semibold mb-6">Your Posted Jobs</h3>
          <div className="space-y-4">
            {[
              { title: "Chief Stewardess", yacht: "M/Y Aurora", status: "Open", applicants: 23 },
              { title: "Second Engineer", yacht: "S/Y Elysium", status: "Interviewing", applicants: 8 },
              { title: "Head of Interior", yacht: "M/Y Lumina", status: "Open", applicants: 15 },
            ].map((job, i) => (
              <div key={i} className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium">{job.title}</div>
                  <div className="text-sm text-[var(--text-muted)]">{job.yacht}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{job.status} • {job.applicants} applicants</div>
                  <Button variant="navy" size="sm" className="mt-1">View</Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="gold" size="sm" className="mt-6" onClick={() => setIsPostJobModalOpen(true)}>
            Post New Position
          </Button>
        </div>

        {/* Applications Received */}
        <div className="card p-8 rounded-3xl">
          <h3 className="text-2xl font-semibold mb-6">Recent AI-Matched Candidates</h3>
          <div className="space-y-4">
            {[
              { name: "Elena Voss", position: "Chief Stewardess", match: "94%", status: "New" },
              { name: "Marcus Hale", position: "Second Engineer", match: "89%", status: "Reviewed" },
              { name: "Sofia Ramirez", position: "Head of Interior", match: "82%", status: "New" },
            ].map((cand, i) => (
              <div key={i} className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium">{cand.name}</div>
                  <div className="text-sm text-[var(--text-muted)]">{cand.position}</div>
                </div>
                <div className="text-right">
                  <div className="text-[var(--gold)] font-semibold">{cand.match}</div>
                  <Button variant="navy" size="sm" className="mt-1" onClick={() => openReviewModal(cand)}>
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="gold" size="sm" className="mt-6" asChild>
            <Link href="/ai-matching">View Full AI Matching</Link>
          </Button>
        </div>
      </div>

      {/* Post New Job Modal */}
      <Modal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        title="Post a New Job"
        footer={
          <>
            <Button variant="navy" onClick={() => setIsPostJobModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gold" onClick={handlePostJob}>
              Post Job
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Position Title</label>
            <input
              type="text"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="input-luxury w-full px-4 py-3 rounded-2xl"
              placeholder="Chief Stewardess"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Yacht Name</label>
            <input
              type="text"
              value={newJob.yacht}
              onChange={(e) => setNewJob({ ...newJob, yacht: e.target.value })}
              className="input-luxury w-full px-4 py-3 rounded-2xl"
              placeholder="M/Y Aurora"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Location / Season</label>
            <input
              type="text"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
              className="input-luxury w-full px-4 py-3 rounded-2xl"
              placeholder="Mediterranean Summer 2026"
            />
          </div>
        </div>
      </Modal>

      {/* Review Candidate Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title={selectedCandidate?.name ? `Profile: ${selectedCandidate.name}` : "Candidate Profile"}
      >
        {selectedCandidate && (
          <div className="space-y-4">
            <div>
              <div className="text-sm text-[var(--text-muted)]">Position</div>
              <div className="font-medium">{selectedCandidate.position}</div>
            </div>
            <div>
              <div className="text-sm text-[var(--text-muted)]">Match Score</div>
              <div className="text-[var(--gold)] text-2xl font-semibold">{selectedCandidate.match}</div>
            </div>
            <div className="pt-2 border-t border-[var(--border-subtle)] text-sm text-[var(--text-muted)]">
              In a real implementation this would show full profile, certificates, video interview link, and AI compatibility breakdown.
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="gold" size="sm">Schedule Interview</Button>
              <Button variant="navy" size="sm">Message Candidate</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
