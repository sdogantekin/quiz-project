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
  {
    question: "What's your dream home?",
    answers: [
      "A treehouse in the middle of nowhere",
      "A cottage with a wraparound porch",
      "A minimalist loft with nothing on the walls",
      "A high-rise apartment overlooking the city lights",
      "A house near a gym and a farmers market",
    ],
  },
  {
    question: "How do you like to travel?",
    answers: [
      "Solo, with a one-way ticket and no plan",
      "With family, somewhere familiar and comfortable",
      "Alone, somewhere quiet and untouched",
      "Red-eye flights, chasing time zones",
      "An active trip - hiking, cycling, swimming",
    ],
  },
  {
    question: "What's your idea of a perfect morning?",
    answers: [
      "Already outside before sunrise, chasing something",
      "Coffee in bed, no alarm, no rush",
      "Silence, stretching, and a clear mind",
      "Morning? What morning - still asleep",
      "A workout, a smoothie, and a plan for the day",
    ],
  },
  {
    question: "Pick a party you'd actually enjoy.",
    answers: [
      "A rooftop party that gets a little wild",
      "A cozy dinner party with close friends",
      "A quiet gathering, more listening than talking",
      "An after-midnight party that's just getting started",
      "A brunch with mimosas and good conversation",
    ],
  },
  {
    question: "What's your go-to weekend workout (or lack thereof)?",
    answers: [
      "Something extreme - rock climbing, boxing, sprinting",
      "A leisurely walk, if that counts",
      "Yoga, alone, no class needed",
      "Whatever's open at 2am",
      "A structured gym routine, tracked and logged",
    ],
  },
  {
    question: "Pick a movie genre for tonight.",
    answers: [
      "Action/adventure",
      "Rom-com",
      "Arthouse/foreign film",
      "Horror/thriller",
      "A documentary about health or nature",
    ],
  },
  {
    question: "Which video game world would you want to live in?",
    answers: [
      "An open-world survival game",
      "Animal Crossing",
      "A slow, atmospheric walking simulator",
      "A dark, gothic RPG",
      "A fitness/rhythm game world",
    ],
  },
  {
    question: "Pick a talk show host you'd want to hang out with.",
    answers: [
      "Someone loud and spontaneous",
      "Someone warm and down-to-earth",
      "Someone calm and thoughtful",
      "A late-night host, obviously",
      "Someone who's always talking about wellness",
    ],
  },
  {
    question: "Choose a superhero power.",
    answers: [
      "Super strength",
      "Healing, for others",
      "Invisibility",
      "Night vision, never needing sleep",
      "Super speed and stamina",
    ],
  },
  {
    question: "What's the vibe of your ideal playlist?",
    answers: [
      "High-energy, loud, fast",
      "Familiar songs you know by heart",
      "Instrumental, ambient, no lyrics",
      "Late-night moody tracks",
      "Upbeat and motivational",
    ],
  },
  {
    question: "Pick a texture.",
    answers: [
      "Rough, like stone",
      "Soft, like a worn-in sweater",
      "Smooth, like polished wood",
      "Cool, like glass at night",
      "Fresh, like cut grass",
    ],
  },
  {
    question: "If you were a kitchen appliance, you'd be...",
    answers: [
      "A blender - fast, intense, a little chaotic",
      "A slow cooker - patient, warm, comforting",
      "A French press - simple, deliberate",
      "A coffee maker with a midnight timer",
      "A juicer",
    ],
  },
  {
    question: "Pick a mythical creature.",
    answers: [
      "A dragon",
      "A friendly giant",
      "A quiet forest spirit",
      "A vampire",
      "A phoenix, always renewing",
    ],
  },
  {
    question: "What's your energy at 3pm on a Tuesday?",
    answers: [
      "Restless, need to move",
      "Steady, unbothered",
      "Focused, in the zone",
      "Fading fast, running on caffeine",
      "Energized - just had a walk",
    ],
  },
  {
    question: "Choose a font that matches your personality.",
    answers: [
      "Bold, all caps",
      "Rounded, friendly script",
      "Clean, minimal sans-serif",
      "Dark, dramatic serif",
      "Crisp, modern sans-serif",
    ],
  },
];
