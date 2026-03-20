'use client';
import React, { useEffect, useState } from 'react';
const ACCENT = '#FF6B2C';
const links = [
    { label: 'Work', href: '#projects', external: false },
    { label: 'GitHub', href: 'https://github.com/akashcodes23', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akash-g-patil-9b55632a5', external: true },
];
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handle = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handle, { passive: true });
        return () => window.removeEventListener('scroll', handle);
    }, []);
    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            padding: '0 clamp(20px, 6vw, 80px)', height: 60,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
            transition: 'all 0.4s ease',
        }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                AGP<span style={{ color: ACCENT }}>.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                {links.map(link => (
                    <a key={link.label} href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
                        {link.label}
                    </a>
                ))}
                <a href="mailto:akashgpatil23.05@gmail.com"
                    style={{ fontSize: 11, letterSpacing: '0.15em', color: ACCENT, textDecoration: 'none', textTransform: 'uppercase', border: `1px solid ${ACCENT}40`, borderRadius: 20, padding: '6px 16px', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#000'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ACCENT; }}>
                    Hire me
                </a>
            </div>
        </nav>
    );
}
