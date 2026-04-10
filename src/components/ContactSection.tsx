"use client";
import { useState } from 'react';

const contactCards = [
  {
    label: 'Telefon',
    value: '+381 63 118 3898',
    sub: 'Dostupni Pon-Pet 8-20h',
    href: 'tel:+381631183898',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="#ffc02a" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 4a1 1 0 011-1h2.5l1 3-1.5 1.5a10 10 0 004.5 4.5L12 10.5l3 1V14a1 1 0 01-1 1C7 15 3 11 3 4z"/>
      </svg>
    ),
  },
  {
    label: 'Telefon 2',
    value: '+381 69 120 0104',
    sub: 'Dostupni Pon-Pet 8-20h',
    href: 'tel:+381691200104',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="#ffc02a" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 4a1 1 0 011-1h2.5l1 3-1.5 1.5a10 10 0 004.5 4.5L12 10.5l3 1V14a1 1 0 01-1 1C7 15 3 11 3 4z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'doorgatesistem@gmail.com',
    sub: 'Odgovaramo u najkraćem mogućem roku',
    href: 'mailto:doorgatesistem@gmail.com',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="#ffc02a" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 5l6 4 6-4"/><rect x="2" y="4" width="14" height="10" rx="1.5"/>
      </svg>
    ),
  },
  {
    label: 'Radno vreme',
    value: 'Pon – Pet: 8:00h – 20:00h',
    sub: 'Ned: Po dogovoru',
    href: null,
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="#ffc02a" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="9" cy="9" r="7"/><path d="M9 5v4l2.5 2.5"/>
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
    background: '#111', border: '1.5px solid #2a2a2a',
    borderRadius: '12px', fontSize: '14px',
    fontFamily: "'Manrope', sans-serif", color: '#ededeb',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <>
      <section id="contact" style={{ padding: '80px 0', background: '#1a1a1a' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px' }}>

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
            <h2 style={{
              fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800,
              letterSpacing: '-1.5px', color: '#f0f0f0',
              fontFamily: "'Manrope', sans-serif",
            }}>
              Pišite ili pozovite
            </h2>
            <p style={{ fontSize: '15px', color: '#ededeb', marginTop: '8px', fontFamily: "'Manrope', sans-serif" }}>
              Naš tim odgovara u roku od nekoliko sati.
            </p>
          </div>

          <div className="contact-grid">

            {/* FORMA */}
            <div style={{
              background: '#111', borderRadius: '24px',
              padding: '32px', border: '1.5px solid #ffc02a',
            }}>
              <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px', color: '#f0f0f0', fontFamily: "'Manrope', sans-serif" }}>
                Pošaljite upit
              </div>

              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'rgba(255,192,42,0.15)', border: '1px solid #ffc02a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px', fontSize: '24px',
                  }}>✓</div>
                  <h3 style={{ color: '#ffc02a', fontWeight: 800, fontSize: '20px', margin: '0 0 8px 0', fontFamily: "'Manrope', sans-serif" }}>Poruka poslata!</h3>
                  <p style={{ color: '#666', fontSize: '14px', fontFamily: "'Manrope', sans-serif" }}>Kontaktiraćemo vas uskoro.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-row">
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#ededeb', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "'Space Grotesk', sans-serif" }} htmlFor="name">Ime i prezime</label>
                      <input id="name" type="text" autoComplete="name" placeholder="Vaše ime..." value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#ffc02a'; }}
                        onBlur={e => { e.target.style.borderColor = '#2a2a2a'; }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#ededeb', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "'Space Grotesk', sans-serif" }} htmlFor="phone">Telefon</label>
                      <input id="phone" type="tel" autoComplete="tel" placeholder="+381 ..." value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#ffc02a'; }}
                        onBlur={e => { e.target.style.borderColor = '#2a2a2a'; }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#ededeb', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "'Space Grotesk', sans-serif" }} htmlFor="email">Email</label>
                    <input id="email" type="email" autoComplete="email" placeholder="email@primer.com" value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#ffc02a'; }}
                      onBlur={e => { e.target.style.borderColor = '#2a2a2a'; }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#ededeb', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "'Space Grotesk', sans-serif" }} htmlFor="message">Poruka</label>
                    <textarea id="message" autoComplete="off" placeholder="Opišite šta vam treba..." value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required rows={4}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                      onFocus={e => { e.target.style.borderColor = '#ffc02a'; }}
                      onBlur={e => { e.target.style.borderColor = '#2a2a2a'; }} />
                  </div>
                  <button type="submit" style={{
                    width: '100%', background: '#ffc02a', color: '#0e0f11',
                    fontSize: '14px', fontWeight: 700,
                    padding: '14px', borderRadius: '100px',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.2s', fontFamily: "'Space Grotesk', sans-serif",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffcc4a'; el.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffc02a'; el.style.transform = 'translateY(0)'; }}
                  >
                    Pošalji upit
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 7h8M8 4l3 3-3 3" />
                    </svg>
                  </button>
                </form>
              )}
            </div>

            {/* INFO */}
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px', color: '#f0f0f0', fontFamily: "'Manrope', sans-serif" }}>
                Pronađite nas
              </div>
              <div style={{ fontSize: '14px', color: '#ededeb', marginBottom: '24px', fontFamily: "'Manrope', sans-serif" }}>
                Radujemo se vašoj poseti ili pozivu.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {contactCards.map(card => (
                  <div key={card.label} style={{
                    background: '#111', border: '1px solid #222', borderRadius: '12px',
                    padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: '14px',
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#222')}
                  >
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      background: 'rgba(255,192,42,0.1)', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(255,192,42,0.2)',
                    }}>
                      <div style={{ width: '18px', height: '18px' }}>{card.icon}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#ededeb', fontWeight: 500, marginBottom: '3px', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {card.label}
                      </div>
                      {card.href ? (
                        <a href={card.href} style={{ fontSize: '14px', fontWeight: 600, color: '#ffc02a', textDecoration: 'none', display: 'block', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffcc4a')}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                        >
                          {card.value}
                        </a>
                      ) : (
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffc02a', fontFamily: "'Manrope', sans-serif" }}>{card.value}</div>
                      )}
                      <div style={{ fontSize: '12px', color: '#ededeb', fontFamily: "'Manrope', sans-serif" }}>{card.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mapa */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ffc02a', position: 'relative' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2767.7527004349085!2d19.66795608578743!3d46.075972017884936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474360d07374fe75%3A0x8a4cbefda79c09b1!2sBregalni%C4%8Dka%207%2C%20Subotica%2024106!5e0!3m2!1sen!2srs!4v1774380965444!5m2!1sen!2srs"
                  height="200" width="100%"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(15,15,15,0.5) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }} />
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

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
