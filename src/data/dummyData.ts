export interface RecentListing {
  id: string
  name: string
  category: string
  city: string
  rating: number
  reviews: number
  status: "Verified" | "Pending" | "Under Review" | string
  date: string
}

// Recent Listings Data
export const recentListings: RecentListing[] = [
  {
    id: "LST-1082",
    name: "Taj Mahal Palace Suites",
    category: "Hotels & Stays",
    city: "Mumbai, MH",
    rating: 4.9,
    reviews: 320,
    status: "Verified",
    date: "Today, 10:30 AM",
  },
  {
    id: "LST-1081",
    name: "Apex Healthcare & Diagnostics",
    category: "Health & Medical",
    city: "Bengaluru, KA",
    rating: 4.7,
    reviews: 145,
    status: "Verified",
    date: "Yesterday",
  },
  {
    id: "LST-1080",
    name: "Urban Kicks & Streetwear",
    category: "Shopping & Retail",
    city: "Delhi, NCR",
    rating: 4.5,
    reviews: 88,
    status: "Pending",
    date: "Oct 21, 2026",
  },
  {
    id: "LST-1079",
    name: "Royal Spice Fine Dining",
    category: "Food & Restaurants",
    city: "Ahmedabad, GJ",
    rating: 4.8,
    reviews: 210,
    status: "Verified",
    date: "Oct 20, 2026",
  },
  {
    id: "LST-1078",
    name: "Zenith Digital Solutions",
    category: "IT & Software",
    city: "Pune, MH",
    rating: 4.2,
    reviews: 39,
    status: "Under Review",
    date: "Oct 19, 2026",
  },
]

export interface UserListingRef {
  id: string
  name: string
  category: string
  city: string
  rating: number
  status: string
}

export interface UserItem {
  id: string
  name: string
  email: string
  phone: string
  status: "Active" | "Inactive"
  city: string
  createdAt: string
  totalListings: number
  verified: boolean
  listings: UserListingRef[]
}

