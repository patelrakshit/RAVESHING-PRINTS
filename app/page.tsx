import { Hero } from '@/components/home/Hero';
import { TopSellers } from '@/components/home/TopSellers';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { Machineries } from '@/components/home/Machineries';

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <TopSellers />
      <TrendingProducts />
      <Machineries />
    </div>
  );
}
