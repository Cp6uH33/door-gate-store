"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
const WC_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const WC_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

const stats = [
  { num: '500', suffix: '+', label: 'Instalacija' },
  { num: '48',  suffix: 'h', label: 'Montaža' },
  { num: '5',   suffix: '★', label: 'Ocena usluge' },
];

type FeaturedProduct = {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
  categories: { name: string }[];
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [featured, setFeatured] = useState<FeaturedProduct | null>(null);

  useEffect(() => {
    fetch(`${WC_URL}/products?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&featured=true&per_page=1`)
      .then(res => res.json())
      .then(data => { if (data?.length > 0) setFeatured(data[0]); })
      .catch(() => {});
  }, []);

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
    <>
      <section id="hero" style={{
        position: 'relative', paddingTop: '20px',
        overflow: 'hidden', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        backgroundImage: 'url(/hero2.png)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.35) 100%)',
        }} />

        <div ref={heroRef} style={{
          position: 'relative', zIndex: 10,
          maxWidth: '1152px', margin: '0 auto', padding: '0 20px',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '40px', alignItems: 'center', width: '100%',
        }} className="hero-grid">

          {/* LEFT */}
          <div style={{ paddingBottom: '60px', paddingTop: '60px' }}>
            <div data-animate style={{ marginBottom: '20px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '11px', fontWeight: 500, letterSpacing: '0.8px',
                textTransform: 'uppercase', color: '#ffc02a',
                background: 'rgba(255,192,42,0.15)', padding: '5px 12px', borderRadius: '100px',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffc02a', display: 'inline-block' }} />
                Profesionalna automatizacija
              </span>
            </div>

            <h1 data-animate style={{
              fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800,
              lineHeight: 1.05, letterSpacing: '-2px',
              color: '#ffffff', marginBottom: '20px',
              fontFamily: "'Manrope', sans-serif",
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
              fontFamily: "'Manrope', sans-serif",
            }}>
              Motori za kapije, video interfoni i pametni sistemi za kontrolu pristupa.
              Prodaja i dostava širom Srbije.
            </p>

            <div data-animate style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/shop" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#ffc02a', color: '#0e0f11',
                fontWeight: 700, fontSize: '15px',
                fontFamily: "'Space Grotesk', sans-serif",
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
                fontFamily: "'Space Grotesk', sans-serif",
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
                  <div style={{
                    fontSize: '28px', fontWeight: 800, color: '#ffffff',
                    letterSpacing: '-1px', fontFamily: "'Manrope', sans-serif",
                  }}>
                    {s.num}<span style={{ color: '#ffc02a' }}>{s.suffix}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#ffc02a', marginTop: '2px', fontFamily: "'Manrope', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — featured product */}
          <div data-animate style={{ position: 'relative', alignSelf: 'end' }} className="hero-product">
            <Link href={featured ? `/proizvodi/${featured.id}` : '/shop'} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(26,26,26,0.85)',
                backdropFilter: 'blur(16px)',
                borderRadius: '32px 32px 0 0',
                padding: '32px 32px 0',
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 0 60px rgba(0,0,0,0.4)',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,192,42,0.3)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)')}
              >
                <span style={{
                  position: 'absolute', top: '20px', right: '20px',
                  background: '#ffc02a', color: '#0e0f11',
                  fontSize: '10px', fontWeight: 700,
                  padding: '5px 12px', borderRadius: '100px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '0.5px', textTransform: 'uppercase', zIndex: 2,
                }}>
                  Bestseler
                </span>

                {featured?.categories?.[0] && (
                  <span style={{
                    position: 'absolute', top: '20px', left: '20px',
                    background: 'rgba(255,255,255,0.1)', color: '#ffc02a',
                    fontSize: '10px', fontWeight: 500,
                    padding: '5px 12px', borderRadius: '100px',
                    border: '1px solid #ffc02a',
                    fontFamily: "'Manrope', sans-serif",
                    backdropFilter: 'blur(4px)', zIndex: 2,
                  }}>
                    {featured.categories[0].name}
                  </span>
                )}

                <div style={{
                  width: '100%', height: '320px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', marginTop: '40px',
                }}>
                  {featured?.images?.[0]?.src ? (
                    <Image
                      src={featured.images[0].src}
                      alt={featured.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'contain', padding: '24px' }}
                    />
                  ) : (
                    <div style={{ color: '#444', fontSize: '48px' }}>📦</div>
                  )}
                </div>

                <div style={{
                  background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px', padding: '14px 18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  margin: '0 0 24px 0',
                }}>
                  <div>
                    <div style={{
                      fontSize: '13px', fontWeight: 600, color: '#f0f0f0',
                      marginBottom: '4px', fontFamily: "'Manrope', sans-serif",
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      maxWidth: '200px',
                    }}>
                      {featured?.name ?? 'Učitavam...'}
                    </div>
                    <div style={{
                      fontSize: '20px', fontWeight: 800, color: '#ffc02a',
                      fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.5px',
                    }}>
                      {featured?.price ? `${parseFloat(featured.price).toLocaleString('sr-RS')} RSD` : ''}
                    </div>
                  </div>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#ffc02a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0e0f11" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding-bottom: 0 !important;
          }
          .hero-product {
            display: block !important;
          }
          .hero-product > a > div {
            border-radius: 20px 20px 0 0 !important;
            padding: 28px 20px 0 !important;
          }
          .hero-product > a > div > div:first-of-type {
            height: 220px !important;
            margin-top: 36px !important;
          }
        }
      `}</style>
    </>
  );
}
