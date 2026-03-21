"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const stats = [
  { num: '500', suffix: '+', label: 'Instalacija' },
  { num: '48',  suffix: 'h', label: 'Montaža' },
  { num: '5',   suffix: '★', label: 'Ocena usluge' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const children = el.querySelectorAll<HTMLElement>('[data-animate]');
    children.forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(24px)';
      setTimeout(() => {
        child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }, i * 120);
    });
  }, []);

  return (
    <section style={{
      position: 'relative',
      paddingTop: '80px',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Background slika */}
      <Image
        src="/hero.webp"
        alt="Hero background"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 50%, rgba(0,0,0,0.30) 100%)',
      }} />

      {/* Glow akcenat */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(255,192,42,0.10) 0%, transparent 70%)',
      }} />

      {/* Sadržaj */}
      <div ref={heroRef} style={{
        position: 'relative', zIndex: 10,
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '60px', alignItems: 'center',
        width: '100%',
      }}>
        {/* LEFT */}
        <div style={{ paddingBottom: '80px', paddingTop: '40px' }}>

          <div data-animate style={{ marginBottom: '20px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '11px', fontWeight: 500, letterSpacing: '0.8px',
              textTransform: 'uppercase', color: '#ffc02a',
              background: 'rgba(255,192,42,0.15)', padding: '5px 12px',
              borderRadius: '100px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffc02a', display: 'inline-block' }} />
              Profesionalna automatizacija
            </span>
          </div>

          <h1 data-animate style={{
            fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800,
            lineHeight: 1.05, letterSpacing: '-2px',
            color: '#ffffff', marginBottom: '20px',
          }}>
            Sigurnost za<br />svaki{' '}
            <em style={{ fontStyle: 'normal', color: '#ffc02a', position: 'relative', display: 'inline-block' }}>
              ulaz
              <span style={{
                position: 'absolute', bottom: '2px', left: 0, right: 0,
                height: '3px', background: '#ffc02a', borderRadius: '2px', opacity: 0.5,
              }} />
            </em>{' '}i<br />kapiju
          </h1>

          <p data-animate style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '420px',
            lineHeight: 1.7, marginBottom: '32px',
          }}>
            Motori za kapije, video interfoni i pametni sistemi za kontrolu pristupa.
            Prodaja, dostava i profesionalna montaža širom Srbije.
          </p>

          <div data-animate style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/shop" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#ffc02a', color: '#0e0f11',
              fontWeight: 700, fontSize: '15px',
              padding: '13px 26px', borderRadius: '100px',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffcc4a'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffc02a'; el.style.transform = 'translateY(0)'; }}
            >
              Pogledaj shop
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 7h8M8 4l3 3-3 3" />
              </svg>
            </Link>
            <Link href="/kontakt" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.1)', color: '#ffffff',
              fontWeight: 500, fontSize: '15px',
              padding: '12px 26px', borderRadius: '100px',
              textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.3)',
              transition: 'all 0.2s', backdropFilter: 'blur(4px)',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.2)'; el.style.borderColor = 'rgba(255,255,255,0.5)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.1)'; el.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            >
              Kontaktiraj nas
            </Link>
          </div>

          <div data-animate style={{
            display: 'flex', gap: '28px', marginTop: '40px',
            paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.15)',
          }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-1px' }}>
                  {s.num}<span style={{ color: '#ffc02a' }}>{s.suffix}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — product card */}
        <div data-animate style={{ position: 'relative', alignSelf: 'end' }}>
          <div style={{
            background: 'rgba(26,26,26,0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '32px 32px 0 0',
            padding: '40px 40px 0',
            position: 'relative', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 60px rgba(0,0,0,0.4)',
          }}>
            <span style={{
              position: 'absolute', top: '24px', right: '24px',
              background: '#ffc02a', color: '#0e0f11',
              fontSize: '11px', fontWeight: 700,
              padding: '6px 14px', borderRadius: '100px',
            }}>
              Bestseler
            </span>

            <div style={{ width: '100%', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="200" height="260" viewBox="0 0 200 260" fill="none">
                <rect x="30" y="10" width="140" height="220" rx="14" fill="#2a2a2a" stroke="#444" strokeWidth="1.5" />
                <rect x="45" y="25" width="90" height="68" rx="8" fill="#1a1d22" />
                <rect x="48" y="28" width="84" height="62" rx="6" fill="#0e1218" />
                <ellipse cx="90" cy="50" rx="14" ry="14" fill="#2a3040" />
                <path d="M68 83 Q90 70 112 83" fill="#2a3040" />
                <circle cx="135" cy="38" r="5" fill="#1a1d22" stroke="#333" strokeWidth="1" />
                <circle cx="135" cy="38" r="2.5" fill="#ffc02a" fillOpacity="0.9" />
                <rect x="50" y="108" width="100" height="80" rx="6" fill="#333" />
                {[0,1,2].map(row =>
                  [0,1,2].map(col => (
                    <rect
                      key={`${row}-${col}`}
                      x={56 + col * 28} y={114 + row * 19}
                      width="22" height="14" rx="3"
                      fill="#3a3a3a" stroke="#444" strokeWidth="0.5"
                    />
                  ))
                )}
                <rect x="56" y="171" width="22" height="14" rx="3" fill="#3a3a3a" stroke="#444" strokeWidth="0.5" />
                <rect x="84" y="171" width="22" height="14" rx="3" fill="#ffc02a" stroke="#e6a800" strokeWidth="0.5" />
                <rect x="112" y="171" width="22" height="14" rx="3" fill="#3a3a3a" stroke="#444" strokeWidth="0.5" />
                {[200,206,212,218].map(y => (
                  <line key={y} x1="55" y1={y} x2="145" y2={y} stroke="#444" strokeWidth="1" />
                ))}
              </svg>
            </div>

            <div style={{
              position: 'absolute', bottom: '20px', left: '20px',
              background: 'rgba(20,20,20,0.9)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', padding: '12px 16px',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#f0f0f0', marginBottom: '2px' }}>
                Color video interfon 7&quot;
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffc02a' }}>
                16.700 RSD
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
