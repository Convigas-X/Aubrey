import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { PartnersMarquee } from '@/components/PartnersMarquee';
import { FeaturedListings } from '@/components/FeaturedListings';
import { AboutSection } from '@/components/AboutSection';
import { StatsSection } from '@/components/StatsSection';
import { ForbesSection } from '@/components/ForbesSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <PartnersMarquee />
        <AboutSection />
        <StatsSection />
        <FeaturedListings />
        <ForbesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
