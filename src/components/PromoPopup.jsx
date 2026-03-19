import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaSchool,
  FaPalette,
  FaAppleAlt,
} from "react-icons/fa";

const PromoPopup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <>
      <style>{styleSheet}</style>

      <div className="popup-overlay">
        <div className="popup-card">

          {/* Glow Ring */}
          <div className="popup-glow"></div>

          {/* Close */}
          <button className="popup-close" onClick={() => setShow(false)}>
            ✕
          </button>

          {/* Logo */}
          <img
            src="/assets/logo.webp"
            alt="Vedique Logo"
            className="popup-logo"
          />

          {/* Title */}
          <h2 className="popup-title">Vedique Preschool</h2>
          <p className="popup-subtitle">Little Steps to Big Wisdom</p>

          {/* Offer */}
          <div className="popup-offer">
            FREE DEMO CLASSES – 5 DAYS
          </div>

          {/* Date */}
          <p className="popup-start">
            Starting from <b>23rd March 2026</b>
          </p>

          {/* Features */}
          <div className="popup-features">
            <div><FaBook /> IQ Booster Activities</div>
            <div><FaSchool /> Safe & Secure Campus</div>
            <div><FaPalette /> Fun Learning Environment</div>
            <div><FaAppleAlt /> Daycare Available</div>
          </div>

          {/* CTA */}
          <button
            className="popup-btn"
            onClick={() => navigate("/enquiry")}
          >
            Book Free Demo Now
          </button>

        </div>
      </div>
    </>
  );
};

export default PromoPopup;

const styleSheet = `
/* Overlay */
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(60, 20, 80, 0.45);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Card */
.popup-card {
  width: 92%;
  max-width: 400px;
  padding: 30px 24px;
  border-radius: 22px;
  text-align: center;
  position: relative;
  overflow: hidden;

  background: linear-gradient(135deg, #f6f0ff, #ede7ff, #f3e5f5);
  box-shadow: 0 25px 60px rgba(120, 80, 200, 0.35);

  animation: popupFade 0.45s ease;
  border: 1px solid rgba(255,255,255,0.5);
}

/* Glow Effect */
.popup-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(186,104,200,0.25), transparent 60%);
  animation: rotateGlow 8s linear infinite;
  z-index: 0;
}

@keyframes rotateGlow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.popup-card * {
  position: relative;
  z-index: 2;
}

@keyframes popupFade {
  from {
    transform: translateY(40px) scale(0.9);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Close */
.popup-close {
  position: absolute;
  top: 12px;
  right: 14px;
  border: none;
  background: rgba(0,0,0,0.05);
  backdrop-filter: blur(5px);
  font-size: 16px;
  cursor: pointer;
  border-radius: 50%;
  padding: 6px 10px;
  transition: 0.3s;
}

.popup-close:hover {
  background: rgba(0,0,0,0.15);
}

/* Logo */
.popup-logo {
  height: 65px;
  margin-bottom: 10px;
  filter: drop-shadow(0 5px 10px rgba(0,0,0,0.2));
}

/* Title */
.popup-title {
  font-size: 24px;
  font-weight: 800;
  color: #6a1b9a;
}

.popup-subtitle {
  font-size: 13px;
  color: #777;
  margin-bottom: 14px;
}

/* Offer */
.popup-offer {
  background: linear-gradient(to right, #ff9800, #ffc107);
  color: #fff;
  font-weight: 800;
  padding: 12px;
  border-radius: 12px;
  font-size: 15px;
  margin-bottom: 12px;
  letter-spacing: 1px;
  box-shadow: 0 8px 20px rgba(186,104,200,0.4);
}

/* Date */
.popup-start {
  font-size: 14px;
  margin-bottom: 16px;
  color: #444;
}

/* Features */
.popup-features {
  text-align: left;
  margin-bottom: 22px;
}

.popup-features div {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(255,255,255,0.6);
}

/* Button */
.popup-btn {
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  background: linear-gradient(to right, #7b1fa2, #ba68c8);
  color: #fff;

  box-shadow: 0 12px 30px rgba(123,31,162,0.4);
  transition: 0.3s;
}

.popup-btn:hover {
  transform: scale(1.06);
  box-shadow: 0 15px 35px rgba(123,31,162,0.6);
}
`;