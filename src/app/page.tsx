"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    fetch(`${process.env.NEXT_PUBLIC_WC_URL}/products?consumer_key=${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET}&per_page=12`)
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

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 0), 0);

  if (loading) return <div className="h-screen flex items-center justify-center">Učitavam...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg p-6 sticky top-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">🚪 Door Gate Sistem</h1>
          <Link href="/cart" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700">
            🛒 Korpa ({totalItems})
          </Link>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl">
              <img src={product.images?.[0]?.src} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-6">{product.short_description}</p>
              <div className="text-3xl font-bold text-green-600 mb-6">{product.price} RSD</div>
              <button onClick={() => addToCart(product)} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700">
                🛒 Dodaj u korpu
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
