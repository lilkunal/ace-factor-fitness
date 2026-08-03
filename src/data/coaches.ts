export type Coach = {
  id: string;
  slug: string;
  name: string;
  instagram: string;
  handle: string;
  bio: string;
  image: string;
  gallery: string[];
  specialty: string;
};

export const COACHES: Coach[] = [
  {
    id: "shivam-sharma",
    slug: "shivam-sharma",
    name: "Shivam Sharma",
    instagram: "https://www.instagram.com/shivam__sharma.07/",
    handle: "@shivam__sharma.07",
    bio: "UP India · Fitness | Fashion | Lifestyle. Prove yourself that you can win even when nobody is beside you.",
    image: "/media/coaches/shivam__sharma.07/profile.jpg",
    gallery: [
      "/media/coaches/shivam__sharma.07/gallery-0.jpg",
      "/media/coaches/shivam__sharma.07/gallery-1.jpg",
      "/media/coaches/shivam__sharma.07/gallery-2.jpg",
      "/media/coaches/shivam__sharma.07/gallery-3.jpg",
      "/media/coaches/shivam__sharma.07/gallery-4.jpg",
      "/media/coaches/shivam__sharma.07/gallery-5.jpg",
      "/media/coaches/shivam__sharma.07/gallery-6.jpg",
      "/media/coaches/shivam__sharma.07/gallery-7.jpg",
      "/media/coaches/shivam__sharma.07/gallery-8.jpg",
      "/media/coaches/shivam__sharma.07/gallery-9.jpg",
      "/media/coaches/shivam__sharma.07/gallery-10.jpg",
      "/media/coaches/shivam__sharma.07/gallery-11.jpg",
      "/media/coaches/shivam__sharma.07/gallery-12.jpg",
      "/media/coaches/shivam__sharma.07/gallery-13.jpg",
    ],
    specialty: "Strength & Conditioning",
  },
  {
    id: "kapil-singh",
    slug: "kapil-singh",
    name: "Kapil Singh",
    instagram: "https://www.instagram.com/thakur_kapil_singh85/",
    handle: "@thakur_kapil_singh85",
    bio: "Fitness coach at Ace Factor Fitness. Bodybuilding specialist — building muscle, discipline, and confidence.",
    image: "/media/coaches/thakur_kapil_singh85/profile.jpg",
    gallery: [
      "/media/coaches/thakur_kapil_singh85/gallery-0.jpg",
      "/media/coaches/thakur_kapil_singh85/gallery-1.jpg",
      "/media/coaches/thakur_kapil_singh85/gallery-2.jpg",
      "/media/coaches/thakur_kapil_singh85/gallery-3.jpg",
      "/media/coaches/thakur_kapil_singh85/gallery-4.jpg",
    ],
    specialty: "Bodybuilding & Hypertrophy",
  },
  {
    id: "mr-shrivastava",
    slug: "mr-shrivastava",
    name: "Hrithick Shrivastava",
    instagram: "https://www.instagram.com/_mr_shrivastava_2.0_/",
    handle: "@_mr_shrivastava_2.0_",
    bio: "Mr. Ghaziabad 3rd · Mr. North India Top 5 · 2× Mr. Aligarh & Men's Physique champion. Competitive bodybuilding coach.",
    image: "/media/coaches/_mr_shrivastava_2.0_/profile.jpg",
    gallery: [
      "/media/coaches/_mr_shrivastava_2.0_/gallery-0.jpg",
      "/media/coaches/_mr_shrivastava_2.0_/gallery-1.jpg",
      "/media/coaches/_mr_shrivastava_2.0_/gallery-2.jpg",
      "/media/coaches/_mr_shrivastava_2.0_/gallery-3.jpg",
      "/media/coaches/_mr_shrivastava_2.0_/gallery-4.jpg",
    ],
    specialty: "Competitive Bodybuilding",
  },
];

export function getCoachBySlug(slug: string): Coach | undefined {
  return COACHES.find((c) => c.slug === slug);
}

export function coachWhatsAppMessage(name: string): string {
  return `Hi! I'd like to train with ${name} at Ace Factor Fitness.`;
}
