"use client";
import Link from 'next/link';

const features = [
  {
    title: 'Garancija kvaliteta',
    text: 'Svi proizvodi prolaze rigorozno testiranje i dolaze sa garancijom. Iza svakog artikla stoji servis.',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M11 2L4 6v5c0 4.5 3 8.1 7 9 4-.9 7-4.5 7-9V6z" />
        <path d="M8 11l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Montaža za 48 sati',
    text: 'Naš tim dolazi do vas i profesionalno instalira sistem. Od narudžbine do funkcionalne kapije za dva dana.',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="11" cy="11" r="9" />
        <path d="M11 6v5l3 3" />
      </svg>
    ),
  },
  {
    title: 'Konkurentne cene',
    text: 'Direktan uvoz od vodećih brendova znači bolje cene bez posrednika. Redovne akcije i popusti za veće projekte.',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M20 7H2v10a2 2 0 002 2h14a2 2 0 002-2V7z" />
        <path d="M16 3H6L2 7h18z" />
      </svg>
    ),
  },
  {
    title: 'Servis i podrška',
    text: 'Dostupni smo i nakon kupovine. Stručni savet, popravke i redovni servisi — na jednom mestu.',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 8l7.9-4.7a2 2 0 012.2 0L21 8" />
        <path d="M5 9.3V19a1 1 0 001 1h10a1 1 0 001-1V9.3" />
      </svg>
    ),
  },
];

const checkItems = [
  'Pregled terena besplatan',
  'Ponuda u roku od 24h',
  'Montaža u roku od 48h',
  'Servis i garancija posle',
];

export default function WhyUsSection() {
  return (
    <section id="why" style={{ padding: '80px 0', background: '#0f0f0f' }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

          {/* LEFT */}
          <div>
            <div style={{ marginBottom: '36px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '11px', fontWeight: 500, letterSpacing: '0.8px',
                textTransform: 'uppercase', color: '#ffc02a',
                background: 'rgba(255,192,42,0.15)', padding: '5px 12px',
                borderRadius: '100px',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffc02a', display: 'inline-block' }} />
                Zašto mi?
              </span>
              <h2 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800,
                letterSpacing: '-1.5px', lineHeight: 1.1,
                color: '#f0f0f0', marginTop: '12px',
              }}>
                Vaša sigurnost<br />je naš posao
              </h2>
              <p style={{ fontSize: '15px', color: '#999', marginTop: '8px', maxWidth: '500px' }}>
                Više od 500 instalacija i 5 godina iskustva govore umesto nas.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {features.map((f, i) => (
                <div
                  key={f.title}
                  style={{
                    display: 'flex', gap: '20px', alignItems: 'flex-start',
                    padding: '24px 0',
                    borderBottom: i < features.length - 1 ? '1px solid #222' : 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    const icon = e.currentTarget.querySelector<HTMLElement>('.why-icon');
                    if (icon) {
                      icon.style.background = '#ffc02a';
                      icon.style.borderColor = '#ffc02a';
                      icon.style.color = '#0e0f11';
                    }
                  }}
                  onMouseLeave={e => {
                    const icon = e.currentTarget.querySelector<HTMLElement>('.why-icon');
                    if (icon) {
                      icon.style.background = 'rgba(255,192,42,0.1)';
                      icon.style.borderColor = 'rgba(255,192,42,0.2)';
                      icon.style.color = '#ffc02a';
                    }
                  }}
                >
                  <div
                    className="why-icon"
                    style={{
                      width: '48px', height: '48px', flexShrink: 0,
                      background: 'rgba(255,192,42,0.1)',
                      borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1.5px solid rgba(255,192,42,0.2)',
                      transition: 'all 0.2s', color: '#ffc02a',
                    }}
                  >
                    <div style={{ width: '22px', height: '22px' }}>{f.icon}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: '#f0f0f0' }}>
                      {f.title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#777', lineHeight: 1.6 }}>
                      {f.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — CTA card */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '32px', padding: '48px 40px',
            position: 'relative', overflow: 'hidden',
            border: '1px solid #2a2a2a',
          }}>
            <div style={{
              position: 'absolute', top: '-80px', right: '-80px',
              width: '280px', height: '280px', pointerEvents: 'none',
              background: 'radial-gradient(circle, rgba(255,192,42,0.15) 0%, transparent 70%)',
            }} />
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#ffc02a', marginBottom: '12px' }}>
              Kontaktirajte nas
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#f0f0f0', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: '16px' }}>
              Besplatna<br />konsultacija
            </div>
            <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, marginBottom: '32px' }}>
              Niste sigurni koji sistem odgovara vašem objektu? Pozovite nas ili pišite — savet je besplatan, a mi dolazimo na teren.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {checkItems.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#ccc' }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: '#ffc02a', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#0e0f11" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 5.5l2.5 2.5 4.5-4.5" />
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/kontakt"
              style={{
                background: '#ffc02a', color: '#0e0f11',
                fontSize: '14px', fontWeight: 600,
                padding: '14px 28px', borderRadius: '100px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#ffcc4a';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 6px 20px rgba(255,192,42,0.3)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#ffc02a';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              Zakažite konsultaciju
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 7h8M8 4l3 3-3 3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
