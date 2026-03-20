'use client';
import { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 120;
const FRAME_PATH = (i: number) =>
  `/sequence/frame_${String(i).padStart(3, '0')}.png`;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const currentFrame = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrame.current);
    };
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  useEffect(() => {
    loadedRef.current = new Array(TOTAL_FRAMES).fill(false);
    imagesRef.current = new Array(TOTAL_FRAMES);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => {
        loadedRef.current[i] = true;
        if (i === 0) drawFrame(0);
        if (i === currentFrame.current) drawFrame(i);
      };
      img.onerror = () => console.error(`❌ ${FRAME_PATH(i)}`);
      img.src = FRAME_PATH(i);
      imagesRef.current[i] = img;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;
        const { top, height } = container.getBoundingClientRect();
        const scrollable = height - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -top / scrollable));
        const index = Math.round(progress * (TOTAL_FRAMES - 1));
        if (index !== currentFrame.current) {
          currentFrame.current = index;
          drawFrame(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current?.[index];
    if (!canvas || !img || !loadedRef.current[index]) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }

  return (
    <div
      ref={containerRef}
      data-scrolly=""                              // ← this is the only change
      style={{ height: '500vh', position: 'relative' }}
    >
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        backgroundColor: '#000',
      }}>
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}