import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Pencil,
  BookOpen,
  Hash,
  Music,
  Globe,
  Brain,
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

export default function Nursery() {
  const navigate = useNavigate();

  const features = [
    {
      Icon: Pencil,
      title: "Early Writing Skills",
      text:
        "Children begin their writing journey by tracing letters and numbers, developing pencil control and hand strength.",
      terms: ["writing", "letters", "numbers", "pencil control", "hand strength"],
    },
    {
      Icon: BookOpen,
      title: "Early Literacy",
      text:
        "Introduction to letters, sounds, stories, and rhymes to build strong language and reading readiness.",
      terms: ["letters", "sounds", "stories", "rhymes", "reading"],
    },
    {
      Icon: Hash,
      title: "Early Math Concepts",
      text:
        "Learning numbers, counting, shapes, and basic math concepts through hands-on and playful activities.",
      terms: ["numbers", "counting", "shapes", "math"],
    },
    {
      Icon: Music,
      title: "Stories & Rhymes",
      text:
        "Storytelling, songs, and rhymes enhance listening skills, imagination, and expressive language.",
      terms: ["storytelling", "songs", "rhymes", "imagination"],
    },
    {
      Icon: Globe,
      title: "Understanding the World",
      text:
        "Children explore their surroundings, nature, people, and daily life to build awareness of the world around them.",
      terms: ["surroundings", "nature", "people", "daily life"],
    },
    {
      Icon: Brain,
      title: "School Readiness",
      text:
        "Structured learning experiences prepare children emotionally, socially, and academically for primary school.",
      terms: ["learning", "emotionally", "socially", "academically"],
    },
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
        {[Pencil, BookOpen, Globe, Brain].map((Icon, i) => (
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
            alt="Nursery Banner"
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
                Nursery
              </h1>

              <p
                className="italic text-3xl md:text-4xl text-white/90 mb-3"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Age Criteria: 3 – 4 Years
              </p>

              <p className="text-white/90 text-2xl">
                Building foundations for <b>confident learning</b>
              </p>
            </div>
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center mb-16">
            <h2  style={{
                  fontFamily: "'Chewy', cursive",
                  fontStyle: "normal",
                }} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#b62474]">
              Growing Minds, Confident Learners
              <br />
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-xl leading-relaxed">
              In Nursery, children transition from visual and oral learning to
              early writing, while developing strong foundations for primary
              school.
            </p>
          </div>

          {/* ===== FEATURE GRID ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map(({ Icon, title, text, terms }) => (
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
        </div>
      </div>
    </>
  );
}
