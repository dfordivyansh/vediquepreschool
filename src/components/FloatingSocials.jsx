import React from "react";
import { Facebook, Instagram } from "lucide-react";

const FloatingSocials = () => {
  return (
    <>
      <div className="floating-socials">
        <a
          href="https://www.facebook.com/share/1D6BJgTVvz/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="social-btn facebook"
        >
          <Facebook size={20} />
        </a>

        <a
          href="https://www.instagram.com/vediquepreschool"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="social-btn instagram"
        >
          <Instagram size={20} />
        </a>
      </div>

      <style>{`
        .floating-socials {
          position: fixed;
          top: 90px; /* 👈 adjust based on navbar height */
          left: 20px;
          display: flex;
          flex-direction: row; /* ROW layout */
          gap: 12px;
          z-index: 999;
        }

        .social-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
          animation: pulseZoom 2.4s ease-in-out infinite;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .social-btn:hover {
          transform: scale(1.18);
          box-shadow: 0 12px 26px rgba(0,0,0,0.3);
        }

        .facebook {
          background: linear-gradient(135deg, #1877F2, #3b5998);
          animation-delay: 0s;
        }

        .instagram {
          background: linear-gradient(
            135deg,
            #f58529,
            #dd2a7b,
            #8134af
          );
          animation-delay: 1.2s;
        }

        @keyframes pulseZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }

        /* Mobile fine-tuning */
        @media (max-width: 640px) {
          .floating-socials {
            top: 78px;
            left: 14px;
          }

          .social-btn {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingSocials;
