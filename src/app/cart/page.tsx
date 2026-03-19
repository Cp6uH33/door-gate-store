"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const checkout = () => {
    setLoading(true);
    alert(`Ukupno: ${totalPrice.toLocaleString()} RSD\nHvala na porudžbini!\nPlaćanje pouzećem.`);
    localStorage.removeItem('cart');
    window.location.href = '/';
    setLoading(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-32 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-48 h-48 mx-auto mb-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center text-6xl">
            🛒
          </div>
          <h1 className="text-6xl font-black text-gray-500 mb-8">Korpa je prazna</h1>
          <Link 
            href="/"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-12 py-6 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:from-blue-600 hover:to-indigo-600 transition-all"
          >
            🛍️ Nastavi kupovinu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-indigo-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-7xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
            Korpa
          </h1>
          <p className="text-2xl text-gray-600">
            {cart.length} artikala • Besplatna dostava Vojvodina
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Proizvodi */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-8 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-blue-100">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-lg">
                  <Image 
                    src={item.images?.[0]?.src || 'https://via.placeholder.com/128?text=?'} 
                    alt={item.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-lg text-gray-600 mb-6 line-clamp-2">{item.short_description}</p>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-4 bg-gray-100 px-6 py-3 rounded-2xl">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-xl hover:bg-gray-200 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-12 text-center text-2xl font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-xl hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                      {(parseFloat(item.price || '0') * item.quantity).toLocaleString()} RSD
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="w-16 h-16 bg-red-100 hover:bg-red-200 text-red-600 rounded-2xl flex items-center justify-center text-2xl font-bold hover:scale-110 transition-all shadow-lg"
                  title="Ukloni"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-blue-100">
              <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Ukupno</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Artikala:</span>
                  <span>{cart.length}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold">
                  <span>Količina:</span>
                  <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                <div className="flex justify-between text-4xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                  <span>UKUPNO:</span>
                  <span>{totalPrice.toLocaleString()} RSD</span>
                </div>
              </div>

              <Link 
                href="/"
                className="block w-full bg-gray-100 text-gray-900 py-4 px-8 rounded-2xl font-bold text-xl text-center hover:bg-gray-200 transition-all mb-6 flex items-center justify-center gap-3"
              >
                ← Nastavi kupovinu
              </Link>

              <button 
                onClick={checkout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-6 px-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? '⏳' : '💳'} Završi kupovinu
              </button>

              <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>✅ Besplatna dostava Vojvodina</p>
                <p>💰 Plaćanje pouzećem / transfer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
