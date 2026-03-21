import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/contexts/CartContext';

export const metadata: Metadata = {
  title: 'Door & Gate Sistem — Profesionalna automatizacija',
  description: 'Motori za kapije, video interfoni i pametni sistemi. Prodaja i montaža širom Srbije.',
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
