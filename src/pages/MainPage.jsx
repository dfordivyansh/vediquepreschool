import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import OurPhilosophy from "../components/OurPhilosophy";
import Gallery from "../components/Gallery";
import Contact from './../components/Contact';
import Footer from "../components/Footer";
import OurPrograms from "../components/OurPrograms";
import Highlights from "../components/Highlights";


const MainPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <OurPhilosophy />
      <OurPrograms />
      <Highlights />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
};

export default MainPage;


