import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Mic,
  FlaskConical,
  LayoutGrid,
  ClipboardCheck,
  Leaf,
  GraduationCap,
  Apple,
  PartyPopper,
  ShieldCheck,
  Bus,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";

/* ================= IMPORTANT TERMS ================= */
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

const importantTerms = [
  "Vedique",
  "library",
  "books",
  "story",
  "confidence",
  "learning",
  "hands-on",
  "holistic",
  "independence",
  "discipline",
  "exams",
  "eco-friendly",
  "teachers",
  "healthy",
  "field trips",
  "festivals",
  "safe",
  "secure",
  "transportation",
  "parents",
  "children",
];

/* ================= DATA ================= */

const highlights = [
  {
    title: "In-house Library",
    icon: BookOpen,
    text: [
      "We believe that books are among the greatest teachers, next only to parents and educators. At Vedique, we take pride in our well-stocked in-house library, thoughtfully curated with age-appropriate books for young readers. Every Friday, each child brings home a library book to enjoy over the weekend, either independently or with the support of their parents. Reading is also gently woven into daily playtime, encouraging children to develop a natural love for books from an early age.",
    ],
  },
  {
    title: "Stage Area & Storytelling",
    icon: Mic,
    text: [
      "For our pre-primary children, one of the most exciting spaces at Vedique is the stage area—where stories truly come alive. Here, teachers go beyond narration, bringing tales to life through props, costumes, and role play. But we don’t stop there—we invite children to step into the spotlight and become storytellers themselves.",
      "At Vedique, we believe every child is a star, and the moment they hold the microphone, they shine. By encouraging children to narrate stories in their own words or confidently introduce themselves, we gently help them overcome stage fear. This joyful exposure builds self-expression and confidence—essential qualities in the future leaders we are nurturing.",
    ],
  },
  {
    title: "Specialised Learning Labs",
    icon: FlaskConical,
    text: [
      "Vedique takes pride in its specially designed learning labs that bring concepts to life through hands-on experiences. These labs focus on key areas such as Mathematics, Language, Thematic Learning, and Life Skills.",
      "Each lab is fully equipped with age-appropriate learning aids, including number and alphabet cut-outs, fruit and sign models, flashcards, puzzles, and other interactive props. We believe that young children learn best when they can touch, explore, and experience concepts—making learning faster, deeper, and far more enjoyable than learning through instruction alone.",
    ],
  },
  {
    title: "Designated Areas",
    icon: LayoutGrid,
    text: [
      "At Vedique, we have thoughtfully designed specific areas for different activities to help children understand structure and boundaries from an early age. There are dedicated spaces for learning and play, cosy reading corners, organised toy baskets, and a dining area where meals are enjoyed while gently introducing table manners. We also have a designated water station, with regular reminders from teachers to encourage healthy hydration habits. This structured environment helps children develop independence, discipline, and a sense of responsibility in a natural and nurturing way.",
    ],
  },
  {
    title: "No Exams",
    icon: ClipboardCheck,
    text: [
      "The word “exams” often brings with it unnecessary fear and pressure—and we believe early learning should be joyful, not intimidating. At Vedique, we ensure that children grow without the anxiety of formal testing, while still thoughtfully tracking their progress.",
      "Instead of traditional examinations, we create meaningful opportunities for children to confidently showcase what they have learned. Twice a year, children proudly demonstrate their skills to their parents through interactive learning stations such as Literacy, Mathematics, Colours, Shapes, Storytelling, introducing themselves confidently and more. This approach allows caregivers to understand their child’s development while celebrating learning as a positive and empowering experience.",
    ],
  },
  {
    title: "Eco-friendly premises",
    icon: Leaf,
    text: [
      "At Vedique, we believe in not just teaching the right values, but living by them as well. Our premises consciously minimise the use of plastic and single-use, non–eco-friendly materials. From furniture and toys to learning props and cutlery, we choose wood and other durable, reusable materials wherever possible. Rest assured, every item is carefully selected and thoroughly safety-checked to ensure a secure and child-friendly environment—while nurturing respect for the planet from an early age.",
    ],
  },
  {
    title: "Trained teachers and Support Staff",
    icon: GraduationCap,
    text: [
      "At Vedique, we value our teachers and support staff just as deeply as we value our children and parents. Our educators are experienced, professionally trained, and regularly upskilled to stay aligned with best teaching practices. Our support staff are also carefully selected and appointed only after thorough background checks—ensuring your child is always cared for by capable, compassionate, and trustworthy hands.",
    ],
  },
  {
    title: "Healthy Meal Suggestions",
    icon: Apple,
    text: [
      "While Vedique does not provide meals—recognising that young children are often most comfortable with home-cooked food—we share carefully curated healthy meal suggestions with parents every week. Children are encouraged to bring the suggested meal on the specified day. We also welcome open communication, and parents are always free to discuss any dietary preferences or exceptions so we can better understand and support each child’s eating habits.",
    ],
  },
  {
    title: "Fieldtrips & Celebrations",
    icon: PartyPopper,
    text: [
      "We believe that meaningful learning extends beyond classroom walls. At Vedique, we organise thoughtfully curated field trips throughout the year for all students, offering them real-world experiences that enrich their understanding - always with prior parental consent and under careful supervision.",
      "Beyond field trips, we enrich our children’s learning by introducing them to Indian and popular festivals from around the world. Each celebration is embraced with love and pride, while thoughtfully highlighting the traditions and cultural significance behind it. On these special occasions, Vedique transforms into a vibrant little India—fostering cultural awareness, inclusivity, and joyful learning experiences for our children.",
    ],
  },
  {
    title: "Our Safe & Secure Facility",
    icon: ShieldCheck,
    text: [
      "We understand the natural anxiety that comes with leaving your child at school. At Vedique, your peace of mind is our priority. Our centre features child-friendly interiors, round-the-clock CCTV surveillance across the premises, and a fully air-conditioned environment - ensuring a safe, comfortable, and secure space for your child to learn and grow.",
    ],
  },
  {
    title: "Transportation",
    icon: Bus,
    text: [
      "Vedique offers a safe and reliable pick-up and drop-off facility, with transportation managed by a verified and trained driver to ensure your child’s comfort and safety at all times.",
    ],
  },
];

/* ================= UTILS ================= */

const applyBold = (text) => {
  let t = text;
  importantTerms.forEach((word) => {
    t = t.replace(new RegExp(`(${word})`, "gi"), "<strong>$1</strong>");
  });
  return t;
};

/* ================= COMPONENT ================= */

const Highlights = () => {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  const scrollYRef = useRef(0);

  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollYRef.current);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, [open]);

  return (
    <section
      className="relative px-4 py-18 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #E7DBFA 0%, #F1E6FF 45%, #FAF7FE 80%)",
      }}>
      <FontLoader />

      {/* ===== BACKGROUND ICONS ===== */}
      {[BookOpen, Mic, Leaf, GraduationCap, Apple, ShieldCheck].map(
        (Icon, i) => (
          <Icon
            key={i}
            className="absolute text-[#6B4FA3]/15"
            style={{
              top: `${10 + i * 12}%`,
              left: i % 2 === 0 ? "4%" : "88%",
            }}
            size={window.innerWidth < 768 ? 70 : 140}
          />
        ),
      )}

      {/* ===== HEADER ===== */}
      <div className="text-center max-w-4xl mx-auto mb-24">
            <p
              className="inline-block mb-6 px-6 py-2 rounded-full
                          text-xl font-bold border border-[#E38342]
                          text-[#E38342] bg-gradient-to-b from-[#3493C5]/50 to-white

 shadow-sm">
              Highlights
            </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2E1A47]">
          Thoughtfully Designed for
          <br />
          <span
            className="italic font-light text-2xl sm:text-3xl md:text-4xl text-[#E38342]"
            style={{ fontFamily: "Instrument Serif, serif" }}>
            Happy, Confident Childhoods
          </span>
        </h2>
      </div>

      {/* ===== DESKTOP CIRCLE ===== */}
      <div className="hidden lg:flex relative justify-center items-center h-[800px]">
        <svg
          viewBox="0 0 240 240"
          className="absolute w-92 h-92 animate-spin-slow">
          <defs>
            <path
              id="circleText"
              d="
        M120,120
        m-90,0
        a90,90 0 1,1 180,0
        a90,90 0 1,1 -180,0
      "
            />
          </defs>

          <text
            fill="#2E1A47"
            fontSize="33"
            fontFamily="Instrument Serif, serif"
            textAnchor="middle">
            <textPath href="#circleText" startOffset="50%">
                Learn • Play • Grow • Discover • Shine • Together •
            </textPath>
          </text>
        </svg>

        {highlights.map((item, i) => {
          const angle = (360 / highlights.length) * i;
          const r = 330;
          const x = Math.cos((angle * Math.PI) / 180) * r;
          const y = Math.sin((angle * Math.PI) / 180) * r;
          const Icon = item.icon;

          return (
            <div
              key={i}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              className="absolute">
              <div
                onClick={() => {
                  setActive(i);
                  setOpen(true);
                }}
                className="w-42 h-42 rounded-full bg-gradient-to-b from-[#F3ECFB] to-white
                border border-[#6B4FA3]/30 shadow-xl flex flex-col items-center justify-center
                text-center cursor-pointer transition-transform duration-300 hover:scale-110"
                style={{
                  fontFamily: "'Comic Neue', 'Nunito', sans-serif",
                  fontStyle: "normal",
                }}>
                <Icon size={40} className="text-[#6B4FA3]" />
                <p className="mt-2 text-xl font-bold text-[#2E1A47] px-3">
                  {item.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== MOBILE LAYOUT (ROTATING SVG + 2-2 PATTERN) ===== */}
      <div className="lg:hidden w-full flex flex-col items-center gap-10">
        {/* 🔵 ROTATING SVG (TOP) */}
        <div className="flex justify-center w-full pointer-events-none">
          <svg viewBox="0 0 240 240" className="w-56 h-56 animate-spin-slow">
            <defs>
              <path
                id="circleTextMobile"
                d="M120,120 m-90,0 a90,90 0 1,1 180,0 a90,90 0 1,1 -180,0"
              />
            </defs>
            <text
              fill="#2E1A47"
              fontSize="33"
              fontFamily="Instrument Serif, serif"
              textAnchor="middle">
              <textPath href="#circleTextMobile" startOffset="50%">
                Learn • Play • Grow • Discover • Shine • Together •
              </textPath>
            </text>
          </svg>
        </div>

        {/* 🔵 HIGHLIGHTS : STRICT 2-2 ROWS */}
        {(() => {
          const rows = [];

          for (let i = 0; i < highlights.length; i += 2) {
            rows.push(
              <div
                key={`row-${i}`}
                className="flex justify-center gap-8 w-full">
                {[i, i + 1].map((idx) => {
                  const item = highlights[idx];
                  if (!item) return null;
                  const Icon = item.icon;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setActive(idx);
                        setOpen(true);
                      }}
                      className="w-40 h-40 rounded-full bg-gradient-to-b from-[#F3ECFB] to-white
                border border-[#6B4FA3]/25 shadow-lg flex flex-col items-center justify-center
                text-center cursor-pointer transition-transform duration-300
                active:scale-95 hover:scale-105"
                      style={{
                        fontFamily: "'Comic Neue', 'Nunito', sans-serif",
                        fontStyle: "normal",
                      }}>
                      <Icon size={36} className="text-[#6B4FA3]" />
                      <p className="mt-2 text-[19px] font-bold text-[#2E1A47] px-3">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>,
            );
          }

          return rows;
        })()}
      </div>

      {/* ===== MODAL ===== */}
      {open && active !== null && highlights[active] && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          {/* ❌ CLOSE BUTTON (TOP RIGHT – ALL DEVICES) */}
          <button
            onClick={() => setOpen(false)}
            className="fixed top-5 right-5 z-[60]
      bg-white rounded-full p-3 shadow-lg
      hover:scale-110 transition">
            <X size={22} />
          </button>

          {/* ⬅️ PREVIOUS (DESKTOP: LEFT CENTER, MOBILE: BOTTOM LEFT) */}
          <button
            onClick={() =>
              setActive((prev) =>
                prev === null
                  ? 0
                  : (prev - 1 + highlights.length) % highlights.length,
              )
            }
            className="
    fixed z-[60]
    w-12 h-12
    bg-white rounded-full shadow-lg
    flex items-center justify-center
    hover:scale-110 transition

    /* Desktop */
    md:left-10 md:top-1/2 md:-translate-y-1/2

    /* Mobile */
    left-6 bottom-24
  ">
            <ArrowLeft size={22} />
          </button>

          {/* ➡️ NEXT (DESKTOP: RIGHT CENTER, MOBILE: BOTTOM RIGHT) */}
          <button
            onClick={() =>
              setActive((prev) =>
                prev === null ? 0 : (prev + 1) % highlights.length,
              )
            }
            className="
    fixed z-[60]
    w-12 h-12
    bg-white rounded-full shadow-lg
    flex items-center justify-center
    hover:scale-110 transition

    /* Desktop */
    md:right-10 md:top-1/2 md:-translate-y-1/2

    /* Mobile */
    right-6 bottom-24
  ">
            <ArrowRight size={22} />
          </button>

          {/* ===== CONTENT BOX ===== */}
          <div
            className="relative w-full max-w-3xl rounded-3xl p-8
      overflow-y-auto hide-scrollbar"
            style={{
              height: "60vh",
              background:
                "radial-gradient(circle at center, #FFFFFF 0%, #EFE4FF 55%, #DAC7F7 100%)",
            }}>
            {/* BIG ICON */}
            {React.createElement(highlights[active].icon, {
              size: 76,
              className: "mx-auto text-[#6B4FA3] mb-4",
            })}

            <h3 className="text-3xl font-bold text-center text-[#2E1A47] mb-6">
              {highlights[active].title}
            </h3>

            <div
              className="space-y-4 text-[#3A216A] text-xl"
              style={{
                fontFamily: "'Comic Neue', 'Nunito', sans-serif",
                fontStyle: "normal",
              }}
              dangerouslySetInnerHTML={{
                __html: highlights[active].text
                  .map((p) => `<p>${applyBold(p)}</p>`)
                  .join(""),
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default Highlights;
