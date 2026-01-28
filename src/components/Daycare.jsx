import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Heart,
  Clock,
  CalendarDays,
  Users,
  Puzzle,
} from "lucide-react";

export default function Daycare() {
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
          alt="Daycare Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold text-center">
            Daycare <br />
            <span className="text-2xl md:text-3xl font-bold">
              Age Criteria: 1.5–8 Years
            </span>
          </h1>
        </div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#4B3C78] mb-5">
            A Safe Second Home for Your Child
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-xl leading-relaxed">
            We understand that your love and care for your child are unmatched.
            When responsibilities call you away, rest assured that your child is
            in safe, nurturing hands—allowing you complete peace of mind.
          </p>
        </div>

        {/* ===== Feature Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              Icon: ShieldCheck,
              title: "Safe & Secure Environment",
              text:
                "Your child is cared for in a secure, supervised, and nurturing environment that prioritizes comfort and well-being.",
            },
            {
              Icon: Heart,
              title: "Loving & Attentive Care",
              text:
                "Warm, responsive caregivers ensure each child feels valued, supported, and emotionally secure throughout the day.",
            },
            {
              Icon: Puzzle,
              title: "Structured Daily Routine",
              text:
                "We follow a well-planned routine to keep children engaged—ensuring meaningful activities rather than unstructured play.",
            },
            {
              Icon: Users,
              title: "Age-Appropriate Engagement",
              text:
                "Activities are thoughtfully adapted to suit children across different age groups, from toddlers to growing learners.",
            },
            {
              Icon: Clock,
              title: "Convenient Timings",
              text:
                "Daycare services are available from 9:00 AM to 6:00 PM, ensuring flexibility for working parents.",
            },
            {
              Icon: CalendarDays,
              title: "Reliable Weekly Schedule",
              text:
                "Open Monday to Friday and closed on government holidays—so you always know what to expect.",
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
              With care, consistency, and a thoughtfully structured routine, we
              ensure your child feels safe, engaged, and happy—every single day.
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
