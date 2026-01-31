import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(circle at top, #EFE6FF 0%, #F4EEFF 45%, #FFFFFF 80%)",
      }}
    >
      <div className="max-w-lg w-full bg-white rounded-[28px] shadow-2xl p-8 text-center border border-[#6B4FA3]/20">
        <CheckCircle size={64} className="mx-auto text-[#6B4FA3] mb-4" />

        <h1 className="text-3xl font-extrabold text-[#2E1A47] mb-2">
          Thank You!
        </h1>

        <p className="text-lg text-[#3A216A] mb-6">
          Your enquiry has been submitted successfully.  
          Our team at <b>Vedique Preschool</b> will get back to you shortly.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center
          px-6 py-3 rounded-xl
          bg-gradient-to-r from-[#6B4FA3] to-[#8E6FD1]
          text-white font-semibold
          shadow-md hover:shadow-lg hover:scale-[1.03] transition"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

export default ThankYou;
