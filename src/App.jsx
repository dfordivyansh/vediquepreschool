import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ===== PAGES ===== */
import MainPage from "./pages/MainPage";
import FullGallery from "./pages/FullGallery";
import PlaygroupPage from "./pages/PlaygroupPage";
import NurseryPage from "./pages/NurseryPage";
import LKGPage from "./pages/LKGPage";
import UKGPage from "./pages/UKGPage";
import ParentToddlerPage from "./pages/ParentToddlerPage";
import DaycarePage from "./pages/DaycarePage";
import EnrichmentProgramsPage from "./pages/EnrichmentProgramsPage";

/* ===== LOADER ===== */
const Loader = () => (
  <>
    {/* Font for loader text */}
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;500&display=swap"
    />

    <div className="loader-wrapper">
      <img
        src="/assets/logo.png"
        alt="Vedique Preschool"
        className="loader-logo"
      />

      <p className="loader-text">
        Wisdom, Uniquely Nurtured
      </p>

      <style>{`
        .loader-wrapper {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, #F3ECFB, #FFFFFF);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        /* ===== LOGO ===== */
        .loader-logo {
          width: 140px;
          opacity: 0;
          animation: logoReveal 1.8s ease-out forwards;
        }

        @keyframes logoReveal {
          0% {
            transform: scale(0.75);
            opacity: 0;
          }
          60% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* ===== TEXT ===== */
        .loader-text {
          margin-top: 26px;
          font-size: 26px;
          letter-spacing: 0.6px;
          color: #4B3C78;
          font-family: "Instrument Serif", serif;
          opacity: 0;
          transform: translateY(8px);
          animation:
            textAppear 1.6s ease-out forwards,
            textGlow 3.8s ease-in-out infinite;
          animation-delay: 0.9s, 2.6s;
          text-align: center;
        }

        /* Appear animation */
        @keyframes textAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Soft glow breathing */
        @keyframes textGlow {
          0% {
            text-shadow: 0 0 0 rgba(132,106,191,0);
          }
          50% {
            text-shadow:
              0 0 12px rgba(132,106,191,0.45),
              0 0 22px rgba(132,106,191,0.25);
          }
          100% {
            text-shadow: 0 0 0 rgba(132,106,191,0);
          }
        }

        /* ===== Mobile ===== */
        @media (max-width: 640px) {
          .loader-logo {
            width: 115px;
          }

          .loader-text {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  </>
);


const App = () => {
  const [loading, setLoading] = useState(true);

  /* ===== LOADER TIMER ===== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200); // ⏱ loader duration

    return () => clearTimeout(timer);
  }, []);

  /* ===== SHOW LOADER FIRST ===== */
  if (loading) return <Loader />;

  return (
    <>
      {/* ===== GLOBAL FADE-IN CSS ===== */}
      <style>{`
        body {
          animation: appFadeIn 0.7s ease-in-out;
        }

        @keyframes appFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/gallery" element={<FullGallery />} />
          <Route path="/programs/playgroup" element={<PlaygroupPage />} />
          <Route path="/programs/nursery" element={<NurseryPage />} />
          <Route path="/programs/lkg" element={<LKGPage />} />
          <Route path="/programs/ukg" element={<UKGPage />} />
          <Route
            path="/programs/parent-toddler"
            element={<ParentToddlerPage />}
          />
          <Route path="/programs/daycare" element={<DaycarePage />} />
          <Route
            path="/programs/enrichment"
            element={<EnrichmentProgramsPage />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
