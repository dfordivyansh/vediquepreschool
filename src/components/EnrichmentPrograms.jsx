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

/* ===== UTILITY: HIGHLIGHT IMPORTANT TERMS ===== */
const highlightTerms = (text, terms) => {
  let result = text;
  terms.forEach((word) => {
    result = result.replace(
      new RegExp(`(${word})`, "gi"),
      `<span class="font-bold text-[#4B3C78]">$1</span>`
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
        "Available to Vedique students as well as children from other schools within the age range of 4–13 years.",
      terms: ["Vedique students", "other schools", "4–13 years"],
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
        "Depending on the course, students may undergo level-based assessments and receive recognised certifications.",
      terms: ["assessments", "certifications", "level-based"],
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
      terms: ["engaging courses", "diverse", "enjoy"],
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
            className="
              absolute text-[#6B5FA7]/10
              w-[72px] h-[72px]
              sm:w-[96px] sm:h-[96px]
              md:w-[120px] md:h-[120px]
              lg:w-[140px] lg:h-[140px]
            "
            style={{
              top: `${12 + i * 20}%`,
              left: i % 2 === 0 ? "4%" : "88%",
            }}
          />
        ))}

        {/* ===== HERO ===== */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          <img
            src="/assets/bannerpro.png"
            alt="Enrichment Programs Banner"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />

          <button
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md
            px-6 py-2 rounded-full font-semibold text-[#2E1A47]
            shadow-lg hover:scale-105 transition cursor-pointer"
          >
            ← Back to Home
          </button>

          <div className="absolute inset-0 flex items-center justify-center text-center z-10">
            <div className="text-white px-6">
              <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
                Enrichment Programs
              </h1>

              <p
                className="italic text-3xl md:text-4xl text-white/90 mb-3"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Age Group: 4 – 13 Years
              </p>

              <p className="text-white/90 text-2xl">
                Learning beyond the <b>classroom & curriculum</b>
              </p>
            </div>
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#4B3C78] mb-5">
              Learning Beyond the Classroom
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-xl leading-relaxed">
              Vedique offers specialised after-school programs that help children
              explore interests, sharpen abilities, and build confidence beyond
              academics.
            </p>
          </div>

          {/* ===== HIGHLIGHTS GRID ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {highlights.map(({ Icon, title, text, terms }) => (
              <div
                key={title}
                className="group rounded-[32px] p-8 text-center shadow-xl
                transition-all duration-500 hover:-translate-y-3
                hover:shadow-[#6B5FA7]/40 cursor-pointer"
                style={{
                  background:
                    "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
                }}
              >
                <Icon className="w-14 h-14 mx-auto text-[#6B5FA7] mb-5 group-hover:scale-110 transition" />

                <h3 className="text-2xl font-extrabold mb-3 text-[#2E1A47]">
                  {title}
                </h3>

                <p
                  className="text-gray-700 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightTerms(text, terms),
                  }}
                />
              </div>
            ))}
          </div>

          {/* ===== COURSES OFFERED ===== */}
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
              {courses.map(({ Icon, label }) => (
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

        {/* ===== SOFT VIBRATION ===== */}
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
    </>
  );
}
