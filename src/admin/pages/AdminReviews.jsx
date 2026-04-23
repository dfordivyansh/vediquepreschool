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

const AdminReviews = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [editId, setEditId] = useState(null);

  /* 🔥 FETCH REALTIME */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(data);
    });

    return () => unsub();
  }, []);

  /* ⭐ STAR COMPONENT */
  const StarRating = () => {
    return (
      <div className="flex gap-1 justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative cursor-pointer text-3xl">

            {/* LEFT HALF */}
            <span
              onClick={() => setRating(star - 0.5)}
              className="absolute left-0 w-1/2 h-full z-10"
            />

            {/* RIGHT HALF */}
            <span
              onClick={() => setRating(star)}
              className="absolute right-0 w-1/2 h-full z-10"
            />

            {/* EMPTY STAR */}
            <span className="text-gray-300">★</span>

            {/* FILLED PART */}
            <span
              className="absolute top-0 left-0 text-yellow-400 overflow-hidden"
              style={{
                width:
                  rating >= star
                    ? "100%"
                    : rating >= star - 0.5
                    ? "50%"
                    : "0%",
              }}
            >
              ★
            </span>
          </div>
        ))}
      </div>
    );
  };

  /* ➕ ADD / UPDATE */
  const handleSubmit = async () => {
    if (!name || !text || rating === 0)
      return alert("Fill all fields & select rating");

    setLoading(true);

    try {
      if (editId) {
        await updateDoc(doc(db, "reviews", editId), {
          name,
          text,
          rating,
        });

        alert("Updated ✅");
        setEditId(null);
      } else {
        await addDoc(collection(db, "reviews"), {
          name,
          text,
          rating,
          createdAt: Timestamp.now(),
        });

        alert("Added ✅");
      }

      setName("");
      setText("");
      setRating(0);
    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  /* ✏️ EDIT */
  const handleEdit = (review) => {
    setName(review.name);
    setText(review.text);
    setRating(review.rating || 0);
    setEditId(review.id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ❌ DELETE */
  const handleDelete = async (id) => {
    if (!confirm("Delete this review?")) return;
    await deleteDoc(doc(db, "reviews", id));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#E6E0F8] to-[#D7C7F2]">

      {/* ===== FORM ===== */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-md mx-auto mb-10">
        <h2 className="text-2xl font-bold text-[#b62474] mb-6 text-center font-[Chewy]">
          {editId ? "Edit Review ✏️" : "Add Review"}
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="User Name"
          className="w-full p-3 mb-4 rounded-xl border"
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Review Text"
          rows={4}
          className="w-full p-3 mb-4 rounded-xl border"
        />

        {/* ⭐ STAR */}
        <StarRating />

        <p className="text-center text-sm text-gray-600 mb-4">
          Rating: {rating} ⭐
        </p>

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl text-white font-bold"
          style={{
            background: "linear-gradient(to bottom, #E38342, #FFC107)",
          }}
        >
          {loading ? "Saving..." : editId ? "Update Review" : "Add Review"}
        </button>
      </div>

      {/* ===== LIST ===== */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-6 text-[#3A216A]">
          All Reviews
        </h3>

        <div className="grid gap-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white p-5 rounded-2xl shadow flex justify-between items-start"
            >
              <div>
                <p className="font-bold text-[#6B4FA3]">{r.name}</p>
                <p className="text-gray-600 text-sm mt-1">{r.text}</p>

                {/* ⭐ SHOW RATING */}
                <div className="text-yellow-400 mt-2">
                  {r.rating} ⭐
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(r)}
                  className="text-blue-500 hover:scale-110"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-500 hover:scale-110"
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

export default AdminReviews;