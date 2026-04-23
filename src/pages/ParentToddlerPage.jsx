import React from "react";
import { Helmet } from "react-helmet";

import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ParentToddler from "../components/ParentToddler";
import SEOContent from "../components/SEOContent";
import FAQSection from './../components/FAQSection';

const ParentToddlerPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Parent Toddler Program | Vedique Preschool Bandlaguda Jagir Hyderabad
        </title>

        <meta
          name="description"
          content="Vedique Preschool offers a Parent Toddler program in Bandlaguda Jagir Hyderabad designed to support early bonding, sensory learning and playful development for children aged 1.5 to 3 years."
        />

        <meta
          name="keywords"
          content="parent toddler program Hyderabad, toddler playgroup Hyderabad, early learning toddlers Hyderabad, Bandlaguda Jagir toddler program, Vedique Preschool toddler program"
        />

        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="Parent Toddler Program | Vedique Preschool Hyderabad"
        />

        <meta
          property="og:description"
          content="Explore the Parent Toddler program at Vedique Preschool Hyderabad where young children learn through play, bonding and guided activities."
        />

        <meta property="og:type" content="website" />
      </Helmet>

      <ParentToddler />
      {/* 🔥 SEO CONTENT */}
      <SEOContent slug="parenttoddler" />
      <Contact />
      <FAQSection category="parenttoddler" />
      <Footer />
    </>
  );
};

export default ParentToddlerPage;