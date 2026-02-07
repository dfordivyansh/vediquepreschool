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
  </>
);

/* ===== UTILITY ===== */
const highlightTerms = (text, terms) => {
  let result = text;
  terms.forEach((word) => {
    result = result.replace(
      new RegExp(`(${word})`, "gi"),
      `<span class="font-bold text-[#b62474]">$1</span>`
    );
  });
  return result;
};

export default function EnrichmentPrograms() {
  const navigate = useNavigate();

  const highlights = [
    {
      Icon: Clock,
      title: "After-School Timings",
      text:
        "Programs are conducted from 4:30 PM onwards, making them ideal for after-school enrichment.",
      terms: ["4:30 PM", "after-school", "enrichment"],
    },
    {
      Icon: Users,
      title: "Open to All",
      text:
        "Available to Vedique students as well as children from other schools aged above 4 years.",
      terms: ["Vedique students", "other schools", "above 4 years"],
    },
    {
      Icon: GraduationCap,
      title: "Expert Trainers",
      text:
        "Courses are conducted by skilled and qualified trainers in collaboration with certified partners.",
      terms: ["skilled", "qualified trainers", "certified partners"],
    },
    {
      Icon: Award,
      title: "Assessments & Certification",
      text:
        "Depending on the course, students undergo assessments and receive recognised certifications.",
      terms: ["assessments", "certifications", "recognised"],
    },
    {
      Icon: Brain,
      title: "Cognitive Skill Building",
      text:
        "Programs enhance thinking skills, memory, creativity, and problem-solving abilities.",
      terms: ["thinking skills", "memory", "creativity", "problem-solving"],
    },
    {
      Icon: Sparkles,
      title: "Diverse Learning Options",
      text:
        "A growing range of engaging courses ensures every child finds something they truly enjoy.",
      terms: ["engaging", "diverse", "enjoy"],
    },
  ];

  const courses = [
    { Icon: BookOpen, label: "Phonics" },
    { Icon: Brain, label: "Vedic Mathematics" },
    { Icon: Brain, label: "Abacus / IQ Booster" },
    { Icon: Award, label: "SpellBee" },
    { Icon: Users, label: "Soft Skills" },
    { Icon: PenTool, label: "Handwriting Improvement" },
  ];

  return (
    <>
      <FontLoader />

      <div
        className="w-full min-h-screen relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 80%)",
          fontFamily: "'Comic Neue', 'Nunito', sans-serif",
        }}
      >
        {/* ===== BACKGROUND ICONS ===== */}
        {[GraduationCap, Brain, Sparkles, Award].map((Icon, i) => (
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
            {/* 🌸 WATERMARK */}
            <img
              src="/assets/flower.png"
              alt="Flower watermark"
              className="absolute w-[200px] sm:w-[260px] opacity-15 animate-flower-zoom pointer-events-none"
            />

            {/* TEXT */}
            <div className="relative px-4">
              <h1
                className="font-extrabold tracking-tight
                text-[40px] sm:text-[54px] md:text-[64px]
                text-[#6B4FA3]"
                style={{ fontFamily: "'Chewy', system-ui, sans-serif" }}
              >
                Enrichment Programs
              </h1>

              <p
                className="mt-2
                text-[18px] sm:text-[22px] md:text-[26px]
                text-[#2E1A47] font-semibold"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Age Group: 4 – 13 Years
              </p>
            </div>
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <div className="max-w-7xl mx-auto px-6 py-4 sm:py-6 relative z-10">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#b62474]"
              style={{ fontFamily: "'Chewy', system-ui, sans-serif" }}
            >
              Learning Beyond the Classroom
            </h2>

            <p className="text-gray-700 max-w-3xl mx-auto text-lg sm:text-xl mt-3">
              Vedique’s enrichment programs help children explore interests,
              sharpen abilities, and build confidence beyond academics.
            </p>
          </div>

          {/* ===== HIGHLIGHTS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-14">
            {highlights.map(({ Icon, title, text, terms }) => (
              <div
                key={title}
                className="group rounded-[28px] p-7 text-center shadow-xl
                transition-all duration-500 hover:-translate-y-2 hover:shadow-[#6B5FA7]/40"
                style={{
                  background:
                    "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
                }}
              >
                <Icon className="w-12 h-12 mx-auto text-[#cd5698] mb-4 group-hover:scale-110 transition" />

                <h3 className="text-xl font-extrabold mb-2 text-[#2E1A47]">
                  {title}
                </h3>

                <p
                  className="text-gray-700 text-base sm:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightTerms(text, terms),
                  }}
                />
              </div>
            ))}
          </div>

          {/* ===== COURSES ===== */}
          <div
            className="rounded-[32px] shadow-xl p-8 sm:p-10"
            style={{
              background:
                "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
            }}
          >
            <h3
              className="text-2xl sm:text-3xl font-extrabold text-[#b62474] text-center mb-8"
              style={{ fontFamily: "'Chewy', system-ui, sans-serif" }}
            >
              Courses Offered by Our Partners
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-lg">
              {courses.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 font-bold text-[#2E1A47]"
                >
                  <Icon className="text-[#cd5698]" />
                  {label}
                </div>
              ))}

              <div className="col-span-full text-gray-600 font-bold text-center mt-4">
                …and many more exciting courses coming soon
              </div>
            </div>
          </div>
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
    </>
  );
}
