import { Driver, Vehicle, ScenicDestination, EmergencyContact, Booking, TripMemory } from '../types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh-1',
    name: 'Hyundai Creta SX(O) Dual Tone',
    category: 'Comfort SUV',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    baseHourlyRate: 350,
    includedKmPerHour: 25,
    extraKmRate: 16,
    features: ['Panoramic Sunroof', 'Bose Premium Audio', 'Ventilated Seats', '190mm Ground Clearance', 'Wireless Carplay'],
    luggageCapacity: 3,
    rating: 4.95,
    verificationStatus: 'Verified',
    licensePlate: 'KA 01 MJ 8899',
    color: 'Abyss Black Pearl',
    specs: {
      sunroof: true,
      soundSystem: 'Bose 8-Speaker Audio',
      groundClearance: '190 mm',
      enginePower: '160 bhp Turbo Petrol'
    }
  },
  {
    id: 'veh-2',
    name: 'Honda City ZX i-VTEC',
    category: 'Comfort Sedan',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    baseHourlyRate: 280,
    includedKmPerHour: 25,
    extraKmRate: 14,
    features: ['Plush Leather Seating', 'Electric Sunroof', 'Ultra-Smooth CVT', 'Silent Highway Cabin', '506L Massive Boot'],
    luggageCapacity: 3,
    rating: 4.92,
    verificationStatus: 'Verified',
    licensePlate: 'KA 03 HC 5500',
    color: 'Lunar Silver Metallic',
    specs: {
      sunroof: true,
      soundSystem: '8-Speaker Premium Sound',
      groundClearance: '165 mm',
      enginePower: '121 bhp i-VTEC'
    }
  },
  {
    id: 'veh-3',
    name: 'Toyota Innova Crysta 2.4 VX 7-Seater',
    category: 'Family MPV',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    seats: 7,
    transmission: 'Manual',
    fuelType: 'Diesel',
    baseHourlyRate: 450,
    includedKmPerHour: 25,
    extraKmRate: 18,
    features: ['Middle Row Captain Seats', 'Dual Climate Control', 'Legendary Reliability', 'Spacious Group Comfort', 'Rear AC Vents'],
    luggageCapacity: 5,
    rating: 4.98,
    verificationStatus: 'Verified',
    licensePlate: 'KA 04 TC 1001',
    color: 'Super White',
    specs: {
      sunroof: false,
      soundSystem: 'Toyota Touch Audio',
      groundClearance: '178 mm',
      enginePower: '150 bhp D-4D Diesel'
    }
  },
  {
    id: 'veh-4',
    name: 'Tata Nexon EV Empowered Plus',
    category: 'Electric SUV',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Electric',
    baseHourlyRate: 320,
    includedKmPerHour: 25,
    extraKmRate: 15,
    features: ['Whisper-Quiet Electric Drive', 'JBL Cinematic Audio', 'Sunroof', 'Regenerative Braking', 'Zero Emissions'],
    luggageCapacity: 3,
    rating: 4.93,
    verificationStatus: 'Verified',
    licensePlate: 'KA 05 EV 7007',
    color: 'Empowered Oxide',
    specs: {
      sunroof: true,
      soundSystem: 'JBL 9-Speaker with Subwoofer',
      groundClearance: '205 mm',
      enginePower: '145 bhp Permanent Magnet Motor'
    }
  },
  {
    id: 'veh-5',
    name: 'Mahindra Thar LX 4x4 Hard Top',
    category: 'Adventure SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    baseHourlyRate: 420,
    includedKmPerHour: 25,
    extraKmRate: 18,
    features: ['4x4 Shift-on-Fly Transfer Case', 'High Scenic Viewpoint Seating', 'All-Terrain Capability', 'Roof Mounted Speakers', 'Hill Descent Control'],
    luggageCapacity: 2,
    rating: 4.91,
    verificationStatus: 'Verified',
    licensePlate: 'KA 02 TH 4004',
    color: 'Napoli Black',
    specs: {
      sunroof: false,
      soundSystem: 'Roof Mounted Weatherproof Speakers',
      groundClearance: '226 mm',
      enginePower: '130 bhp mHawk Diesel'
    }
  },
  {
    id: 'veh-6',
    name: 'Maruti Suzuki Ertiga ZXi Plus AT',
    category: 'Economic 7-Seater',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    baseHourlyRate: 250,
    includedKmPerHour: 25,
    extraKmRate: 14,
    features: ['Smart Hybrid Efficiency', '7-Seat Family Layout', 'Dual AC with Roof Blowers', 'Smooth Torque Converter', 'Economical Group Travel'],
    luggageCapacity: 4,
    rating: 4.89,
    verificationStatus: 'Verified',
    licensePlate: 'KA 01 ER 3322',
    color: 'Magma Grey Metallic',
    specs: {
      sunroof: false,
      soundSystem: 'SmartPlay Pro Audio',
      groundClearance: '180 mm',
      enginePower: '103 bhp K15C Smart Hybrid'
    }
  }
];

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'drv-1',
    name: 'Captain Raghuveer Rao',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    rating: 4.99,
    totalTrips: 1420,
    experienceYears: 14,
    specialty: 'Sunrise Peaks & Ghat Roads Specialist',
    languages: ['English', 'Kannada', 'Hindi', 'Tamil'],
    verificationStatus: 'Verified',
    hourlyRate: 350,
    reliabilityScore: 99,
    drivingStyle: 'Smooth & Defensive',
    badges: ['Top 1% Chauffeur', 'Ghat Expert', 'Aadhaar Verified', 'Police Cleared', 'Defensive Driving Certified'],
    vehicleSpecializations: ['Hyundai Creta', 'Honda City', 'Toyota Innova', 'Automatic & Manual SUVs'],
    isAvailable: true,
    phone: '+91 98450 12345',
    city: 'Bengaluru',
    documents: [
      { id: 'doc-1', name: 'Aadhaar Government ID', type: 'Aadhaar', status: 'Verified', documentNumber: 'XXXX-XXXX-8921', submittedAt: '2023-01-15' },
      { id: 'doc-2', name: 'Commercial Heavy/Light Transport DL', type: 'Driving License', status: 'Verified', documentNumber: 'KA-01-20090048122', submittedAt: '2023-01-15' },
      { id: 'doc-3', name: 'State Police Character Verification Certificate', type: 'Police Clearance', status: 'Verified', documentNumber: 'BLR/POL/2023/8812', submittedAt: '2023-01-16' },
      { id: 'doc-4', name: 'High-Altitude Defensive Driving Certification', type: 'Defensive Driving Certificate', status: 'Verified', documentNumber: 'NADDC-9921', submittedAt: '2023-02-01' }
    ]
  },
  {
    id: 'drv-2',
    name: 'Devika Singhania',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    rating: 4.98,
    totalTrips: 870,
    experienceYears: 9,
    specialty: 'Scenic Coastal Drives & Sunset Itineraries',
    languages: ['English', 'Hindi', 'Marathi'],
    verificationStatus: 'Verified',
    hourlyRate: 380,
    reliabilityScore: 98,
    drivingStyle: 'VIP Executive',
    badges: ['Precision Driver', 'Hospitality Pro', 'Aadhaar Verified', 'Police Cleared'],
    vehicleSpecializations: ['Sedans', 'Electric SUVs', 'All Automatics'],
    isAvailable: true,
    phone: '+91 97110 56789',
    city: 'Bengaluru / Mumbai',
    documents: [
      { id: 'doc-21', name: 'Aadhaar ID Card', type: 'Aadhaar', status: 'Verified', documentNumber: 'XXXX-XXXX-3419', submittedAt: '2023-04-10' },
      { id: 'doc-22', name: 'Motor Vehicle DL', type: 'Driving License', status: 'Verified', documentNumber: 'DL-04-20150039211', submittedAt: '2023-04-10' },
      { id: 'doc-23', name: 'Police Verification Record', type: 'Police Clearance', status: 'Verified', documentNumber: 'MUM/PVR/2023/4190', submittedAt: '2023-04-12' }
    ]
  },
  {
    id: 'drv-3',
    name: 'Vikramjit "Vik" Singh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    rating: 4.95,
    totalTrips: 1150,
    experienceYears: 12,
    specialty: 'Midnight Expressway Cruises & Spontaneous Road Trips',
    languages: ['English', 'Punjabi', 'Hindi'],
    verificationStatus: 'Verified',
    hourlyRate: 320,
    reliabilityScore: 97,
    drivingStyle: 'Night Drive Expert',
    badges: ['Night Vision Certified', 'First-Aid Responder', 'Aadhaar Verified', 'Police Cleared'],
    vehicleSpecializations: ['Thar 4x4', 'Innova Crysta', 'Creta', 'Ertiga', 'Manual & Automatics'],
    isAvailable: true,
    phone: '+91 98100 45678',
    city: 'Bengaluru',
    documents: [
      { id: 'doc-31', name: 'Aadhaar KYC', type: 'Aadhaar', status: 'Verified', documentNumber: 'XXXX-XXXX-7712', submittedAt: '2023-03-01' },
      { id: 'doc-32', name: 'Commercial Badge Driving License', type: 'Driving License', status: 'Verified', documentNumber: 'KA-03-20120011984', submittedAt: '2023-03-01' },
      { id: 'doc-33', name: 'Police Background Clean Slate', type: 'Police Clearance', status: 'Verified', documentNumber: 'BLR/POL/2023/1109', submittedAt: '2023-03-05' }
    ]
  },
  {
    id: 'drv-4',
    name: 'Karthik Subbaraman',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop',
    rating: 4.92,
    totalTrips: 640,
    experienceYears: 7,
    specialty: 'Heritage Trails & Wildlife Corridor Routes',
    languages: ['English', 'Tamil', 'Kannada', 'Malayalam'],
    verificationStatus: 'Pending',
    hourlyRate: 300,
    reliabilityScore: 94,
    drivingStyle: 'Scenic Specialist',
    badges: ['Eco-Driver Certified', 'Document Verification in Progress'],
    vehicleSpecializations: ['Sedans', 'Electric Cars', 'Hybrids'],
    isAvailable: false,
    phone: '+91 99400 32109',
    city: 'Bengaluru',
    documents: [
      { id: 'doc-41', name: 'Aadhaar Card', type: 'Aadhaar', status: 'Verified', documentNumber: 'XXXX-XXXX-9921', submittedAt: '2026-10-24' },
      { id: 'doc-42', name: 'Transport DL', type: 'Driving License', status: 'Pending', documentNumber: 'TN-07-20170029112', submittedAt: '2026-10-25', notes: 'RTO verification ping pending' },
      { id: 'doc-43', name: 'Police Verification', type: 'Police Clearance', status: 'Pending', documentNumber: 'APPLY-2026-0991', submittedAt: '2026-10-25' }
    ]
  }
];

