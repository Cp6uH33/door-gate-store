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
  description: 'Prodaja motora za kapije NICE, FAAC, BFT i TMT. Prihvatnici, graničnici i delovi za klizne kapije. Video interfoni i smart home sistemi. Dostava širom Srbije.',
  keywords: ['motori za kapije', 'NICE motori za kapije', 'FAAC motori za kapije', 'BFT motori za kapije', 'TMT Husky', 'prihvatnik za kliznu kapiju', 'graničnik za kapiju', 'video interfoni', 'automatizacija kapija', 'klizne kapije', 'krilne kapije', 'smart home', 'Srbija', 'Vojvodina', 'road 400 kit'],
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
    description: 'Prodaja motora za kapije NICE, FAAC, BFT i TMT. Prihvatnici, graničnici i delovi za klizne kapije. Video interfoni i smart home sistemi. Dostava širom Srbije.',
    images: [
      {
        url: '/hero2.webp',
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
    images: ['/hero2.webp'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Da li vršite montažu motora za kapije?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Da, vršimo profesionalnu montažu motora za klizne i krilne kapije širom Srbije. Kontaktirajte nas za besplatnu procenu."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Koje brendove motora za kapije prodajete?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Prodajemo motore vodećih svetskih brendova za automatizaciju kapija i ulaza."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Da li vršite dostavu širom Srbije?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Da, vršimo dostavu na celoj teritoriji Srbije. Besplatna dostava za područje Vojvodine."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Kako mogu da naručim proizvod?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Možete naručiti putem našeg web shopa na doorgatesistem.com, telefonom na +381631183898 ili +381691200104, ili putem email-a doorgatesistem@gmail.com."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Da li prodajete video interfone?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Da, u ponudi imamo color video interfone, Wi-Fi smart interfone i RFID sisteme za kontrolu pristupa."
                  }
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Door & Gate Sistem",
              "description": "Prodaja, montaža i servis motora za kapije, video interfona i pametnih sistema za kontrolu pristupa.",
              "url": "https://doorgatesistem.com",
              "telephone": "+381631183898",
              "email": "doorgatesistem@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Breganličanska 7",
                "addressLocality": "Subotica",
                "addressCountry": "RS"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 46.075972,
                "longitude": 19.667956
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "20:00"
                }
              ],
              "sameAs": [
                "https://doorgatesistem.com"
              ],
              "priceRange": "$$",
              "image": "https://doorgatesistem.com/hero2.webp",
              "areaServed": {
                "@type": "Country",
                "name": "Serbia"
              }
            })
          }}
        />
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
