export const BRAND = {
  name: "Ace Factor Fitness",
  tagline: "Build Your Body. Build Your Habits.",
  phone: "090455 12346",
  phoneTel: "+919045512346",
  whatsapp: "919045512346",
  email: "acefactorfitness@gmail.com",
  address:
    "14/161, Achal Rd, opp. D S College, TAL, Achal Taal, Aligarh, Uttar Pradesh 202001",
  location: "Aligarh, Uttar Pradesh",
  instagram: "https://www.instagram.com/ace_factor_fitness/",
  instagramHandle: "@ace_factor_fitness",
  rating: "5.0",
  reviews: "8",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Ace+Factor+Fitness+Aligarh",
};

export const STOCK_IMAGES = {
  heroAthlete: "/media/stock/hero-athlete.png",
  aboutGym: "/media/stock/about-gym-interior.png",
  nutrition: "/media/stock/nutrition-meal.png",
};

export const SECTION_BACKGROUNDS = {
  bruceLee: "/media/stock/bg/bruce-lee.png",
  gokuFocus: "/media/stock/bg/goku-focus.png",
  baki: "/media/stock/bg/baki.png",
  gokuHero: "/media/stock/bg/goku-hero.png",
  hanumanBw: "/media/stock/bg/hanuman-bw.png",
  hanumanEpic: "/media/stock/bg/hanuman-epic.png",
} as const;

export const MOTIVATION_PUNCHES = [
  "NO EXCUSES.",
  "SHOW UP.",
  "LIFT HEAVY.",
  "STAY HUNGRY.",
  "BE UNSTOPPABLE.",
  "EARN IT.",
];

export type Facility = {
  id: string;
  title: string;
  tag: string;
  icon: string;
};

export const FACILITIES: Facility[] = [
  { id: "cardio", title: "Cardio", tag: "Go hard", icon: "🏃" },
  { id: "strength", title: "Strength", tag: "Lift big", icon: "💪" },
  { id: "functional", title: "Functional", tag: "Move fast", icon: "⚡" },
  { id: "free-weights", title: "Free Weights", tag: "Own it", icon: "🏋️" },
  { id: "power-floor", title: "Power Floor", tag: "Train loud", icon: "🔥" },
  { id: "clean", title: "Premium Space", tag: "Level up", icon: "✦" },
];

export type Activity = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export const ACTIVITIES: Activity[] = [
  { id: "strength", title: "Strength", subtitle: "Build power", image: STOCK_IMAGES.heroAthlete },
  { id: "hiit", title: "HIIT", subtitle: "Burn fast", image: "/media/instagram/DWwN5wmj4X-.jpg" },
  { id: "cardio", title: "Cardio", subtitle: "Push limits", image: "/media/instagram/DS8CTSskqsu.jpg" },
  { id: "functional", title: "Functional", subtitle: "Move better", image: "/media/instagram/DU3cg9WmdOU_1.jpg" },
  { id: "nutrition", title: "Fuel", subtitle: "Eat smart", image: STOCK_IMAGES.nutrition },
  { id: "recovery", title: "Recover", subtitle: "Come back stronger", image: "/media/instagram/DTsuqofif2E.jpg" },
];

export type WellnessTip = {
  id: string;
  title: string;
  punch: string;
  icon: string;
};

export const WELLNESS_TIPS: WellnessTip[] = [
  { id: "protein", title: "Eat protein", punch: "Muscles rebuild. Feed them.", icon: "🥩" },
  { id: "water", title: "Drink water", punch: "75% muscle. 0% excuses.", icon: "💧" },
  { id: "sleep", title: "Sleep deep", punch: "Gains happen in bed.", icon: "😴" },
  { id: "warmup", title: "Warm up", punch: "5 min now > 5 weeks off.", icon: "🔥" },
  { id: "showup", title: "Just show up", punch: "80% is walking through the door.", icon: "🎯" },
];

export const WATER_REMINDERS = [
  "Hydrate. Your muscles are watching.",
  "Water break. Non-negotiable.",
  "Drink up. Strength needs fuel.",
  "H₂O status: please update.",
];

export const MARQUEE_ITEMS = [
  "NO EXCUSES",
  "LIFT HEAVY",
  "EAT CLEAN",
  "SLEEP DEEP",
  "SHOW UP",
  "GET STRONGER",
  "ACE FACTOR",
];

export type Plan = {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  period: string;
  features: string[];
  popular?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "monthly",
    name: "Basic",
    price: "₹2,750",
    oldPrice: "₹2,500",
    period: "/ mo",
    features: ["Full access", "All zones", "Locker", "5 AM open"],
  },
  {
    id: "quarterly",
    name: "Pro",
    price: "₹6,600",
    oldPrice: "₹6,000",
    period: "/ 3 mo",
    features: ["Everything in Basic", "Best value", "Assessment", "Priority support"],
    popular: true,
  },
  {
    id: "annual",
    name: "Premium",
    price: "₹20,000",
    oldPrice: "₹18,000",
    period: "/ yr",
    features: ["Max savings", "Unlimited access", "Member perks", "Custom plan"],
  },
];

export const STATS = [
  { value: "5.0", suffix: "★", label: "Rating", count: 5.0, countSuffix: "★" },
  { value: "5 AM", label: "Opens", count: null, countSuffix: "" },
  { value: "100+", label: "Equipment", count: 100, countSuffix: "+" },
  { value: "#1", label: "Aligarh", count: null, countSuffix: "" },
];

export const HERO_VIDEO = "/media/instagram/DbDiPIDiz8i.mp4";

export const HOURS = [
  { day: "Mon–Fri", time: "5 AM – 10 PM" },
  { day: "Sat", time: "6 AM – 9 PM" },
  { day: "Sun", time: "7 AM – 8 PM" },
];

export const TESTIMONIALS = [
  { name: "Rahul S.", text: "Best gym in Aligarh. Period.", rating: 5 },
  { name: "Priya M.", text: "Space, equipment, vibe — all top tier.", rating: 5 },
  { name: "Amit K.", text: "5 AM opens. Zero excuses left.", rating: 5 },
];

export type GalleryItem = {
  src: string;
  alt: string;
  type: "image" | "video";
};

export const GALLERY: GalleryItem[] = [
  { src: "/media/instagram/DWwN5wmj4X-.jpg", alt: "Training floor", type: "image" },
  { src: "/media/instagram/DTsuqofif2E.jpg", alt: "Discipline", type: "image" },
  { src: "/media/instagram/DU3cg9WmdOU_1.jpg", alt: "Equipment zone", type: "image" },
  { src: "/media/instagram/DUsQaRYj6k5.mp4", alt: "Gym tour", type: "video" },
  { src: "/media/instagram/DS8CTSskqsu.jpg", alt: "Facility", type: "image" },
  { src: "/media/instagram/DU8WgXPj2IJ.mp4", alt: "Training", type: "video" },
  { src: "/media/instagram/DU3cg9WmdOU_2.jpg", alt: "Strength area", type: "image" },
  { src: STOCK_IMAGES.aboutGym, alt: "Gym interior", type: "image" },
];

export function whatsappLink(message: string): string {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function phoneLink(): string {
  return `tel:${BRAND.phoneTel}`;
}