export const SCENIC_DESTINATIONS: ScenicDestination[] = [
  {
    id: 'dest-1',
    title: 'Nandi Hills Cloud Mist Peak',
    subtitle: 'Golden Sunrise Serenade Above the Sea of Clouds',
    category: 'Sunrise Escape',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    distanceKm: 62,
    durationHours: 4,
    estimatedCost: 2650,
    mood: 'Peaceful',
    bestDepartureWindow: '04:15 AM - 04:45 AM (Sunrise at 06:05 AM)',
    scenicStops: ['Devanahalli Heritage Bypass', 'Nandi Forest Checkpost', 'Tipu’s Drop Viewpoint', 'Channarayana Swamy Temple Rest Stop'],
    description: 'Breathe in crisp mountain air as you glide through early morning mist. The 40 hairpin curves open up to a breathtaking golden sunrise carpet above rolling white clouds.',
    weatherAdvice: 'Early morning temperature 16°C. Dense fog between 05:00 AM - 06:15 AM. Headlamp and fog assist enabled.',
    roadQuality: 'Pristine Highway',
    coordinates: { lat: 13.3702, lng: 77.6835 },
    popularPicks: true
  },
  {
    id: 'dest-2',
    title: 'Sakleshpur Emerald Ghat Pass',
    subtitle: 'Winding Coffee Estates & Misty Ridge Curves',
    category: 'Scenic Mountain Routes',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
    distanceKm: 220,
    durationHours: 8,
    estimatedCost: 6800,
    mood: 'Adventure',
    bestDepartureWindow: '06:00 AM - 07:00 AM',
    scenicStops: ['Hassan Green Belt Breakfast Stop', 'Bisle Ghat Forest Ridge', 'Manjarabad Star Fort Vista', 'Old Magazine House Tea Break'],
    description: 'A mesmerizing drive through rainforest corridors and lush cardamom plantations. Curves designed for car connoisseurs who appreciate smooth, balanced chauffeuring.',
    weatherAdvice: 'Intermittent light rain showers. Fresh mountain breeze, 21°C.',
    roadQuality: 'Winding Ghats',
    coordinates: { lat: 12.9734, lng: 75.7873 },
    popularPicks: true
  },
  {
    id: 'dest-3',
    title: 'East Coast Road (ECR) Twilight Promenade',
    subtitle: 'Ocean Breeze, Salt Air & Golden Hour Horizons',
    category: 'Sunset Stories',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    distanceKm: 140,
    durationHours: 6,
    estimatedCost: 4500,
    mood: 'Romantic',
    bestDepartureWindow: '03:30 PM - 04:00 PM (Sunset at 06:18 PM)',
    scenicStops: ['Covelong Surf Bay', 'Mahabalipuram Shore Vista', 'French Quarter Waterfront Promenade', 'Beachside Artisan Cafe'],
    description: 'Listen to the rhythm of ocean waves along a sweeping double-lane coastal boulevard. Open windows or roll down the convertible top for an unforgettable golden hour glow.',
    weatherAdvice: 'Warm coastal breeze 27°C. Clear horizon for an unobstructed magenta sunset.',
    roadQuality: 'Smooth Coastal Pass',
    coordinates: { lat: 12.6120, lng: 80.1994 },
    popularPicks: true
  },
  {
    id: 'dest-4',
    title: 'Bengaluru Peripheral Ring & Airport Expressway',
    subtitle: 'Empty Tarmac, Neon Skylines & Late-Night Coffee',
    category: 'Midnight Miles',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop',
    distanceKm: 95,
    durationHours: 3,
    estimatedCost: 2200,
    mood: 'Midnight',
    bestDepartureWindow: '10:30 PM - 11:30 PM',
    scenicStops: ['Hebbal Flyover Helix', 'KIA Elevated Tollway', '24/7 Chai Point Aeropolis', 'Yelahanka Lake Loop'],
    description: 'Unwind after a high-pressure week with a tranquil late-night city cruise. Zero traffic, cool breeze, subtle ambient lighting, and your choice of curated music.',
    weatherAdvice: 'Clear starry night, 19°C. Smooth unobstructed driving conditions.',
    roadQuality: 'Urban Expressway',
    coordinates: { lat: 13.1986, lng: 77.7066 },
    popularPicks: true
  },
  {
    id: 'dest-5',
    title: 'Coorg Coffee Mist Highlands',
    subtitle: 'Canopy Roads, Bamboo Groves & Waterfalls',
    category: 'Weekend Wanderer',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
    distanceKm: 260,
    durationHours: 10,
    estimatedCost: 8200,
    mood: 'Exploration',
    bestDepartureWindow: '05:30 AM - 06:30 AM',
    scenicStops: ['Kushalnagar Tibetan Monastery', 'Abbey Falls Forest Walkway', 'Raja’s Seat Panoramic Sunset', 'Madikeri Estate Cafe'],
    description: 'Escape into the Scotland of India. Rich rolling landscapes, aroma of freshly roasted coffee beans, and untouched mountain streams along every curve.',
    weatherAdvice: 'Crisp mountain climate, 18°C. Perfect for panoramic sunroof journeys.',
    roadQuality: 'Winding Ghats',
    coordinates: { lat: 12.4244, lng: 75.7382 },
    popularPicks: true
  }
];

