"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function checkout() {
    setLoading(true);

    setTimeout(() => {
      router.push('/checkout');
    }, 400);
  }

  if (cart.length === 0) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'rgba(255,192,42,0.1)', border: '1px solid rgba(255,192,42,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: '36px',
        }}>🛒</div>
        <h1 style={{ color: '#ededeb', fontWeight: 800, fontSize: '32px', margin: '0 0 8px 0', fontFamily: "'Manrope', sans-serif", letterSpacing: '-1px' }}>
          Korpa je prazna
        </h1>
        <p style={{ color: '#ededeb', fontSize: '15px', margin: '0 0 32px 0', fontFamily: "'Manrope', sans-serif" }}>
          Dodajte proizvode iz našeg shopa
        </p>
        <Link href="/shop" style={{
          background: '#ffc02a', color: '#0e0f11',
          padding: '13px 28px', borderRadius: '100px',
          fontWeight: 700, fontSize: '14px',
          textDecoration: 'none', display: 'inline-flex',
          alignItems: 'center', gap: '8px',
          fontFamily: "'Space Grotesk', sans-serif",
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffcc4a'; el.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffc02a'; el.style.transform = 'translateY(0)'; }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 7H3M6 4L3 7l3 3" />
          </svg>
          Nastavi kupovinu
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0f0f0f', color: '#ededeb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '140px 24px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
          <Link href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '13px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
          >
            Početna
          </Link>
          <span style={{ color: '#333', fontSize: '13px' }}>/</span>
          <span style={{ color: '#888', fontSize: '13px', fontFamily: "'Manrope', sans-serif" }}>Korpa</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px',
            textTransform: 'uppercase', color: '#0f0f0f',
            background: '#ffc02a', padding: '5px 12px',
            borderRadius: '100px', marginBottom: '16px',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0f0f0f', display: 'inline-block' }} />
            Korpa
          </span>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', margin: '0 0 6px 0', letterSpacing: '-2px', fontFamily: "'Manrope', sans-serif", color: '#ededeb' }}>
            Vaša korpa
          </h1>
          <p style={{ color: '#ededeb', fontSize: '15px', margin: 0, fontFamily: "'Manrope', sans-serif" }}>
            {cart.length} {cart.length === 1 ? 'artikal' : 'artikala'} • Dostava na celoj teritoriji Republike Srbije
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' }}>

          {/* LISTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cart.map(item => (
              <div key={item.id} style={{
                background: '#1a1a1a', border: '1px solid #222',
                borderRadius: '16px', padding: '20px',
                display: 'flex', gap: '20px', alignItems: 'center',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#222')}
              >
                {/* Slika */}
                <Link href={`/proizvodi/${item.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                  <div style={{
                    width: '88px', height: '88px', borderRadius: '12px',
                    overflow: 'hidden', background: '#222', flexShrink: 0,
                    border: '1px solid #2a2a2a', position: 'relative',
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a')}
                  >
                    {item.images?.[0]?.src ? (
                      <img
                        src={item.images[0].src}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: '6px',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: '24px' }}>
                        📦
                      </div>
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link href={`/proizvodi/${item.id}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{
                      color: '#ededeb',
                      fontWeight: 700,
                      fontSize: '16px',
                      margin: '0 0 4px 0',
                      fontFamily: "'Manrope', sans-serif",
                      lineHeight: 1.3,
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ededeb')}
                    >
                      {item.name}
                    </h3>
                  </Link>

                  <p style={{ color: '#ffc02a', fontWeight: 800, fontSize: '20px', margin: '0 0 14px 0', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.5px' }}>
                    {(+item.price * +item.quantity).toLocaleString('sr-RS')} RSD
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '34px', height: '34px', background: '#222',
                        border: '1px solid #333', color: '#ededeb',
                        borderRadius: '8px', fontWeight: 700, fontSize: '18px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#333')}
                    >
                      −
                    </button>

                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (isNaN(value)) return;
                        updateQuantity(item.id, Math.max(1, value));
                      }}
                      style={{
                        width: '56px',
                        height: '34px',
                        background: '#222',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: '#ededeb',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '15px',
                        fontFamily: "'Space Grotesk', sans-serif",
                        outline: 'none',
                        appearance: 'textfield',
                        MozAppearance: 'textfield',
                      } as React.CSSProperties}
                      onFocus={e => (e.currentTarget.style.borderColor = '#ffc02a')}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = '#333';
                        if (!e.currentTarget.value || Number(e.currentTarget.value) < 1) {
                          updateQuantity(item.id, 1);
                        }
                      }}
                    />

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '34px', height: '34px', background: '#222',
                        border: '1px solid #333', color: '#ededeb',
                        borderRadius: '8px', fontWeight: 700, fontSize: '18px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#ffc02a')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#333')}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Ukloni */}
                <button onClick={() => removeFromCart(item.id)} style={{
                  width: '38px', height: '38px',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: '#ef4444', borderRadius: '10px',
                  fontSize: '16px', cursor: 'pointer', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(239,68,68,0.15)'; el.style.borderColor = '#ef4444'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(239,68,68,0.08)'; el.style.borderColor = 'rgba(239,68,68,0.2)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 3.5h10M5.5 3.5V2.5h3v1M5.5 6v4.5M8.5 6v4.5M3 3.5l.7 8a1 1 0 001 .9h4.6a1 1 0 001-.9l.7-8" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* CHECKOUT */}
          <div style={{
            background: '#1a1a1a', border: '1px solid #222',
            borderRadius: '20px', padding: '28px',
            position: 'sticky', top: '130px',
          }}>
            <h2 style={{ color: '#ededeb', fontWeight: 800, fontSize: '20px', margin: '0 0 24px 0', fontFamily: "'Manrope', sans-serif", letterSpacing: '-0.5px' }}>
              Pregled porudžbine
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'Artikala', value: cart.length.toString() },
                { label: 'Količina', value: cart.reduce((s, i) => s + i.quantity, 0).toString() },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#ededeb', fontFamily: "'Manrope', sans-serif" }}>{row.label}</span>
                  <span style={{ color: '#ededeb', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: '#ffc02a', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>Dostava se naplaćuje po cenovniku kurirske službe</span>
              </div>
              <div style={{ height: '1px', background: '#222', margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ color: '#ededeb', fontSize: '13px', fontFamily: "'Manrope', sans-serif", textTransform: 'uppercase', letterSpacing: '1px' }}>Ukupno</span>
                <span style={{ color: '#ffc02a', fontWeight: 800, fontSize: '26px', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-1px' }}>
                  {totalPrice.toLocaleString('sr-RS')} <span style={{ fontSize: '14px', fontWeight: 500, color: '#ededeb' }}>RSD</span>
                </span>
              </div>
            </div>

            <Link href="/shop" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              background: 'transparent', color: '#ededeb',
              border: '1px solid #2a2a2a', padding: '12px',
              borderRadius: '100px', fontWeight: 500,
              textDecoration: 'none', marginBottom: '10px',
              fontSize: '13px', fontFamily: "'Space Grotesk', sans-serif",
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#444'; el.style.color = '#ededeb'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#2a2a2a'; el.style.color = '#666'; }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 6H3M5 4L3 6l2 2" />
              </svg>
              Nastavi kupovinu
            </Link>

            <button onClick={checkout} disabled={loading} style={{
              width: '100%', background: loading ? '#e6a800' : '#ffc02a',
              color: '#0e0f11', border: 'none',
              padding: '15px', borderRadius: '100px',
              fontWeight: 700, fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Space Grotesk', sans-serif",
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#ffcc4a'; }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#ffc02a'; }}
            >
              {loading ? 'Šaljem...' : 'Završi kupovinu'}
              {!loading && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 7h8M8 4l3 3-3 3" />
                </svg>
              )}
            </button>

            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #1f1f1f', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Dostava na celoj teritoriji Republike Srbije',
                'Plaćanje pouzećem ili transferom',
                'Montaža garažnih vrata samo na teritoriji opštine grada Subotice',
              ].map(text => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#ededeb', fontFamily: "'Manrope', sans-serif" }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(255,192,42,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="#ffc02a" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 4l2 2 4-3.5" />
                    </svg>
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
}