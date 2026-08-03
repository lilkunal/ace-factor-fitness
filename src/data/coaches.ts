export type CoachMotivation = {
  quote: string;
  attribution: string;
  mantras: string[];
  pulseLines: string[];
};

export type Coach = {
  id: string;
  slug: string;
  name: string;
  instagram: string;
  handle: string;
  bio: string;
  image: string;
  specialty: string;
  motivation: CoachMotivation;
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
    specialty: "Strength & Conditioning",
    motivation: {
      quote: "Prove yourself that you can win even when nobody is beside you.",
      attribution: "Coach Shivam believes in self-reliance and relentless consistency.",
      mantras: [
        "Built, not bought — earn every inch in the gym.",
        "Set the damn standard and hold yourself to it.",
        "Progress is the real flex.",
        "Dedication knows no excuses.",
      ],
      pulseLines: [
        "HARD WORK PAYS OFF.",
        "DISCIPLINE FIRST.",
        "FEEL THE BURN.",
        "LOVE THE RESULTS.",
      ],
    },
  },
  {
    id: "kapil-singh",
    slug: "kapil-singh",
    name: "Kapil Singh",
    instagram: "https://www.instagram.com/thakur_kapil_singh85/",
    handle: "@thakur_kapil_singh85",
    bio: "Fitness coach at Ace Factor Fitness. Bodybuilding specialist — building muscle, discipline, and confidence.",
    image: "/media/coaches/thakur_kapil_singh85/profile.jpg",
    specialty: "Bodybuilding & Hypertrophy",
    motivation: {
      quote: "Building muscle, discipline, and confidence — one rep at a time.",
      attribution: "Coach Kapil believes strength is built through daily commitment, not shortcuts.",
      mantras: [
        "Every set builds character, not just muscle.",
        "Consistency beats motivation on the days you don't feel like showing up.",
        "Train hard, recover smart, repeat.",
        "Your body responds to what you repeat — make it count.",
      ],
      pulseLines: [
        "LIFT HEAVY.",
        "EARN YOUR PHYSIQUE.",
        "NO SHORTCUTS.",
        "REP BY REP.",
      ],
    },
  },
  {
    id: "mr-shrivastava",
    slug: "mr-shrivastava",
    name: "Hrithick Shrivastava",
    instagram: "https://www.instagram.com/_mr_shrivastava_2.0_/",
    handle: "@_mr_shrivastava_2.0_",
    bio: "Mr. Ghaziabad 3rd · Mr. North India Top 5 · 2× Mr. Aligarh & Men's Physique champion. Competitive bodybuilding coach.",
    image: "/media/coaches/_mr_shrivastava_2.0_/profile.jpg",
    specialty: "Competitive Bodybuilding",
    motivation: {
      quote: "Champions are forged in the gym long before they ever step on stage.",
      attribution: "Coach Hrithick believes titles are earned through years of disciplined prep.",
      mantras: [
        "Stage-ready discipline starts in everyday training.",
        "Compete with yesterday's version of yourself.",
        "Precision in prep, power in performance.",
        "Titles are earned in silence — long before the spotlight.",
      ],
      pulseLines: [
        "PREP LIKE A CHAMPION.",
        "STAGE READY.",
        "OUTWORK EVERYONE.",
        "EARN THE TITLE.",
      ],
    },
  },
];

export function getCoachBySlug(slug: string): Coach | undefined {
  return COACHES.find((c) => c.slug === slug);
}

export function coachWhatsAppMessage(name: string): string {
  return `Hi! I'd like to train with ${name} at Ace Factor Fitness.`;
}
