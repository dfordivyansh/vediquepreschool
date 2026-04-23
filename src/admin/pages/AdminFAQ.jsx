import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  Timestamp,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FaTrash, FaEdit } from "react-icons/fa";

const CATEGORIES = [
  "playgroup",
  "nursery",
  "lkg",
  "ukg",
  "parenttoddler",
  "daycare",
  "enrichment",
];

const AdminFAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("playgroup");

  const [faqs, setFaqs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 🔥 FETCH */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "faqs"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFaqs(data);
    });

    return () => unsub();
  }, []);

  /* ➕ ADD / UPDATE */
  const handleSubmit = async () => {
    if (!question || !answer) return alert("Fill all fields");

    setLoading(true);

    try {
      if (editId) {
        await updateDoc(doc(db, "faqs", editId), {
          question,
          answer,
          category,
        });

        alert("Updated ✅");
        setEditId(null);
      } else {
        await addDoc(collection(db, "faqs"), {
          question,
          answer,
          category,
          createdAt: Timestamp.now(),
        });

        alert("FAQ Added ✅");
      }

      setQuestion("");
      setAnswer("");
      setCategory("playgroup");
    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  /* ✏️ EDIT */
  const handleEdit = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category || "playgroup");
    setEditId(faq.id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ❌ DELETE */
  const handleDelete = async (id) => {
    if (!confirm("Delete FAQ?")) return;
    await deleteDoc(doc(db, "faqs", id));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#E6E0F8] to-[#D7C7F2]">

      {/* ===== FORM ===== */}
      <div className="bg-white/80 p-8 rounded-3xl shadow-xl max-w-xl mx-auto mb-10">

        <h2 className="text-2xl font-bold text-[#b62474] mb-6 text-center">
          {editId ? "Edit FAQ ✏️" : "Add FAQ"}
        </h2>

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="w-full p-3 mb-3 rounded-xl border"
        />

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
          rows={4}
          className="w-full p-3 mb-3 rounded-xl border"
        />

        {/* 🔥 CATEGORY SELECT */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl border"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl text-white font-bold"
          style={{
            background: "linear-gradient(to bottom, #6B4FA3, #8E6FD1)",
          }}
        >
          {loading ? "Saving..." : editId ? "Update FAQ" : "Add FAQ"}
        </button>
      </div>

      {/* ===== LIST ===== */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl font-bold mb-6 text-[#3A216A]">
          All FAQs
        </h3>

        <div className="grid gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-5 rounded-2xl shadow flex justify-between items-start"
            >
              <div>
                <p className="font-bold text-[#6B4FA3]">
                  {faq.question}
                </p>

                <p className="text-gray-600 text-sm mt-1">
                  {faq.answer}
                </p>

                <p className="text-xs mt-2 text-[#b62474] font-semibold">
                  {faq.category}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(faq)}
                  className="text-blue-500"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(faq.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminFAQ;