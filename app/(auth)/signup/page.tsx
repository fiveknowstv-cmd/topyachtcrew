'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
// Supabase temporarily disabled for demo — real client not used on this page

type Role = 'crew' | 'employer';

export default function SignUp() {
  const [role, setRole] = useState<Role | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [certificate, setCertificate] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Supabase client removed for temporary demo mode

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic automatic verification logic (file type + size)
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF, JPG, or PNG file (STCW, ENG1, etc.)');
      return;
    }
    if (file.size > maxSize) {
      setError('File must be smaller than 5MB');
      return;
    }

    setCertificate(file);
    setError('');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError('Please select whether you are Crew or an Employer');
      return;
    }

    setLoading(true);
    setError('');

    // DEMO MODE: Supabase temporarily disabled.
    // Simulate successful account creation without real backend call.
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 650);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Cinematic golden hour superyacht background with AI tech overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/hero-yacht.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
      <div className="absolute inset-0 bg-[radial-gradient(#C5A26F_0.4px,transparent_1px)] bg-[length:8px_8px] opacity-5" />

      <div className="relative w-full max-w-lg px-6 py-12">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-4xl tracking-tighter font-semibold text-white">TopYachtCrew</Link>
          <p className="text-sm text-white/70 mt-2">Join the world’s most exclusive maritime network</p>
        </div>

        <div className="card p-9 rounded-3xl">
          {!success ? (
            <>
              <h1 className="font-display text-3xl tracking-tight text-center mb-2 text-white">Create your account</h1>
              <p className="text-center text-white/70 mb-8">Select your role to begin</p>

              {/* Premium Role Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setRole('crew')}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    role === 'crew' 
                      ? 'border-[var(--gold)] bg-white/5' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="font-semibold text-white text-lg">I’m Crew</div>
                  <div className="text-sm text-white/70 mt-1">Seeking my next elite placement</div>
                  <div className="text-[10px] text-[var(--gold)] mt-3 tracking-[1px]">STEWARDESS • DECKHAND • CHEF • OFFICER</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    role === 'employer' 
                      ? 'border-[var(--gold)] bg-white/5' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="font-semibold text-white text-lg">I’m an Employer</div>
                  <div className="text-sm text-white/70 mt-1">Looking to hire exceptional crew</div>
                  <div className="text-[10px] text-[var(--gold)] mt-3 tracking-[1px]">OWNERS • CAPTAINS • MANAGEMENT</div>
                </button>
              </div>

              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <label className="block text-sm text-white/80 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-luxury w-full px-5 py-3.5 rounded-2xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-luxury w-full px-5 py-3.5 rounded-2xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">Create Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-luxury w-full px-5 py-3.5 rounded-2xl"
                    required
                    minLength={6}
                  />
                </div>

                {/* Certificate Upload - Prominent for Crew */}
                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Professional Certificates {role === 'crew' && '(Recommended)'}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-[var(--gold)] file:text-[var(--navy-dark)] hover:file:bg-[var(--gold-light)]"
                  />
                  <p className="text-[10px] text-white/50 mt-1">STCW, ENG1, Yachtmaster, etc. — Basic auto-verification enabled</p>
                  {certificate && (
                    <div className="mt-2 text-sm text-[var(--gold)] flex items-center gap-2">
                      ✓ {certificate.name} <span className="text-white/60">(Auto-verified)</span>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-xl">{error}</div>
                )}

                <Button 
                  type="submit" 
                  variant="gold" 
                  className="w-full py-3.5 text-lg mt-4"
                  disabled={loading || !role}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">⚓</div>
              <h2 className="font-display text-3xl tracking-tight text-white mb-3">Welcome aboard</h2>
              <p className="text-white/70 mb-2">
                Demo mode — account created successfully (Supabase temporarily disabled).
              </p>
              <p className="text-white/60 text-sm mb-6">
                All form data, role selection, and certificate preview are fully functional.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/profile" className="btn-gold px-6 py-2.5 rounded-xl text-sm font-medium">
                  Continue to Profile (Demo)
                </Link>
                <Link href="/dashboard/crew" className="px-5 py-2.5 rounded-xl text-sm border border-white/20 hover:bg-white/5 transition">
                  Crew Dashboard
                </Link>
                <Link href="/dashboard/employer" className="px-5 py-2.5 rounded-xl text-sm border border-white/20 hover:bg-white/5 transition">
                  Employer Dashboard
                </Link>
              </div>

              <div className="mt-6">
                <Link href="/login" className="text-[var(--gold)] hover:underline text-sm">Back to Sign In</Link>
              </div>
            </div>
          )}

          {!success && (
            <p className="text-center text-xs text-white/60 mt-6">
              Already registered? <Link href="/login" className="text-[var(--gold)] underline">Sign in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