// Full Users Directory Data (Registered Business Owners)
export const mockUsers: UserItem[] = [
  {
    id: "USR-101",
    name: "Rajesh Kothari",
    email: "rajesh.k@gmail.com",
    phone: "+91 98251 44320",
    status: "Active",
    city: "Mumbai, MH",
    createdAt: "Oct 12, 2026",
    totalListings: 2,
    verified: true,
    listings: [
      {
        id: "LST-1082",
        name: "Taj Mahal Palace Suites",
        category: "Hotels & Stays",
        city: "Mumbai, MH",
        rating: 4.9,
        status: "Verified",
      },
      {
        id: "LST-1090",
        name: "Marine Drive Coastal Cafe",
        category: "Food & Restaurants",
        city: "Mumbai, MH",
        rating: 4.6,
        status: "Verified",
      },
    ],
  },
  {
    id: "USR-102",
    name: "Pooja Varma",
    email: "pooja.v@outlook.com",
    phone: "+91 97234 88129",
    status: "Active",
    city: "Bengaluru, KA",
    createdAt: "Oct 15, 2026",
    totalListings: 1,
    verified: true,
    listings: [
      {
        id: "LST-1085",
        name: "Greenleaf Organic Bistro",
        category: "Food & Restaurants",
        city: "Bengaluru, KA",
        rating: 4.5,
        status: "Verified",
      },
    ],
  },
  {
    id: "USR-103",
    name: "Amitabh Sen",
    email: "amitabh@biznest.in",
    phone: "+91 98980 12345",
    status: "Active",
    city: "Bengaluru, KA",
    createdAt: "Sep 28, 2026",
    totalListings: 1,
    verified: true,
    listings: [
      {
        id: "LST-1081",
        name: "Apex Healthcare & Diagnostics",
        category: "Health & Medical",
        city: "Bengaluru, KA",
        rating: 4.7,
        status: "Verified",
      },
    ],
  },
  {
    id: "USR-104",
    name: "Kavita Rao",
    email: "kavita.rao@yahoo.com",
    phone: "+91 94260 77651",
    status: "Inactive",
    city: "Ahmedabad, GJ",
    createdAt: "Oct 18, 2026",
    totalListings: 1,
    verified: false,
    listings: [
      {
        id: "LST-1088",
        name: "Aura Unisex Salon & Spa",
        category: "Beauty & Spa",
        city: "Ahmedabad, GJ",
        rating: 4.1,
        status: "Pending",
      },
    ],
  },
  {
    id: "USR-105",
    name: "Sameer Malhotra",
    email: "sameer.m@urbankicks.in",
    phone: "+91 99100 55412",
    status: "Active",
    city: "Delhi, NCR",
    createdAt: "Oct 21, 2026",
    totalListings: 1,
    verified: false,
    listings: [
      {
        id: "LST-1080",
        name: "Urban Kicks & Streetwear",
        category: "Shopping & Retail",
        city: "Delhi, NCR",
        rating: 4.5,
        status: "Pending",
      },
    ],
  },
  {
    id: "USR-106",
    name: "Neha Singhania",
    email: "neha.s@zenithsol.com",
    phone: "+91 98200 99881",
    status: "Active",
    city: "Pune, MH",
    createdAt: "Aug 10, 2026",
    totalListings: 2,
    verified: true,
    listings: [
      {
        id: "LST-1078",
        name: "Zenith Digital Solutions",
        category: "IT & Software",
        city: "Pune, MH",
        rating: 4.2,
        status: "Verified",
      },
      {
        id: "LST-1079",
        name: "CloudBridge Hosting Lab",
        category: "IT & Software",
        city: "Pune, MH",
        rating: 4.4,
        status: "Verified",
      },
    ],
  },
  {
    id: "USR-107",
    name: "Vikramaditya Roy",
    email: "vikram.roy@spicedine.com",
    phone: "+91 98790 33219",
    status: "Active",
    city: "Ahmedabad, GJ",
    createdAt: "Sep 15, 2026",
    totalListings: 1,
    verified: true,
    listings: [
      {
        id: "LST-1089",
        name: "Royal Spice Fine Dining",
        category: "Food & Restaurants",
        city: "Ahmedabad, GJ",
        rating: 4.8,
        status: "Verified",
      },
    ],
  },
  {
    id: "USR-108",
    name: "Deepak Chawla",
    email: "deepak.c@spammer.org",
    phone: "+91 91234 00099",
    status: "Inactive",
    city: "Jaipur, RJ",
    createdAt: "Oct 01, 2026",
    totalListings: 0,
    verified: false,
    listings: [],
  },
  {
    id: "USR-109",
    name: "Ananya Deshmukh",
    email: "ananya.d@lotuswellness.in",
    phone: "+91 98220 54321",
    status: "Active",
    city: "Mumbai, MH",
    createdAt: "Oct 22, 2026",
    totalListings: 1,
    verified: true,
    listings: [
      {
        id: "LST-1091",
        name: "Lotus Holistic Ayurveda Spa",
        category: "Beauty & Spa",
        city: "Mumbai, MH",
        rating: 4.8,
        status: "Verified",
      },
    ],
  },
  {
    id: "USR-110",
    name: "Gaurav Mehta",
    email: "gaurav.m@mehtaautos.com",
    phone: "+91 97250 88765",
    status: "Active",
    city: "Surat, GJ",
    createdAt: "Oct 24, 2026",
    totalListings: 1,
    verified: true,
    listings: [
      {
        id: "LST-1092",
        name: "Mehta Auto Spares & Service",
        category: "Automotive",
        city: "Surat, GJ",
        rating: 4.3,
        status: "Verified",
      },
    ],
  },
  {
    id: "USR-111",
    name: "Shalini Iyer",
    email: "shalini.iyer@chennaibakes.com",
    phone: "+91 98401 22334",
    status: "Inactive",
    city: "Chennai, TN",
    createdAt: "Oct 25, 2026",
    totalListings: 1,
    verified: false,
    listings: [
      {
        id: "LST-1093",
        name: "Madras Artisan Bakery",
        category: "Food & Restaurants",
        city: "Chennai, TN",
        rating: 4.0,
        status: "Pending",
      },
    ],
  },
]

export interface CategoryItem {
  id: string
  name: string
  slug: string
  image: string
  listingCount: number
  status: "Active" | "Inactive"
  createdAt: string
}

