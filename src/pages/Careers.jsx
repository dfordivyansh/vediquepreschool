import React from "react";
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

export default function Careers() {
  const navigate = useNavigate();

  return (
    <>
      {/* ===== SEO ===== */}
      <Helmet>
        <title>
          Careers | Vedique Preschool Hyderabad | Teaching Jobs in Bandlaguda Jagir
        </title>

        <meta
          name="description"
          content="Join the passionate teaching team at Vedique Preschool in Bandlaguda Jagir Hyderabad. Apply for preschool teacher, daycare staff and early childhood educator roles."
        />

        <meta
          name="keywords"
          content="Vedique Preschool careers, preschool teacher jobs Hyderabad, Bandlaguda Jagir school jobs, daycare teacher jobs Hyderabad, early childhood educator Hyderabad"
        />
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
              alt="Vedique Preschool flower logo background"
              className="absolute w-[200px] sm:w-[260px] opacity-15 animate-flower-zoom pointer-events-none"
            />

            <div className="relative px-4">
              <h1
                className="font-extrabold tracking-tight
                text-[42px] sm:text-[56px] md:text-[64px]
                text-[#6B4FA3]"
                style={{ fontFamily: "'Chewy', system-ui, sans-serif" }}
              >
                Careers
              </h1>

              <p
                className="mt-2
                text-[18px] sm:text-[22px] md:text-[26px]
                text-[#2E1A47] font-semibold"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Join Our Passionate Teaching Family
              </p>
            </div>
          </div>
        </section>

        {/* ===== GOOGLE FORM ===== */}
        <div className="w-full relative z-10">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfpWwh0vtAcChUqmH3WNhH_g_jlFDnXRrK9D5xx8GVj0rLZlQ/viewform?embedded=true"
            width="100%"
            height="270"
            frameBorder="0"
            style={{ display: "block" }}
            title="Vedique Preschool Careers Application Form"
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