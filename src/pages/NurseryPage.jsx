import React from "react";
import { Helmet } from "react-helmet";

import Nursery from "../components/Nursery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const NurseryPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Nursery Program | Vedique Preschool Bandlaguda Jagir Hyderabad
        </title>

        <meta
          name="description"
          content="Vedique Preschool offers a nurturing Nursery program in Bandlaguda Jagir Hyderabad focused on early learning, creativity, communication and social development."
        />

        <meta
          name="keywords"
          content="nursery school Hyderabad, nursery admission Bandlaguda Jagir, preschool nursery program Hyderabad, best nursery school Telangana, Vedique Preschool nursery"
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Nursery Program | Vedique Preschool Hyderabad" />

        <meta
          property="og:description"
          content="Explore the Nursery program at Vedique Preschool Hyderabad designed to build curiosity, creativity and confidence in young learners."
        />

        <meta property="og:type" content="website" />
      </Helmet>

      <Nursery />
      <Contact />
      <Footer />
    </>
  );
};

export default NurseryPage;