export const mockCategories: CategoryItem[] = [
  {
    id: "CAT-101",
    name: "Food & Restaurants",
    slug: "food-restaurants",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&auto=format&fit=crop&q=80",
    listingCount: 3420,
    status: "Active",
    createdAt: "Oct 10, 2026",
  },
  {
    id: "CAT-102",
    name: "Hotels & Stays",
    slug: "hotels-stays",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&auto=format&fit=crop&q=80",
    listingCount: 2890,
    status: "Active",
    createdAt: "Oct 11, 2026",
  },
  {
    id: "CAT-103",
    name: "Health & Medical",
    slug: "health-medical",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=150&auto=format&fit=crop&q=80",
    listingCount: 1940,
    status: "Active",
    createdAt: "Oct 12, 2026",
  },
  {
    id: "CAT-104",
    name: "Real Estate",
    slug: "real-estate",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=150&auto=format&fit=crop&q=80",
    listingCount: 1580,
    status: "Active",
    createdAt: "Oct 14, 2026",
  },
  {
    id: "CAT-105",
    name: "Automotive & Vehicles",
    slug: "automotive-vehicles",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=150&auto=format&fit=crop&q=80",
    listingCount: 920,
    status: "Active",
    createdAt: "Oct 15, 2026",
  },
  {
    id: "CAT-106",
    name: "Beauty & Spa",
    slug: "beauty-spa",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=150&auto=format&fit=crop&q=80",
    listingCount: 840,
    status: "Active",
    createdAt: "Oct 16, 2026",
  },
  {
    id: "CAT-107",
    name: "Shopping & Retail",
    slug: "shopping-retail",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&auto=format&fit=crop&q=80",
    listingCount: 760,
    status: "Active",
    createdAt: "Oct 18, 2026",
  },
  {
    id: "CAT-108",
    name: "Fitness & Gyms",
    slug: "fitness-gyms",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=80",
    listingCount: 510,
    status: "Active",
    createdAt: "Oct 19, 2026",
  },
  {
    id: "CAT-109",
    name: "Education & Coaching",
    slug: "education-coaching",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&auto=format&fit=crop&q=80",
    listingCount: 430,
    status: "Inactive",
    createdAt: "Oct 20, 2026",
  },
  {
    id: "CAT-110",
    name: "Event & Wedding",
    slug: "event-wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=150&auto=format&fit=crop&q=80",
    listingCount: 310,
    status: "Active",
    createdAt: "Oct 22, 2026",
  },
  {
    id: "CAT-111",
    name: "IT & Freelance Services",
    slug: "it-freelance-services",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=150&auto=format&fit=crop&q=80",
    listingCount: 280,
    status: "Inactive",
    createdAt: "Oct 24, 2026",
  },
]

// ==========================================
// Notifications Data
// ==========================================

export type NotificationType = "listing" | "inquiry" | "payment" | "user" | "broadcast"

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  createdAt: string
  target?: "admin" | "business" | "all"
  recipientName?: string
}

export const mockNotifications: NotificationItem[] = [
  {
    id: "NOTIF-101",
    title: "New Listing Pending Verification",
    message: "Taj Palace Suites has been submitted by Rajesh Sharma for approval.",
    type: "listing",
    read: false,
    createdAt: "10 mins ago",
  },
  {
    id: "NOTIF-102",
    title: "New Contact Inquiry Received",
    message: "Priya Sengupta submitted an inquiry regarding portal partnership.",
    type: "inquiry",
    read: false,
    createdAt: "25 mins ago",
  },
  {
    id: "NOTIF-103",
    title: "Banner Ad Campaign Request",
    message: "Apex Healthcare requested a 'Header Banner' ad placement for 30 days.",
    type: "inquiry",
    read: false,
    createdAt: "1 hour ago",
  },
  {
    id: "NOTIF-104",
    title: "Payment Received (Growth Plan)",
    message: "₹2,499 received from Royal Spice Restaurant via Razorpay.",
    type: "payment",
    read: true,
    createdAt: "2 hours ago",
  },
  {
    id: "NOTIF-105",
    title: "New User Registered",
    message: "Dr. Ananya Roy registered as a verified medical professional.",
    type: "user",
    read: true,
    createdAt: "Yesterday",
  },
  {
    id: "NOTIF-106",
    title: "Festive Season Announcement",
    message: "Broadcast sent to all business owners: '50% Discount on Featured Listing upgrades for Diwali week'.",
    type: "broadcast",
    recipientName: "All Businesses",
    read: true,
    createdAt: "2 days ago",
  },
  {
    id: "NOTIF-107",
    title: "Listing Verification Approved",
    message: "Urban Kicks & Streetwear listing status changed to Verified by Admin.",
    type: "listing",
    read: true,
    createdAt: "3 days ago",
  },
  {
    id: "NOTIF-108",
    title: "System Maintenance Notice",
    message: "Scheduled cloud database upgrade announcement sent to platform vendors.",
    type: "broadcast",
    recipientName: "Verified Only",
    read: true,
    createdAt: "4 days ago",
  },
  {
    id: "NOTIF-109",
    title: "Premium Subscription Renewed",
    message: "Elite Dental Clinic successfully renewed their Annual Business plan for ₹9,999.",
    type: "payment",
    read: false,
    createdAt: "5 hours ago",
  },
  {
    id: "NOTIF-110",
    title: "Services & Products Inquiry",
    message: "Customer Rahul Mehta sent an inquiry for 'Luxury Bridal Makeup Package' on Glamour Salon.",
    type: "inquiry",
    read: false,
    createdAt: "1 day ago",
  },
  {
    id: "NOTIF-111",
    title: "Special Policy Update Notice",
    message: "Important guideline regarding verified badge renewal dispatched to business profiles.",
    type: "broadcast",
    recipientName: "All Businesses",
    read: true,
    createdAt: "5 days ago",
  },
]

