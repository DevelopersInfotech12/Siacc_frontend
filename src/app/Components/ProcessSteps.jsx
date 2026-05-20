'use client';

const steps = [
  { num: '01', title: 'Free Consultation', desc: 'Share your product details and we assess your certification needs for free.', icon: '💬' },
  { num: '02', title: 'Document Collection', desc: 'Our team guides you through the required documents and test reports.', icon: '📄' },
  { num: '03', title: 'Application Filing', desc: 'We prepare and file your application with the relevant regulatory body.', icon: '📝' },
  { num: '04', title: 'Testing & Review', desc: 'Product samples are sent to accredited labs for mandatory testing.', icon: '🔬' },
  { num: '05', title: 'Approval & Follow-up', desc: 'We follow up with authorities and handle any queries on your behalf.', icon: '📊' },
  { num: '06', title: 'Certificate Delivery', desc: 'Your certificate is delivered digitally and in hard copy, ready to use.', icon: '🏅' },
];

export default function ProcessSteps() {
  return (
    <section style={{ padding: '80px 24px', backgroundColor: '#F8FAFC' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '8px 20px', borderRadius: '999px', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>HOW IT WORKS</span>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: '800', fontSize: 'clamp(28px, 4vw, 42px)', color: '#0A1628', marginTop: '16px', marginBottom: '16px' }}>
            Our Simple 6-Step Process
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#64748B', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7' }}>
            We handle the entire certification journey so you can focus on your business.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {steps.map((step, i) => (
            <div key={i} className="card-hover" style={{
              backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '32px 24px',
              border: '1px solid #E2E8F0', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-10px', right: '-10px',
                fontFamily: 'Sora, sans-serif', fontWeight: '900', fontSize: '72px',
                color: '#F1F5F9', lineHeight: '1', userSelect: 'none',
              }}>{step.num}</div>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{step.icon}</div>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: '700', fontSize: '18px', color: '#0A1628', marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#64748B', lineHeight: '1.7' }}>{step.desc}</p>
              <div style={{ width: '40px', height: '3px', backgroundColor: '#F59E0B', borderRadius: '2px', marginTop: '16px' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}