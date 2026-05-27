'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
// Supabase temporarily disabled for demo — real client not used on this page

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Supabase client removed for temporary demo mode

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // DEMO MODE: Supabase temporarily disabled.
    // Simulate successful login and role-based redirect.
    setTimeout(() => {
      // In real mode this would check the user's profile.role
      // For demo, default to Crew dashboard (change as needed for testing)
      window.location.href = '/dashboard/crew';
      setLoading(false);
    }, 550);
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

      <div className="relative w-full max-w-md px-6">
        <div className="text-center mb-10">
          <Link href="/" className="font-display text-4xl tracking-tighter font-semibold text-white">TopYachtCrew</Link>
          <p className="text-sm text-white/70 mt-2">Welcome back, Captain</p>
        </div>

        <div className="card p-9 rounded-3xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-white/80 mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@superyacht.com"
                className="input-luxury w-full px-5 py-3.5 rounded-2xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-luxury w-full px-5 py-3.5 rounded-2xl"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/80">
                <input type="checkbox" className="accent-[var(--gold)]" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-[var(--gold)] hover:underline">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-xl">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              variant="gold" 
              className="w-full py-3.5 text-lg"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center mt-6 text-sm text-white/70">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-[var(--gold)] font-medium hover:underline">
              Join the fleet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
