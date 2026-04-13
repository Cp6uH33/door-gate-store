"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function Proizvodi() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Sve');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/wc/products?per_page=50&status=publish`)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{background:'#0f0f0f'}} className="min-h-screen flex items-center justify-center">
      <div style={{color:'#e87c2a'}} className="text-3xl font-bold animate-pulse">Učitavam proizvode...</div>
    </div>
  );

  const categories = ['Sve', ...new Set(products.map(p => p.categories[0]?.name).filter(Boolean))];
  const filtered = activeCategory === 'Sve' ? products : products.filter(p => p.categories[0]?.name === activeCategory);

  return (
    <div style={{background:'#0f0f0f', color:'#f0f0f0'}} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Naslov */}
        <div style={{borderBottom:'1px solid #2a2a2a', paddingBottom:'32px', marginBottom:'40px'}}>
          <h1 style={{color:'#f0f0f0', fontWeight:900, fontSize:'56px', margin:'0 0 8px 0'}}>Svi proizvodi</h1>
          <p style={{color:'#555', fontSize:'18px', margin:0}}>{products.length} artikala na lageru • Besplatna dostava Vojvodina</p>
        </div>

        {/* Kategorije filter */}
        <div style={{display:'flex', flexWrap:'wrap', gap:'10px', marginBottom:'40px'}}>
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#e87c2a' : '#1a1a1a',
                color: activeCategory === cat ? '#fff' : '#888',
                border: activeCategory === cat ? '1px solid #e87c2a' : '1px solid #2a2a2a',
                padding:'10px 20px',
                borderRadius:'8px',
                fontWeight:700,
                fontSize:'15px',
                cursor:'pointer',
                transition:'all 0.2s'
              }}
            >
              {cat} {cat === 'Sve' ? `(${products.length})` : `(${products.filter(p => p.categories[0]?.name === cat).length})`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'20px'}}>
          {filtered.map((product) => (
            <div
              key={product.id}
              style={{background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:'14px', overflow:'hidden', transition:'all 0.3s'}}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#e87c2a';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <Link href={`/proizvodi/${product.id}`} style={{textDecoration:'none'}}>
                <div style={{height:'220px', overflow:'hidden', background:'#222'}}>
                  <img
                    src={product.images[0]?.src || 'https://via.placeholder.com/300x220/222/555?text=Proizvod'}
                    alt={product.name}
                    style={{width:'100%', height:'100%', objectFit:'cover', opacity:0.9, transition:'all 0.4s'}}
                    onMouseEnter={e => (e.target as HTMLElement).style.opacity = '1'}
                    onMouseLeave={e => (e.target as HTMLElement).style.opacity = '0.9'}
                  />
                </div>
              </Link>
              <div style={{padding:'20px'}}>
                <Link href={`/proizvodi/${product.id}`} style={{textDecoration:'none'}}>
                  <h3 style={{color:'#f0f0f0', fontWeight:800, fontSize:'18px', margin:'0 0 8px 0', lineHeight:1.3}}>
                    {product.name}
                  </h3>
                </Link>
                <p style={{color:'#555', fontSize:'14px', margin:'0 0 16px 0', lineHeight:1.6, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
                  {product.short_description?.replace(/<[^>]*>/g, '') || ''}
                </p>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px'}}>
                  <span style={{color:'#e87c2a', fontWeight:900, fontSize:'26px'}}>
                    {parseFloat(product.price).toLocaleString()} <span style={{fontSize:'14px'}}>RSD</span>
                  </span>
                  <span style={{background:'rgba(232,124,42,0.1)', color:'#e87c2a', border:'1px solid rgba(232,124,42,0.2)', padding:'4px 10px', borderRadius:'6px', fontSize:'12px', fontWeight:700}}>
                    Na lageru
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  style={{width:'100%', background:'#e87c2a', color:'#fff', border:'none', padding:'14px', borderRadius:'10px', fontWeight:800, fontSize:'16px', cursor:'pointer', transition:'opacity 0.2s'}}
                  onMouseEnter={e => (e.target as HTMLElement).style.opacity = '0.9'}
                  onMouseLeave={e => (e.target as HTMLElement).style.opacity = '1'}
                >
                  🛒 Dodaj u korpu
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{textAlign:'center', padding:'80px 0'}}>
            <div style={{fontSize:'64px', marginBottom:'24px'}}>🔍</div>
            <h2 style={{color:'#555', fontSize:'32px', fontWeight:900}}>Nema proizvoda u ovoj kategoriji</h2>
          </div>
        )}
      </div>
    </div>
  );
}
