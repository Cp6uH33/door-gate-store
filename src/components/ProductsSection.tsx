"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
const WC_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const WC_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

type Product = {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
  short_description: string;
  categories: { id: number; slug: string; name: string }[];
};

type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

const filters = ['Svi', 'Interfoni', 'Motori za klizne kapije', 'Motori za krilne kapije', 'Smart home sistemi', 'Delovi za kapije'];
const filterMap: Record<string, string> = {
  'Interfoni': 'interfoni',
  'Motori za klizne kapije': 'motori-za-klizne-kapije',
  'Motori za krilne kapije': 'motori-za-krilne-kapije',
  'Smart home sistemi': 'smart-home-sistemi',
  'Delovi za kapije': 'delovi-za-kapije',
};

export default function ProductsSection() {
  const [active, setActive] = useState('Svi');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState<Record<number, boolean>>({});
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Učitaj kategorije
  useEffect(() => {
    fetch(`${WC_URL}/products/categories?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&per_page=100&hide_empty=true`)
      .then(res => res.json())
      .then(data => setCategories(data.filter((c: Category) => c.count > 0)))
      .catch(() => {});
  }, []);

  // Učitaj proizvode
  useEffect(() => {
    if (categories.length === 0 && active !== 'Svi') return;
    setLoading(true);

    let url = `${WC_URL}/products?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&per_page=6&status=publish&orderby=popularity`;

    if (active !== 'Svi') {
      const slug = filterMap[active];
      const cat = categories.find(c => c.slug === slug);
      if (cat) url += `&category=${cat.id}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [active, categories]);

  // Scroll animacija
  useEffect(() => {
    if (loading) return;
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
  }, [loading, active]);

  function handleAdd(product: Product) {
    addToCart({ id: product.id, name: product.name, price: parseFloat(product.price), quantity: 1 });
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1200);
  }

  return (
    <section id="products" style={{ padding: '60px 0 80px', background: '#ededeb' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }} ref={sectionRef}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', marginBottom: '32px' }}>
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px',
              textTransform: 'uppercase', color: '#0f0f0f',
              background: '#ffc02a', padding: '5px 12px', borderRadius: '100px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0f0f0f', display: 'inline-block' }} />
              Web Shop
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800,
              letterSpacing: '-1.5px', lineHeight: 1.1,
              color: '#0f0f0f', marginTop: '12px',
              fontFamily: "'Manrope', sans-serif",
            }}>
              Bestseler proizvodi
            </h2>
            <p style={{ fontSize: '15px', color: '#555', marginTop: '8px', maxWidth: '500px', fontFamily: "'Manrope', sans-serif" }}>
              Najprodavaniji artikli — provereni od strane naših klijenata.
            </p>
          </div>
          <Link
            href="/shop"
            style={{
              fontSize: '13px', fontWeight: 600, color: '#555',
              display: 'flex', alignItems: 'center', gap: '5px',
              whiteSpace: 'nowrap', textDecoration: 'none', transition: 'color 0.2s',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#0f0f0f')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
          >
            Svi proizvodi
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 7h8M8 4l3 3-3 3" />
            </svg>
          </Link>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                fontSize: '13px', padding: '7px 16px', borderRadius: '100px',
                cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: "'Space Grotesk', sans-serif",
                background: active === f ? '#ffc02a' : '#fff',
                color: active === f ? '#0e0f11' : '#666',
                border: active === f ? '1.5px solid #ffc02a' : '1.5px solid #ddd',
                fontWeight: active === f ? 600 : 400,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Skeleton */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                background: '#e0dfd8', borderRadius: '14px', height: '320px',
                border: '1px solid #d8d7d0', animation: 'pulse 1.5s ease infinite',
                animationDelay: `${i * 0.1}s`,
              }} />
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {products.map(product => (
              <div
                key={product.id}
                data-card
                style={{
                  background: '#fff', borderRadius: '14px', overflow: 'hidden',
                  border: '1.5px solid #e0dfd8', transition: 'all 0.25s', cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = '#ffc02a';
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)';
                  const wrap = el.querySelector<HTMLElement>('.prod-img-wrap');
                  if (wrap) wrap.style.background = '#fffbf0';
                  const quick = el.querySelector<HTMLElement>('.prod-quick');
                  if (quick) { quick.style.opacity = '1'; quick.style.transform = 'translateY(0)'; }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = '#e0dfd8';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  const wrap = el.querySelector<HTMLElement>('.prod-img-wrap');
                  if (wrap) wrap.style.background = '#f5f5f2';
                  const quick = el.querySelector<HTMLElement>('.prod-quick');
                  if (quick) { quick.style.opacity = '0'; quick.style.transform = 'translateY(6px)'; }
                }}
              >
                {/* Image */}
                <div className="prod-img-wrap" style={{
                  background: '#f5f5f2', height: '200px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', transition: 'background 0.2s', overflow: 'hidden',
                }}>
                  {product.images?.[0]?.src ? (
                    <Image
                      src={product.images[0].src}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'contain', padding: '16px' }}
                    />
                  ) : (
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#ccc" strokeWidth="1.5">
                      <rect x="8" y="8" width="48" height="48" rx="8" />
                      <circle cx="32" cy="32" r="12" />
                    </svg>
                  )}
                  <Link
                    href={`/proizvodi/${product.id}`}
                    className="prod-quick"
                    style={{
                      position: 'absolute', bottom: '12px', right: '12px',
                      background: '#ffc02a', color: '#0e0f11',
                      fontSize: '11px', fontWeight: 600,
                      padding: '7px 14px', borderRadius: '100px',
                      opacity: 0, transform: 'translateY(6px)', transition: 'all 0.2s',
                      textDecoration: 'none', display: 'inline-block',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Brzi pregled
                  </Link>
                </div>

                {/* Body */}
                <div style={{ padding: '16px 18px 18px' }}>
                  <div style={{
                    fontSize: '11px', color: '#999', textTransform: 'uppercase',
                    letterSpacing: '0.8px', fontWeight: 500, marginBottom: '6px',
                    fontFamily: "'Manrope', sans-serif",
                  }}>
                    {product.categories?.[0]?.name ?? ''}
                  </div>
                  <div style={{
                    fontSize: '15px', fontWeight: 700, marginBottom: '6px',
                    lineHeight: 1.3, color: '#0f0f0f',
                    fontFamily: "'Manrope', sans-serif",
                  }}>
                    {product.name}
                  </div>
                  <div style={{
                    fontSize: '13px', color: '#888', lineHeight: 1.5, marginBottom: '14px',
                    overflow: 'hidden', display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                    fontFamily: "'Manrope', sans-serif",
                  }}
                    dangerouslySetInnerHTML={{ __html: product.short_description ?? '' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontSize: '20px', fontWeight: 800, color: '#0f0f0f',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                      {parseFloat(product.price).toLocaleString('sr-RS')}
                      <span style={{ fontSize: '12px', color: '#999', marginLeft: '3px', fontWeight: 400 }}>RSD</span>
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAdd(product); }}
                      style={{
                        width: '38px', height: '38px', borderRadius: '50%',
                        background: added[product.id] ? '#ffc02a' : '#0f0f0f',
                        color: added[product.id] ? '#0e0f11' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: 'none', cursor: 'pointer', fontSize: '18px',
                        transition: 'all 0.2s',
                      }}
                    >
                      {added[product.id] ? '✓' : '+'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
}