import HeroSection from "../../components/home/HeroSection";
import Header from "../../components/layout/Header";
import TemTechno from "../../components/home/temtechno";
import IndustriesSection from "../../components/home/IndustriesSection";
import ServicesSection from "../../components/home/ServicesSection";
import AcrossIndia from "../../components/home/across-india";
import ProductsSection from "../../components/home/ProductsSection";
import WhyAllGeoSection from "../../components/home/WhyAllGeoSection";
import CTASection from "../../components/home/CTASection";
import Footer from "../../components/layout/Footer";

function HomePage() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <TemTechno />
        <IndustriesSection />
        <ServicesSection />
        <AcrossIndia />
        <ProductsSection />
        <WhyAllGeoSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}

export default HomePage;