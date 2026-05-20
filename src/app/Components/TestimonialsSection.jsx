'use client';
import { useState } from 'react';

const testimonials = [
  { name: 'Rajesh Mehta', company: 'TechVision Electronics Pvt. Ltd.', role: 'CEO', rating: 5, text: 'Siacc helped us get our BIS CRS certification in record time. Their team was professional, responsive, and handled all the documentation flawlessly. We got our certificate in just 45 days!' },
  { name: 'Priya Sharma', company: 'GreenLeaf Imports', role: 'Director', rating: 5, text: 'We were struggling with EPR registration for months. Siacc stepped in and resolved everything within 3 weeks. Their knowledge of CPCB regulations is exceptional. Highly recommended!' },
  { name: 'Anand Gupta', company: 'WirelessTech Solutions', role: 'MD', rating: 5, text: 'Getting WPC ETA approval seemed like a nightmare until we engaged Siacc. Their team made it seamless. We now have all our wireless products compliant and legally importable.' },
  { name: 'Sonia Kapoor', company: 'LifeScience Devices Pvt. Ltd.', role: 'COO', rating: 5, text: 'Excellent service for CDSCO medical device registration. The team\'s expertise in regulatory compliance saved us months of effort and potential penalties. Worth every rupee!' },
  { name: 'Vikram Singh', company: 'PowerMax India', role: 'VP Operations', rating: 5, text: 'BEE Star Label registration done smoothly with Siacc. They guided us through every step and ensured we met all BEE standards. Our products are now certified and selling well.' },
  { name: 'Nisha Patel', company: 'PackSmart Industries', role: 'General Manager', rating: 5, text: 'Our LMPC registration was completed swiftly. Siacc\'s team is knowledgeable, courteous and always available. The entire process was transparent with regular updates.' },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(current * perPage, current * perPage + perPage);

  return (
    <section style={{ padding: '80px 24px', backgroundColor: '#0A1628' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ backgroundColor: 'rgba(245,158,11,0.15)', color: '#F59E0B', padding: '8px 20px', borderRadius: '999px', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', border: '1px solid rgba(245,158,11,0.3)' }}>CLIENT STORIES</span>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: '800', fontSize: 'clamp(28px, 4vw, 42px)', color: '#FFFFFF', marginTop: '16px', marginBottom: '16px' }}>
            What Our Clients Say
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#94A3B8', maxWidth: '560px', margin: '0 auto' }}>
            10,000+ businesses trust us for their compliance journey.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {visible.map((t, i) => (
            <div key={i} style={{
              backgroundColor: '#1E3A5F', borderRadius: '16px', padding: '28px',
              border: '1px solid #2D4A6B', position: 'relative',
            }}>
              <div style={{ color: '#F59E0B', fontSize: '20px', marginBottom: '16px' }}>{'★'.repeat(t.rating)}</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#CBD5E1', lineHeight: '1.8', marginBottom: '24px', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #2D4A6B' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora, sans-serif', fontWeight: '800', fontSize: '18px', color: '#0A1628', flexShrink: 0 }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: '700', fontSize: '14px', color: '#FFFFFF' }}>{t.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#94A3B8' }}>{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? '32px' : '10px', height: '10px', borderRadius: '5px',
              backgroundColor: i === current ? '#F59E0B' : '#2D4A6B', border: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}