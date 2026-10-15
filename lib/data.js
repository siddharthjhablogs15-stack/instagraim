export const SITE = {
  name: 'Instagraim',
  url: 'https://instagraim.in',
  title: 'Hot Indian Girls in Saree – Beautiful Saree Images & HD Wallpapers',
  metaTitle: 'Hot Indian Girls in Saree HD Images & Wallpapers | 4K Free Download',
  description:
    'Explore beautiful Indian girls in saree with high-quality HD and 4K wallpapers. Download traditional, festive, bridal, silk, cotton, and designer saree images for free.',
  keywords: [
    'hot indian girls in saree', 'indian girls in saree', 'beautiful saree girl images',
    'saree wallpaper HD', 'saree images download', 'indian traditional dress photos',
    'silk saree girl wallpaper', 'bridal saree images', 'ethnic fashion wallpaper', '4K saree wallpapers',
  ],
};

export const categories = [
  { slug: 'silk-saree', name: 'Silk Saree' },
  { slug: 'bridal-saree', name: 'Bridal Saree' },
  { slug: 'banarasi-saree', name: 'Banarasi Saree' },
  { slug: 'cotton-saree', name: 'Cotton Saree' },
  { slug: 'red-saree', name: 'Red Saree' },
  { slug: 'white-saree', name: 'White Saree' },
  { slug: 'black-saree', name: 'Black Saree' },
  { slug: 'festival-saree', name: 'Festival Saree' },
  { slug: 'traditional-look', name: 'Traditional Look' },
  { slug: 'celebrity-saree-looks', name: 'Celebrity Saree Looks' },
];

// Sirf wahi images use karo jo original hain ya jinka use karne ka adhikar aapke paas hai.
export const images = [
  {
    slug: 'red-saree-girl-hd-wallpaper',
    title: 'Red Saree Girl HD Wallpaper',
    category: 'red-saree',
    src: '/images/red-saree-1.webp',
    width: 1080, height: 1620,
    tags: ['red saree', 'hd wallpaper', 'traditional'],
    date: '2026-10-15', downloads: 1200,
  },
  {
    slug: 'banarasi-saree-girl-4k',
    title: 'Banarasi Saree Girl 4K Wallpaper',
    category: 'banarasi-saree',
    src: '/images/banarasi-1.webp',
    width: 1080, height: 1620,
    tags: ['banarasi', '4k', 'silk'],
    date: '2026-10-14', downloads: 950,
  },
  {
    slug: 'bridal-saree-look-hd',
    title: 'Bridal Saree Look HD Image',
    category: 'bridal-saree',
    src: '/images/bridal-1.webp',
    width: 1080, height: 1620,
    tags: ['bridal', 'wedding', 'ethnic fashion'],
    date: '2026-10-13', downloads: 700,
  },
];

export const altText = (img) =>
  `${img.title} - ${categories.find((c) => c.slug === img.category)?.name ?? 'Saree'} image on Instagraim`;
export const getImage = (slug) => images.find((i) => i.slug === slug);
export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const imagesIn = (slug) => images.filter((i) => i.category === slug);
export const related = (img, n = 8) =>
  images.filter((i) => i.slug !== img.slug && i.category === img.category).concat(
    images.filter((i) => i.slug !== img.slug && i.category !== img.category)
  ).slice(0, n);
export const latest = () => [...images].sort((a, b) => b.date.localeCompare(a.date));
export const popular = () => [...images].sort((a, b) => b.downloads - a.downloads);
