import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import ProductsSection from "@/components/home/ProductsSection";
import EventsSection from "@/components/home/EventsSection";
import NewsSection from "@/components/home/NewsSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <AboutSection />
        <FacilitiesSection />
        <ProductsSection />
      <EventsSection />
      <NewsSection />
      </main>

      <Footer />
    </>
  );
}


// ugyuybubbub