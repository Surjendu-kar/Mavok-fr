import Feature from '@/components/home/feature';
import HeroSection from '@/components/home/herosection/herosection';

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <Feature />
    </div>
  );
}
