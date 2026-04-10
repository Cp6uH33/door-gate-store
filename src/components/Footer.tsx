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

const navLinks = [
  { name: 'Početna', href: '/' },
  { name: 'Web Shop', href: '/shop' },
  { name: 'O nama', href: '/#why' },
  { name: 'Kontakt', href: '/kontakt' },
  { name: 'Korpa', href: '/cart' },
];

const linkStyle = {
  color: '#555',
  textDecoration: 'none',
  fontSize: '14px',
  fontFamily: "'Manrope', sans-serif",
  transition: 'color 0.2s',
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '44px 20px 20px' }}>

          <div className="footer-grid">

            {/* BREND */}
            <div>
              <Link href="/" style={{ display: 'inline-block', marginBottom: '16px' }}>
                <Image
                  src="/logodoorgatesistem.webp"
                  alt="Door & Gate Sistem"
                  width={120} height={36}
                  style={{ objectFit: 'contain' }}
                />
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="tel:+381631183898"
                  style={{ color: '#ffc02a', textDecoration: 'none', fontSize: '13px', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', gap: '7px', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M2 3a1 1 0 011-1h2l1 3-1.5 1.5a9 9 0 004 4L10 9l3 1v2a1 1 0 01-1 1C5 13 1 9 1 4a1 1 0 011-1z" />
                  </svg>
                  +381 63 118 3898
                </a>
                <a href="tel:+381691200104"
                  style={{ color: '#ffc02a', textDecoration: 'none', fontSize: '13px', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', gap: '7px', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M2 3a1 1 0 011-1h2l1 3-1.5 1.5a9 9 0 004 4L10 9l3 1v2a1 1 0 01-1 1C5 13 1 9 1 4a1 1 0 011-1z" />
                  </svg>
                  +381 69 120 0104
                </a>
                <a href="mailto:doorgatesistem@gmail.com"
                  style={{ color: '#ffc02a', textDecoration: 'none', fontSize: '13px', fontFamily: "'Manrope', sans-serif", transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                >
                  doorgatesistem@gmail.com
                </a>
                <span style={{ fontSize: '12px', color: '#ffc02a', fontFamily: "'Manrope', sans-serif", marginTop: '4px' }}>
                  Pon – Pet: 8:00 – 20:00
                </span>
              </div>
            </div>

            {/* SHOP */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#ffc02a', marginBottom: '16px', fontFamily: "'Space Grotesk', sans-serif" }}>
                Kategorije
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {shopLinks.map(link => (
                  <Link key={link.name} href={link.href} style={linkStyle}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* NAVIGACIJA */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#ffc02a', marginBottom: '16px', fontFamily: "'Space Grotesk', sans-serif" }}>
                Navigacija
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {navLinks.map(link => (
                  <Link key={link.name} href={link.href} style={linkStyle}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* BOTTOM */}
          <div style={{
            marginTop: '32px', paddingTop: '20px',
            borderTop: '1px solid #1a1a1a',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px',
          }}>
            <div style={{ fontSize: '13px', color: '#333', fontFamily: "'Manrope', sans-serif" }}>
              © {year} Door & Gate Sistem
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ffc02a' }} />
              <span style={{ fontSize: '12px', color: '#333', fontFamily: "'Manrope', sans-serif" }}>
                Srbija · Vojvodina · Subotica
              </span>
            </div>
            <a
              href="https://ignjatijedev.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '11px', color: '#2e2e2e', fontFamily: "'Manrope', sans-serif", textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#2e2e2e')}
            >
              Design &amp; Dev: ignjatije.dev
            </a>
          </div>

        </div>
      </footer>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 36px;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </>
  );
}