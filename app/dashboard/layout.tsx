import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--navy-dark)] text-[var(--text)]">
      <Navbar />
      <div className="pt-20">
        {children}
      </div>
      <Footer />
    </div>
  );
}
