import type { ContentBlock, FaqItem, JournalPost, LegalSection, Package, Story, Testimonial } from "@/types/content"

const stories: Story[] = [
  {
    slug: "anna-dmitry",
    coupleNames: "Anna & Dmitry",
    location: "Saint Petersburg",
    country: "Russia",
    date: "15 August 2024",
    preview: "/romantic-wedding-ceremony.jpg",
    previewAlt: "Anna & Dmitry wedding in Saint Petersburg — ceremony in a mansion",
    shortDescription:
      "Classic ceremony in a riverside mansion. Soft palette, real emotion, and thoughtful details.",
    featured: true,
    gallery: [
      "/romantic-wedding-ceremony.jpg",
      "/elegant-wedding-couple-walking.jpg",
      "/romantic-sunset-couple.jpg",
      "/emotional-ceremony-moment.jpg",
      "/couple-laughing-together.jpg",
      "/intimate-first-dance.jpg",
    ],
    description:
      "A romantic celebration in a historic mansion overlooking the Neva. Anna and Dmitry chose timeless elegance while keeping the day warm and intimate.",
  },
  {
    slug: "maria-alexander",
    coupleNames: "Maria & Alexander",
    location: "Moscow",
    country: "Russia",
    date: "22 July 2024",
    preview: "/bride-and-groom-in-city.jpg",
    previewAlt: "Maria & Alexander wedding in Moscow — city stroll",
    shortDescription:
      "Modern city wedding in downtown Moscow. Glass, light, architecture, and candid emotions.",
    featured: true,
    gallery: [
      "/bride-and-groom-in-city.jpg",
      "/elegant-wedding-couple-walking.jpg",
      "/couple-laughing-together.jpg",
      "/emotional-ceremony-moment.jpg",
    ],
    description:
      "A stylish city wedding with an emphasis on Moscow architecture. Maria and Alexander wanted a clean documentary look that keeps the city's rhythm.",
  },
  {
    slug: "elena-sergey",
    coupleNames: "Elena & Sergey",
    location: "Tuscany",
    country: "Italy",
    date: "5 September 2024",
    preview: "/destination-wedding-tuscany.jpg",
    previewAlt: "Elena & Sergey wedding in Tuscany — vineyards, destination celebration",
    shortDescription:
      "Destination wedding among vineyards. Warm light, rolling hills, and a terrace dinner under the stars.",
    featured: true,
    gallery: [
      "/destination-wedding-tuscany.jpg",
      "/tuscany-vineyard-wedding.jpg",
      "/romantic-sunset-couple.jpg",
      "/couple-in-nature.jpg",
      "/intimate-first-dance.jpg",
    ],
    description:
      "An intimate ceremony on an Italian villa with panoramic views. Sunset stroll, delicate décor, and a long table dinner with the closest people.",
  },
  {
    slug: "victoria-maxim",
    coupleNames: "Victoria & Maxim",
    location: "Near Moscow",
    country: "Russia",
    date: "10 June 2024",
    preview: "/couple-in-nature.jpg",
    previewAlt: "Victoria & Maxim wedding near Moscow — outdoor celebration",
    shortDescription: "Cozy day outdoors. Garden portraits, friends’ laughter, live music, and fireworks after dusk.",
    featured: false,
    gallery: [
      "/couple-in-nature.jpg",
      "/couple-laughing-together.jpg",
      "/romantic-sunset-couple.jpg",
      "/emotional-ceremony-moment.jpg",
    ],
    description:
      "A warm intimate wedding surrounded by friends. Gentle daylight, a stroll in the garden, and heartfelt toasts with a string quartet.",
  },
]

const testimonials: Testimonial[] = [
  {
    coupleNames: "Maria & Alex",
    location: "Wedding in Moscow",
    avatar: "/placeholder-user.jpg",
    quote: "Anna caught every important moment. We relive the day each time we look at the gallery.",
  },
  {
    coupleNames: "Elena & Dmitry",
    location: "Wedding in Saint Petersburg",
    avatar: "/placeholder-user.jpg",
    quote: "We were afraid of feeling stiff, but with Anna we forgot about the camera and stayed true to ourselves.",
  },
  {
    coupleNames: "Anna & Sergey",
    location: "Wedding in Tuscany, Italy",
    avatar: "/placeholder-user.jpg",
    quote: "Exactly the photographs we dreamed of: light, emotional, and attentive to detail. Thank you for our story!",
  },
]

