'use client';
import { useEffect, useRef, useState } from 'react';

const ACCENT = '#FF6B2C';
const ACCENT2 = '#4A9EFF';

const projects = [
  {
    id: '001',
    title: 'HalluciSense',
    subtitle: 'LLM Reliability Framework',
    description: 'Confidence-aware hybrid framework for detecting and quantifying hallucinations in large language models. Three-pillar architecture combining retrieval-based verification, model-intrinsic confidence scoring, and cross-consistency checking.',
    tags: ['PyTorch', 'HuggingFace', 'FastAPI', 'Research'],
    metrics: [
      { val: '94%', label: 'Detection accuracy' },
      { val: '3×', label: 'Architecture pillars' },
      { val: 'H', label: 'Score metric' },
    ],
    status: 'RESEARCH',
    statusColor: ACCENT2,
    link: '#',
    year: '2025',
    color: ACCENT2,
  },
  {
    id: '002',
    title: 'GreenWave AI',
    subtitle: 'Smart Traffic Preemption System',
    description: 'Real-time emergency vehicle green corridor system with AI-driven signal sequencing, traffic-weighted Dijkstra routing engine, and WebSocket architecture integrated with BBMP traffic signals.',
    tags: ['Next.js', 'WebSockets', 'Dijkstra', 'BBMP'],
    metrics: [
      { val: '500ms', label: 'Response time' },
      { val: 'Live', label: 'Deployment' },
      { val: 'BBMP', label: 'Integration' },
    ],
    status: 'DEPLOYED',
    statusColor: '#22c55e',
    link: 'https://greenwave-ai.vercel.app',
    year: '2025',
    color: '#22c55e',
  },
  {
    id: '003',
    title: 'Fraud Detection System',
    subtitle: 'ML Pipeline · Real-Time',
    description: 'End-to-end ML pipeline for real-time transaction fraud detection using ensemble methods. Built for high precision with minimal false positives in production financial environments.',
    tags: ['Scikit-learn', 'Python', 'Docker'],
    metrics: [
      { val: 'RT', label: 'Real-time inference' },
      { val: 'Low', label: 'False positive rate' },
      { val: 'E2E', label: 'Full pipeline' },
    ],
    status: 'BUILT',
    statusColor: ACCENT,
    link: '#',
    year: '2024',
    color: ACCENT,
  },
  {
    id: '004',
    title: 'F1 Race Analytics',
    subtitle: 'Predictive Strategy Engine',
    description: 'Data analytics system for Formula 1 race strategy prediction and performance visualization. Combines telemetry data, weather models, and ML-based pit stop optimization.',
    tags: ['Python', 'TensorFlow', 'Pandas'],
    metrics: [
      { val: 'F1', label: 'Telemetry data' },
      { val: 'ML', label: 'Strategy prediction' },
      { val: 'Viz', label: 'Live dashboards' },
    ],
    status: 'BUILT',
    statusColor: ACCENT,
    link: '#',
    year: '2024',
    color: ACCENT,
  },
];

// Spotlight hook — tracks mouse for glow effect
function useSpotlight(ref: React.RefObject<HTMLDivElement>) {
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
    };
    const leave = () => setPos(p => ({ ...p, active: false }));
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, []);
  return pos;
}

