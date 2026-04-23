import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import OurPhilosophy from "../components/OurPhilosophy";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import OurPrograms from "../components/OurPrograms";
import Highlights from "../components/Highlights";
import PromoPopup from "../components/PromoPopup";
import ReviewsSection from "../components/ReviewsSection";
import FAQSection from "../components/FAQSection";

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;

      setTimeout(() => {
        const el = document.getElementById(id);

        if (el) {
          const y =
            el.getBoundingClientRect().top +
            window.pageYOffset -
            96;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 300);
    }
  }, [location]);

  return (
    <>
      <PromoPopup />

      <Helmet>
        <title>
          Vedique Preschool | Best Preschool in Bandlaguda Jagir Hyderabad
        </title>
      </Helmet>

      <Navbar />
      <Hero />
      <OurPhilosophy />
      <OurPrograms />
      <Highlights />
      <Gallery />
      <ReviewsSection />
      <Contact />
      <FAQSection category="all" limit={8} />
      <Footer />
    </>
  );
};

export default MainPage;