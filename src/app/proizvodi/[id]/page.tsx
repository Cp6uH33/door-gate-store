"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';


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
    fetch(`/api/wc/products/${id}`)
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

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Početna",
        "item": "https://doorgatesistem.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shop",
        "item": "https://doorgatesistem.com/shop"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://doorgatesistem.com/proizvodi/${product.id}`
      }
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.short_description?.replace(/<[^>]*>/g, '') || product.name,
    "image": product.images?.[0]?.src || '',
    "brand": {
      "@type": "Brand",
      "name": "Door & Gate Sistem"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://doorgatesistem.com/proizvodi/${product.id}`,
      "priceCurrency": "RSD",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Door & Gate Sistem"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
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

            {/* GORNJI DEO desne kolone — kategorija + naziv (na mobilnom dolazi prvo) */}
            <div className="product-right-top">
              {product.categories?.[0] && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '11px', fontWeight: 500, letterSpacing: '0.8px',
                  textTransform: 'uppercase', color: '#ffc02a',
                  background: 'rgba(255,192,42,0.15)', padding: '5px 12px',
                  borderRadius: '100px', alignSelf: 'flex-start',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffc02a', display: 'inline-block' }} />
                  {product.categories[0].name}
                </span>
              )}
              <h1 style={{ color: '#ededeb', fontWeight: 800, fontSize: 'clamp(20px, 3vw, 34px)', lineHeight: 1.2, margin: '12px 0 0', letterSpacing: '-0.5px', fontFamily: "'Manrope', sans-serif" }}>
                {product.name}
              </h1>
            </div>

            {/* LEVO — slike */}
            <div className="product-images">
              {/* Glavna slika sa strelicama */}
              <div style={{ width: '100%', height: '480px', borderRadius: '20px', overflow: 'hidden', background: '#f5f6f1', border: '1px solid #e8e8e4', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {product.images?.[activeImg]?.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.images[activeImg].src} alt={product.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%', objectFit: 'contain', padding: '24px', display: 'block' }} />
                ) : (
                  <div style={{ color: '#333' }}>
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="8" y="8" width="48" height="48" rx="8" /><circle cx="32" cy="32" r="12" />
                    </svg>
                  </div>
                )}

                {/* Strelice */}
                {product.images?.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg(i => (i - 1 + product.images.length) % product.images.length)}
                      style={{
                        position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.55)', border: '1px solid #333',
                        borderRadius: '50%', width: '36px', height: '36px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#ededeb', transition: 'background 0.2s',
                        zIndex: 2,
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,192,42,0.25)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.55)')}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 2L4 7l5 5" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setActiveImg(i => (i + 1) % product.images.length)}
                      style={{
                        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.55)', border: '1px solid #333',
                        borderRadius: '50%', width: '36px', height: '36px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#ededeb', transition: 'background 0.2s',
                        zIndex: 2,
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,192,42,0.25)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.55)')}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 2l5 5-5 5" />
                      </svg>
                    </button>

                    {/* Brojac slika */}
                    <div style={{
                      position: 'absolute', bottom: '12px', right: '14px',
                      background: 'rgba(0,0,0,0.6)', borderRadius: '100px',
                      padding: '3px 10px', fontSize: '11px', color: '#aaa',
                      fontFamily: "'Space Grotesk', sans-serif", zIndex: 2,
                    }}>
                      {activeImg + 1} / {product.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails — scrollable */}
              {product.images?.length > 1 && (
                <div style={{
                  display: 'flex', gap: '8px', marginTop: '12px',
                  overflowX: 'auto', paddingBottom: '4px',
                }}>
                  {product.images.map((img: any, i: number) => (
                    <div key={i} onClick={() => setActiveImg(i)} style={{
                      width: '68px', height: '68px', borderRadius: '10px',
                      overflow: 'hidden', background: '#f5f6f1',
                      border: `1.5px solid ${activeImg === i ? '#ffc02a' : '#222'}`,
                      cursor: 'pointer', transition: 'border-color 0.2s',
                      position: 'relative', flexShrink: 0,
                      opacity: activeImg === i ? 1 : 0.6,
                    }}
                      onMouseEnter={e => { if (activeImg !== i) (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                      onMouseLeave={e => { if (activeImg !== i) (e.currentTarget as HTMLElement).style.opacity = '0.6'; }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.src} alt={`${product.name} - slika ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DESNO — detalji (bez kategorije i naziva koji su u product-right-top) */}
            <div className="product-right-bottom" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Cena + telefoni */}
              <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '14px', border: '1px solid #222' }}>
                <div className="price-phones">
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
                <div className="product-description" style={{ color: '#ededeb', fontSize: '15px', lineHeight: 1.7, fontFamily: "'Manrope', sans-serif", overflowX: 'hidden', wordBreak: 'break-word', overflowWrap: 'break-word' }}
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
                  <div className="product-description" style={{ color: '#aaa', fontSize: '14px', lineHeight: 1.8, fontFamily: "'Manrope', sans-serif", overflowX: 'hidden', wordBreak: 'break-word', overflowWrap: 'break-word' }}
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
          grid-template-rows: auto 1fr;
          column-gap: 64px;
          row-gap: 24px;
          align-items: start;
        }
        .product-main-image {
          width: 100%;
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
          background: #1a1a1a;
          border: 1px solid #222;
          position: relative;
        }
        .product-right-top {
          grid-column: 2;
          grid-row: 1;
          display: flex;
          flex-direction: column;
        }
        .product-images {
          grid-column: 1;
          grid-row: 1 / 3;
        }
        .product-right-bottom {
          grid-column: 2;
          grid-row: 2;
        }
        @media (max-width: 768px) {
          .product-grid {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .product-right-top { order: 1; }
          .product-images    { order: 2; }
          .product-right-bottom { order: 3; }
          .product-main-image { height: 320px; }
        }
        .price-phones {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .product-right-bottom img,
          .product-right-bottom table,
          .product-right-bottom iframe,
          .product-right-bottom pre {
            max-width: 100% !important;
            width: auto !important;
            height: auto !important;
          }
          .price-phones {
            flex-direction: column;
            gap: 12px;
          }
          .product-right-bottom {
            width: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
          }
          .product-right-bottom > * {
            max-width: 100%;
            box-sizing: border-box;
          }
          .product-right-bottom * {
            word-break: break-word;
            overflow-wrap: break-word;
          }
        }
        .product-description * {
          font-family: 'Manrope', sans-serif !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        .product-description p,
        .product-description span,
        .product-description div,
        .product-description li {
          white-space: normal !important;
          word-break: break-word !important;
          overflow-wrap: break-word !important;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
