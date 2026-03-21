"use client";
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const categories = [
  {
    name: 'Video interfoni',
    count: '12 proizvoda',
    href: '/shop?cat=interfoni',
    icon: (
      <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="4" y="2" width="18" height="22" rx="3" />
        <rect x="7" y="7" width="8" height="6" rx="1.5" />
        <circle cx="17" cy="13" r="2.5" />
        <line x1="7" y1="18" x2="19" y2="18" />
      </svg>
    ),
  },
  {
    name: 'Motori za kapije',
    count: '18 proizvoda',
    href: '/shop?cat=motori',
    icon: (
      <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <ellipse cx="13" cy="14" rx="8" ry="5" />
        <rect x="9" y="11" width="8" height="6" rx="2" />
        <line x1="3" y1="14" x2="9" y2="14" />
        <line x1="17" y1="14" x2="23" y2="14" />
        <rect x="6" y="4" width="14" height="7" rx="2" />
      </svg>
    ),
  },
  {
    name: 'RFID sistemi',
    count: '9 proizvoda',
    href: '/shop?cat=rfid',
    icon: (
      <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="5" y="3" width="16" height="20" rx="3" />
        <rect x="8" y="7" width="6" height="4" rx="1" />
        <rect x="8" y="13" width="6" height="4" rx="1" />
        <circle cx="18" cy="10" r="2" />
      </svg>
    ),
  },
  {
    name: 'Brave i cilindri',
    count: '15 proizvoda',
    href: '/shop?cat=brave',
    icon: (
      <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="4" y="6" width="11" height="14" rx="2" />
        <path d="M15 9h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3" />
        <circle cx="9" cy="13" r="2" />
        <line x1="6" y1="20" x2="12" y2="20" />
      </svg>
    ),
  },
];

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('[data-card]');
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, Number(el.dataset.delay ?? 0));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.dataset.delay = String(i * 80);
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="categories" style={{ padding: '80px 0', background: '#0f0f0f' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }} ref={sectionRef}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.8px',
            textTransform: 'uppercase', color: '#ffc02a',
            background: 'rgba(255,192,42,0.15)', padding: '5px 12px',
            borderRadius: '100px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffc02a', display: 'inline-block' }} />
            Asortiman
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800,
            letterSpacing: '-1.5px', lineHeight: 1.1,
            color: '#f0f0f0', marginTop: '12px', marginBottom: '8px',
          }}>
            Kategorije
          </h2>
          <p style={{ fontSize: '15px', color: '#666', maxWidth: '500px' }}>
            Sve što vam je potrebno za automatizaciju ulaza i kapija na jednom mestu.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} style={{ textDecoration: 'none' }}>
              <div
                data-card
                style={{
                  background: '#1a1a1a', borderRadius: '20px',
                  padding: '28px 24px', cursor: 'pointer',
                  position: 'relative', overflow: 'hidden',
                  border: '1.5px solid #222',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = '#222';
                  el.style.borderColor = '#ffc02a';
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 8px 32px rgba(255,192,42,0.12)';
                  const icon = el.querySelector<HTMLElement>('.cat-icon');
                  if (icon) {
                    icon.style.background = 'rgba(255,192,42,0.15)';
                    icon.style.borderColor = 'rgba(255,192,42,0.3)';
                    icon.style.color = '#ffc02a';
                  }
                  const arrow = el.querySelector<HTMLElement>('.cat-arrow');
                  if (arrow) {
                    arrow.style.opacity = '1';
                    arrow.style.transform = 'translateX(0)';
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = '#1a1a1a';
                  el.style.borderColor = '#222';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  const icon = el.querySelector<HTMLElement>('.cat-icon');
                  if (icon) {
                    icon.style.background = '#222';
                    icon.style.borderColor = '#333';
                    icon.style.color = '#888';
                  }
                  const arrow = el.querySelector<HTMLElement>('.cat-arrow');
                  if (arrow) {
                    arrow.style.opacity = '0';
                    arrow.style.transform = 'translateX(-6px)';
                  }
                }}
              >
                {/* Arrow */}
                <div className="cat-arrow" style={{
                  position: 'absolute', top: '24px', right: '20px',
                  width: '26px', height: '26px', background: '#2a2a2a',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid #333', opacity: 0,
                  transform: 'translateX(-6px)', transition: 'all 0.2s',
                }}>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="#ffc02a" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 7h8M8 4l3 3-3 3" />
                  </svg>
                </div>

                {/* Icon */}
                <div className="cat-icon" style={{
                  width: '52px', height: '52px', background: '#222',
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '18px', border: '1px solid #333',
                  transition: 'all 0.2s', color: '#888',
                }}>
                  <div style={{ width: '26px', height: '26px' }}>{cat.icon}</div>
                </div>

                <div style={{
                  fontSize: '16px', fontWeight: 700,
                  marginBottom: '6px', color: '#f0f0f0',
                }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: '12px', color: '#555' }}>{cat.count}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
