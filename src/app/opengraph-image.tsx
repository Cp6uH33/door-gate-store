import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Door & Gate Sistem';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0f0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Zlatni glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,192,42,0.15) 0%, transparent 70%)',
          transform: 'translateX(-50%)',
          display: 'flex',
        }} />

        {/* Border top */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '4px',
          background: '#ffc02a',
          display: 'flex',
        }} />

        {/* Logo tekst */}
        <div style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#ffc02a',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '24px',
          display: 'flex',
        }}>
          DOOR & GATE SISTEM
        </div>

        {/* Glavni naslov */}
        <div style={{
          fontSize: '64px',
          fontWeight: 900,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.1,
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <span>Automatizacija</span>
          <span style={{ color: '#ffc02a' }}>kapija i ulaza</span>
        </div>

        {/* Opis */}
        <div style={{
          fontSize: '24px',
          color: 'rgba(255,255,255,0.6)',
          textAlign: 'center',
          maxWidth: '700px',
          lineHeight: 1.5,
          marginBottom: '48px',
          display: 'flex',
        }}>
          Motori za kapije • Video interfoni • Smart Home • Srbija
        </div>

        {/* Dugme */}
        <div style={{
          background: '#ffc02a',
          color: '#0f0f0f',
          fontSize: '22px',
          fontWeight: 700,
          padding: '16px 48px',
          borderRadius: '100px',
          display: 'flex',
        }}>
          doorgatesistem.com
        </div>

        {/* Border bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '4px',
          background: '#ffc02a',
          display: 'flex',
        }} />
      </div>
    ),
    { ...size }
  );
}
