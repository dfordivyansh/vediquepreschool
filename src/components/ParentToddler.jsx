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
        "Engaging sensory activities that stimulate curiosity, exploration, and early cognitive development.",
      terms: ["sensory", "curiosity", "exploration", "cognitive development"],
    },
    {
      Icon: Music,
      title: "Music & Movement",
      text:
        "Fun-filled music, movement, and rhythm activities that support coordination, expression, and joy.",
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
        "A warm, secure environment that eases separation anxiety and helps children feel confident and cared for.",
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
            alt="Parent Toddler Banner"
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
                Parent–Toddler Program
              </h1>

              <p
                className="italic text-3xl md:text-4xl text-white/90 mb-3"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Age Criteria: 1.5 – 3 Years
              </p>

              <p className="text-white/90 text-2xl">
                A gentle beginning with <b>love, trust & togetherness</b>
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
              A Gentle First Step into Learning
              <br />
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-xl leading-relaxed">
              This unique program by Vedique helps tiny tots transition gently
              from the comfort of their parents’ arms into a nurturing learning
              space—while strengthening the parent–child bond through joyful,
              shared experiences.
            </p>
          </div>

          {/* ===== FEATURE GRID ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map(({ Icon, title, text, terms }) => (
              <div
                key={title}
                className="group rounded-[32px] p-8 text-center shadow-xl
                transition-all duration-500 hover:-translate-y-3
                hover:shadow-[#6B5FA7]/40 cursor-pointer  "
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

          {/* ===== CLOSING NOTE ===== */}
          <div className="mt-20 text-center max-w-4xl mx-auto text-gray-700 text-xl leading-relaxed">
            <p className="font-semibold">
              This shared journey builds emotional security and confidence—
              allowing children to step into the world of learning with joy,
              trust, and a strong foundation alongside their parents.
            </p>
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
