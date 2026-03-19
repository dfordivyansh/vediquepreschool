import React from "react";
import { Helmet } from "react-helmet";

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

const MainPage = () => {
  return (
    <>
      <PromoPopup />
      <Helmet>
        <title>
          Vedique Preschool | Best Preschool in Bandlaguda Jagir Hyderabad
        </title>

        <meta
          name="description"
          content="Vedique Preschool in Bandlaguda Jagir Hyderabad offers playgroup, nursery, LKG, UKG and daycare programs inspired by Montessori and Waldorf philosophies. Admissions open 2026-27."
        />

        <meta
          name="keywords"
          content="Vedique Preschool, preschool in Hyderabad, Bandlaguda Jagir preschool, best preschool Telangana, play school Hyderabad, nursery school Hyderabad, LKG UKG Hyderabad, daycare Hyderabad, Montessori preschool Hyderabad, Waldorf preschool Hyderabad"
        />

        <meta name="author" content="Vedique Preschool" />

        <meta property="og:title" content="Vedique Preschool Hyderabad" />

        <meta
          property="og:description"
          content="A mindful preschool in Bandlaguda Jagir Hyderabad where children grow with confidence, creativity and strong values."
        />

        <meta property="og:type" content="website" />
      </Helmet>
      
      <Navbar />
      <Hero />
      <OurPhilosophy />
      <OurPrograms />
      <Highlights />
      <Gallery />
      <ReviewsSection />
      <Contact />
      <Footer />
    </>
  );
};

export default MainPage;