'use client';
import Link from 'next/link';

export default function ServiceCard({ icon, title, description, href, tag }) {
  return (
    <div className="card-hover" style={{
      backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '28px',
      border: '1px solid #E2E8F0', position: 'relative', overflow: 'hidden',
    }}>
      {tag && (
        <span style={{
          position: 'absolute', top: '16px', right: '16px',
          backgroundColor: '#FEF3C7', color: '#92400E',
          padding: '4px 10px', borderRadius: '999px', fontSize: '11px',
          fontFamily: 'DM Sans, sans-serif', fontWeight: '600',
        }}>{tag}</span>
      )}
      <div style={{
        width: '56px', height: '56px', borderRadius: '14px',
        background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '28px', marginBottom: '18px',
        border: '1px solid #BFDBFE',
      }}>{icon}</div>
      <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: '700', fontSize: '17px', color: '#0A1628', marginBottom: '10px' }}>{title}</h3>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#64748B', lineHeight: '1.7', marginBottom: '20px' }}>{description}</p>
      <Link href={href || '#'} style={{
        fontFamily: 'DM Sans, sans-serif', fontWeight: '600', fontSize: '14px',
        color: '#0EA5E9', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
        transition: 'gap 0.2s',
      }}>Know More →</Link>
    </div>
  );
}