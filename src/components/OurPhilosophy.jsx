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
    { Icon: Star, top: "14%", right: "10%" },
    { Icon: Flower, top: "28%", left: "14%" },
    { Icon: HeartHandshake, top: "40%", right: "18%" },
    { Icon: Brain, bottom: "26%", left: "10%" },
    { Icon: Leaf, bottom: "20%", right: "14%" },
    { Icon: Users, bottom: "10%", left: "20%" },
    { Icon: Sparkles, bottom: "6%", right: "6%" },
  ];

  return (
    <>
      <FontLoader />

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        .glow-wrap::before {
          content: "";
          position: absolute;
          inset: -20px;
          background: radial-gradient(
            circle,
            rgba(132,106,191,0.3),
            transparent 65%
          );
          animation: glowPulse 3.5s ease-in-out infinite;
          z-index: 0;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.96); }
          50% { opacity: 0.75; transform: scale(1.04); }
        }

        .bg-icon {
          position: absolute;
          color: rgba(107,79,163,0.22);
          stroke-width: 1.6px;
          animation: floatIcon 10s ease-in-out infinite alternate;
          z-index: 0;
        }

        @keyframes floatIcon {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(8px); }
        }

        .carousel-mask {
          width: 100%;
          overflow: hidden;
          margin-top: 2rem;
        }

        .carousel-track {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: marquee 22s linear infinite;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="our-philosophy"
        className="relative px-4"
        style={{
          background:
            "radial-gradient(circle at top left, #E7DBFA 0%, #F3ECFB 35%, #FAF7FE 60%, #FFFFFF 100%)",
          paddingTop: "3rem",
          paddingBottom: "4.2rem",
          overflow: "hidden",
        }}>
        {bgIcons.map(({ Icon, ...pos }, i) => (
          <Icon
            key={i}
            size={70}
            className="bg-icon"
            style={{ ...pos, animationDelay: `${i * 0.6}s` }}
          />
        ))}

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className={`text-center mb-14 reveal ${visible ? "show" : ""}`}>
            <p className="inline-block mb-4 px-6 py-2 rounded-full text-3xl font-bold border border-[#E38342] text-[#2E1A47] bg-gradient-to-b from-[#3493C5]/50 to-white shadow-sm">
              Our Philosophy
            </p>

            <h2
              className="text-[#b62474] text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
              style={{ fontFamily: "'Chewy', system-ui, sans-serif" }}>
              Preparing Children For Life, Not Just School
            </h2>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`reveal ${visible ? "show" : ""}`}>
              <p
                className="text-[#3A216A] text-xl font-bold sm:text-2xl leading-relaxed mb-6"
                style={{ fontFamily: "'Comic Neue', 'Nunito', sans-serif" }}>
                At <b className="text-[#b62474]">Vedique</b>, we believe that{" "}
                <b className="text-[#b62474]">healthy habits</b> and{" "}
                <b className="text-[#b62474]">emotional intelligence</b> should
                be nurtured from the earliest years.
                <br />
                Our curriculum draws inspiration from{" "}
                <b className="text-[#b62474]">Waldorf</b> and{" "}
                <b className="text-[#b62474]">Montessori philosophies</b>,
                blending structure with creativity.
                <br />
                We emphasize{" "}
                <b className="text-[#b62474]">holistic development</b>—from
                table manners and civic sense to healthy eating and meaningful{" "}
                <b className="text-[#b62474]">social interaction</b>.
                <br />
                <span className="font-bold text-[#b62474]">
                  At Vedique, we prepare children not just for school—but for
                  life.
                </span>
              </p>
            </div>

            <div
              className={`relative glow-wrap reveal ${visible ? "show" : ""}`}>
              <img
                src="/assets/flower.png"
                alt="Vedique Philosophy"
                className="
    relative z-10
    w-[75%] mx-auto
    hover:rotate-1 transition duration-300
    object-contain
  "
              />
            </div>
          </div>

          {/* Highlights */}
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
                  className="flex items-center gap-3 w-[260px] shrink-0 px-5 py-3 rounded-full bg-gradient-to-b from-white via-[#E38342]/70 to-white border border-[#E38342]/25 text-lg text-[#2E1A47] shadow-sm"
                  style={{ fontFamily: "'Comic Neue', 'Nunito', sans-serif" }}>
                  <item.icon size={22} />
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
