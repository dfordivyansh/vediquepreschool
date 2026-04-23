import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MessageCircle, Smartphone } from "lucide-react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../admin/firebase/config";

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
  const formRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* 🔥 SUBMIT HANDLER (FIRESTORE) */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    const formData = new FormData(form);

    const data = {
      guardian: formData.get("Guardian Full Name"),
      phone: formData.get("Primary Contact Number"),
      email: formData.get("Reply Email Address"),
      student: formData.get("Student Name"),
      dob: formData.get("Student DOB"),
      programs: formData.getAll("Interested Programs[]"),
      enrichment: formData.get("Preferred Enrichment Program"),
      notes: formData.get("Additional Notes"),
      createdAt: Timestamp.now(),
    };

    if (!data.guardian || !data.phone || !data.email) {
      return alert("Please fill required fields");
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "contacts"), data);

      alert("Enquiry Submitted ✅");

      form.reset();
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

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
        }}
      >
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
            }`}
          >
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
            
            {/* ===== FORM (UI SAME) ===== */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-[26px] p-6 sm:p-8 shadow-xl border border-[#6B4FA3]/20 space-y-4"
              style={{
                background:
                  "radial-gradient(circle at top right, #F3ECFB 0%, #FFF6FF 55%, #FFFFFF 100%)",
              }}
            >
              <div>
                <label className="label">Guardian Full Name *</label>
                <input name="Guardian Full Name" required className="input" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">Contact Number *</label>
                  <input name="Primary Contact Number" required className="input" />
                </div>
                <div>
                  <label className="label">Reply Email *</label>
                  <input name="Reply Email Address" type="email" required className="input" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">Student Name *</label>
                  <input name="Student Name" required className="input" />
                </div>
                <div>
                  <label className="label">Student Date of Birth *</label>
                  <input name="Student DOB" type="date" required className="input" />
                </div>
              </div>

              <div>
                <p className="label mb-1">Programs You’re Interested In *</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#6B4FA3]">
                  {programs.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="Interested Programs[]" value={p} />
                      {p}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Preferred Enrichment (Optional)</label>
                <select name="Preferred Enrichment Program" className="input">
                  <option value="">Not Applicable</option>
                  {enrichmentOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Additional Notes (Optional)</label>
                <textarea name="Additional Notes" rows="3" className="input" />
              </div>

              <button
                type="submit"
                className="w-full text-white font-semibold px-6 py-3 rounded-[16px] shadow-lg hover:scale-[1.02] transition cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #6B4FA3 0%, #8E6FD1 100%)",
                }}
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>

            {/* ===== RIGHT SIDE: QR + MAP (TWO BOXES, FULL HEIGHT) ===== */}
            <div className="flex flex-col gap-6 h-full">
              {/* ===== TOP BOX: QR ===== */}
              <div className="flex-1 rounded-[26px] overflow-hidden shadow-xl border border-[#6B4FA3]/20 bg-white flex items-center justify-center relative">
                <img
                  src="/assets/QR.webp"
                  alt="Vedique Preschool QR"
                  className="max-h-[85%] max-w-[85%] object-contain"
                />

                <a
                  href="https://share.google/I3BnMOGbggQ2yUu95"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-[#6B4FA3] text-white font-semibold
      px-5 py-2 rounded-full shadow-lg hover:scale-105 transition">
                  Visit us on Google
                </a>
              </div>

              {/* ===== BOTTOM BOX: MAP ===== */}
              <div className="flex-1 rounded-[26px] overflow-hidden shadow-xl border border-[#6B4FA3]/20 bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.147708195709!2d78.38511771585038!3d17.35437177783057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97af033e7301%3A0x81252c7e889448cf!2sVedique%20Preschool!5e0!3m2!1sen!2sin!4v1707361234567!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Vedique Preschool Location"
                />
              </div>
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