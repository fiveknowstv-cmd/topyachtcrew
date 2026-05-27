import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "TopYachtCrew | AI-Powered Superyacht Crew Placement",
    template: "%s | TopYachtCrew",
  },
  description:
    "The premier AI-powered platform connecting elite superyacht crew with the world's most prestigious yachts and discerning owners. Intelligent matching, verified professionals, seamless placements.",
  metadataBase: new URL("https://topyachtcrew.com"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "TopYachtCrew — Elite Superyacht Crew, Intelligently Matched",
    description:
      "AI-powered connections for the superyacht industry. Find your next role or the perfect crew in minutes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TopYachtCrew - AI-Powered Superyacht Crew Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TopYachtCrew | AI-Powered Superyacht Crew Placement",
    description:
      "Connect elite crew with exceptional yachts. Powered by advanced AI matching.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--navy-dark)] text-[var(--text)]">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
