export type Personality = {
  id: string;
  name: string;
  coffee: string;
  tagline: string;
  image: string;
  icon: string;
};

export const personalities: Personality[] = [
  {
    id: "bold-adventurer",
    name: "Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live for intensity",
    image: "/bold-adventurer.jpg",
    icon: "🔥",
  },
  {
    id: "cozy-classic",
    name: "Cozy Classic",
    coffee: "Medium Roast Drip",
    tagline: "Comfort in every cup",
    image: "/cozy-classic.jpg",
    icon: "☕",
  },
  {
    id: "zen-minimalist",
    name: "Zen Minimalist",
    coffee: "Black Coffee, Single Origin",
    tagline: "Simple. Clean. Perfect.",
    image: "/zen-minimalist.jpg",
    icon: "🤍",
  },
  {
    id: "night-owl",
    name: "Night Owl",
    coffee: "Red Eye",
    tagline: "Sleep is optional",
    image: "/night-owl.jpg",
    icon: "🌙",
  },
  {
    id: "health-nut",
    name: "Health Nut",
    coffee: "Oat Milk Americano",
    tagline: "Wellness in every sip",
    image: "/health-nut.jpg",
    icon: "🌿",
  },
];

export type Question = {
  question: string;
  answers: string[];
};

// Answer order for every question matches `personalities` order:
// Bold Adventurer -> Cozy Classic -> Zen Minimalist -> Night Owl -> Health Nut
export const questions: Question[] = [
  {
    question: "What are your weekend plans?",
    answers: [
      "Booking a spontaneous trip somewhere new",
      "Blanket, a book, and doing nothing",
      "A long walk with my phone left at home",
      "Sleeping till noon, up till 3am",
      "An early workout and a green juice",
    ],
  },
  {
    question: "Which fictional character do you relate to most?",
    answers: [
      "Indiana Jones",
      "Bilbo Baggins",
      "Master Oogway",
      "Batman",
      "Captain America",
    ],
  },
  {
    question: "Pick a color that matches your mood most days.",
    answers: [
      "Fire-engine red",
      "Warm amber",
      "Soft white",
      "Deep midnight blue",
      "Fresh green",
    ],
  },
  {
    question: "What's your ideal vacation?",
    answers: [
      "Backpacking somewhere remote",
      "A cabin in the woods with a fireplace",
      "A quiet retreat, no itinerary",
      "A city that never sleeps",
      "An active retreat - hiking, yoga, clean eating",
    ],
  },
  {
    question: "What do you binge on streaming?",
    answers: [
      "Action/thriller",
      "Feel-good sitcoms",
      "Slow cinema & documentaries",
      "True crime at 2am",
      "Wellness & fitness content",
    ],
  },
  {
    question: "If you were a weather pattern, you'd be...",
    answers: [
      "A sudden thunderstorm",
      "A gentle, steady rain",
      "A clear, calm sky",
      "A foggy midnight",
      "A crisp, sunny morning",
    ],
  },
  {
    question: "What's your go-to comfort food?",
    answers: [
      "Spicy street food",
      "Grandma's homemade soup",
      "A simple bowl of rice and veggies",
      "Late-night diner fries",
      "A protein smoothie bowl",
    ],
  },
  {
    question: "Stranded on a desert island, what's the one item you bring?",
    answers: [
      "A knife, for building and exploring",
      "A soft blanket",
      "A journal",
      "A flashlight",
      "A water filter",
    ],
  },
  {
    question: "What's your ideal Friday night?",
    answers: [
      "Concert or spontaneous adventure out",
      "Home, pizza, cozy movie night",
      "Quiet night in, tea and silence",
      "Still going strong past midnight",
      "Early night, up for a 6am run tomorrow",
    ],
  },
  {
    question: "Pick a soundtrack for your life.",
    answers: [
      "Fast-paced rock/electronic",
      "Warm acoustic folk",
      "Ambient & instrumental",
      "Moody synth/lo-fi",
      "Upbeat pop",
    ],
  },
];
