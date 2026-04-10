import type { Metadata } from 'next';

const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
const WC_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const WC_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const res = await fetch(
      `${WC_URL}/products/${id}?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`,
      { next: { revalidate: 3600 } }
    );
    const product = await res.json();
    
    if (!product?.id) return { title: 'Proizvod — Door & Gate Sistem' };
    
    const description = product.short_description?.replace(/<[^>]*>/g, '').trim() || product.name;
    const image = product.images?.[0]?.src || '/hero2.webp';
    const price = parseFloat(product.price).toLocaleString('sr-RS');
    
    return {
      title: `${product.name} — Door & Gate Sistem`,
      description: `${description} Cena: ${price} RSD. Dostava širom Srbije.`,
      alternates: { canonical: `https://doorgatesistem.com/proizvodi/${id}` },
      openGraph: {
        title: product.name,
        description: `${description} Cena: ${price} RSD.`,
        url: `https://doorgatesistem.com/proizvodi/${id}`,
        images: [{ url: image, width: 800, height: 800, alt: product.name }],
        type: 'website',
      },
    };
  } catch {
    return { title: 'Proizvod — Door & Gate Sistem' };
  }
}

export default function ProizvodLayout({ children }: { children: React.ReactNode }) {
  return children;
}
