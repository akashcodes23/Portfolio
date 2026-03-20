'use client';
import { useEffect, useRef, useState } from 'react';

const ACCENT = '#FF6B2C';
const ACCENT2 = '#4A9EFF';
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

// ── HOOKS ────────────────────────────────────────────────
// REPLACE the existing useScrollProgress function with this:
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const handle = () => {
      const el = document.querySelector('[data-scrolly]') as HTMLElement;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -top / scrollable)));
      // Hide overlay once the scrolly container has fully scrolled past
      setInView(top + height > 0);
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return { progress, inView };
}

function useScramble(text: string, active: boolean) {
  const [display, setDisplay] = useState('');
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!active) { setDisplay(''); return; }
    let frame = 0;
    const total = text.length * 3;
    const tick = () => {
      frame++;
      const revealed = Math.floor((frame / total) * text.length);
      const out = text.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < revealed) return ch;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');
      setDisplay(out);
      if (frame < total + 10) raf.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    const t = setTimeout(() => { raf.current = requestAnimationFrame(tick); }, 100);
    return () => { clearTimeout(t); cancelAnimationFrame(raf.current); };
  }, [text, active]);
  return display;
}

function useTypewriter(text: string, active: boolean, speed = 28) {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    if (!active) { setDisplay(''); return; }
    let i = 0;
    setDisplay('');
    const iv = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text, active]);
  return display;
}

function useCounter(target: number, active: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, active]);
  return val;
}

// ── NOISE OVERLAY ─────────────────────────────────────────
function NoiseOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 8;
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas ref={ref} style={{
      position: 'fixed', inset: 0, zIndex: 8,
      pointerEvents: 'none', mixBlendMode: 'overlay',
      width: '100%', height: '100%',
    }} />
  );
}

// ── PROGRESS BAR ──────────────────────────────────────────
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div style={{
      position: 'fixed', left: 20, top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 8, pointerEvents: 'none',
    }}>
      <span style={{
        fontSize: 9, letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.25)',
        writingMode: 'vertical-rl',
        textTransform: 'uppercase',
      }}>Scroll</span>
      <div style={{
        width: 1, height: 100,
        background: 'rgba(255,255,255,0.1)',
        position: 'relative', borderRadius: 1,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: `${progress * 100}%`,
          background: ACCENT, borderRadius: 1,
          transition: 'height 0.05s linear',
          boxShadow: `0 0 8px ${ACCENT}`,
        }} />
      </div>
      <span style={{
        fontSize: 9, color: 'rgba(255,255,255,0.25)',
        fontFamily: 'monospace', letterSpacing: '0.05em',
      }}>
        {String(Math.round(progress * 100)).padStart(3, '0')}
      </span>
    </div>
  );
}

// ── SECTION LABEL ─────────────────────────────────────────
function SectionLabel({ num, title, visible }: { num: string; title: string; visible: boolean }) {
  return (
    <div style={{
      position: 'absolute', top: 28, right: 28,
      display: 'flex', alignItems: 'center', gap: 10,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(-8px)',
      transition: 'all 0.4s ease',
      pointerEvents: 'none',
    }}>
      <span style={{ fontSize: 10, color: ACCENT, fontFamily: 'monospace', letterSpacing: '0.1em' }}>{num}</span>
      <span style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.15)' }} />
      <span style={{ fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );
}

// ── SECTION 1 — IDENTITY (0–22%) ──────────────────────────
function IdentitySection({ p }: { p: number }) {
  const opacity = p < 0.19 ? 1 : Math.max(0, 1 - (p - 0.19) / 0.04);
  const name = useScramble('AKASH G PATIL', p > 0.01 && p < 0.22);
  const role = useTypewriter('AI / ML Engineer', p > 0.04 && p < 0.22);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '0 10vw',
      opacity, transition: 'opacity 0.3s',
      pointerEvents: 'none',
    }}>
      <SectionLabel num="001" title="Identity" visible={p > 0.01 && p < 0.22} />

      <div style={{
        width: p > 0.01 ? '60px' : '0px', height: 2,
        background: ACCENT, marginBottom: 24,
        transition: 'width 0.6s ease',
        boxShadow: `0 0 12px ${ACCENT}`,
      }} />

      <div style={{
        fontSize: 'clamp(44px, 8vw, 88px)',
        fontWeight: 700, letterSpacing: '-0.02em',
        color: '#fff', lineHeight: 1,
        fontFamily: 'monospace', marginBottom: 14,
      }}>
        {name}
      </div>

      <div style={{
        fontSize: 'clamp(14px, 2vw, 20px)',
        color: ACCENT, letterSpacing: '0.15em',
        textTransform: 'uppercase', fontWeight: 300,
        marginBottom: 28, minHeight: 26,
      }}>
        {role}
        <span style={{ opacity: 0.5, animation: 'blink 1s step-end infinite' }}>_</span>
      </div>

      <div style={{
        fontSize: 'clamp(13px, 1.4vw, 16px)',
        color: 'rgba(255,255,255,0.45)',
        fontWeight: 300, maxWidth: 460,
        lineHeight: 1.7,
        opacity: p > 0.06 ? 1 : 0,
        transform: p > 0.06 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.6s ease',
      }}>
        I build AI that doesn&apos;t just respond —<br />
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>
          it reasons, adapts, and delivers in the real world.
        </span>
      </div>

      <div style={{
        marginTop: 24,
        opacity: p > 0.08 ? 1 : 0,
        transition: 'opacity 0.5s ease 0.2s',
      }}>
        <span style={{
          fontSize: 10, letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, padding: '4px 14px',
          textTransform: 'uppercase',
        }}>
          JSSATE Bengaluru · 3rd Year · 2025
        </span>
      </div>
    </div>
  );
}

