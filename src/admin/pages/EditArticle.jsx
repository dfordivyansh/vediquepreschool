import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaImage, FaSearch } from "react-icons/fa";

const CLOUD_NAME = "dkz8wxesb";
const UPLOAD_PRESET = "Vedique";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [keywords, setKeywords] = useState("");

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔥 FETCH */
  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "articles", id));
      if (snap.exists()) {
        const data = snap.data();

        setTitle(data.title || "");
        setSeoTitle(data?.seo?.title || "");
        setSeoDesc(data?.seo?.description || "");
        setKeywords(data?.seo?.keywords || "");

        // 🔥 convert image to preview
        const formatted = (data.sections || []).map((s) => ({
          ...s,
          imageFile: null,
          preview: s.image || "",
        }));

        setSections(formatted);
      }
    };
    fetch();
  }, [id]);

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
      { heading: "", content: "", image: "", imageFile: null, preview: "" },
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
      updated[i].imageFile = value;
      updated[i].preview = URL.createObjectURL(value);
    } else {
      updated[i][field] = value;
    }

    setSections(updated);
  };

  /* 🎯 DRAG DROP */
  const handleDrop = (e, i) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) updateSection(i, "image", file);
  };

  /* 💾 UPDATE */
  const handleUpdate = async () => {
    setLoading(true);

    const finalSections = [];

    for (let sec of sections) {
      let imgUrl = sec.image;

      if (sec.imageFile) {
        imgUrl = await uploadImage(sec.imageFile);
      }

      finalSections.push({
        heading: sec.heading,
        content: sec.content,
        image: imgUrl,
      });
    }

    await updateDoc(doc(db, "articles", id), {
      title,
      seo: {
        title: seoTitle,
        description: seoDesc,
        keywords,
      },
      sections: finalSections,
    });

    alert("Updated ✅");
    navigate("/admin/articles");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#EFE6FF] to-[#D7C7F2]">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-[#6B4FA3]">
          Edit Article ✏️
        </h2>
      </div>

      {/* CARD */}
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl">

        {/* TITLE */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Main Article Title..."
          className="w-full p-4 text-lg border rounded-xl mb-6"
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
            placeholder="Keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            rows={3}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        {/* SECTIONS */}
        {sections.map((sec, i) => (
          <div key={i} className="mb-8 p-6 rounded-2xl border bg-white shadow">

            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-[#6B4FA3]">
                Section {i + 1}
              </h3>

              {sections.length > 1 && (
                <button onClick={() => removeSection(i)}>
                  <FaTrash />
                </button>
              )}
            </div>

            <input
              value={sec.heading}
              onChange={(e) =>
                updateSection(i, "heading", e.target.value)
              }
              className="w-full p-3 mb-3 border rounded-xl"
              placeholder="Heading"
            />

            <textarea
              value={sec.content}
              onChange={(e) =>
                updateSection(i, "content", e.target.value)
              }
              className="w-full p-3 mb-3 border rounded-xl"
              rows={4}
              placeholder="Content"
            />

            {/* DRAG DROP */}
            <div
              onDrop={(e) => handleDrop(e, i)}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-[#6B4FA3]/40 rounded-xl p-6 text-center cursor-pointer"
            >
              <FaImage className="mx-auto mb-2 text-[#6B4FA3]" />
              <p className="text-sm text-gray-600">
                Drag & Drop or Upload Image
              </p>

              <input
                type="file"
                hidden
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
                className="mt-4 w-full h-48 object-cover rounded-xl"
              />
            )}
          </div>
        ))}

        {/* ADD */}
        <button
          onClick={addSection}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#EDE7FF] text-[#6B4FA3]"
        >
          <FaPlus /> Add Section
        </button>

        {/* UPDATE */}
        <button
          onClick={handleUpdate}
          className="w-full mt-6 py-3 rounded-xl text-white font-bold"
          style={{
            background:
              "linear-gradient(180deg, #6B4FA3 0%, #8E6FD1 100%)",
          }}
        >
          {loading ? "Updating..." : "Update Article 🚀"}
        </button>
      </div>
    </div>
  );
};

export default EditArticle;