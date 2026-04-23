import React from "react";
import { Helmet } from "react-helmet";

import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Daycare from "../components/Daycare";
import SEOContent from "../components/SEOContent";
import FAQSection from "../components/FAQSection";

const DaycarePage = () => {
  return (
    <>
      <Helmet>
        <title>
          Daycare in Bandlaguda Jagir Hyderabad | Vedique Preschool
        </title>

        <meta
          name="description"
          content="Vedique Preschool offers safe and nurturing daycare services in Bandlaguda Jagir Hyderabad for children aged 1.5 to 8 years with engaging learning activities."
        />

        <meta
          name="keywords"
          content="daycare Hyderabad, daycare Bandlaguda Jagir, preschool daycare Hyderabad, child care Hyderabad, Vedique Preschool daycare, best daycare Telangana"
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Vedique Preschool Daycare Hyderabad" />

        <meta
          property="og:description"
          content="A safe and nurturing daycare environment for children in Bandlaguda Jagir Hyderabad with fun learning and caring supervision."
        />

        <meta property="og:type" content="website" />
      </Helmet>

      <Daycare />
      {/* 🔥 SEO CONTENT */}
      <SEOContent slug="daycare" />
      <Contact />
      <FAQSection category="daycare" />
      <Footer />
    </>
  );
};

export default DaycarePage;