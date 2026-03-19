"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: string;
  images: Array<{ src: string }>;
  short_description: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Učitaj korpu iz localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Učitaj proizvode
  useEffect(() => {
    fetch('https://doorgatesistem.com/wp-json/wc/v3/products?consumer_key=ck_928d757a20f67f6ea4f412a8fd14ef1cc0710c95&consumer_secret=cs_c7f76ab6fef58c391655a016826961bf154f21ba&per_page=12')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API greška:', err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existing) {
      newCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600 animate-pulse">
          Učitavam proizvode iz WooCommerce API-ja...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-all">
              🚪 Door Gate Sistem
            </Link>
            <Link 
              href="/cart" 
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all ${
                totalItems > 0 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🛒 Korpa 
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                totalItems > 0 ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/50'
              }`}>
                {totalItems}
              </span>
              {totalItems > 0 && (
                <span className="text-sm font-normal ml-1">
                  ({totalPrice.toLocaleString()} RSD)
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Door Gate Sistem
          </h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Motori za kapije, delovi za kapije, interfoni i smart home sistemi
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 hover:border-blue-200 p-8 hover:-translate-y-3 transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-64 mb-6 overflow-hidden rounded-2xl">
                <img 
                  src={product.images[0]?.src || 'https://via.placeholder.com/400x300?text=No+Image'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Na lageru
                </span>
              </div>
              
              <h3 className="font-black text-xl mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              
              <p className="text-gray-600 mb-8 line-clamp-3 text-sm leading-relaxed">
                {product.short_description}
              </p>
              
              <div className="flex items-baseline justify-between mb-8">
                <span className="text-4xl font-black text-green-600 drop-shadow-lg">
                  {product.price} RSD
                </span>
              </div>
              
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
              >
                🛒 Dodaj u korpu
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
