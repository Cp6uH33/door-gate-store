
"use client";
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
    note: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, cart }),
      });
      if (res.ok) {
        clearCart();
        setSuccess(true);
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
        <h1 style={{ color: '#ffc02a', fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '28px', marginBottom: '12px' }}>
          Porudžbina primljena!
        </h1>
        <p style={{ color: '#888', fontFamily: "'Manrope', sans-serif", marginBottom: '28px' }}>
          Kontaktiraćemo vas uskoro radi potvrde.
        </p>
        <button
          onClick={() => router.push('/shop')}
          style={{ background: '#ffc02a', color: '#0e0f11', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Nazad na shop
        </button>
      </div>
    </div>
  );

  const inputStyle = {
    width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a',
    borderRadius: '10px', padding: '12px 16px', color: '#f0f0f0',
    fontSize: '14px', fontFamily: "'Manrope', sans-serif", outline: 'none',
  };

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.8px',
    textTransform: 'uppercase' as const, color: '#ededeb',
    marginBottom: '6px', fontFamily: "'Space Grotesk', sans-serif",
  };

  return (
    <div style={{ background: '#0f0f0f', color: '#f0f0f0', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        <h1 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '32px', marginBottom: '8px', color: '#ededeb' }}>
          Podaci za isporuku
        </h1>
        <p style={{ color: '#ededeb', fontSize: '14px', fontFamily: "'Manrope', sans-serif", marginBottom: '40px' }}>
          Unesite podatke za dostavu.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Ime i prezime */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label htmlFor="firstName" style={labelStyle}>Ime *</label>
              <input id="firstName" name="firstName" required value={form.firstName} onChange={handleChange} style={inputStyle} placeholder="Marko" />
            </div>
            <div>
              <label htmlFor="lastName" style={labelStyle}>Prezime *</label>
              <input id="lastName" name="lastName" required value={form.lastName} onChange={handleChange} style={inputStyle} placeholder="Petrović" />
            </div>
          </div>

          {/* Telefon */}
          <div>
            <label htmlFor="phone" style={labelStyle}>Telefon *</label>
            <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} style={inputStyle} placeholder="+381 60 123 4567" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" style={labelStyle}>Email (opciono)</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} placeholder="marko@email.com" />
          </div>

          {/* Adresa */}
          <div>
            <label htmlFor="address" style={labelStyle}>Adresa *</label>
            <input id="address" name="address" required value={form.address} onChange={handleChange} style={inputStyle} placeholder="Ulica i broj" />
          </div>

          {/* Grad i poštanski broj */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px' }}>
            <div>
              <label htmlFor="city" style={labelStyle}>Grad *</label>
              <input id="city" name="city" required value={form.city} onChange={handleChange} style={inputStyle} placeholder="Beograd" />
            </div>
            <div>
              <label htmlFor="postcode" style={labelStyle}>Poštanski broj *</label>
              <input id="postcode" name="postcode" required value={form.postcode} onChange={handleChange} style={{ ...inputStyle, width: '120px' }} placeholder="11000" />
            </div>
          </div>

          {/* Napomena */}
          <div>
            <label htmlFor="note" style={labelStyle}>Napomena (opciono)</label>
            <textarea id="note" name="note" value={form.note} onChange={handleChange}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
              placeholder="Posebne napomene za dostavu..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? '#444' : '#ffc02a', color: loading ? '#888' : '#0e0f11',
              border: 'none', padding: '16px', borderRadius: '100px',
              fontWeight: 700, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Space Grotesk', sans-serif", marginTop: '8px',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Slanje...' : 'Potvrdi porudžbinu →'}
          </button>

        </form>
      </div>
    </div>
  );
}