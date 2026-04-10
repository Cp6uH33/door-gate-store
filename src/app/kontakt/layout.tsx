import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt — Besplatna procena i ponuda',
  description: 'Kontaktirajte Door & Gate Sistem za besplatnu procenu. Dostupni pon-pet 8-20h. Subotica, Vojvodina.',
  alternates: { canonical: 'https://doorgatesistem.com/kontakt' },
  openGraph: {
    title: 'Kontakt — Door & Gate Sistem',
    description: 'Besplatna procena i ponuda. Dostupni pon-pet 8-20h.',
    url: 'https://doorgatesistem.com/kontakt',
    images: [{ url: '/hero2.png', width: 1200, height: 630 }],
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
