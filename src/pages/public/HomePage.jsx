import HeroSection from "../../components/home/HeroSection";
import TemTechno from "../../components/home/temtechno";
import IndustriesSection from "../../components/home/IndustriesSection";
import ClientsSection from "../../components/home/ClientsSection";
import ServicesSection from "../../components/home/ServicesSection";
import AcrossIndia from "../../components/home/across-india";
import ProductsSection from "../../components/home/ProductsSection";
import WhyAllGeoSection from "../../components/home/WhyAllGeoSection";
import BlogSection from "../../components/home/BlogSection";
import CTASection from "../../components/home/CTASection";

function HomePage() {
  return (
    <main>
      <HeroSection />
      <ClientsSection />
      <TemTechno />
      <IndustriesSection />
      <ServicesSection />
      <AcrossIndia />
      <ProductsSection />
      <WhyAllGeoSection />
      <BlogSection />
      <CTASection />
    </main>
  );
}

export default HomePage;