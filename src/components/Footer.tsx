"use client";
import Link from 'next/link';
import Image from 'next/image';

const shopLinks = [
  { name: 'Motori za klizne kapije', href: '/shop?cat=motori-za-klizne-kapije' },
  { name: 'Motori za krilne kapije', href: '/shop?cat=motori-za-krilne-kapije' },
  { name: 'Video interfoni', href: '/shop?cat=interfoni' },
  { name: 'Smart home sistemi', href: '/shop?cat=smart-home-sistemi' },
  { name: 'Delovi za kapije', href: '/shop?cat=delovi-za-kapije' },
];

const companyLinks = [
  { name: 'O nama', href: '/#why' },
  { name: 'Kontakt', href: '/kontakt' },
  { name: 'Web Shop', href: '/shop' },
];

const supportLinks = [
  { name: 'Korpa', href: '/cart' },
  { name: 'Checkout', href: '/checkout' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '60px 20px 32px' }}>

          <div className="footer-grid">

            {/* BREND */}
            <div>
              <Link href="/" style={{ display: 'inline-block', marginBottom: '20px' }}>
                <Image
                  src="/logodoorgatesistem.webp"
                  alt="Door & Gate Sistem"
                  width={130} height={40}
                  style={{ objectFit: 'contain' }}
                />
              </Link>
              <p style={{ fontSize: '14px', color: '#ededeb', lineHeight: 1.7, marginBottom: '20px', maxWidth: '260px', fontFamily: "'Manrope', sans-serif" }}>
                Prodaja NICE, FAAC, BFT i TMT motora za kapije. Prihvatnici i delovi za klizne kapije. Video interfoni i smart home sistemi. Montaža i servis širom Srbije.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="tel:+381631183898" style={{ color: '#ffc02a', textDecoration: 'none', fontSize: '14px', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffcc4a')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M2 3a1 1 0 011-1h2l1 3-1.5 1.5a9 9 0 004 4L10 9l3 1v2a1 1 0 01-1 1C5 13 1 9 1 4a1 1 0 011-1z" />
                  </svg>
                  +381 63 118 3898
                </a>
                <a href="tel:+381691200104" style={{ color: '#ffc02a', textDecoration: 'none', fontSize: '14px', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffcc4a')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M2 3a1 1 0 011-1h2l1 3-1.5 1.5a9 9 0 004 4L10 9l3 1v2a1 1 0 01-1 1C5 13 1 9 1 4a1 1 0 011-1z" />
                  </svg>
                  +381 69 120 0104
                </a>
                <a href="mailto:doorgatesistem@gmail.com" style={{ color: '#ffc02a', textDecoration: 'none', fontSize: '13px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                >
                  doorgatesistem@gmail.com
                </a>
              </div>
            </div>

            {/* SHOP */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#ffc02a', marginBottom: '20px', fontFamily: "'Space Grotesk', sans-serif" }}>
                Shop
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {shopLinks.map(link => (
                  <Link key={link.name} href={link.href} style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* FIRMA */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#ffc02a', marginBottom: '20px', fontFamily: "'Space Grotesk', sans-serif" }}>
                Door & Gate system
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {companyLinks.map(link => (
                  <Link key={link.name} href={link.href} style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* PODRŠKA */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#ffc02a', marginBottom: '20px', fontFamily: "'Space Grotesk', sans-serif" }}>
                Podrška
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {supportLinks.map(link => (
                  <Link key={link.name} href={link.href} style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: '24px', padding: '16px', background: '#111', borderRadius: '12px', border: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: '12px', color: '#ededeb', marginBottom: '4px', fontFamily: "'Manrope', sans-serif" }}>Radno vreme</div>
                <div style={{ fontSize: '13px', color: '#ededeb', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>Pon – Pet: 8:00 – 20:00</div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div style={{
            marginTop: '48px', paddingTop: '24px',
            borderTop: '1px solid #1a1a1a',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
          }}>
            <div style={{ fontSize: '13px', color: '#ededeb', fontFamily: "'Manrope', sans-serif" }}>
              © {year} Door & Gate Sistem. Sva prava zadržana.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffc02a' }} />
              <span style={{ fontSize: '12px', color: '#ededeb', fontFamily: "'Manrope', sans-serif" }}>
                Srbija • Vojvodina • Subotica
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </>
  );
}
