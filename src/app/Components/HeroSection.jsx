'use client';
import Link from 'next/link';

export default function HeroSection({ title, highlight, subtitle, description, breadcrumb, badges = [] }) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #0A2040 100%)',
      padding: '140px 24px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decorative circles */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Breadcrumb */}
        {breadcrumb && (
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8' }}>
            <Link href="/" style={{ color: '#F59E0B', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            {breadcrumb.map((b, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {i < breadcrumb.length - 1 ? (
                  <><Link href={b.href || '#'} style={{ color: '#94A3B8', textDecoration: 'none' }}>{b.label}</Link><span>›</span></>
                ) : (
                  <span style={{ color: '#CBD5E1' }}>{b.label}</span>
                )}
              </span>
            ))}
          </div>
        )}

        <div style={{ maxWidth: '820px' }}>
          {/* Badges */}
          {badges.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {badges.map((badge, i) => (
                <span key={i} style={{
                  backgroundColor: 'rgba(245,158,11,0.15)', color: '#F59E0B',
                  padding: '6px 14px', borderRadius: '999px', fontSize: '12px',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: '600',
                  border: '1px solid rgba(245,158,11,0.3)', letterSpacing: '0.5px',
                }}>{badge}</span>
              ))}
            </div>
          )}

          <h1 style={{
            fontFamily: 'Sora, sans-serif', fontWeight: '800', color: '#FFFFFF',
            fontSize: 'clamp(32px, 5vw, 58px)', lineHeight: '1.15', marginBottom: '20px',
            letterSpacing: '-1px',
          }}>
            {title}{' '}
            {highlight && (
              <span style={{ background: 'linear-gradient(135deg, #F59E0B, #0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {highlight}
              </span>
            )}
          </h1>

          {subtitle && (
            <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: '600', fontSize: '18px', color: '#F59E0B', marginBottom: '16px' }}>
              {subtitle}
            </p>
          )}

          {description && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: '#94A3B8', lineHeight: '1.8', marginBottom: '36px', maxWidth: '660px' }}>
              {description}
            </p>
          )}

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              backgroundColor: '#F59E0B', color: '#0A1628', textDecoration: 'none',
              padding: '14px 32px', borderRadius: '12px', fontFamily: 'Sora, sans-serif',
              fontWeight: '700', fontSize: '15px', boxShadow: '0 8px 25px rgba(245,158,11,0.4)',
              transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}>
              Get Free Consultation →
            </Link>
            <a href="https://wa.me/919876543210" style={{
              backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', textDecoration: 'none',
              padding: '14px 32px', borderRadius: '12px', fontFamily: 'Sora, sans-serif',
              fontWeight: '600', fontSize: '15px', border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}