import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/contexts/CartContext';

export const metadata: Metadata = {
  title: {
    default: 'Door & Gate Sistem — Motori za kapije i video interfoni',
    template: '%s | Door & Gate Sistem',
  },
  description: 'Prodaja, montaža i servis motora za kapije, video interfona i pametnih sistema za kontrolu pristupa. Dostava i montaža širom Srbije.',
  keywords: ['motori za kapije', 'video interfoni', 'automatizacija kapija', 'klizne kapije', 'krilne kapije', 'smart home', 'Srbija', 'Vojvodina'],
  authors: [{ name: 'Door & Gate Sistem' }],
  creator: 'Door & Gate Sistem',
  publisher: 'Door & Gate Sistem',
  metadataBase: new URL('https://doorgatesistem.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: 'https://doorgatesistem.com',
    siteName: 'Door & Gate Sistem',
    title: 'Door & Gate Sistem — Motori za kapije i video interfoni',
    description: 'Prodaja, montaža i servis motora za kapije, video interfona i pametnih sistema za kontrolu pristupa. Dostava i montaža širom Srbije.',
    images: [
      {
        url: '/hero2.png',
        width: 1200,
        height: 630,
        alt: 'Door & Gate Sistem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Door & Gate Sistem — Motori za kapije i video interfoni',
    description: 'Prodaja, montaža i servis motora za kapije, video interfona i pametnih sistema.',
    images: ['/hero2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
