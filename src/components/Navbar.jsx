import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const NAV_HEIGHT = 96;

  /* ===== IMMEDIATE + SLOW SMOOTH SCROLL ===== */
  const smoothScrollTo = (targetY) => {
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
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
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("Home");
    setOpen(false);
  };

  const scrollToSection = (id, label) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;

    smoothScrollTo(y);
    setActive(label);
    setOpen(false);
  };

  const navItems = [
    { label: "Home", icon: <FaHome />, action: scrollToTop },
    { label: "Programs", icon: <FaSchool />, id: "programs" },
    { label: "Gallery", icon: <FaImage />, id: "gallery" },
    { label: "Contact", icon: <FaEnvelope />, id: "contact" },
  ];

  const goToEnquiry = () => {
    navigate("/enquiry", { replace: false });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-b from-[#F3ECFB] to-[#FEFEF6] shadow-lg"
          : "bg-gradient-to-b from-[#F3ECFB] to-[#FEFEF6] shadow-lg"
      }`}>
      {/* HEADER */}
      <div className="max-w-screen-xl mx-auto py-4 h-[96px] flex items-center justify-between">
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
            src="/assets/logo-hero.png"
            alt="Vedique Logo"
            onClick={scrollToTop}
            className="h-14 md:h-20 cursor-pointer hover:scale-105 transition"
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
            <button
              className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-br from-[#3493C5] to-white
 border border-[#E38342] text-[#2E1A47] shadow-sm hover:shadow-md transition">
              <FaPhoneAlt className="animate-phone text-sm md:text-lg" />
              <span className="text-sm md:text-xl font-semibold cursor-pointer">
                +91-9030802211
              </span>
            </button>
          </a>

          <button
            onClick={goToEnquiry}
            className="hidden md:block bg-[#E38342] text-white px-6 py-3 text-xl font-semibold rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
            Enquiry
          </button>
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
            <button
              onClick={() => {
                goToEnquiry();
                setOpen(false);
              }}
              className="w-full bg-[#E38342] text-white py-4 text-xl font-semibold rounded-xl shadow-md hover:shadow-lg transition mt-6">
              Enquiry
            </button>
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
