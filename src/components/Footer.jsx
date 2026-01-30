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
      { threshold: 0.2 },
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
        text-white footer-reveal ${visible ? "show" : ""}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-1">
          {/* ================= MAIN GRID ================= */}
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-4">
            {/* ================= BRAND ================= */}
            <div className="space-y-6 py-5 sm:py-10 text-center lg:text-left lg:col-span-2">
              <img
                src="/assets/logo-footer.png"
                alt="Vedique Preschool Logo"
                className="
                  h-24 sm:h-28 lg:h-30
                  mx-auto lg:mx-0
                  rounded-[28px_8px_28px_8px]
                  hover:rotate-1 transition duration-300
                  shadow-lg
                  bg-white
                  p-2
                "
              />
              <p className="text-white/85 leading-relaxed max-w-lg mx-auto lg:mx-0 text-xl">
                A mindful learning space where children grow with confidence,
                compassion, creativity, and strong values — prepared for life,
                not just school.
              </p>
            </div>

            {/* ================= LOCATION ================= */}
            <div className="space-y-4 py-0 sm:py-10 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#D6C7F2]">
                Our Location
              </h3>

              <p className="text-[18px] text-white/85 leading-relaxed">
                VEDIQUE PRESCHOOL <br />
                Door: 2-52,
                <br />
                Prashant Nagar Colony <br />
                Behind Sai Veda Hospital <br />
                Bandlaguda Jagir <br />
                Hyderabad, Telangana – 500086
              </p>
            </div>

            {/* ================= CONTACT + SOCIAL ================= */}
            <div className="space-y-6 py-0 sm:py-10 text-center lg:text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#D6C7F2] mb-1">
                  Call Us
                </h3>
                <p className="text-white/85 text-xl sm:text-2xl font-medium">
                  +91 90308 02211
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#D6C7F2] mb-1">
                  Email Us
                </h3>
                <a
                  href="mailto:vediquepreschool@gmail.com"
                  className="text-white/85 hover:text-white transition text-xl sm:text-2xl font-medium">
                  vediquepreschool@gmail.com
                </a>
              </div>

              {/* ================= SOCIAL ================= */}
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#D6C7F2] mb-4">
                  Follow Us
                </h3>

                <div className="flex justify-center lg:justify-start gap-5">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/share/1D6BJgTVvz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Vedique Preschool on Facebook"
                    className="w-12 h-12 flex items-center justify-center rounded-xl
    bg-white/10 border border-white/20
    hover:bg-white/20 transition">
                    <Facebook className="w-6 h-6 text-white" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/vediquepreschool?igsh=MXd4eWRtczB2eTJzcw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Vedique Preschool on Instagram"
                    className="w-12 h-12 flex items-center justify-center rounded-xl
    bg-white/10 border border-white/20
    hover:bg-white/20 transition">
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ================= COPYRIGHT ================= */}
          <div className="mt-6 sm:mt-8 text-center text-xl text-white/75 font-medium">
            © {new Date().getFullYear()} Vedique Preschool. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
