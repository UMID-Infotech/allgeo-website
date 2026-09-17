import HeroSection from "../../components/home/HeroSection";
import Header from "../../components/layout/Header";
import TemTechno from "../../components/home/temtechno";
import IndustriesSection from "../../components/home/IndustriesSection";
import ServicesSection from "../../components/home/ServicesSection";
import AcrossIndia from "../../components/home/across-india";

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
      </main>
    </>
  );
}

export default HomePage;