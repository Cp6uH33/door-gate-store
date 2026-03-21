"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

type Product = {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  price: string;
  priceNum: number;
  desc: string;
  badge?: { label: string; type: 'new' | 'hot' | 'rfid' };
};

const products: Product[] = [
  { id: 1, name: 'Color video interfon 7"', category: 'Video interfoni', categorySlug: 'interfoni', price: '16.700', priceNum: 16700, desc: 'Monitor u boji, noćni vid, otključavanje bez ključa', badge: { label: 'Bestseler', type: 'hot' } },
  { id: 2, name: 'Metalni RFID čitač', category: 'RFID sistemi', categorySlug: 'rfid', price: '8.400', priceNum: 8400, desc: 'Antivandal kućište, silikon tastatura, kartice + kodovi', badge: { label: 'RFID', type: 'rfid' } },
  { id: 3, name: 'Motor za klizne kapije', category: 'Motori za kapije', categorySlug: 'motori', price: '24.900', priceNum: 24900, desc: 'Do 500kg, tihi rad, daljinsko upravljanje uključeno', badge: { label: 'Novo', type: 'new' } },
  { id: 4, name: 'Smart Wi-Fi interfon 7"', category: 'Smart Home', categorySlug: 'smart', price: '32.400', priceNum: 32400, desc: 'App kontrola, alarmni sistem, daljinski nadzor 24/7' },
  { id: 5, name: 'Elektromagnet brava', category: 'Brave i cilindri', categorySlug: 'brave', price: '7.400', priceNum: 7400, desc: 'Za vrata i kapije, sila držanja 280kg, fail-safe' },
  { id: 6, name: 'Motor za krilne kapije', category: 'Motori za kapije', categorySlug: 'motori', price: '18.900', priceNum: 18900, desc: 'Hidraulični, do 3m krilo, automatsko zatvaranje' },
];

const filters = ['Svi', 'Interfoni', 'Motori', 'RFID', 'Smart Home', 'Brave'];
const filterMap: Record<string, string> = {
  'Interfoni': 'interfoni', 'Motori': 'motori',
  'RFID': 'rfid', 'Smart Home': 'smart', 'Brave': 'brave',
};

const badgeStyles: Record<string, React.CSSProperties> = {
  new:  { background: '#1a1a1a', color: '#f0f0f0', border: '1px solid #333' },
  hot:  { background: '#ffc02a', color: '#0e0f11' },
  rfid: { background: 'rgba(255,192,42,0.15)', color: '#ffc02a' },
};

export default function ProductsSection() {
  const [active, setActive] = useState('Svi');
  const [added, setAdded] = useState<Record<number, boolean>>({});
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);

  const visible = active === 'Svi'
    ? products
    : products.filter(p => p.categorySlug === filterMap[active]);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('[data-card]');
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
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
      card.dataset.delay = String(i * 70);
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, [active]);

  function handleAdd(product: Product) {
    addToCart({ id: product.id, name: product.name, price: product.priceNum, quantity: 1 });
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1200);
  }

  return (
    <section id="products" style={{ padding: '80px 0', background: '#636363' }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }} ref={sectionRef}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', marginBottom: '48px' }}>
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '11px', fontWeight: 500, letterSpacing: '0.8px',
              textTransform: 'uppercase', color: '#ffc02a',
              background: 'rgba(255,192,42,0.15)', padding: '5px 12px',
              borderRadius: '100px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffc02a', display: 'inline-block' }} />
              Web Shop
            </span>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#f0f0f0', marginTop: '12px' }}>
              Bestseler proizvodi
            </h2>
            <p style={{ fontSize: '15px', color: '#999', marginTop: '8px', maxWidth: '500px' }}>
              Najprodavaniji artikli — provereni od strane naših klijenata.
            </p>
          </div>
          <Link
            href="/shop"
            style={{ fontSize: '13px', fontWeight: 500, color: '#999', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#f0f0f0')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#999')}
          >
            Svi proizvodi
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 7h8M8 4l3 3-3 3" />
            </svg>
          </Link>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                fontSize: '13px', padding: '7px 16px', borderRadius: '100px', cursor: 'pointer',
                transition: 'all 0.2s', fontFamily: "'Inter', sans-serif",
                background: active === f ? '#ffc02a' : 'transparent',
                color: active === f ? '#0e0f11' : '#999',
                border: active === f ? '1.5px solid #ffc02a' : '1.5px solid #333',
                fontWeight: active === f ? 600 : 400,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {visible.map(product => (
            <div
              key={product.id}
              data-card
              style={{
                background: '#222', borderRadius: '14px', overflow: 'hidden',
                border: '1px solid #333', transition: 'all 0.25s', cursor: 'pointer',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = '#ffc02a';
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 8px 32px rgba(255,192,42,0.12)';
                const wrap = el.querySelector<HTMLElement>('.prod-img-wrap');
                if (wrap) wrap.style.background = 'rgba(255,192,42,0.06)';
                const quick = el.querySelector<HTMLElement>('.prod-quick');
                if (quick) { quick.style.opacity = '1'; quick.style.transform = 'translateY(0)'; }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = '#333';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
                const wrap = el.querySelector<HTMLElement>('.prod-img-wrap');
                if (wrap) wrap.style.background = '#1a1a1a';
                const quick = el.querySelector<HTMLElement>('.prod-quick');
                if (quick) { quick.style.opacity = '0'; quick.style.transform = 'translateY(6px)'; }
              }}
            >
              {/* Image area */}
              <div
                className="prod-img-wrap"
                style={{
                  background: '#1a1a1a', height: '180px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', transition: 'background 0.2s',
                }}
              >
                {product.badge && (
                  <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    fontSize: '10px', fontWeight: 600,
                    padding: '4px 10px', borderRadius: '100px',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                    ...badgeStyles[product.badge.type],
                  }}>
                    {product.badge.label}
                  </span>
                )}
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect x="10" y="5" width="60" height="70" rx="8" fill="none" stroke="#444" strokeWidth="1.5" />
                  <rect x="18" y="14" width="32" height="22" rx="4" fill="#2a2a2a" />
                  <circle cx="56" cy="28" r="6" fill="none" stroke="#ffc02a" strokeWidth="1.5" />
                  <rect x="18" y="46" width="44" height="20" rx="3" fill="#2a2a2a" />
                </svg>
                <button
                  className="prod-quick"
                  style={{
                    position: 'absolute', bottom: '12px', right: '12px',
                    background: '#222', color: '#f0f0f0', fontSize: '11px', fontWeight: 500,
                    padding: '7px 14px', borderRadius: '100px', border: '1px solid #444',
                    opacity: 0, transform: 'translateY(6px)', transition: 'all 0.2s',
                    cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Brzi pregled
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '18px 20px 20px' }}>
                <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 500, marginBottom: '6px' }}>
                  {product.category}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 700, marginBottom: '6px', lineHeight: 1.3, color: '#f0f0f0' }}>
                  {product.name}
                </div>
                <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.5, marginBottom: '16px' }}>
                  {product.desc}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 800, color: '#f0f0f0' }}>
                    {product.price}
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#666', marginLeft: '3px' }}>RSD</span>
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAdd(product); }}
                    style={{
                      width: '38px', height: '38px', borderRadius: '50%',
                      background: added[product.id] ? '#ffc02a' : '#333',
                      color: added[product.id] ? '#0e0f11' : '#f0f0f0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: 'none', cursor: 'pointer', fontSize: '20px', lineHeight: 1,
                      transition: 'all 0.2s', fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {added[product.id] ? '✓' : '+'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
