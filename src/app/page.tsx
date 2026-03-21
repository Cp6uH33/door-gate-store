import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import CategoriesSection from '@/components/CategoriesSection';
import ProductsSection from '@/components/ProductsSection';
import WhyUsSection from '@/components/WhyUsSection';
import ContactSection from '@/components/ContactSection';

export default function LandingPage() {
  return (
    <main style={{ background: '#0f0f0f', color: '#f0f0f0', overflowX: 'hidden' }}>
      <HeroSection />
      <TrustBar />
      <CategoriesSection />
      <ProductsSection />
      <WhyUsSection />
      <ContactSection />
    </main>
  );
}
