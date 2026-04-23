import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaTrash } from "react-icons/fa";

const CLOUD_NAME = "dkz8wxesb";
const UPLOAD_PRESET = "Vedique";

const categories = ["Classroom", "Events", "Activities"];

const Gallery = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Classroom");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "gallery"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(data);
    });
    return () => unsub();
  }, []);

  const handleFile = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);

    setFiles(fileArray);

    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));

    setPreviews(previewUrls);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files);
  };

  const uploadFile = async () => {
    if (!files.length) return alert("Select files");

    setLoading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const resourceType = file.type.startsWith("video") ? "video" : "image";

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await res.json();

        if (!data.secure_url) throw new Error("Upload failed");

        return addDoc(collection(db, "gallery"), {
          url: data.secure_url,
          type: resourceType,
          category: selectedCategory,
          createdAt: new Date(),
        });
      });

      await Promise.all(uploadPromises);

      setFiles([]);
      setPreviews([]);

      alert("All files uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    await deleteDoc(doc(db, "gallery", id));
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "radial-gradient(circle at top left, #E6E0F8, #D7C7F2)",
      }}>
      {/* HEADER */}
      <h1 className="text-4xl text-center mb-10 font-[Chewy] text-[#b62474]">
        Gallery Dashboard ✨
      </h1>

      {/* ================= UPLOAD CARD ================= */}
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-[30px] shadow-xl border border-white/40 mb-14">
        {/* CATEGORY */}
        <select
          className="w-full mb-5 p-3 rounded-xl border focus:outline-none text-[#3A216A]"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* DRAG BOX */}
        <div
          className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
            dragActive
              ? "border-[#b62474] bg-[#f8f2ff]"
              : "border-gray-300 hover:border-[#b62474]"
          }`}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}>
          <input
            type="file"
            accept="image/*,video/*"
            multiple // 🔥 IMPORTANT
            onChange={(e) => handleFile(e.target.files)}
            className="hidden"
            id="upload"
          />

          <label htmlFor="upload" className="cursor-pointer">
            <p className="text-lg font-semibold text-[#3A216A]">
              Drag & Drop or{" "}
              <span className="text-[#b62474] underline">Browse Files</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">Upload Images & Videos</p>
          </label>
        </div>

        {/* PREVIEW */}
        {previews.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {previews.map((src, i) => (
              <div key={i}>
                {files[i]?.type.startsWith("video") ? (
                  <video src={src} className="rounded-xl" controls />
                ) : (
                  <img
                    src={src}
                    className="h-32 w-full object-cover rounded-xl"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={uploadFile}
          className="w-full mt-6 py-3 rounded-2xl text-white font-bold shadow-lg hover:scale-[1.03] transition"
          style={{
            background: "linear-gradient(to bottom, #E38342, #FFC107)",
          }}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* ================= CATEGORY GRID ================= */}
      {categories.map((cat) => (
        <div key={cat} className="mb-14">
          <h2 className="text-2xl font-bold mb-6 text-[#3A216A]">{cat}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {images
              .filter((item) => item.category === cat)
              .map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden shadow-lg bg-white">
                  {/* MEDIA */}
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-44 object-cover"
                    />
                  ) : (
                    <img
                      src={item.url}
                      className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                    />
                  )}

                  {/* OVERLAY DELETE */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
