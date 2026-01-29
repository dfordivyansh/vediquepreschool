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

/* ===== FLOATING ICONS (IMPROVED) ===== */
.floating-icon {
  position: absolute;
  font-size: 92px;
  fill: none;
  stroke: #9B8BCB; /* matches hero gradient */
  stroke-width: 26px; /* solid thick stroke */
  opacity: 0.35;
  animation: floatIcon 8s ease-in-out infinite alternate;
  z-index: 1;
}

@media (max-width: 640px) {
  .floating-icon {
    font-size: 64px;
    opacity: 0.28;
  }
}

@keyframes floatIcon {
  from { transform: translateY(0); }
  to { transform: translateY(-14px); }
}

/* ===== MOBILE MARQUEE (DESKTOP-LIKE) ===== */
.mobile-admission-strip {
  display: none;
}

@media (max-width: 640px) {
  .mobile-admission-strip {
    display: block;
    width: 100%;
    margin-bottom: 26px;
    padding: 8px 0;
    border-radius: 999px;
    background: linear-gradient(135deg,#ff9f1c,#ffb703,#ffd166);
    box-shadow: 0 12px 30px rgba(255,159,28,0.45);
    overflow: hidden;
  }

  .mobile-marquee-track {
    display: flex;
    width: max-content;
    animation: marqueeMobile 18s linear infinite;
  }

  .mobile-admission-text {
    white-space: nowrap;
    padding-right: 80px;
    font-family: 'Inter', 'SF Pro', sans-serif;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 2px;
    color: #3b1d00;
    text-transform: uppercase;
  }
}

@keyframes marqueeMobile {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ===== HEADING ===== */
.hero-heading {
  font-family: 'SF Pro', 'Inter', sans-serif;
  font-weight: 900;
  font-size: 94px;
  line-height: 102px;
  color: #2E1A47;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .hero-heading {
    font-size: 60px;
    line-height: 66px;
  }
}

/* ===== TAGLINE ===== */
.hero-tagline-wrapper {
  min-height: 56px;
  margin-bottom: 28px;
  overflow: hidden;
}

.hero-tagline {
  font-family: 'Instrument Serif', serif;
  font-weight: 900;
  font-size: 38px;
  color: #E38342;
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
  font-family: 'Comic Neue', 'Quicksand', 'Nunito', sans-serif;
  margin-bottom: 22px;
}

@media (max-width: 640px) {
  .hero-description {
    font-size: 19px;
  }
}

.highlight-orange {
  color: #E38342;
  font-weight: 700;
}

.highlight-orange-dark {
  color: #FF9F1C;
  font-weight: 700;
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
  border-radius: 32px;
}

/* ===== DESKTOP MARQUEE ===== */
.admission-strip {
  width: 100%;
  max-width: 620px;
  margin: 28px auto 18px;
  padding: 10px 0;
  border-radius: 999px;
  background: linear-gradient(135deg,#ff9f1c,#ffb703,#ffd166);
  box-shadow: 0 12px 30px rgba(255,159,28,0.45);
  overflow: hidden;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marqueeDesktop 20s linear infinite;
}

.admission-text {
  white-space: nowrap;
  padding-right: 80px;
  font-family: 'Inter', 'SF Pro', sans-serif;
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 2px;
  color: #3b1d00;
  text-transform: uppercase;
}

@keyframes marqueeDesktop {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (max-width: 640px) {
  .hero-image-container .admission-strip {
    display: none;
  }
}

/* ===== CTA ===== */
.hero-cta {
  margin-top: 24px;
}

.hero-cta button {
  padding: 18px 52px;
  font-size: 20px;
  border-radius: 24px;
  font-weight: 700;
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
`;

/* ====================== DATA ====================== */
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
  ).slice(
    -2,
  )} • PLAYGROUP • NURSERY • LKG • UKG • PARENT TODDLER • DAYCARE • ENRICHMENT`;

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
          {/* MOBILE MARQUEE */}
          <div className="mobile-admission-strip">
            <div className="mobile-marquee-track">
              <span className="mobile-admission-text">{marqueeText}</span>
              <span className="mobile-admission-text">{marqueeText}</span>
            </div>
          </div>

          <div>
            <h1 className="hero-heading">Vedique</h1>

            <div className="hero-tagline-wrapper">
              <div key={index} className="hero-tagline">
                {taglines[index]}
              </div>
            </div>

            <p className="hero-description">
              <b className="text-amber-900">Vedique</b> is born from the union
              of two powerful ideas—<b className="text-amber-900">‘Vedic’</b>{" "}
              and <b className="text-amber-900">‘Unique’</b> - symbolising
              wisdom imparted in a distinctive and meaningful way.
            </p>

            <p className="hero-description">
              Choosing a pre-school for your little one is about so much more
              than alphabets, numbers, songs, and colours. It’s about laying the
              very first foundation of{" "}
              <b className="text-amber-900">lifelong learning</b> and shaping a{" "}
              <b className="text-amber-900">confident, compassionate</b> human
              being.
            </p>

            <p className="hero-description">
              That foundation—your child’s stepping stone into the world—must be{" "}
              <b className="text-amber-900">strong, nurturing, and inspiring</b>
              .
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
