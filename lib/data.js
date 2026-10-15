export const categories = [
  { slug: "silk-saree", name: "Silk Saree" },
  { slug: "bridal-saree", name: "Bridal Saree" },
  { slug: "banarasi-saree", name: "Banarasi Saree" },
  { slug: "cotton-saree", name: "Cotton Saree" },
  { slug: "red-saree", name: "Red Saree" },
  { slug: "white-saree", name: "White Saree" },
  { slug: "black-saree", name: "Black Saree" },
  { slug: "festival-saree", name: "Festival Saree" },
  { slug: "traditional-look", name: "Traditional Look" },
  { slug: "celebrity-saree-looks", name: "Celebrity Saree Looks" },
];

// Apni images /public/images/ me daalo aur yahan entries add karo
export const images = [
  {
    slug: "red-saree-girl-hd-wallpaper",
    title: "Red Saree Girl HD Wallpaper",
    category: "red-saree",
    src: "/images/red-saree-1.webp",
    width: 1200,
    height: 1800,
    tags: ["red saree", "hd wallpaper", "traditional"],
    description:
      "Elegant red silk saree portrait with traditional jewellery, available in HD, Full HD and 4K.",
    date: "2026-10-01",
    downloads: {
      HD: "/images/red-saree-1.webp",
      "Full HD": "/images/red-saree-1.webp",
      "4K": "/images/red-saree-1.webp",
    },
  },
  {
    slug: "banarasi-saree-girl-4k",
    title: "Banarasi Saree Girl 4K",
    category: "banarasi-saree",
    src: "/images/banarasi-1.webp",
    width: 1200,
    height: 1800,
    tags: ["banarasi", "silk", "4k"],
    description: "Classic Banarasi silk saree look with golden zari work.",
    date: "2026-10-02",
    downloads: {
      HD: "/images/banarasi-1.webp",
      "Full HD": "/images/banarasi-1.webp",
      "4K": "/images/banarasi-1.webp",
    },
  },
  {
    slug: "bridal-saree-look-hd",
    title: "Bridal Saree Look HD",
    category: "bridal-saree",
    src: "/images/bridal-1.webp",
    width: 1200,
    height: 1800,
    tags: ["bridal", "wedding", "saree"],
    description: "Beautiful bridal saree look for wedding season inspiration.",
    date: "2026-10-03",
    downloads: {
      HD: "/images/bridal-1.webp",
      "Full HD": "/images/bridal-1.webp",
      "4K": "/images/bridal-1.webp",
    },
  },
];

export const getImage = (slug) => images.find((i) => i.slug === slug);
export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const byCategory = (slug) => images.filter((i) => i.category === slug);
export const similar = (img, n = 6) =>
  images.filter((i) => i.category === img.category && i.slug !== img.slug).slice(0, n);
export const search = (q) => {
  const s = q.toLowerCase();
  return images.filter(
    (i) =>
      i.title.toLowerCase().includes(s) ||
      i.tags.some((t) => t.toLowerCase().includes(s))
  );
};
export const altText = (img) => `${img.title} - ${img.tags.join(", ")}`;
