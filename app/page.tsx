import Feature from '@/components/feature/feature';
import HeroSection from '@/components/herosection/herosection';

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <Feature />
    </div>
  );
}
