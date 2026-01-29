import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, PhoneCall } from "lucide-react";
import Footer from "../components/Footer";

/* ===== FONT LOADER ===== */
const FontLoader = () => (
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;500&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Nunito:wght@400;600&display=swap"
    />
  </>
);

export default function EnquiryPage() {
  const navigate = useNavigate();

  /* ===== FORM HEIGHT CONTROL ===== */
  const [formHeight, setFormHeight] = useState(
    window.innerWidth < 768 ? "220vh" : "180vh",
  );

  /* ===== HANDLE TALLY SUBMISSION ===== */
  useEffect(() => {
    const handleMessage = (event) => {
      if (
        typeof event.data === "string" &&
        event.data.includes("tally.formSubmitted")
      ) {
        // Reduce form height after submission
        setFormHeight("100vh");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <FontLoader />

      {/* ===== GLOBAL SCROLLBAR HIDE (PAGE ONLY) ===== */}
      <style>{`
        body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        className="min-h-screen w-full relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 80%)",
          fontFamily: "'Comic Neue', 'Nunito', sans-serif",
        }}>
        {/* ===== BACKGROUND ICONS ===== */}
        <MessageSquare
          className="absolute text-[#6B4FA3]/10 pointer-events-none
                     w-48 h-48 md:w-96 md:h-96"
          style={{ top: "20%", left: "4%" }}
        />

        <PhoneCall
          className="absolute text-[#6B4FA3]/10 pointer-events-none
                     w-44 h-44 md:w-80 md:h-80"
          style={{ bottom: "18%", right: "5%" }}
        />

        {/* ===== BACK BUTTON ===== */}
        <button
          onClick={() => navigate("/")}
          className="fixed top-6 left-6 z-30
          bg-white/85 backdrop-blur-md
          px-6 py-2 rounded-full
          font-semibold text-[#2E1A47]
          shadow-lg hover:scale-105 transition">
          ← Back to Home
        </button>

        {/* ===== HEADER ===== */}
        <div
          className="relative z-10 max-w-6xl mx-auto
          px-6 sm:px-10 md:px-16 lg:px-24
          pt-28 pb-16 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <MessageSquare className="text-[#6B4FA3]" />
            <p
              className="inline-block px-6 py-2 rounded-full
              text-xl font-bold border border-[#6B4FA3]/40
              text-[#6B4FA3] bg-white shadow-sm">
              Enquiry Form
            </p>
            <PhoneCall className="text-[#6B4FA3]" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2E1A47] mb-4">
            We’d Love to Hear From You
          </h1>

          <p
            className="text-2xl text-[#6B4FA3]"
            style={{ fontFamily: "'Instrument Serif', serif" }}>
            Wisdom, Uniquely Nurtured
          </p>

          <p className="mt-6 text-lg text-[#3A216A] max-w-3xl mx-auto leading-relaxed">
            Please fill in the enquiry form below and our admissions team will
            connect with you shortly to assist you with programs, admissions,
            and any questions you may have.
          </p>
        </div>

        {/* ===== FORM ===== */}
        <div
          className="
            relative z-10
            px-8 sm:px-14 md:px-20 lg:px-36
            pb-14
          ">
          <iframe
            src="https://tally.so/embed/0QeNPB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            width="100%"
            frameBorder="0"
            title="Vedique Enquiry Form"
            scrolling="no"
            style={{
              border: "none",
              height: formHeight,
              transition: "height 0.9s ease",
            }}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
