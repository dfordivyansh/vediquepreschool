import React from "react";
import { Helmet } from "react-helmet";

import Contact from "../components/Contact";
import Footer from "../components/Footer";
import UKG from "../components/UKG";

const UKGPage = () => {
  return (
    <>
      <Helmet>
        <title>
          UKG Program | Vedique Preschool Bandlaguda Jagir Hyderabad
        </title>

        <meta
          name="description"
          content="Vedique Preschool offers an engaging Upper Kindergarten (UKG) program in Bandlaguda Jagir Hyderabad focusing on confidence, creativity and strong academic foundations."
        />

        <meta
          name="keywords"
          content="UKG school Hyderabad, UKG admission Bandlaguda Jagir, upper kindergarten Hyderabad, preschool UKG program Telangana, Vedique Preschool UKG"
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="UKG Program | Vedique Preschool Hyderabad" />

        <meta
          property="og:description"
          content="Explore the Upper Kindergarten (UKG) program at Vedique Preschool Hyderabad designed to prepare children confidently for primary school."
        />

        <meta property="og:type" content="website" />
      </Helmet>

      <UKG />
      <Contact />
      <Footer />
    </>
  );
};

export default UKGPage;