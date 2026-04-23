import { useEffect, useState } from "react";
import { db } from "../admin/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Sparkles,
  Lightbulb,
  ArrowRight,
  FileText,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "articles"), (snap) => {
      setArticles(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <>
      <FontLoader />
<Navbar />
      <section
        className="relative min-h-screen mt-15 px-4 py-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 80%)",
          fontFamily: "'Comic Neue', 'Nunito', sans-serif",
        }}
      >
        {/* ===== FLOATING ICONS ===== */}
        {[BookOpen, Sparkles, Lightbulb].map((Icon, i) => (
          <Icon
            key={i}
            className="absolute text-[#6B4FA3]/10"
            size={120}
            style={{
              top: `${10 + i * 25}%`,
              left: i % 2 === 0 ? "5%" : "90%",
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ===== HEADER ===== */}
          <div className="text-center mb-16">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#EDE7FF] text-[#6B4FA3] font-semibold mb-4">
              <FileText size={16} /> Knowledge Hub
            </div>

            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#6B4FA3]"
              style={{ fontFamily: "'Chewy', system-ui" }}
            >
              Our Articles
            </h1>

            <p className="text-[#3A216A] mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
              Explore insights on early childhood education, enrichment programs,
              and modern learning approaches for kids.
            </p>
          </div>

          {/* ===== GRID ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a, index) => {
              const firstImage = a.sections?.[0]?.image;

              return (
                <div
                  key={a.id}
                  onClick={() => navigate(`/article/${a.id}`)}
                  className="group cursor-pointer rounded-[28px] overflow-hidden shadow-xl
                  transition-all duration-500 hover:-translate-y-2 hover:shadow-[#6B5FA7]/40"
                  style={{
                    background:
                      "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
                  }}
                >
                  {/* IMAGE */}
                  {firstImage && (
                    <div className="overflow-hidden">
                      <img
                        src={firstImage}
                        alt="article"
                        className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className="p-6 text-center">

                    {/* ICON */}
                    <div className="flex justify-center mb-3">
                      <div className="bg-[#F1E9FF] p-3 rounded-full">
                        <BookOpen className="text-[#6B4FA3]" size={20} />
                      </div>
                    </div>

                    <h2 className="text-xl font-extrabold text-[#2E1A47] mb-2">
                      {a.title}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4">
                      {a.sections?.length} Sections • Educational Article
                    </p>

                    {/* CTA */}
                    <div className="flex justify-center items-center gap-2 text-[#6B4FA3] font-semibold group-hover:gap-3 transition">
                      Read Article <ArrowRight size={16} />
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* EMPTY STATE */}
          {articles.length === 0 && (
            <div className="text-center mt-20">

              <div className="flex justify-center mb-4">
                <div className="bg-[#F1E9FF] p-4 rounded-full">
                  <BookOpen className="text-[#6B4FA3]" size={28} />
                </div>
              </div>

              <p className="text-gray-500 text-lg">
                No articles available yet
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ArticlesPage;