export const INITIAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-1',
    name: 'Aanya Sharma',
    relation: 'Spouse / Partner',
    phone: '+91 98765 43210',
    notifyOnSos: true,
    notifyOnStart: true
  },
  {
    id: 'em-2',
    name: 'Rohan Mehra',
    relation: 'Sibling',
    phone: '+91 98123 45678',
    notifyOnSos: true,
    notifyOnStart: false
  }
];

export const SAMPLE_TRIP_MEMORIES: TripMemory[] = [
  {
    id: 'mem-1',
    bookingId: 'KM-2026-9042',
    title: 'Nandi Hills Cloudburst Sunrise Drive',
    date: '18 Oct 2026',
    distanceCoveredKm: 78,
    hoursDriven: 4.5,
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop'
    ],
    review: {
      rating: 5,
      comment: 'Captain Raghuveer was phenomenal. Handled the early morning hairpin fog with supreme grace. Best hot filter coffee stop recommendation ever!'
    },
    highlights: ['Watched sun break through dense clouds at 06:08 AM', 'Chauffeur kept smooth 40km/h glide with zero jerky braking', 'Sunroof panoramic sunrise view'],
    scenicStopsVisited: ['Devanahalli Fort Gate', 'Tipu Drop Point', 'Nandi Valley Cafe']
  },
  {
    id: 'mem-2',
    bookingId: 'KM-2026-8812',
    title: 'Midnight Expressway De-Stress Cruise',
    date: '04 Oct 2026',
    distanceCoveredKm: 92,
    hoursDriven: 3,
    photos: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop'
    ],
    review: {
      rating: 5,
      comment: 'Hired driver Vikramjit for my BMW 330i. He drove with utmost care, respected quiet time, and took the scenic airport loop. Felt totally refreshed.'
    },
    highlights: ['Midnight city skyline reflections', 'Personal Spotify playlist connected', 'Super chill chauffeur'],
    scenicStopsVisited: ['Aeropolis Airport Highway', 'Yelahanka Lake Loop']
  }
];

