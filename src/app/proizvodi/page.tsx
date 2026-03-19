"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Proizvodi() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    // TVOJ WooCommerce API
    fetch('https://doorgatesistem.com/wp-json/wc/v3/products?consumer_key=ck_928d757a20f67f6ea4f412a8fd14ef1cc0710c95&consumer_secret=cs_c7f76ab6fef58c391655a016826961bf154f21ba&per_page=50&status=publish')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    const newCart = existing 
      ? cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
      : [...cart, {...product, quantity: 1}];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-4xl font-bold text-blue-600 animate-pulse">Učitavam proizvode...</div>
    </div>
  );

  const categories = [...new Set(products.map(p => p.categories[0]?.name).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-indigo-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-7xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
            Svi proizvodi
          </h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            {products.length} artikala na lageru • Besplatna dostava Vojvodina
          </p>
        </div>

        {/* Filter po kategorijama */}
        <div className="flex flex-wrap gap-4 justify-center mb-20 bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
          <Link href="/proizvodi" className="px-8 py-4 font-bold text-xl bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition-all">
            Sve ({products.length})
          </Link>
          {categories.map((cat, i) => (
            <button key={i} className="px-8 py-4 font-bold text-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-3xl transition-all bg-white/50">
              {cat}
            </button>
          ))}
        </div>

        {/* Grid svih proizvoda */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100 hover:border-blue-300 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 hover:bg-white">
              <div className="h-72 mb-6 overflow-hidden rounded-2xl group-hover:scale-[1.03] transition-transform">
                <img 
                  src={product.images[0]?.src || '/placeholder.jpg'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:brightness-105 transition-all" 
                />
              </div>
              <h3 className="font-black text-2xl mb-4 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-8 line-clamp-3 text-lg leading-relaxed opacity-90">
                {product.short_description}
              </p>
              <div className="flex items-baseline justify-between mb-10">
                <span className="text-4xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-lg">
                  {parseFloat(product.price).toLocaleString()} RSD
                </span>
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-xl text-sm">
                  ✓ {product.stock_quantity || 0} kom
                </span>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-5 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
              >
                🛒 Dodaj u korpu
              </button>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-32">
            <div className="text-8xl mb-8">🛒</div>
            <h2 className="text-5xl font-black text-gray-500 mb-6">Nema proizvoda</h2>
            <Link href="/" className="bg-blue-500 text-white px-12 py-6 rounded-3xl font-bold text-2xl hover:bg-blue-600">
              Vrati se na Web Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
