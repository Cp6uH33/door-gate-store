"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const checkout = () => {
    setLoading(true);
    setTimeout(() => {
      alert(`Ukupno: ${totalPrice.toLocaleString()} RSD\nHvala na porudžbini!\nKontaktiraćemo vas uskoro.`);
      localStorage.removeItem('cart');
      window.location.href = '/';
    }, 1000);
  };

  if (cart.length === 0) return (
    <div style={{background:'#0f0f0f', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'80px', marginBottom:'24px'}}>🛒</div>
        <h1 style={{color:'#555', fontWeight:900, fontSize:'40px', margin:'0 0 24px 0'}}>Korpa je prazna</h1>
        <Link href="/" style={{background:'#e87c2a', color:'#fff', padding:'16px 40px', borderRadius:'10px', fontWeight:700, fontSize:'18px', textDecoration:'none'}}>
          🛍️ Nastavi kupovinu
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{background:'#0f0f0f', color:'#f0f0f0', minHeight:'100vh', padding:'48px 24px'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>

        <h1 style={{fontWeight:900, fontSize:'48px', margin:'0 0 8px 0'}}>Korpa</h1>
        <p style={{color:'#555', fontSize:'18px', margin:'0 0 40px 0'}}>{cart.length} artikala • Besplatna dostava Vojvodina</p>

        <div style={{display:'grid', gridTemplateColumns:'1fr 380px', gap:'32px', alignItems:'start'}}>

          {/* Lista */}
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {cart.map((item) => (
              <div key={item.id} style={{background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:'14px', padding:'20px', display:'flex', gap:'20px', alignItems:'center'}}>
                <div style={{width:'88px', height:'88px', borderRadius:'10px', overflow:'hidden', background:'#222', flexShrink:0, border:'1px solid #333'}}>
                  <img src={item.images?.[0]?.src || 'https://via.placeholder.com/88/222/555?text=?'} alt={item.name} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                </div>

                <div style={{flex:1, minWidth:0}}>
                  <h3 style={{color:'#f0f0f0', fontWeight:800, fontSize:'17px', margin:'0 0 4px 0'}}>{item.name}</h3>
                  <p style={{color:'#e87c2a', fontWeight:900, fontSize:'22px', margin:'0 0 12px 0'}}>{(parseFloat(item.price || '0') * item.quantity).toLocaleString()} RSD</p>

                  <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{width:'36px', height:'36px', background:'#2a2a2a', border:'1px solid #333', color:'#f0f0f0', borderRadius:'8px', fontWeight:700, fontSize:'18px', cursor:'pointer'}}>−</button>
                    <span style={{color:'#f0f0f0', fontWeight:700, fontSize:'18px', width:'32px', textAlign:'center'}}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{width:'36px', height:'36px', background:'#2a2a2a', border:'1px solid #333', color:'#f0f0f0', borderRadius:'8px', fontWeight:700, fontSize:'18px', cursor:'pointer'}}>+</button>
                  </div>
                </div>

                <button onClick={() => removeFromCart(item.id)} style={{width:'40px', height:'40px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#ef4444', borderRadius:'10px', fontSize:'18px', cursor:'pointer', flexShrink:0}}>
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div style={{background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:'16px', padding:'28px', position:'sticky', top:'90px'}}>
            <h2 style={{color:'#f0f0f0', fontWeight:900, fontSize:'24px', margin:'0 0 24px 0'}}>Pregled porudžbine</h2>

            <div style={{display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px'}}>
              <div style={{display:'flex', justifyContent:'space-between', color:'#888', fontSize:'16px'}}>
                <span>Artikala:</span><span style={{color:'#f0f0f0'}}>{cart.length}</span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', color:'#888', fontSize:'16px'}}>
                <span>Količina:</span><span style={{color:'#f0f0f0'}}>{cart.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', color:'#888', fontSize:'16px'}}>
                <span>Dostava:</span><span style={{color:'#e87c2a', fontWeight:700}}>Besplatna</span>
              </div>
              <div style={{height:'1px', background:'#2a2a2a', margin:'8px 0'}} />
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'22px', fontWeight:900}}>
                <span style={{color:'#888'}}>UKUPNO:</span>
                <span style={{color:'#e87c2a'}}>{totalPrice.toLocaleString()} RSD</span>
              </div>
            </div>

            <Link href="/" style={{display:'block', background:'#222', color:'#888', border:'1px solid #333', padding:'14px', borderRadius:'10px', fontWeight:600, textAlign:'center', textDecoration:'none', marginBottom:'12px', fontSize:'16px'}}>
              ← Nastavi kupovinu
            </Link>

            <button onClick={checkout} disabled={loading} style={{width:'100%', background:'#e87c2a', color:'#fff', border:'none', padding:'18px', borderRadius:'10px', fontWeight:900, fontSize:'18px', cursor:'pointer', opacity: loading ? 0.7 : 1}}>
              {loading ? '⏳ Šaljem...' : '💳 Završi kupovinu'}
            </button>

            <div style={{marginTop:'20px', paddingTop:'20px', borderTop:'1px solid #2a2a2a', display:'flex', flexDirection:'column', gap:'6px'}}>
              <p style={{color:'#444', fontSize:'13px', margin:0}}>✅ Besplatna dostava Vojvodina</p>
              <p style={{color:'#444', fontSize:'13px', margin:0}}>💰 Plaćanje pouzećem ili transferom</p>
              <p style={{color:'#444', fontSize:'13px', margin:0}}>🔧 Montaža u roku od 48h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