// ── SECTION 2 — MISSION (22–55%) ──────────────────────────
function MissionSection({ p }: { p: number }) {
  const sp = Math.min(1, Math.max(0, (p - 0.22) / 0.33));
  const opacity = p < 0.24
    ? (p - 0.22) / 0.02
    : p > 0.52
      ? Math.max(0, 1 - (p - 0.52) / 0.04)
      : 1;

  const lines = [
    { text: 'LLM hallucination mitigation', accent: true },
    { text: 'Computer vision systems', accent: false },
    { text: 'End-to-end ML pipelines', accent: false },
    { text: 'Real-world AI deployment', accent: true },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center',
      padding: '0 10vw', opacity,
      pointerEvents: 'none',
    }}>
      <SectionLabel num="002" title="Mission" visible={p > 0.22 && p < 0.55} />
      <div style={{ maxWidth: 640 }}>
        <div style={{
          fontSize: 'clamp(26px, 4.5vw, 48px)',
          fontWeight: 700, lineHeight: 1.15,
          color: '#fff', marginBottom: 36,
        }}>
          {['From raw data', '→ intelligent decisions', '→ production-ready systems.'].map((line, i) => (
            <div key={i} style={{
              display: 'block',
              opacity: sp > i * 0.2 ? 1 : 0,
              transform: sp > i * 0.2 ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.55s cubic-bezier(0.16,1,0.3,1)',
              color: i === 0
                ? 'rgba(255,255,255,0.4)'
                : i === 1
                  ? 'rgba(255,255,255,0.7)'
                  : '#fff',
            }}>
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              opacity: sp > 0.35 + i * 0.12 ? 1 : 0,
              transform: sp > 0.35 + i * 0.12 ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'all 0.4s ease',
            }}>
              <span style={{
                width: l.accent ? 24 : 8, height: 2,
                background: l.accent ? ACCENT : 'rgba(255,255,255,0.2)',
                flexShrink: 0,
                boxShadow: l.accent ? `0 0 8px ${ACCENT}` : 'none',
                transition: 'width 0.3s',
              }} />
              <span style={{
                fontSize: 'clamp(12px, 1.3vw, 15px)',
                color: l.accent ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: l.accent ? 500 : 300,
              }}>
                {l.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SECTION 3 — PROJECTS (55–78%) ─────────────────────────
function ProjectsSection({ p }: { p: number }) {
  const sp = Math.min(1, Math.max(0, (p - 0.55) / 0.23));
  const opacity = p < 0.57
    ? (p - 0.55) / 0.02
    : p > 0.76
      ? Math.max(0, 1 - (p - 0.76) / 0.03)
      : 1;
  const visible = p > 0.55;

  const gw = useCounter(500, visible);
  const hs = useCounter(94, visible);
  const hacks = useCounter(8, visible);

  const projects = [
    { name: 'GreenWave AI', desc: 'Emergency vehicle corridors · WebSocket · Dijkstra', tag: 'DEPLOYED', color: '#22c55e' },
    { name: 'HalluciSense', desc: 'LLM hallucination detection · H-Score · Hybrid arch', tag: 'RESEARCH', color: ACCENT2 },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '0 10vw',
      opacity, pointerEvents: 'none',
    }}>
      <SectionLabel num="003" title="Work" visible={visible} />

      <div style={{ display: 'flex', gap: 'clamp(20px, 5vw, 60px)', marginBottom: 36, opacity: sp > 0.1 ? 1 : 0, transition: 'opacity 0.5s' }}>
        {[
          { val: gw, unit: 'ms', label: 'Response time saved' },
          { val: hs, unit: '%', label: 'Detection accuracy' },
          { val: hacks, unit: '+', label: 'Hackathons' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700, color: '#fff',
              lineHeight: 1, fontFamily: 'monospace',
              letterSpacing: '-0.02em',
            }}>
              {s.val}<span style={{ color: ACCENT, fontSize: '0.5em' }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {projects.map((proj, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 18,
            padding: '14px 18px',
            border: '1px solid rgba(255,255,255,0.08)',
            borderLeft: `3px solid ${proj.color}`,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(4px)',
            opacity: sp > 0.3 + i * 0.2 ? 1 : 0,
            transform: sp > 0.3 + i * 0.2 ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'clamp(13px, 1.6vw, 17px)', fontWeight: 600, color: '#fff', marginBottom: 3 }}>{proj.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>{proj.desc}</div>
            </div>
            <span style={{
              fontSize: 9, letterSpacing: '0.2em',
              color: proj.color, border: `1px solid ${proj.color}50`,
              borderRadius: 20, padding: '3px 10px', flexShrink: 0,
            }}>{proj.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SECTION 4 — STACK + CTA (78–100%) ─────────────────────
function StackSection({ p }: { p: number }) {
  const sp = Math.min(1, Math.max(0, (p - 0.78) / 0.22));
  const opacity = p < 0.8 ? (p - 0.78) / 0.02 : 1;
  const visible = p > 0.78;

  const stack = ['Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'React', 'OpenCV', 'Docker', 'HuggingFace'];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '0 10vw',
      opacity, pointerEvents: 'none',
    }}>
      <SectionLabel num="004" title="Stack" visible={visible} />

      <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 18, opacity: sp > 0.1 ? 1 : 0, transition: 'opacity 0.4s' }}>
        Core Technologies
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
        {stack.map((tech, i) => (
          <span key={tech} style={{
            fontSize: 'clamp(10px, 1.1vw, 13px)',
            color: i % 3 === 0 ? ACCENT : i % 3 === 1 ? ACCENT2 : 'rgba(255,255,255,0.65)',
            border: `1px solid ${i % 3 === 0 ? ACCENT + '50' : i % 3 === 1 ? ACCENT2 + '50' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 4, padding: '5px 12px',
            letterSpacing: '0.08em',
            opacity: sp > i * 0.08 ? 1 : 0,
            transform: sp > i * 0.08 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.35s ease',
          }}>
            {tech}
          </span>
        ))}
      </div>

      <div style={{
        opacity: sp > 0.6 ? 1 : 0,
        transform: sp > 0.6 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease',
      }}>
        <div style={{
          fontSize: 'clamp(16px, 2.5vw, 28px)',
          fontWeight: 300, color: '#fff',
          lineHeight: 1.4, maxWidth: 500, marginBottom: 20,
        }}>
          Open to{' '}
          <span style={{ color: ACCENT, fontWeight: 600 }}>AI/ML internships</span>,
          research opportunities, and building impactful systems.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
          <span style={{ width: 28, height: 1, background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
          Scroll to see projects below
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────
export default function Overlay() {
  const { progress: p, inView } = useScrollProgress();

  return (
    <>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      <NoiseOverlay />
      <ProgressBar progress={p} />
      <div style={{
        position: 'fixed', inset: 0,
        zIndex: 10, pointerEvents: 'none', overflow: 'hidden',
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.4s ease',    // smooth fade as you leave
      }}>
        <IdentitySection p={p} />
        <MissionSection p={p} />
        <ProjectsSection p={p} />
        <StackSection p={p} />
      </div>
    </>
  );
}