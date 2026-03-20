'use client';
import React, { useEffect, useRef, useState } from 'react';
const ACCENT = '#FF6B2C';
const ACCENT2 = '#4A9EFF';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: '#000', padding: 'clamp(60px, 10vh, 120px) clamp(20px, 10vw, 140px)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div ref={ref}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
            000 / About
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'start' }}>
          {/* Left — bio */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.6s ease' }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 20px', lineHeight: 1.1 }}>
              The engineer<br />
              <span style={{ color: 'transparent', WebkitTextStroke: `1px ${ACCENT}` }}>behind the code.</span>
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: '0 0 16px' }}>
              I&apos;m Akash G Patil, a 3rd-year B.Tech AI/ML student at JSSATE Bengaluru with a CGPA of 9.15. I build AI systems that go beyond prototypes — focused on reliability, scalability, and real-world deployment.
            </p>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, margin: 0 }}>
              From detecting hallucinations in LLMs to building smart traffic systems for Bengaluru — I work on problems where accuracy and speed genuinely matter. Currently seeking AI/ML internships and research opportunities.
            </p>
          </div>

          {/* Right — stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.6s ease 0.15s' }}>
            {[
              { val: '9.15', label: 'CGPA', sub: 'Top of class', color: ACCENT },
              { val: '8+', label: 'Hackathons', sub: 'Competed & won', color: '#22c55e' },
              { val: '5+', label: 'Projects', sub: 'Shipped to prod', color: ACCENT2 },
              { val: '2027', label: 'Graduating', sub: 'Available for Internships and Opportunities', color: ACCENT },
            ].map((s, i) => (
              <div key={i} style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, color: s.color, fontFamily: 'monospace', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginTop: 6 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2, letterSpacing: '0.05em' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
