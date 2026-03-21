"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function WebShop() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WC_URL}/products?consumer_key=${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}&per_page=12`)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{background:'#0f0f0f'}} className="h-screen flex items-center justify-center">
      <div style={{color:'#e87c2a'}} className="text-3xl font-bold animate-pulse">Učitavam...</div>
    </div>
  );

  return (
    <div style={{background:'#0f0f0f', color:'#f0f0f0'}} className="min-h-screen">
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg, #111 0%, #1a1a1a 50%, #111 100%)', borderBottom:'1px solid #2a2a2a'}} className="py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div style={{background:'rgba(232,124,42,0.1)', border:'1px solid rgba(232,124,42,0.3)', color:'#e87c2a'}} className="inline-block px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-8">
            ⚡ Profesionalna automatizacija
          </div>
          <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight" style={{color:'#f0f0f0'}}>
            Automatizacija<br/>
            <span style={{color:'#e87c2a'}}>kapija</span>
          </h1>
          <p style={{color:'#888'}} className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Motori za kapije • Garažna vrata • Interfoni • Smart home<br/>
            Montaža u roku od 48h širom Vojvodine
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/proizvodi" style={{background:'#e87c2a', color:'#fff'}} className="px-12 py-5 rounded-xl font-black text-xl hover:opacity-90 transition-all shadow-2xl">
              🛒 Pogledaj shop
            </Link>
            <Link href="/kontakt" style={{border:'2px solid #444', color:'#ccc', background:'transparent'}} className="px-12 py-5 rounded-xl font-bold text-xl hover:border-orange-500 hover:text-white transition-all">
              📞 Kontakt
            </Link>
          </div>
        </div>
      </section>

      {/* PROIZVODI */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-5xl font-black" style={{color:'#f0f0f0'}}>Najprodavaniji</h2>
              <p style={{color:'#666'}} className="text-xl mt-2">Naši top proizvodi</p>
            </div>
            <Link href="/proizvodi" style={{color:'#e87c2a', border:'1px solid #e87c2a'}} className="px-8 py-3 rounded-xl font-bold text-lg hover:bg-orange-500/10 transition-all">
              Svi proizvodi →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div key={product.id} style={{background:'#1a1a1a', border:'1px solid #2a2a2a'}} className="rounded-2xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1">
                <Link href={`/proizvodi/${product.id}`}>
                  <div className="h-56 overflow-hidden" style={{background:'#222'}}>
                    <img
                      src={product.images?.[0]?.src || 'https://via.placeholder.com/400x300/222/666?text=Proizvod'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <Link href={`/proizvodi/${product.id}`}>
                    <h3 style={{color:'#f0f0f0'}} className="font-black text-xl mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p style={{color:'#666'}} className="text-base mb-6 line-clamp-2 leading-relaxed">
                    {product.short_description?.replace(/<[^>]*>/g, '') || ''}
                  </p>
                  <div className="flex items-center justify-between mb-5">
                    <span style={{color:'#e87c2a'}} className="text-3xl font-black">
                      {parseFloat(product.price).toLocaleString()} <span className="text-lg">RSD</span>
                    </span>
                    <span style={{background:'rgba(232,124,42,0.1)', color:'#e87c2a', border:'1px solid rgba(232,124,42,0.3)'}} className="text-xs font-bold px-3 py-1 rounded-full">
                      Na lageru
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    style={{background:'#e87c2a', color:'#fff'}}
                    className="w-full py-4 rounded-xl font-black text-lg hover:opacity-90 transition-all active:scale-95"
                  >
                    🛒 Dodaj u korpu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'#141414', borderTop:'1px solid #2a2a2a', borderBottom:'1px solid #2a2a2a'}} className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 style={{color:'#f0f0f0'}} className="text-5xl font-black mb-6">Besplatne konsultacije</h2>
          <p style={{color:'#888'}} className="text-2xl mb-12">Pozovi za procenu i ponudu • Odgovaramo u roku od 1h</p>
          <Link href="/kontakt" style={{background:'#e87c2a', color:'#fff'}} className="inline-block px-16 py-6 rounded-xl font-black text-2xl hover:opacity-90 transition-all shadow-2xl">
            📞 Kontaktiraj nas
          </Link>
        </div>
      </section>
    </div>
  );
}
