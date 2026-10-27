import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Driver, 
  Vehicle, 
  ScenicDestination, 
  Booking, 
  TripMemory, 
  EmergencyContact, 
  BookingModel, 
  JourneyMood,
  GroupTrip
} from '../types';
import { 
  INITIAL_DRIVERS, 
  INITIAL_VEHICLES, 
  SCENIC_DESTINATIONS, 
  INITIAL_EMERGENCY_CONTACTS, 
  SAMPLE_TRIP_MEMORIES,
  SAMPLE_ACTIVE_BOOKING
} from '../data/mockData';

type UserRole = 'customer' | 'driver' | 'admin';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  drivers: Driver[];
  vehicles: Vehicle[];
  destinations: ScenicDestination[];
  emergencyContacts: EmergencyContact[];
  bookings: Booking[];
  activeTrip: Booking | null;
  tripMemories: TripMemory[];
  wishlist: string[];
  toggleWishlist: (destinationId: string) => void;
  // Booking creation
  bookingDraft: {
    model: BookingModel;
    pickup: string;
    destination: string;
    isDestinationFree: boolean;
    date: string;
    startTime: string;
    durationHours: number;
    passengers: number;
    budget: number;
    mood: JourneyMood;
    selectedVehicleId?: string;
    selectedDriverId?: string;
    userCar?: {
      brand: string;
      model: string;
      transmission: 'Automatic' | 'Manual';
      fuelType: string;
      registrationNumber: string;
    };
    drivingPreferences?: string[];
  };
  updateBookingDraft: (data: Partial<AppContextType['bookingDraft']>) => void;
  isBookingModalOpen: boolean;
  openBookingModal: (model?: BookingModel, prefillDestination?: ScenicDestination) => void;
  closeBookingModal: () => void;
  confirmBooking: (paymentMethod: string) => Booking;
  // Active trip simulation
  tripProgress: number; // 0 to 100
  simulatedSpeed: number; // km/h
  isGpsSimulating: boolean;
  toggleGpsSimulation: () => void;
  isRouteDeviated: boolean;
  toggleRouteDeviation: () => void;
  isSosModalOpen: boolean;
  openSosModal: () => void;
  closeSosModal: () => void;
  triggerSosAlert: () => void;
  sosStatus: 'idle' | 'triggered' | 'resolved';
  resetSosAlert: () => void;
  // Safety check-in
  checkInDueInSeconds: number;
  completeCheckIn: () => void;
  // Driver verification workflow
  updateDriverStatus: (driverId: string, status: 'Verified' | 'Rejected' | 'Pending') => void;
  addNewVehicleListing: (vehicle: Omit<Vehicle, 'id' | 'rating' | 'verificationStatus'>) => void;
  // Group trip
  groupTrip: GroupTrip;
  addStopVote: (stopId: string) => void;
  addGroupStop: (name: string) => void;
  // Emergency contacts
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  removeEmergencyContact: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [destinations] = useState<ScenicDestination[]>(SCENIC_DESTINATIONS);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(INITIAL_EMERGENCY_CONTACTS);
  const [bookings, setBookings] = useState<Booking[]>([SAMPLE_ACTIVE_BOOKING]);
  const [activeTrip, setActiveTrip] = useState<Booking | null>(SAMPLE_ACTIVE_BOOKING);
  const [tripMemories, setTripMemories] = useState<TripMemory[]>(SAMPLE_TRIP_MEMORIES);
  const [wishlist, setWishlist] = useState<string[]>(['dest-1', 'dest-3']);

  // Active Trip Simulation State
  const [tripProgress, setTripProgress] = useState<number>(38);
  const [simulatedSpeed, setSimulatedSpeed] = useState<number>(54);
  const [isGpsSimulating, setIsGpsSimulating] = useState<boolean>(true);
  const [isRouteDeviated, setIsRouteDeviated] = useState<boolean>(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState<boolean>(false);
  const [sosStatus, setSosStatus] = useState<'idle' | 'triggered' | 'resolved'>('idle');
  const [checkInDueInSeconds, setCheckInDueInSeconds] = useState<number>(360);

  // Booking Draft State
  const [bookingDraft, setBookingDraft] = useState<AppContextType['bookingDraft']>({
    model: 'vehicle_and_driver',
    pickup: 'Indiranagar 100ft Road, Bengaluru',
    destination: 'Nandi Hills Cloud Mist Peak',
    isDestinationFree: false,
    date: '2026-10-28',
    startTime: '04:30 AM',
    durationHours: 4,
    passengers: 2,
    budget: 5000,
    mood: 'Peaceful',
    selectedVehicleId: INITIAL_VEHICLES[0].id,
    selectedDriverId: INITIAL_DRIVERS[0].id,
    userCar: {
      brand: 'BMW',
      model: '330i M Sport',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      registrationNumber: 'KA 03 MZ 9999'
    },
    drivingPreferences: ['Smooth highway driving', 'No aggressive acceleration', 'Acoustic jazz playlist']
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  // Group trip planner state
  const [groupTrip, setGroupTrip] = useState<GroupTrip>({
    id: 'grp-trip-01',
    title: 'Sakleshpur Cloud Mist Roadtrip with Friends',
    budgetGoal: 3600,
    selectedVehicleCategory: 'Comfort MPV (Toyota Innova Crysta)',
    durationHours: 8,
    members: [
      { name: 'Yashvi (Host)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', paid: true },
      { name: 'Arjun', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop', paid: true },
      { name: 'Pooja', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop', paid: false },
      { name: 'Sameer', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=200&auto=format&fit=crop', paid: true }
    ],
    stops: [
      { id: 'stp-1', name: 'Swathi Delicacy Highway Idli Breakfast', votes: 4, addedBy: 'Arjun' },
      { id: 'stp-2', name: 'Manjarabad Star Fort Panoramic Hike', votes: 3, addedBy: 'Pooja' },
      { id: 'stp-3', name: 'Misty Cardamom Plantation Estate Tea Break', votes: 4, addedBy: 'Yashvi' },
      { id: 'stp-4', name: 'Bisle Viewpoint Sunset Ridge', votes: 4, addedBy: 'Sameer' }
    ]
  });

  // GPS Simulation timer
  useEffect(() => {
    if (!isGpsSimulating || !activeTrip) return;
    const interval = setInterval(() => {
      setTripProgress((prev) => (prev >= 98 ? 12 : prev + 1));
      setSimulatedSpeed((prev) => {
        const delta = (Math.random() - 0.5) * 8;
        return Math.max(35, Math.min(85, Math.round(prev + delta)));
      });
      setCheckInDueInSeconds((prev) => (prev <= 1 ? 600 : prev - 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [isGpsSimulating, activeTrip]);

  const toggleGpsSimulation = () => {
    setIsGpsSimulating(!isGpsSimulating);
  };

  const toggleRouteDeviation = () => {
    setIsRouteDeviated(!isRouteDeviated);
  };

  const openSosModal = () => setIsSosModalOpen(true);
  const closeSosModal = () => setIsSosModalOpen(false);

  const triggerSosAlert = () => {
    setSosStatus('triggered');
  };

  const resetSosAlert = () => {
    setSosStatus('idle');
    setIsSosModalOpen(false);
  };

  const completeCheckIn = () => {
    setCheckInDueInSeconds(600); // 10 minutes reset
  };

  const toggleWishlist = (destinationId: string) => {
    setWishlist((prev) => 
      prev.includes(destinationId) ? prev.filter((id) => id !== destinationId) : [...prev, destinationId]
    );
  };

  const updateBookingDraft = (data: Partial<AppContextType['bookingDraft']>) => {
    setBookingDraft((prev) => ({ ...prev, ...data }));
  };

  const openBookingModal = (model?: BookingModel, prefillDestination?: ScenicDestination) => {
    if (model) {
      setBookingDraft((prev) => ({
        ...prev,
        model,
        ...(prefillDestination ? {
          destination: prefillDestination.title,
          durationHours: prefillDestination.durationHours,
          mood: prefillDestination.mood,
          isDestinationFree: false
        } : {})
      }));
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const confirmBooking = (paymentMethod: string): Booking => {
    const selectedVeh = vehicles.find((v) => v.id === bookingDraft.selectedVehicleId) || vehicles[0];
    const selectedDrv = drivers.find((d) => d.id === bookingDraft.selectedDriverId) || drivers[0];

    const isDriverOnly = bookingDraft.model === 'driver_for_my_car';
    const hourlyDrvRate = selectedDrv.hourlyRate;
    const hourlyVehRate = isDriverOnly ? 0 : selectedVeh.baseHourlyRate;
    const hours = bookingDraft.durationHours;

    const baseFare = 499;
    const hourlyDriverCharge = hourlyDrvRate * hours;
    const vehicleRentalCharge = hourlyVehRate * hours;
    const estimatedFuelAllowance = isDriverOnly ? 0 : Math.round(hours * 220);
    const tollsAndPermits = Math.round(hours * 50);
    const nightDriveSurcharge = bookingDraft.startTime.includes('AM') && parseInt(bookingDraft.startTime) < 5 ? 300 : 0;
    const platformFee = 99;
    const subtotal = baseFare + hourlyDriverCharge + vehicleRentalCharge + estimatedFuelAllowance + tollsAndPermits + nightDriveSurcharge + platformFee;
    const discount = Math.round(subtotal * 0.05);
    const taxes = Math.round((subtotal - discount) * 0.05);
    const total = subtotal - discount + taxes;

    const newBooking: Booking = {
      id: `KM-${Date.now().toString().slice(-6)}`,
      bookingModel: bookingDraft.model,
      customerName: 'Yashvi Surana',
      customerPhone: '+91 99887 76655',
      pickupLocation: bookingDraft.pickup,
      destination: bookingDraft.isDestinationFree ? 'Destination-Free Scenic Journey' : bookingDraft.destination,
      isDestinationFree: bookingDraft.isDestinationFree,
      date: bookingDraft.date,
      startTime: bookingDraft.startTime,
      durationHours: bookingDraft.durationHours,
      passengers: bookingDraft.passengers,
      mood: bookingDraft.mood,
      vehicle: isDriverOnly ? undefined : selectedVeh,
      driver: selectedDrv,
      userCarDetails: isDriverOnly ? bookingDraft.userCar : undefined,
      stops: bookingDraft.isDestinationFree ? ['Scenic Viewpoint Break', 'Chai & Sunrise Stop'] : ['En-Route Coffee Lounge', 'Overlook Point'],
      fareBreakdown: {
        baseFare,
        hourlyDriverCharge,
        vehicleRentalCharge,
        estimatedFuelAllowance,
        tollsAndPermits,
        nightDriveSurcharge,
        platformFee,
        taxes,
        discount,
        total
      },
      status: 'Scheduled',
      paymentStatus: 'Paid (Demo Razorpay)',
      paymentMethod,
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateDriverStatus = (driverId: string, status: 'Verified' | 'Rejected' | 'Pending') => {
    setDrivers((prev) =>
      prev.map((drv) =>
        drv.id === driverId
          ? {
              ...drv,
              verificationStatus: status,
              documents: drv.documents.map((d) => ({ ...d, status }))
            }
          : drv
      )
    );
  };

  const addNewVehicleListing = (vehData: Omit<Vehicle, 'id' | 'rating' | 'verificationStatus'>) => {
    const newVehicle: Vehicle = {
      ...vehData,
      id: `veh-${Date.now()}`,
      rating: 5.0,
      verificationStatus: 'Verified'
    };
    setVehicles((prev) => [newVehicle, ...prev]);
  };

  const addStopVote = (stopId: string) => {
    setGroupTrip((prev) => ({
      ...prev,
      stops: prev.stops.map((s) => (s.id === stopId ? { ...s, votes: s.votes + 1 } : s))
    }));
  };

  const addGroupStop = (name: string) => {
    if (!name.trim()) return;
    setGroupTrip((prev) => ({
      ...prev,
      stops: [
        ...prev.stops,
        {
          id: `stp-${Date.now()}`,
          name: name.trim(),
          votes: 1,
          addedBy: 'You'
        }
      ]
    }));
  };

  const addEmergencyContact = (contact: Omit<EmergencyContact, 'id'>) => {
    const newContact: EmergencyContact = {
      ...contact,
      id: `em-${Date.now()}`
    };
    setEmergencyContacts((prev) => [...prev, newContact]);
  };

  const removeEmergencyContact = (id: string) => {
    setEmergencyContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        drivers,
        vehicles,
        destinations,
        emergencyContacts,
        bookings,
        activeTrip,
        tripMemories,
        wishlist,
        toggleWishlist,
        bookingDraft,
        updateBookingDraft,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        confirmBooking,
        tripProgress,
        simulatedSpeed,
        isGpsSimulating,
        toggleGpsSimulation,
        isRouteDeviated,
        toggleRouteDeviation,
        isSosModalOpen,
        openSosModal,
        closeSosModal,
        triggerSosAlert,
        sosStatus,
        resetSosAlert,
        checkInDueInSeconds,
        completeCheckIn,
        updateDriverStatus,
        addNewVehicleListing,
        groupTrip,
        addStopVote,
        addGroupStop,
        addEmergencyContact,
        removeEmergencyContact
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
