"use client";
import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { getCategoryIcon } from '@/lib/categoryIcons';

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

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState<Record<number, boolean>>({});
  const [search, setSearch] = useState("");

  const activeSlug = searchParams.get('cat') ?? 'svi';

  const fetchProducts = useCallback((categorySlug?: string) => {
    setLoading(true);
    let url = `${WC_URL}/products?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&per_page=100&status=publish`;

    if (categorySlug && categorySlug !== 'svi') {
      const cat = categories.find(c => c.slug === categorySlug);
      if (cat) url += `&category=${cat.id}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [categories]);

  useEffect(() => {
    fetch(`${WC_URL}/products/categories?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&per_page=100&hide_empty=true`)
      .then(res => res.json())
      .then(data => setCategories(data.filter((c: Category) => c.count > 0)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (categories.length > 0 || activeSlug === 'svi') {
      fetchProducts(activeSlug);
    }
  }, [activeSlug, categories, fetchProducts]);

  function handleAdd(product: Product) {
    addToCart({ id: product.id, name: product.name, price: parseFloat(product.price), quantity: 1 });
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1200);
  }

  function handleCatClick(slug: string) {
    router.push(slug === 'svi' ? '/shop' : `/shop?cat=${slug}`);
  }

  const filtered = search.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.short_description?.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div style={{ background: '#0f0f0f', color: '#f0f0f0', minHeight: '100vh' }}>

      {/* Header sekcija */}
      <section style={{
        background: '#0f0f0f', paddingTop: '100px', paddingBottom: '48px',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.8px',
            textTransform: 'uppercase', color: '#ffc02a',
            background: 'rgba(255,192,42,0.15)', padding: '5px 12px',
            borderRadius: '100px', marginBottom: '16px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffc02a', display: 'inline-block' }} />
            Web Shop
          </span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-2px', color: '#f0f0f0', lineHeight: 1.05 }}>
                Naš asortiman
              </h1>
              <p style={{ fontSize: '15px', color: '#666', marginTop: '8px' }}>
                {loading ? 'Učitavam...' : `${filtered.length} od ${products.length} proizvoda`}
                {activeSlug !== 'svi' && categories.find(c => c.slug === activeSlug) && (
                  <span style={{ color: '#ffc02a', marginLeft: '8px' }}>
                    — {categories.find(c => c.slug === activeSlug)?.name}
                  </span>
                )}
              </p>
            </div>
            <Link href="/" style={{
              fontSize: '13px', color: '#666', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s',
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#f0f0f0')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#666')}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M11 7H3M6 4L3 7l3 3" />
              </svg>
              Nazad na početnu
            </Link>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', alignItems: 'start' }}>

          {/* SIDEBAR — kategorije */}
          <aside style={{ position: 'sticky', top: '84px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#555', marginBottom: '12px' }}>
              Kategorije
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

              {/* Sve kategorije */}
              <button
                onClick={() => handleCatClick('svi')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 14px', borderRadius: '10px', border: 'none',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  background: activeSlug === 'svi' ? 'rgba(255,192,42,0.12)' : 'transparent',
                  color: activeSlug === 'svi' ? '#ffc02a' : '#888',
                  fontWeight: activeSlug === 'svi' ? 600 : 400,
                  fontSize: '14px',
                }}
              >
                <span style={{
                  width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                  background: activeSlug === 'svi' ? 'rgba(255,192,42,0.2)' : '#1a1a1a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: activeSlug === 'svi' ? '#ffc02a' : '#555',
                  border: `1px solid ${activeSlug === 'svi' ? 'rgba(255,192,42,0.3)' : '#222'}`,
                  transition: 'all 0.2s',
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="2" y="2" width="5" height="5" rx="1" />
                    <rect x="9" y="2" width="5" height="5" rx="1" />
                    <rect x="2" y="9" width="5" height="5" rx="1" />
                    <rect x="9" y="9" width="5" height="5" rx="1" />
                  </svg>
                </span>
                Svi proizvodi
              </button>

              {/* Dinamičke kategorije */}
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCatClick(cat.slug)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 14px', borderRadius: '10px', border: 'none',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    background: activeSlug === cat.slug ? 'rgba(255,192,42,0.12)' : 'transparent',
                    color: activeSlug === cat.slug ? '#ffc02a' : '#888',
                    fontWeight: activeSlug === cat.slug ? 600 : 400,
                    fontSize: '14px',
                  }}
                >
                  <span style={{
                    width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                    background: activeSlug === cat.slug ? 'rgba(255,192,42,0.2)' : '#1a1a1a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: activeSlug === cat.slug ? '#ffc02a' : '#555',
                    border: `1px solid ${activeSlug === cat.slug ? 'rgba(255,192,42,0.3)' : '#222'}`,
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ width: '16px', height: '16px' }}>
                      {getCategoryIcon(cat.slug)}
                    </div>
                  </span>
                  <span style={{ flex: 1 }}>{cat.name}</span>
                  <span style={{ fontSize: '11px', color: '#444', fontWeight: 400 }}>{cat.count}</span>
                </button>
              ))}
            </div>
          </aside>
          <main>
            {/* SEARCH BAR */}
            <div style={{ marginBottom: '24px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Pretraži proizvode..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '12px 16px 12px 44px',
                  background: '#1a1a1a', border: '1.5px solid #222',
                  borderRadius: '12px', fontSize: '14px',
                  color: '#f0f0f0', outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                onBlur={e => (e.target.style.borderColor = search ? '#ffc02a' : '#222')}
              />
              <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#555', pointerEvents: 'none' }}
                width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="8" cy="8" r="5.5" />
                <path d="M13 13l3 3" />
              </svg>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    background: '#333', border: 'none', color: '#888', cursor: 'pointer',
                    width: '20px', height: '20px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{
                    background: '#1a1a1a', borderRadius: '14px', height: '320px',
                    border: '1px solid #222', animation: 'pulse 1.5s ease infinite',
                    animationDelay: `${i * 0.1}s`,
                  }} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#555' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#888', marginBottom: '8px' }}>Nema proizvoda</div>
                <div style={{ fontSize: '14px' }}>Pokušajte drugu kategoriju</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {filtered.map(product => (
                  <div
                    key={product.id}
                    style={{
                      background: '#1a1a1a', borderRadius: '14px',
                      overflow: 'hidden', border: '1px solid #222',
                      transition: 'all 0.25s', cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget;
                      el.style.borderColor = '#ffc02a';
                      el.style.transform = 'translateY(-3px)';
                      el.style.boxShadow = '0 8px 32px rgba(255,192,42,0.10)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget;
                      el.style.borderColor = '#222';
                      el.style.transform = 'translateY(0)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <Link href={`/proizvodi/${product.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ height: '180px', background: '#ededeb', overflow: 'hidden', position: 'relative' }}>
                        {product.images?.[0]?.src ? (
                          <Image
                            src={product.images[0].src}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="6" y="6" width="36" height="36" rx="6" />
                              <circle cx="24" cy="24" r="8" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div style={{ padding: '16px' }}>
                      <div style={{ fontSize: '11px', color: '#ffc02a', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
                        {product.categories?.[0]?.name ?? ''}
                      </div>
                      <Link href={`/proizvodi/${product.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0f0', marginBottom: '6px', lineHeight: 1.3 }}>
                          {product.name}
                        </div>
                      </Link>
                      <div style={{ fontSize: '12px', color: '#ededeb', marginBottom: '14px', lineHeight: 1.5,
                        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                      }}
                        dangerouslySetInnerHTML={{ __html: product.short_description ?? '' }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffc02a' }}>
                          {parseFloat(product.price).toLocaleString('sr-RS')}
                          <span style={{ fontSize: '12px', color: '#666', marginLeft: '3px', fontWeight: 400 }}>RSD</span>
                        </span>
                        <button
                          onClick={() => handleAdd(product)}
                          style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: added[product.id] ? '#ffc02a' : '#2a2a2a',
                            color: added[product.id] ? '#0e0f11' : '#f0f0f0',
                            border: 'none', cursor: 'pointer', fontSize: '18px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
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
          </main>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#ffc02a', fontSize: '18px', fontWeight: 600 }}>Učitavam shop...</div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
