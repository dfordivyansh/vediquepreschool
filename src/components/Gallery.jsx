import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Camera,
  Images,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../admin/firebase/config";
/* ===== FONT ===== */
const FontLoader = () => (
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap"
  />
);

const categories = ["All", "Classroom", "Events", "Activities"];

const Gallery = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  // 🔥 FIRESTORE DATA FETCH (REALTIME)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "gallery"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        src: doc.data().url,
        category: doc.data().category,
        type: doc.data().type || "image",
      }));
      setImages(data);
    });

    return () => unsub();
  }, []);

  // 🔥 CATEGORY FILTER LOGIC (SAME UI)
  const classroom = images
    .filter((i) => i.category === "Classroom")
    .slice(0, 2);

  const events = images
    .filter((i) => i.category === "Events")
    .slice(0, 2);

  const activities = images
    .filter((i) => i.category === "Activities")
    .slice(0, 2);

  const filteredImages =
    activeCategory === "All"
      ? [...classroom, ...events, ...activities]
      : images.filter((i) => i.category === activeCategory).slice(0, 2);

  // zoom reset
  useEffect(() => {
    setZoomed(false);
  }, [lightboxIndex]);

  // animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <FontLoader />

      <section
        ref={sectionRef}
        id="gallery"
        className="relative py-10 sm:py-14 px-4 sm:px-8 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 75%)",
        }}
      >
        {/* ===== BACKGROUND ICONS ===== */}
        {[ImageIcon, Camera, Images].map((Icon, i) => (
          <Icon
            key={i}
            className="absolute text-[#6B4FA3]/15 w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40"
            style={{
              top: `${27 + i * 25}%`,
              left: i % 2 === 0 ? "6%" : "88%",
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ===== HEADER ===== */}
          <div
            className={`text-center mb-14 transition-all duration-700 ${
              visible ? "opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="inline-block mb-6 px-6 py-2 rounded-full text-3xl font-bold border border-[#E38342] text-[#2E1A47] bg-gradient-to-b from-[#3493C5]/50 to-white shadow-sm">
              Our Gallery
            </p>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#b62474] mb-3"
              style={{ fontFamily: "'Chewy', system-ui" }}
            >
              Moments at Vedique School Where Learning Comes Alive
            </h2>
          </div>

          {/* ===== FILTERS ===== */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-lg font-semibold transition ${
                  activeCategory === cat
                    ? "bg-[#6B4FA3] text-white"
                    : "bg-white border border-[#6B4FA3]/20 text-[#6B4FA3]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ===== GRID ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(index)}
                className="cursor-pointer overflow-hidden rounded-[24px] shadow-lg hover:shadow-[#6B4FA3]/30 transition"
              >
                {img.type === "video" ? (
                  <video
                    src={img.src}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <img
                    src={img.src}
                    alt="Gallery"
                    className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                  />
                )}
              </div>
            ))}
          </div>

          {/* ===== VIEW MORE ===== */}
          <div className="text-center mt-16">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => navigate("/gallery"), 100);
              }}
              className="px-8 py-3 rounded-[18px] font-semibold text-xl text-white shadow-lg hover:scale-[1.05] transition cursor-pointer"
              style={{
                background: "linear-gradient(180deg, #6B4FA3 0%, #8E6FD1 100%)",
              }}
            >
              View More Images
            </button>
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={34} />
          </button>

          <button
            onClick={() =>
              setLightboxIndex(
                (lightboxIndex - 1 + filteredImages.length) %
                  filteredImages.length
              )
            }
            className="absolute left-6 text-white"
          >
            <ChevronLeft size={44} />
          </button>

          {filteredImages[lightboxIndex].type === "video" ? (
            <video
              src={filteredImages[lightboxIndex].src}
              controls
              className="max-w-[90%] max-h-[80vh] rounded-xl"
            />
          ) : (
            <img
              src={filteredImages[lightboxIndex].src}
              alt="Preview"
              onClick={() => setZoomed((z) => !z)}
              className={`max-w-[90%] max-h-[80vh] rounded-xl transition ${
                zoomed ? "scale-150" : "scale-100"
              }`}
            />
          )}

          <button
            onClick={() =>
              setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
            }
            className="absolute right-6 text-white"
          >
            <ChevronRight size={44} />
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;