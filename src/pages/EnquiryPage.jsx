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
      <style>{`
  .animate-logo {
    animation: logoReveal 0.9s ease-out forwards,
               logoFloat 4s ease-in-out infinite;
  }

  @keyframes logoReveal {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(6px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes logoFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
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
            <p
              className="inline-block mb-6 px-6 py-2 rounded-full
                          text-2xl font-extrabold  border border-[#E38342]
                          text-[#E38342] bg-gradient-to-b from-[#3493C5]/50 to-white

 shadow-sm">
              Enquiry Form
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <img
              src="/assets/logo.png"
              alt="Vedique Preschool"
              className="h-24 md:h-28 animate-logo"
            />
          </div>

          <p className="mt-6 text-xl text-[#3A216A] max-w-3xl mx-auto leading-relaxed">
            Please fill in the <b>enquiry form</b> below and our{" "}
            <b>admissions team</b> will connect with you shortly to assist you
            with <b>programs, admissions, and any questions you may have.</b>
          </p>
        </div>

        {/* ===== FORM ===== */}
        <div
          className="
    relative z-10
    px-8 sm:px-14 md:px-20 lg:px-36
    pb-14
  ">
          <div
            className="
      w-full
      max-w-4xl
      mx-auto
      bg-white
      rounded-3xl
      shadow-xl
      border border-[#E6DDF5]
      overflow-hidden
    ">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfbPNn-JeJn3qJRY5bMVg7luMmDG_ztUE-qcGxy6sJyLRjwOg/viewform?embedded=true"
              title="Vedique Enquiry Form"
              width="100%"
              height="620"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              onLoad={() => {
                if (formLoadedOnce) {
                  // ✅ Scroll to top AFTER submit
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                } else {
                  setFormLoadedOnce(true);
                }
              }}
              style={{ border: "none" }}>
              Loading…
            </iframe>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
