'use client';
import React, { useEffect, useRef, useState } from 'react';

const ACCENT = '#FF6B2C';
const ACCENT2 = '#4A9EFF';

const events = [
  {
    year: '2021',
    title: '10th Grade — 95.8%',
    org: 'Kendriya Vidyalaya · CBSE',
    desc: 'Strong foundation in Mathematics and Science. Early interest in computers and problem-solving.',
    type: 'education',
    color: ACCENT2,
  },
  {
    year: '2023',
    title: '12th Grade — 92.5%',
    org: "Alva's Education Foundation · PCMB",
    desc: 'Physics, Chemistry, Mathematics with Biology. Solidified decision to pursue AI/ML engineering.',
    type: 'education',
    color: ACCENT2,
  },
  {
    year: '2022',
    title: 'Started B.Tech — AI/ML',
    org: 'JSSATE Bengaluru',
    desc: 'Joined Department of Computer Science & Engineering with specialization in Artificial Intelligence and Machine Learning.',
    type: 'education',
    color: ACCENT2,
  },
  {
    year: '2023',
    title: 'First ML Projects',
    org: 'Academic Projects',
    desc: 'Built Fraud Detection System and NLP Question Answering System. Began exploring PyTorch and HuggingFace transformers.',
    type: 'project',
    color: ACCENT,
  },
  {
    year: '2024',
    title: 'F1 Race Analytics + ML Pipeline',
    org: 'Personal Projects',
    desc: 'Built Formula 1 race strategy prediction system and an end-to-end ML model deployment pipeline with Docker and FastAPI.',
    type: 'project',
    color: ACCENT,
  },
  {
    year: '2024',
    title: 'Hackathon Streak Begins',
    org: 'Multiple Competitions',
    desc: 'Competed in 8+ hackathons. Developed personal winning formula: idea clarity over code volume, deploy early, invest in presentation.',
    type: 'hackathon',
    color: '#22c55e',
  },
  {
    year: '2025',
    title: 'HalluciSense — Research Project',
    org: 'Major Project · JSSATE',
    desc: 'Designed confidence-aware hybrid framework for LLM hallucination detection. Three-pillar architecture with H-Score metric. Target: Elsevier / Frontiers in AI.',
    type: 'research',
    color: ACCENT2,
  },
  {
    year: '2025',
    title: 'GreenWave AI — Build for Bengaluru 2.0',
    org: 'Hackathon · AI/ML Track',
    desc: 'Built real-time emergency vehicle green corridor system with Dijkstra routing + WebSocket architecture. Deployed live to Vercel.',
    type: 'hackathon',
    color: '#22c55e',
  },
  {
    year: '2025',
    title: 'CGPA 9.15 · 3rd Year',
    org: 'JSSATE Bengaluru',
    desc: 'Maintaining strong academic record while shipping real-world AI projects and competing in hackathons.',
    type: 'education',
    color: ACCENT2,
  },
];

const TYPE_LABELS: Record<string, string> = {
  education: 'EDU',
  project: 'BUILD',
  hackathon: 'HACK',
  research: 'RESEARCH',
};

function TimelineItem({ event, index, isLast }: {
  event: typeof events[0]; index: number; isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 40px 1fr',
      gap: 0, marginBottom: isLast ? 0 : 0,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
    }}>
      {/* Left content */}
      <div style={{ padding: '0 24px 40px 0', textAlign: 'right' }}>
        {isLeft && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginBottom: 8 }}>
              <span style={{
                fontSize: 9, letterSpacing: '0.2em',
                color: event.color, border: `1px solid ${event.color}50`,
                borderRadius: 20, padding: '2px 8px',
              }}>{TYPE_LABELS[event.type]}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>{event.year}</span>
            </div>
            <h3 style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', fontWeight: 600, color: '#fff', margin: '0 0 4px', lineHeight: 1.3 }}>{event.title}</h3>
            <p style={{ fontSize: 11, color: event.color, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 300 }}>{event.org}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>{event.desc}</p>
          </>
        )}
      </div>

      {/* Center line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: event.color, flexShrink: 0,
          marginTop: 6,
          boxShadow: `0 0 12px ${event.color}`,
        }} />
        {!isLast && (
          <div style={{
            width: 1, flex: 1,
            background: 'rgba(255,255,255,0.08)',
            marginTop: 4,
          }} />
        )}
      </div>

      {/* Right content */}
      <div style={{ padding: '0 0 40px 24px' }}>
        {!isLeft && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>{event.year}</span>
              <span style={{
                fontSize: 9, letterSpacing: '0.2em',
                color: event.color, border: `1px solid ${event.color}50`,
                borderRadius: 20, padding: '2px 8px',
              }}>{TYPE_LABELS[event.type]}</span>
            </div>
            <h3 style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', fontWeight: 600, color: '#fff', margin: '0 0 4px', lineHeight: 1.3 }}>{event.title}</h3>
            <p style={{ fontSize: 11, color: event.color, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 300 }}>{event.org}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>{event.desc}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function Timeline() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeadVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{
      background: '#000',
      padding: 'clamp(60px, 10vh, 120px) clamp(20px, 10vw, 140px)',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      {/* Header */}
      <div ref={headRef} style={{ marginBottom: 'clamp(40px, 8vh, 80px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
            006 / Journey
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>
        <h2 style={{
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 700, color: '#fff',
          letterSpacing: '-0.02em', margin: 0, lineHeight: 1.05,
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}>
          The{' '}
          <span style={{ color: 'transparent', WebkitTextStroke: `1px ${ACCENT}` }}>journey.</span>
        </h2>
        <p style={{
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          color: 'rgba(255,255,255,0.3)',
          marginTop: 12, maxWidth: 440, lineHeight: 1.6,
          opacity: headVisible ? 1 : 0,
          transition: 'all 0.7s ease 0.15s',
        }}>
          From first model to production systems — the milestones that shaped the engineer.
        </p>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
        {[
          { label: 'Education', color: ACCENT2 },
          { label: 'Project', color: ACCENT },
          { label: 'Hackathon', color: '#22c55e' },
          { label: 'Research', color: ACCENT2 },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: l.color, boxShadow: `0 0 6px ${l.color}` }} />
            <span style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {events.map((event, i) => (
          <TimelineItem key={i} event={event} index={i} isLast={i === events.length - 1} />
        ))}
      </div>
    </section>
  );
}
