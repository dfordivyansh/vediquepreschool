import React from "react";
import { Helmet } from "react-helmet";

import PlayGroup from "../components/PlayGroup";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SEOContent from "../components/SEOContent";
import FAQSection from './../components/FAQSection';

const PlaygroupPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Playgroup Program | Vedique Preschool Bandlaguda Jagir Hyderabad
        </title>

        <meta
          name="description"
          content="Vedique Preschool offers a nurturing Playgroup program in Bandlaguda Jagir Hyderabad for children aged 2–3 years focusing on playful learning, creativity and social development."
        />

        <meta
          name="keywords"
          content="playgroup Hyderabad, play school Hyderabad, playgroup admission Bandlaguda Jagir, preschool playgroup Telangana, Vedique Preschool playgroup"
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Playgroup Program | Vedique Preschool Hyderabad" />

        <meta
          property="og:description"
          content="Discover the Playgroup program at Vedique Preschool Hyderabad designed to encourage curiosity, creativity and joyful learning for young children."
        />

        <meta property="og:type" content="website" />
      </Helmet>

      <PlayGroup />
      {/* 🔥 SEO CONTENT */}
      <SEOContent slug="playgroup" />
      <Contact />
      <FAQSection category="playgroup" />
      <Footer />
    </>
  );
};

export default PlaygroupPage;