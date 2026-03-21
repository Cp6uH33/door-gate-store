"use client";
import { useState } from 'react';

export default function Kontakt() {
  const [form, setForm] = useState({ ime: '', email: '', telefon: '', poruka: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{background:'#0f0f0f', color:'#f0f0f0', minHeight:'100vh', padding:'48px 24px'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>

        <div style={{marginBottom:'48px'}}>
          <h1 style={{fontWeight:900, fontSize:'56px', margin:'0 0 8px 0'}}>Kontakt</h1>
          <p style={{color:'#555', fontSize:'18px', margin:0}}>Odgovaramo u roku od 1h • Besplatna procena</p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'start'}}>

          {/* Forma */}
          <div style={{background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:'16px', padding:'32px'}}>
            <h2 style={{color:'#f0f0f0', fontWeight:800, fontSize:'24px', margin:'0 0 28px 0'}}>Pošalji upit</h2>

            {sent ? (
              <div style={{textAlign:'center', padding:'40px 0'}}>
                <div style={{fontSize:'64px', marginBottom:'16px'}}>✅</div>
                <h3 style={{color:'#e87c2a', fontWeight:900, fontSize:'24px', margin:'0 0 8px 0'}}>Poruka poslata!</h3>
                <p style={{color:'#888', fontSize:'16px', margin:0}}>Kontaktiraćemo vas uskoro.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'16px'}}>
                {[
                  {label:'Ime i prezime', key:'ime', type:'text', placeholder:'Vaše ime...'},
                  {label:'Email adresa', key:'email', type:'email', placeholder:'email@primer.com'},
                  {label:'Telefon', key:'telefon', type:'tel', placeholder:'+381 ...'},
                ].map(({label, key, type, placeholder}) => (
                  <div key={key}>
                    <label style={{color:'#888', fontSize:'13px', fontWeight:600, letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'8px'}}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm({...form, [key]: e.target.value})}
                      required
                      style={{width:'100%', background:'#111', border:'1px solid #333', color:'#f0f0f0', padding:'14px 16px', borderRadius:'10px', fontSize:'16px', outline:'none', boxSizing:'border-box'}}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = '#e87c2a'}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = '#333'}
                    />
                  </div>
                ))}
                <div>
                  <label style={{color:'#888', fontSize:'13px', fontWeight:600, letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'8px'}}>Poruka</label>
                  <textarea
                    placeholder="Opišite šta vam treba..."
                    value={form.poruka}
                    onChange={e => setForm({...form, poruka: e.target.value})}
                    required
                    rows={5}
                    style={{width:'100%', background:'#111', border:'1px solid #333', color:'#f0f0f0', padding:'14px 16px', borderRadius:'10px', fontSize:'16px', outline:'none', resize:'vertical', boxSizing:'border-box', fontFamily:'inherit'}}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = '#e87c2a'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = '#333'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{background:'#e87c2a', color:'#fff', border:'none', padding:'18px', borderRadius:'10px', fontWeight:900, fontSize:'18px', cursor:'pointer', opacity: loading ? 0.7 : 1, marginTop:'8px'}}
                >
                  {loading ? '⏳ Šaljem...' : '📤 Pošalji upit'}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
            {[
              {icon:'📞', title:'Telefon', value:'+381 64 123 4567', sub:'Dostupni pon-sub 8-20h'},
              {icon:'📧', title:'Email', value:'info@doorgatesistem.com', sub:'Odgovaramo u roku od 1h'},
              {icon:'📍', title:'Lokacija', value:'Novi Sad, Vojvodina', sub:'Servis i montaža na terenu'},
              {icon:'⏰', title:'Radno vreme', value:'Pon – Sub: 8:00 – 20:00', sub:'Ned: Po dogovoru'},
            ].map(({icon, title, value, sub}) => (
              <div key={title} style={{background:'#1a1a1a', border:'1px solid #2a2a2a', borderRadius:'14px', padding:'24px', display:'flex', gap:'20px', alignItems:'flex-start'}}>
                <div style={{width:'52px', height:'52px', background:'rgba(232,124,42,0.1)', border:'1px solid rgba(232,124,42,0.2)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0}}>
                  {icon}
                </div>
                <div>
                  <p style={{color:'#555', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 4px 0'}}>{title}</p>
                  <p style={{color:'#f0f0f0', fontWeight:800, fontSize:'18px', margin:'0 0 4px 0'}}>{value}</p>
                  <p style={{color:'#555', fontSize:'14px', margin:0}}>{sub}</p>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div style={{background:'linear-gradient(135deg, rgba(232,124,42,0.15), rgba(232,124,42,0.05))', border:'1px solid rgba(232,124,42,0.3)', borderRadius:'14px', padding:'24px', textAlign:'center', marginTop:'8px'}}>
              <p style={{color:'#e87c2a', fontWeight:900, fontSize:'20px', margin:'0 0 8px 0'}}>⚡ Brza procena</p>
              <p style={{color:'#888', fontSize:'15px', margin:'0 0 16px 0'}}>Pozovite za besplatnu procenu i ponudu na licu mesta</p>
              <a href="tel:+381641234567" style={{background:'#e87c2a', color:'#fff', padding:'14px 28px', borderRadius:'10px', fontWeight:700, fontSize:'16px', textDecoration:'none', display:'inline-block'}}>
                📞 Pozovi odmah
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