const packages: Package[] = [
  {
    id: "small-day",
    name: "Intimate Wedding",
    hours: "6 hours",
    price: "from 150 000 ₽",
    description: "For chamber ceremonies and registries with a small guest list.",
    features: [
      "300+ edited photographs",
      "Online gallery for download",
      "Author’s color grading",
      "Delivery in 4–6 weeks",
    ],
    ctaLabel: "Choose package",
  },
  {
    id: "full-day",
    name: "Full Day",
    hours: "10 hours",
    price: "from 250 000 ₽",
    description: "From getting ready to the first dance. The most popular option.",
    features: [
      "500+ edited photographs",
      "Online gallery for download",
      "Author’s color grading",
      "Premium 30x30 cm photobook",
      "Delivery in 4–6 weeks",
    ],
    popular: true,
    badge: "Popular",
    ctaLabel: "Reserve the date",
  },
  {
    id: "two-days",
    name: "Weekend",
    hours: "2 days",
    price: "from 400 000 ₽",
    description: "For weddings stretched across the weekend: welcome evening and main day.",
    features: [
      "800+ edited photographs",
      "Online gallery for download",
      "Author’s color grading",
      "Premium 30x30 cm photobook",
      "20 fine art prints 20x30 cm",
      "Delivery in 6–8 weeks",
    ],
    ctaLabel: "Discuss details",
  },
]

const faq: FaqItem[] = [
  {
    question: "How do I reserve a date?",
    answer:
      "Drop me a message. We’ll discuss your format, I’ll suggest a light-friendly timeline and reserve the date after a 30% retainer.",
  },
  {
    question: "Do you travel abroad?",
    answer:
      "Yes. I shoot across Europe and Asia, help with locations, light-friendly timing, and a travel budget estimate.",
  },
  {
    question: "How many photos will we get?",
    answer: "From one hour of shooting you receive about 50–70 edited images. Every frame goes through color grading.",
  },
  {
    question: "When will the photos be ready?",
    answer: "Around 4–6 weeks. A preview set comes within 5–7 days.",
  },
  {
    question: "Can we get the RAWs?",
    answer:
      "I deliver only the curated, edited photographs. That keeps the story consistent and the quality at the right level.",
  },
]

const journalPosts: JournalPost[] = [
  {
    slug: "how-to-choose-wedding-photographer",
    title: "How to choose a wedding photographer",
    excerpt: "Key criteria and the questions worth asking during the first call.",
    image: "/female-photographer.png",
    date: "15 January 2025",
    category: "Guides",
    relatedSlugs: ["wedding-day-timeline", "best-light-for-photos", "destination-wedding-guide"],
    content: [
      { type: "paragraph", text: "Photos stay with you forever, so it’s important to work with someone you trust." },
      { type: "heading", text: "Define your style" },
      {
        type: "paragraph",
        text: "Look at what resonates most: documentary, editorial, classic portraits, or a mixed approach.",
      },
      { type: "heading", text: "Review full stories" },
      {
        type: "paragraph",
        text: "Don’t stop at highlights; full galleries show how the photographer works throughout the day.",
      },
      { type: "heading", text: "Light and emotion" },
      {
        type: "paragraph",
        text: "Check indoor, overcast, and sunset light examples. Emotions should feel genuine.",
      },
      { type: "heading", text: "Ask the basics" },
      {
        type: "list",
        items: [
          "How many hours and how many images are included?",
          "When will the gallery be delivered?",
          "Payment terms and travel fees?",
          "How are the files delivered and backed up?",
        ],
      },
      { type: "heading", text: "Check the chemistry" },
      {
        type: "paragraph",
        text: "You’ll spend the whole day together. Comfort in communication matters as much as the visual style.",
      },
    ] satisfies ContentBlock[],
  },
  {
    slug: "wedding-day-timeline",
    title: "Wedding day timeline",
    excerpt: "A plan that keeps the day calm and leaves room for real moments.",
    image: "/romantic-sunset-couple.jpg",
    date: "8 January 2025",
    category: "Planning",
    content: [
      {
        type: "paragraph",
        text: "A clear timeline reduces stress. Consider light and logistics between venues.",
      },
    ],
  },
  {
    slug: "best-light-for-photos",
    title: "Golden hour: best time to shoot",
    excerpt: "Why light is everything and how to plan your portrait walk around it.",
    image: "/couple-in-nature.jpg",
    date: "22 December 2024",
    category: "Photography",
    content: [
      {
        type: "paragraph",
        text: "Soft sunset light flatters skin tones and reveals textures in a gentle way.",
      },
    ],
  },
  {
    slug: "destination-wedding-guide",
    title: "Destination wedding guide",
    excerpt: "What to keep in mind when planning abroad: documents, light, timing, and team.",
    image: "/destination-wedding-tuscany.jpg",
    date: "10 December 2024",
    category: "Guides",
    content: [
      {
        type: "paragraph",
        text: "Plan travel budget, scout locations for light, and leave time to acclimate and do a walkthrough.",
      },
    ],
  },
]

const legalPrivacySections: LegalSection[] = [
  {
    title: "General terms",
    body:
      "This policy explains how personal data of annapetrova.com users is processed. By using the site you accept these rules.",
  },
  {
    title: "What we collect",
    items: ["Name and contacts", "Event details (date, city, venue)", "IP and technical data", "Messages from forms"],
  },
  {
    title: "Why we process data",
    items: [
      "To reply to enquiries and book a shoot",
      "To issue contracts and invoices",
      "To improve service and communication",
      "To send useful materials with your consent",
    ],
  },
  {
    title: "How we protect data",
    body: "Access is limited, connections are encrypted, and the policy is reviewed regularly.",
  },
  {
    title: "Sharing with third parties",
    body:
      "Data isn’t shared without your consent except when required by law or to fulfil the contract (e.g., accounting).",
  },
  {
    title: "Your rights",
    items: ["Access your data", "Request correction or deletion", "Withdraw consent", "File a complaint with a regulator"],
  },
  {
    title: "Cookies",
    body:
      "Cookies help the site work better. You can disable them in your browser, but some functions may be limited.",
  },
  {
    title: "Policy updates",
    body: "The current version is published here. Last updated: 15 January 2025.",
  },
  {
    title: "Contacts",
    body: "Questions about data processing: hello@annapetrova.com.",
  },
]

const legalOfferSections: LegalSection[] = [
  {
    title: "Subject of the agreement",
    body: "Wedding photography according to the agreed scenario and timeline.",
  },
  {
    title: "Booking and payment",
    items: [
      "30% retainer reserves the date",
      "Balance paid before/after the shoot as agreed",
      "All terms are documented in invoice and act",
    ],
  },
  {
    title: "Responsibilities",
    items: [
      "Photographer follows the timeline and treats venues with care",
      "Client provides access to locations and informs vendors",
      "Changes are discussed in advance",
    ],
  },
  {
    title: "Delivery",
    body: "Online gallery delivered within 4–6 weeks, preview in up to 7 days. Timings may shift in force majeure.",
  },
  {
    title: "Image rights",
    items: [
      "Client receives personal use rights",
      "Public use with credit",
      "Photographer may use images in portfolio unless agreed otherwise",
    ],
  },
  {
    title: "Cancellation / reschedule",
    body: "When rescheduling, the retainer is kept. Cancellation within 30 days is non-refundable. Force majeure is handled separately.",
  },
]

