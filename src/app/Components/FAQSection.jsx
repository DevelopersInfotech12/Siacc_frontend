'use client';
import { useState } from 'react';

export default function FAQSection({ faqs, title = 'Frequently Asked Questions' }) {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding: '80px 24px', backgroundColor: '#F8FAFC' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '8px 20px', borderRadius: '999px', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>FAQ</span>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: '800', fontSize: 'clamp(24px, 3.5vw, 38px)', color: '#0A1628', marginTop: '16px' }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid',
              borderColor: open === i ? '#0EA5E9' : '#E2E8F0',
              overflow: 'hidden', transition: 'border-color 0.2s',
              boxShadow: open === i ? '0 4px 20px rgba(14,165,233,0.08)' : 'none',
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', padding: '20px 24px', background: 'none', border: 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                cursor: 'pointer', textAlign: 'left',
              }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: '600', fontSize: '16px', color: '#0A1628', paddingRight: '16px' }}>{faq.q}</span>
                <span style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  backgroundColor: open === i ? '#0EA5E9' : '#F1F5F9',
                  color: open === i ? '#FFFFFF' : '#64748B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', fontWeight: '700', transition: 'all 0.2s',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#64748B', lineHeight: '1.8', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}