import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Clock,
  Users,
  Award,
  BookOpen,
  Brain,
  PenTool,
  Sparkles,
} from "lucide-react";

export default function EnrichmentPrograms() {
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
          alt="Enrichment Programs Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold text-center">
            Enrichment Programs <br />
            <span className="text-2xl md:text-3xl font-bold">
              Age Group: 4–13 Years
            </span>
          </h1>
        </div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#4B3C78] mb-5">
            Learning Beyond the Classroom
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-xl leading-relaxed">
            Vedique offers a wide range of specialised skill-development programs
            conducted during after-school hours, helping children explore their
            interests, sharpen abilities, and build confidence beyond academics.
          </p>
        </div>

        {/* ===== Highlights Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          {[
            {
              Icon: Clock,
              title: "After-School Timings",
              text:
                "Programs are conducted from 4:30 PM onwards, making them ideal for after-school enrichment.",
            },
            {
              Icon: Users,
              title: "Open to All",
              text:
                "Available to Vedique students as well as children from other schools within the age range of 4–13 years.",
            },
            {
              Icon: GraduationCap,
              title: "Expert Trainers",
              text:
                "Courses are conducted by skilled and qualified trainers in collaboration with certified third-party partners.",
            },
            {
              Icon: Award,
              title: "Assessments & Certification",
              text:
                "Depending on the course, students may undergo level-based assessments and receive recognised certifications.",
            },
            {
              Icon: Brain,
              title: "Cognitive Skill Building",
              text:
                "Programs focus on enhancing thinking skills, memory, creativity, and problem-solving abilities.",
            },
            {
              Icon: Sparkles,
              title: "Diverse Learning Options",
              text:
                "A growing list of engaging courses ensures every child finds something they truly enjoy.",
            },
          ].map(({ Icon, title, text }) => (
            <div
              key={title}
              className="
                group rounded-[32px] p-8 text-center cursor-pointer
                shadow-xl transition-all duration-500 ease-out
                hover:-translate-y-3 hover:shadow-[#6B5FA7]/40
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

        {/* ===== Courses Offered ===== */}
        <div
          className="rounded-[36px] shadow-xl p-12"
          style={{
            background:
              "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
          }}
        >
          <h3 className="text-3xl font-extrabold text-[#4B3C78] text-center mb-10">
            Courses Offered
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center text-xl">
            {[
              { Icon: BookOpen, label: "Phonics" },
              { Icon: Brain, label: "Vedic Mathematics" },
              { Icon: Brain, label: "Abacus / IQ Booster" },
              { Icon: Award, label: "SpellBee" },
              { Icon: Users, label: "Soft Skills" },
              { Icon: PenTool, label: "Handwriting Improvement" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-4 font-bold text-[#2E1A47]"
              >
                <Icon className="text-[#6B5FA7]" />
                {label}
              </div>
            ))}

            <div className="col-span-full text-gray-600 font-bold text-lg mt-4">
              …and many more exciting courses in the pipeline
            </div>
          </div>
        </div>
      </div>

      {/* ===== Soft Vibration ===== */}
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
