import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { TrustBar } from '@/components/landing/TrustBar';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { AIPowered } from '@/components/landing/AIPowered';
import { ForEmployers } from '@/components/landing/ForEmployers';
import { Testimonials } from '@/components/landing/Testimonials';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

export default function TopYachtCrewLanding() {
  return (
    <div className="min-h-screen bg-[var(--navy-dark)] text-[var(--text)] overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />

      <Features />
      <ForEmployers />
      <HowItWorks />
      <AIPowered />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
