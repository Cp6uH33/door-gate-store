import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0f0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <span style={{
          color: '#ffc02a',
          fontSize: '12px',
          fontWeight: 900,
          letterSpacing: '-0.5px',
          display: 'flex',
        }}>
          DGS
        </span>
      </div>
    ),
    { ...size }
  );
}
