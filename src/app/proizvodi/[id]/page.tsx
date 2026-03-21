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
  const router = useRouter();

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

  if (loading) return (
    <div style={{ background: '#0f0f0f' }} className="min-h-screen flex items-center justify-center">
      <div style={{ color: '#e87c2a' }} className="text-3xl font-bold animate-pulse">Učitavam...</div>
    </div>
  );

  if (!product) return (
    <div style={{ background: '#0f0f0f' }} className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 style={{ color: '#888' }} className="text-5xl font-black mb-8">Proizvod nije pronađen</h1>
        <Link href="/proizvodi" style={{ background: '#e87c2a', color: '#fff' }} className="px-10 py-4 rounded-xl font-bold text-xl">
          ← Vrati se
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0f0f0f', color: '#f0f0f0' }} className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Nazad */}
        <Link href="/proizvodi" style={{ color: '#e87c2a', textDecoration: 'none', fontWeight: 600, fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
          ← Nazad na proizvode
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

          {/* SLIKA – smanjena 50% */}
          <div>
            <div style={{ width: '100%', maxWidth: '420px', height: '320px', borderRadius: '16px', overflow: 'hidden', background: '#1a1a1a', border: '1px solid #2a2a2a', margin: '0 auto' }}>
              <img
                src={product.images?.[0]?.src || 'https://via.placeholder.com/420x320/1a1a1a/666?text=Proizvod'}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Thumbnail slike */}
            {product.images?.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'center' }}>
                {product.images.slice(1, 5).map((img: any, i: number) => (
                  <div key={i} style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', flexShrink: 0 }}>
                    <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DETALJI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h1 style={{ color: '#f0f0f0', fontWeight: 900, fontSize: '36px', lineHeight: 1.2, margin: 0 }}>
              {product.name}
            </h1>

            {/* Cena */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#e87c2a', fontWeight: 900, fontSize: '48px' }}>
                {parseFloat(product.price).toLocaleString()} <span style={{ fontSize: '24px' }}>RSD</span>
              </span>
              <span style={{ background: 'rgba(232,124,42,0.1)', color: '#e87c2a', border: '1px solid rgba(232,124,42,0.3)', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '14px' }}>
                ✓ Na lageru
              </span>
            </div>

            {/* Opis */}
            <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '24px' }}>
              <h3 style={{ color: '#888', fontWeight: 700, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', margin: '0 0 12px 0' }}>
                Opis proizvoda
              </h3>
              <div
                style={{ color: '#ccc', fontSize: '16px', lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: product.description || product.short_description }}
              />
            </div>

            {/* DUGMAD */}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  background: added ? '#22c55e' : '#e87c2a',
                  color: '#fff',
                  border: 'none',
                  padding: '18px 24px',
                  borderRadius: '12px',
                  fontWeight: 900,
                  fontSize: '18px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {added ? '✅ Dodato u korpu!' : '🛒 Dodaj u korpu'}
              </button>

              <Link
                href="/kontakt"
                style={{
                  flex: 1,
                  background: 'transparent',
                  color: '#e87c2a',
                  border: '2px solid #e87c2a',
                  padding: '18px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '18px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                📞 Konsultacija
              </Link>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px', borderTop: '1px solid #2a2a2a' }}>
              <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>✅ Besplatna dostava Vojvodina</p>
              <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>💰 Plaćanje pouzećem ili bankovnim transferom</p>
              <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>🔧 Profesionalna montaža u roku od 48h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
