import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
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
  PauseCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../admin/firebase/config"; // ✅ correct path

import Footer from "../components/Footer";
import Contact from "../components/Contact";

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

const categories = ["All Images", "Classroom", "Events", "Activities"];
const ITEMS_PER_PAGE = 12;

const FullGallery = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All Images");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔥 FIRESTORE REALTIME DATA */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "gallery"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        src: doc.data().url,
        category: doc.data().category,
        type: doc.data().type || "image",
      }));

      setMedia(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  /* ===== SPLIT IMAGES & VIDEOS ===== */
  const images = media.filter((item) => item.type !== "video");
  const videos = media.filter((item) => item.type === "video");
  const videoRefs = React.useRef({});
  const [playing, setPlaying] = useState({});

  const toggleVideo = (id) => {
    const video = videoRefs.current[id];

    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying((prev) => ({ ...prev, [id]: true }));
    } else {
      video.pause();
      setPlaying((prev) => ({ ...prev, [id]: false }));
    }
  };

  const openFullscreen = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  /* ===== HERO IMAGES ===== */
  const heroImages = images.slice(0, 5);

  /* ===== AUTO SLIDER ===== */
  useEffect(() => {
    if (!heroImages.length) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  /* ===== FILTER ===== */
  const filteredImages =
    activeCategory === "All Images"
      ? images
      : images.filter((img) => img.category === activeCategory);

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentImages = filteredImages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    setZoomed(false);
  }, [lightboxIndex]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl font-semibold text-[#6B4FA3]">
        Loading gallery...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Vedique Preschool Gallery | School Activities & Events Hyderabad
        </title>
      </Helmet>

      <FontLoader />

      {/* ===== HERO ===== */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={img.id}
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
          className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full font-semibold text-[#2E1A47] shadow-lg hover:scale-105 transition">
          ← Back to Home
        </button>

        <div className="absolute inset-0 flex items-center justify-center text-center z-10">
          <div className="text-white px-6">
            <h1 className="text-5xl font-extrabold mb-3">
              Vedique School Gallery
            </h1>
            <p className="text-white/90 text-2xl">
              Capturing moments of <b>learning, joy & growth</b>
            </p>
          </div>
        </div>
      </section>

      {/* ===== IMAGE GALLERY ===== */}
      <section
        className="relative py-16 px-4 sm:px-8"
        style={{
          background:
            "radial-gradient(circle at top left, #EFE6FF 0%, #F7F2FF 45%, #FFFFFF 75%)",
        }}>
        <div className="max-w-7xl mx-auto">
          {/* FILTER */}
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold ${
                  activeCategory === cat
                    ? "bg-[#6B4FA3] text-white"
                    : "bg-white border text-[#6B4FA3]"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(index)}
                className="cursor-pointer rounded-[26px] overflow-hidden shadow-lg bg-white">
                <img
                  src={img.src}
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
                  className={`w-10 h-10 rounded-full ${
                    currentPage === i + 1
                      ? "bg-[#6B4FA3] text-white"
                      : "bg-white border text-[#6B4FA3]"
                  }`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== VIDEOS ===== */}
      {videos.length > 0 && (
        <section
          className="relative py-0 sm:py-10 px-4 sm:px-8 overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at center, #E9DCFF 0%, #F7F2FF 55%, #FFFFFF 100%)",
          }}>
          {/* BACKGROUND ICONS */}
          {[Video, Film, PlayCircle].map((Icon, i) => (
            <Icon
              key={i}
              className="absolute text-[#6B4FA3]/15"
              size={120}
              style={{
                top: `${20 + i * 25}%`,
                left: i % 2 === 0 ? "5%" : "92%",
              }}
            />
          ))}

          <div className="max-w-7xl mx-auto relative z-10">
            {/* TITLE */}
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#b62474] mb-3 font-[Chewy]">
                School Videos
              </h2>
              <p className="text-[#3A216A] text-lg font-medium">
                Watch moments of fun, learning & creativity
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => {
                const videoUrl = video.src.replace(
                  "/upload/",
                  "/upload/f_mp4/",
                );

                return (
                  <div
                    key={video.id}
                    className="group relative rounded-[26px] overflow-hidden shadow-xl bg-white border border-white/40 hover:shadow-[#6B4FA3]/40 transition duration-300">
                    {/* VIDEO */}
                    <video
                      ref={(el) => (videoRefs.current[video.id] = el)}
                      playsInline
                      preload="metadata"
                      muted
                      className="w-full h-64 object-cover">
                      <source
                        src={video.src.replace("/upload/", "/upload/f_mp4/")}
                        type="video/mp4"
                      />
                    </video>

                    {/* CLICKABLE OVERLAY */}
                    <div
                      className="absolute inset-0 bg-black/30 
  opacity-100 sm:opacity-0 sm:group-hover:opacity-100
  transition flex items-center justify-center cursor-pointer">
                      {" "}
                      {/* PLAY / PAUSE */}
                      <div onClick={() => toggleVideo(video.id)}>
                        {playing[video.id] ? (
                          <PauseCircle
                            size={55}
                            className="text-white drop-shadow-lg"
                          />
                        ) : (
                          <PlayCircle
                            size={55}
                            className="text-white drop-shadow-lg"
                          />
                        )}
                      </div>
                      {/* FULLSCREEN BUTTON */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          openFullscreen(video.id);
                        }}
                        className="absolute bottom-3 right-3 bg-black/60 py-2 px-3.5 rounded-full text-white text-lg">
                        ⛶
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Contact />
      <Footer />

      {/* ===== LIGHTBOX ===== */}
      {lightboxIndex !== null && currentImages[lightboxIndex] && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <img
            src={currentImages[lightboxIndex].src}
            className={`max-w-[92%] max-h-[82vh] ${zoomed ? "scale-150" : ""}`}
            onClick={() => setZoomed(!zoomed)}
          />
        </div>
      )}
    </>
  );
};

export default FullGallery;
