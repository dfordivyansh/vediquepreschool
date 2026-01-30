import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartHandshake,
  Baby,
  Music,
  BookHeart,
  Puzzle,
  Home,
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

export default function ParentToddler() {
  const navigate = useNavigate();

  const features = [
    {
      Icon: HeartHandshake,
      title: "Parent–Child Bonding",
      text:
        "Designed to strengthen emotional bonding through shared activities, reassurance, and quality time together.",
      terms: ["emotional bonding", "shared activities", "quality time"],
    },
    {
      Icon: Baby,
      title: "Gentle Transition",
      text:
        "Helps children move comfortably from home to a structured learning environment with parents by their side.",
      terms: ["gentle transition", "home", "structured learning"],
    },
    {
      Icon: Puzzle,
      title: "Sensory Play",
      text:
        "Engaging sensory activities stimulate curiosity, exploration, and early cognitive development.",
      terms: ["sensory", "curiosity", "exploration", "cognitive development"],
    },
    {
      Icon: Music,
      title: "Music & Movement",
      text:
        "Music, movement, and rhythm activities support coordination, expression, and joyful learning.",
      terms: ["music", "movement", "coordination", "expression"],
    },
    {
      Icon: BookHeart,
      title: "Stories & Role Play",
      text:
        "Storytelling and role play nurture imagination, language exposure, and emotional understanding.",
      terms: ["storytelling", "role play", "imagination", "language"],
    },
    {
      Icon: Home,
      title: "Safe & Nurturing Space",
      text:
        "A warm, secure environment that eases separation anxiety and builds confidence and trust.",
      terms: ["safe", "secure", "separation anxiety", "confidence"],
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
        {[HeartHandshake, Baby, Puzzle, Home].map((Icon, i) => (
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
            shadow-lg hover:scale-105 transition"
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
                text-[42px] sm:text-[56px] md:text-[64px]
                text-[#b62474]"
                style={{ fontFamily: "'Chewy', system-ui, sans-serif" }}
              >
                Parent–Toddler Program
              </h1>

              <p
                className="mt-2
                text-[18px] sm:text-[22px] md:text-[26px]
                text-[#2E1A47] font-semibold"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Age Criteria: 1.5 – 3 Years
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
              A Gentle First Step into Learning
            </h2>

            <p className="text-gray-700 max-w-3xl mx-auto text-lg sm:text-xl mt-3">
              This unique program helps tiny tots transition gently from the
              comfort of their parents’ arms into a nurturing learning space —
              while strengthening the parent–child bond through joyful,
              shared experiences.
            </p>
          </div>

          {/* ===== FEATURES ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map(({ Icon, title, text, terms }) => (
              <div
                key={title}
                className="group rounded-[28px] p-7 text-center shadow-xl
                transition-all duration-500 hover:-translate-y-2 hover:shadow-[#6B5FA7]/40"
                style={{
                  background:
                    "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
                }}
              >
                <Icon className="w-12 h-12 mx-auto text-[#6B5FA7] mb-4 group-hover:scale-110 transition" />

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
