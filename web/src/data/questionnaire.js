/* ─────────────────────────────────────────────────────────────────────────────
   SampleSync Profile Questionnaire — question definitions & flow helpers
   ───────────────────────────────────────────────────────────────────────────── */

export const QUESTIONS = {

  /* ══ INTRO ══════════════════════════════════════════════════════════════════ */
  intro_q1: {
    id: 'intro_q1',
    sectionKey: 'intro',
    sectionLabel: 'The Assignment',
    sectionIntro: "Welcome to the Research Lab, Analyst. Let's build your profile.",
    type: 'single',
    question: 'Before we begin, we need to assign you to a Department. Which of these worlds do you live in most often?',
    options: [
      { value: 'snack',     emoji: '🍕', label: 'The Snack & Sip Lab',     description: "I'm always hunting for the next great bite or brew." },
      { value: 'glow',      emoji: '✨', label: 'The Glow-Up Guild',        description: "Skincare, makeup, and 'Self-care Sundays' are my religion." },
      { value: 'perf',      emoji: '💪', label: 'The Performance Pit',      description: 'I need gear that keeps up with my sweat and gains.' },
      { value: 'clean',     emoji: '🧹', label: 'The Clean-Freak Corner',   description: 'I want my home to smell like a spa and run like a machine.' },
      { value: 'pet',       emoji: '🐾', label: 'The Paws & Claws Club',    description: 'My pet eats better than I do. Period.' },
      { value: 'sanctuary', emoji: '🌿', label: 'The Sanctuary Studio',     description: "I'm busy turning my balcony into a jungle or my room into a vibe." },
      { value: 'threads',   emoji: '👗', label: 'The Threads & Trend Lab',  description: "If I'm not wearing it, I'm probably browsing it." },
    ],
  },

  intro_q2: {
    id: 'intro_q2',
    sectionKey: 'intro',
    sectionLabel: 'The Assignment',
    type: 'single',
    question: "In your chosen Department, how would you describe your current status?",
    options: [
      { value: 'novice',     emoji: '🌱', label: 'The Novice',     description: "I buy what's on sale. I'm just here for the freebies." },
      { value: 'enthusiast', emoji: '⭐', label: 'The Enthusiast', description: 'I follow a few brands and know what I like.' },
      { value: 'expert',     emoji: '🔬', label: 'The Expert',     description: "I read the labels, check the ingredients, and people ask me for advice." },
    ],
  },

  intro_q3: {
    id: 'intro_q3',
    sectionKey: 'intro',
    sectionLabel: 'The Assignment',
    type: 'multi',
    question: "If we did a 'Surprise Audit' of your home right now, where would we find the most 'New' brands?",
    hint: 'Select all that apply',
    options: [
      { value: 'kitchen',  emoji: '🍳', label: 'The Kitchen/Pantry' },
      { value: 'bathroom', emoji: '🧴', label: 'The Bathroom/Vanity' },
      { value: 'living',   emoji: '🛋️', label: 'The Living Room/Balcony' },
      { value: 'wardrobe', emoji: '👔', label: 'The Wardrobe' },
      { value: 'pet',      emoji: '🐾', label: 'The Pet Corner' },
    ],
  },

  /* ══ KITCHEN BRANCH ══════════════════════════════════════════════════════════ */
  k_gen_q1: {
    id: 'k_gen_q1',
    sectionKey: 'kitchen',
    sectionLabel: 'The Kitchen Check',
    partLabel: 'Part 1',
    sectionIntro: "Welcome to the Lab! Let's find out your snacking style.",
    type: 'single',
    question: "What's inside your kitchen right now?",
    options: [
      { value: 'trendsetter', emoji: '📱', label: 'The Trendsetter',  description: 'New brands I saw on Instagram or ordered on Blinkit.' },
      { value: 'classic',     emoji: '🏠', label: 'The Classic',      description: "Old favorites like Maggi, Haldiram's, and Biscuits." },
      { value: 'healthnut',   emoji: '💪', label: 'The Health Nut',   description: "High-protein snacks, Makhanas, and 'Zero Sugar' drinks." },
      { value: 'quickfix',    emoji: '⚡', label: 'The Quick Fix',    description: 'Mostly empty—I order what I need right now.' },
    ],
  },
  k_gen_q2: {
    id: 'k_gen_q2',
    sectionKey: 'kitchen',
    sectionLabel: 'The Kitchen Check',
    partLabel: 'Part 1',
    type: 'single',
    question: 'Who usually buys the snacks in your house?',
    options: [
      { value: 'me',     emoji: '🙋', label: "It's all me",        description: 'I pick it and I pay for it.' },
      { value: 'pick',   emoji: '👆', label: 'I pick, they pay',   description: 'I tell my parents/partner what I want, and they buy it.' },
      { value: 'family', emoji: '👨‍👩‍👧', label: 'The Family Shopper', description: 'I buy snacks for everyone at home.' },
    ],
  },
  k_gen_q3: {
    id: 'k_gen_q3',
    sectionKey: 'kitchen',
    sectionLabel: 'The Kitchen Check',
    partLabel: 'Part 1',
    type: 'single',
    question: "It's 4:00 PM and you're hungry. What saves your soul?",
    options: [
      { value: 'sweet',   emoji: '🍫', label: 'Something Sweet',   description: 'Chocolates, cookies, or cake.' },
      { value: 'savoury', emoji: '🍿', label: 'Something Savoury', description: 'Chips, masala snacks, or nuts.' },
      { value: 'drink',   emoji: '☕', label: 'Just a Drink',      description: 'Coffee, tea, or a cold soda.' },
    ],
  },
  /* Kitchen sub-branches */
  k_sweet_q1: {
    id: 'k_sweet_q1',
    sectionKey: 'kitchen',
    sectionLabel: 'The Sweet Lab 🍫',
    partLabel: 'Part 2',
    type: 'single',
    question: 'Crunchy or Melty?',
    options: [
      { value: 'crunchy', emoji: '🍪', label: 'Crunchy Biscuit',     description: 'I love that satisfying snap!' },
      { value: 'melty',   emoji: '🍫', label: 'Chocolate that Melts', description: 'Smooth and silky every time.' },
    ],
  },
  k_sweet_q2: {
    id: 'k_sweet_q2',
    sectionKey: 'kitchen',
    sectionLabel: 'The Sweet Lab 🍫',
    partLabel: 'Part 2',
    type: 'single',
    question: 'How sweet is too sweet?',
    options: [
      { value: 'very',   emoji: '🍬', label: 'I love it sugary',            description: 'The sweeter the better.' },
      { value: 'little', emoji: '🌸', label: 'Just a little sweet',          description: 'Balanced is best.' },
      { value: 'dark',   emoji: '☕', label: 'I prefer it dark and bitter', description: 'Strong, bold, complex.' },
    ],
  },
  k_sav_q1: {
    id: 'k_sav_q1',
    sectionKey: 'kitchen',
    sectionLabel: 'The Savoury Lab 🍿',
    partLabel: 'Part 2',
    type: 'single',
    question: 'How spicy can you go?',
    options: [
      { value: 'mild',   emoji: '🟢', label: 'Mild',                 description: 'A gentle warmth is enough.' },
      { value: 'medium', emoji: '🔴', label: 'The Indian Standard',  description: 'Bring the heat!' },
      { value: 'fire',   emoji: '🔥', label: 'I want to sweat!',     description: 'No mercy whatsoever.' },
    ],
  },
  k_sav_q2: {
    id: 'k_sav_q2',
    sectionKey: 'kitchen',
    sectionLabel: 'The Savoury Lab 🍿',
    partLabel: 'Part 2',
    type: 'single',
    question: "What's the base?",
    options: [
      { value: 'potato', emoji: '🥔', label: 'Potato/Corn chips', description: 'Classic and crispy.' },
      { value: 'grain',  emoji: '🌾', label: 'Healthy grains',    description: 'Ragi, Chickpeas, and more.' },
    ],
  },
  k_drink_q1: {
    id: 'k_drink_q1',
    sectionKey: 'kitchen',
    sectionLabel: 'The Drink Lab ☕',
    partLabel: 'Part 2',
    type: 'single',
    question: 'Bubbles or Still?',
    options: [
      { value: 'fizzy', emoji: '🫧', label: 'Lots of fizz',          description: 'The more bubbles, the better.' },
      { value: 'light', emoji: '✨', label: 'Lightly sparkling',      description: 'Just a gentle tingle.' },
      { value: 'still', emoji: '💧', label: 'No bubbles at all',     description: 'Still water all the way.' },
    ],
  },
  k_drink_q2: {
    id: 'k_drink_q2',
    sectionKey: 'kitchen',
    sectionLabel: 'The Drink Lab ☕',
    partLabel: 'Part 2',
    type: 'single',
    question: 'Why the drink?',
    options: [
      { value: 'caffeine', emoji: '⚡', label: 'For a caffeine hit', description: 'I need to power up.' },
      { value: 'taste',    emoji: '😋', label: 'Just for the taste', description: 'It brings me joy.' },
      { value: 'hydrate',  emoji: '💧', label: 'To stay hydrated',  description: 'Health first.' },
    ],
  },
  /* Kitchen merge */
  k_look_q1: {
    id: 'k_look_q1',
    sectionKey: 'kitchen',
    sectionLabel: 'The Kitchen Check',
    partLabel: 'Part 3',
    sectionIntro: "Taste buds checked! Now, let's talk about looks.",
    type: 'single',
    question: 'The 3-Second Rule: What visual style catches your eye?',
    options: [
      { value: 'simple',  emoji: '⬜', label: 'The Simple Look',  description: 'Clean, modern, and high-end.' },
      { value: 'fun',     emoji: '🎨', label: 'The Fun Look',     description: 'Bright colors and bold fonts.' },
      { value: 'natural', emoji: '🍃', label: 'The Natural Look', description: 'Earthy tones and organic vibes.' },
      { value: 'health',  emoji: '💪', label: 'The Health Look',  description: 'Big labels showing "Protein" or "No Sugar."' },
    ],
  },
  k_look_q2: {
    id: 'k_look_q2',
    sectionKey: 'kitchen',
    sectionLabel: 'The Kitchen Check',
    partLabel: 'Part 3',
    type: 'single',
    question: 'The Dealbreaker: What makes you NOT buy a snack again?',
    options: [
      { value: 'plastic', emoji: '♻️', label: 'Too much plastic', description: "It's bad for the environment." },
      { value: 'hard',    emoji: '✂️', label: 'Hard to open',     description: 'I need scissors to get into it!' },
      { value: 'storage', emoji: '💨', label: 'Bad storage',      description: "It's not resealable and the snacks go soggy." },
    ],
  },
  k_money_q1: {
    id: 'k_money_q1',
    sectionKey: 'kitchen',
    sectionLabel: 'The Kitchen Check',
    partLabel: 'Part 4',
    type: 'single',
    question: "How much would you pay for a brand you've never heard of?",
    options: [
      { value: '30',  emoji: '💸', label: '₹30',  description: "I'll try it if it's cheap." },
      { value: '60',  emoji: '💳', label: '₹60',  description: "I'm willing to take a chance if it looks good." },
      { value: '120', emoji: '💎', label: '₹120+', description: "I don't mind paying for a premium experience." },
    ],
  },
  k_money_q2: {
    id: 'k_money_q2',
    sectionKey: 'kitchen',
    sectionLabel: 'The Kitchen Check',
    partLabel: 'Part 4',
    type: 'single',
    question: 'Where do you find new brands?',
    options: [
      { value: 'social', emoji: '📱', label: 'The Scroll', description: 'Social media ads or influencers.' },
      { value: 'app',    emoji: '⚡', label: 'The App',    description: 'Suggested items on Blinkit/Zepto.' },
      { value: 'word',   emoji: '🗣️', label: 'The Word',  description: 'A recommendation from a friend.' },
      { value: 'store',  emoji: '🏪', label: 'The Store', description: 'I saw it on a shelf and liked it.' },
    ],
  },
  k_exit_q1: {
    id: 'k_exit_q1',
    sectionKey: 'kitchen',
    sectionLabel: 'The Final Word',
    partLabel: 'Part 5',
    sectionIntro: "You're in! One last mission before we send your first sample.",
    type: 'single',
    question: 'If you could change one thing about Indian snacks/drinks, what would it be?',
    options: [
      { value: 'healthy',    emoji: '🌱', label: 'Better ingredients', description: 'Healthy.' },
      { value: 'affordable', emoji: '💰', label: 'Better prices',      description: 'Affordable.' },
      { value: 'flavors',    emoji: '🌶️', label: 'Bolder flavors',     description: 'Taste.' },
      { value: 'eco',        emoji: '♻️', label: 'Better packaging',   description: 'Eco-friendly.' },
    ],
  },

  /* ══ BATHROOM BRANCH ══════════════════════════════════════════════════════════ */
  b_gen_q1: {
    id: 'b_gen_q1',
    sectionKey: 'bathroom',
    sectionLabel: 'The Vanity Lab',
    partLabel: 'Part 1',
    sectionIntro: "Welcome to the Vanity Lab! Let's unlock your 'Glow-up' profile.",
    type: 'single',
    question: "If we peeked into your bathroom right now, what's the vibe?",
    options: [
      { value: 'pharmacy', emoji: '💊', label: 'The Pharmacy',    description: 'Lots of clinical brands (The Derma Co, Minimalist, CeraVe).' },
      { value: 'forest',   emoji: '🌿', label: 'The Forest',      description: 'All-natural, Ayurvedic, or herbal products.' },
      { value: 'luxe',     emoji: '✨', label: 'The Luxe Counter', description: 'Premium brands with fancy bottles and great scents.' },
      { value: 'basic',    emoji: '🫧', label: 'The Basic',       description: 'Just the essentials. Soap and Water kind of person.' },
    ],
  },
  b_gen_q2: {
    id: 'b_gen_q2',
    sectionKey: 'bathroom',
    sectionLabel: 'The Vanity Lab',
    partLabel: 'Part 1',
    type: 'single',
    question: 'Who is the "Boss" of your skincare routine?',
    options: [
      { value: 'researcher', emoji: '🔬', label: 'The Researcher', description: 'I read labels, check ingredients, and know what I need.' },
      { value: 'follower',   emoji: '📱', label: 'The Follower',   description: 'I try what my favorite influencers or friends recommend.' },
      { value: 'gifted',     emoji: '🎁', label: 'The Gifted',     description: 'I usually use whatever was gifted to me or is already in the house.' },
    ],
  },
  b_gen_q3: {
    id: 'b_gen_q3',
    sectionKey: 'bathroom',
    sectionLabel: 'The Vanity Lab',
    partLabel: 'Part 1',
    type: 'single',
    question: "What's your main goal when looking for something new?",
    options: [
      { value: 'face',      emoji: '🌟', label: 'Face Care',  description: 'Glow, Acne, or Anti-aging.' },
      { value: 'body',      emoji: '🧴', label: 'Body Care',  description: 'Soft skin, great scents, or hygiene.' },
      { value: 'fragrance', emoji: '🌸', label: 'Fragrance',  description: 'Perfumes, Deos, or Attars.' },
    ],
  },
  /* Bathroom sub-branches */
  b_face_q1: {
    id: 'b_face_q1',
    sectionKey: 'bathroom',
    sectionLabel: 'The Face Lab',
    partLabel: 'Part 2',
    type: 'single',
    question: 'What\'s your skin "mood"?',
    options: [
      { value: 'oily',      emoji: '✨', label: 'Oily & Shiny',    description: 'That mid-day shine is real.' },
      { value: 'dry',       emoji: '🌵', label: 'Dry & Flaky',    description: 'Moisturizer is my best friend.' },
      { value: 'sensitive', emoji: '🌸', label: 'Sensitive',      description: 'Everything causes a reaction.' },
      { value: 'normal',    emoji: '😊', label: '"Normal" most days', description: 'Balanced and manageable.' },
    ],
  },
  b_face_q2: {
    id: 'b_face_q2',
    sectionKey: 'bathroom',
    sectionLabel: 'The Face Lab',
    partLabel: 'Part 2',
    type: 'single',
    question: "What's your #1 priority?",
    options: [
      { value: 'spots',   emoji: '🎯', label: 'Clearing spots',    description: 'Acne and blemishes begone.' },
      { value: 'glow',    emoji: '✨', label: 'Getting a glow',    description: 'Radiant, lit-from-within skin.' },
      { value: 'hydrate', emoji: '💧', label: 'Keeping it hydrated', description: 'No tight, dry skin ever.' },
    ],
  },
  b_body_q1: {
    id: 'b_body_q1',
    sectionKey: 'bathroom',
    sectionLabel: 'The Body Lab',
    partLabel: 'Part 2',
    type: 'single',
    question: 'Bar or Liquid?',
    options: [
      { value: 'bar',    emoji: '🧼', label: 'Classic soap bars', description: 'A timeless classic.' },
      { value: 'liquid', emoji: '🧴', label: 'Body wash/gel',     description: 'I love a good lather.' },
    ],
  },
  b_body_q2: {
    id: 'b_body_q2',
    sectionKey: 'bathroom',
    sectionLabel: 'The Body Lab',
    partLabel: 'Part 2',
    type: 'single',
    question: 'What scent makes you happy?',
    options: [
      { value: 'fresh',  emoji: '🍋', label: 'Fresh & Citrus',  description: 'Light and energizing.' },
      { value: 'sweet',  emoji: '🍓', label: 'Sweet & Fruity',  description: 'Warm and playful.' },
      { value: 'earthy', emoji: '🪵', label: 'Woody & Earthy',  description: 'Deep and grounding.' },
    ],
  },
  b_scent_q1: {
    id: 'b_scent_q1',
    sectionKey: 'bathroom',
    sectionLabel: 'The Olfactory Office',
    partLabel: 'Part 2',
    type: 'single',
    question: "What's the occasion?",
    options: [
      { value: 'daily', emoji: '☀️', label: 'Daily wear',     description: 'For work or college every day.' },
      { value: 'party', emoji: '🎉', label: 'Parties & dates', description: 'Strong scents for special occasions.' },
    ],
  },
  b_scent_q2: {
    id: 'b_scent_q2',
    sectionKey: 'bathroom',
    sectionLabel: 'The Olfactory Office',
    partLabel: 'Part 2',
    type: 'single',
    question: 'What vibe do you prefer?',
    options: [
      { value: 'flowery', emoji: '🌸', label: 'Light & Flowery',    description: 'Fresh florals, light and airy.' },
      { value: 'musky',   emoji: '🪵', label: 'Deep, Musky & Oud',  description: 'Rich, complex, and lingering.' },
      { value: 'sporty',  emoji: '🏄', label: 'Sporty & Fresh',     description: 'Clean, cool, and crisp.' },
    ],
  },
  /* Bathroom merge */
  b_look_q1: {
    id: 'b_look_q1',
    sectionKey: 'bathroom',
    sectionLabel: 'The Vanity Lab',
    partLabel: 'Part 3',
    sectionIntro: "Looking good! Now, let's see what makes you 'Add to Cart.'",
    type: 'single',
    question: 'The 3-Second Rule: Which packaging stops your scroll?',
    options: [
      { value: 'clean',   emoji: '⬜', label: 'The "Clean" Look',   description: 'Simple, white, and looks like it was made in a lab.' },
      { value: 'vibrant', emoji: '🌈', label: 'The "Vibrant" Look', description: 'Colorful, fun, and looks great on a shelf.' },
      { value: 'luxury',  emoji: '👑', label: 'The "Luxury" Look',  description: 'Glass bottles, gold accents, and a heavy feel.' },
      { value: 'eco',     emoji: '🌍', label: 'The "Eco" Look',     description: 'Paper packaging or refillable bottles.' },
    ],
  },
  b_look_q2: {
    id: 'b_look_q2',
    sectionKey: 'bathroom',
    sectionLabel: 'The Vanity Lab',
    partLabel: 'Part 3',
    type: 'single',
    question: 'The Dealbreaker: What makes you throw a product away?',
    options: [
      { value: 'smell',  emoji: '👃', label: 'The Smell',    description: 'If the scent is too strong or "chemical."' },
      { value: 'feel',   emoji: '🤢', label: 'The Feel',     description: 'If it leaves my skin feeling sticky or greasy.' },
      { value: 'react',  emoji: '😤', label: 'The Reaction', description: 'If it causes a breakout or redness.' },
      { value: 'waste',  emoji: '♻️', label: 'The Waste',    description: 'If there is too much unnecessary plastic.' },
    ],
  },
  b_money_q1: {
    id: 'b_money_q1',
    sectionKey: 'bathroom',
    sectionLabel: 'The Vanity Lab',
    partLabel: 'Part 4',
    type: 'single',
    question: "What's the maximum you'd pay for a 'Mystery' personal care item?",
    options: [
      { value: '150', emoji: '💸', label: '₹150',  description: "I like to keep it budget-friendly for a trial." },
      { value: '400', emoji: '💳', label: '₹400',  description: "I'll pay more for a brand that looks high-quality." },
      { value: '800', emoji: '💎', label: '₹800+', description: "I'm happy to invest in premium self-care." },
    ],
  },
  b_money_q2: {
    id: 'b_money_q2',
    sectionKey: 'bathroom',
    sectionLabel: 'The Vanity Lab',
    partLabel: 'Part 4',
    type: 'single',
    question: 'How do you find your new favorites?',
    options: [
      { value: 'feed',  emoji: '📱', label: 'The Feed',  description: 'Instagram Reels or YouTube Shorts.' },
      { value: 'shop',  emoji: '🛍️', label: 'The Shop',  description: 'Browsing apps like Nykaa, Purplle, or Tira.' },
      { value: 'pro',   emoji: '👩‍⚕️', label: 'The Pro',  description: 'A recommendation from a dermatologist or expert.' },
      { value: 'trial', emoji: '🧪', label: 'The Trial', description: 'I try samples (like yours!) before buying the full size.' },
    ],
  },
  b_exit_q1: {
    id: 'b_exit_q1',
    sectionKey: 'bathroom',
    sectionLabel: 'The Final Word',
    partLabel: 'Part 5',
    sectionIntro: "You're officially a Vanity Analyst. One last check!",
    type: 'single',
    question: "If you could 'Fix' one thing about Indian personal care brands, what would it be?",
    options: [
      { value: 'honest',  emoji: '🔬', label: 'More honesty about ingredients',       description: '' },
      { value: 'price',   emoji: '💰', label: 'Better prices for premium quality',    description: '' },
      { value: 'weather', emoji: '☀️', label: 'Products made for Indian weather/skin', description: '' },
      { value: 'eco',     emoji: '♻️', label: 'Less plastic waste',                   description: '' },
    ],
  },

  /* ══ LIVING ROOM BRANCH ═══════════════════════════════════════════════════════ */
  lr_q3: {
    id: 'lr_q3',
    sectionKey: 'living',
    sectionLabel: 'The Sanctuary Studio',
    sectionIntro: "Welcome to the Sanctuary Studio. Let's map out your 'Zen' zone.",
    type: 'single',
    question: "The Weekend Upgrade: It's Saturday morning. How are you improving your space?",
    options: [
      { value: 'scent', emoji: '🕯️', label: 'The Mood Setter',   description: "I'm looking for a new candle, a diffuser, or a cozy cushion." },
      { value: 'plant', emoji: '🪴', label: 'The Green Parent',  description: "I'm repotting my snake plant or adding a new balcony pot." },
      { value: 'tech',  emoji: '💡', label: 'The Smart Stylist', description: "I'm setting up smart lights or a high-tech home gadget." },
    ],
  },
  lr_c1_q1: {
    id: 'lr_c1_q1',
    sectionKey: 'living',
    sectionLabel: 'The Scent & Soul Lab 🕯️',
    type: 'single',
    question: "The Scent Profile: What's your 'Relax' mode?",
    options: [
      { value: 'spa',    emoji: '🌊', label: 'The Spa',    description: 'Clean linen, sea salt, or white tea.' },
      { value: 'forest', emoji: '🌳', label: 'The Forest', description: 'Sandalwood, oud, or damp earth.' },
      { value: 'bakery', emoji: '🍰', label: 'The Bakery', description: 'Vanilla, cinnamon, or toasted cocoa.' },
    ],
  },
  lr_c1_q2: {
    id: 'lr_c1_q2',
    sectionKey: 'living',
    sectionLabel: 'The Scent & Soul Lab 🕯️',
    type: 'single',
    question: 'The Texture Test: What are you touching?',
    options: [
      { value: 'cozy',  emoji: '🧸', label: 'Soft & Cozy',   description: 'Velvets, faux-furs, and cotton.' },
      { value: 'raw',   emoji: '🪵', label: 'Raw & Rugged',  description: 'Jute, linen, and unpolished wood.' },
      { value: 'sleek', emoji: '🪞', label: 'Sleek & Shiny', description: 'Glass, metal, and marble.' },
    ],
  },
  lr_c2_q1: {
    id: 'lr_c2_q1',
    sectionKey: 'living',
    sectionLabel: 'The Urban Jungle Lab 🪴',
    type: 'single',
    question: 'The Green Skill: How many plants have you... survived?',
    options: [
      { value: 'newbie',     emoji: '🌵', label: 'The Newbie',     description: 'I want "Unkillable" plants (Succulents/Snake plants).' },
      { value: 'enthusiast', emoji: '🌿', label: 'The Enthusiast', description: 'I have a small collection and know my Monstera from my Pothos.' },
      { value: 'pro',        emoji: '🌳', label: 'The Pro',        description: 'I make my own compost and my balcony is a literal forest.' },
    ],
  },
  lr_c2_q2: {
    id: 'lr_c2_q2',
    sectionKey: 'living',
    sectionLabel: 'The Urban Jungle Lab 🪴',
    type: 'single',
    question: "The Garden Goal: What's the point of your garden?",
    options: [
      { value: 'looks',   emoji: '📸', label: 'Pure Looks',     description: 'I just want it to look pretty on Instagram.' },
      { value: 'kitchen', emoji: '🌶️', label: 'Kitchen Garden', description: 'I want to grow my own chillies, mint, and herbs.' },
      { value: 'air',     emoji: '🌬️', label: 'Air Quality',    description: 'I\'m focused on "Air-purifying" plants for a cleaner home.' },
    ],
  },
  lr_c3_q1: {
    id: 'lr_c3_q1',
    sectionKey: 'living',
    sectionLabel: 'The Tech-Home Lab 💡',
    type: 'single',
    question: 'The Tech Driver: Why do you want "Smart" things?',
    options: [
      { value: 'vibe',   emoji: '🌈', label: 'The Vibe Master',      description: 'I want lights that change color with my music/mood.' },
      { value: 'conven', emoji: '📱', label: 'The Convenience King', description: 'I want to control my diffuser/fan from my phone.' },
      { value: 'effic',  emoji: '📊', label: 'The Efficiency Expert', description: "I want to track my home's air quality or energy use." },
    ],
  },
  lr_c3_q2: {
    id: 'lr_c3_q2',
    sectionKey: 'living',
    sectionLabel: 'The Tech-Home Lab 💡',
    type: 'single',
    question: 'The "Setup" Barrier: How tech-savvy are you?',
    options: [
      { value: 'plug',   emoji: '🔌', label: 'Plug & Play',  description: 'I want it to work the moment I take it out of the box.' },
      { value: 'tinker', emoji: '⚙️', label: 'The Tinkerer', description: "I don't mind an app-setup or a little 'smart' integration." },
    ],
  },
  lr_exit_q1: {
    id: 'lr_exit_q1',
    sectionKey: 'living',
    sectionLabel: 'The Final Mission',
    type: 'single',
    question: "If we sent you a 'Mystery Item' for your home, would you prefer it to...",
    options: [
      { value: 'look',  emoji: '✨', label: 'Make my home Look better',   description: 'Aesthetic upgrades.' },
      { value: 'smell', emoji: '🌸', label: 'Make my home Smell better', description: 'Atmospheric perfection.' },
      { value: 'work',  emoji: '⚙️', label: 'Make my home Work better', description: 'Smart utility.' },
    ],
  },

  /* ══ WARDROBE BRANCH ══════════════════════════════════════════════════════════ */
  w_q1: {
    id: 'w_q1',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Threads & Trend Lab',
    sectionIntro: "Welcome to the Threads & Trend Lab. Let's calibrate your 'Style Signal.'",
    type: 'single',
    question: 'The Wardrobe Vibe: If we opened your closet, what\'s the dominant "Mood"?',
    options: [
      { value: 'minimalist', emoji: '⬜', label: 'The Minimalist',      description: 'Lots of solids, neutrals (Black/White/Beige), and clean lines.' },
      { value: 'hype',       emoji: '👟', label: 'The Hype-Beast',     description: 'Oversized tees, cargo pants, and "loud" sneakers.' },
      { value: 'ethnic',     emoji: '🪡', label: 'The Ethnic Soul',    description: 'Linens, cottons, kurtas, and handcrafted textures.' },
      { value: 'corporate',  emoji: '💼', label: 'The Corporate Power', description: 'Sharp shirts, blazers, and polished leather.' },
    ],
  },
  w_q2: {
    id: 'w_q2',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Threads & Trend Lab',
    type: 'single',
    question: "The Style Fork: What are we auditing today?",
    options: [
      { value: 'apparel', emoji: '👕', label: 'The Apparel Deck',   description: 'Tees, Shirts, Dresses, Bottoms.' },
      { value: 'shoes',   emoji: '👟', label: 'The Sole Sanctuary', description: 'Sneakers, Formals, Flats, Slides.' },
      { value: 'access',  emoji: '⌚', label: 'The Accessory Lab',  description: 'Watches, Bags, Jewelry, Eyewear.' },
    ],
  },
  /* Wardrobe sub-branches */
  w_d1_q1: {
    id: 'w_d1_q1',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Apparel Deck 👕',
    type: 'single',
    question: 'The Fit Factor: How do you like your clothes to sit?',
    options: [
      { value: 'tailored',  emoji: '✂️', label: 'Tailored',   description: 'I want it to hug my frame perfectly.' },
      { value: 'relaxed',   emoji: '😌', label: 'Relaxed',    description: 'I like a comfortable, easy-going fit.' },
      { value: 'oversized', emoji: '🏔️', label: 'Oversized', description: 'The bigger and baggier, the better.' },
    ],
  },
  w_d1_q2: {
    id: 'w_d1_q2',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Apparel Deck 👕',
    type: 'single',
    question: 'The Fabric Lab: What does your skin prefer?',
    options: [
      { value: 'natural', emoji: '🌿', label: 'The Naturalist',   description: '100% Cotton, Linen, or Hemp (Breathable).' },
      { value: 'tech',    emoji: '⚡', label: 'The Tech-Head',    description: 'Drifit, Lycra, or Polyester blends (Stretch & Performance).' },
      { value: 'texture', emoji: '🧶', label: 'The Texture Lover', description: 'Corduroy, Denim, or Knits.' },
    ],
  },
  w_d1_q3: {
    id: 'w_d1_q3',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Apparel Deck 👕',
    type: 'single',
    question: "The Color Palette: What's your 'Safe Zone'?",
    options: [
      { value: 'mono',  emoji: '⬛', label: 'Monochrome', description: 'Stay in the Black/Grey/White zone.' },
      { value: 'earthy',emoji: '🍂', label: 'Earthy',     description: 'Olives, Mustards, and Browns.' },
      { value: 'pop',   emoji: '🎨', label: 'Pop',        description: 'Neons, Pastels, and "Look-at-me" colors.' },
    ],
  },
  w_d2_q1: {
    id: 'w_d2_q1',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Sole Sanctuary 👟',
    type: 'single',
    question: "The Footwear DNA: What is your 'Daily Driver'?",
    options: [
      { value: 'sneaker', emoji: '👟', label: 'The Sneakerhead',  description: 'I live in Jordans, Dunks, or chunky "Dad" shoes.' },
      { value: 'comfort', emoji: '🥿', label: 'The Comfort King', description: 'Give me Birkenstocks, Crocs, or cushioned sliders.' },
      { value: 'power',   emoji: '👞', label: 'The Power Player', description: 'Loafers, Oxfords, or sharp Chelsea boots.' },
    ],
  },
  w_d2_q2: {
    id: 'w_d2_q2',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Sole Sanctuary 👟',
    type: 'single',
    question: 'Experimentation Beta: Would you wear a "Statement" shoe?',
    options: [
      { value: 'low',  emoji: '⬜', label: 'Low',  description: 'I prefer classic colors (White/Black/Tan).' },
      { value: 'high', emoji: '🌈', label: 'High', description: 'Give me neon soles, weird textures, and chunky platforms.' },
    ],
  },
  w_d3_q1: {
    id: 'w_d3_q1',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Accessory Lab ⌚',
    sectionIntro: "Welcome to the Accessory Lab. Let's audit the 'Final Touches' of your look.",
    type: 'single',
    question: 'The Accessory Anchor: What is the one item you never leave home without?',
    options: [
      { value: 'watch',   emoji: '⌚', label: 'The Timekeeper', description: 'A classic watch or a high-tech smartwatch.' },
      { value: 'bag',     emoji: '👜', label: 'The Carry-All',  description: 'A sleek backpack, a tote, or a leather crossbody bag.' },
      { value: 'eyewear', emoji: '🕶️', label: 'The Visionary',  description: 'Eyewear—sunglasses or stylish optical frames.' },
      { value: 'bling',   emoji: '💍', label: 'The Bling',      description: 'Rings, chains, or minimalist jewelry.' },
    ],
  },
  w_d3_q2: {
    id: 'w_d3_q2',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Accessory Lab ⌚',
    type: 'single',
    question: 'The Material Preference: What "Metal" or "Texture" defines you?',
    options: [
      { value: 'industrial', emoji: '🥈', label: 'The Industrialist', description: 'Metals (Silver/Gold/Steel) and structured leather.' },
      { value: 'craft',      emoji: '🧵', label: 'The Craftsperson',  description: 'Beads, threads, handmade fabrics, and wood.' },
      { value: 'modern',     emoji: '🔮', label: 'The Modernist',     description: 'Silicon, high-grade plastic, or recycled materials.' },
    ],
  },
  w_d3_q3: {
    id: 'w_d3_q3',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Accessory Lab ⌚',
    type: 'single',
    question: 'The Styling Logic: How do you use your accessories?',
    options: [
      { value: 'utility',   emoji: '🎯', label: 'The Utility Play',   description: 'It has to be useful (holds my laptop, tells the time).' },
      { value: 'statement', emoji: '💬', label: 'The Statement Play', description: "It's there to start a conversation (bold colors, unique shapes)." },
      { value: 'subtle',    emoji: '✨', label: 'The Subtle Play',    description: "It's almost invisible but completes the outfit." },
    ],
  },
  /* Wardrobe merge */
  w_merge_q1: {
    id: 'w_merge_q1',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Intent Lab',
    sectionIntro: "Fit and Color checked. Now, let's look at the 'Purchase Alpha.'",
    type: 'single',
    question: "The 'Mix & Match' Beta: How do you prefer to style your items?",
    options: [
      { value: 'fullset',    emoji: '👗', label: 'The Full Look',     description: "I like buying 'Sets' (Co-ords, matching bag & shoes)." },
      { value: 'fusion',     emoji: '🪡', label: 'The Fusion',        description: 'I love mixing traditional Indian pieces with modern Western wear.' },
      { value: 'individual', emoji: '🎲', label: 'The Individualist', description: 'I buy unique pieces and figure out the styling later.' },
    ],
  },
  w_merge_q2: {
    id: 'w_merge_q2',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Intent Lab',
    type: 'single',
    question: 'The "Hype" Factor: How much does "Limited Edition" matter to you?',
    options: [
      { value: 'low',  emoji: '🤝', label: 'Low',    description: "I just want something that looks good and lasts." },
      { value: 'med',  emoji: '⭐', label: 'Medium', description: "I like brands that aren't 'everywhere' yet." },
      { value: 'high', emoji: '🔥', label: 'High',   description: "I only want exclusive 'Drops' or limited-run collections." },
    ],
  },
  w_intent_q1: {
    id: 'w_intent_q1',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Intent Lab',
    type: 'single',
    question: 'The Brand Driver: Why do you pick a specific brand?',
    options: [
      { value: 'status',  emoji: '👑', label: 'The Status',  description: 'I want people to recognize the logo/brand.' },
      { value: 'story',   emoji: '📖', label: 'The Story',   description: "I care about the brand's mission (Sustainability/Craftsmanship)." },
      { value: 'quality', emoji: '🔍', label: 'The Quality', description: "I don't care about the name, as long as the stitch is perfect." },
    ],
  },
  w_intent_q2: {
    id: 'w_intent_q2',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Intent Lab',
    type: 'single',
    question: 'The Packaging Perk: Does the "Unboxing" matter to you?',
    options: [
      { value: 'eco',     emoji: '🌍', label: 'Eco-Warrior',   description: 'I want zero plastic, just a reusable cloth bag.' },
      { value: 'collect', emoji: '🎁', label: 'The Collector', description: 'I love quirky boxes, stickers, and "thank you" notes.' },
      { value: 'plain',   emoji: '📦', label: 'The Minimalist', description: "Just send it in a standard bag; don't waste paper." },
    ],
  },
  w_intent_q3: {
    id: 'w_intent_q3',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Intent Lab',
    type: 'single',
    question: "The 'Trial' Price Elasticity:",
    options: [
      { value: '499',  emoji: '💸', label: '₹499',    description: "I'll try a new t-shirt/shoe if it's a steal." },
      { value: '999',  emoji: '💳', label: '₹999',    description: "I'm willing to pay for a 'Premium' trial of a D2C brand." },
      { value: '2499', emoji: '💎', label: '₹2,499+', description: 'I only trial high-end/luxury items.' },
    ],
  },
  w_exit_q1: {
    id: 'w_exit_q1',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Fashion Architect',
    type: 'single',
    question: "If you could 'Fix' one thing about Indian clothing brands today, what would it be?",
    options: [
      { value: 'sizing',  emoji: '📏', label: 'Better Sizing',  description: 'Indian bodies are different!' },
      { value: 'fabric',  emoji: '🌡️', label: 'Better Fabric',  description: "It's too hot for this polyester!" },
      { value: 'price',   emoji: '💰', label: 'Better Prices',  description: "It's too expensive for a 'Trial'!" },
      { value: 'design',  emoji: '🎨', label: 'Better Designs', description: 'Everything looks like a copy of Zara!' },
    ],
  },
  w_exit_q2: {
    id: 'w_exit_q2',
    sectionKey: 'wardrobe',
    sectionLabel: 'The Fashion Architect',
    type: 'single',
    question: "If we sent you a 'Secret Style Box' with a piece that is 100% outside your comfort zone, would you wear it for a day to give us an honest report?",
    options: [
      { value: 'yes',   emoji: '🚀', label: "Yes! Send it over!",              description: "I'm a High-Risk Researcher." },
      { value: 'maybe', emoji: '🤔', label: "Only if it matches my vibe.",    description: '' },
      { value: 'no',    emoji: '🛡️', label: "I prefer sticking to my style.", description: '' },
    ],
  },

  /* ══ PET BRANCH ═══════════════════════════════════════════════════════════════ */
  p_q1: {
    id: 'p_q1',
    sectionKey: 'pet',
    sectionLabel: 'The Paws & Claws Club',
    sectionIntro: "Welcome to the Paws & Claws Club. Let's find out who really runs your household!",
    type: 'single',
    question: 'The Furry Profile: Who are we researching for today?',
    options: [
      { value: 'dog',   emoji: '🐕', label: 'The Dog Parent',  description: 'Puppies, Seniors, or the "Goodest Boys".' },
      { value: 'cat',   emoji: '🐈', label: 'The Cat Staff',   description: 'Because we know cats actually own the house.' },
      { value: 'multi', emoji: '🐾', label: 'The Multitasker', description: 'I have a full house—dogs, cats, and more.' },
    ],
  },
  p_q2: {
    id: 'p_q2',
    sectionKey: 'pet',
    sectionLabel: 'The Paws & Claws Club',
    type: 'single',
    question: "The Pet Fork: What is your pet's current 'Project'?",
    options: [
      { value: 'food',     emoji: '🍗', label: 'The Gourmet Goal', description: 'Food, treats, and toppers.' },
      { value: 'play',     emoji: '🎾', label: 'The Play Protocol', description: 'Toys, gear, and accessories.' },
      { value: 'wellness', emoji: '🛁', label: 'The Wellness Wing', description: 'Grooming, shampoo, and health.' },
    ],
  },
  /* Pet sub-branches */
  p_e1_q1: {
    id: 'p_e1_q1',
    sectionKey: 'pet',
    sectionLabel: 'The Gourmet Goal 🍗',
    type: 'single',
    question: "The Diet DNA: What's the main meal look like?",
    options: [
      { value: 'kibble', emoji: '🥣', label: 'The Reliable Kibble', description: 'Dry food from trusted big brands.' },
      { value: 'home',   emoji: '👨‍🍳', label: 'The Home Chef',      description: 'Freshly cooked meals or "Human-grade" D2C food.' },
      { value: 'mix',    emoji: '🔀', label: 'The Mixologist',      description: 'A bit of everything—kibble + wet food + toppers.' },
    ],
  },
  p_e1_q2: {
    id: 'p_e1_q2',
    sectionKey: 'pet',
    sectionLabel: 'The Gourmet Goal 🍗',
    type: 'single',
    question: "The 'Treat' Strategy: Why do you give treats?",
    options: [
      { value: 'training', emoji: '🎯', label: 'Training Rewards', description: 'Small, low-calorie bites for good behavior.' },
      { value: 'dental',   emoji: '🦷', label: 'Dental/Health',    description: 'Chews that clean teeth or help joints.' },
      { value: 'love',     emoji: '❤️', label: 'Pure Love',        description: '"Just because" snacks that taste amazing.' },
    ],
  },
  p_e2_q1: {
    id: 'p_e2_q1',
    sectionKey: 'pet',
    sectionLabel: 'The Play Protocol 🎾',
    type: 'single',
    question: 'The Play Style: How does your pet handle a new toy?',
    options: [
      { value: 'destroyer', emoji: '💥', label: 'The Destroyer', description: "It's in pieces within 5 minutes. (I need heavy-duty rubber)." },
      { value: 'snuggler',  emoji: '🧸', label: 'The Snuggler',  description: 'They carry it around like a baby. (I love plush/soft toys).' },
      { value: 'thinker',   emoji: '🧩', label: 'The Thinker',   description: 'They love puzzles and hidden treat games.' },
    ],
  },
  p_e2_q2: {
    id: 'p_e2_q2',
    sectionKey: 'pet',
    sectionLabel: 'The Play Protocol 🎾',
    type: 'single',
    question: 'The Gear Vibe: What are they wearing outside?',
    options: [
      { value: 'utility',    emoji: '🎒', label: 'The Utility Kit',       description: 'Sturdy, plain, and easy to wash.' },
      { value: 'fashion',    emoji: '🎀', label: 'The Fashion Statement', description: 'Bright colors, bowties, and "Streetwear" leashes.' },
      { value: 'minimalist', emoji: '🪡', label: 'The Minimalist',        description: 'A simple, high-quality leather collar.' },
    ],
  },
  p_e3_q1: {
    id: 'p_e3_q1',
    sectionKey: 'pet',
    sectionLabel: 'The Wellness Wing 🛁',
    type: 'single',
    question: "The Spa Routine: How often do they get a 'Glow-up'?",
    options: [
      { value: 'diy',       emoji: '🛁', label: 'The DIYer',        description: 'I wash them at home with whatever smells good.' },
      { value: 'pro',       emoji: '✂️', label: 'The Pro-Groom',   description: "They go to a parlor; I just need 'maintenance' sprays." },
      { value: 'sensitive', emoji: '🌿', label: 'The Skin-Sensitive', description: 'We only use medicated or organic/natural shampoos.' },
    ],
  },
  p_e3_q2: {
    id: 'p_e3_q2',
    sectionKey: 'pet',
    sectionLabel: 'The Wellness Wing 🛁',
    type: 'single',
    question: 'The Scent Check: How should your pet smell?',
    options: [
      { value: 'fragfree', emoji: '🚫', label: 'Fragrance-Free',     description: "I don't want any artificial smells on them." },
      { value: 'fresh',    emoji: '🌿', label: 'Fresh & Clean',      description: 'Lemon, Lavender, or Mint.' },
      { value: 'puppy',    emoji: '🐾', label: 'The "Puppy" Smell',  description: 'Mild, powdery, and soft.' },
    ],
  },
  /* Pet merge */
  p_merge_q1: {
    id: 'p_merge_q1',
    sectionKey: 'pet',
    sectionLabel: 'The Pet Parent Merge',
    sectionIntro: "Profile complete! Now, let's talk about your 'Add to Cart' habits.",
    type: 'single',
    question: 'The Trust Driver: What makes you trust a new pet brand?',
    options: [
      { value: 'nonas',   emoji: '✅', label: 'The "No-Nasty" Label', description: 'No chemicals, no fillers, 100% natural.' },
      { value: 'vet',     emoji: '👩‍⚕️', label: "The Vet's Word",      description: "If it's recommended by a professional." },
      { value: 'reviews', emoji: '⭐', label: 'The Reviews',          description: 'If other pet parents on social media swear by it.' },
    ],
  },
  p_merge_q2: {
    id: 'p_merge_q2',
    sectionKey: 'pet',
    sectionLabel: 'The Pet Parent Merge',
    type: 'single',
    question: 'The Unboxing Joy: Does quirky packaging matter?',
    options: [
      { value: 'eco',  emoji: '🌍', label: 'The Eco-Pack',          description: 'I want recycled boxes and zero plastic.' },
      { value: 'fun',  emoji: '🎁', label: 'The Fun-Pack',          description: 'Give me a box that turns into a cat-house or has a free toy inside!' },
      { value: 'info', emoji: '📋', label: 'The Information-Pack',  description: 'Just give me clear instructions and a batch number.' },
    ],
  },
  p_merge_q3: {
    id: 'p_merge_q3',
    sectionKey: 'pet',
    sectionLabel: 'The Pet Parent Merge',
    type: 'single',
    question: "The Willingness to Spend:",
    options: [
      { value: '299',  emoji: '💸', label: '₹299',    description: "I'll try a new treat/toy if it's reasonably priced." },
      { value: '699',  emoji: '💳', label: '₹699',    description: "I'm happy to pay for a 'Premium' D2C experience." },
      { value: '1499', emoji: '💎', label: '₹1,499+', description: "I only want the best for my pet; price isn't a factor." },
    ],
  },
  p_exit_q1: {
    id: 'p_exit_q1',
    sectionKey: 'pet',
    sectionLabel: 'The Pet Architect',
    type: 'single',
    question: "If you could change one thing about the pet products available in India, what would it be?",
    options: [
      { value: 'health',  emoji: '🔬', label: 'Better Health Standards', description: "Tell me what's actually in the food!" },
      { value: 'durable', emoji: '🔨', label: 'More Durable Toys',       description: 'Everything breaks too fast!' },
      { value: 'price',   emoji: '💰', label: 'Better Pricing',          description: "Imported stuff is too expensive!" },
      { value: 'local',   emoji: '🇮🇳', label: 'More Local Brands',       description: 'I want to support Indian-made pet products!' },
    ],
  },

  /* ══ DEBRIEF: MISSION CONTROL ════════════════════════════════════════════════ */
  d_q1: {
    id: 'd_q1',
    sectionKey: 'debrief',
    sectionLabel: 'Mission Control',
    sectionIntro: "Almost there, Analyst! Your profile is 90% calibrated. Let's finalize the logistics.",
    type: 'single',
    question: "The Frequency Cadence: How often are you ready for a new mission?",
    options: [
      { value: 'weekly',  emoji: '⚡', label: 'High-Velocity Researcher', description: "Send me something every week! I'm ready." },
      { value: 'monthly', emoji: '📅', label: 'The Weekend Warrior',      description: 'Once or twice a month is perfect for me.' },
      { value: 'match',   emoji: '🔍', label: 'The Surprise Specialist',  description: 'Only send me something when it perfectly matches my profile.' },
    ],
  },
  d_q2: {
    id: 'd_q2',
    sectionKey: 'debrief',
    sectionLabel: 'Mission Control',
    type: 'single',
    question: "The 'Reviewer's Oath': How do you prefer to submit your findings?",
    options: [
      { value: 'video', emoji: '🎬', label: 'The Director',     description: "I'll record a quick video (15-30 secs) of my honest reaction." },
      { value: 'photo', emoji: '📸', label: 'The Photographer', description: "I'll send high-quality photos and a written report." },
      { value: 'text',  emoji: '✍️', label: 'The Scriptwriter', description: 'I prefer detailed text reviews—no cameras for me!' },
    ],
  },
  d_q3: {
    id: 'd_q3',
    sectionKey: 'debrief',
    sectionLabel: 'Mission Control',
    type: 'single',
    question: "The Notification Hub: Where should we send your 'Mission Briefs'?",
    options: [
      { value: 'whatsapp', emoji: '💬', label: 'WhatsApp',          description: 'Quick, easy, and I never miss a message.' },
      { value: 'email',    emoji: '📧', label: 'Email',             description: "I like to keep my research professional and organized." },
      { value: 'app',      emoji: '🔔', label: 'App Notifications', description: 'Keep it all in one place.' },
    ],
  },
  d_q4: {
    id: 'd_q4',
    sectionKey: 'debrief',
    sectionLabel: 'Mission Control',
    type: 'single',
    question: "The 'One Big Truth': If you had to pick ONLY ONE, what defines a 'Great' brand for you?",
    options: [
      { value: 'performance', emoji: '🎯', label: 'Performance', description: 'It has to do exactly what it says on the box.' },
      { value: 'ethics',      emoji: '🌍', label: 'Ethics',      description: 'It has to be clean, sustainable, and kind to the planet.' },
      { value: 'experience',  emoji: '✨', label: 'Experience',  description: 'It has to feel premium, smell great, or taste amazing.' },
      { value: 'value',       emoji: '💰', label: 'Value',       description: 'It has to be worth every single Rupee.' },
    ],
  },
  d_q5: {
    id: 'd_q5',
    sectionKey: 'debrief',
    sectionLabel: 'The Exit Gate',
    sectionIntro: "That's a wrap! Your Researcher ID is now being generated.",
    type: 'single',
    question: "Final Check: Would you like to 'Recruit' a fellow researcher?",
    options: [
      { value: 'solo',  emoji: '🕵️', label: 'The Solo Agent',   description: 'Not right now, let me try a sample first!' },
      { value: 'squad', emoji: '👥', label: 'The Squad Leader', description: 'Yes! I have friends who would love this.' },
    ],
    isLast: true,
  },
};

