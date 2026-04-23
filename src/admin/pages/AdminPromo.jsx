import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  Megaphone,
  Calendar,
  Link as LinkIcon,
  ToggleRight,
} from "lucide-react";

const AdminPromo = () => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    offer: "",
    startDate: "",
    buttonText: "",
    redirect: "/enquiry",
    enabled: true,
    features: "",
  });

  const [loading, setLoading] = useState(false);

  /* 🔥 FETCH */
  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "promo_popup", "current"));
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          ...data,
          features: data.features?.join("\n") || "",
        });
      }
    };
    fetch();
  }, []);

  /* 💾 SAVE */
  const handleSave = async () => {
    setLoading(true);

    await setDoc(doc(db, "promo_popup", "current"), {
      ...form,
      features: form.features.split("\n"),
    });

    setLoading(false);
    alert("Popup Updated ✅");
  };

  /* 🔧 INPUT STYLE */
  const inputStyle =
    "w-full p-3 rounded-xl border border-[#6B4FA340] focus:border-[#6B4FA3] focus:ring-2 focus:ring-[#6B4FA330] outline-none";

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#E6E0F8] to-[#D7C7F2]">

      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl">

        {/* HEADER */}
        <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-[#b62474] mb-6">
          <Megaphone /> Promo Popup Manager
        </h2>

        <div className="space-y-4">

          {/* TITLE */}
          <div>
            <label className="text-sm font-semibold text-[#6B4FA3]">
              Title
            </label>
            <input
              className={inputStyle}
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
          </div>

          {/* SUBTITLE */}
          <div>
            <label className="text-sm font-semibold text-[#6B4FA3]">
              Subtitle
            </label>
            <input
              className={inputStyle}
              value={form.subtitle}
              onChange={(e) =>
                setForm({ ...form, subtitle: e.target.value })
              }
            />
          </div>

          {/* OFFER */}
          <div>
            <label className="text-sm font-semibold text-[#6B4FA3]">
              Offer Text
            </label>
            <input
              className={inputStyle}
              value={form.offer}
              onChange={(e) =>
                setForm({ ...form, offer: e.target.value })
              }
            />
          </div>

          {/* DATE */}
          <div>
            <label className="text-sm font-semibold text-[#6B4FA3] flex items-center gap-2">
              <Calendar size={14} /> Start Date
            </label>
            <input
              className={inputStyle}
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
            />
          </div>

          {/* FEATURES */}
          <div>
            <label className="text-sm font-semibold text-[#6B4FA3]">
              Features (one per line)
            </label>
            <textarea
              rows={4}
              className={inputStyle}
              value={form.features}
              onChange={(e) =>
                setForm({ ...form, features: e.target.value })
              }
            />
          </div>

          {/* BUTTON TEXT */}
          <div>
            <label className="text-sm font-semibold text-[#6B4FA3]">
              Button Text
            </label>
            <input
              className={inputStyle}
              value={form.buttonText}
              onChange={(e) =>
                setForm({ ...form, buttonText: e.target.value })
              }
            />
          </div>

          {/* REDIRECT */}
          <div>
            <label className="text-sm font-semibold text-[#6B4FA3] flex items-center gap-2">
              <LinkIcon size={14} /> Redirect URL
            </label>
            <input
              className={inputStyle}
              value={form.redirect}
              onChange={(e) =>
                setForm({ ...form, redirect: e.target.value })
              }
            />
          </div>

          {/* TOGGLE */}
          <div className="flex items-center justify-between mt-4 p-4 bg-[#F3ECFB] rounded-xl">
            <span className="font-semibold text-[#2E1A47]">
              Enable Popup
            </span>

            <button
              onClick={() =>
                setForm({ ...form, enabled: !form.enabled })
              }
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                form.enabled ? "bg-green-400" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  form.enabled ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="w-full mt-6 py-3 rounded-xl text-white font-bold text-lg"
          style={{
            background:
              "linear-gradient(to right, #6B4FA3, #8E6FD1)",
          }}
        >
          {loading ? "Saving..." : "Save Popup"}
        </button>
      </div>
    </div>
  );
};

export default AdminPromo;