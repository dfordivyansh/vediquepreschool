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

const styleSheet = `
/* ========== GLOBAL SAFETY ========== */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html, body {
  width: 100%;
  overflow-x: hidden;
}

/* ========== HERO ========== */
.hero-banner {
  background: radial-gradient(circle at top left, #E6E0F8, #D7C7F2);
  min-height: 100svh;
  padding: 120px 40px 80px;
  position: relative;
  overflow: hidden;
}

@media (max-width: 640px) {
  .hero-banner {
    padding: 160px 20px 80px;
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

/* ========== HEADING ========== */
.hero-heading {
  font-family: 'SF Pro', 'Inter', sans-serif;
  font-weight: 900;
  font-size: 90px;
  line-height: 98px;
  color: #2E1A47;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .hero-heading {
    font-size: 56px;
    line-height: 62px;
  }
}

/* ========== TAGLINE ========== */
.hero-tagline-wrapper {
  min-height: 56px;
  margin-bottom: 32px;
  overflow: hidden;
}

.hero-tagline {
  font-family: 'Instrument Serif', serif;
  font-weight: 600;
  font-size: 36px;
  color: #4B2E83;
  font-style: italic;
  opacity: 0;
  animation: taglineFade 3.5s ease-in-out forwards;
}

@media (max-width: 640px) {
  .hero-tagline {
    font-size: 24px;
  }
}

@keyframes taglineFade {
  0% { opacity: 0; transform: translateY(12px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-12px); }
}

/* ========== TEXT ========== */
.hero-description {
  font-size: 20px;
  color: #3A216A;
  line-height: 1.9;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .hero-description {
    font-size: 18px;
  }
}

/* ========== IMAGE ========== */
.hero-image-container {
  position: relative;
  max-width: 500px;
  width: 100%;
  margin: auto;
  z-index: 5;
}

.hero-image {
  width: 100%;
  border-radius: 32px;
}

/* ========== ADMISSION STRIP ========== */
.admission-strip {
  width: 100%;
  max-width: 520px;
  margin: 24px auto 16px;
  padding: 10px 0;
  border-radius: 999px;
  border: 1px solid rgba(107,79,163,0.5);
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  overflow: hidden;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marqueeLoop 22s linear infinite;
}

.admission-text {
  white-space: nowrap;
  padding-right: 64px;
  font-family: 'Instrument Serif', serif;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 1.4px;
  color: #6B4FA3;
}

@keyframes marqueeLoop {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* MOBILE */
@media (max-width: 640px) {
  .admission-strip {
    max-width: 90%;
  }

  .marquee-track {
    width: 100%;
    animation: marqueeMobile 14s linear infinite;
  }

  .admission-text {
    font-size: 17px;
    padding-right: 0;
  }

  .admission-text:nth-child(2) {
    display: none;
  }
}

@keyframes marqueeMobile {
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
}

/* ========== CTA ========== */
.hero-cta {
  margin-top: 20px;
}

.hero-cta button {
  padding: 18px 52px;
  font-size: 20px;
  border-radius: 24px;
  font-weight: 600;
  background: linear-gradient(to bottom, #FFE082, #FFC107);
  color: #2E1A47;
  border: none;
  box-shadow: 0 8px 18px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.hero-cta button:hover {
  transform: scale(1.05);
}

/* ========== FLOATING ICONS ========== */
.floating-icon {
  position: absolute;
  font-size: 88px;
  fill: none;
  stroke: rgba(107,79,163,0.45);
  stroke-width: 5.2px;
  animation: floatIcon 8s ease-in-out infinite alternate;
  z-index: 1;
}

@media (max-width: 640px) {
  .floating-icon {
    font-size: 64px;
    opacity: 0.5;
  }
}

@keyframes floatIcon {
  0% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
  100% { transform: translateY(10px); }
}
`;

const taglines = [
  "Wisdom, Uniquely Nurtured",
  "Little Steps to Big Wisdom",
  "A Premium Preschool & Daycare",
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

const Hero = ({ setActive, setOpen }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const scrollToSection = (id, label) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y =
      el.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;

    window.scrollTo({ top: y, behavior: "smooth" });
    setActive?.(label);
    setOpen?.(false);
  };

  const marqueeText = `Admission Open ${currentYear}-${String(
    currentYear + 1
  ).slice(-2)} | Vedique Preschool`;

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
    []
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
            <h1 className="hero-heading">Vedique</h1>

            <div className="hero-tagline-wrapper">
              <div key={index} className="hero-tagline">
                {taglines[index]}
              </div>
            </div>

            <p className="hero-description">
              <b>Vedique</b> is born from the union of two powerful ideas—<b>‘Vedic’</b> and <b>‘Unique’</b> - symbolising wisdom imparted in a distinctive and meaningful way.
            </p>
            <p className="hero-description">
              Choosing a pre-school for your little one is about so much more than alphabets, numbers, songs, and colours. It’s about laying the very first foundation of <b>lifelong learning</b> and shaping a <b>confident, compassionate</b> human being.
            </p>
            <p className="hero-description">
              That foundation—your child’s stepping stone into the world—must be <b>strong, nurturing, and inspiring</b>.
            </p>
          </div>

          <div className="hero-image-container">
            <div className="admission-strip">
              <div className="marquee-track">
                <span className="admission-text">{marqueeText}</span>
                <span className="admission-text">{marqueeText}</span>
              </div>
            </div>

            <img src="/assets/hero.jpeg" alt="Hero" className="hero-image" />

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