/* ── Flow helpers ─────────────────────────────────────────────────────────── */

export const INITIAL_FLOW = ['intro_q1', 'intro_q2', 'intro_q3'];

export const DEBRIEF_FLOW = ['d_q1', 'd_q2', 'd_q3', 'd_q4', 'd_q5'];

const BRANCH_BASE = {
  kitchen:  ['k_gen_q1', 'k_gen_q2', 'k_gen_q3', 'k_look_q1', 'k_look_q2', 'k_money_q1', 'k_money_q2', 'k_exit_q1'],
  bathroom: ['b_gen_q1', 'b_gen_q2', 'b_gen_q3', 'b_look_q1', 'b_look_q2', 'b_money_q1', 'b_money_q2', 'b_exit_q1'],
  living:   ['lr_q3', 'lr_exit_q1'],
  wardrobe: ['w_q1', 'w_q2', 'w_merge_q1', 'w_merge_q2', 'w_intent_q1', 'w_intent_q2', 'w_intent_q3', 'w_exit_q1', 'w_exit_q2'],
  pet:      ['p_q1', 'p_q2', 'p_merge_q1', 'p_merge_q2', 'p_merge_q3', 'p_exit_q1'],
};

const BRANCH_ORDER = ['kitchen', 'bathroom', 'living', 'wardrobe', 'pet'];

