import React, { useState } from "react";
import { FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import { MessageCircle, Star, Users } from "lucide-react";

/* ===== FONT LOADER ===== */
const FontLoader = () => (
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Chewy&display=swap"
      rel="stylesheet"
    />
  </>
);

const reviews = [
  {
    name: "Divyansh Srivastava",
    text: "Vedique Preschool is an excellent place for early learning. The teachers are caring, the environment is safe and friendly, and the activities are fun and educational. Highly recommended for a great start to a child’s journey! 😊",
  },
  {
    name: "Chandan Kumar",
    text: "One of the best Premium Preschool in Bandlaguda Jagir, Hyderabad. They have lots of programs for the little kids, which no any other school provide. The school infrastructure is also very good. The teachers and staff are very experienced.",
  },
  {
    name: "Osuru Mounika",
    text: "Excellent place for kids to learn it is very fun learning and staff is very caring and teachers are very good, friendly environment and kids will love",
  },
  {
    name: "Amit Prasher",
    text: "Our son has truly thrived in his playgroup experience. The engaging and nurturing environment has fostered his social skills and curiosity wonderfully. We are so impressed with the dedicated educators who make learning feel like an adventure each day. The variety of activities offered stimulates his development in such a positive way. We are deeply grateful for the enriching foundation this school is providing for him.",
  },
  {
    name: "Yash Sri",
    text: "Vedique Preschool is truly a second home for kids ❤️ The teachers are incredibly caring, and the learning approach is fun, creative, and engaging. You can actually see the confidence and growth in your child every day. Highly recommended!",
  },
  {
    name: "Roshini Nishad",
    text: "Nice balance of learning and fun activities. Teachers handle kids with patience and care. Highly recommended preschool. 😊",
  },
];

const MAX_LENGTH = 120;

export default function ReviewsSection() {
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <FontLoader />

      <section
        className="relative py-14 px-4 sm:px-8 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 75%)",
        }}
      >
        {/* ===== FLOATING ICONS ===== */}
        {[MessageCircle, Star, Users].map((Icon, i) => (
          <Icon
            key={i}
            className="absolute text-[#6B4FA3]/15
              w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40"
            style={{
              top: `${20 + i * 25}%`,
              left: i % 2 === 0 ? "6%" : "88%",
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          
          {/* HEADER */}
          <div className="mb-14">
            <p className="inline-block mb-6 px-6 py-2 rounded-full text-2xl sm:text-3xl font-bold border border-[#E38342] text-[#2E1A47] bg-gradient-to-b from-[#3493C5]/40 to-white shadow-sm">
              Testimonials
            </p>

            <h2
              style={{ fontFamily: "'Chewy', system-ui, sans-serif" }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#b62474] mb-3"
            >
              What Parents Say About Us
            </h2>

            <p
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-lg text-[#2E1A47]"
            >
              Real feedback from our happy parents
            </p>
          </div>

          {/* ===== MARQUEE ===== */}
          <div className="relative overflow-hidden">
            <div className="marquee">
              <div className="marquee-track">

                {[...reviews, ...reviews].map((r, i) => {
                  const isExpanded = expanded[i];
                  const text =
                    r.text.length > MAX_LENGTH && !isExpanded
                      ? r.text.substring(0, MAX_LENGTH) + "..."
                      : r.text;

                  return (
                    <div key={i} className="testimonial-card">

                      <div className="google-badge">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                          alt="Google"
                        />
                        Google
                      </div>

                      <FaQuoteLeft className="text-[#6B4FA3]/40 text-3xl mb-3" />

                      <p className="text-[#444]">
                        {text}
                        {r.text.length > MAX_LENGTH && (
                          <span
                            onClick={() => toggleReadMore(i)}
                            className="ml-2 text-[#6B4FA3] font-semibold cursor-pointer"
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </span>
                        )}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <FaUserCircle className="text-3xl text-[#6B4FA3]" />
                        <div>
                          <p className="font-bold text-[#6B4FA3]">{r.name}</p>
                          <div className="text-yellow-400 text-sm">★★★★★</div>
                        </div>
                      </div>

                    </div>
                  );
                })}

              </div>
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-14">
            <a
              href="https://g.page/r/Cc9IlIh-LCWBEAE/review"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 rounded-[18px] font-semibold text-lg text-white shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-300"
              style={{
                background:
                  "linear-gradient(180deg, #6B4FA3 0%, #8E6FD1 100%)",
              }}
            >
              Give Your Feedback ⭐
            </a>
          </div>
        </div>

        {/* STYLES */}
        <style>{`
          .marquee-track {
            display: flex;
            gap: 20px;
            width: max-content;
            animation: scroll 30s linear infinite;
          }

          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          .testimonial-card {
            min-width: 280px;
            max-width: 280px;
            background: white;
            padding: 22px;
            border-radius: 22px;
            text-align: left;
            border: 1px solid rgba(107,79,163,0.15);
            box-shadow: 0 10px 30px rgba(107,79,163,0.15);
            transition: 0.3s;
          }

          .testimonial-card:hover {
            transform: translateY(-8px) scale(1.02);
          }

          .google-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .google-badge img {
            width: 16px;
          }
        `}</style>
      </section>
    </>
  );
}