export const SAMPLE_ACTIVE_BOOKING: Booking = {
  id: 'KM-ACTIVE-001',
  bookingModel: 'vehicle_and_driver',
  customerName: 'Yashvi Surana',
  customerPhone: '+91 99887 76655',
  pickupLocation: 'Indiranagar 100ft Road, Bengaluru',
  destination: 'Nandi Hills Cloud Mist Peak',
  isDestinationFree: false,
  date: 'Today',
  startTime: '04:30 AM',
  durationHours: 4,
  passengers: 2,
  mood: 'Peaceful',
  vehicle: INITIAL_VEHICLES[0],
  driver: INITIAL_DRIVERS[0],
  stops: ['Devanahalli Heritage Stop', 'Nandi Forest Checkpost'],
  fareBreakdown: {
    baseFare: 1450,
    hourlyDriverCharge: 1400,
    vehicleRentalCharge: 4350,
    estimatedFuelAllowance: 950,
    tollsAndPermits: 220,
    nightDriveSurcharge: 250,
    platformFee: 99,
    taxes: 440,
    discount: 300,
    total: 7409
  },
  status: 'Active',
  paymentStatus: 'Paid (Demo Razorpay)',
  paymentMethod: 'UPI (GPay / PhonePe Demo)',
  createdAt: '2026-10-27T04:00:00Z',
  notes: 'Customer requested gentle acoustic jazz and 1 hot beverage break at sunrise.'
};
