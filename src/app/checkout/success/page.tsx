"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

function SuccessContent() {
  const params = useSearchParams();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);
  const orderId = params.get('order');

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: '#ffc02a', border: '2px solid #ffc02a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: '36px',
        }}>✓</div>

        <h1 style={{ color: '#ededeb', fontWeight: 800, fontSize: '32px', margin: '0 0 12px 0', letterSpacing: '-1px', fontFamily: "'Manrope', sans-serif" }}>
          Porudžbina primljena!
        </h1>

        {orderId && (
          <div style={{ background: 'rgba(255,192,42,0.08)', border: '1px solid rgba(255,192,42,0.2)', borderRadius: '12px', padding: '12px 20px', marginBottom: '16px' }}>
            <span style={{ color: '#ededeb', fontSize: '13px', fontFamily: "'Manrope', sans-serif" }}>Broj porudžbine: </span>
            <span style={{ color: '#ffc02a', fontWeight: 700, fontSize: '15px', fontFamily: "'Space Grotesk', sans-serif" }}>#{orderId}</span>
          </div>
        )}

        <p style={{ color: '#ededeb', fontSize: '15px', lineHeight: 1.7, margin: '0 0 32px 0', fontFamily: "'Manrope', sans-serif" }}>
          Hvala na porudžbini! Kontaktiraćemo vas uskoro radi potvrde i dogovora oko dostave.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
          {['Dobićete potvrdu na email', 'Kontaktiraćemo vas u najkraćem mogućem roku', 'Dostava u dogovorenom terminu'].map(text => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#ededeb', fontFamily: "'Manrope', sans-serif" }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,192,42,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#ffc02a" strokeWidth="2" strokeLinecap="round">
                  <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                </svg>
              </div>
              {text}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link href="/" style={{
            background: '#ffc02a', color: '#0e0f11',
            padding: '13px 28px', borderRadius: '100px',
            fontWeight: 700, fontSize: '14px',
            textDecoration: 'none', fontFamily: "'Space Grotesk', sans-serif",
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffcc4a'; el.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffc02a'; el.style.transform = 'translateY(0)'; }}
          >
            Nazad na početnu
          </Link>
          <Link href="/shop" style={{
            background: 'transparent', color: '#ededeb',
            padding: '12px 28px', borderRadius: '100px',
            fontWeight: 600, fontSize: '14px',
            textDecoration: 'none', border: '1.5px solid #333',
            fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.2s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#ffc02a'; el.style.color = '#ffc02a'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#333'; el.style.color = '#ededeb'; }}
          >
            Nastavi kupovinu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ background: '#0f0f0f', minHeight: '100vh' }} />}>
      <SuccessContent />
    </Suspense>
  );
}
