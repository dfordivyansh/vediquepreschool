// src/data/galleryData.js

const generateMedia = (prefix, count, category, ext) => {
  return Array.from({ length: count }, (_, i) => ({
    src: `/assets/gallery/${prefix}${i + 1}.${ext}`,
    category,
  }));
};

const galleryData = [
  /* ===== CLASSROOM IMAGES ===== */
  ...generateMedia("class", 100, "Classroom", "webp"),

  /* ===== EVENT IMAGES ===== */
  ...generateMedia("event", 100, "Events", "webp"),

  /* ===== ACTIVITY IMAGES ===== */
  ...generateMedia("activity", 100, "Activities", "webp"),

  /* ===== VIDEOS ===== */
  ...generateMedia("video", 50, "Video", "mp4"),
];

export default galleryData;
