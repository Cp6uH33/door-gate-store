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
    const header = document.querySelector('header') as HTMLElement;
    if (!header) return;

    // Postavi dark glass
    header.style.background = 'rgba(14, 15, 17, 0.82)';
    header.style.backdropFilter = 'blur(20px)';
    (header.style as any).WebkitBackdropFilter = 'blur(20px)';
    header.style.borderBottom = '1px solid rgba(255,255,255,0.08)';

    // Meni linkovi – belo
    const links = header.querySelectorAll<HTMLElement>('nav a');
    links.forEach(link => { link.style.color = '#ededeb'; });

    // ← NOVO: blokiraj scroll promenu boje
    const lockHeaderOnScroll = () => {
      header.style.background = 'rgba(14, 15, 17, 0.82)';
      header.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    };
    window.addEventListener('scroll', lockHeaderOnScroll);

    // CLEANUP
    return () => {
      window.removeEventListener('scroll', lockHeaderOnScroll);
      header.style.background = '';
      header.style.backdropFilter = '';
      (header.style as any).WebkitBackdropFilter = 'blur(20px)';
      header.style.borderBottom = '';
      links.forEach(link => { link.style.color = ''; });
    };
  }, []);
  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_WC_URL}/products/${id}?consumer_key=${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}`)
      .then(res => res.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => { setLoading(false); router.push('/proizvodi'); });
  }, [id, router]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // LOADING
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-#ffc02a border-t-transparent rounded-full animate-spin" />
        <p className="text-#0f0f0f font-bold">Učitavam proizvod...</p>
      </div>
    </div>
  );

  // NOT FOUND
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-6">
        <p className="text-6xl">😕</p>
        <h1 className="text-3xl font-bold text-var(--ink)">Proizvod nije pronađen</h1>
        <Link href="/proizvodi" className="btn-primary">
          ← Vrati se na proizvode
        </Link>
      </div>
    </div>
  );

  const images = product.images || [];

  return (
    <div className="min-h-screen text-var(--ink)" style={{ background: '#1a1a1a' }}>
      <div className="container section mx-auto" style={{ paddingTop: '120px' }}>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-10" style={{ color: '#888', paddingLeft: '30px' }}>
          <Link href="/" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffc02a')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}
          >
            Početna
          </Link>
          <span style={{ color: '#555' }}>/</span>
          <Link href="/proizvodi" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffc02a')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}
          >
            Proizvodi
          </Link>
          <span style={{ color: '#555' }}>/</span>
          <span style={{ color: '#ededeb', fontWeight: 500 }} className="truncate max-w-200px">
            {product.name}
          </span>
        </nav>

        {/* Glavni grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEVO – Slika */}
          <div className="space-y-4" style={{ paddingTop: '20%' }}>
            {/* Glavna slika – smanjena 50% */}
            <div className="card overflow-hidden flex items-center justify-center p-4"
              style={{ height: '320px', maxWidth: '320px', margin: '0 auto' }}>
              <img
                src={images[activeImg]?.src || '/placeholder.jpg'}
                alt={product.name}
                style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Thumbnails – PREMESTI OVDE unutar iste div */}
            {images.length > 1 && (
              <div className="flex gap-3 flex-wrap" style={{ maxWidth: '400px', margin: '0 auto' }}>
                {images.slice(0, 5).map((img: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: `2px solid ${activeImg === i ? '#ffc02a' : '#eeeef0'}`,
                      boxShadow: activeImg === i ? '0 0 0 3px rgba(255,192,42,0.3)' : 'none',
                      cursor: 'pointer',
                      flexShrink: 0,
                      background: 'white',
                      padding: 0
                    }}
                  >
                    <img
                      src={img.src}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* DESNO – Detalji */}
          <div className="flex flex-col gap-10" style={{ maxWidth: '70%', width: '100%' }}>

            {/* Tag + Naziv */}
            <div className="space-y-2">
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.8px',
                textTransform: 'uppercase' as const,
                color: '#ffc02a',
                background: 'rgba(255,192,42,0.15)',
                padding: '5px 12px',
                borderRadius: '100px',
                marginBottom: '20px',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#ffc02a',
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
                Proizvod
              </span>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.15, letterSpacing: '-1px', color: '#ededeb' }}>
                {product.name}
              </h1>
            </div>

            {/* Cena */}
            <div className="flex flex-wrap items-center gap-2">
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '28px', color: '#ededeb', letterSpacing: '-1px' }}>
                {parseFloat(product.price).toLocaleString('sr-RS')}
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#ededeb', marginLeft: '6px' }}>RSD</span>
              </span>
              {/* <span style={{
                background: 'rgba(34,197,94,0.1)',
                color: '#16a34a',
                border: '1px solid rgba(34,197,94,0.3)',
                padding: '3px 10px',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const
              }}>
                ✓ Na lageru
              </span>*/}
            </div>

            {/* Kratak opis */}
            {product.short_description && (
              <div
                className="leading-relaxed" style={{ color: '#ededeb', fontSize: '13px' }}
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--ink-10)' }} />

            {/* CTA Dugmad */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleAddToCart}
                style={{
                  background: added ? '#16a34a' : 'var(--brand)',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  color: added ? '#fff' : 'var(--ink)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                }}
              >
                {added ? '✅ Dodato u korpu!' : '🛒 Dodaj u korpu'}
              </button>
              <Link
                href="/kontakt"
                style={{
                  borderRadius: '10px',
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: '1px solid #ffc02a',
                  color: '#ffc02a',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                Kontakt
              </Link>
            </div>

            {/* Benefiti */}
            <div style={{ background: 'var(--ink-05)', borderRadius: '12px', padding: '14px 16px' }} className="space-y-2">
              {[
                { text: 'Isporuka na celoj teriroriji Republike Srbije' },
                { text: 'Plaćanje pouzećem ili bankovnim transferom' },
                /* { icon: '🔧', text: 'Profesionalna montaža u roku od 48h' },*/
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2" style={{ fontSize: '15px', color: '#0f0f0f' }}>
                  {/* <span>{b.icon}</span>*/}
                  <span>{b.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}