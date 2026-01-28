import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PenLine,
  BookOpen,
  Calculator,
  Palette,
  Brain,
  GraduationCap,
} from "lucide-react";

export default function UKG() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 80%)",
        fontFamily: "'Comic Sans MS', cursive",
      }}
    >
      {/* ===== Banner Section ===== */}
      <div className="relative w-full h-[60vh]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md
          px-6 py-2 rounded-full font-bold text-[#1C2C40]
          shadow-lg hover:scale-105 transition cursor-pointer"
        >
          ← Back to Home
        </button>

        <img
          src="/assets/bannerpro.png"
          alt="UKG Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold text-center">
            Upper Kindergarten (UKG) <br />
            <span className="text-2xl md:text-3xl font-bold">
              Age Criteria: 5–6 Years
            </span>
          </h1>
        </div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#4B3C78] mb-5">
            Ready for the World of Primary Education
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-xl leading-relaxed">
            In UKG, children gain confidence as independent learners. Academic,
            creative, and logical skills are strengthened to ensure a smooth and
            joyful transition into primary school.
          </p>
        </div>

        {/* ===== Feature Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              Icon: PenLine,
              title: "Independent Writing",
              text:
                "Children are encouraged to write independently, forming clear words and simple sentences with confidence.",
            },
            {
              Icon: BookOpen,
              title: "Reading & Comprehension",
              text:
                "Reading simple sentences and short passages helps build fluency, comprehension, and a love for reading.",
            },
            {
              Icon: Calculator,
              title: "Math Confidence",
              text:
                "Confident counting, number concepts, and introduction to basic addition and subtraction through hands-on learning.",
            },
            {
              Icon: Palette,
              title: "Creativity & Expression",
              text:
                "Drawing, colouring, and creative expression help children develop imagination, confidence, and fine motor skills.",
            },
            {
              Icon: Brain,
              title: "Spellbee & IQ Boosters",
              text:
                "Advanced Spellbee activities and IQ boosters refine logical thinking, memory, and problem-solving skills.",
            },
            {
              Icon: GraduationCap,
              title: "Primary School Readiness",
              text:
                "By this stage, children are well-prepared to step into primary education with curiosity, confidence, and readiness to learn.",
            },
          ].map(({ Icon, title, text }) => (
            <div
              key={title}
              className="
                group
                rounded-[32px]
                p-8 text-center
                shadow-xl
                cursor-pointer
                transition-all duration-500 ease-out
                hover:-translate-y-3
                hover:shadow-[#6B5FA7]/40
                active:animate-soft-vibrate
              "
              style={{
                background:
                  "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
              }}
            >
              <Icon className="w-14 h-14 mx-auto text-[#6B5FA7] mb-5 transition-transform duration-500 group-hover:scale-110" />

              <h3 className="text-2xl font-extrabold mb-3 text-[#2E1A47]">
                {title}
              </h3>

              <p className="text-gray-700 text-lg leading-relaxed">
                <b>{text}</b>
              </p>
            </div>
          ))}
        </div>

        {/* ===== Closing Note ===== */}
        <div className="mt-20 text-center max-w-4xl mx-auto text-gray-700 text-xl leading-relaxed">
          <p>
            <b>
              The journey from Nursery to UKG is thoughtfully designed to be
              gradual, nurturing, and developmentally appropriate—allowing each
              child to grow with confidence, joy, and a lifelong love for learning.
            </b>
          </p>
        </div>
      </div>

      {/* ===== Soft Vibration Animation ===== */}
      <style>{`
        @keyframes softVibrate {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }

        .animate-soft-vibrate {
          animation: softVibrate 0.25s ease-in-out;
        }
      `}</style>
    </div>
  );
}
