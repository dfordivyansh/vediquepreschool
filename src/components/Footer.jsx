import React, { useEffect, useRef, useState } from "react";
import { Facebook, Instagram } from "lucide-react";

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
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">

          {/* ================= MAIN GRID ================= */}
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-4">

            {/* ================= BRAND ================= */}
            <div className="space-y-6 text-center lg:text-left lg:col-span-2">
              <img
                src="/assets/logo.png"
                alt="Vedique Preschool Logo"
                className="h-16 sm:h-20 lg:h-24 mx-auto lg:mx-0"
                style={{ filter: "brightness(0) invert(1)" }}
              />

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
                Vedique Preschool
              </h2>

              <p className="text-white/85 leading-relaxed max-w-lg mx-auto lg:mx-0 text-base sm:text-lg">
                A mindful learning space where children grow with confidence,
                compassion, creativity, and strong values — prepared for life,
                not just school.
              </p>
            </div>

            {/* ================= LOCATION ================= */}
            <div className="space-y-4 text-center lg:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-[#D6C7F2]">
                Our Location
              </h3>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed">
                VEDIQUE PRESCHOOL <br />
                Plot 52, Gandham Sri Nilayam <br />
                Prashant Nagar Colony <br />
                Behind Sai Veda Hospital <br />
                Bandlaguda Jagir <br />
                Hyderabad, Telangana – 500086
              </p>
            </div>

            {/* ================= CONTACT + SOCIAL ================= */}
            <div className="space-y-6 text-center lg:text-left">

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#D6C7F2] mb-1">
                  Call Us
                </h3>
                <p className="text-white/85 text-base sm:text-lg font-medium">
                  +91 90308 02211
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#D6C7F2] mb-1">
                  Email Us
                </h3>
                <a
                  href="mailto:vediquepreschool@gmail.com"
                  className="text-white/85 hover:text-white transition text-base sm:text-lg font-medium"
                >
                  vediquepreschool@gmail.com
                </a>
              </div>

              {/* ================= SOCIAL ================= */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#D6C7F2] mb-4">
                  Follow Us
                </h3>

                <div className="flex justify-center lg:justify-start gap-5">
                  {[Facebook, Instagram].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      aria-label="Social link"
                      className="w-12 h-12 flex items-center justify-center rounded-xl
                      bg-white/10 border border-white/20
                      hover:bg-white/20 transition"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ================= DIVIDER ================= */}
          <hr className="my-12 h-px border-0 bg-white/25" />

          {/* ================= COPYRIGHT ================= */}
          <div className="text-center text-sm sm:text-base text-white/75 font-medium">
            © {new Date().getFullYear()} Vedique Preschool. All Rights Reserved.
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