// Single project card
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const spot = useSpotlight(cardRef as React.RefObject<HTMLDivElement>);

  // Intersection observer for scroll-in
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isExternal = project.link !== '#';

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
        position: 'relative',
        cursor: isExternal ? 'pointer' : 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => isExternal && window.open(project.link, '_blank')}
    >
      {/* Spotlight glow */}
      {spot.active && (
        <div style={{
          position: 'absolute',
          left: spot.x - 150, top: spot.y - 150,
          width: 300, height: 300,
          background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      )}

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 2,
        border: `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.06)'}`,
        borderLeft: `3px solid ${hovered ? project.color : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 4,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
        padding: '28px 28px 24px',
        transition: 'all 0.35s ease',
        backdropFilter: 'blur(8px)',
        overflow: 'hidden',
      }}>

        {/* Animated top line */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: hovered ? '100%' : '0%',
          height: 1, background: project.color,
          transition: 'width 0.4s ease',
          boxShadow: `0 0 8px ${project.color}`,
        }} />

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <span style={{
                fontSize: 10, fontFamily: 'monospace',
                color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em',
              }}>
                {project.id}
              </span>
              <span style={{
                fontSize: 9, letterSpacing: '0.2em',
                color: project.statusColor,
                border: `1px solid ${project.statusColor}50`,
                borderRadius: 20, padding: '2px 8px',
                boxShadow: hovered ? `0 0 8px ${project.statusColor}40` : 'none',
                transition: 'box-shadow 0.3s',
              }}>
                {project.status}
              </span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
                {project.year}
              </span>
            </div>
            <h3 style={{
              fontSize: 'clamp(20px, 2.5vw, 26px)',
              fontWeight: 700, color: '#fff',
              letterSpacing: '-0.01em', margin: 0,
            }}>
              {project.title}
            </h3>
            <p style={{
              fontSize: 12, color: project.color,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginTop: 4, fontWeight: 300,
            }}>
              {project.subtitle}
            </p>
          </div>

          {/* Arrow — only for deployed links */}
          {isExternal && (
            <div style={{
              width: 36, height: 36,
              border: `1px solid ${hovered ? project.color : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: hovered ? project.color : 'rgba(255,255,255,0.3)',
              fontSize: 16, flexShrink: 0,
              transition: 'all 0.3s ease',
              transform: hovered ? 'rotate(-45deg)' : 'rotate(0deg)',
            }}>
              →
            </div>
          )}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.7, marginBottom: 24,
          maxWidth: 600,
          height: hovered ? 'auto' : undefined,
        }}>
          {project.description}
        </p>

        {/* Metrics row */}
        <div style={{
          display: 'flex', gap: 32, marginBottom: 20,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.3s',
        }}>
          {project.metrics.map((m, i) => (
            <div key={i}>
              <div style={{
                fontSize: 'clamp(18px, 2.2vw, 24px)',
                fontWeight: 700, color: '#fff',
                fontFamily: 'monospace', letterSpacing: '-0.02em',
              }}>
                {m.val}
              </div>
              <div style={{
                fontSize: 10, color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2,
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 11, color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 3, padding: '3px 10px',
              letterSpacing: '0.06em',
              transition: 'all 0.2s',
              background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────
export default function Projects() {
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
      minHeight: '100vh',
    }}>
      {/* Section header */}
      <div ref={headRef} style={{ marginBottom: 'clamp(40px, 8vh, 80px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{
            fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
          }}>
            005 / Selected Work
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        <h2 style={{
          fontSize: 'clamp(36px, 7vw, 72px)',
          fontWeight: 700, color: '#fff',
          letterSpacing: '-0.02em', margin: 0,
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
          lineHeight: 1.05,
        }}>
          Things I&apos;ve{' '}
          <span style={{
            color: 'transparent',
            WebkitTextStroke: `1px ${ACCENT}`,
          }}>
            built.
          </span>
        </h2>

        <p style={{
          fontSize: 'clamp(13px, 1.5vw, 16px)',
          color: 'rgba(255,255,255,0.35)',
          marginTop: 12, maxWidth: 480,
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s ease 0.15s',
          lineHeight: 1.6,
        }}>
          Each project solves a real problem.
          No toy demos — built fast, deployed, and production-ready.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
        gap: 20,
      }}>
        {projects.map((proj, i) => (
          <ProjectCard key={proj.id} project={proj} index={i} />
        ))}
      </div>

      {/* Footer line */}
      <div style={{
        marginTop: 60,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: 0.4,
      }}>
        <div style={{ width: 32, height: 1, background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          More projects on GitHub
        </span>
      </div>
    </section>
  );
}