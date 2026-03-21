"use client";
import Link from 'next/link';

const cols = [
  {
    title: 'Shop',
    links: [
      { label: 'Video interfoni', href: '/shop?cat=interfoni' },
      { label: 'Motori za kapije', href: '/shop?cat=motori' },
      { label: 'RFID sistemi', href: '/shop?cat=rfid' },
      { label: 'Brave i cilindri', href: '/shop?cat=brave' },
      { label: 'Smart Home', href: '/shop?cat=smart' },
    ],
  },
  {
    title: 'Firma',
    links: [
      { label: 'O nama', href: '/' },
      { label: 'Reference', href: '/' },
      { label: 'Servis', href: '/' },
      { label: 'Blog', href: '/' },
    ],
  },
  {
    title: 'Podrška',
    links: [
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'FAQ', href: '/' },
      { label: 'Politika vraćanja', href: '/' },
      { label: 'Dostava', href: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a', padding: '48px 0 28px' }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid #1a1a1a',
          marginBottom: '28px',
        }}>

          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '32px', height: '32px', background: '#ffc02a',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#0e0f11" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="2" width="12" height="14" rx="2" />
                  <circle cx="11" cy="9" r="1.5" />
                  <line x1="3" y1="6" x2="15" y2="6" />
                </svg>
              </div>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0f0' }}>
                Door & Gate Sistem
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, maxWidth: '260px' }}>
              Profesionalna automatizacija kapija, interfoni i sistemi za kontrolu pristupa. Prodaja i montaža širom Srbije.
            </p>
          </div>

          {/* Link cols */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f0f0f0', marginBottom: '16px' }}>
                {col.title}
              </div>
              {col.links.map(l => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  style={{ display: 'block', fontSize: '13px', color: '#555', padding: '4px 0', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffc02a')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#444' }}>
            © 2026 Door & Gate Sistem. Sva prava zadržana.
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privatnost', 'Uslovi korišćenja'].map(label => (
              <Link
                key={label}
                href="/"
                style={{ fontSize: '12px', color: '#444', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#f0f0f0')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#444')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
