import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import StatsSection from '@/components/home/StatsSection';
import Freelance from '@/components/home/Freelance';

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <AboutSection />
      <FeaturedProjects />
      <Freelance />
      <StatsSection />
    </PageLayout>
  );
};

export default Index;
