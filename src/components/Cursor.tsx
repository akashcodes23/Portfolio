'use client';
import { useEffect, useRef, useState } from 'react';

const ACCENT = '#FF6B2C';

export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);
    const pos = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });
    const raf = useRef<number>(0);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            }
        };

        const animate = () => {
            ring.current.x += (pos.current.x - ring.current.x) * 0.12;
            ring.current.y += (pos.current.y - ring.current.y) * 0.12;
            if (ringRef.current) {
                const size = hovering ? 48 : clicking ? 16 : 32;
                ringRef.current.style.transform =
                    `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
                ringRef.current.style.width = size + 'px';
                ringRef.current.style.height = size + 'px';
            }
            raf.current = requestAnimationFrame(animate);
        };

        const down = () => setClicking(true);
        const up = () => setClicking(false);

        const checkHover = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            setHovering(!!el.closest('a, button, [data-hover]'));
        };

        window.addEventListener('mousemove', move);
        window.addEventListener('mousemove', checkHover);
        window.addEventListener('mousedown', down);
        window.addEventListener('mouseup', up);
        raf.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mousemove', checkHover);
            window.removeEventListener('mousedown', down);
            window.removeEventListener('mouseup', up);
            cancelAnimationFrame(raf.current);
        };
    }, [hovering, clicking]);

    return (
        <>
            {/* Dot — snaps instantly */}
            <div ref={dotRef} style={{
                position: 'fixed', top: 0, left: 0,
                width: 8, height: 8, borderRadius: '50%',
                background: ACCENT, zIndex: 9999,
                pointerEvents: 'none',
                boxShadow: `0 0 10px ${ACCENT}`,
                transition: 'opacity 0.2s',
            }} />
            {/* Ring — lags behind */}
            <div ref={ringRef} style={{
                position: 'fixed', top: 0, left: 0,
                width: 32, height: 32, borderRadius: '50%',
                border: `1px solid ${hovering ? ACCENT : 'rgba(255,255,255,0.4)'}`,
                zIndex: 9998, pointerEvents: 'none',
                transition: 'border-color 0.2s, width 0.2s, height 0.2s',
                mixBlendMode: 'difference',
            }} />
        </>
    );
}