'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Navbar        from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Marquee       from "@/components/Marquee";
import About         from "@/components/About";
import Projects      from "@/components/Projects";
import Timeline      from "@/components/Timeline";
import Research      from "@/components/Research";
import Footer        from "@/components/Footer";

const Overlay = dynamic(() => import('@/components/Overlay'), { ssr: false });
const Cursor  = dynamic(() => import('@/components/Cursor'),  { ssr: false });

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-white/20">
      <Cursor />
      <Navbar />
      <Overlay />
      <ScrollyCanvas />
      <Marquee />
      <About />
      <div id="projects"><Projects /></div>
      <Timeline />
      <Research />
      <Footer />
    </main>
  );
}
