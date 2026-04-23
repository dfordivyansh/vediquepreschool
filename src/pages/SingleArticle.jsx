import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../admin/firebase/config";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";

import { BookOpen, ArrowRight, FileText } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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

const SingleArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);

  /* 🔥 FETCH CURRENT ARTICLE */
  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "articles", id));
      if (snap.exists()) setArticle(snap.data());
    };
    fetch();
  }, [id]);

  /* 🔥 FETCH ALL ARTICLES */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "articles"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllArticles(data);
    });

    return () => unsub();
  }, []);

  if (!article)
    return (
      <div className="text-center py-20 text-[#6B4FA3] text-xl font-semibold">
        Loading Article...
      </div>
    );

  /* 🔥 RELATED ARTICLES */
  const related = allArticles.filter((a) => a.id !== id);

  return (
    <>
    <Navbar />
      <FontLoader />

      <section
        className="px-4 py-16 mt-15"
        style={{
          background:
            "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 80%)",
          fontFamily: "'Comic Neue', 'Nunito', sans-serif",
        }}>
        <div className="max-w-6xl mx-auto">
          {/* ===== TITLE ===== */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="bg-[#F1E9FF] p-3 rounded-full">
                <BookOpen className="text-[#6B4FA3]" />
              </div>
            </div>

            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#6B4FA3]"
              style={{ fontFamily: "'Chewy', system-ui" }}>
              {article.title}
            </h1>
          </div>

          {/* ===== SECTIONS ===== */}
          <div className="space-y-20">
            {article.sections.map((sec, i) => {
              const reverse = i % 2 !== 0;

              return (
                <div
                  key={i}
                  className="grid md:grid-cols-2 gap-12 items-center">
                  {/* TEXT */}
                  <div className={reverse ? "md:order-2" : ""}>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E1A47] mb-4">
                      {sec.heading}
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-lg">
                      {sec.content}
                    </p>
                  </div>

                  {/* IMAGE */}
                  <div className={reverse ? "md:order-1" : ""}>
                    <img
                      src={sec.image}
                      alt=""
                      className="rounded-[24px] shadow-xl hover:scale-[1.02] transition duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===== RELATED ARTICLES ===== */}
          {related.length > 0 && (
            <div className="mt-24">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-3">
                  <div className="bg-[#F1E9FF] p-3 rounded-full">
                    <FileText className="text-[#6B4FA3]" />
                  </div>
                </div>

                <h2
                  className="text-3xl sm:text-4xl font-extrabold text-[#b62474]"
                  style={{ fontFamily: "'Chewy', system-ui" }}>
                  Related Articles
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.slice(0, 6).map((a) => {
                  const img = a.sections?.[0]?.image;

                  return (
                    <div
                      key={a.id}
                      onClick={() => navigate(`/article/${a.id}`)}
                      className="cursor-pointer rounded-[26px] overflow-hidden shadow-xl
                      hover:-translate-y-2 hover:shadow-[#6B5FA7]/40 transition duration-500"
                      style={{
                        background:
                          "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
                      }}>
                      {img && (
                        <img src={img} className="w-full h-44 object-cover" />
                      )}

                      <div className="p-5 text-center">
                        <div className="flex justify-center mb-2">
                          <BookOpen className="text-[#6B4FA3]" size={18} />
                        </div>

                        <h3 className="font-bold text-[#2E1A47] mb-2">
                          {a.title}
                        </h3>

                        <div className="flex justify-center items-center gap-1 text-[#6B4FA3] font-semibold text-sm">
                          Read <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SingleArticle;
