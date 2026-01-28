import React, { useState, useEffect } from "react";
import galleryData from "../data/galleryData";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Camera,
  Images,
  Video,
  Film,
  PlayCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

/* ===== FONT ===== */
const FontLoader = () => (
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap"
  />
);

const categories = ["All Images", "Classroom", "Events", "Activities"];
const ITEMS_PER_PAGE = 12;

/* ===== CATEGORY DETECTION ===== */
const detectCategory = (src = "") => {
  const name = src.toLowerCase();
  if (name.includes("class")) return "Classroom";
  if (name.includes("event")) return "Events";
  if (name.includes("activity")) return "Activities";
  return "Other";
};

/* ===== VIDEO DETECTION ===== */
const isVideo = (src = "") => src.toLowerCase().includes("video");

const FullGallery = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All Images");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* ===== SPLIT IMAGES & VIDEOS ===== */
  const images = Array.isArray(galleryData)
    ? galleryData
        .filter((item) => !isVideo(item.src))
        .map((img) => ({
          ...img,
          category: detectCategory(img.src),
        }))
    : [];

  const videos = Array.isArray(galleryData)
    ? galleryData.filter((item) => isVideo(item.src))
    : [];

  /* ===== HERO IMAGES ===== */
  const heroImages = images.slice(0, 5);

  /* ===== AUTO SLIDER ===== */
  useEffect(() => {
    if (!heroImages.length) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  /* ===== FILTERED IMAGES ===== */
  const filteredImages =
    activeCategory === "All Images"
      ? images
      : images.filter((img) => img.category === activeCategory);

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentImages = filteredImages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    setZoomed(false);
  }, [lightboxIndex]);

  return (
    <>
      <FontLoader />

      {/* ===== HERO ===== */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt="Gallery Hero"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              index === heroIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />

        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md
          px-6 py-2 rounded-full font-semibold text-[#2E1A47]
          shadow-lg hover:scale-105 transition cursor-pointer"
        >
          ← Back to Home
        </button>

        <div className="absolute inset-0 flex items-center justify-center text-center z-10">
          <div className="text-white px-6">
            <h1 className="text-5xl font-extrabold mb-3">
              Vedique School Gallery
            </h1>
            <p
              className="text-white/90 text-2xl"
              style={{ fontFamily: "'Comic Sans MS', cursive" }}
            >
              Capturing moments of <b>learning, joy & growth</b>
            </p>
          </div>
        </div>
      </section>

      {/* ===== IMAGE GALLERY ===== */}
<section
  className="relative py-16 px-4 sm:px-8 overflow-hidden"
  style={{
    background:
      "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 75%)",
  }}
>
  {/* 🖼 IMAGE BACKGROUND ICONS */}
  {[ImageIcon, Camera, Images].map((Icon, i) => (
    <Icon
      key={i}
      className="absolute text-[#6B4FA3]/15"
      size={120}
      style={{
        top: `${15 + i * 30}%`,
        left: i % 2 === 0 ? "4%" : "92%",
      }}
    />
  ))}

  <div className="max-w-7xl mx-auto relative z-10">
    {/* FILTERS */}
    <div className="flex flex-wrap justify-center gap-4 mb-14">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-6 py-2 rounded-full font-semibold transition cursor-pointer ${
            activeCategory === cat
              ? "bg-[#6B4FA3] text-white"
              : "bg-white border border-[#6B4FA3]/30 text-[#6B4FA3]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {currentImages.map((img, index) => (
        <div
          key={index}
          onClick={() => setLightboxIndex(index)}
          className="cursor-pointer overflow-hidden rounded-[26px]
          bg-white shadow-lg hover:shadow-[#6B4FA3]/40 transition"
        >
          <img
            src={img.src}
            alt="Gallery"
            className="w-full h-60 object-cover hover:scale-105 transition"
          />
        </div>
      ))}
    </div>

    {/* PAGINATION */}
    {totalPages > 1 && (
      <div className="flex justify-center gap-3 mt-14">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-full font-bold cursor-pointer ${
              currentPage === i + 1
                ? "bg-[#6B4FA3] text-white"
                : "bg-white border border-[#6B4FA3]/30 text-[#6B4FA3]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    )}
  </div>
</section>


{videos.length > 0 && (
  <section
    className="relative py-20 px-4 sm:px-8 overflow-hidden"
    style={{
      background:
        "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
    }}
  >
    {/* 🎥 VIDEO BACKGROUND ICONS */}
    {[Video, Film, PlayCircle].map((Icon, i) => (
      <Icon
        key={i}
        className="absolute text-[#6B4FA3]/15"
        size={130}
        style={{
          top: `${20 + i * 25}%`,
          left: i % 2 === 0 ? "6%" : "90%",
        }}
      />
    ))}

    <div className="max-w-7xl mx-auto relative z-10">
      <h2 className="text-4xl font-extrabold text-center text-[#4B3C78] mb-12">
        School Videos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {videos.map((video, i) => (
          <div
            key={i}
            className="rounded-[26px] overflow-hidden shadow-xl bg-white"
          >
            <video
              src={video.src}
              controls
              muted
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
)}


      <Contact />
      <Footer />

      {/* ===== LIGHTBOX ===== */}
      {lightboxIndex !== null && currentImages[lightboxIndex] && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white cursor-pointer"
          >
            <X size={34} />
          </button>

          <button
            onClick={() =>
              setLightboxIndex(
                (lightboxIndex - 1 + currentImages.length) %
                  currentImages.length
              )
            }
            className="absolute left-6 text-white cursor-pointer"
          >
            <ChevronLeft size={44} />
          </button>

          <img
            src={currentImages[lightboxIndex].src}
            alt="Preview"
            onClick={() => setZoomed((z) => !z)}
            className={`max-w-[92%] max-h-[82vh] rounded-2xl
              transition-transform duration-300 cursor-pointer
              ${zoomed ? "scale-150" : "scale-100"}`}
          />

          <button
            onClick={() =>
              setLightboxIndex(
                (lightboxIndex + 1) % currentImages.length
              )
            }
            className="absolute right-6 text-white cursor-pointer"
          >
            <ChevronRight size={44} />
          </button>
        </div>
      )}
    </>
  );
};

export default FullGallery;
