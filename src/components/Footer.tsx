'use client';
import React from 'react';
const ACCENT = '#FF6B2C';
export default function Footer() {
  return (
    <footer style={{ background: '#000', padding: 'clamp(60px, 10vh, 100px) clamp(20px, 10vw, 140px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 40 }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 16 }}>Get in touch</p>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>
            Let&apos;s build<br />
            <span style={{ color: 'transparent', WebkitTextStroke: `1px ${ACCENT}` }}>something real.</span>
          </h2>
          <a href="mailto:akashgpatil23.05@gmail.com" style={{
            display: 'inline-block', marginTop: 32,
            fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#000', background: ACCENT, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 4, fontWeight: 600,
          }}>
            akashgpatil23.05@gmail.com
          </a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/akashcodes23' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akash-g-patil-9b55632a5' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', textTransform: 'uppercase' }}>
              {s.label} &#x2197;
            </a>
          ))}
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em', marginTop: 16 }}>
            &#169; 2025 Akash G Patil
          </p>
        </div>
      </div>
    </footer>
  );
}
