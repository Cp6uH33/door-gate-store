"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getCategoryIcon } from '@/lib/categoryIcons';

const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

type WCCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
  image: { src: string; alt: string } | null;
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<WCCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${WC_URL}/products/categories?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&per_page=100&hide_empty=true`)
      .then(res => res.json())
      .then((data: WCCategory[]) => {
        setCategories(data.filter(c => c.count > 0));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
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
  }, [loading]);

  return (
    <>
      <section id="categories" style={{ padding: '80px 0 60px', background: '#1a1a1a' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px' }} ref={sectionRef}>

          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
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
              fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800,
              letterSpacing: '-1.5px', lineHeight: 1.1,
              color: '#f0f0f0', marginTop: '12px', marginBottom: '8px',
              fontFamily: "'Manrope', sans-serif",
            }}>
              Kategorije
            </h2>
            <p style={{ fontSize: '15px', color: '#888', maxWidth: '500px', fontFamily: "'Manrope', sans-serif" }}>
              Sve što vam je potrebno za automatizaciju ulaza i kapija na jednom mestu.
            </p>
          </div>

          {/* Skeleton */}
          {loading && (
            <div className="cat-grid">
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                  background: '#2a2a2a', borderRadius: '20px', height: '160px',
                  animation: 'pulse 1.5s ease infinite',
                  animationDelay: `${i * 0.1}s`,
                }} />
              ))}
            </div>
          )}

          {/* Grid */}
          {!loading && (
            <div className="cat-grid">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/shop?cat=${cat.slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    data-card
                    style={{
                      background: '#1a1a1a', borderRadius: '20px',
                      padding: '24px 20px', cursor: 'pointer',
                      position: 'relative', overflow: 'hidden',
                      border: '1.5px solid #222',
                      transition: 'all 0.25s', height: '100%',
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
                      if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translateX(0)'; }
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
                        icon.style.borderColor = '#2a2a2a';
                        icon.style.color = '#888';
                      }
                      const arrow = el.querySelector<HTMLElement>('.cat-arrow');
                      if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translateX(-6px)'; }
                    }}
                  >
                    <div className="cat-arrow" style={{
                      position: 'absolute', top: '16px', right: '16px',
                      width: '26px', height: '26px', background: '#2a2a2a',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid #333', opacity: 0,
                      transform: 'translateX(-6px)', transition: 'all 0.2s',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#ffc02a" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M3 7h8M8 4l3 3-3 3" />
                      </svg>
                    </div>

                    <div className="cat-icon" style={{
                      width: '52px', height: '52px', background: '#222',
                      borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '16px', border: '1px solid #2a2a2a',
                      transition: 'all 0.2s', color: '#888',
                    }}>
                      <div style={{ width: '28px', height: '28px' }}>
                        {getCategoryIcon(cat.slug)}
                      </div>
                    </div>

                    <div style={{
                      fontSize: '15px', fontWeight: 700,
                      marginBottom: '6px', color: '#f0f0f0', lineHeight: 1.3,
                      fontFamily: "'Manrope', sans-serif",
                    }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#ededeb', fontFamily: "'Manrope', sans-serif" }}>
                      {cat.count} {cat.count === 1 ? 'proizvod' : 'proizvoda'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .cat-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
}
