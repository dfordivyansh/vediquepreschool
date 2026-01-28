import React, { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

/* X (Twitter) Icon */
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M18.9 2H22L14.9 10.1L23.3 22H16.8L11.7 14.9L5.7 22H2.6L10.2 13.2L2.1 2H8.8L13.4 8.3L18.9 2Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = () => {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* ===== Scroll Animation ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== Animations ===== */}
      <style>{`
        .footer-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .footer-reveal.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <footer
        ref={footerRef}
        className={`bg-gradient-to-t from-[#1B0F2D] via-[#2A1950] to-[#3A2470]
        text-white footer-reveal ${visible ? "show" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* ================= MAIN GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* ================= BRAND ================= */}
            <div className="space-y-6 lg:col-span-2 text-center lg:text-left">
              <img
                src="/assets/logo.png"
                alt="Vedique Preschool Logo"
                className="h-14 mx-auto lg:mx-0"
                style={{ filter: "brightness(0) invert(1)" }}
              />

              <h2 className="text-2xl font-bold tracking-wide">
                Vedique Preschool
              </h2>

              <p className="text-white/80 leading-relaxed max-w-md mx-auto lg:mx-0">
                A mindful learning space where children grow with confidence,
                compassion, creativity, and strong values — prepared for life,
                not just school.
              </p>
            </div>

            {/* ================= LOCATION ================= */}
            <div className="space-y-4 text-center lg:text-left">
              <h3 className="text-lg font-semibold text-[#D6C7F2]">
                Our Location
              </h3>

              <p className="text-sm text-white/80 leading-relaxed">
                VEDIQUE PRESCHOOL <br />
                Plot 52, Gandham Sri Nilayam <br />
                Prashant Nagar Colony <br />
                Behind Sai Veda Hospital <br />
                Bandlaguda Jagir <br />
                Hyderabad, Telangana – 500086 <br />
                India
              </p>
            </div>

            {/* ================= CONTACT + SOCIAL ================= */}
            <div className="space-y-6 text-center lg:text-left">

              <div>
                <h3 className="text-lg font-semibold text-[#D6C7F2] mb-1">
                  Call Us
                </h3>
                <p className="text-white/80">
                  +91 90308 02211
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#D6C7F2] mb-1">
                  Email Us
                </h3>
                <a
                  href="mailto:vediquepreschool@gmail.com"
                  className="text-white/80 hover:text-white transition"
                >
                  vediquepreschool@gmail.com
                </a>
              </div>

              {/* ================= SOCIAL ================= */}
              <div>
                <h3 className="text-lg font-semibold text-[#D6C7F2] mb-4">
                  Follow Us
                </h3>

                <div className="flex justify-center lg:justify-start gap-4">
                  {[Facebook, XIcon, Instagram, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-11 h-11 flex items-center justify-center rounded-xl
                      bg-white/10 border border-white/20
                      hover:bg-white/20 transition"
                    >
                      {typeof Icon === "function" ? (
                        <Icon className="text-white" />
                      ) : (
                        <Icon className="w-5 h-5 text-white" />
                      )}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ================= DIVIDER ================= */}
          <hr className="my-12 h-px border-0 bg-white/20" />

          {/* ================= COPYRIGHT ================= */}
          <div className="text-center text-sm text-white/70">
            © {new Date().getFullYear()} Vedique Preschool. All Rights Reserved.
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
