import { publicUrl } from "../utils/publicUrl";

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  sections: BlogSection[];
};

export const BLOG_IMAGES = {
  dumbbellRack: publicUrl("/media/stock/blog/dumbbell-rack.png"),
  squatForm: publicUrl("/media/stock/blog/squat-form.png"),
  progressive: publicUrl("/media/stock/blog/progressive.png"),
};

export const GYM_NOTES = [
  { icon: "🏋️", title: "Rack Etiquette", text: "Keep the dumbbells in the rack. Next lifter shouldn't hunt for 20s." },
  { icon: "🧹", title: "Wipe It Down", text: "Leave the bench cleaner than you found it. Sweat is yours — respect is shared." },
  { icon: "⏱️", title: "Share the Floor", text: "Circuit hogging is out. Rest 60–90s, then let others work in." },
  { icon: "🔊", title: "Volume Control", text: "Dropping plates for attention ≠ strength. Control the weight. Control the ego." },
  { icon: "💧", title: "Hydrate", text: "Muscles are ~75% water. Sip between sets — performance thanks you." },
  { icon: "🔄", title: "Re-rack Plates", text: "45s belong on the tree, not the floor. Build the habit with the lift." },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "perfect-squat-form",
    title: "How to Squat Right: Form Before Ego",
    excerpt:
      "Build power from the ground up. Brace your core, hit depth, and own every rep — the Ace Factor way.",
    category: "Exercise Form",
    readTime: "5 min",
    date: "Aug 2026",
    image: BLOG_IMAGES.squatForm,
    sections: [
      {
        heading: "Why squats build everything",
        paragraphs: [
          "The squat is the foundation of lower-body strength — quads, glutes, hamstrings, and your entire core. Done well, it teaches you how to generate force from the ground. Done poorly, it teaches your knees and lower back to complain.",
          "At Ace Factor Fitness we coach form first. Weight comes second. Always.",
        ],
      },
      {
        heading: "Setup checklist",
        paragraphs: ["Before you unrack, lock these in:"],
        bullets: [
          "Feet roughly shoulder-width, toes slightly out",
          "Bar sits on upper traps (high-bar) or rear delts (low-bar) — pick one and stay consistent",
          "Hands grip tight, elbows under the bar, chest proud",
          "Take a big breath into your belly — brace like someone is about to punch your core",
        ],
      },
      {
        heading: "The movement",
        paragraphs: [
          "Sit the hips back and down as if aiming for a chair behind you. Knees track over toes — don't cave inward. Go at least to parallel (hip crease below knee) if mobility allows.",
          "Drive through mid-foot on the way up. Exhale near the top. Rack the bar with control — never dump it.",
        ],
        bullets: [
          "Eyes forward, not at the ceiling",
          "Keep the bar path roughly vertical",
          "If your heels lift, shorten depth or fix ankle mobility",
          "Ask a coach for a form check — that's why we're here",
        ],
      },
      {
        heading: "Progression tip",
        paragraphs: [
          "Master bodyweight and goblet squats before heavy barbell work. Three solid sets of 5–8 clean reps beat one ugly PR every time.",
        ],
      },
    ],
  },
  {
    slug: "core-to-max-progressive-overload",
    title: "From Core to Max: Progressive Overload Explained",
    excerpt:
      "How beginners become strong — add a little, recover a little, repeat. The only path that actually scales.",
    category: "Training Science",
    readTime: "6 min",
    date: "Aug 2026",
    image: BLOG_IMAGES.progressive,
    sections: [
      {
        heading: "What progressive overload means",
        paragraphs: [
          "Your body adapts when you ask slightly more of it than last time — more weight, more reps, more sets, or better control. That's progressive overload. Without it, you stay the same forever.",
          "Building from core strength to max output is not a 7-day challenge. It's a calendar of small wins.",
        ],
      },
      {
        heading: "Four ways to progress",
        paragraphs: ["Pick one lever per week. Don't change everything at once."],
        bullets: [
          "Load — add 1–2.5 kg when all reps feel solid",
          "Volume — add a set or 1–2 reps before jumping weight",
          "Density — same work in less rest time",
          "Quality — slower eccentrics, full range, stricter form",
        ],
      },
      {
        heading: "A simple weekly frame",
        paragraphs: [
          "Week A: learn the lift. Week B: add reps. Week C: add load. Week D: deload (lighter) so you can climb again. This rhythm builds durable strength — not burnout.",
        ],
        bullets: [
          "Log every session (phone notes work)",
          "Sleep 7–8 hours — recovery is training",
          "Eat enough protein to rebuild what you broke down",
          "Talk to a coach if you're stuck for 3+ weeks",
        ],
      },
      {
        heading: "Mindset",
        paragraphs: [
          "Max strength is the tip of the iceberg. The mass below the water is consistency. Show up. Add a little. Rack your plates. Come back tomorrow.",
        ],
      },
    ],
  },
  {
    slug: "gym-floor-etiquette-that-works",
    title: "How the Gym Floor Actually Works",
    excerpt:
      "Re-rack dumbbells, share stations, wipe benches — the unwritten rules that make Ace Factor feel premium for everyone.",
    category: "Gym Culture",
    readTime: "4 min",
    date: "Aug 2026",
    image: BLOG_IMAGES.dumbbellRack,
    sections: [
      {
        heading: "Keep the dumbbells in the rack",
        paragraphs: [
          "This one rule changes the whole floor. When every pair goes back to its spot, the next athlete finds their weight in seconds. When they don't, training turns into a scavenger hunt.",
          "Finish your set. Walk the dumbbells home. That is the habit of a serious lifter.",
        ],
      },
      {
        heading: "Rules that keep the energy high",
        paragraphs: ["Follow these and you earn respect without saying a word:"],
        bullets: [
          "Re-rack plates and dumbbells after every set",
          "Wipe benches and pads — leave them ready for the next person",
          "Ask before working in; say yes when someone asks you",
          "Don't rest forever on a machine during peak hours",
          "Save phone scrolling for after the set — the rack isn't a sofa",
          "Control your drops — loud ≠ strong",
        ],
      },
      {
        heading: "How to make your session efficient",
        paragraphs: [
          "Warm up 5–10 minutes. Hit your big compounds first (squat, hinge, press, pull). Accessories second. Leave when you're done — quality beats marathon sessions.",
          "If a station is taken, swap the order of accessories instead of hovering. Coaches can help you rewrite the flow on the spot.",
        ],
      },
      {
        heading: "Culture = results",
        paragraphs: [
          "A clean, respectful floor is why Ace Factor feels different. You train harder when the space works. Be the reason someone else has a great session today.",
        ],
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
