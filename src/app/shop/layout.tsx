import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Shop — Motori za kapije i video interfoni',
  description: 'Kupite motore za klizne i krilne kapije, video interfone, RFID sisteme i smart home opremu. Besplatna dostava Vojvodina.',
  alternates: { canonical: 'https://doorgatesistem.com/shop' },
  openGraph: {
    title: 'Web Shop — Door & Gate Sistem',
    description: 'Motori za kapije, video interfoni, RFID sistemi i smart home oprema.',
    url: 'https://doorgatesistem.com/shop',
    images: [{ url: '/hero2.webp', width: 1200, height: 630 }],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
