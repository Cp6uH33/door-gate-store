"use client";
import Image from 'next/image';
import React from 'react';

const trustItems = [
  { icon: 'star',   text: 'Brza montaža u roku od 48h' },
  { icon: 'shield', text: 'Garancija na sve proizvode' },
  { icon: 'pin',    text: 'Dostava na teritoriji Srbije' },
  { icon: 'mail',   text: 'Stručni savet i podrška' },
  { icon: 'card',   text: 'Vodeći svetski brendovi' },
];

const icons: Record<string, React.ReactNode> = {
  star: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.3l-3.7 2L5 8.2 2 5.3l4.2-.7z" />
    </svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 2L3 4.5v4C3 11.5 5.5 14 8 15c2.5-1 5-3.5 5-6.5v-4z" />
      <path d="M5.5 8l2 2 3.5-3.5" strokeLinecap="round" />
    </svg>
  ),
  pin: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 2C5.2 2 3 4.2 3 7c0 3.5 5 8 5 8s5-4.5 5-8c0-2.8-2.2-5-5-5z" />
      <circle cx="8" cy="7" r="1.5" />
    </svg>
  ),
  mail: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 4l6 4 6-4" /><rect x="2" y="4" width="12" height="9" rx="1.5" />
    </svg>
  ),
  card: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="2" width="10" height="12" rx="2" /><circle cx="10" cy="8" r="1.5" />
    </svg>
  ),
};

const logos = [
  '/logo1.png', '/logo2.png', '/logo3.png',
  '/logo4.png', '/logo5.png', '/logo6.png',
];

// Dupliraj 4x za beskonačan loop bez ponavljanja
const loopedLogos = [...logos, ...logos, ...logos, ...logos];

export default function TrustBar() {
  const loopedItems = [...trustItems, ...trustItems, ...trustItems, ...trustItems];

  return (
    <div style={{
      background: '#111',
      borderTop: '1px solid #1a1a1a',
      borderBottom: '1px solid #1a1a1a',
      overflow: 'hidden',
    }}>

      {/* Traka 1 — tekst */}
      <div style={{ padding: '12px 0', overflow: 'hidden', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '48px',
          width: 'max-content',
          animation: 'marquee-left 30s linear infinite',
        }}>
          {loopedItems.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              whiteSpace: 'nowrap', color: 'rgba(255,255,255,0.4)',
              fontSize: '13px', flexShrink: 0,
            }}>
              <span style={{ color: '#ffc02a', display: 'flex' }}>
                {icons[item.icon]}
              </span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Traka 2 — logoi partnera, full width loop */}
      <div style={{ padding: '20px 0', overflow: 'hidden' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '64px',
          width: 'max-content',
          animation: 'marquee-right 35s linear infinite',
        }}>
          {loopedLogos.map((src, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, opacity: 0.45, transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '0.45')}
            >
              <Image
                src={src}
                alt={`Partner ${(i % logos.length) + 1}`}
                width={110}
                height={44}
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
}
