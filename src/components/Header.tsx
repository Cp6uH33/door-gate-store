"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const menuItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Proizvodi', href: '/proizvodi' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <header className="sticky top-0 z-50" style={{background:'#111', borderBottom:'1px solid #2a2a2a'}}>
      <div className="max-w-7xl mx-auto px-6" style={{height:'70px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        
        {/* LOGO */}
        <Link href="/" style={{display:'flex', alignItems:'center', gap:'12px', textDecoration:'none'}}>
          <div style={{width:'44px', height:'44px', background:'#e87c2a', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0}}>
            🚪
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
            <span style={{color:'#f0f0f0', fontWeight:900, fontSize:'20px', lineHeight:1.1, letterSpacing:'-0.5px'}}>
              Door <span style={{color:'#e87c2a'}}>&</span> Gate Sistem
            </span>
            <span style={{color:'#555', fontSize:'11px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase'}}>
              Automatizacija
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav style={{display:'flex', alignItems:'center', gap:'32px'}} className="hidden lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{color:'#999', fontWeight:600, fontSize:'17px', textDecoration:'none', transition:'color 0.2s'}}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f0f0'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#999'}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/cart"
            style={{background:'#e87c2a', color:'#fff', padding:'10px 24px', borderRadius:'10px', fontWeight:700, fontSize:'16px', textDecoration:'none', display:'flex', alignItems:'center', gap:'8px', position:'relative'}}
          >
            🛒 Korpa
            {cartCount > 0 && (
              <span style={{position:'absolute', top:'-8px', right:'-8px', background:'#fff', color:'#e87c2a', width:'22px', height:'22px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:900}}>
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
          style={{background:'transparent', border:'none', color:'#f0f0f0', cursor:'pointer', padding:'8px'}}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div style={{background:'#1a1a1a', borderTop:'1px solid #333', padding:'16px'}}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{display:'block', color:'#ccc', padding:'12px 16px', fontWeight:600, fontSize:'17px', textDecoration:'none', borderRadius:'8px'}}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/cart"
            style={{display:'block', background:'#e87c2a', color:'#fff', padding:'12px 16px', borderRadius:'8px', fontWeight:700, textAlign:'center', textDecoration:'none', marginTop:'8px'}}
            onClick={() => setIsOpen(false)}
          >
            🛒 Korpa ({cartCount})
          </Link>
        </div>
      )}
    </header>
  );
}
