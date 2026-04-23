import React from "react";
import { Helmet } from "react-helmet";

import Contact from "../components/Contact";
import Footer from "../components/Footer";
import EnrichmentPrograms from "../components/EnrichmentPrograms";
import SEOContent from "../components/SEOContent";
import FAQSection from './../components/FAQSection';

const EnrichmentProgramsPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Enrichment Programs for Kids | Vedique Preschool Hyderabad
        </title>

        <meta
          name="description"
          content="Vedique Preschool offers enrichment programs in Bandlaguda Jagir Hyderabad including creative arts, storytelling, learning labs and skill-based activities for children aged 4+ years."
        />

        <meta
          name="keywords"
          content="kids enrichment programs Hyderabad, after school activities Hyderabad, creative learning programs Hyderabad, child development programs Bandlaguda Jagir, Vedique Preschool enrichment programs"
        />

        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="Vedique Preschool Enrichment Programs Hyderabad"
        />

        <meta
          property="og:description"
          content="Explore enrichment programs at Vedique Preschool that support creativity, confidence and holistic development for children in Hyderabad."
        />

        <meta property="og:type" content="website" />
      </Helmet>

      <EnrichmentPrograms />
      {/* 🔥 SEO CONTENT */}
      <SEOContent slug="enrichmentprograms" />
      <Contact />
      <FAQSection category="enrichment" />
      <Footer />
    </>
  );
};

export default EnrichmentProgramsPage;