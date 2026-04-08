"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const lightSections = ['products'];
    const darkSections = ['hero', 'why', 'categories', 'contact'];
    const allSections = [...lightSections, ...darkSections];
    const observers: IntersectionObserver[] = [];
    allSections.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) setIsLight(lightSections.includes(id));
          });
        },
        { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' }
      );
      observer.observe(section);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const menuItems = [
    { name: 'Početna', href: '/' },
    { name: 'Web Shop', href: '/shop' },
    { name: 'O nama', href: '/#why' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  const onProductPage = pathname?.startsWith('/proizvodi');
  const effectiveLight = isLight && !onProductPage;
  const headerBg = effectiveLight ? 'rgba(237,237,235,0.97)' : 'rgba(15,15,15,0.92)';
  const navLinkColor = effectiveLight ? '#0f0f0f' : '#ededeb';

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.4s ease',
        background: headerBg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #ffc02a',
      }}>
        <div style={{
          maxWidth: '1152px', margin: '0 auto', padding: '0 20px',
          height: '70px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* LOGO */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <Image
              src="/logodoorgatesistem.webp"
              alt="Door & Gate Sistem"
              width={120} height={36}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* NAV — desktop */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: navLinkColor, fontWeight: 700, fontSize: '15px',
                  fontFamily: "'Manrope', sans-serif",
                  textDecoration: 'none', padding: '6px 14px',
                  borderRadius: '100px', transition: 'color 0.2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = navLinkColor)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* DESNO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/cart" style={{
              background: '#ffc02a', color: '#0e0f11',
              padding: '8px 16px', borderRadius: '100px',
              fontWeight: 600, fontSize: '13px',
              fontFamily: "'Space Grotesk', sans-serif",
              textDecoration: 'none', display: 'flex',
              alignItems: 'center', gap: '6px',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}>
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M1 1h2l2.4 7.4a1 1 0 0 0 1 .6h5.2a1 1 0 0 0 1-.7L14 4H4" />
                <circle cx="6" cy="13" r="1" /><circle cx="11" cy="13" r="1" />
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

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hamburger-btn"
              style={{
                background: 'transparent', border: 'none',
                color: navLinkColor, cursor: 'pointer',
                padding: '6px', display: 'none',
              }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isOpen && (
        <div style={{
          position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 49,
          background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #222', padding: '16px 20px 24px',
        }}>
          {menuItems.map((item) => (
            <Link
              key={item.href} href={item.href}
              style={{
                display: 'block', color: '#ededeb',
                padding: '14px 16px', fontWeight: 600,
                fontSize: '16px', textDecoration: 'none',
                borderBottom: '1px solid #1a1a1a',
                fontFamily: "'Manrope', sans-serif",
                transition: 'color 0.2s',
              }}
              onClick={() => setIsOpen(false)}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ededeb')}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/cart" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: '#ffc02a', color: '#0e0f11',
            padding: '14px', borderRadius: '100px',
            fontWeight: 700, textDecoration: 'none',
            marginTop: '16px', fontSize: '15px',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
            onClick={() => setIsOpen(false)}
          >
            Korpa {cartCount > 0 ? `(${cartCount})` : ''}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
