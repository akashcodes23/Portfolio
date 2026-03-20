'use client';
import React, { useEffect, useState } from 'react';

const ACCENT = '#FF6B2C';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [name, setName]       = useState('');
  const [counter, setCounter] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const TARGET = 'AKASH G PATIL';

  useEffect(() => {
    let frame = 0;
    const total = TARGET.length * 4;
    const raf = { current: 0 };
    const tick = () => {
      frame++;
      const revealed = Math.floor((frame / total) * TARGET.length);
      const out = TARGET.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < revealed) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      setName(out);
      setCounter(Math.min(100, Math.round((frame / total) * 100)));
      if (frame < total + 8) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setName(TARGET);
        setCounter(100);
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onDone, 700);
        }, 400);
      }
    };
    const t = setTimeout(() => { raf.current = requestAnimationFrame(tick); }, 300);
    return () => { clearTimeout(t); cancelAnimationFrame(raf.current); };
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: leaving ? 0 : 1,
      transform: leaving ? 'scale(1.04)' : 'scale(1)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
      pointerEvents: leaving ? 'none' : 'all',
    }}>
      {/* Top line wipe */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: `${counter}%`, height: 2,
        background: ACCENT,
        boxShadow: `0 0 12px ${ACCENT}`,
        transition: 'width 0.05s linear',
      }} />

      {/* Name */}
      <div style={{
        fontSize: 'clamp(28px, 6vw, 64px)',
        fontWeight: 700, fontFamily: 'monospace',
        letterSpacing: '0.08em', color: '#fff',
        marginBottom: 24,
      }}>
        {name.split('').map((ch, i) => (
          <span key={i} style={{
            color: ch !== TARGET[i] ? ACCENT : '#fff',
            transition: 'color 0.1s',
          }}>{ch}</span>
        ))}
      </div>

      {/* Role */}
      <div style={{
        fontSize: 11, letterSpacing: '0.3em',
        color: 'rgba(255,255,255,0.3)',
        textTransform: 'uppercase', marginBottom: 40,
      }}>
        AI / ML Engineer · Portfolio
      </div>

      {/* Progress bar */}
      <div style={{
        width: 'clamp(160px, 30vw, 280px)',
        height: 1, background: 'rgba(255,255,255,0.1)',
        position: 'relative', borderRadius: 1,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: `${counter}%`, height: '100%',
          background: ACCENT, borderRadius: 1,
          transition: 'width 0.05s linear',
        }} />
      </div>

      {/* Counter */}
      <div style={{
        marginTop: 12, fontSize: 10,
        fontFamily: 'monospace', letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.2)',
      }}>
        {String(counter).padStart(3, '0')}
      </div>

      {/* Bottom line wipe */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: `${counter}%`, height: 2,
        background: ACCENT,
        boxShadow: `0 0 12px ${ACCENT}`,
        transition: 'width 0.05s linear',
      }} />
    </div>
  );
}
