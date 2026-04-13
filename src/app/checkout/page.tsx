"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

export default function Checkout() {
  const { cart, totalPrice } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    phone: '', address: '', city: '', note: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        status: 'pending',
        billing: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          address_1: form.address,
          city: form.city,
          country: 'RS',
        },
        shipping: {
          first_name: form.first_name,
          last_name: form.last_name,
          address_1: form.address,
          city: form.city,
          country: 'RS',
        },
        line_items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        customer_note: form.note,
        payment_method: 'cod',
        payment_method_title: 'Plaćanje pouzećem',
      };

      const res = await fetch(
        `${WC_URL}/orders?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();

      if (data.id) {
        localStorage.removeItem('cart');
        router.push(`/checkout/success?order=${data.id}`);
      } else {
        setError('Greška pri kreiranju porudžbine. Pokušajte ponovo.');
      }
    } catch {
      setError('Greška pri slanju. Proverite internet konekciju.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#1a1a1a',
    border: '1.5px solid #222', color: '#ededeb',
    padding: '12px 16px', borderRadius: '12px',
    fontSize: '14px', outline: 'none',
    boxSizing: 'border-box',
    fontFamily: "'Manrope', sans-serif",
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    color: '#ededeb', fontSize: '11px', fontWeight: 700,
    letterSpacing: '1px', textTransform: 'uppercase',
    display: 'block', marginBottom: '6px',
    fontFamily: "'Space Grotesk', sans-serif",
  };

  useEffect(() => {
    if (cart.length === 0) router.push('/cart');
  }, [cart, router]);

  if (cart.length === 0) return null;

  return (
    <div style={{ background: '#0f0f0f', color: '#ededeb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '140px 24px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
          <Link href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '13px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
          >Početna</Link>
          <span style={{ color: '#333', fontSize: '13px' }}>/</span>
          <Link href="/cart" style={{ color: '#555', textDecoration: 'none', fontSize: '13px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
          >Korpa</Link>
          <span style={{ color: '#333', fontSize: '13px' }}>/</span>
          <span style={{ color: '#888', fontSize: '13px', fontFamily: "'Manrope', sans-serif" }}>Porudžbina</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.8px',
            textTransform: 'uppercase', color: '#ffc02a',
            background: 'rgba(255,192,42,0.15)', padding: '5px 12px',
            borderRadius: '100px', marginBottom: '16px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffc02a', display: 'inline-block' }} />
            Checkout
          </span>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', margin: '0 0 6px 0', letterSpacing: '-2px', fontFamily: "'Manrope', sans-serif", color: '#ededeb' }}>
            Završite porudžbinu
          </h1>
          <p style={{ color: '#ededeb', fontSize: '15px', margin: 0, fontFamily: "'Manrope', sans-serif" }}>
            Unesite podatke za dostavu i potvrdite porudžbinu
          </p>
        </div>

        <div className="checkout-grid">

          {/* FORMA */}
          <form onSubmit={handleSubmit} className="checkout-form">
            <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: '20px', padding: '32px', marginBottom: '16px' }}>
              <h2 style={{ color: '#ededeb', fontWeight: 700, fontSize: '18px', margin: '0 0 24px 0', fontFamily: "'Manrope', sans-serif" }}>
                Podaci za dostavu
              </h2>

              <div className="form-row">
                <div>
                  <label style={labelStyle}>Ime</label>
                  <input type="text" required placeholder="Vaše ime" value={form.first_name}
                    onChange={e => setForm({ ...form, first_name: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                    onBlur={e => (e.target.style.borderColor = '#222')} />
                </div>
                <div>
                  <label style={labelStyle}>Prezime</label>
                  <input type="text" required placeholder="Vaše prezime" value={form.last_name}
                    onChange={e => setForm({ ...form, last_name: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                    onBlur={e => (e.target.style.borderColor = '#222')} />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" required placeholder="vas@email.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                    onBlur={e => (e.target.style.borderColor = '#222')} />
                </div>
                <div>
                  <label style={labelStyle}>Telefon</label>
                  <input type="tel" required placeholder="+381 ..." value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                    onBlur={e => (e.target.style.borderColor = '#222')} />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label style={labelStyle}>Adresa</label>
                  <input type="text" required placeholder="Ulica i broj" value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                    onBlur={e => (e.target.style.borderColor = '#222')} />
                </div>
                <div>
                  <label style={labelStyle}>Grad</label>
                  <input type="text" required placeholder="Vaš grad" value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                    onBlur={e => (e.target.style.borderColor = '#222')} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Napomena (opciono)</label>
                <textarea placeholder="Posebne napomene za porudžbinu..." value={form.note}
                  onChange={e => setForm({ ...form, note: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => (e.target.style.borderColor = '#ffc02a')}
                  onBlur={e => (e.target.style.borderColor = '#222')} />
              </div>
            </div>

            {/* Način plaćanja */}
            <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: '20px', padding: '24px', marginBottom: '16px' }}>
              <h2 style={{ color: '#ededeb', fontWeight: 700, fontSize: '18px', margin: '0 0 16px 0', fontFamily: "'Manrope', sans-serif" }}>
                Način plaćanja
              </h2>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 16px', background: 'rgba(255,192,42,0.06)',
                border: '1.5px solid rgba(255,192,42,0.3)', borderRadius: '12px',
              }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffc02a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#0e0f11" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                  </svg>
                </div>
                <div>
                  <div style={{ color: '#ededeb', fontWeight: 600, fontSize: '14px', fontFamily: "'Manrope', sans-serif" }}>Plaćanje pouzećem</div>
                  <div style={{ color: '#ededeb', fontSize: '12px', fontFamily: "'Manrope', sans-serif" }}>Platite kuriru pri preuzimanju</div>
                </div>
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px', color: '#ef4444', fontSize: '14px', fontFamily: "'Manrope', sans-serif" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', background: loading ? '#e6a800' : '#ffc02a',
              color: '#0e0f11', border: 'none', padding: '16px',
              borderRadius: '100px', fontWeight: 700, fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Space Grotesk', sans-serif",
              transition: 'all 0.2s', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#ffcc4a'; }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#ffc02a'; }}
            >
              {loading ? 'Kreiram porudžbinu...' : 'Potvrdi porudžbinu'}
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              )}
            </button>
          </form>

          {/* PREGLED */}
          <div className="checkout-summary">
            <h2 style={{ color: '#ededeb', fontWeight: 700, fontSize: '18px', margin: '0 0 20px 0', fontFamily: "'Manrope', sans-serif" }}>
              Vaša porudžbina
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#ededeb', fontSize: '13px', fontWeight: 600, fontFamily: "'Manrope', sans-serif", wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      {item.name}
                    </div>
                    <div style={{ color: '#ededeb', fontSize: '12px', fontFamily: "'Manrope', sans-serif" }}>
                      x{item.quantity}
                    </div>
                  </div>
                  <div style={{ color: '#ffc02a', fontWeight: 700, fontSize: '14px', fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>
                    {(item.price * item.quantity).toLocaleString('sr-RS')} RSD
                  </div>
                </div>
              ))}
            </div>

            <div style={{ height: '1px', background: '#222', marginBottom: '16px' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
              <span style={{ color: '#ededeb', fontSize: '13px', fontFamily: "'Manrope', sans-serif", textTransform: 'uppercase', letterSpacing: '1px' }}>Ukupno</span>
              <span style={{ color: '#ffc02a', fontWeight: 800, fontSize: '24px', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-1px' }}>
                {totalPrice.toLocaleString('sr-RS')} <span style={{ fontSize: '13px', fontWeight: 500, color: '#888' }}>RSD</span>
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Dostava na celoj teritoriji Republike Srbije', 'Plaćanje pouzećem kurirskoj službi', 'Montaža garažnih vrata samo na teritoriji opštine Subotica'].map(text => (
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
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }
        .checkout-form {
          min-width: 0;
        }
        .checkout-summary {
          background: #1a1a1a;
          border: 1px solid #222;
          border-radius: 20px;
          padding: 28px;
          position: sticky;
          top: 130px;
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        @media (max-width: 768px) {
          .checkout-grid {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .checkout-summary {
            position: static;
            order: -1;
            width: 100%;
          }
          .checkout-form {
            width: 100%;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
