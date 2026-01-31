import React, { useEffect, useState, useMemo } from "react";
import {
  FaBook,
  FaPencilAlt,
  FaAppleAlt,
  FaGraduationCap,
  FaSchool,
  FaPalette,
  FaGlobe,
  FaAtom,
} from "react-icons/fa";

const NAV_HEIGHT = 80;
const currentYear = new Date().getFullYear();

/* ====================== STYLES ====================== */
const styleSheet = `
/* ===== GLOBAL ===== */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html, body {
  width: 100%;
  overflow-x: hidden;
}

/* ===== HERO ===== */
.hero-banner {
  background: radial-gradient(circle at top left, #E6E0F8, #D7C7F2);
  min-height: 100svh;
  padding: 120px 40px 80px;
  position: relative;
  overflow: hidden;
}

@media (max-width: 640px) {
  .hero-banner {
    padding: 140px 20px 80px;
  }
}

.hero-content {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 5;
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

/* ===== FLOATING ICONS ===== */
.floating-icon {
  position: absolute;
  font-size: 92px;
  fill: none;
  stroke: #9B8BCB;
  stroke-width: 26px;
  opacity: 0.35;
  animation: floatIcon 8s ease-in-out infinite alternate;
  z-index: 1;
}

@keyframes floatIcon {
  from { transform: translateY(0); }
  to { transform: translateY(-14px); }
}

/* ===== ADMISSION STRIP (DESKTOP + MOBILE SAME) ===== */
.admission-strip {
  width: 100%;
  max-width: 520px;
  margin: 22px auto;
  padding: 14px 0;
  border-radius: 999px;
  background: linear-gradient(to bottom, #FFE082, #FFC107);
  box-shadow: 0 8px 18px rgba(0,0,0,0.2);
  overflow: hidden;
}

.admission-text {
  font-family: 'Baloo 2', 'Comic Neue', cursive;
  font-weight: 900;
  font-size: 30px;
  color: #B22222;
  text-align: center;
  letter-spacing: 2px;
  animation: leftRight 3.5s ease-in-out infinite;
}

@media (max-width: 640px) {
  .admission-text {
    font-size: 22px;
  }
}

@keyframes leftRight {
  0% { transform: translateX(-18px); }
  50% { transform: translateX(18px); }
  100% { transform: translateX(-18px); }
}

/* ===== TAGLINE ===== */
.hero-tagline-wrapper {
  min-height: 56px;
  margin-bottom: 28px;
  overflow: hidden;
}

.hero-tagline {
font-family: 'Chewy', system-ui, sans-serif;
  font-weight: 300;
  font-size: 38px;
  color: #b62474;
  font-style: italic;
  opacity: 0;
  animation: taglineFade 3.5s ease-in-out forwards;
}
@media (max-width: 640px) {
  .hero-tagline {
    font-size: 28px;
  }
}

@keyframes taglineFade {
  0% { opacity: 0; transform: translateY(12px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-12px); }
}

/* ===== TEXT ===== */
.hero-description {
  font-size: 24px;
  font-weight: 600;
  color: #3A216A;
  line-height: 1.9;
  font-family: 'Comic Neue', 'Nunito', sans-serif;
  margin-bottom: 22px;
}

@media (max-width: 640px) {
  .hero-description {
    font-size: 19px;
  }
}

/* ===== IMAGE ===== */
.hero-image-container {
  position: relative;
  max-width: 500px;
  width: 100%;
  margin: auto;
  z-index: 5;
}

.hero-image {
  width: 100%;
}

/* ===== CTA ===== */
.hero-cta {
  margin-top: 20px;
    margin-left: 9rem;

}

@media (max-width: 640px) {
.hero-cta {
  margin-left: 0;
}
}

.hero-cta button {
  padding: 15px 30px;
  font-size: 28px;
  border-radius: 24px;
  font-weight: 700;
  background: linear-gradient(
    to bottom,
    #E38342,
    #FFC107
  );
  color: #ffff;
  border: none;
  box-shadow: 0 8px 18px rgba(0,0,0,0.25);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}


.hero-cta button:hover {
  transform: scale(1.05);
}
`;

/* ====================== DATA ====================== */
const taglines = [
  "Wisdom, Uniquely Nurtured",
  "Little Steps to Big Wisdom",
];

const icons = [
  FaBook,
  FaPencilAlt,
  FaAppleAlt,
  FaGraduationCap,
  FaSchool,
  FaPalette,
  FaGlobe,
  FaAtom,
];

/* ====================== COMPONENT ====================== */
const Hero = ({ setActive, setOpen }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((p) => (p + 1) % taglines.length),
      3500,
    );
    return () => clearInterval(t);
  }, []);

  const scrollToSection = (id, label) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive?.(label);
    setOpen?.(false);
  };

  const marqueeText = `ADMISSION OPEN ${currentYear}-${String(
    currentYear + 1,
  ).slice(-2)}`;

  const floatingIcons = useMemo(
    () =>
      icons.map((Icon, i) => ({
        Icon,
        style: {
          top: `${10 + i * 9}%`,
          left: `${(i % 4) * 22 + 6}%`,
          animationDelay: `${i * 0.7}s`,
        },
      })),
    [],
  );

  return (
    <>
      <style>{styleSheet}</style>

      <section className="hero-banner">
        {floatingIcons.map(({ Icon, style }, i) => (
          <Icon key={i} className="floating-icon" style={style} />
        ))}

        <div className="hero-content">
          <div>
            <div className="hero-tagline-wrapper">
              <div key={index} className="hero-tagline">
                {taglines[index]}
              </div>
            </div>

            <p className="hero-description">
              <b className="text-[#b62474]">Vedique</b> is born from the union
              of two powerful ideas, <b className="text-[#b62474]">‘Vedic’</b>{" "}
              and <b className="text-[#b62474]">‘Unique’</b> - symbolising
              wisdom imparted in a distinctive and meaningful way.
            </p>

            <p className="hero-description">
              Choosing a pre-school for your little one is about so much more
              than alphabets, numbers, songs, and colours. It’s about laying the
              very first foundation of{" "}
              <b className="text-[#b62474]">lifelong learning</b> and shaping a{" "}
              <b className="text-[#b62474]">confident, compassionate</b> human
              being.
            </p>

            <p className="hero-description">
              That foundation your child’s stepping stone into the world must be{" "}
              <b className="text-[#b62474]">strong, nurturing, and inspiring</b>
              .
            </p>
          </div>

          <div className="hero-image-container">
{/* PLAY SCHOOL IMAGE */}
<img
  src="/assets/playschool.png"
  alt="Playschool"
  className="
    mx-auto mb-4
    h-16 sm:h-20
    object-contain
    drop-shadow-md
  "
/>

{/* ADMISSION STRIP */}
<div className="admission-strip">
  <div className="admission-text">{marqueeText}</div>
</div>

            <img
              src="/assets/hero.jpeg"
              alt="Hero"
              className="hero-image   hover:rotate-1 transition duration-300
  rounded-[58px_18px_58px_18px]
"
            />

            <div className="hero-cta">
              <button onClick={() => scrollToSection("contact", "Contact")}>
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
