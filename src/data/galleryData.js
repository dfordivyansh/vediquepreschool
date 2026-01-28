// src/data/galleryData.js

const generateImages = (prefix, count, category, ext = "jpg") => {
  return Array.from({ length: count }, (_, i) => ({
    src: `/assets/gallery/${prefix}${i + 1}.${ext}`,
    category,
  }));
};

const galleryData = [
  // Classroom images
  ...generateImages("class", 8, "Classroom", "jpg"),

  // Event images
  ...generateImages("event", 7, "Events", "jpeg"),

  // Activity images
  ...generateImages("activity", 4, "Activities", "jpg"),
];

export default galleryData;
