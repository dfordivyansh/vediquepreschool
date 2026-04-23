import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaImage } from "react-icons/fa";

const AdminArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "articles"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(data);
    });

    return () => unsub();
  }, []);

  const deleteArticle = async (id) => {
    if (!confirm("Delete this article?")) return;
    await deleteDoc(doc(db, "articles", id));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#EFE6FF] to-[#D7C7F2]">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h2 className="text-3xl font-extrabold text-[#6B4FA3]">
          All Articles 📚
        </h2>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid gap-6">

        {articles.map((a) => {
          const thumbnail =
            a.sections?.[0]?.image || null;

          return (
            <div
              key={a.id}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition"
            >
              {/* LEFT IMAGE */}
              <div className="w-full md:w-60 h-40 md:h-auto bg-gray-100 flex items-center justify-center">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaImage className="text-gray-400 text-3xl" />
                )}
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex-1 p-5 flex flex-col justify-between">

                <div>
                  <h3 className="text-lg font-bold text-[#6B4FA3] mb-1">
                    {a.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-2">
                    {a.sections?.length || 0} sections
                  </p>

                  {/* SEO PREVIEW */}
                  {a.seo?.title && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      🔍 {a.seo.title}
                    </p>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4 mt-4">

                  <button
                    onClick={() => navigate(`/admin/edit-article/${a.id}`)}
                    className="flex items-center gap-2 text-blue-600 hover:scale-105 transition"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => deleteArticle(a.id)}
                    className="flex items-center gap-2 text-red-500 hover:scale-105 transition"
                  >
                    <FaTrash /> Delete
                  </button>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminArticlesList;