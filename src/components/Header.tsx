"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const menuItems = [
    { name: 'Web Shop', href: '/' },
    { name: 'Proizvodi', href: '/proizvodi' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-xl flex items-center justify-center text-2xl font-bold">
              🚪
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 bg-clip-text text-transparent">
                Door Gate Sistem
              </h1>
              <p className="text-sm font-medium text-gray-600">Profesionalna automatizacija</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-12">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
            <Link 
              href="/cart"
              className="ml-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-10 py-4 rounded-3xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center gap-2 relative"
            >
              🛒 Korpa
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          <button 
            className="lg:hidden p-2 rounded-xl hover:bg-gray-200 transition-colors relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 py-8 rounded-b-3xl -mt-4 shadow-2xl">
            <nav className="flex flex-col gap-6">
              {menuItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="px-6 py-4 text-xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all text-left"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/cart"
                className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-indigo-600 transition-all mt-2 flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                🛒 Korpa ({cartCount})
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
