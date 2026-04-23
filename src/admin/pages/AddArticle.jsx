import { useState } from "react";
import { db } from "../firebase/config";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { FaPlus, FaTrash, FaImage, FaSearch } from "react-icons/fa";

const CLOUD_NAME = "dkz8wxesb";
const UPLOAD_PRESET = "Vedique";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [keywords, setKeywords] = useState("");

  const [sections, setSections] = useState([
    { heading: "", content: "", image: null, preview: "" },
  ]);

  const [loading, setLoading] = useState(false);

  /* 🔥 IMAGE UPLOAD */
  const uploadImage = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: form }
    );

    const data = await res.json();
    return data.secure_url;
  };

  /* ➕ ADD SECTION */
  const addSection = () => {
    setSections([
      ...sections,
      { heading: "", content: "", image: null, preview: "" },
    ]);
  };

  /* ❌ REMOVE */
  const removeSection = (i) => {
    setSections(sections.filter((_, index) => index !== i));
  };

  /* ✏️ UPDATE */
  const updateSection = (i, field, value) => {
    const updated = [...sections];

    if (field === "image") {
      updated[i].image = value;
      updated[i].preview = URL.createObjectURL(value);
    } else {
      updated[i][field] = value;
    }

    setSections(updated);
  };

  /* 🎯 DRAG DROP HANDLER */
  const handleDrop = (e, i) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) updateSection(i, "image", file);
  };

  /* 💾 SAVE */
  const handleSubmit = async () => {
    if (!title) return alert("Title required");

    setLoading(true);

    const finalSections = [];

    for (let sec of sections) {
      let imgUrl = "";

      if (sec.image) {
        imgUrl = await uploadImage(sec.image);
      }

      finalSections.push({
        heading: sec.heading,
        content: sec.content,
        image: imgUrl,
      });
    }

    await addDoc(collection(db, "articles"), {
      title,
      seo: {
        title: seoTitle,
        description: seoDesc,
        keywords,
      },
      sections: finalSections,
      createdAt: Timestamp.now(),
    });

    alert("Article Added ✅");

    setTitle("");
    setSeoTitle("");
    setSeoDesc("");
    setKeywords("");
    setSections([{ heading: "", content: "", image: null, preview: "" }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#EFE6FF] to-[#D7C7F2]">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-[#6B4FA3]">
          Create Article ✍️
        </h2>
        <p className="text-gray-600 mt-2">
          Build structured, SEO-optimized content
        </p>
      </div>

      {/* CARD */}
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl">

        {/* TITLE */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Main Article Title..."
          className="w-full p-4 text-lg border rounded-xl mb-6 focus:ring-2 focus:ring-[#6B4FA3]/40"
        />

        {/* SEO PANEL */}
        <div className="mb-8 p-6 rounded-2xl border bg-gradient-to-br from-[#F8F4FF] to-white shadow">
          <h3 className="flex items-center gap-2 font-bold text-[#b62474] mb-4">
            <FaSearch /> SEO Settings
          </h3>

          <input
            placeholder="SEO Title"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full p-3 mb-3 border rounded-xl"
          />

          <textarea
            placeholder="Meta Description"
            value={seoDesc}
            onChange={(e) => setSeoDesc(e.target.value)}
            rows={3}
            className="w-full p-3 mb-3 border rounded-xl"
          />

          <textarea
            placeholder="Keywords (comma separated)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            rows={3}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        {/* SECTIONS */}
        {sections.map((sec, i) => (
          <div
            key={i}
            className="mb-8 p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#6B4FA3] text-lg">
                Section {i + 1}
              </h3>

              {sections.length > 1 && (
                <button
                  onClick={() => removeSection(i)}
                  className="text-red-500 hover:scale-110"
                >
                  <FaTrash />
                </button>
              )}
            </div>

            <input
              placeholder="Heading"
              className="w-full p-3 mb-3 border rounded-xl"
              value={sec.heading}
              onChange={(e) =>
                updateSection(i, "heading", e.target.value)
              }
            />

            <textarea
              placeholder="Content..."
              className="w-full p-3 mb-3 border rounded-xl"
              rows={4}
              value={sec.content}
              onChange={(e) =>
                updateSection(i, "content", e.target.value)
              }
            />

            {/* 🔥 DRAG DROP AREA */}
            <div
              onDrop={(e) => handleDrop(e, i)}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-[#6B4FA3]/40 rounded-xl p-6 text-center cursor-pointer hover:bg-[#F6F1FF]"
            >
              <FaImage className="mx-auto mb-2 text-[#6B4FA3]" />
              <p className="text-sm text-gray-600">
                Drag & Drop Image OR Click to Upload
              </p>

              <input
                type="file"
                className="hidden"
                id={`upload-${i}`}
                onChange={(e) =>
                  updateSection(i, "image", e.target.files[0])
                }
              />

              <label
                htmlFor={`upload-${i}`}
                className="text-[#6B4FA3] underline cursor-pointer"
              >
                Browse Files
              </label>
            </div>

            {/* PREVIEW */}
            {sec.preview && (
              <img
                src={sec.preview}
                alt="preview"
                className="mt-4 w-full h-48 object-cover rounded-xl shadow"
              />
            )}
          </div>
        ))}

        {/* ADD SECTION */}
        <button
          onClick={addSection}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#EDE7FF] text-[#6B4FA3] font-semibold hover:scale-105"
        >
          <FaPlus /> Add Section
        </button>

        {/* SAVE */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-3 rounded-xl text-white font-bold shadow-lg hover:scale-[1.02]"
          style={{
            background:
              "linear-gradient(180deg, #6B4FA3 0%, #8E6FD1 100%)",
          }}
        >
          {loading ? "Publishing..." : "Publish Article 🚀"}
        </button>
      </div>
    </div>
  );
};

export default AddArticle;