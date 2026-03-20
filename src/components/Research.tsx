'use client';
import React, { useEffect, useRef, useState } from 'react';

const ACCENT  = '#FF6B2C';
const ACCENT2 = '#4A9EFF';

export default function Research() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
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
      <div ref={ref}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
            007 / Research
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        <h2 style={{
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 700, color: '#fff',
          letterSpacing: '-0.02em', margin: '0 0 48px', lineHeight: 1.05,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}>
          In{' '}
          <span style={{ color: 'transparent', WebkitTextStroke: `1px ${ACCENT2}` }}>progress.</span>
        </h2>

        {/* Paper card */}
        <div style={{
          border: `1px solid ${ACCENT2}20`,
          borderLeft: `3px solid ${ACCENT2}`,
          borderRadius: 4,
          padding: 'clamp(24px, 4vw, 40px)',
          background: 'rgba(74, 158, 255, 0.03)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.6s ease 0.15s',
          maxWidth: 860,
        }}>
          {/* Status + target journal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 9, letterSpacing: '0.2em', color: ACCENT2,
              border: `1px solid ${ACCENT2}50`, borderRadius: 20, padding: '3px 10px',
            }}>IN PROGRESS</span>
            <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '3px 10px' }}>
              TARGET: ELSEVIER / FRONTIERS IN AI
            </span>
            <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '3px 10px' }}>
              2025
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '-0.01em', margin: '0 0 8px', lineHeight: 1.3,
          }}>
            HalluciSense: A Confidence-Aware Hybrid Framework for Detecting and Quantifying Hallucinations in Large Language Models
          </h3>

          {/* Authors */}
          <p style={{ fontSize: 12, color: ACCENT, letterSpacing: '0.06em', margin: '0 0 20px' }}>
            Akash G Patil, Chirag O, Darshan A, Keerthan B M · JSSATE Bengaluru
          </p>

          {/* Abstract */}
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: '0 0 28px', maxWidth: 720 }}>
            We present HalluciSense, a three-pillar hybrid architecture for hallucination detection in LLMs combining retrieval-based verification, model-intrinsic confidence scoring, and cross-consistency checking. Our proposed H-Score metric provides a unified quantitative measure of hallucination severity across generative model outputs, enabling more reliable deployment of LLMs in high-stakes environments.
          </p>

          {/* Three pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[
              { num: '01', title: 'Retrieval Verification', desc: 'Cross-checks outputs against ground-truth knowledge sources' },
              { num: '02', title: 'Confidence Scoring', desc: 'Model-intrinsic uncertainty quantification per token' },
              { num: '03', title: 'Cross-Consistency', desc: 'Multi-sample consistency checking for factual stability' },
            ].map(p => (
              <div key={p.num} style={{
                padding: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 4, background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ fontSize: 10, color: ACCENT2, fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: 8 }}>{p.num}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['LLM Hallucination', 'Confidence Scoring', 'NLP', 'PyTorch', 'HuggingFace', 'H-Score Metric'].map(tag => (
              <span key={tag} style={{
                fontSize: 11, color: 'rgba(255,255,255,0.35)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 3, padding: '3px 10px', letterSpacing: '0.04em',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
