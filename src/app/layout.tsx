import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Akash G Patil | AI/ML Engineer',
  description: 'Portfolio of Akash G Patil — AI/ML Engineer specializing in LLM reliability, computer vision, and production-ready AI systems.',
  openGraph: {
    title: 'Akash G Patil | AI/ML Engineer',
    description: 'Building AI that reasons, adapts, and delivers in the real world.',
    url: 'https://portfolio-nine-snowy-aqhqcvbvwc.vercel.app',
    siteName: 'Akash G Patil',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}