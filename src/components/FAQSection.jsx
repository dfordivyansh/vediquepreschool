import React, { useEffect, useState } from "react";
import { db } from "../admin/firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit as limitFn,
} from "firebase/firestore";
import {
  Plus,
  Minus,
  HelpCircle,
  MessageCircleQuestion,
  Lightbulb,
} from "lucide-react";

const FAQSection = ({ category = "all", limit = null }) => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    let q;

    // ✅ CATEGORY LOGIC
    if (category === "all") {
      q = query(collection(db, "faqs"));
    } else {
      q = query(
        collection(db, "faqs"),
        where("category", "==", category)
      );
    }

    // ✅ LIMIT
    if (limit) {
      q = query(q, limitFn(limit));
    }

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFaqs(data);
    });

    return () => unsub();
  }, [category, limit]);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  if (!faqs.length) return null;

  return (
    <section
      className="relative px-4 py-14 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 80%)",
      }}
    >
      {/* 🔥 FLOATING ICONS (UI SAME) */}
      {[HelpCircle, MessageCircleQuestion, Lightbulb].map((Icon, i) => (
        <Icon
          key={i}
          className="absolute text-[#6B4FA3]/10"
          size={120}
          style={{
            top: `${10 + i * 25}%`,
            left: i % 2 === 0 ? "4%" : "88%",
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="inline-block mb-4 px-6 py-2 rounded-full text-xl font-bold border border-[#E38342] text-[#2E1A47] bg-gradient-to-b from-[#3493C5]/40 to-white shadow-sm">
            FAQs
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#b62474]">
            Frequently Asked Questions
          </h2>

          <p className="text-[#3A216A] mt-3 text-lg">
            Everything parents usually ask us
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-5">
          {faqs.map((faq, i) => (
            <div
              key={faq.id}
              className="rounded-2xl border border-[#6B4FA3]/20 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{
                background:
                  "radial-gradient(circle at center, #F3ECFB 0%, #FFFFFF 100%)",
              }}
            >
              {/* QUESTION */}
              <div
                onClick={() => toggle(i)}
                className="flex justify-between items-center cursor-pointer px-6 py-5"
              >
                <h3 className="font-bold text-[#2E1A47] text-lg sm:text-xl">
                  {faq.question}
                </h3>

                {openIndex === i ? (
                  <Minus className="text-[#6B4FA3]" />
                ) : (
                  <Plus className="text-[#6B4FA3]" />
                )}
              </div>

              {/* ANSWER */}
              <div
                className={`px-6 text-gray-700 text-[15px] sm:text-[18px] leading-relaxed transition-all duration-300 ${
                  openIndex === i
                    ? "max-h-[400px] pb-5 opacity-100"
                    : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;