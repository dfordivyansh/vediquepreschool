import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  PenTool,
  Shapes,
  Globe,
  Users,
  Brain,
} from "lucide-react";

export default function LKG() {
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
          alt="LKG Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold text-center">
            Lower Kindergarten (LKG) <br />
            <span className="text-2xl md:text-3xl font-bold">
              Age Criteria: 4–5 Years
            </span>
          </h1>
        </div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#4B3C78] mb-5">
            Building Strong Foundations
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-xl leading-relaxed">
            As our young geniuses move into LKG, their early skills are refined
            and learning expands to academic, logical, and real-world concepts,
            preparing them for confident independent reading and writing.
          </p>
        </div>

        {/* ===== Feature Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              Icon: BookOpen,
              title: "Reading & Writing",
              text:
                "Children learn to read and write simple words and are encouraged to read short word stories independently.",
            },
            {
              Icon: PenTool,
              title: "Phonics & Spellbee",
              text:
                "Strong focus on phonics, sound blending, and Spellbee activities to strengthen language and spelling skills.",
            },
            {
              Icon: Shapes,
              title: "Math & Shapes",
              text:
                "Learning shapes, numbers, patterns, and basic math concepts through hands-on and visual activities.",
            },
            {
              Icon: Users,
              title: "Community Awareness",
              text:
                "Introduction to body parts, community helpers, and social roles to help children understand people around them.",
            },
            {
              Icon: Globe,
              title: "World & Environment",
              text:
                "Learning about seasons, the solar system, and nature to spark curiosity and scientific thinking.",
            },
            {
              Icon: Brain,
              title: "IQ Booster Activities",
              text:
                "Logical reasoning, puzzles, and brain-boosting activities enhance thinking skills and problem-solving abilities.",
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
