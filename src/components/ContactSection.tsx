"use client";
import { useState } from 'react';

const contactCards = [
  {
    label: 'Telefon',
    value: '+381 64 xxx xxxx',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 4a1 1 0 011-1h2.5l1 3-1.5 1.5a10 10 0 004.5 4.5L12 10.5l3 1V14a1 1 0 01-1 1C7 15 3 11 3 4z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@doorgatesistem.com',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 5l6 4 6-4" /><rect x="2" y="4" width="14" height="10" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Adresa',
    value: 'Srbija — dostava na celoj teritoriji',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M9 2C6.2 2 4 4.2 4 7c0 3.5 5 9 5 9s5-5.5 5-9c0-2.8-2.2-5-5-5z" />
        <circle cx="9" cy="7" r="1.5" />
      </svg>
    ),
  },
  {
    label: 'Radno vreme',
    value: 'Pon – Sub: 08:00 – 18:00',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="9" cy="9" r="7" /><path d="M9 5v4l2.5 2.5" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', phone: '', email: '', message: '' });
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px',
    background: '#222', border: '1.5px solid #2a2a2a',
    borderRadius: '12px', fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif", color: '#0e0f11',
    outline: 'none', transition: 'border-color 0.2s, background 0.2s',
  };

  return (
    <section id="contact" style={{ padding: '80px 0', background: '#f7f7f8' }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <span className="tag">Kontakt</span>
          <h2 className="section-title">Pišite ili pozovite</h2>
          <p className="section-sub">Naš tim odgovara u roku od nekoliko sati.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>

          {/* FORM */}
          <div
            style={{
              background: '#1a1a1a', borderRadius: '32px',
              padding: '40px', border: '1.5px solid #2a2a2a',
            }}
          >
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.5px', color: '#f0f0f0' }}>
              Pošaljite upit
            </div>
            <div style={{ fontSize: '14px', color: '#999', marginBottom: '28px' }}>
              Opišite šta vam treba i javimo se što pre.
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 500, color: '#6b6c72', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Ime
                  </label>
                  <input
                    type="text"
                    placeholder="Vaše ime"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#ffc02a'; e.target.style.background = '#fff'; }}
                    onBlur={e => { e.target.style.borderColor = '#2a2a2a'; e.target.style.background = '#f7f7f8'; }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 500, color: '#6b6c72', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Telefon
                  </label>
                  <input
                    type="text"
                    placeholder="06x xxx xxxx"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#ffc02a'; e.target.style.background = '#fff'; }}
                    onBlur={e => { e.target.style.borderColor = '#2a2a2a'; e.target.style.background = '#f7f7f8'; }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 500, color: '#6b6c72', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="vas@email.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = '#ffc02a'; e.target.style.background = '#fff'; }}
                  onBlur={e => { e.target.style.borderColor = '#2a2a2a'; e.target.style.background = '#f7f7f8'; }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 500, color: '#6b6c72', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Poruka
                </label>
                <textarea
                  placeholder="Opišite šta vam treba (tip kapije, lokacija, pitanje...)"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                  onFocus={e => { e.target.style.borderColor = '#ffc02a'; e.target.style.background = '#fff'; }}
                  onBlur={e => { e.target.style.borderColor = '#2a2a2a'; e.target.style.background = '#f7f7f8'; }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%', background: sent ? '#e6a800' : '#ffc02a', color: '#0e0f11',
                  fontSize: '14px', fontWeight: 600,
                  padding: '14px', borderRadius: '100px',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif",
                  marginTop: '8px',
                }}
              >
                {sent ? '✓ Poslato!' : 'Pošalji upit'}
                {!sent && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 7h8M8 4l3 3-3 3" />
                  </svg>
                )}
              </button>
            </form>
          </div>

          {/* INFO */}
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.5px', color: '#f0f0f0' }}>
              Pronađite nas
            </div>
            <div style={{ fontSize: '14px', color: '#6b6c72', marginBottom: '32px' }}>
              Radujemo se vašoj poseti ili pozivu.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {contactCards.map(card => (
                <div
                  key={card.label}
                  style={{
                    background: '#fff', border: '1.5px solid #2a2a2a', borderRadius: '12px',
                    padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a')}
                >
                  <div
                    style={{
                      width: '40px', height: '40px', borderRadius: '8px',
                      background: 'rgba(255,192,42,0.15)', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#ffc02a',
                    }}
                  >
                    <div style={{ width: '18px', height: '18px' }}>{card.icon}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#6b6c72', fontWeight: 500, marginBottom: '3px' }}>
                      {card.label}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#f0f0f0' }}>{card.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              style={{
                background: '#fff', border: '1.5px solid #2a2a2a', borderRadius: '20px',
                height: '180px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '10px',
                color: '#6b6c72', fontSize: '14px', cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a')}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#ffc02a" strokeWidth="1.5" strokeLinecap="round">
                <path d="M16 4C11.6 4 8 7.6 8 12c0 6.5 8 16 8 16s8-9.5 8-16c0-4.4-3.6-8-8-8z" />
                <circle cx="16" cy="12" r="3" />
              </svg>
              <span>Kliknite za Google Maps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
