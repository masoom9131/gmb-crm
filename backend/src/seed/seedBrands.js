import mongoose from "mongoose";
import Brand from "../models/Brand.js";
import Outlet from "../models/Outlet.js";

// Baskin Robbins 75 Outlets exact data from user's report PDF
const baskinRobbinsOutlets = [
  // Kolkata (WB) - 2
  { city: "Kolkata", state: "WB", area: "Shakespeare Sarani", rating: 4.2, reviews: 452, gaps: ["No gaps in file fields"] },
  { city: "Kolkata", state: "WB", area: "Prince Anwar Shah Rd Lake Gardens", rating: 4.4, reviews: 856, gaps: ["No gaps in file fields"] },

  // Siliguri (WB) - 4
  { city: "Siliguri", state: "WB", area: "Sevoke Rd Jyoti Nagar", rating: 3.9, reviews: 218, gaps: ["Below 4.0 stars"] },
  { city: "Siliguri", state: "WB", area: "City Centre Mall Matigara", rating: 4.1, reviews: 112, gaps: ["No gaps in file fields"] },
  { city: "Siliguri", state: "WB", area: "Station Feeder Rd Saktigarh", rating: 4.1, reviews: 17, gaps: ["Under 50 reviews"] },
  { city: "Siliguri", state: "WB", area: "Cosmos Mall Sevoke Rd", rating: 3.5, reviews: 19, gaps: ["Below 4.0 stars", "Under 50 reviews"] },

  // Lucknow (UP) - 3
  { city: "Lucknow", state: "UP", area: "Hazratganj Park Rd", rating: 4.3, reviews: 39, gaps: ["Under 50 reviews"] },
  { city: "Lucknow", state: "UP", area: "Mahanagar", rating: 4.3, reviews: 126, gaps: ["No gaps in file fields"] },
  { city: "Lucknow", state: "UP", area: "Parivartan Chowk", rating: 4.0, reviews: 81, gaps: ["No gaps in file fields"] },

  // Noida (UP) - 5
  { city: "Noida", state: "UP", area: "Sector 142 Tower-E", rating: 4.5, reviews: 88, gaps: ["No gaps in file fields"] },
  { city: "Noida", state: "UP", area: "Sector 104 Hazipur", rating: 4.3, reviews: 103, gaps: ["No gaps in file fields"] },
  { city: "Noida", state: "UP", area: "Sector 133 Paras One33", rating: 4.9, reviews: 327, gaps: ["No gaps in file fields"] },
  { city: "Noida", state: "UP", area: "Sector 75 Spectrum Metro", rating: 4.6, reviews: 21, gaps: ["Under 50 reviews"] },
  { city: "Noida", state: "UP", area: "Sector 128 Jaypee Wish Town", rating: 4.6, reviews: 21, gaps: ["Under 50 reviews"] },

  // Kanpur (UP) - 5
  { city: "Kanpur", state: "UP", area: "Swaroop Nagar", rating: 4.1, reviews: 171, gaps: ["Phone shared by 3 outlets"] },
  { city: "Kanpur", state: "UP", area: "Z Square Mall", rating: 4.0, reviews: 98, gaps: ["No gaps in file fields"] },
  { city: "Kanpur", state: "UP", area: "Saket Nagar Barra", rating: 3.8, reviews: 26, gaps: ["Below 4.0 stars", "Phone shared by 3 outlets", "Under 50 reviews"] },
  { city: "Kanpur", state: "UP", area: "Defence Colony Jajmau", rating: 4.3, reviews: 173, gaps: ["No gaps in file fields"] },
  { city: "Kanpur", state: "UP", area: "Lajpat Nagar", rating: 4.3, reviews: 23, gaps: ["Phone shared by 3 outlets", "Under 50 reviews"] },

  // Agra (UP) - 4
  { city: "Agra", state: "UP", area: "Khandari Ram Raghu Plaza", rating: 4.0, reviews: 57, gaps: ["No gaps in file fields"] },
  { city: "Agra", state: "UP", area: "Sikandra", rating: 4.8, reviews: 59, gaps: ["No gaps in file fields"] },
  { city: "Agra", state: "UP", area: "Kamla Nagar Rd", rating: 3.8, reviews: 15, gaps: ["Below 4.0 stars", "Under 50 reviews"] },
  { city: "Agra", state: "UP", area: "Fatehabad Rd Tajganj", rating: 4.9, reviews: 29, gaps: ["Phone shared by 2 outlets", "Under 50 reviews"] },

  // Indore (MP) - 5
  { city: "Indore", state: "MP", area: "The ONE RNT Marg", rating: 4.1, reviews: 120, gaps: ["Phone shared by 3 outlets"] },
  { city: "Indore", state: "MP", area: "Old Palasia", rating: 4.2, reviews: 329, gaps: ["No gaps in file fields"] },
  { city: "Indore", state: "MP", area: "Khatiwala Tank", rating: 4.1, reviews: 137, gaps: ["Phone shared by 3 outlets"] },
  { city: "Indore", state: "MP", area: "TI Mall", rating: 3.5, reviews: 8, gaps: ["Below 4.0 stars", "Phone shared by 3 outlets", "Under 50 reviews"] },
  { city: "Indore", state: "MP", area: "Usha Nagar", rating: 4.0, reviews: 38, gaps: ["Under 50 reviews"] },

  // Bhopal (MP) - 1
  { city: "Bhopal", state: "MP", area: "VIP Road Lalghati", rating: 4.6, reviews: 39, gaps: ["Under 50 reviews"] },

  // Gwalior (MP) - 2
  { city: "Gwalior", state: "MP", area: "Jhansi Rd Chetarkpuri", rating: 4.0, reviews: 60, gaps: ["No gaps in file fields"] },
  { city: "Gwalior", state: "MP", area: "DB Mall", rating: 4.8, reviews: 9, gaps: ["Phone shared by 2 outlets", "Under 50 reviews"] },

  // Jabalpur (MP) - 3
  { city: "Jabalpur", state: "MP", area: "Katanga Crossing", rating: 4.2, reviews: 563, gaps: ["No gaps in file fields"] },
  { city: "Jabalpur", state: "MP", area: "South Civil Lines", rating: 4.0, reviews: 43, gaps: ["Under 50 reviews"] },
  { city: "Jabalpur", state: "MP", area: "Vijay Nagar", rating: 4.1, reviews: 40, gaps: ["Under 50 reviews"] },

  // Ujjain (MP) - 1
  { city: "Ujjain", state: "MP", area: "Dipti Parisar Near C-21 Mall", rating: 3.9, reviews: 84, gaps: ["Below 4.0 stars"] },

  // Mumbai (MH) - 4
  { city: "Mumbai", state: "MH", area: "Chembur Diamond Garden", rating: 4.3, reviews: 283, gaps: ["No gaps in file fields"] },
  { city: "Mumbai", state: "MH", area: "Chembur Central Ave Rd", rating: 3.6, reviews: 7, gaps: ["Below 4.0 stars", "Under 50 reviews"] },
  { city: "Mumbai", state: "MH", area: "Bandra West Linking Rd", rating: 4.0, reviews: 142, gaps: ["No gaps in file fields"] },
  { city: "Mumbai", state: "MH", area: "Bandra West Carter Rd", rating: 4.2, reviews: 503, gaps: ["No gaps in file fields"] },

  // Pune (MH) - 3
  { city: "Pune", state: "MH", area: "Koregaon Park", rating: 4.3, reviews: 48, gaps: ["Under 50 reviews"] },
  { city: "Pune", state: "MH", area: "Camp East St", rating: 4.2, reviews: 196, gaps: ["No gaps in file fields"] },
  { city: "Pune", state: "MH", area: "Baner", rating: 4.2, reviews: 440, gaps: ["No gaps in file fields"] },

  // Nagpur (MH) - 2
  { city: "Nagpur", state: "MH", area: "Civil Lines VCA Stadium", rating: 4.2, reviews: 548, gaps: ["No gaps in file fields"] },
  { city: "Nagpur", state: "MH", area: "Dharampeth Extension", rating: 4.1, reviews: 247, gaps: ["No gaps in file fields"] },

  // Ranchi (JH) - 4
  { city: "Ranchi", state: "JH", area: "Circular Rd Nagra Toli", rating: 3.9, reviews: 76, gaps: ["Below 4.0 stars"] },
  { city: "Ranchi", state: "JH", area: "Mall of Ranchi Ratu Rd", rating: 2.9, reviews: 9, gaps: ["CRITICAL: Below 3.0 stars", "Under 50 reviews"] },
  { city: "Ranchi", state: "JH", area: "GEL Church JD High St", rating: 3.8, reviews: 13, gaps: ["Below 4.0 stars", "Under 50 reviews"] },
  { city: "Ranchi", state: "JH", area: "Kanke Rd opp Krishi Bhawan", rating: 2.7, reviews: 14, gaps: ["CRITICAL: Below 3.0 stars", "Under 50 reviews"] },

  // Ahmedabad (GJ) - 3
  { city: "Ahmedabad", state: "GJ", area: "Judges Bunglow Road", rating: 4.2, reviews: 258, gaps: ["No gaps in file fields"] },
  { city: "Ahmedabad", state: "GJ", area: "Nikol Gangotri Circle", rating: 4.8, reviews: 125, gaps: ["No gaps in file fields"] },
  { city: "Ahmedabad", state: "GJ", area: "Science City Rd Sola", rating: 4.9, reviews: 28, gaps: ["Under 50 reviews"] },

  // Surat (GJ) - 4
  { city: "Surat", state: "GJ", area: "Vesu Canal Rd", rating: 4.3, reviews: 43, gaps: ["Under 50 reviews"] },
  { city: "Surat", state: "GJ", area: "Ghod Dod Rd Tribhuvan Complex", rating: 4.2, reviews: 477, gaps: ["No gaps in file fields"] },
  { city: "Surat", state: "GJ", area: "Surat Dumas Rd Treat Food Mall", rating: 4.7, reviews: 21, gaps: ["Under 50 reviews"] },
  { city: "Surat", state: "GJ", area: "Pal Gam Hazira Rd", rating: 3.9, reviews: 42, gaps: ["Below 4.0 stars", "Under 50 reviews"] },

  // Vadodara (GJ) - 4
  { city: "Vadodara", state: "GJ", area: "Jetalpur Rd Tilak Complex", rating: 4.3, reviews: 430, gaps: ["Phone shared by 3 outlets"] },
  { city: "Vadodara", state: "GJ", area: "VIP Rd Karelibagh", rating: 4.2, reviews: 64, gaps: ["Phone shared by 3 outlets"] },
  { city: "Vadodara", state: "GJ", area: "Vasna Bhayli Link Rd", rating: 4.2, reviews: 227, gaps: ["No gaps in file fields"] },
  { city: "Vadodara", state: "GJ", area: "Gotri Sevasi Rd", rating: 4.1, reviews: 121, gaps: ["Phone shared by 3 outlets"] },

  // Panaji (GA) - 2
  { city: "Panaji", state: "GA", area: "MG Road", rating: 4.2, reviews: 600, gaps: ["No gaps in file fields"] },
  { city: "Panaji", state: "GA", area: "Caranzalem", rating: 4.2, reviews: 670, gaps: ["No gaps in file fields"] },

  // Calangute (GA) - 1
  { city: "Calangute", state: "GA", area: "Candolim Calangute Road", rating: 4.2, reviews: 2600, gaps: ["No gaps in file fields"] },

  // Margao (GA) - 1
  { city: "Margao", state: "GA", area: "Pajifond", rating: 4.1, reviews: 489, gaps: ["No gaps in file fields"] },

  // Ponda (GA) - 1
  { city: "Ponda", state: "GA", area: "Ponda Center", rating: 4.1, reviews: 320, gaps: ["No gaps in file fields"] },

  // Vasco da Gama (GA) - 1
  { city: "Vasco da Gama", state: "GA", area: "Vaddem", rating: 4.2, reviews: 268, gaps: ["No gaps in file fields"] },

  // Raipur (CG) - 2
  { city: "Raipur", state: "CG", area: "Ambuja City Centre Mall", rating: 4.1, reviews: 54, gaps: ["No gaps in file fields"] },
  { city: "Raipur", state: "CG", area: "Telibandha Gaurav Path", rating: 4.0, reviews: 121, gaps: ["No gaps in file fields"] },

  // Bilaspur (CG) - 4
  { city: "Bilaspur", state: "CG", area: "Nehru Nagar Rd", rating: 4.1, reviews: 59, gaps: ["No gaps in file fields"] },
  { city: "Bilaspur", state: "CG", area: "Rajendra Nagar", rating: 4.1, reviews: 148, gaps: ["No gaps in file fields"] },
  { city: "Bilaspur", state: "CG", area: "Link Rd Topaz Hotel", rating: 3.7, reviews: 38, gaps: ["Below 4.0 stars", "Under 50 reviews"] },
  { city: "Bilaspur", state: "CG", area: "Seepat Rd Sarkanda", rating: 3.3, reviews: 3, gaps: ["Below 4.0 stars", "Under 50 reviews"] },

  // Patna (BR) - 4
  { city: "Patna", state: "BR", area: "Kidwaipuri E Boring Canal Rd", rating: 4.3, reviews: 306, gaps: ["No gaps in file fields"] },
  { city: "Patna", state: "BR", area: "Kurji Patliputra Colony", rating: 4.3, reviews: 188, gaps: ["No gaps in file fields"] },
  { city: "Patna", state: "BR", area: "South Gandhi Maidan", rating: 4.0, reviews: 97, gaps: ["No gaps in file fields"] },
  { city: "Patna", state: "BR", area: "Kankarbagh People Coop Colony", rating: 3.9, reviews: 84, gaps: ["Below 4.0 stars"] }
];

