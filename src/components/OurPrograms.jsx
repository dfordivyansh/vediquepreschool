import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Star, BookOpen, Shapes } from "lucide-react";

/* External font */
const FontLoader = () => (
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap"
  />
);

/* Program Data */
const programs = [
  { title: "Playgroup", age: "2 – 3 years", link: "/programs/playgroup" },
  { title: "Nursery", age: "3 – 4 years", link: "/programs/nursery" },
  { title: "Lower Kindergarten (LKG)", age: "4 – 5 years", link: "/programs/lkg" },
  { title: "Upper Kindergarten (UKG)", age: "5 – 6 years", link: "/programs/ukg" },
  { title: "Parent–Toddler Program", age: "1.5 – 3 years", link: "/programs/parent-toddler" },
  { title: "Daycare", age: "1.5 – 8 years", link: "/programs/daycare" },
  { title: "Enrichment Programs", age: "4 – 13 years", link: "/programs/enrichment" },
];

const OurPrograms = () => {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <FontLoader />

      <style>{`
        .fade-soft {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-soft.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Background icons */
        .bg-icon {
          position: absolute;
          color: rgba(107,79,163,0.28);
          stroke-width: 2px;
          animation: floatIcon 10s ease-in-out infinite alternate;
          z-index: 0;
          pointer-events: none;
        }

        @keyframes floatIcon {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(10px); }
        }

        /* Explore hover vibration */
        .explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .program-card:hover .explore-btn {
          animation: wiggle 0.45s ease-in-out;
        }

        @keyframes wiggle {
          0% { transform: translateX(0); }
          25% { transform: translateX(2px); }
          50% { transform: translateX(-2px); }
          75% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="programs"
        className="relative px-4 py-16"
        style={{
          background:
            "radial-gradient(circle at top left, #E7DBFA 0%, #F3ECFB 40%, #FAF7FE 65%, #FFFFFF 100%)",
          fontFamily: "Inter, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* ===== Background Icons ===== */}
        <Sparkles size={70} className="bg-icon" style={{ top: "8%", left: "6%" }} />
        <Star size={60} className="bg-icon" style={{ top: "18%", right: "10%" }} />
        <BookOpen size={64} className="bg-icon" style={{ top: "35%", left: "18%" }} />
        <Shapes size={58} className="bg-icon" style={{ bottom: "20%", right: "14%" }} />
        <Sparkles size={62} className="bg-icon" style={{ bottom: "24%", left: "28%" }} />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <div className={`text-center mb-12 fade-soft ${visible ? "show" : ""}`}>
            <p className="inline-block mb-4 px-6 py-2 rounded-full text-base font-bold
              border border-[#6B4FA3]/40 text-[#6B4FA3] bg-white shadow-sm">
              Our Programs
            </p>

            <h2 className="text-[#2E1A47] text-3xl sm:text-4xl md:text-5xl
              font-extrabold leading-tight mb-4">
              Learning Pathways
              <br />
              <span
                className="font-light italic text-2xl sm:text-3xl md:text-4xl text-[#6B4FA3]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                For Every Stage of Growth
              </span>
            </h2>

            <p
              className="text-[#3A216A] max-w-3xl mx-auto text-base sm:text-lg"
              style={{ fontFamily: "'Comic Sans MS', cursive" }}
            >
              Thoughtfully designed programs that support each child’s
              emotional, social, and cognitive development— <b>step by step.</b>
            </p>
          </div>

          {/* Programs Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-6 fade-soft ${visible ? "show" : ""}`}
          >
            {programs.map((program, index) => (
              <a
                key={index}
                href={program.link}
                className="program-card bg-gradient-to-b from-[#F3ECFB] via-[#F8F4FD] to-white
                rounded-[26px] p-7
                border border-[#6B4FA3]/15
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
                flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-[18px] font-bold text-[#2E1A47] mb-2">
                    {program.title}
                  </h3>

                  <p
                    className="text-[#6B4FA3] font-semibold text-[16px]"
                    style={{ fontFamily: "'Comic Sans MS', cursive" }}
                  >
                    Age Group: {program.age}
                  </p>
                </div>

                <div className="explore-btn mt-6 text-[#6B4FA3] text-lg font-bold">
                  Explore
                  <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default OurPrograms;
