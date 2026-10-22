export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  buttonText: string;
}

export interface ProjectItem {
  id: string;
  role: string;
  company: string;
  period: string;
  title: string;
  accentWord: string;
  subtitle: string;
  category: string;
  description: string;
  metrics?: { label: string; value: string }[];
  bulletPoints: string[];
  tools: string[];
  image: string;
  fallbackGradient: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  year: string;
  category: 'Tertiary' | 'Secondary' | 'Primary';
  details?: string;
}

export interface SeminarItem {
  title: string;
  theme: string;
  institution: string;
  location: string;
  date: string;
  description: string;
}

export interface CharacterReference {
  name: string;
  title: string;
  company: string;
  contact: string;
  location?: string;
}

export const portfolioData = {
  profile: {
    fullName: "Mark Aldrin Balute Tejadilla",
    firstName: "Mark Aldrin",
    lastName: "Tejadilla",
    wordmark: "TEJADILLA",
    role: {
      bold: "Data Entry Specialist",
      light: "& Admin Virtual Assistant"
    },
    subRole: "Aviation Flying Graduate",
    email: "ald.tej16@gmail.com",
    phone: "+63 945 260 9502",
    phoneClean: "+639452609502",
    location: "Panapaan 1, City of Bacoor, Cavite, 4102, Philippines",
    shortLocation: "Bacoor, Cavite, Philippines",
    photoUrl: "/assets/image/profile.png",
    cvDownloadUrl: "/assets/image/CV-TEJADILLA_c434efe9.pdf",
    whatsapp: "639452609502",
    birthDate: "February 16, 2000",
    birthPlace: "Kuwait City",
    citizenship: "Filipino",
    languages: ["Filipino", "English"],
    height: "5'7",
    objective: "To work in demanding environment where all my skills and efforts to explore and familiar myself in varied fields, and comprehend my potential skills I gained during my training and can add to the growth of organization with inspiring performance.",
  },

  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Records & Logs Managed", value: "10k+" },
    { label: "Core Platforms", value: "8+" },
    { label: "Aviation Degree", value: "BS Flying" }
  ],

  stackMarquees: [
    {
      label: "Core Operations & CRM",
      duration: 38,
      reverse: false,
      items: [
        "CRM Data Management",
        "Employee Time Logs",
        "Truck Fleet Tracking",
        "Excel & Google Sheets",
        "Inventory Auditing",
        "Workflow Organization",
        "Client Profile Record Keeping",
        "Data Hygiene & Accuracy"
      ]
    },
    {
      label: "Digital Media & Scheduling",
      duration: 44,
      reverse: true,
      items: [
        "YouTube Video Scheduling",
        "Canva Video Editing",
        "Audio & Music Synchronization",
        "Animation & Transitions",
        "Social Media Content Strategy",
        "Excel Release Tracking",
        "Scripted Storyline Alignment"
      ]
    },
    {
      label: "E-Commerce & Reselling",
      duration: 40,
      reverse: false,
      items: [
        "StockX Seller Operations",
        "GOAT & ALIAS Platform",
        "Flight Club Reselling",
        "Instagram & Facebook Commerce",
        "Product Photography",
        "Outgoing Shipments & Returns",
        "Customer Inquiry Resolution"
      ]
    },
    {
      label: "Aviation & Technical Acumen",
      duration: 48,
      reverse: true,
      items: [
        "BS Aviation Major in Flying",
        "Wet Weather Flight Principles",
        "Jet Systems Familiarization",
        "Checklist & SOP Discipline",
        "High-Pressure Decision Making",
        "Aviation Innovation Seminars"
      ]
    }
  ],

  services: [
    {
      id: "01",
      title: "CRM & DATA ENTRY OPERATIONS",
      tagline: "Structured data integrity, employee log audits, and operational efficiency",
      description: "Fast, accurate inputting and maintenance of business-critical information into CRM platforms and spreadsheets. Experienced in tracking employee time logs, client profiling, and operational fleet utilization with zero tolerance for reporting discrepancies.",
      capabilities: [
        "Manage and record employee time logs, clock-in/out schedules, and client assignments",
        "Monitor and track truck and fleet usage metrics for operational cost-efficiency",
        "Update and maintain client profiles through CRM systems with accurate historical records",
        "Manage product inventory in Excel & Google Sheets with formulaic reporting",
        "Maintain high attention to detail to ensure timely and error-free reporting to management"
      ],
      buttonText: "VIEW EXPERIENCE"
    },
    {
      id: "02",
      title: "SOCIAL MEDIA & YOUTUBE SCHEDULING",
      tagline: "Consistent multi-channel publishing, release pipelines, and content alignment",
      description: "End-to-end management of digital release schedules and video asset distribution. Expert in developing organized spreadsheet trackers that align with wider marketing campaigns and content release goals.",
      capabilities: [
        "Manage and schedule YouTube video uploads ensuring timely and uninterrupted delivery",
        "Maintain and optimize detailed Excel tracking spreadsheets for multi-week release pipelines",
        "Align video publishing workflows with overarching content strategy and marketing milestones",
        "Coordinate metadata, descriptions, tags, and thumbnails for optimal platform reach",
        "Monitor upload integrity and publishing schedules to maintain audience engagement"
      ],
      buttonText: "VIEW SCHEDULES"
    },
    {
      id: "03",
      title: "CANVA VIDEO EDITING & MULTIMEDIA",
      tagline: "Engaging short-form videos, sound design synchronization, and brand graphics",
      description: "Crafting polished video content for online and social media platforms using Canva's video editing suite. Skilled at weaving together scripted storylines, dynamic text animations, and crisp audio elements.",
      capabilities: [
        "Edit and enhance video content using Canva's video tools for social platforms",
        "Integrate background music, voiceovers, sound effects, and smooth transitions",
        "Synchronize translated text and on-screen captions with corresponding visuals and graphics",
        "Utilize dynamic animation features for text, graphical overlays, and title sequences",
        "Align on-screen visual beats with scripted narration to preserve cohesive viewer attention"
      ],
      buttonText: "VIEW CREATIVE WORK"
    },
    {
      id: "04",
      title: "E-COMMERCE & SNEAKER RESELLING",
      tagline: "Inventory procurement, marketplace syndication, and high-touch customer care",
      description: "Proven track record in high-velocity retail and online resale operations with By The Hype PH. Managing retail buying, verified secondary marketplace transactions, photography, packaging, and shipping logistics.",
      capabilities: [
        "Retail procurement of authentic sneakers via online channels and physical storefronts",
        "Multi-channel listing and sales through StockX, GOAT, ALIAS, Flight Club, and Meta groups",
        "Product photography, staging, inspection, and catalog organization for maximum conversion",
        "Real-time inventory reconciliation through Excel and Google Sheets",
        "Preparing compliant outgoing shipments, handling packaging, and processing returns"
      ],
      buttonText: "VIEW COMMERCE"
    },
    {
      id: "05",
      title: "AVIATION RIGOR & PROCEDURAL DISCIPLINE",
      tagline: "Flight training background applied to business operations & risk mitigation",
      description: "Holding a Bachelor of Science in Aviation Major in Flying from Airlink International Aviation College. Brings pilot training discipline — checklists, calm decision-making, situational awareness, and strict procedural adherence — to high-pressure virtual assistant operations.",
      capabilities: [
        "Standard Operating Procedure (SOP) formulation and meticulous execution",
        "Webinar-trained in Jet Familiarization and Wet Weather Flying Wellness operations",
        "Participated in Scientia Aviation Industry future & pandemic innovation symposiums",
        "Adaptable to changing requirements with structured contingency planning",
        "Professional written and verbal communication across diverse international stakeholders"
      ],
      buttonText: "VIEW CREDENTIALS"
    }
  ] as ServiceItem[],

  projects: [
    {
      id: "proj-1",
      role: "Virtual Assistant – Data Entry Specialist",
      company: "Remote Client Operations",
      period: "April 2024 – May 2026",
      title: "DATA ENTRY & FLEET",
      accentWord: "operations",
      subtitle: "CRM MANAGEMENT & LOGISTICS",
      category: "Data Operations",
      description: "Directed data pipelines for client time logs and fleet utilization. Maintained CRM records, tracked product inventories across distributed teams, and ensured meticulous reporting for operations leadership.",
      metrics: [
        { label: "Accuracy Rate", value: "99.8%" },
        { label: "Log Tracking", value: "100% on-time" },
        { label: "Fleet Visibility", value: "Daily Sync" }
      ],
      bulletPoints: [
        "Managed and recorded employee time logs, including clock-in/out times and assignments for each client.",
        "Monitored and tracked truck usage for operational logistics and efficiency.",
        "Updated client profiles through CRM and maintained accurate data records.",
        "Managed product inventory using Excel/Google Sheets and input related information into systems.",
        "Maintained high attention to detail to ensure data accuracy and timely reporting.",
        "Supported workflow organization by keeping detailed and structured records."
      ],
      tools: ["CRM Systems", "Google Sheets", "Excel", "Fleet Tracking", "Time Log Systems"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      fallbackGradient: "from-blue-900/40 via-slate-900 to-black"
    },
    {
      id: "proj-2",
      role: "Sales Associates & Inventory Lead",
      company: "By The Hype PH",
      period: "February 2021 – Present",
      title: "SNEAKER COMMERCE &",
      accentWord: "reselling",
      subtitle: "GLOBAL MARKETPLACE SYNDICATION",
      category: "E-Commerce",
      description: "Orchestrated omni-channel retail sneaker acquisition and secondary market syndication across top international marketplaces including StockX, GOAT, and Flight Club. Handled studio photography, inventory databases, and fulfillment.",
      metrics: [
        { label: "Marketplaces", value: "5+ Channels" },
        { label: "Inventory Turns", value: "Continuous" },
        { label: "Customer Rating", value: "Top Tier" }
      ],
      bulletPoints: [
        "Managed buying sneakers for retail via online drops and physical retail stores.",
        "Online reselling through Facebook groups, Instagram, ALIAS, GOAT, Flight Club, and StockX.",
        "Organized and professionally photographed sneaker inventory for high-conversion listings.",
        "Addressed customer inquiries, sizing advice, and concerns in a timely, polite manner.",
        "Maintained positive client relationships through friendly interactions and reliable service.",
        "Tracked multi-channel inventory counts and margins through Excel/Sheets.",
        "Prepared and inspected outgoing shipments, packaged goods safely, and handled return processing."
      ],
      tools: ["StockX", "GOAT", "ALIAS", "Flight Club", "Excel", "Product Photography", "Meta Commerce"],
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80",
      fallbackGradient: "from-amber-950/40 via-stone-900 to-black"
    },
    {
      id: "proj-3",
      role: "Virtual Assistant – Social Media Scheduler",
      company: "Content Creator Network",
      period: "November 2023",
      title: "YOUTUBE CONTENT &",
      accentWord: "pipeline",
      subtitle: "MULTI-SERIES RELEASE TRACKING",
      category: "Media Strategy",
      description: "Spearheaded YouTube video upload schedules and release pacing for video productions. Maintained complex editorial spreadsheets to synchronize release dates with audience engagement trends.",
      metrics: [
        { label: "On-Time Releases", value: "100%" },
        { label: "Pipeline Horizon", value: "4-Week Plan" },
        { label: "Content Cadence", value: "Daily / Weekly" }
      ],
      bulletPoints: [
        "Managed and scheduled YouTube video uploads, ensuring consistent and timely content delivery.",
        "Engineered and maintained a detailed Excel spreadsheet tracking release schedules and milestone dates.",
        "Ensured all publishing workflows strictly aligned with overarching channel strategy and marketing goals.",
        "Organized upload metadata, tags, and assets to eliminate last-minute publishing bottlenecks."
      ],
      tools: ["YouTube Creator Studio", "Excel Calendar Tracker", "Google Drive", "Content Scheduling"],
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
      fallbackGradient: "from-red-950/40 via-stone-900 to-black"
    },
    {
      id: "proj-4",
      role: "Freelancer – Canva Video Editor",
      company: "Digital Production Client",
      period: "October 2023",
      title: "DYNAMIC VIDEO &",
      accentWord: "motion",
      subtitle: "MULTIMEDIA EDITING & SOUND SYNC",
      category: "Content Creation",
      description: "Produced dynamic short-form videos with Canva's suite, integrating timed soundtrack transitions, localized translations, and motion typography aligned with scripted storylines.",
      metrics: [
        { label: "Platform Output", value: "IG Reels / YT" },
        { label: "Audio Balance", value: "Synced Beats" },
        { label: "Visual Pacing", value: "Engaging" }
      ],
      bulletPoints: [
        "Edited and enhanced video content using Canva's video editing tools for high-retention social feeds.",
        "Integrated music tracks, sound effects, and subtle audio ducking for clear, balanced voice audio.",
        "Synchronized translated text and title graphics with precise video markers and animations.",
        "Leveraged Canva's keyframe and transition features for animated text and graphic wipes.",
        "Maintained cohesive brand styling and narrative flow across multiple video variations."
      ],
      tools: ["Canva Video Suite", "Audio Synchronizer", "Motion Typography", "Subtitle Tooling"],
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
      fallbackGradient: "from-purple-950/40 via-stone-900 to-black"
    }
  ] as ProjectItem[],

  education: [
    {
      degree: "Bachelor of Science in Aviation Major in Flying",
      institution: "Airlink International Aviation College",
      location: "Domestic Road, Pasay City 1301",
      year: "Graduated January 2025",
      category: "Tertiary",
      details: "Comprehensive flight education encompassing aerodynamics, aircraft performance, navigation, weather assessment, and standard operating procedures."
    },
    {
      degree: "Senior High School — Science, Technology, Engineering and Mathematics (STEM)",
      institution: "University of Perpetual Help System DALTA",
      location: "Las Piñas / Cavite",
      year: "Completed April 2018",
      category: "Secondary",
      details: "Rigorous analytical foundation covering advanced mathematics, physical sciences, and technical problem solving."
    },
    {
      degree: "Junior High School",
      institution: "Cavite School of Life – Bacoor",
      location: "Bacoor, Cavite",
      year: "Completed March 2016",
      category: "Secondary",
      details: "Foundational education fostering student leadership, communication, and discipline."
    },
    {
      degree: "Primary Education",
      institution: "Waynesville Learning Center",
      location: "Philippines",
      year: "Completed March 2012",
      category: "Primary",
      details: "Primary basic education and foundational studies."
    }
  ] as EducationItem[],

  seminars: [
    {
      title: "SCIENTIA KNOWLEDGE HUB 2022",
      theme: "“Embracing The Future of the Aviation Industry”",
      institution: "Air Link International Aviation College",
      location: "Domestic Road, Pasay City 1301",
      date: "April 8, 2022",
      description: "Analyzed technological transformation, automated navigation, and green aviation protocols shaping contemporary international aviation."
    },
    {
      title: "WET WEATHER FLYING WELLNESS WEBINAR",
      theme: "“More Than The Basics”",
      institution: "Air Link International Aviation College",
      location: "Domestic Road, Pasay City 1301",
      date: "August 20, 2021",
      description: "Deep dive into adverse weather flight planning, hydroplaning hazards, reduced visibility procedures, and pilot mental acuity under meteorological stress."
    },
    {
      title: "JET FAMILIARIZATION WEBINAR",
      theme: "“Preparation to the Pipeline”",
      institution: "Air Link International Aviation College",
      location: "Domestic Road, Pasay City 1301",
      date: "May 28, 2021",
      description: "Turbine engine dynamics, high-altitude aerodynamics, cockpit automation systems, and procedural transitions from light trainer aircraft to commercial jet operations."
    },
    {
      title: "SCIENTIA 2021",
      theme: "“Propelling Aviation Amidst The Pandemic Through Innovation”",
      institution: "Air Link International Aviation College",
      location: "Domestic Road, Pasay City 1301",
      date: "January 28, 2021",
      description: "Explored operational resilience, health compliance frameworks, and logistics reinventions during unprecedented global transport disruptions."
    }
  ] as SeminarItem[],

  specialSkills: [
    "Has confidence and attentive personality with keen eye for detail",
    "Willing to learn new systems quickly and adapt to changing environments",
    "Excellent in written and verbal communication in English & Filipino",
    "Able to work collaboratively, build trust, and cooperate with international teams",
    "Fast and accurate inputting of complex data records into CRM platforms",
    "High procedural discipline rooted in formal flight training"
  ],

  characterReferences: [
    {
      name: "Anthony DeBiasse",
      title: "Chief Executive Officer (CEO)",
      company: "Ant’s Plants (Lawn Care & Pest Control)",
      contact: "+1 (908) 448-2537",
      location: "United States"
    },
    {
      name: "Mr. Jed Anthony Ferrer",
      title: "Bilingual Porting Specialist",
      company: "Zoom Video Communications",
      contact: "+63 995 429 3507",
      location: "Philippines"
    }
  ] as CharacterReference[]
};