// 20+ other popular Indian brands
const otherBrands = [
  {
    name: "Domino's Pizza",
    slug: "dominos-pizza",
    category: "Fast Food / Pizza",
    logo: "🍕",
    website: "https://dominos.co.in",
    corporateEmail: "guestcaredominos@jublfood.com",
    phone: "1800-208-1234",
    totalOutlets: 1850,
    avgRating: 4.3,
    totalReviews: 245000,
    lowRatingOutletsCount: 142,
    under50ReviewsCount: 89,
    statesCovered: ["Delhi", "Maharashtra", "Karnataka", "UP", "MP", "Gujarat"],
    citiesCount: 380,
    status: "Active",
    pipelineStage: "CONTACTED",
    recommendedActions: ["Automate review reply to 1-star reviews", "Optimize local GMB keywords for fast delivery"]
  },
  {
    name: "Chai Sutta Bar",
    slug: "chai-sutta-bar",
    category: "Café & Tea Bar",
    logo: "☕",
    website: "https://chaisuttabarindia.com",
    corporateEmail: "info@chaisuttabarindia.com",
    phone: "0731-4999999",
    totalOutlets: 450,
    avgRating: 4.15,
    totalReviews: 68400,
    lowRatingOutletsCount: 48,
    under50ReviewsCount: 95,
    statesCovered: ["MP", "UP", "Maharashtra", "Gujarat", "Rajasthan"],
    citiesCount: 195,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Fix shared telephone line in Tier-2 city outlets", "Universal GMB post for Kulhad Chai festival"]
  },
  {
    name: "Haldiram's",
    slug: "haldirams",
    category: "Sweets & Quick Casual",
    logo: "🍬",
    website: "https://haldirams.com",
    corporateEmail: "support@haldirams.com",
    phone: "0120-2444444",
    totalOutlets: 210,
    avgRating: 4.25,
    totalReviews: 120500,
    lowRatingOutletsCount: 12,
    under50ReviewsCount: 15,
    statesCovered: ["Delhi", "Maharashtra", "UP", "West Bengal"],
    citiesCount: 45,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Update festive sweet box menus in Google Business Posts"]
  },
  {
    name: "KFC India",
    slug: "kfc-india",
    category: "Fast Food / Chicken",
    logo: "🍗",
    website: "https://kfc.co.in",
    corporateEmail: "feedback@kfc.co.in",
    phone: "080-42754444",
    totalOutlets: 900,
    avgRating: 4.2,
    totalReviews: 185000,
    lowRatingOutletsCount: 78,
    under50ReviewsCount: 30,
    statesCovered: ["Pan India"],
    citiesCount: 220,
    status: "Active",
    pipelineStage: "CONTACTED",
    recommendedActions: ["Improve response time for delivery complaints"]
  },
  {
    name: "Burger King India",
    slug: "burger-king-india",
    category: "Fast Food / Burgers",
    logo: "🍔",
    website: "https://burgerking.in",
    corporateEmail: "customercare@burgerking.in",
    phone: "022-68789000",
    totalOutlets: 420,
    avgRating: 4.18,
    totalReviews: 92000,
    lowRatingOutletsCount: 36,
    under50ReviewsCount: 22,
    statesCovered: ["Pan India"],
    citiesCount: 110,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Upload weekly high-res photo updates on GMB"]
  },
  {
    name: "Starbucks India",
    slug: "starbucks-india",
    category: "Coffeehouse",
    logo: "☕",
    website: "https://starbucks.in",
    corporateEmail: "customercare@tatastarbucks.com",
    phone: "1860-266-0010",
    totalOutlets: 390,
    avgRating: 4.45,
    totalReviews: 145000,
    lowRatingOutletsCount: 8,
    under50ReviewsCount: 12,
    statesCovered: ["Delhi", "Maharashtra", "Karnataka", "Telangana", "Tamil Nadu"],
    citiesCount: 42,
    status: "Active",
    pipelineStage: "ONBOARDING",
    recommendedActions: ["Maintain premium Q&A response benchmarks"]
  },
  {
    name: "Wow! Momo",
    slug: "wow-momo",
    category: "Quick Service Food",
    logo: "🥟",
    website: "https://wowmomo.com",
    corporateEmail: "info@wowmomo.com",
    phone: "033-40071444",
    totalOutlets: 630,
    avgRating: 4.05,
    totalReviews: 76000,
    lowRatingOutletsCount: 71,
    under50ReviewsCount: 110,
    statesCovered: ["West Bengal", "Delhi", "Karnataka", "Maharashtra"],
    citiesCount: 85,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Fix outlet address discrepancies in metro stations"]
  },
  {
    name: "Subway India",
    slug: "subway-india",
    category: "Fast Food / Sandwiches",
    logo: "🥪",
    website: "https://subway.in",
    corporateEmail: "care@subway.com",
    phone: "011-41750000",
    totalOutlets: 600,
    avgRating: 4.1,
    totalReviews: 89000,
    lowRatingOutletsCount: 55,
    under50ReviewsCount: 40,
    statesCovered: ["Pan India"],
    citiesCount: 95,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Add fresh submarine sandwich menu attributes on GBP"]
  },
  {
    name: "Chai Point",
    slug: "chai-point",
    category: "Beverages / Café",
    logo: "🫖",
    website: "https://chaipoint.com",
    corporateEmail: "feedback@chaipoint.com",
    phone: "080-42777000",
    totalOutlets: 180,
    avgRating: 4.12,
    totalReviews: 34000,
    lowRatingOutletsCount: 22,
    under50ReviewsCount: 28,
    statesCovered: ["Karnataka", "Delhi", "Maharashtra", "Telangana"],
    citiesCount: 18,
    status: "Active",
    pipelineStage: "LEAD",
    recommendedActions: ["Promote breakfast delivery on Google Posts"]
  },
  {
    name: "Chaayos",
    slug: "chaayos",
    category: "Café & Snacks",
    logo: "🍵",
    website: "https://chaayos.com",
    corporateEmail: "hi@chaayos.com",
    phone: "1800-120-2424",
    totalOutlets: 230,
    avgRating: 4.22,
    totalReviews: 54000,
    lowRatingOutletsCount: 19,
    under50ReviewsCount: 15,
    statesCovered: ["Delhi NCR", "Mumbai", "Bangalore", "Pune", "Chandigarh"],
    citiesCount: 14,
    status: "Active",
    pipelineStage: "CONTACTED",
    recommendedActions: ["Highlight customised chai feature in GMB Description"]
  },
  {
    name: "Pizza Hut India",
    slug: "pizza-hut-india",
    category: "Fast Food / Pizza",
    logo: "🍕",
    website: "https://pizzahut.co.in",
    corporateEmail: "hutcares@yum.com",
    phone: "1800-202-2022",
    totalOutlets: 840,
    avgRating: 4.08,
    totalReviews: 132000,
    lowRatingOutletsCount: 94,
    under50ReviewsCount: 65,
    statesCovered: ["Pan India"],
    citiesCount: 200,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Improve dining hygiene reviews resolution"]
  },
  {
    name: "Barbeque Nation",
    slug: "barbeque-nation",
    category: "Buffet & Casual Dining",
    logo: "🍢",
    website: "https://barbequenation.com",
    corporateEmail: "feedback@barbequenation.com",
    phone: "080-69028721",
    totalOutlets: 215,
    avgRating: 4.38,
    totalReviews: 210000,
    lowRatingOutletsCount: 14,
    under50ReviewsCount: 4,
    statesCovered: ["Pan India"],
    citiesCount: 88,
    status: "Active",
    pipelineStage: "ONBOARDING",
    recommendedActions: ["Sync reserve-a-table Google button"]
  },
  {
    name: "The Belgian Waffle Co.",
    slug: "the-belgian-waffle-co",
    category: "Desserts & Waffles",
    logo: "🧇",
    website: "https://thebelgianwaffle.co",
    corporateEmail: "care@bloombay.in",
    phone: "022-49718888",
    totalOutlets: 460,
    avgRating: 4.32,
    totalReviews: 87000,
    lowRatingOutletsCount: 28,
    under50ReviewsCount: 42,
    statesCovered: ["Pan India"],
    citiesCount: 120,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Seasonal waffle launch campaign across all outlets"]
  },
  {
    name: "Naturals Ice Cream",
    slug: "naturals-ice-cream",
    category: "Artisanal Ice Cream",
    logo: "🍨",
    website: "https://naturalicecreams.in",
    corporateEmail: "customercare@naturalicecreams.in",
    phone: "022-28695050",
    totalOutlets: 165,
    avgRating: 4.52,
    totalReviews: 95000,
    lowRatingOutletsCount: 3,
    under50ReviewsCount: 6,
    statesCovered: ["Maharashtra", "Delhi", "Karnataka", "Gujarat", "Telangana"],
    citiesCount: 32,
    status: "Active",
    pipelineStage: "CONTACTED",
    recommendedActions: ["Feature seasonal fruit flavors in GMB product catalog"]
  },
  {
    name: "Lenskart",
    slug: "lenskart",
    category: "Eyewear & Optical",
    logo: "👓",
    website: "https://lenskart.com",
    corporateEmail: "support@lenskart.com",
    phone: "1800-111-111",
    totalOutlets: 1500,
    avgRating: 4.41,
    totalReviews: 310000,
    lowRatingOutletsCount: 65,
    under50ReviewsCount: 120,
    statesCovered: ["Pan India"],
    citiesCount: 340,
    status: "Active",
    pipelineStage: "CONTACTED",
    recommendedActions: ["Promote free eye check-up service in GBP call-to-actions"]
  },
  {
    name: "Apollo Pharmacy",
    slug: "apollo-pharmacy",
    category: "Healthcare & Pharmacy",
    logo: "💊",
    website: "https://apollopharmacy.in",
    corporateEmail: "helpdesk@apollopharmacy.org",
    phone: "1860-500-0101",
    totalOutlets: 5200,
    avgRating: 4.14,
    totalReviews: 420000,
    lowRatingOutletsCount: 410,
    under50ReviewsCount: 380,
    statesCovered: ["Pan India"],
    citiesCount: 500,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Add 24/7 emergency medicine store hours on Map listings"]
  },
  {
    name: "Bikanervala",
    slug: "bikanervala",
    category: "Indian Sweets & Snacks",
    logo: "🥘",
    website: "https://bikanervala.com",
    corporateEmail: "customercare@bikanervala.com",
    phone: "011-47000000",
    totalOutlets: 140,
    avgRating: 4.19,
    totalReviews: 88000,
    lowRatingOutletsCount: 18,
    under50ReviewsCount: 8,
    statesCovered: ["Delhi NCR", "UP", "Punjab", "Haryana", "Telangana"],
    citiesCount: 28,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Manage Diwali & Raksha Bandhan gift hamper inquiries"]
  },
  {
    name: "Cafe Coffee Day",
    slug: "cafe-coffee-day",
    category: "Café & Snacks",
    logo: "☕",
    website: "https://cafecoffeeday.com",
    corporateEmail: "customercare@cafecoffeeday.com",
    phone: "1800-102-5093",
    totalOutlets: 480,
    avgRating: 3.98,
    totalReviews: 72000,
    lowRatingOutletsCount: 82,
    under50ReviewsCount: 64,
    statesCovered: ["Pan India"],
    citiesCount: 110,
    status: "Active",
    pipelineStage: "LEAD",
    recommendedActions: ["Urgent reputation audit: 82 outlets under 4.0 stars"]
  },
  {
    name: "Giani's Ice Cream",
    slug: "gianis-ice-cream",
    category: "Ice Cream & Shakes",
    logo: "🍨",
    website: "https://gianisicecream.com",
    corporateEmail: "info@gianisicecream.com",
    phone: "011-43555555",
    totalOutlets: 220,
    avgRating: 4.11,
    totalReviews: 41000,
    lowRatingOutletsCount: 26,
    under50ReviewsCount: 35,
    statesCovered: ["Delhi NCR", "UP", "Punjab", "Haryana", "MP"],
    citiesCount: 35,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Fix Falooda and Kulfi menu attributes in local packs"]
  },
  {
    name: "Mad Over Donuts",
    slug: "mad-over-donuts",
    category: "Bakery & Desserts",
    logo: "🍩",
    website: "https://madoverdonuts.com",
    corporateEmail: "feedback@madoverdonuts.com",
    phone: "022-42171111",
    totalOutlets: 115,
    avgRating: 4.28,
    totalReviews: 32000,
    lowRatingOutletsCount: 9,
    under50ReviewsCount: 14,
    statesCovered: ["Mumbai", "Pune", "Delhi NCR", "Bangalore", "Chennai"],
    citiesCount: 12,
    status: "Active",
    pipelineStage: "RESEARCHED",
    recommendedActions: ["Promote 'Donut Box of 6' promotional posts on Fridays"]
  }
];

