"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Kontakt() {
  const [form, setForm] = useState({ ime: '', email: '', telefon: '', poruka: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 1200);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0f0f0f',
    border: '1.5px solid #ffc02a', color: '#ededeb',
    padding: '12px 16px', borderRadius: '12px',
    fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', fontFamily: "'Manrope', sans-serif",
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    color: '#ededeb', fontSize: '11px', fontWeight: 700,
    letterSpacing: '1px', textTransform: 'uppercase',
    display: 'block', marginBottom: '6px',
    fontFamily: "'Space Grotesk', sans-serif",
  };

  return (
    <div style={{ background: '#0f0f0f', color: '#ededeb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '140px 24px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
          <Link href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '13px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
          >Početna</Link>
          <span style={{ color: '#ededeb', fontSize: '13px' }}>/</span>
          <span style={{ color: '#ededeb', fontSize: '13px', fontFamily: "'Manrope', sans-serif" }}>Kontakt</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
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
          <h1 style={{
            fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)',
            margin: '0 0 8px 0', letterSpacing: '-2px',
            fontFamily: "'Manrope', sans-serif", color: '#ededeb',
          }}>
            Pišite ili pozovite
          </h1>
          <p style={{ color: '#ededeb', fontSize: '16px', margin: 0, fontFamily: "'Manrope', sans-serif" }}>
            Odgovaramo u roku od 1h • Besplatna procena
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>

          {/* FORMA */}
          <div style={{
            background: 'rgba(255,192,42,0.06)', border: '1px solid #ffc02a',
            borderRadius: '20px', padding: '36px',
          }}>
            <h2 style={{
              color: '#ededeb', fontWeight: 800, fontSize: '22px',
              margin: '0 0 28px 0', letterSpacing: '-0.5px',
              fontFamily: "'Manrope', sans-serif",
            }}>Pošalji upit</h2>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(255,192,42,0.15)', border: '1px solid rgba(255,192,42,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: '28px',
                }}>✓</div>
                <h3 style={{ color: '#ffc02a', fontWeight: 800, fontSize: '22px', margin: '0 0 8px 0', fontFamily: "'Manrope', sans-serif" }}>
                  Poruka poslata!
                </h3>
                <p style={{ color: '#666', fontSize: '15px', margin: 0, fontFamily: "'Manrope', sans-serif" }}>
                  Kontaktiraćemo vas uskoro.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Ime i prezime</label>
                    <input type="text" placeholder="Vaše ime..." value={form.ime}
                      onChange={e => setForm({ ...form, ime: e.target.value })} required style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                      onBlur={e => (e.target.style.borderColor = '#222')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Telefon</label>
                    <input type="tel" placeholder="+381 ..." value={form.telefon}
                      onChange={e => setForm({ ...form, telefon: e.target.value })} required style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                      onBlur={e => (e.target.style.borderColor = '#222')} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email adresa</label>
                  <input type="email" placeholder="email@primer.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} required style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                    onBlur={e => (e.target.style.borderColor = '#222')} />
                </div>
                <div>
                  <label style={labelStyle}>Poruka</label>
                  <textarea placeholder="Opišite šta vam treba..." value={form.poruka}
                    onChange={e => setForm({ ...form, poruka: e.target.value })} required rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                    onBlur={e => (e.target.style.borderColor = '#222')} />
                </div>
                <button
                  type="submit" disabled={loading}
                  style={{
                    background: loading ? '#e6a800' : '#ffc02a',
                    color: '#0e0f11', border: 'none',
                    padding: '15px', borderRadius: '100px',
                    fontWeight: 700, fontSize: '15px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: "'Space Grotesk', sans-serif",
                    transition: 'all 0.2s', marginTop: '4px',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px',
                  }}
                  onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#ffcc4a'; }}
                  onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#ffc02a'; }}
                >
                  {loading ? 'Šaljem...' : 'Pošalji upit'}
                  {!loading && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 7h8M8 4l3 3-3 3" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: 'phone', title: 'Telefon', value: '+381 63 118 3898', sub: '', href: 'tel:+381631183898' },
              { icon: 'phone', title: 'Telefon 2', value: '+381 69 120 0104', sub: '', href: 'tel:+381691200104' },
              { icon: 'email', title: 'Email', value: 'doorgatesistem@gmail.com', sub: '', href: 'mailto:info@doorgatesistem.com' },
              { icon: 'clock', title: 'Radno vreme', value: 'Ponedeljak – Subota: 7:00h – 16:00h', sub: '', href: null },
            ].map(({ icon, title, value, sub, href }) => (
              <div key={title} style={{
                background: '#0f0f0f', border: '1px solid #ffc02a',
                borderRadius: '14px', padding: '20px 24px',
                display: 'flex', gap: '16px', alignItems: 'flex-start',
                transition: 'border-color 0.2s',
              }}
               /* onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}*/
              >
                <div style={{
                  width: '44px', height: '44px',
                  background: '#0f0f0f',
                  border: '1px solid #ffc02a',
                  borderRadius: '12px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', flexShrink: 0,
                }}>
                  {icon === 'phone' ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#ffc02a" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M3 4a1 1 0 011-1h2.5l1 3-1.5 1.5a10 10 0 004.5 4.5L12 10.5l3 1V14a1 1 0 01-1 1C7 15 3 11 3 4z"/>
                    </svg>
                  ) : icon === 'email' ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#ffc02a" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M3 5l6 4 6-4"/><rect x="2" y="4" width="14" height="10" rx="1.5"/>
                    </svg>
                  ) : icon === 'location' ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#ffc02a" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M9 2C6.2 2 4 4.2 4 7c0 3.5 5 9 5 9s5-5.5 5-9c0-2.8-2.2-5-5-5z"/>
                      <circle cx="9" cy="7" r="1.5"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#ffc02a" strokeWidth="1.8" strokeLinecap="round">
                      <circle cx="9" cy="9" r="7"/><path d="M9 5v4l2.5 2.5"/>
                    </svg>
                  )}
                </div>
                <div>
                  <p style={{ color: '#ededeb', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 4px 0', fontFamily: "'Space Grotesk', sans-serif" }}>
                    {title}
                  </p>
                  {href ? (
                    <a href={href} style={{ color: '#ffc02a', fontWeight: 700, fontSize: '16px', margin: '0 0 2px 0', display: 'block', textDecoration: 'none', fontFamily: "'Space Grotesk', sans-serif", transition: 'color 0.2s' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffcc4a')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                    >
                      {value}
                    </a>
                  ) : (
                    <p style={{ color: '#ffc02a', fontWeight: 700, fontSize: '16px', margin: '0 0 2px 0', fontFamily: "'Manrope', sans-serif" }}>{value}</p>
                  )}
                  <p style={{ color: '#ededeb', fontSize: '13px', margin: 0, fontFamily: "'Manrope', sans-serif" }}>{sub}</p>
                </div>
              </div>
            ))}

            {/* CTA poziv */}
            <div style={{
              background: 'rgba(255,192,42,0.06)',
              border: '1px solid #ffc02a',
              borderRadius: '14px', padding: '24px',
              textAlign: 'center', marginTop: '4px',
            }}>
              <p style={{ color: '#ffc02a', fontWeight: 800, fontSize: '18px', margin: '0 0 6px 0', fontFamily: "'Manrope', sans-serif" }}>
                Besplatna procena
              </p>
              <p style={{ color: '#ededeb', fontSize: '14px', margin: '0 0 20px 0', fontFamily: "'Manrope', sans-serif" }}>
                Pozovite za besplatnu procenu i ponudu na licu mesta
              </p>
              <a href="tel:+381631183898" style={{
                background: '#ffc02a', color: '#0e0f11',
                padding: '12px 28px', borderRadius: '100px',
                fontWeight: 700, fontSize: '14px',
                textDecoration: 'none', display: 'inline-flex',
                alignItems: 'center', gap: '8px',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffcc4a'; el.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffc02a'; el.style.transform = 'translateY(0)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M2 3a1 1 0 011-1h2l1 3-1.5 1.5a9 9 0 004 4L10 9l3 1v2a1 1 0 01-1 1C5 13 1 9 1 4a1 1 0 011-1z" />
                </svg>
                Pozovi odmah
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
