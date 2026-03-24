// H & M World Tour 2026 - Trip Data
const TRIP_DATA = [
  {
    id: 'seoul',
    city: 'Seoul',
    country: 'South Korea',
    emoji: '🇰🇷',
    lat: 37.5665,
    lng: 126.9780,
    startDate: '2026-04-13',
    endDate: '2026-04-22',
    color: '#e8a87c',
    accommodations: [
      { name: 'Hanok Hotel DAAM', dates: 'Apr 13–16' },
      { name: 'Cozy Nest Airbnb', dates: 'Apr 17–22' }
    ],
    transport: {
      arrival: 'United Flight UA2177 & UA893 (Apr 12–13)',
      departure: 'VietJet Flight VJ879 to Hoi An (Apr 23)'
    },
    specialDays: []
  },
  {
    id: 'hoian',
    city: 'Hoi An',
    country: 'Vietnam',
    emoji: '🇻🇳',
    lat: 15.8801,
    lng: 108.3380,
    startDate: '2026-04-23',
    endDate: '2026-04-25',
    color: '#d4a373',
    accommodations: [
      { name: 'Betel Garden Villa', dates: 'Apr 23–25' }
    ],
    transport: {
      arrival: 'VietJet Flight VJ879 (free taxi from airport)',
      departure: 'VietJet Flight VJ1504 to Hanoi (Apr 26)'
    },
    specialDays: []
  },
  {
    id: 'hagiang',
    city: 'Ha Giang Loop',
    country: 'Vietnam',
    emoji: '🇻🇳',
    lat: 23.0,
    lng: 105.0,
    startDate: '2026-04-26',
    endDate: '2026-04-29',
    color: '#a3b18a',
    accommodations: [
      { name: 'Cheers Hostel Tour (Dong Van Hotel)', dates: 'Apr 27' },
      { name: 'Cheers Hostel Tour (Cheers Ecolodge)', dates: 'Apr 28' },
      { name: 'Cheers Hostel (Hanoi)', dates: 'Apr 29' }
    ],
    transport: {
      arrival: 'Limo bus with Cheers Hostel Tour (pickup at airport)',
      departure: 'Limo bus back to Hanoi via tour'
    },
    specialDays: []
  },
  {
    id: 'hanoi',
    city: 'Hanoi',
    country: 'Vietnam',
    emoji: '🇻🇳',
    lat: 21.0285,
    lng: 105.8542,
    startDate: '2026-04-30',
    endDate: '2026-05-01',
    color: '#b5838d',
    accommodations: [
      { name: 'Cheers Hostel', dates: 'Apr 29 – May 1' }
    ],
    transport: {
      arrival: 'Limo bus from Ha Giang',
      departure: 'VietJet Flight VJ901 to Bangkok (May 2)'
    },
    specialDays: [
      { date: '2026-05-01', label: "🎂 Matthew's Birthday!" }
    ]
  },
  {
    id: 'bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    emoji: '🇹🇭',
    lat: 13.7563,
    lng: 100.5018,
    startDate: '2026-05-02',
    endDate: '2026-05-04',
    color: '#e07a5f',
    accommodations: [
      { name: 'Baan Tuk Din Hotel', dates: 'May 2–4' }
    ],
    transport: {
      arrival: 'VietJet Flight VJ901',
      departure: 'VietJet Flight VZ306 to Phuket (May 5)'
    },
    specialDays: []
  },
  {
    id: 'phuket',
    city: 'Phuket',
    country: 'Thailand',
    emoji: '🇹🇭',
    lat: 7.8804,
    lng: 98.3923,
    startDate: '2026-05-05',
    endDate: '2026-05-09',
    color: '#f2cc8f',
    accommodations: [
      { name: 'Two Chefs Inn', dates: 'May 5–9' }
    ],
    transport: {
      arrival: 'VietJet Flight VZ306',
      departure: 'Air Arabia Flight G9688 & G9287 to Istanbul (May 10)'
    },
    specialDays: [
      { date: '2026-05-10', label: "💐 Mother's Day" }
    ]
  },
  {
    id: 'istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    emoji: '🇹🇷',
    lat: 41.0082,
    lng: 28.9784,
    startDate: '2026-05-10',
    endDate: '2026-05-15',
    color: '#c1666b',
    accommodations: [
      { name: 'Cheers Vintage Hostel', dates: 'May 10–15' }
    ],
    transport: {
      arrival: 'Air Arabia Flight G9688 & G9287',
      departure: 'AJet Flight VF73 to Rome (May 16)'
    },
    specialDays: []
  },
  {
    id: 'rome',
    city: 'Rome',
    country: 'Italy',
    emoji: '🇮🇹',
    lat: 41.9028,
    lng: 12.4964,
    startDate: '2026-05-16',
    endDate: '2026-05-16',
    color: '#e07a5f',
    accommodations: [
      { name: 'M&D Airbnb', dates: 'May 16' }
    ],
    transport: {
      arrival: 'AJet Flight VF73',
      departure: 'Frecciarossa 8508 to Florence (May 17)'
    },
    specialDays: []
  },
  {
    id: 'florence',
    city: 'Florence',
    country: 'Italy',
    emoji: '🇮🇹',
    lat: 43.7696,
    lng: 11.2558,
    startDate: '2026-05-17',
    endDate: '2026-05-18',
    color: '#d4a373',
    accommodations: [
      { name: 'Podere Giusti', dates: 'May 17–18' }
    ],
    transport: {
      arrival: 'Frecciarossa 8508',
      departure: 'Train to Lucerne (May 19)'
    },
    specialDays: [
      { date: '2026-05-18', label: "🎂 Hayden's Birthday!" }
    ]
  },
  {
    id: 'lucerne',
    city: 'Lucerne',
    country: 'Switzerland',
    emoji: '🇨🇭',
    lat: 47.0502,
    lng: 8.3093,
    startDate: '2026-05-19',
    endDate: '2026-05-22',
    color: '#588b8b',
    accommodations: [
      { name: 'LakeHouse Golden Swan', dates: 'May 19–22' }
    ],
    transport: {
      arrival: 'Train from Florence',
      departure: 'Train to Zurich (May 23)'
    },
    specialDays: []
  },
  {
    id: 'zurich',
    city: 'Zurich',
    country: 'Switzerland',
    emoji: '🇨🇭',
    lat: 47.3769,
    lng: 8.5417,
    startDate: '2026-05-23',
    endDate: '2026-05-23',
    color: '#588b8b',
    accommodations: [],
    transport: {
      arrival: 'Train from Lucerne',
      departure: 'KLM Flight KL1920 & KL2625 to Marrakech (May 24)'
    },
    specialDays: []
  },
  {
    id: 'marrakech',
    city: 'Marrakech',
    country: 'Morocco',
    emoji: '🇲🇦',
    lat: 31.6295,
    lng: -7.9811,
    startDate: '2026-05-24',
    endDate: '2026-05-29',
    color: '#c1666b',
    accommodations: [
      { name: 'Hotel Almoulouk', dates: 'May 24–26, May 29' }
    ],
    transport: {
      arrival: 'KLM Flight KL1920 & KL2625 ($20 taxi from airport)',
      departure: 'Tap Air Portugal Flight NI1453 to Lisbon (May 30)'
    },
    specialDays: []
  },
  {
    id: 'sahara',
    city: 'Sahara Desert',
    country: 'Morocco',
    emoji: '🏜️',
    lat: 31.1500,
    lng: -4.0000,
    startDate: '2026-05-27',
    endDate: '2026-05-29',
    color: '#e8a87c',
    accommodations: [
      { name: 'Hotel in Kelaat Mgouna – Boumain Dades', dates: 'May 27' },
      { name: 'Campsite in Erg Chebbi', dates: 'May 28' }
    ],
    transport: {
      arrival: 'Morocco Trip tour via GetYourGuide',
      departure: 'Back to Marrakech via tour (May 29)'
    },
    specialDays: []
  },
  {
    id: 'lisbon',
    city: 'Lisbon',
    country: 'Portugal',
    emoji: '🇵🇹',
    lat: 38.7223,
    lng: -9.1393,
    startDate: '2026-05-30',
    endDate: '2026-05-30',
    color: '#f2cc8f',
    accommodations: [
      { name: 'Safestay Lisbon Bairro Alto', dates: 'May 30' }
    ],
    transport: {
      arrival: 'Tap Air Portugal Flight NI1453 ($20 taxi to airport)',
      departure: 'Tap Air Portugal Flight TP103 to Belo Horizonte (May 31)'
    },
    specialDays: []
  },
  {
    id: 'belohorizonte',
    city: 'Belo Horizonte',
    country: 'Brazil',
    emoji: '🇧🇷',
    lat: -19.9167,
    lng: -43.9345,
    startDate: '2026-05-31',
    endDate: '2026-06-03',
    color: '#a3b18a',
    accommodations: [
      { name: 'Royal Collection Savassi', dates: 'May 31 – Jun 3' }
    ],
    transport: {
      arrival: 'Tap Air Portugal Flight TP103',
      departure: 'GOL Airline Flight G3 2027 to Rio (Jun 4)'
    },
    specialDays: []
  },
  {
    id: 'rio',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    emoji: '🇧🇷',
    lat: -22.9068,
    lng: -43.1729,
    startDate: '2026-06-04',
    endDate: '2026-06-09',
    color: '#b5838d',
    accommodations: [
      { name: 'Airbnb Loft in Botafogo', dates: 'Jun 4–9' }
    ],
    transport: {
      arrival: 'GOL Airline Flight G3 2027',
      departure: 'LATAM Flight LA2415 to Lima (Jun 10)'
    },
    specialDays: []
  },
  {
    id: 'lima',
    city: 'Lima',
    country: 'Peru',
    emoji: '🇵🇪',
    lat: -12.0464,
    lng: -77.0428,
    startDate: '2026-06-10',
    endDate: '2026-06-12',
    color: '#e07a5f',
    accommodations: [
      { name: 'Viajero Lima – Barranco Hostel', dates: 'Jun 10–12' }
    ],
    transport: {
      arrival: 'LATAM Flight LA2415',
      departure: 'LATAM Flight LA2130 to Cusco (Jun 13)'
    },
    specialDays: []
  },
  {
    id: 'cusco',
    city: 'Cusco & Machu Picchu',
    country: 'Peru',
    emoji: '🇵🇪',
    lat: -13.5320,
    lng: -71.9675,
    startDate: '2026-06-13',
    endDate: '2026-06-17',
    color: '#d4a373',
    accommodations: [
      { name: 'Panorama B&B (Aguas Calientes)', dates: 'Jun 13–15' },
      { name: 'Black Llama Hostel (Cusco)', dates: 'Jun 16–17' }
    ],
    transport: {
      arrival: 'LATAM Flight LA2130 / Peru Rail Expedition 603',
      departure: 'Peru Rail Expedition 72P / LATAM Flight LA2029 to Lima (Jun 18)'
    },
    specialDays: []
  },
  {
    id: 'lima2',
    city: 'Lima',
    country: 'Peru',
    emoji: '🇵🇪',
    lat: -12.0464,
    lng: -77.0428,
    startDate: '2026-06-18',
    endDate: '2026-06-18',
    color: '#e07a5f',
    accommodations: [
      { name: 'KACLLA, The Healing Dog Hostel', dates: 'Jun 18' }
    ],
    transport: {
      arrival: 'LATAM Flight LA2029 (WhatsApp hostel for ride)',
      departure: 'LATAM Flight LA2408 to San Jose (Jun 19)'
    },
    specialDays: []
  },
  {
    id: 'lafortuna',
    city: 'La Fortuna',
    country: 'Costa Rica',
    emoji: '🇨🇷',
    lat: 10.4679,
    lng: -84.6427,
    startDate: '2026-06-19',
    endDate: '2026-06-21',
    color: '#a3b18a',
    accommodations: [
      { name: 'Hotel Arenal Springs Resort & Spa', dates: 'Jun 19–21' }
    ],
    transport: {
      arrival: 'LATAM Flight LA2408 / Adobe Rental Car',
      departure: 'Adobe Rental Car to Jaco (Jun 22)'
    },
    specialDays: [
      { date: '2026-06-21', label: "👔 Father's Day" }
    ]
  },
  {
    id: 'jaco',
    city: 'Jaco',
    country: 'Costa Rica',
    emoji: '🇨🇷',
    lat: 9.6167,
    lng: -84.6333,
    startDate: '2026-06-22',
    endDate: '2026-06-28',
    color: '#588b8b',
    accommodations: [
      { name: 'Hermosa Beach Bungalow', dates: 'Jun 22–28' }
    ],
    transport: {
      arrival: 'Adobe Rental Car from La Fortuna',
      departure: 'United Flight 1589 & 2674 to Austin (Jun 29)'
    },
    specialDays: []
  },
  {
    id: 'austin',
    city: 'Austin',
    country: 'Texas, USA',
    emoji: '🇺🇸',
    lat: 30.2672,
    lng: -97.7431,
    startDate: '2026-06-29',
    endDate: '2026-06-29',
    color: '#c1666b',
    accommodations: [
      { name: 'Home Sweet Home 🏠', dates: 'Jun 29' }
    ],
    transport: {
      arrival: 'United Flight 1589 & 2674',
      departure: ''
    },
    specialDays: []
  }
];

// Route connections for drawing flight/travel paths
const ROUTE_ORDER = [
  'seoul', 'hoian', 'hagiang', 'hanoi', 'bangkok', 'phuket',
  'istanbul', 'rome', 'florence', 'lucerne', 'zurich',
  'marrakech', 'sahara', 'marrakech', 'lisbon', 'belohorizonte',
  'rio', 'lima', 'cusco', 'lima2', 'lafortuna', 'jaco', 'austin'
];
