import React from "react";
import { Helmet } from "react-helmet";

import Contact from "../components/Contact";
import Footer from "../components/Footer";
import LKG from "../components/LKG";
import SEOContent from "../components/SEOContent";
import FAQSection from './../components/FAQSection';

const LKGPage = () => {
  return (
    <>
      <Helmet>
        <title>
          LKG Program | Vedique Preschool Bandlaguda Jagir Hyderabad
        </title>

        <meta
          name="description"
          content="Vedique Preschool offers an engaging Lower Kindergarten (LKG) program in Bandlaguda Jagir Hyderabad focusing on creativity, social development and early academic skills."
        />

        <meta
          name="keywords"
          content="LKG school Hyderabad, LKG admission Bandlaguda Jagir, lower kindergarten Hyderabad, preschool LKG program Telangana, Vedique Preschool LKG"
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="LKG Program | Vedique Preschool Hyderabad" />

        <meta
          property="og:description"
          content="Discover the Lower Kindergarten (LKG) program at Vedique Preschool Hyderabad designed to nurture curiosity, creativity and confidence."
        />

        <meta property="og:type" content="website" />
      </Helmet>

      <LKG />
      {/* 🔥 SEO CONTENT */}
      <SEOContent slug="lkg" />
      <Contact />
      <FAQSection category="lkg" />
      <Footer />
    </>
  );
};

export default LKGPage;