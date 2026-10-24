/**
 * Portfolio Data — Strictly grounded in Mark Aldrin Balute Tejadilla's official CV
 * Absolutely ZERO fabricated metrics, sample projects, or mock data.
 */

export interface WorkExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  category: string;
  location?: string;
  bulletPoints: string[];
  tools: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  year: string;
  category: 'Tertiary' | 'Secondary' | 'Primary';
  details?: string;
}

export interface SeminarItem {
  title: string;
  theme?: string;
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

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  buttonText: string;
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
    location: "Blk I lot 15 RSG Gueventhomes Panapaan 1, City of Bacoor, Cavite, 4102, Philippines",
    shortLocation: "Bacoor, Cavite, Philippines",
    photoUrl: "/assets/image/profile.png",
    cvDownloadUrl: "/assets/image/CV-TEJADILLA_c434efe9.pdf",
    whatsapp: "639452609502",
    linkedin: "https://www.linkedin.com/in/mark-aldrin-tejadilla-044619292/",
    birthDate: "February 16, 2000",
    birthPlace: "Kuwait City",
    citizenship: "Filipino",
    civilStatus: "Single",
    religion: "Roman Catholic",
    sex: "Male",
    languages: ["Filipino", "English"],
    height: "5'7",
    objective: "Organized Virtual Assistant dedicated to improving accuracy and efficiency by maintaining and developing administrative and procedural processes. Focused and communicative individual possessing superb data entry, time management, and customer service skills. Offering 2 years of experience providing quality administrative support to clients.",
  },

  // Real facts directly from CV (no fabricated numbers)
  stats: [
    { label: "Administrative VA", value: "2 Years" },
    { label: "Retail Commerce", value: "2021–2026" },
    { label: "Aviation Degree", value: "BS Flying" },
    { label: "Verified References", value: "2 Leaders" }
  ],

  // Real skills marquees directly matching his CV
  stackMarquees: [
    {
      label: "Data Entry & Administration",
      duration: 36,
      reverse: false,
      items: [
        "Fast & Accurate CRM Input",
        "Employee Time Logs",
        "Truck Fleet Usage Tracking",
        "Client Profile Management",
        "Product Inventory Maintenance",
        "Excel & Google Sheets",
        "Workflow Organization",
        "Procedural Processes"
      ]
    },
    {
      label: "Social Media & Video Editing",
      duration: 42,
      reverse: true,
      items: [
        "YouTube Video Uploads",
        "Video Release Date Tracking",
        "Posting Schedule Spreadsheets",
        "Canva Video Editing",
        "Music & Sound Effects Integration",
        "Audio Synchronization",
        "Translated Text Alignment",
        "Canva Dynamic Animations"
      ]
    },
    {
      label: "Retail Sales & Commerce",
      duration: 38,
      reverse: false,
      items: [
        "Retail Sneaker Buying",
        "Online Reselling via Meta",
        "StockX Marketplace Operations",
        "GOAT & ALIAS Platform",
        "Flight Club Reselling",
        "Inventory Photography",
        "Customer Service & Inquiries",
        "Shipment Prep & Return Handling"
      ]
    },
    {
      label: "Aviation Discipline & Education",
      duration: 46,
      reverse: true,
      items: [
        "BS Aviation Major in Flying",
        "Checklist & SOP Rigor",
        "Airlink Int. Aviation College",
        "Wet Weather Flying Seminar",
        "Jet Familiarization Training",
        "Aviation Industry Innovation",
        "Calm High-Pressure Execution",
        "Bilingual Communication"
      ]
    }
  ],

  // Core Service Areas strictly derived from his 4 real work experiences
  services: [
    {
      id: "01",
      title: "CRM & DATA ENTRY OPERATIONS",
      tagline: "Accurate record-keeping, time logs, and operational fleet tracking",
      description: "Fast and accurate inputting of critical business information into CRM platforms and spreadsheets. Proven experience managing employee time records, client profiles, and operational fleet utilization.",
      capabilities: [
        "Managed and recorded employee time logs, including clock-in/out times and assignments for each client",
        "Monitored and tracked truck usage for operational efficiency",
        "Updated client profiles through CRM and maintained accurate data records",
        "Managed product inventory using Excel/Google Sheets and input related information into systems",
        "Maintained high attention to detail to ensure data accuracy and timely reporting",
        "Supported workflow organization by keeping detailed and structured records"
      ],
      buttonText: "VIEW EXPERIENCE"
    },
    {
      id: "02",
      title: "YOUTUBE & SOCIAL MEDIA SCHEDULING",
      tagline: "Timely video uploads, editorial calendars, and release date tracking",
      description: "Hands-on experience managing and scheduling YouTube video uploads to ensure consistent, timely content delivery aligned with channel strategy.",
      capabilities: [
        "Managed and scheduled YouTube video uploads, ensuring consistent and timely content delivery",
        "Managed an Excel spreadsheet to track the posting schedule",
        "Responsible for scheduling and publishing YouTube videos, ensuring alignment with overall content strategy and marketing goals",
        "Developed and maintained a detailed Excel spreadsheet to track video release dates"
      ],
      buttonText: "VIEW EXPERIENCE"
    },
    {
      id: "03",
      title: "CANVA VIDEO EDITING & MULTIMEDIA",
      tagline: "Video content polishing, audio synchronization, and animated graphics",
      description: "Edited and enhanced dynamic video content using Canva's video editing suite for online platforms, ensuring balanced audio and engaging visuals.",
      capabilities: [
        "Edited and enhanced video content using Canva's video editing tools, ensuring high-quality output for social media platforms",
        "Integrated music, sound effects, and transitions to create polished and professional-looking videos for online platforms",
        "Synchronizing translated text with corresponding visuals, graphics, and animations",
        "Created dynamic videos by utilizing Canva's animation features for text, graphics, and transitions",
        "Aligned on-screen text and visuals with scripted content to maintain a cohesive and engaging storyline",
        "Edited and synchronized audio elements in Canva, ensuring clear and balanced sound"
      ],
      buttonText: "VIEW EXPERIENCE"
    },
    {
      id: "04",
      title: "RETAIL SALES & E-COMMERCE",
      tagline: "Inventory procurement, multi-channel reselling, and customer care",
      description: "Retail sales and online marketplace operations with By The Hype PH across major secondary market platforms.",
      capabilities: [
        "Managed buying sneakers for retail via online and in-store",
        "Online reselling through Facebook groups, Instagram, ALIAS, GOAT, Flight Club and Stock X",
        "Organized and photographed inventory for sale",
        "Addressed customer inquiries and handled requests in a timely manner",
        "Developed positive customer relationships through friendly interactions and excellent service",
        "Keeping track of inventory through Excel/Sheets",
        "Prepared outgoing shipments and processed returns"
      ],
      buttonText: "VIEW EXPERIENCE"
    },
    {
      id: "05",
      title: "AVIATION RIGOR & PROCEDURAL DISCIPLINE",
      tagline: "Standard operating procedures, checklists, and situational awareness",
      description: "Bachelor of Science in Aviation Major in Flying from Airlink International Aviation College. Pilot-level procedural adherence applied to administrative tasks.",
      capabilities: [
        "Checklist and Standard Operating Procedure (SOP) discipline",
        "High attention to detail and accuracy under deadlines",
        "Formal aviation training across flight safety, adverse weather, and jet systems",
        "Structured organization and calm problem-solving",
        "Good written and verbal communication in Filipino and English"
      ],
      buttonText: "VIEW CREDENTIALS"
    }
  ] as ServiceItem[],

  // Exact 4 Work Experiences from CV (NO fake metrics, NO sample projects, NO fabricated companies)
  workExperience: [
    {
      id: "exp-1",
      role: "Virtual Assistant – Data Entry Specialist",
      company: "Virtual Assistant Client Operations",
      period: "April 2024 – May 2026",
      category: "Data Entry & Administration",
      bulletPoints: [
        "Managed and recorded employee time logs, including clock-in/out times and assignments for each client.",
        "Monitored and tracked truck usage for operational efficiency.",
        "Updated client profiles through CRM and maintained accurate data records.",
        "Managed product inventory using Excel/Google Sheets and input related information into systems.",
        "Maintained high attention to detail to ensure data accuracy and timely reporting.",
        "Supported workflow organization by keeping detailed and structured records."
      ],
      tools: ["CRM Systems", "Excel / Google Sheets", "Time Logs", "Fleet Tracking", "Inventory Records"]
    },
    {
      id: "exp-2",
      role: "Sales Associates",
      company: "By The Hype PH",
      period: "February 2021 – January 2026",
      category: "Retail Sales & E-Commerce",
      bulletPoints: [
        "Managed buying sneakers for retail via online and in-store.",
        "Online reselling through Facebook groups, Instagram, ALIAS, GOAT, Flight Club and Stock X.",
        "Organized and photographed inventory for sale.",
        "Addressed customer inquiries and handled requests in a timely manner.",
        "Developed positive customer relationships through friendly interactions and excellent service.",
        "Keeping track of inventory through Excel/Sheets.",
        "Prepared outgoing shipments.",
        "Accepted and processed returns."
      ],
      tools: ["StockX", "GOAT", "ALIAS", "Flight Club", "Excel / Sheets", "Facebook Groups", "Instagram"]
    },
    {
      id: "exp-3",
      role: "Virtual Assistant – Social Media Scheduler",
      company: "Virtual Assistant YouTube Operations",
      period: "November 2023",
      category: "Digital Content Scheduling",
      bulletPoints: [
        "Managed and scheduled YouTube video uploads, ensuring consistent and timely content delivery.",
        "Managed an Excel spreadsheet to track the posting schedule.",
        "Responsible for scheduling and publishing YouTube videos, ensuring alignment with overall content strategy and marketing goals.",
        "Developed and maintained a detailed Excel spreadsheet to track video release dates."
      ],
      tools: ["YouTube Creator Studio", "Excel Schedule Tracker", "Content Calendar", "Release Planning"]
    },
    {
      id: "exp-4",
      role: "Freelancer – Canva Editor",
      company: "Freelance Multimedia Production",
      period: "October 2023",
      category: "Video & Graphic Editing",
      bulletPoints: [
        "Edited and enhanced video content using Canva's video editing tools, ensuring high-quality output for social media platforms.",
        "Integrated music, sound effects, and transitions to create polished and professional-looking videos for online platforms.",
        "Synchronizing translated text with corresponding visuals, graphics, and animations.",
        "Created dynamic videos by utilizing Canva's animation features for text, graphics, and transitions.",
        "Aligned on-screen text and visuals with scripted content to maintain a cohesive and engaging storyline.",
        "Edited and synchronized audio elements in Canva, ensuring clear and balanced sound."
      ],
      tools: ["Canva Video Tools", "Audio Synchronization", "Text Animations", "Transition Effects", "Storyline Alignment"]
    }
  ] as WorkExperienceItem[],

  // Exact Education from CV
  education: [
    {
      degree: "Bachelor of Science in Aviation Major in Flying",
      institution: "Airlink International Aviation College",
      location: "Domestic Road, Pasay City 1301",
      year: "Graduated January 2025",
      category: "Tertiary",
      details: "Comprehensive flight education encompassing aerodynamics, flight navigation, meteorology, aircraft systems, and strict standard operating procedures."
    },
    {
      degree: "Senior High School — Science, Technology, Engineering and Mathematics (STEM)",
      institution: "University of Perpetual Help System DALTA",
      location: "Las Piñas / Cavite",
      year: "Completed April 2018",
      category: "Secondary",
      details: "Rigorous analytical academic track covering advanced mathematics, physical sciences, and technical problem solving."
    },
    {
      degree: "Junior High School",
      institution: "Cavite School of Life – Bacoor",
      location: "Bacoor, Cavite",
      year: "Completed March 2016",
      category: "Secondary",
      details: "Secondary foundational education fostering discipline, teamwork, and academic achievement."
    },
    {
      degree: "Primary Education",
      institution: "Waynesville Learning Center",
      location: "Philippines",
      year: "Completed March 2012",
      category: "Primary",
      details: "Foundational primary school studies."
    }
  ] as EducationItem[],

  // Exact 4 Seminars from Air Link International Aviation College on CV
  seminars: [
    {
      title: "THE FUTURE OF THE AVIATION",
      theme: "“Embracing The Future of the Aviation Industry”",
      institution: "Air Link International Aviation College",
      location: "Domestic Road, Pasay City 1301",
      date: "April 8, 2022",
      description: "Explored automated flight operations, technological transformation, and evolving international aviation protocols."
    },
    {
      title: "WET WEATHER FLYING WELLNESS WEBINAR",
      theme: "“More Than The Basics”",
      institution: "Air Link International Aviation College",
      location: "Domestic Road, Pasay City 1301",
      date: "August 20, 2021",
      description: "Focused on adverse meteorological navigation, reduced visibility flying, hydroplaning risk mitigation, and situational composure."
    },
    {
      title: "JET FAMILIARIZATION",
      theme: "“Preparation to the Pipeline”",
      institution: "Air Link International Aviation College",
      location: "Domestic Road, Pasay City 1301",
      date: "May 28, 2021",
      description: "Covered turbine propulsion systems, high-altitude aerodynamics, cockpit automation, and procedural transitions to turbine aircraft."
    },
    {
      title: "AVIATION INDUSTRY INNOVATION",
      theme: "“Propelling Aviation Amidst The Pandemic Through Innovation”",
      institution: "Air Link International Aviation College",
      location: "Domestic Road, Pasay City 1301",
      date: "January 28, 2021",
      description: "Studied aviation resilience, health compliance frameworks, and logistics adaptations during global transport shifts."
    }
  ] as SeminarItem[],

  // Exact Special Skills from CV Image
  specialSkills: [
    "Proficient in both written and verbal communication",
    "Time Management",
    "CRM Management",
    "Attention to detail",
    "Fast learner",
    "Administrative support",
    "Data Entry",
    "Excel Spreadsheets",
    "Problem-solving",
    "Data confidentiality",
    "Customer and client relations",
    "Inventory systems"
  ],

  // Exact Character References from CV
  characterReferences: [
    {
      name: "Anthony DeBiasse",
      title: "CEO",
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

// Backwards-compatible alias for any remaining references
export type ProjectItem = WorkExperienceItem;
