// src/data/galleryData.js

const generateMedia = (prefix, count, category, ext) => {
  return Array.from({ length: count }, (_, i) => ({
    src: `/assets/gallery/${prefix}${i + 1}.${ext}`,
    category,
  }));
};

const galleryData = [
  /* ===== CLASSROOM IMAGES ===== */
  ...generateMedia("class", 8, "Classroom", "jpg"),

  /* ===== EVENT IMAGES ===== */
  ...generateMedia("event", 7, "Events", "jpeg"),

  /* ===== ACTIVITY IMAGES ===== */
  ...generateMedia("activity", 4, "Activities", "jpg"),

  /* ===== VIDEOS ===== */
  ...generateMedia("video", 5, "Video", "mp4"),
];

export default galleryData;
