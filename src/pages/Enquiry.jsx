import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Users, Smile, BookOpen, Palette } from "lucide-react";
import Footer from "../components/Footer";

/* ===== FONT LOADER ===== */
const FontLoader = () => (
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Nunito:wght@400;600&display=swap"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Chewy&display=swap"
      rel="stylesheet"
    />
  </>
);

export default function Enquiry() {
  const navigate = useNavigate();

  /* ===== SCROLL TO TOP ===== */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth animation
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Preschool Admission Enquiry | Vedique Preschool Hyderabad
        </title>

        <meta
          name="description"
          content="Submit your admission enquiry for Vedique Preschool in Bandlaguda Jagir Hyderabad. Admissions open for Playgroup, Nursery, LKG, UKG and Daycare programs."
        />

        <meta
          name="keywords"
          content="preschool admission Hyderabad, play school admission Hyderabad, nursery admission Bandlaguda Jagir, Vedique Preschool admission, daycare admission Hyderabad"
        />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Vedique Preschool Admission Enquiry" />

        <meta
          property="og:description"
          content="Apply for admission at Vedique Preschool Hyderabad for Playgroup, Nursery, LKG, UKG and Daycare programs."
        />

        <meta property="og:type" content="website" />
      </Helmet>

      <FontLoader />

      <div
        className="w-full min-h-screen relative"
        style={{
          background:
            "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 80%)",
          fontFamily: "'Comic Neue', 'Nunito', sans-serif",
        }}
      >
        {/* ===== BACKGROUND ICONS ===== */}
        {[Users, Smile, BookOpen, Palette].map((Icon, i) => (
          <Icon
            key={i}
            className="absolute text-[#6B5FA7]/10
              w-[72px] h-[72px]
              sm:w-[96px] sm:h-[96px]
              md:w-[120px] md:h-[120px]
              lg:w-[140px] lg:h-[140px]"
            style={{
              top: `${10 + i * 20}%`,
              left: i % 2 === 0 ? "4%" : "88%",
            }}
          />
        ))}

        {/* ===== HERO ===== */}
        <section className="relative h-[40vh] sm:h-[45vh] w-full">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md
            px-5 py-2 rounded-full font-semibold text-[#2E1A47]
            shadow-lg hover:scale-105 transition cursor-pointer"
          >
            ← Back to Home
          </button>

          <div className="absolute inset-0 flex items-center justify-center text-center">
            <img
              src="/assets/flower.webp"
              alt="Vedique Preschool flower background"
              className="absolute w-[200px] sm:w-[260px] opacity-15 animate-flower-zoom pointer-events-none"
            />

            <div className="relative px-4">
              <h1
                className="font-extrabold tracking-tight
                text-[42px] sm:text-[56px] md:text-[64px]
                text-[#6B4FA3]"
                style={{ fontFamily: "'Chewy', system-ui, sans-serif" }}
              >
                Admission Enquiry
              </h1>

              <p
                className="mt-2
                text-[18px] sm:text-[22px] md:text-[26px]
                text-[#2E1A47] font-semibold"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                We’d Love To Hear From You
              </p>
            </div>
          </div>
        </section>

        {/* ===== GOOGLE FORM ===== */}
        <div className="w-full relative z-10">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdkZyvLGlpylHEm3TGtqsZVof0xdOevXaF81wJDE_v2ONBX_g/viewform?embedded=true"
            width="100%"
            height="1900"
            frameBorder="0"
            style={{ display: "block" }}
            title="Vedique Preschool Admission Enquiry Form"
          >
            Loading…
          </iframe>
        </div>

        {/* ===== FLOWER ANIMATION ===== */}
        <style>{`
          @keyframes flowerZoom {
            0% { transform: scale(0.96); }
            50% { transform: scale(1.06); }
            100% { transform: scale(0.96); }
          }

          .animate-flower-zoom {
            animation: flowerZoom 6s ease-in-out infinite;
          }
        `}</style>
      </div>

      <Footer />
    </>
  );
}