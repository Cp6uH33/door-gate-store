"use client";
import { useState } from 'react';

const contactCards = [
  {
    label: 'Telefon',
    value: (
      <>
        <a href="tel:+381631183898" style={{
          color: '#ffc02a',
          textDecoration: 'none',
          display: 'block',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '1.6',
          marginBottom: '10px',
        }}>
          +381 631 183 898
        </a>
        <a href="tel:+381691200104" style={{
          color: '#ffc02a',
          textDecoration: 'none',
          display: 'block',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '1.4'
        }}>
          +381 691 200 104
        </a>
      </>
    ),
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 4a1 1 0 011-1h2.5l1 3-1.5 1.5a10 10 0 004.5 4.5L12 10.5l3 1V14a1 1 0 01-1 1C7 15 3 11 3 4z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: (
      <a href="mailto:doorgatesistem@gmail.com" style={{
        color: '#ffc02a',
        textDecoration: 'none',
        display: 'block',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '1.6'
      }}>
        doorgatesistem@gmail.com
      </a>
    ),
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 5l6 4 6-4" /><rect x="2" y="4" width="14" height="10" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Adresa',
    value: (
      <a href="https://maps.google.com/?q=Bregalnicka7+Subotica,+Srbija" target="_blank" style={{
        color: '#ffc02a',
        textDecoration: 'none',
        display: 'block',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '1.6'
      }}>
        Bregalnička 7, 24000 Subotica
      </a>
    ),
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M9 2C6.2 2 4 4.2 4 7c0 3.5 5 9 5 9s5-5.5 5-9c0-2.8-2.2-5-5-5z" />
        <circle cx="9" cy="7" r="1.5" />
      </svg>
    ),
  },
  {
    label: 'Radno vreme',
    value: 'Ponedeljak – Subota: 08h – 16h',
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
    background: '#222', border: '1.5px solid #ffc02a',
    borderRadius: '12px', fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif", color: '#0f0f0f',
    outline: 'none', transition: 'border-color 0.2s, background 0.2s',
  };

  return (
    <section id="contact" style={{ padding: '80px 0', background: '#1a1a1a' }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
           <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.8px',
            textTransform: 'uppercase', color: '#ffc02a',
            background: 'rgba(255,192,42,0.15)', padding: '5px 12px',
            borderRadius: '100px', marginBottom: '16px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffc02a', display: 'inline-block' }} />
            Kontakt
          </span>
          <h2 className="section-title">Pišite ili pozovite</h2>
          <p className="section-sub">Naš tim odgovara u roku od nekoliko sati.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>

          {/* FORM */}
          <div
            style={{
              background: '#1a1a1a', borderRadius: '32px',
              padding: '40px', border: '1.5px solid #ffc02a',
            }}
          >
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.5px', color: '#f0f0f0' }}>
              Pošaljite upit
            </div>
            <div style={{ fontSize: '14px', color: '#ededeb', marginBottom: '28px' }}>
              Opišite šta vam treba i javimo se što pre.
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 500, color: '#edebeb', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                  <label style={{ fontSize: '12px', fontWeight: 500, color: '#ededeb', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                <label style={{ fontSize: '12px', fontWeight: 500, color: '#ededeb', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                <label style={{ fontSize: '12px', fontWeight: 500, color: '#ededeb', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.5px', color: '#fffbf0' }}>
              Pronađite nas
            </div>
            <div style={{ fontSize: '14px', color: '#fffbf0', marginBottom: '32px' }}>
              Radujemo se vašoj poseti ili pozivu.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {contactCards.map(card => (
                <div
                  key={card.label}
                  style={{
                    background: '#1a1a1a', border: '1.5px solid #ffc02a', borderRadius: '12px',
                    padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px',
                    transition: 'border-color 0.2s',color: '#fffbf0',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}
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
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#fffbf0', fontWeight: 500, marginBottom: '3px' }}>
                      {card.label}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#ffc02a' }}>{card.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1.5px solid #ffc02a', position: 'relative' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2767.7527004349085!2d19.66795608578743!3d46.075972017884936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474360d07374fe75%3A0x8a4cbefda79c09b1!2sBregalni%C4%8Dka%207%2C%20Subotica%2024106!5e0!3m2!1sen!2srs!4v1774380965444!5m2!1sen!2srs"
                height="220"
                width="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
              />
              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(15,15,15,0.5) 0%, transparent 50%)',
                pointerEvents: 'none', borderRadius: '20px',
              }} />
              {/* Label */}
              <div style={{
                position: 'absolute', bottom: '12px', left: '12px',
                background: 'rgba(15,15,15,0.85)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,192,42,0.3)',
                borderRadius: '8px', padding: '6px 12px',
                display: 'flex', alignItems: 'center', gap: '6px',
                pointerEvents: 'none',
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#ffc02a" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 1C4.1 1 2.5 2.6 2.5 4.5c0 2.5 3.5 6.5 3.5 6.5s3.5-4 3.5-6.5C9.5 2.6 7.9 1 6 1z"/>
                  <circle cx="6" cy="4.5" r="1"/>
                </svg>
                <span style={{ fontSize: '11px', color: '#ffc02a', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Bregalnička 7, Subotica
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
