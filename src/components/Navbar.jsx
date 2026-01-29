import { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaSchool,
  FaImage,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  const NAV_HEIGHT = 96;

  /* ===== IMMEDIATE + SLOW SMOOTH SCROLL ===== */
  const smoothScrollTo = (targetY, duration = 1700) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    // ✅ Instant start, slow finish (NO GAP)
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, startY + distance * easeOut(progress));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate); // 🚀 starts immediately
  };

  /* ===== SCROLL SHADOW ===== */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== BODY LOCK FOR MOBILE MENU ===== */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  /* ===== HANDLERS ===== */
  const scrollToTop = () => {
    smoothScrollTo(0, 1500);
    setActive("Home");
    setOpen(false);
  };

  const scrollToSection = (id, label) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;

    smoothScrollTo(y, 1800); // slower but instant
    setActive(label);
    setOpen(false);
  };

  const navItems = [
    { label: "Home", icon: <FaHome />, action: scrollToTop },
    { label: "Programs", icon: <FaSchool />, id: "programs" },
    { label: "Gallery", icon: <FaImage />, id: "gallery" },
    { label: "Contact", icon: <FaEnvelope />, id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-b from-[#F3ECFB] to-[#F8F4FD] shadow-lg"
          : "bg-transparent"
      }`}>
      {/* HEADER */}
      <div className="max-w-screen-xl mx-auto px-4 py-4 h-[96px] flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-2 cursor-pointer">
            <span
              className={`h-[3px] w-8 bg-[#5E4B8B] rounded transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`h-[3px] w-8 bg-[#5E4B8B] rounded transition-all ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[3px] w-8 bg-[#5E4B8B] rounded transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>

          <img
            src="/assets/logo.png"
            alt="Aikyam Logo"
            onClick={scrollToTop}
            className="h-16 md:h-20 cursor-pointer hover:scale-105 transition"
          />
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-14 font-semibold text-lg text-[#5E4B8B]">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() =>
                  item.id ? scrollToSection(item.id, item.label) : item.action()
                }
                className="flex items-center gap-2 relative group hover:text-[#4B3C78] cursor-pointer">
                <span className="text-xl">{item.icon}</span>
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4B3C78] group-hover:w-full transition-all"></span>
              </button>
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <a href="tel:+919030802211">
            <button className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white border border-[#4B3C78] text-[#4B3C78] shadow-sm hover:shadow-md transition">
              <FaPhoneAlt className="animate-phone text-sm md:text-lg" />
              <span className="text-sm md:text-base font-semibold cursor-pointer">
                90308 02211
              </span>
            </button>
          </a>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfbPNn-JeJn3qJRY5bMVg7luMmDG_ztUE-qcGxy6sJyLRjwOg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block">
            <button className="bg-[#4B3C78] text-white px-6 py-3 text-base font-semibold rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
              Enquiry
            </button>
          </a>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden fixed top-[96px] left-0 w-full px-4 animate-drop">
          <div className="max-w-sm mx-auto rounded-3xl shadow-2xl px-6 py-8 bg-menu">
            {navItems.map((item, index) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    item.id
                      ? scrollToSection(item.id, item.label)
                      : item.action()
                  }
                  className={`flex items-center gap-3 w-full py-4 ${
                    active === item.label
                      ? "text-[#4B3C78] bg-white/70 rounded-lg px-3"
                      : "text-[#5E4B8B]"
                  }`}>
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </button>

                {index !== navItems.length - 1 && (
                  <div className="h-px bg-[#cbbce6]/60"></div>
                )}
              </div>
            ))}

            {/* ✅ MOBILE ENQUIRY BUTTON */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfbPNn-JeJn3qJRY5bMVg7luMmDG_ztUE-qcGxy6sJyLRjwOg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6"
              onClick={() => setOpen(false)}>
              <button className="w-full bg-[#4B3C78] text-white py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition">
                Enquiry Now
              </button>
            </a>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        .animate-phone {
          animation: phoneFloat 2.4s ease-in-out infinite;
        }
        @keyframes phoneFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-drop {
          animation: dropDown 0.35s ease-out;
        }
        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-14px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .bg-menu {
          background: radial-gradient(circle at top, #f3ecfb, #ffffff);
        }
      `}</style>
    </nav>
  );
}