export async function seedInitialData() {
  try {
    const existingCount = await Brand.countDocuments();
    if (existingCount > 0) {
      console.log(`[Seed] Database already has ${existingCount} brands. Skipping automatic seed.`);
      return;
    }

    console.log("[Seed] Seeding initial brands and Baskin Robbins report outlets...");

    // 1. Create Baskin Robbins Brand
    const brBrand = await Brand.create({
      name: "Baskin Robbins",
      slug: "baskin-robbins",
      category: "Ice Cream Chain",
      logo: "🍦",
      website: "https://baskinrobbinsindia.com",
      corporateEmail: "careline@gravissgroup.com",
      phone: "022-68789999",
      totalOutlets: 75,
      avgRating: 4.21,
      totalReviews: 15008,
      lowRatingOutletsCount: 15,
      under50ReviewsCount: 26,
      statesCovered: ["West Bengal", "Uttar Pradesh", "Madhya Pradesh", "Maharashtra", "Jharkhand", "Gujarat", "Goa", "Chhattisgarh", "Bihar"],
      citiesCount: 26,
      status: "Active",
      pipelineStage: "RESEARCHED",
      decisionMakers: [
        { name: "Founders / CEO", designation: "Graviss Group Leadership", contact: "careline@gravissgroup.com" },
        { name: "Head of Franchise", designation: "Franchise Operations Head", contact: "Needs LinkedIn Outreach" },
        { name: "Marketing Head", designation: "Brand Marketing Lead", contact: "careline@gravissgroup.com" }
      ],
      recommendedActions: [
        "Open 3-4 Google listings (Noida, Kanpur, Indore) and screenshot as evidence",
        "Verify the 4 shared phone numbers; find each outlet's direct line",
        "Confirm careline@gravissgroup.com is the right contact for all 9 states",
        "Pitch the 2 outlets under 3.0 and 15 under 4.0 as the reputation fix package"
      ]
    });

    // 2. Insert Baskin Robbins 75 Outlets
    const brOutletDocs = baskinRobbinsOutlets.map((o) => {
      let status = "Healthy";
      if (o.rating < 3.0) status = "Critical";
      else if (o.rating < 4.0 || o.reviews < 50) status = "Needs Attention";

      return {
        brand: brBrand._id,
        listingName: `Baskin Robbins - ${o.area}`,
        area: o.area,
        city: o.city,
        state: o.state,
        type: "Official",
        rating: o.rating,
        reviews: o.reviews,
        hasHours: false, // Per report: Hours missing on all 75
        hasPhone: true,
        hasWebsite: true,
        phone: "099874 43095",
        website: "https://baskinrobbinsindia.com/pages/store-locator",
        gaps: o.gaps,
        status,
        unansweredReviews: Math.floor(o.reviews * 0.08),
        qnaCount: Math.floor(Math.random() * 8) + 1,
        postsCount: 2
      };
    });

    await Outlet.insertMany(brOutletDocs);
    console.log(`[Seed] Seeded Baskin Robbins with ${brOutletDocs.length} outlets from report!`);

    // 3. Seed other 20 brands
    for (const b of otherBrands) {
      const createdBrand = await Brand.create(b);

      // Create 5-10 sample city outlets for each other brand so they are clickable
      const sampleCities = [
        { city: "New Delhi", state: "DL", area: "Connaught Place", rating: 4.4, reviews: 1420 },
        { city: "Mumbai", state: "MH", area: "Bandra West", rating: 4.3, reviews: 980 },
        { city: "Bangalore", state: "KA", area: "Indiranagar 100ft Rd", rating: 4.5, reviews: 1120 },
        { city: "Pune", state: "MH", area: "Koregaon Park", rating: 4.2, reviews: 630 },
        { city: "Hyderabad", state: "TS", area: "Banjara Hills Rd 12", rating: 4.3, reviews: 850 },
        { city: "Ahmedabad", state: "GJ", area: "SG Highway", rating: 4.1, reviews: 490 },
        { city: "Jaipur", state: "RJ", area: "MI Road", rating: 4.0, reviews: 380 },
        { city: "Indore", state: "MP", area: "Vijay Nagar", rating: 3.8, reviews: 290 }
      ];

      const outletsToInsert = sampleCities.map((c) => ({
        brand: createdBrand._id,
        listingName: `${b.name} - ${c.area}`,
        area: c.area,
        city: c.city,
        state: c.state,
        type: "Official",
        rating: c.rating,
        reviews: c.reviews,
        hasHours: true,
        hasPhone: true,
        hasWebsite: true,
        phone: "011-45678900",
        website: b.website,
        gaps: c.rating < 4.0 ? ["Rating below 4.0", "Negative sentiment in delivery"] : ["No major gaps"],
        status: c.rating < 4.0 ? "Needs Attention" : "Healthy",
        unansweredReviews: Math.floor(Math.random() * 12),
        qnaCount: Math.floor(Math.random() * 6) + 1,
        postsCount: 4
      }));

      await Outlet.insertMany(outletsToInsert);
    }

    console.log(`[Seed] Seeded ${otherBrands.length} additional brands with franchise outlets!`);
  } catch (error) {
    console.error("[Seed Error]:", error);
  }
}