// ----------------------------------------------------
// Contact Inquiries Data
// ----------------------------------------------------
export interface ContactInquiryItem {
  id: string
  name: string
  email: string
  subject:
    | "General Inquiry"
    | "Listing Support"
    | "Technical Issue"
    | "Business Partnership"
    | "Advertising & Sponsorship"
    | "Other"
  message: string
  status: "New" | "Replied" | "Archived"
  createdAt: string
  replyText?: string
  repliedAt?: string
}

export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Listing Support",
  "Technical Issue",
  "Business Partnership",
  "Advertising & Sponsorship",
  "Other",
] as const

export const mockContactInquiries: ContactInquiryItem[] = [
  {
    id: "INQ-201",
    name: "Aarav Patel",
    email: "aarav.patel@gmail.com",
    subject: "Business Partnership",
    message: "Hello team, We operate a chain of 14 organic grocery stores in Gujarat and Maharashtra. We would like to explore a bulk verified listing partnership and promotional tie-up across your portal.",
    status: "New",
    createdAt: "15 mins ago",
  },
  {
    id: "INQ-202",
    name: "Pooja Deshmukh",
    email: "pooja.d@zenithtech.in",
    subject: "Listing Support",
    message: "I registered our IT consultancy firm 'Zenith Systems' yesterday, but the verification process seems pending on our account. Please assist in activating our listing.",
    status: "New",
    createdAt: "1 hour ago",
  },
  {
    id: "INQ-203",
    name: "Vikram Singhania",
    email: "vikram@singhaniagroup.com",
    subject: "Advertising & Sponsorship",
    message: "We want to sponsor the top banner space on the Mumbai and Delhi directory pages for the upcoming Q4 festive period. Could you share the current ad rate card and impression metrics?",
    status: "Replied",
    createdAt: "Yesterday, 3:30 PM",
    replyText: "Hello Vikram, Thank you for reaching out! We have emailed our Q4 Media Kit and banner ad pricing to your email address.",
    repliedAt: "Yesterday, 5:15 PM",
  },
  {
    id: "INQ-204",
    name: "Neha Sundaram",
    email: "neha.sundaram@gmail.com",
    subject: "General Inquiry",
    message: "Does your platform offer an API or bulk export option to verify whether vendor listings in Ahmedabad have active GST registrations?",
    status: "New",
    createdAt: "Yesterday, 11:20 AM",
  },
  {
    id: "INQ-205",
    name: "Karan Johar",
    email: "karan.studio@mumbaiarts.org",
    subject: "Technical Issue",
    message: "When uploading high-resolution 4K portfolio images on our Photography listing, the image upload hangs at 99%. Could you check your file size thresholds?",
    status: "Replied",
    createdAt: "Oct 27, 2026",
    replyText: "Hi Karan, We have resolved the file size timeout on the CDN. Max upload size is 10MB per image. Please try re-uploading now.",
    repliedAt: "Oct 27, 2026",
  },
  {
    id: "INQ-206",
    name: "Rohan Varma",
    email: "rohan@varmafoods.co",
    subject: "Business Partnership",
    message: "Interested in onboarding all our cloud kitchen outlets across Bengaluru under a single franchise corporate account. Please connect with our marketing lead.",
    status: "Archived",
    createdAt: "Oct 25, 2026",
    replyText: "Account executive Raj assigned to schedule a demo call with your team.",
    repliedAt: "Oct 26, 2026",
  },
  {
    id: "INQ-207",
    name: "Dr. Ananya Sen",
    email: "ananya.sen@senclinic.org",
    subject: "Listing Support",
    message: "Our clinic address moved from Salt Lake Sector 1 to Sector 5 Kolkata. The edit form asks for re-verification document upload. Where do I upload the new municipal license?",
    status: "New",
    createdAt: "Oct 24, 2026",
  },
  {
    id: "INQ-208",
    name: "Deepak Chawla",
    email: "deepak.c@chawlalaw.in",
    subject: "Other",
    message: "Requesting removal of an outdated duplicate listing created by a previous employee under 'Chawla Legal Associates'.",
    status: "Replied",
    createdAt: "Oct 22, 2026",
    replyText: "The duplicate listing LST-902 has been merged with your primary verified account.",
    repliedAt: "Oct 23, 2026",
  },
]