const en = {
  brand: "Anna Petrova",
  meta: {
    title: "Anna Petrova — Wedding Photographer",
    description:
      "Editorial wedding photography with warm light and honest emotions. Documentary approach with elegant styling.",
  },
  navigation: {
    menuLabel: "Menu",
    items: [
      { href: "/portfolio", label: "Portfolio" },
      { href: "/services", label: "Services" },
      { href: "/experience", label: "Approach" },
      { href: "/about", label: "About" },
      { href: "/reviews", label: "Reviews" },
      { href: "/journal", label: "Journal" },
      { href: "/faq", label: "FAQ" },
    ],
    contactCta: "Get in touch",
  },
  footer: {
    tagline:
      "Wedding photographer Anna Petrova. Modern editorial style, warm light, living emotions and meticulous details — I photograph weddings in Moscow, Saint Petersburg, and beyond.",
    navigationTitle: "Navigation",
    contactTitle: "Contact",
    socialTitle: "Social",
    contacts: {
      phone: "+7 900 123 45 67",
      email: "hello@annapetrova.com",
      telegram: "@annapetrova",
    },
    social: {
      instagram: "Instagram",
      pinterest: "Pinterest",
    },
    legal: {
      privacy: "Privacy policy",
      offer: "Service offer",
    },
    copyright: "© 2025 Anna Petrova Photography. All rights reserved.",
  },
  home: {
    hero: {
      eyebrow: "Wedding photographer • modern editorial style",
      heading: "Timeless aesthetics of your feelings. Wedding photography as a legacy.",
      subheading: "Photographs you will revisit for years to come.",
      description:
        "Living emotions instead of staged moments. Natural frames where you recognize your relaxed selves.",
      stats: "10+ years • 100+ weddings • Moscow & destinations",
      primaryCta: "Check the date",
      secondaryCta: "View portfolio",
      imageAlt: "Wedding photographer Anna Petrova — couple on a walk, wedding shoot",
    },
    forWhom: {
      title: "Who my work is for",
      prosTitle: "For you if...",
      consTitle: "Not the best fit if...",
      pros: [
        "You want to be yourselves, not play a role",
        "You value real emotion over perfect poses",
        "You appreciate natural, honest imagery",
        "You value reliability, high service, and calm",
      ],
      cons: [
        "You imagine the wedding only in a staged, highly orchestrated style",
        "You expect heavy retouching and a dramatic change in appearance",
        "You want to control every pose and frame instead of trusting your photographer",
      ],
    },
    benefitsTitle: "What you get",
    benefits: [
      {
        title: "Complete story",
        text: "From getting ready to the dance floor — all key moments in one visual story",
      },
      {
        title: "Real emotion",
        text: "No wooden posing — just genuine feelings and natural movement",
      },
      {
        title: "Ready-to-share set",
        text: "Photos ready for album printing and social sharing without extra editing",
      },
      {
        title: "Clear timelines",
        text: "Agreed timelines and a clear deadline for when your images arrive",
      },
    ],
    featuredTitle: "Stories of my couples",
    aboutSnippet: {
      eyebrow: "About me",
      heading: "I photograph weddings so you recognise yourselves",
      body: [
        "My role is to keep the emotions of your day. No endless reshoots or pressure.",
        "In 10+ years I’ve captured over 100 weddings in Russia and abroad — from intimate dinners to destination weekends.",
      ],
      stats: [
        { label: "Experience", value: "10+ years" },
        { label: "Weddings", value: "100+" },
        { label: "Cities", value: "15+" },
        { label: "Formats", value: "4–12 hour coverage" },
      ],
      cta: "Learn more",
    },
    testimonialsTitle: "Kind words",
    finalCta: {
      heading: "Ready to trust me with your wedding?",
      text: "Write me to find out if your date, shooting format, and pricing are available.",
      button: "Check the date",
    },
  },
  portfolio: {
    eyebrow: "Portfolio",
    heading: "Couple stories",
    intro:
      "A selection of weddings in different formats: city ceremonies, intimate gatherings, and destination weekends. I keep the atmosphere and character of each couple.",
    viewAll: "View all stories",
    viewStory: "View story",
    otherStories: "More stories",
    ctaHeading: "Shall we talk about your day?",
    ctaText: "Send me a note to discuss details and reserve your date.",
    ctaButton: "Contact",
  },
  services: {
    eyebrow: "Services",
    heading: "Coverage packages",
    intro: "Pick a package that fits your celebration. We can adjust the details to match your plans.",
    includesTitle: "Every package includes",
    includes: [
      { title: "Pre-wedding call", text: "We discuss details, timing, and expectations" },
      { title: "Natural editing", text: "Author’s color grading without heavy filters" },
      { title: "Easy gallery", text: "Protected online gallery for download and sharing" },
      { title: "Personal use rights", text: "Full personal use for you and your family" },
    ],
    unsureTitle: "Not sure which one?",
    unsureText: "Message me and I’ll recommend the right coverage for your format.",
    contactCta: "Write to me",
  },
  experience: {
    eyebrow: "My approach",
    heading: "How I work",
    intro:
      "Wedding photography is about trust, observation, and being invisible when needed. I work so you can stay relaxed and get a genuine story.",
    philosophy: {
      title: "Shooting philosophy",
      bullets: [
        "The best images happen when you forget the camera",
        "I create a comfortable atmosphere instead of forcing poses",
        "I watch the light and the moment to keep emotions honest",
      ],
    },
    processTitle: "Process",
    processSubtitle: "From the first message to the final gallery",
    steps: [
      {
        number: "01",
        title: "Hello",
        description: "A call or meeting to understand your expectations and the shape of the day.",
      },
      {
        number: "02",
        title: "Prep",
        description: "I build a light-friendly timeline, scout locations, and stay in touch.",
      },
      {
        number: "03",
        title: "Wedding day",
        description: "I document from getting ready to dancing with a calm, unobtrusive presence.",
      },
      {
        number: "04",
        title: "Curate & edit",
        description: "Selecting the strongest frames and editing in my signature color palette.",
      },
      {
        number: "05",
        title: "Delivery",
        description: "Online gallery on time, help with prints and albums if you need them.",
      },
    ],
    valuesTitle: "What matters to me",
    values: [
      { title: "Trust", description: "You share your day with me — I honour that." },
      { title: "Honesty", description: "No forced moments, only the real ones." },
      { title: "Aesthetics", description: "Clean light, thoughtful details, and composition." },
      { title: "Comfort", description: "You feel free, not staged." },
    ],
    ctaHeading: "Ready to chat about coverage?",
    ctaText: "Tell me about your plans — we’ll choose a format that fits.",
    ctaButton: "Get in touch",
  },
  about: {
    eyebrow: "About me",
    heading: "I photograph weddings so you recognize yourself in the images",
    intro:
      "My goal is to preserve the emotions of your day and your atmosphere. Without endless reshoots or pressure.",
    introSecondary:
      "Over 10+ years I have photographed 100+ weddings across Russia and abroad — from intimate dinners to large destination celebrations.",
    factsTitle: "A few facts",
    facts: [
      { label: "150+", value: "Weddings photographed" },
      { label: "12", value: "Countries shot" },
      { label: "10", value: "Years of experience" },
    ],
    approachTitle: "My approach",
    approach: [
      { title: "Natural first", text: "No forced smiles or unnecessary posing." },
      { title: "Detail oriented", text: "I keep everything that makes your day yours." },
      { title: "Atmosphere", text: "Respectful work with space, people, and light." },
    ],
    coffeeCtaHeading: "Let’s meet",
    coffeeCtaText: "Send me a note and we’ll chat over coffee or a quick call.",
    coffeeCtaButton: "Contact me",
  },
  reviewsPage: {
    eyebrow: "Reviews",
    heading: "What couples say",
    intro: "A few notes that reflect my calm approach and attention to people.",
  },
  faqPage: {
    eyebrow: "FAQ",
    heading: "Questions I get often",
    intro: "The most common answers before booking. If something’s missing — just ask.",
    moreQuestions: "Didn’t find your question? Write to me and I’ll help.",
  },
  journalPage: {
    eyebrow: "Journal",
    heading: "Articles & advice",
    intro: "I share experience on planning, light, and feeling confident in front of the camera.",
    relatedTitle: "You might also like",
    backLink: "Back to articles",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Check your date & chat details",
    intro: "Tell me about your celebration — I'll reply within one business day with two coverage options.",
    channels: [
      { label: "Telegram", value: "@annapetrova", href: "https://t.me/yourhandle", description: "Fast response" },
      { label: "Email", value: "hello@annapetrova.photo", href: "mailto:hello@annapetrova.photo", description: "Detailed requests" },
      { label: "Instagram", value: "@annapetrova", href: "https://instagram.com/yourhandle", description: "Recent work" },
      { label: "WhatsApp", value: "+7 (XXX) XXX-XX-XX", href: "https://wa.me/yourphone", description: "Texts & calls" },
    ],
    processTitle: "How it works",
    process: [
      { title: "1. Fill the form", text: "Name, contacts, wedding date and city" },
      { title: "2. Quick call", text: "We align on timing and format" },
      { title: "3. Lock the date", text: "I send a contract and 30% retainer invoice" },
      { title: "4. Enjoy the day", text: "I stay close and capture your story" },
    ],
    form: {
      title: "Tell me about you",
      subtitle: "A few details will help me prepare a tailored proposal.",
      fields: {
        name: "Names",
        email: "Email",
        phone: "Phone",
        date: "Wedding date",
        location: "City / venue",
        message: "Plans & wishes",
        preferredContact: "Preferred contact method",
      },
      placeholders: {
        name: "For example, Anna and Dmitry",
        email: "name@email.com",
        phone: "+44 0000 000 000",
        date: "Approximate date or season",
        location: "City, venue or country",
        message: "What matters to you? Guests count? Portrait walk?",
      },
      preferredContactOptions: [
        { value: "telegram", label: "Telegram" },
        { value: "whatsapp", label: "WhatsApp" },
        { value: "call", label: "Call" },
      ],
      cta: "Send request",
      sending: "Sending...",
      success: "Thank you! I’ll get back within one business day.",
      error: "Something went wrong. Please try again or reach out on Telegram.",
      validation: {
        required: "This field is required",
        email: "Please enter a valid email",
        phone: "Please add your phone number",
        date: "Please add the date",
        preferredContact: "Please choose a preferred contact channel",
      },
    },
  },
  legal: {
    privacy: {
      title: "Privacy policy",
      sections: legalPrivacySections,
    },
    offer: {
      title: "Service offer",
      sections: legalOfferSections,
    },
  },
  stories,
  testimonials,
  packages,
  faq,
  journalPosts,
}

export default en
