import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{background:'#0a0a0a', borderTop:'1px solid #1e1e1e', padding:'48px 24px 24px'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'40px', marginBottom:'40px'}}>

          {/* Brand */}
          <div>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px'}}>
              <div style={{width:'40px', height:'40px', background:'#e87c2a', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px'}}>🚪</div>
              <span style={{color:'#f0f0f0', fontWeight:900, fontSize:'18px'}}>Door <span style={{color:'#e87c2a'}}>&</span> Gate Sistem</span>
            </div>
            <p style={{color:'#444', fontSize:'15px', lineHeight:1.7, margin:'0 0 20px 0', maxWidth:'280px'}}>
              Profesionalna automatizacija kapija, interfoni i pametni sistemi za dom i posao.
            </p>
            <div style={{display:'flex', gap:'12px'}}>
              {['Facebook', 'Instagram'].map(s => (
                <a key={s} href="#" style={{background:'#1a1a1a', border:'1px solid #2a2a2a', color:'#888', padding:'8px 16px', borderRadius:'8px', fontSize:'13px', fontWeight:600, textDecoration:'none'}}>
                  {s === 'Facebook' ? '📘' : '📸'} {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigacija */}
          <div>
            <h4 style={{color:'#888', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 16px 0'}}>Navigacija</h4>
            {[{name:'Web Shop', href:'/'},{name:'Proizvodi', href:'/proizvodi'},{name:'Kontakt', href:'/kontakt'},{name:'Korpa', href:'/cart'}].map(item => (
              <Link key={item.href} href={item.href} style={{display:'block', color:'#555', fontSize:'15px', textDecoration:'none', marginBottom:'10px', fontWeight:500}}>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Kategorije */}
          <div>
            <h4 style={{color:'#888', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 16px 0'}}>Kategorije</h4>
            {['Motori za kapije','Interfoni','RFID sistemi','Brave','Smart Home'].map(cat => (
              <Link key={cat} href="/proizvodi" style={{display:'block', color:'#555', fontSize:'15px', textDecoration:'none', marginBottom:'10px', fontWeight:500}}>
                {cat}
              </Link>
            ))}
          </div>

          {/* Kontakt */}
          <div>
            <h4 style={{color:'#888', fontSize:'12px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 16px 0'}}>Kontakt</h4>
            {[
              {icon:'📞', text:'+381 64 123 4567'},
              {icon:'📧', text:'info@doorgatesistem.com'},
              {icon:'📍', text:'Novi Sad, Vojvodina'},
              {icon:'⏰', text:'Pon-Sub: 8-20h'},
            ].map(({icon, text}) => (
              <p key={text} style={{color:'#555', fontSize:'14px', margin:'0 0 10px 0'}}>
                {icon} {text}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{borderTop:'1px solid #1a1a1a', paddingTop:'24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <p style={{color:'#333', fontSize:'13px', margin:0}}>© 2025 Door & Gate Sistem. Sva prava zadržana.</p>
          <p style={{color:'#333', fontSize:'13px', margin:0}}>Novi Sad, Srbija 🇷🇸</p>
        </div>
      </div>
    </footer>
  );
}
