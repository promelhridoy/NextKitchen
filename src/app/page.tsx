import CategoriesSection from "@/components/home/CategoriesSection";
import CTASection from "@/components/home/CTASection";
import EditorsPicksSection from "@/components/home/EditorsPicksSection";
import FAQSection from "@/components/home/FAQSection";
import FeaturedCreatorsSection from "@/components/home/FeaturedCreatorsSection";
import Hero from "@/components/home/Hero";
import MostViewedSection from "@/components/home/MostViewedSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import StatsCounterSection from "@/components/home/StatsCounterSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrendingSection from "@/components/home/TrendingSection";



export default function Home() {
  return (
     <main>
     <Hero />
      <TrendingSection />
      <CategoriesSection />
      <EditorsPicksSection />
      <MostViewedSection />
      <FeaturedCreatorsSection />
      <StatsCounterSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
