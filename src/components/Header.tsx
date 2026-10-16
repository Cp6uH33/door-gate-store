"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useCategories } from '@/lib/categories';
import { getCategoryIcon } from '@/lib/categoryIcons';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const { tree } = useCategories();

  // Zatvori sve menije pri promeni stranice
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setShopOpen(false);
    setIsOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  function openShop() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShopOpen(true);
  }
  function closeShopSoon() {
    closeTimer.current = setTimeout(() => setShopOpen(false), 150);
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/shop?search=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setIsOpen(false);
    setQuery('');
  }

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
            {menuItems.map((item) => item.href === '/shop' ? (
              <div key={item.href} onMouseEnter={openShop} onMouseLeave={closeShopSoon} style={{ position: 'relative' }}>
                <Link
                  href={item.href}
                  aria-haspopup="true"
                  aria-expanded={shopOpen}
                  onFocus={openShop}
                  style={{
                    color: shopOpen ? '#ffc02a' : navLinkColor, fontWeight: 700, fontSize: '15px',
                    fontFamily: "'Manrope', sans-serif",
                    textDecoration: 'none', padding: '6px 14px',
                    borderRadius: '100px', transition: 'color 0.2s',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}
                >
                  {item.name}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    style={{ transition: 'transform 0.2s', transform: shopOpen ? 'rotate(180deg)' : 'none' }}>
                    <path d="M3 4.5l3 3 3-3" />
                  </svg>
                </Link>
              </div>
            ) : (
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
            <button
              onClick={() => { setSearchOpen(!searchOpen); setIsOpen(false); }}
              aria-label="Pretraga"
              style={{
                background: 'transparent', border: 'none',
                color: searchOpen ? '#ffc02a' : navLinkColor, cursor: 'pointer',
                padding: '6px', display: 'flex',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="8" cy="8" r="5.5" /><path d="M13 13l3 3" />
              </svg>
            </button>
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
              onClick={() => { setIsOpen(!isOpen); setSearchOpen(false); }}
              className="hamburger-btn" aria-label="Otvori meni"
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

      {/* PRETRAGA */}
      {searchOpen && (
        <div style={{
          position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 49,
          background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #222', padding: '16px 20px',
        }}>
          <form onSubmit={submitSearch} role="search" style={{ maxWidth: '1152px', margin: '0 auto', display: 'flex', gap: '10px' }}>
            <input
              ref={searchInput}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Escape') setSearchOpen(false); }}
              placeholder="Šifra ili naziv proizvoda, npr. H/31V-60 ili točkić..."
              aria-label="Pretraži proizvode"
              style={{
                flex: 1, minWidth: 0, padding: '12px 16px',
                background: '#1a1a1a', border: '1.5px solid #ffc02a',
                borderRadius: '12px', fontSize: '15px',
                color: '#f0f0f0', outline: 'none',
                fontFamily: "'Manrope', sans-serif",
              }}
            />
            <button type="submit" style={{
              background: '#ffc02a', color: '#0e0f11', border: 'none',
              padding: '0 20px', borderRadius: '12px', cursor: 'pointer',
              fontWeight: 700, fontSize: '14px', fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Traži
            </button>
          </form>
        </div>
      )}

      {/* WEB SHOP — padajući meni sa kategorijama (desktop) */}
      {shopOpen && tree.length > 0 && (
        <div
          className="desktop-nav"
          onMouseEnter={openShop}
          onMouseLeave={closeShopSoon}
          style={{
            position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 49,
            background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(16px)',
            borderBottom: '1px solid #222', padding: '28px 20px 32px',
          }}
        >
          <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
            <div className="shop-menu-grid">
              {tree.map(cat => (
                <div key={cat.id} style={{ gridColumn: cat.children.length > 4 ? 'span 2' : undefined }}>
                  <Link href={`/shop?cat=${cat.slug}`} className="shop-menu-head">
                    <span style={{ width: '18px', height: '18px', color: '#ffc02a', flexShrink: 0 }}>{getCategoryIcon(cat.slug)}</span>
                    {cat.name}
                    <span style={{ fontSize: '11px', color: '#555', fontWeight: 500 }}>{cat.count}</span>
                  </Link>
                  {cat.children.length > 0 && (
                    <div style={{ columns: cat.children.length > 4 ? 2 : 1, columnGap: '16px', marginTop: '8px' }}>
                      {cat.children.map(sub => (
                        <Link key={sub.id} href={`/shop?cat=${sub.slug}`} className="shop-menu-link">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Link href="/shop" className="shop-menu-all">
              Pogledaj sve proizvode
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 7h8M8 4l3 3-3 3" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {isOpen && (
        <div style={{
          position: 'fixed', top: '70px', left: 0, right: 0, bottom: 0, zIndex: 49,
          background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(16px)',
          padding: '16px 20px 24px', overflowY: 'auto',
        }}>
          {menuItems.map((item) => item.href === '/shop' ? (
            <div key={item.href} style={{ borderBottom: '1px solid #1a1a1a' }}>
              <Link href="/shop" onClick={() => setIsOpen(false)} style={{
                display: 'block', color: '#ededeb', padding: '14px 16px', fontWeight: 600,
                fontSize: '16px', textDecoration: 'none', fontFamily: "'Manrope', sans-serif",
              }}>
                {item.name}
              </Link>
              <div style={{ padding: '0 0 10px 16px' }}>
                {tree.map(cat => (
                  <div key={cat.id}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Link href={`/shop?cat=${cat.slug}`} onClick={() => setIsOpen(false)} style={{
                        flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
                        color: '#aaa', padding: '10px 0', fontSize: '15px', textDecoration: 'none',
                        fontFamily: "'Manrope', sans-serif",
                      }}>
                        <span style={{ width: '18px', height: '18px', color: '#ffc02a', flexShrink: 0 }}>{getCategoryIcon(cat.slug)}</span>
                        {cat.name}
                      </Link>
                      {cat.children.length > 0 && (
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === cat.id ? null : cat.id)}
                          aria-label={`Podkategorije: ${cat.name}`}
                          aria-expanded={mobileExpanded === cat.id}
                          style={{ background: '#1a1a1a', border: '1px solid #222', color: '#ededeb', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            style={{ transition: 'transform 0.2s', transform: mobileExpanded === cat.id ? 'rotate(180deg)' : 'none' }}>
                            <path d="M3 4.5l3 3 3-3" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {mobileExpanded === cat.id && (
                      <div style={{ padding: '0 0 6px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                        {cat.children.map(sub => (
                          <Link key={sub.id} href={`/shop?cat=${sub.slug}`} onClick={() => setIsOpen(false)} style={{
                            color: '#888', padding: '8px 0', fontSize: '14px', textDecoration: 'none',
                            fontFamily: "'Manrope', sans-serif",
                          }}>
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
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
        .shop-menu-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 24px;
        }
        .shop-menu-head {
          display: flex; align-items: center; gap: 8px;
          color: #ededeb; font-weight: 700; font-size: 14px;
          font-family: 'Manrope', sans-serif; text-decoration: none;
          transition: color 0.2s;
        }
        .shop-menu-head:hover { color: #ffc02a; }
        .shop-menu-link {
          display: block; color: #888; font-size: 13px; padding: 5px 0 5px 26px;
          font-family: 'Manrope', sans-serif; text-decoration: none;
          transition: color 0.2s; break-inside: avoid;
        }
        .shop-menu-link:hover { color: #ffc02a; }
        .shop-menu-all {
          display: inline-flex; align-items: center; gap: 6px; margin-top: 24px;
          color: #ffc02a; font-size: 13px; font-weight: 600;
          font-family: 'Space Grotesk', sans-serif; text-decoration: none;
        }
        @media (max-width: 1024px) {
          .shop-menu-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
