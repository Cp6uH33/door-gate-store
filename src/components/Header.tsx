"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Početna', href: '/' },
    { name: 'Web Shop', href: '/shop' },
    { name: 'O nama', href: '/#why' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.3s',
      background: scrolled ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${scrolled ? '#eeeef0' : 'transparent'}`,
    }}>
      <div style={{
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        height: '100px', display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
      }}>

        {/* LOGO */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image
            src="/logodoorgatesistem.webp"
            alt="Door & Gate Sistem"
            width={140} height={42}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* NAV — centar */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: '#ffffff', fontWeight: 400, fontSize: '14px',
                textDecoration: 'none', padding: '6px 14px',
                borderRadius: '100px', transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '#ffc02a';
                el.style.background = 'rgba(255, 255, 255, 0.37)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '#ffffff';
                el.style.background = 'transparent';
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* KORPA — desno */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
          <Link
            href="/cart"
            style={{
              background: '#ffc02a', color: '#0e0f11',
              padding: '9px 18px', borderRadius: '100px',
              fontWeight: 600, fontSize: '13px',
              textDecoration: 'none', display: 'flex',
              alignItems: 'center', gap: '8px',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = '#ffcc4a';
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = '#ffc02a';
              el.style.transform = 'translateY(0)';
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M1 1h2l2.4 7.4a1 1 0 0 0 1 .6h5.2a1 1 0 0 0 1-.7L14 4H4" />
              <circle cx="6" cy="13" r="1" />
              <circle cx="11" cy="13" r="1" />
            </svg>
            Korpa
            {cartCount > 0 && (
              <span style={{
                background: '#0e0f11', color: '#ffc02a',
                width: '18px', height: '18px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 700,
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              background: 'transparent', border: 'none',
              color: '#f0f0f0', cursor: 'pointer', padding: '8px',
            }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div style={{
          background: 'rgba(15,15,15,0.97)', backdropFilter: 'blur(12px)',
          borderTop: '1px solid #222', padding: '12px 16px 16px',
        }}>
          {menuItems.map((item) => (
            <Link
              key={item.href} href={item.href}
              style={{
                display: 'block', color: '#888', padding: '11px 16px',
                fontWeight: 400, fontSize: '15px', textDecoration: 'none',
                borderRadius: '8px', transition: 'color 0.2s',
              }}
              onClick={() => setIsOpen(false)}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#f0f0f0')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#888')}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/cart"
            style={{
              display: 'block', background: '#ffc02a', color: '#0e0f11',
              padding: '12px 16px', borderRadius: '100px', fontWeight: 600,
              textAlign: 'center', textDecoration: 'none',
              marginTop: '8px', fontSize: '14px',
            }}
            onClick={() => setIsOpen(false)}
          >
            Korpa {cartCount > 0 ? `(${cartCount})` : ''}
          </Link>
        </div>
      )}
    </header>
  );
}
