import React, { useEffect, useRef, useState } from "react";
import {
  HeartHandshake,
  Brain,
  Leaf,
  Users,
  Sparkles,
  Star,
  Flower,
} from "lucide-react";

/* External font */
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

const OurPhilosophy = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const bgIcons = [
    { Icon: Sparkles, top: "6%", left: "6%" },
    { Icon: Star, top: "16%", right: "10%" },
    { Icon: Flower, top: "30%", left: "14%" },
    { Icon: HeartHandshake, top: "42%", right: "18%" },

    { Icon: Brain, bottom: "28%", left: "10%" },
    { Icon: Leaf, bottom: "22%", right: "14%" },
    { Icon: Users, bottom: "12%", left: "20%" },
    { Icon: Sparkles, bottom: "8%", right: "6%" },
  ];

  return (
    <>
      <FontLoader />

      {/* ===== Styles ===== */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        .glow-wrap::before {
          content: "";
          position: absolute;
          inset: -24px;
          background: radial-gradient(
            circle,
            rgba(132,106,191,0.35),
            transparent 65%
          );
          animation: glowPulse 3.5s ease-in-out infinite;
          z-index: 0;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.45; transform: scale(0.96); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        /* Background icons */
        .bg-icon {
          position: absolute;
          color: rgba(107,79,163,0.22);
          stroke-width: 1.6px;
          animation: floatIcon 10s ease-in-out infinite alternate;
          z-index: 0;
        }

        @keyframes floatIcon {
          0% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
          100% { transform: translateY(10px); }
        }

        /* ===== HIGHLIGHT CAROUSEL ===== */
        .carousel-mask {
          width: 100%;
          overflow: hidden;
          margin-top: 3rem;
        }

        .carousel-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marquee 22s linear infinite;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 640px) {
          .carousel-track {
            animation-duration: 18s;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="our-philosophy"
        className="relative px-4"
        style={{
          background:
            "radial-gradient(circle at top left, #E7DBFA 0%, #F3ECFB 35%, #FAF7FE 60%, #FFFFFF 100%)",
          paddingTop: "5rem",
          paddingBottom: "5.5rem",
          fontFamily: "Inter, sans-serif",
          overflow: "hidden",
        }}>
        {bgIcons.map(({ Icon, ...pos }, i) => (
          <Icon
            key={i}
            size={72}
            className="bg-icon"
            style={{
              ...pos,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto relative z-10">
          {/* ===== Header ===== */}
          <div className={`text-center mb-20 reveal ${visible ? "show" : ""}`}>
            <p
              className="inline-block mb-6 px-6 py-2 rounded-full
                          text-base font-bold border border-[#6B4FA3]/40
                          text-[#6B4FA3] bg-white shadow-sm">
              Our Philosophy
            </p>

            <h2
              className="text-[#2E1A47]
                           text-3xl sm:text-4xl md:text-5xl
                           font-extrabold leading-tight">
              Preparing Children
              <br />
              <span
                className="block mt-3
                           text-2xl sm:text-3xl md:text-4xl
                           font-light italic text-[#6B4FA3]"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                For Life, Not Just School
              </span>
            </h2>
          </div>

          {/* ===== TEXT + IMAGE GRID ===== */}
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className={`reveal ${visible ? "show" : ""}`}>
              <p
                className="text-[#3A216A] text-lg sm:text-xl
                           leading-relaxed mb-10"
                style={{
                  fontFamily: "'Comic Neue', 'Nunito', sans-serif",
                  fontStyle: "normal",
                }}>
                At <b>Vedique</b>, we believe that <b>healthy habits</b> and
                <b> emotional intelligence</b> should be cultivated from the
                earliest years. Our thoughtfully designed experiential learning
                curriculum draws the best from <b>Waldorf</b> and
                <b> Montessori philosophies</b>, blending structure with
                creativity.
                <br />
                <br />
                Beyond academics, we focus on <b>holistic development</b>
                —helping children learn <b>table manners</b>, <b>civic sense</b>
                ,<b> healthy eating habits</b>, and the joy of meaningful
                <b> social interaction</b>.
                <br />
                <br />
                <span className="font-bold text-[#2E1A47]">
                  Because at Vedique, we don’t just prepare children for
                  school—we prepare them for life.
                </span>
              </p>
            </div>

            <div
              className={`relative glow-wrap reveal ${visible ? "show" : ""}`}>
              <img
                src="/assets/philosophy.png"
                alt="Vedique Philosophy"
                className="relative z-10 rounded-3xl shadow-xl
                           w-full object-cover"
              />
            </div>
          </div>

          {/* ===== SEPARATE HIGHLIGHT ROW ===== */}
          <div className={`carousel-mask reveal ${visible ? "show" : ""}`}>
            <div className="carousel-track">
              {[
                { icon: HeartHandshake, label: "Emotional Intelligence" },
                { icon: Brain, label: "Experiential Learning" },
                { icon: Leaf, label: "Holistic Growth" },
                { icon: Users, label: "Social Confidence" },
                { icon: HeartHandshake, label: "Emotional Intelligence" },
                { icon: Brain, label: "Experiential Learning" },
                { icon: Leaf, label: "Holistic Growth" },
                { icon: Users, label: "Social Confidence" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-3
             w-[280px] shrink-0
             px-6 py-3 rounded-full
             bg-white border border-[#6B4FA3]/25
             text-base text-[#3A216A]
             shadow-sm"
                  style={{
                    fontFamily: "'Comic Neue', 'Nunito', sans-serif",
                    fontStyle: "normal",
                  }}>
                  <item.icon size={18} className="text-[#6B4FA3]" />
                  <span className="font-bold whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurPhilosophy;
