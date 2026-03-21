import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Akash G Patil | AI/ML Engineer',
  description: 'Portfolio of Akash G Patil — AI/ML Engineer specializing in LLM reliability, computer vision, and production-ready AI systems.',
  verification: {
    google: '2SHK_us2m9voJ8iSEeA8fqS_46ISXHqLWoJFBCq2kes',
  },
  openGraph: {
    title: 'Akash G Patil | AI/ML Engineer',
    description: 'Building AI that reasons, adapts, and delivers in the real world.',
    url: 'https://akashgpatil.vercel.app',
    siteName: 'Akash G Patil',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}