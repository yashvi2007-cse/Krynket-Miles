export type BookingModel = 'vehicle_and_driver' | 'driver_for_my_car';

export type JourneyMood = 
  | 'Peaceful' 
  | 'Adventure' 
  | 'Romantic' 
  | 'Family' 
  | 'Friends' 
  | 'Exploration'
  | 'Midnight';

export type VerificationStatus = 'Pending' | 'Verified' | 'Rejected';

export interface DriverDocument {
  id: string;
  name: string;
  type: 'Aadhaar' | 'Driving License' | 'Police Clearance' | 'Defensive Driving Certificate' | 'Commercial Badge';
  status: VerificationStatus;
  documentNumber: string;
  submittedAt: string;
  verifiedAt?: string;
  notes?: string;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalTrips: number;
  experienceYears: number;
  specialty: string;
  languages: string[];
  verificationStatus: VerificationStatus;
  documents: DriverDocument[];
  hourlyRate: number; // in INR
  reliabilityScore: number; // 0-100%
  drivingStyle: 'Smooth & Defensive' | 'Scenic Specialist' | 'Night Drive Expert' | 'VIP Executive';
  badges: string[];
  vehicleSpecializations: string[];
  isAvailable: boolean;
  phone: string;
  city: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'Comfort SUV' | 'Comfort Sedan' | 'Family MPV' | 'Electric SUV' | 'Adventure SUV' | 'Economic 7-Seater' | 'Luxury Sedan' | 'Scenic SUV' | 'Electric GT' | 'Open Top / Convertible' | 'Premium MPV' | string;
  image: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  baseHourlyRate: number; // in INR
  includedKmPerHour: number;
  extraKmRate: number;
  features: string[];
  luggageCapacity: number;
  rating: number;
  ownerId?: string;
  verificationStatus: VerificationStatus;
  licensePlate: string;
  color: string;
  specs: {
    sunroof: boolean;
    soundSystem: string;
    groundClearance: string;
    enginePower: string;
  };
}

export interface ScenicDestination {
  id: string;
  title: string;
  subtitle: string;
  category: 'Sunrise Escape' | 'Sunset Stories' | 'Midnight Miles' | 'Weekend Wanderer' | 'Scenic Mountain Routes' | 'Coastal Cruise';
  image: string;
  distanceKm: number;
  durationHours: number;
  estimatedCost: number;
  mood: JourneyMood;
  bestDepartureWindow: string; // e.g. "04:45 AM - 05:15 AM"
  scenicStops: string[];
  description: string;
  weatherAdvice: string;
  roadQuality: 'Pristine Highway' | 'Winding Ghats' | 'Smooth Coastal Pass' | 'Urban Expressway';
  coordinates: { lat: number; lng: number };
  popularPicks?: boolean;
}

export interface Booking {
  id: string;
  bookingModel: BookingModel;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  destination: string;
  isDestinationFree: boolean;
  date: string;
  startTime: string;
  durationHours: number;
  passengers: number;
  mood: JourneyMood;
  vehicle?: Vehicle;
  driver: Driver;
  userCarDetails?: {
    brand: string;
    model: string;
    transmission: 'Automatic' | 'Manual';
    fuelType: string;
    registrationNumber: string;
  };
  stops: string[];
  fareBreakdown: {
    baseFare: number;
    hourlyDriverCharge: number;
    vehicleRentalCharge: number;
    estimatedFuelAllowance: number;
    tollsAndPermits: number;
    nightDriveSurcharge: number;
    platformFee: number;
    taxes: number;
    discount: number;
    total: number;
  };
  status: 'Scheduled' | 'Active' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid (Demo Razorpay)' | 'Pending' | 'Refunded';
  paymentMethod: string;
  createdAt: string;
  sosTriggered?: boolean;
  notes?: string;
}

export interface TripMemory {
  id: string;
  bookingId: string;
  title: string;
  date: string;
  distanceCoveredKm: number;
  hoursDriven: number;
  photos: string[];
  review: {
    rating: number;
    comment: string;
  };
  highlights: string[];
  scenicStopsVisited: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  notifyOnSos: boolean;
  notifyOnStart: boolean;
}

export interface GroupTripStop {
  id: string;
  name: string;
  votes: number;
  addedBy: string;
}

export interface GroupTrip {
  id: string;
  title: string;
  budgetGoal: number;
  members: { name: string; avatar: string; paid: boolean }[];
  stops: GroupTripStop[];
  selectedVehicleCategory: string;
  durationHours: number;
}
