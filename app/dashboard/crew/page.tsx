'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CrewDashboard() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applicationNote, setApplicationNote] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const openApplyModal = (job: any) => {
    setSelectedJob(job);
    setApplicationNote('');
    setApplicationSubmitted(false);
    setIsApplyModalOpen(true);
  };

  const openViewModal = (job: any) => {
    setSelectedJob(job);
    setIsViewModalOpen(true);
  };

  const handleApplySubmit = () => {
    // Simulate submission
    setApplicationSubmitted(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setApplicationSubmitted(false);
      setApplicationNote('');
      // In real app this would update the applications list
      alert(`Application submitted for ${selectedJob?.yacht}!`);
    }, 1200);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setApplicationSubmitted(false);
  };
  const closeViewModal = () => setIsViewModalOpen(false);
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-display text-5xl tracking-tighter font-semibold">Crew Dashboard</h1>
          <p className="text-[var(--text-muted)] mt-2">Manage your profile, certificates, applications, and opportunities.</p>
        </div>
        <Button variant="gold" asChild>
          <Link href="/profile">Edit Profile</Link>
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="card p-6 rounded-3xl">
          <div className="text-[var(--text-muted)] text-sm">Profile Completion</div>
          <div className="text-4xl font-semibold mt-2">78%</div>
        </div>
        <div className="card p-6 rounded-3xl">
          <div className="text-[var(--text-muted)] text-sm">Certificates Verified</div>
          <div className="text-4xl font-semibold mt-2">4 / 5</div>
        </div>
        <div className="card p-6 rounded-3xl">
          <div className="text-[var(--text-muted)] text-sm">Active Applications</div>
          <div className="text-4xl font-semibold mt-2">3</div>
        </div>
        <div className="card p-6 rounded-3xl">
          <div className="text-[var(--text-muted)] text-sm">New Matches</div>
          <div className="text-4xl font-semibold mt-2 text-[var(--gold)]">14</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* My Applications */}
        <div className="card p-8 rounded-3xl">
          <h3 className="text-2xl font-semibold mb-6">My Applications</h3>
          <div className="space-y-4">
            {[
              { yacht: "M/Y Aurora", position: "Chief Stewardess", status: "Interview Scheduled", date: "Mar 12" },
              { yacht: "S/Y Windrose", position: "Stewardess", status: "Under Review", date: "Mar 8" },
              { yacht: "M/Y Serenity", position: "Head of Service", status: "Offer Received", date: "Mar 5" },
            ].map((app, i) => (
              <div key={i} className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium">{app.yacht}</div>
                  <div className="text-sm text-[var(--text-muted)]">{app.position}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[var(--gold)]">{app.status}</div>
                  <div className="text-xs text-[var(--text-muted)]">{app.date}</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="navy" size="sm" className="mt-6">View All Applications</Button>
        </div>

        {/* Available Jobs */}
        <div className="card p-8 rounded-3xl">
          <h3 className="text-2xl font-semibold mb-6">Available Jobs (AI Matched)</h3>
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: "Chief Stewardess",
                yacht: "M/Y Horizon 55m",
                match: "94%",
                location: "Mediterranean",
                matchReasons: [
                  "12+ years on 50m+ motor yachts",
                  "Strong cultural fit with UK-based owners",
                  "Fluent in French & Italian",
                  "Wine & silver service specialist",
                ],
              },
              {
                id: 2,
                title: "Second Stewardess",
                yacht: "S/Y Elysium 42m",
                match: "87%",
                location: "Caribbean",
                matchReasons: [
                  "Excellent references from current captain",
                  "High-energy team player",
                  "Advanced mixology & wine knowledge",
                  "Available for immediate start",
                ],
              },
              {
                id: 3,
                title: "Head of Interior",
                yacht: "M/Y Lumina 48m",
                match: "82%",
                location: "South Pacific",
                matchReasons: [
                  "Leadership experience with teams of 8+",
                  "Prefers rotational schedules",
                  "Fine dining & guest relations expert",
                  "Strong personality match with current team",
                ],
              },
            ].map((job, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <div className="font-medium">{job.title}</div>
                  <div className="text-sm text-[var(--text-muted)]">{job.yacht} • {job.location}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1">
                    {job.matchReasons?.[0]}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[var(--gold)] font-semibold text-lg">{job.match}</div>
                  <div className="flex gap-2 mt-1">
                    <Button variant="navy" size="sm" onClick={() => openViewModal(job)}>
                      View
                    </Button>
                    <Button variant="gold" size="sm" onClick={() => openApplyModal(job)}>
                      Apply
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="navy" size="sm" className="mt-6" asChild>
            <Link href="/ai-matching">Browse All Matches</Link>
          </Button>
        </div>
      </div>

      {/* View Job Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        title={selectedJob?.title || "Job Details"}
      >
        {selectedJob && (
          <div className="space-y-4">
            <div>
              <div className="text-sm text-[var(--text-muted)]">Yacht</div>
              <div className="font-medium">{selectedJob.yacht}</div>
            </div>
            <div>
              <div className="text-sm text-[var(--text-muted)]">Location</div>
              <div className="font-medium">{selectedJob.location}</div>
            </div>
            <div>
              <div className="text-sm text-[var(--text-muted)]">Match Score</div>
              <div className="text-[var(--gold)] text-2xl font-semibold">{selectedJob.match}</div>
            </div>
            <div>
              <div className="text-sm text-[var(--text-muted)] mb-2">Why this is a strong match</div>
              <ul className="space-y-1.5 text-sm">
                {selectedJob.matchReasons?.map((reason: string, idx: number) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-[var(--gold)]">•</span> {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* Apply Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={closeApplyModal}
        title={selectedJob ? `Apply for ${selectedJob.title}` : "Apply"}
        footer={
          !applicationSubmitted ? (
            <>
              <Button variant="navy" onClick={closeApplyModal}>
                Cancel
              </Button>
              <Button variant="gold" onClick={handleApplySubmit}>
                Submit Application
              </Button>
            </>
          ) : (
            <div className="text-[var(--gold)]">Submitting...</div>
          )
        }
      >
        {selectedJob && (
          <div className="space-y-4">
            <div>
              <div className="font-medium">{selectedJob.yacht}</div>
              <div className="text-sm text-[var(--text-muted)]">{selectedJob.location} • Match: {selectedJob.match}</div>
            </div>

            <div>
              <label className="block text-sm mb-2">Cover note / Why you’re a great fit</label>
              <textarea
                value={applicationNote}
                onChange={(e) => setApplicationNote(e.target.value)}
                className="input-luxury w-full px-4 py-3 rounded-2xl h-28"
                placeholder="Highlight relevant experience, availability, and any cultural fit notes..."
              />
            </div>

            <div className="text-xs text-[var(--text-muted)]">
              Your profile and certificates will be shared with the yacht upon submission.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