// Sub-branch injection map: triggerQuestionId → { answerValue: [questionIds] }
const SUB_BRANCH_MAP = {
  k_gen_q3: {
    sweet:   ['k_sweet_q1', 'k_sweet_q2'],
    savoury: ['k_sav_q1', 'k_sav_q2'],
    drink:   ['k_drink_q1', 'k_drink_q2'],
  },
  b_gen_q3: {
    face:      ['b_face_q1', 'b_face_q2'],
    body:      ['b_body_q1', 'b_body_q2'],
    fragrance: ['b_scent_q1', 'b_scent_q2'],
  },
  lr_q3: {
    scent: ['lr_c1_q1', 'lr_c1_q2'],
    plant: ['lr_c2_q1', 'lr_c2_q2'],
    tech:  ['lr_c3_q1', 'lr_c3_q2'],
  },
  w_q2: {
    apparel: ['w_d1_q1', 'w_d1_q2', 'w_d1_q3'],
    shoes:   ['w_d2_q1', 'w_d2_q2'],
    access:  ['w_d3_q1', 'w_d3_q2', 'w_d3_q3'],
  },
  p_q2: {
    food:     ['p_e1_q1', 'p_e1_q2'],
    play:     ['p_e2_q1', 'p_e2_q2'],
    wellness: ['p_e3_q1', 'p_e3_q2'],
  },
};

// All possible sub-branch prefixes per trigger — used to strip old injections on re-answer
export const SUB_BRANCH_PREFIXES = {
  k_gen_q3: ['k_sweet_', 'k_sav_', 'k_drink_'],
  b_gen_q3: ['b_face_', 'b_body_', 'b_scent_'],
  lr_q3:    ['lr_c1_', 'lr_c2_', 'lr_c3_'],
  w_q2:     ['w_d1_', 'w_d2_', 'w_d3_'],
  p_q2:     ['p_e1_', 'p_e2_', 'p_e3_'],
};

export function getBranchQuestionsForSelections(selections) {
  return BRANCH_ORDER
    .filter(branch => selections.includes(branch))
    .flatMap(branch => BRANCH_BASE[branch]);
}

export function getSubBranchQuestions(questionId, answer) {
  const map = SUB_BRANCH_MAP[questionId];
  if (!map) return [];
  return map[answer] ?? [];
}

export function getQuestionById(id) {
  return QUESTIONS[id] ?? null;
}
