import React, { useState, useEffect, useRef } from "react";
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

const Contact = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    childName: "",
    dob: "",
    programs: [],
    message: "",
  });

  /* ===== Intersection Observer ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (program) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.includes(program)
        ? prev.programs.filter((p) => p !== program)
        : [...prev.programs, program],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailtoLink = `mailto:vediquepreschool@gmail.com?subject=Admission Enquiry&body=${encodeURIComponent(
      `Parent Name: ${formData.parentName}
Phone: ${formData.phone}
Email: ${formData.email}
Child Name: ${formData.childName}
DOB: ${formData.dob}
Programs: ${formData.programs.join(", ")}

Message:
${formData.message}`,
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <>
      <FontLoader />

      <section
        ref={sectionRef}
        id="contact"
        className="relative px-4 py-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at top left, #EFE6FF 0%, #F4EEFF 40%, #FFFFFF 75%)",
          fontFamily: "Inter, sans-serif",
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
            className={`text-center mb-14 transition-all duration-700 ${
              visible ? "opacity-100" : "opacity-0 translate-y-6"
            }`}>
                        <p
              className="inline-block mb-6 px-6 py-2 rounded-full
                          text-xl font-bold border border-[#E38342]
                          text-[#E38342] bg-gradient-to-b from-[#3493C5]/50 to-white

 shadow-sm">
              Contact Us
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2E1A47]">
              Let’s Start a Conversation
              <br />
              <span
                className="italic font-light text-[#E38342] text-2xl sm:text-3xl md:text-4xl"
                style={{ fontFamily: "Instrument Serif, serif" }}>
                We’re Here to Help You
              </span>
            </h2>

            <p
              className="text-[#3A216A] max-w-3xl mx-auto text-xl sm:text-2xl"
              style={{
                fontFamily: "'Comic Neue', 'Nunito', sans-serif",
                fontStyle: "normal",
              }}>
              Have a question or want to know more about <b>Vedique</b>? We’d
              love to hear from you.
            </p>
          </div>

          {/* ===== FORM + MAP GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* ===== FORM ===== */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] p-6 sm:p-10 shadow-xl border border-[#6B4FA3]/20 space-y-6"
              style={{
                background:
                  "radial-gradient(circle at top right, #F3ECFB 0%, #FFF6FF 55%, #FFFFFF 100%)",
              }}>
              <input
                name="parentName"
                placeholder="Parent Name *"
                required
                onChange={handleChange}
                className="input"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  onChange={handleChange}
                  className="input"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  required
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="childName"
                  placeholder="Child’s Name *"
                  required
                  onChange={handleChange}
                  className="input"
                />
                <input
                  name="dob"
                  type="date"
                  required
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Programs */}
              <div>
                <p className="font-bold text-[#6B4FA3] mb-3">
                  Select the program(s) you are interested in : *
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#6B4FA3]">
                  {programs.map((p) => (
                    <label key={p} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckbox(p)}
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                name="message"
                rows="4"
                placeholder="Type your Message..."
                onChange={handleChange}
                className="input"
              />

              <button
                type="submit"
                className="w-full text-white cursor-pointer font-semibold px-6 py-3 rounded-[18px] shadow-lg hover:scale-[1.02] transition"
                style={{
                  background:
                    "linear-gradient(180deg, #6B4FA3 0%, #8E6FD1 100%)",
                }}>
                Submit Enquiry
              </button>
            </form>

            {/* ===== MAP ===== */}
            <div className="rounded-[28px] overflow-hidden shadow-xl border border-[#6B4FA3]/20">
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
          .input {
            width: 100%;
            padding: 14px 16px;
            border-radius: 14px;
            border: 1px solid #6B4FA340;
            outline: none;
            font-size: 16px;
            background: #FFFFFF;
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
