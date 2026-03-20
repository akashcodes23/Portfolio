'use client';

const items = [
    'Python', '·', 'PyTorch', '·', 'TensorFlow', '·',
    'FastAPI', '·', 'LLM Research', '·', 'Computer Vision', '·',
    'MLOps', '·', 'React', '·', 'Docker', '·', 'HuggingFace', '·',
    'CGPA 9.15', '·', 'JSSATE Bengaluru', '·',
];

export default function Marquee() {
    const ACCENT = '#FF6B2C';
    const repeated = [...items, ...items];

    return (
        <div style={{
            background: '#000',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '14px 0', overflow: 'hidden',
            position: 'relative',
        }}>
            <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>
            <div style={{
                display: 'flex', gap: 24, width: 'max-content',
                animation: 'marquee 25s linear infinite',
            }}>
                {repeated.map((item, i) => (
                    <span key={i} style={{
                        fontSize: 11, letterSpacing: '0.2em',
                        textTransform: 'uppercase', whiteSpace: 'nowrap',
                        color: item === '·' ? ACCENT : 'rgba(255,255,255,0.3)',
                        fontWeight: item === '·' ? 700 : 300,
                    }}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}