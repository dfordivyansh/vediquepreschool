import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MessageCircle, Smartphone } from "lucide-react";

/* ===== FONT ===== */
const FontLoader = () => (
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Nunito:wght@400;600&display=swap"
    />
  </>
);

const programs = [
  "Playgroup",
  "Nursery",
  "Lower Kindergarten (LKG)",
  "Upper Kindergarten (UKG)",
  "Parent–Toddler Program",
  "Daycare",
  "Enrichment Programs",
];

const enrichmentOptions = [
  "Phonics",
  "Vedic Mathematics",
  "Abacus / IQ Booster",
  "SpellBee",
  "Soft Skills",
  "Handwriting Improvement",
  "Other",
];

const Contact = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* ===== Intersection Observer ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <FontLoader />

      <section
        ref={sectionRef}
        id="contact"
        className="relative px-4 py-10 sm:py-12 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at top left, #EFE6FF 0%, #F4EEFF 40%, #FFFFFF 75%)",
        }}>
        {/* ===== BACKGROUND ICONS ===== */}
        {[Mail, Phone, MessageCircle, Smartphone].map((Icon, i) => (
          <Icon
            key={i}
            className="absolute text-[#6B4FA3]/15"
            size={window.innerWidth < 768 ? 60 : 120}
            style={{
              top: `${12 + i * 18}%`,
              left: i % 2 === 0 ? "5%" : "88%",
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto relative z-10">
          {/* ===== HEADER ===== */}
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              visible ? "opacity-100" : "opacity-0 translate-y-6"
            }`}>
            <p className="inline-block mb-4 px-6 py-2 rounded-full text-3xl font-bold border border-[#E38342] text-[#2E1A47] bg-gradient-to-b from-[#3493C5]/50 to-white shadow-sm">
              Contact Us
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#b62474]">
              Let’s Start a Conversation
            </h2>

            <p className="text-[#3A216A] max-w-3xl mx-auto text-xl sm:text-2xl font-['Comic_Neue']">
              Have a question or want to know more about <b>Vedique</b>? We’d
              love to hear from you.
            </p>
          </div>

          {/* ===== FORM + MAP ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ===== FORM ===== */}
            <form
              action="https://formsubmit.co/vediquepreschool@gmail.com"
              method="POST"
              className="rounded-[26px] p-6 sm:p-8 shadow-xl border border-[#6B4FA3]/20 space-y-4"
              style={{
                background:
                  "radial-gradient(circle at top right, #F3ECFB 0%, #FFF6FF 55%, #FFFFFF 100%)",
              }}>
              {/* ===== REQUIRED FORM SUBMIT FIELDS ===== */}
              <input
                type="hidden"
                name="_subject"
                value="Vedique Preschool – Admission Enquiry"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_next"
                value="https://vediquepreschool.vercel.app/thank-you"
              />

              {/* Parent Name */}
              <div>
                <label className="label">Parent Name *</label>
                <input name="Parent Name" required className="input" />
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">Phone Number *</label>
                  <input name="Phone Number" required className="input" />
                </div>
                <div>
                  <label className="label">Email Address *</label>
                  <input name="Email" type="email" required className="input" />
                </div>
              </div>

              {/* Child Name + DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">Child’s Name *</label>
                  <input name="Child Name" required className="input" />
                </div>
                <div>
                  <label className="label">Child’s Date of Birth *</label>
                  <input name="DOB" type="date" required className="input" />
                </div>
              </div>

              {/* Programs */}
              <div>
                <p className="label mb-1">Programs Interested In *</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#6B4FA3]">
                  {programs.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="Programs[]" value={p} />
                      {p}
                    </label>
                  ))}
                </div>
              </div>

              {/* Enrichment */}
              <div>
                <label className="label">
                  Enrichment Program (if applicable)
                </label>
                <select name="Enrichment Program" className="input">
                  <option value="">Not Applicable</option>
                  {enrichmentOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="label">Message (Optional)</label>
                <textarea name="Message" rows="3" className="input" />
              </div>

              <button
                type="submit"
                className="w-full text-white font-semibold px-6 py-3 rounded-[16px] shadow-lg hover:scale-[1.02] transition cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #6B4FA3 0%, #8E6FD1 100%)",
                }}>
                Submit Enquiry
              </button>
            </form>

            {/* ===== MAP ===== */}
            <div className="rounded-[26px] overflow-hidden shadow-xl border border-[#6B4FA3]/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1782.6454998627307!2d78.387039326845!3d17.354262937676026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97af033e7301%3A0x3cf62a14c9a024d6!2sAikyam%20Preschool!5e0!3m2!1sen!2sin!4v1767630304411!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "420px" }}
                allowFullScreen
                loading="lazy"
                title="Vedique Preschool Location"
              />
            </div>
          </div>
        </div>

        {/* ===== INPUT STYLES ===== */}
        <style>{`
          .label {
            display: block;
            margin-bottom: 4px;
            font-weight: 600;
            color: #6B4FA3;
            font-size: 14px;
          }
          .input {
            width: 100%;
            padding: 12px 14px;
            border-radius: 12px;
            border: 1px solid #6B4FA340;
            font-size: 15px;
            background: #FFFFFF;
            outline: none;
          }
          .input:focus {
            border-color: #6B4FA3;
            box-shadow: 0 0 0 2px #6B4FA340;
          }
        `}</style>
      </section>
    </>
  );
};

export default Contact;
