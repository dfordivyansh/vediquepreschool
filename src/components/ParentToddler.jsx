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

export default function ParentToddler() {
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
          alt="Parent Toddler Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold text-center">
            Parent–Toddler Program <br />
            <span className="text-2xl md:text-3xl font-bold">
              Age Criteria: 1.5–3 Years
            </span>
          </h1>
        </div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#4B3C78] mb-5">
            A Gentle First Step into Learning
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-xl leading-relaxed">
            This unique program by Vedique is thoughtfully designed to help tiny
            tots transition gently from the comfort of their parents’ arms to
            their second home—while strengthening the parent–child bond through
            joyful, shared experiences.
          </p>
        </div>

        {/* ===== Feature Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              Icon: HeartHandshake,
              title: "Parent–Child Bonding",
              text:
                "Designed to strengthen emotional bonding through shared activities, reassurance, and quality time together.",
            },
            {
              Icon: Baby,
              title: "Gentle Transition",
              text:
                "Helps children move comfortably from home to a structured learning environment with parents by their side.",
            },
            {
              Icon: Puzzle,
              title: "Sensory Play",
              text:
                "Engaging sensory activities that stimulate curiosity, exploration, and early cognitive development.",
            },
            {
              Icon: Music,
              title: "Music & Movement",
              text:
                "Fun-filled music, movement, and rhythm activities that support coordination, expression, and joy.",
            },
            {
              Icon: BookHeart,
              title: "Stories & Role Play",
              text:
                "Storytelling and role play nurture imagination, language exposure, and emotional understanding.",
            },
            {
              Icon: Home,
              title: "Safe & Nurturing Space",
              text:
                "A warm, secure environment that eases separation anxiety and helps children feel confident and cared for.",
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
              We believe this shared journey builds emotional security and
              confidence—allowing children to step into the world of learning
              with happiness, trust, and a strong foundation.
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
