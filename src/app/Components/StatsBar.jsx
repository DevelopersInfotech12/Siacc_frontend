'use client';
import { useEffect, useRef, useState } from 'react';

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 10000, suffix: '+', label: 'Clients Served', icon: '👥' },
  { value: 12, suffix: '+', label: 'Years Experience', icon: '🏆' },
  { value: 500, suffix: '+', label: 'Products Certified', icon: '✅' },
  { value: 0, suffix: '%', label: 'Failure Rate', icon: '❌' },
  { value: 20, suffix: '+', label: 'Expert Consultants', icon: '👨‍💼' },
];

export default function StatsBar() {
  return (
    <section style={{ backgroundColor: '#0A1628', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '24px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '20px', borderRight: i < stats.length - 1 ? '1px solid #1E3A5F' : 'none' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: '800', fontSize: '36px', color: '#F59E0B', marginBottom: '6px' }}>
              <CountUp target={s.value} suffix={s.suffix} />
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8', fontWeight: '500' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}