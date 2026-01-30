import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Smile,
  Hand,
  MessageCircle,
  BookOpen,
  Palette,
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
      `<span class="font-bold text-[#4B3C78]">$1</span>`,
    );
  });
  return result;
};

export default function PlayGroup() {
  const navigate = useNavigate();

  const features = [
    {
      Icon: Users,
      title: "Social Skills",
      text: "Developing social skills like sharing, taking turns, and becoming familiar with structured learning areas.",
      terms: ["social skills", "sharing", "taking turns", "structured"],
    },
    {
      Icon: Smile,
      title: "Emotional Development",
      text: "Encouraging children to express feelings confidently while building emotional awareness and security.",
      terms: ["emotional", "feelings", "confidence", "security"],
    },
    {
      Icon: Hand,
      title: "Motor Skills",
      text: "Enhancing fine motor skills through holding colours, scribbling, and playful hand-eye coordination activities.",
      terms: ["motor skills", "scribbling", "hand-eye coordination"],
    },
    {
      Icon: MessageCircle,
      title: "Language Growth",
      text: "Early language and cognitive development through vocabulary building, oral interactions, and problem-solving activities.",
      terms: ["language", "vocabulary", "problem-solving"],
    },
    {
      Icon: BookOpen,
      title: "Early Concepts",
      text: "Introducing phonics sounds, basic strokes, and recognition of letters, numbers, colours, animals, and the world around us.",
      terms: ["phonics", "letters", "numbers", "colours"],
    },
    {
      Icon: Palette,
      title: "Visual Learning",
      text: "Learning through engaging oral interactions and rich visual experiences that spark curiosity and imagination.",
      terms: ["visual", "curiosity", "imagination"],
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
        }}>
        {/* ===== BACKGROUND ICONS ===== */}
        {[Users, Smile, BookOpen, Palette].map((Icon, i) => (
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
              top: `${10 + i * 20}%`,
              left: i % 2 === 0 ? "4%" : "88%",
            }}
          />
        ))}

        {/* ===== HERO ===== */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          <img
            src="/assets/bannerpro.png"
            alt="Playgroup Banner"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />

          <button
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md
          px-6 py-2 rounded-full font-semibold text-[#2E1A47]
          shadow-lg hover:scale-105 transition cursor-pointer">
            ← Back to Home
          </button>

          <div className="absolute inset-0 flex items-center justify-center text-center z-10">
            <div className="text-white px-6">
              <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
                Playgroup
              </h1>

              <p
                className="italic text-3xl md:text-4xl text-white/90 mb-3"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                Age Criteria: 2 – 3 Years
              </p>

              <p className="text-white/90 text-2xl">
                Learning through <b>play, joy & discovery</b>
              </p>
            </div>
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center mb-16">
            <h2  style={{
                  fontFamily: "'Chewy', system-ui, sans-serif",
                  fontStyle: "normal",
                }} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#b62474]">
              Learning Through Play
              <br />
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-xl leading-relaxed">
              Our Playgroup program is thoughtfully designed to nurture young
              minds through joyful exploration, emotional security, and
              meaningful early learning experiences.
            </p>
          </div>

          {/* ===== FEATURE GRID ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map(({ Icon, title, text, terms }) => (
              <div
                key={title}
                className="group rounded-[32px] p-8 text-center shadow-xl
                transition-all duration-500 hover:-translate-y-3 hover:shadow-[#6B5FA7]/40"
                style={{
                  background:
                    "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
                }}>
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
