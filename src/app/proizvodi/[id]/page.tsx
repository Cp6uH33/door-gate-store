"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
const WC_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const WC_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    fetch(`${WC_URL}/products/${id}?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`)
      .then(res => res.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => { setLoading(false); router.push('/shop'); });
  }, [id, router]);

  function handleAdd() {
    addToCart({ id: product.id, name: product.name, price: parseFloat(product.price), images: product.images || [], short_description: product.short_description || '', quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '3px solid #222', borderTopColor: '#ffc02a', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <div style={{ color: '#555', fontSize: '14px', fontFamily: "'Manrope', sans-serif" }}>Učitavam proizvod...</div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!product || !product.id) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
        <h1 style={{ color: '#888', fontWeight: 700, fontSize: '22px', marginBottom: '24px', fontFamily: "'Manrope', sans-serif" }}>Proizvod nije pronađen</h1>
        <Link href="/shop" style={{ background: '#ffc02a', color: '#0e0f11', padding: '12px 28px', borderRadius: '100px', fontWeight: 600, textDecoration: 'none', fontSize: '14px', fontFamily: "'Space Grotesk', sans-serif" }}>
          ← Vrati se na shop
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ background: '#0f0f0f', color: '#ededeb', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '100px 20px 80px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '13px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
            >Početna</Link>
            <span style={{ color: '#333', fontSize: '13px' }}>/</span>
            <Link href="/shop" style={{ color: '#555', textDecoration: 'none', fontSize: '13px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
            >Shop</Link>
            <span style={{ color: '#333', fontSize: '13px' }}>/</span>
            <span style={{ color: '#888', fontSize: '13px', fontFamily: "'Manrope', sans-serif" }}>{product.name}</span>
          </div>

          <div className="product-grid">

            {/* LEVO — slike */}
            <div>
              <div style={{ width: '100%', aspectRatio: '1', borderRadius: '20px', overflow: 'hidden', background: '#1a1a1a', border: '1px solid #222', position: 'relative' }}>
                {product.images?.[activeImg]?.src ? (
                  <Image src={product.images[activeImg].src} alt={product.name} fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'contain', padding: '24px' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="8" y="8" width="48" height="48" rx="8" /><circle cx="32" cy="32" r="12" />
                    </svg>
                  </div>
                )}
              </div>

              {product.images?.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {product.images.slice(0, 5).map((img: any, i: number) => (
                    <div key={i} onClick={() => setActiveImg(i)} style={{
                      width: '64px', height: '64px', borderRadius: '10px',
                      overflow: 'hidden', background: '#1a1a1a',
                      border: `1.5px solid ${activeImg === i ? '#ffc02a' : '#222'}`,
                      cursor: 'pointer', transition: 'border-color 0.2s',
                      position: 'relative', flexShrink: 0,
                    }}>
                      <Image src={img.src} alt="" fill sizes="64px" style={{ objectFit: 'contain', padding: '6px' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DESNO — detalji */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {product.categories?.[0] && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px',
                  textTransform: 'uppercase', color: '#0f0f0f',
                  background: '#ffc02a', padding: '5px 12px',
                  borderRadius: '100px', alignSelf: 'flex-start',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0f0f0f', display: 'inline-block' }} />
                  {product.categories[0].name}
                </span>
              )}

              <h1 style={{ color: '#ededeb', fontWeight: 800, fontSize: 'clamp(20px, 3vw, 34px)', lineHeight: 1.2, margin: 0, letterSpacing: '-0.5px', fontFamily: "'Manrope', sans-serif" }}>
                {product.name}
              </h1>

              {/* Cena + telefoni */}
              <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '14px', border: '1px solid #222' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#ededeb', marginBottom: '4px', fontFamily: "'Manrope', sans-serif" }}>Cena</div>
                    <div style={{ color: '#ffc02a', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-1px' }}>
                      {parseFloat(product.price).toLocaleString('sr-RS')}
                      <span style={{ fontSize: '16px', color: '#ededeb', marginLeft: '6px', fontWeight: 500 }}>RSD</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { number: '+381631183898', display: '+381 63 118 3898' },
                      { number: '+381691200104', display: '+381 69 120 0104' },
                    ].map(phone => (
                      <a key={phone.number} href={'tel:' + phone.number} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        textDecoration: 'none', color: '#ffc02a',
                        fontSize: '13px', fontWeight: 700,
                        fontFamily: "'Space Grotesk', sans-serif", transition: 'color 0.2s',
                      }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffcc4a')}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                      >
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,192,42,0.12)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#ffc02a" strokeWidth="1.8" strokeLinecap="round">
                            <path d="M2 3a1 1 0 011-1h2l1 3-1.5 1.5a9 9 0 004 4L10 9l3 1v2a1 1 0 01-1 1C5 13 1 9 1 4a1 1 0 011-1z" />
                          </svg>
                        </div>
                        {phone.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {product.short_description && (
                <div style={{ color: '#ededeb', fontSize: '15px', lineHeight: 1.7, fontFamily: "'Manrope', sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: product.short_description }} />
              )}

              {/* Dugmad */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={handleAdd} style={{
                  flex: 1, minWidth: '140px',
                  background: added ? '#22c55e' : '#ffc02a',
                  color: added ? '#fff' : '#0e0f11',
                  border: 'none', padding: '15px 24px',
                  borderRadius: '100px', fontWeight: 700,
                  fontSize: '15px', cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                  onMouseEnter={e => { if (!added) (e.currentTarget as HTMLElement).style.background = '#ffcc4a'; }}
                  onMouseLeave={e => { if (!added) (e.currentTarget as HTMLElement).style.background = '#ffc02a'; }}
                >
                  {added ? '✓ Dodato!' : '+ Dodaj u korpu'}
                </button>
                <Link href="/kontakt" style={{
                  flex: 1, minWidth: '140px',
                  background: 'transparent', color: '#ededeb',
                  border: '1.5px solid #333', padding: '15px 24px',
                  borderRadius: '100px', fontWeight: 600, fontSize: '15px',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.2s', fontFamily: "'Space Grotesk', sans-serif",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#ffc02a'; el.style.color = '#ffc02a'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#333'; el.style.color = '#ededeb'; }}
                >
                  Konsultacija
                </Link>
              </div>

              {/* Info lista */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid #1a1a1a' }}>
                {['Dostava na celoj teritoriji Republike Srbije', 'Plaćanje pouzećem ili bankovnim transferom', 'Montaža garažnih vrata samo na teritoriji opštine grada Subotica'].map(text => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#ededeb', fontFamily: "'Manrope', sans-serif" }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,192,42,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#ffc02a" strokeWidth="2" strokeLinecap="round">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                      </svg>
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              {/* Puni opis */}
              {product.description && (
                <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: '14px', padding: '24px', marginTop: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#666', marginBottom: '16px', fontFamily: "'Space Grotesk', sans-serif" }}>
                    Opis proizvoda
                  </div>
                  <div style={{ color: '#aaa', fontSize: '14px', lineHeight: 1.8, fontFamily: "'Manrope', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
