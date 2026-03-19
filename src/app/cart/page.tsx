"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item: any) => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const newCart = cart.map((item: any) => 
      item.id === id ? { ...item, quantity } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-6xl mb-8">🛒</div>
          <h2 className="text-4xl font-bold text-gray-700 mb-6">Vaša korpa je prazna</h2>
          <p className="text-xl text-gray-500 mb-12">Nema proizvoda za prikaz. Vratite se na prodavnicu.</p>
          <Link 
            href="/" 
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-blue-600 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all inline-block"
          >
            🛍️ Vrati se na proizvode
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-5xl font-black text-gray-800 mb-2">🛒 Moja korpa</h1>
            <p className="text-2xl text-gray-600">{cart.length} artik(a) u korpi</p>
          </div>
          <Link 
            href="/" 
            className="bg-gray-200 text-gray-800 px-8 py-4 rounded-xl font-bold hover:bg-gray-300 transition-colors"
          >
            ← Nastavi kupovinu
          </Link>
        </div>

        <div className="grid gap-8 mb-16">
          {cart.map((item) => (
            <div key={item.id} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 flex items-center gap-8 hover:shadow-2xl transition-all">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-36 h-36 object-cover rounded-2xl flex-shrink-0 shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-2xl mb-4 line-clamp-1 text-gray-800">{item.name}</h3>
                <p className="text-4xl font-black text-green-600 mb-6">{item.price} RSD</p>
              </div>
              <div className="flex items-center gap-4 text-center ml-auto">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-14 h-14 bg-gray-200 rounded-2xl hover:bg-gray-300 font-bold text-2xl transition-colors"
                >
                  −
                </button>
                <span className="w-20 text-3xl font-black text-gray-800">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-14 h-14 bg-gray-200 rounded-2xl hover:bg-gray-300 font-bold text-2xl transition-colors"
                >
                  +
                </button>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="px-8 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 shadow-lg hover:shadow-xl ml-4 transition-all"
                >
                  🗑️ Ukloni
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl max-w-2xl mx-auto border border-white/50">
          <div className="text-5xl font-black text-gray-800 mb-8 text-center">Ukupno</div>
          <div className="text-6xl font-black text-green-600 text-center mb-12">{total.toLocaleString()} RSD</div>
          <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-6 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:-translate-y-1">
            💳 Završi kupovinu
          </button>
        </div>
      </div>
    </div>
  );
}
