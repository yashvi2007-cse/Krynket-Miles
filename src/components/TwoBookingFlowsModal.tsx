import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookingModel, Vehicle, Driver } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Car, 
  UserCheck, 
  Check, 
  ShieldCheck, 
  Star, 
  Clock, 
  Compass, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  Users, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Info,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Sliders,
  AlertCircle
} from 'lucide-react';

export const TwoBookingFlowsModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    closeBookingModal, 
    bookingDraft, 
    updateBookingDraft, 
    vehicles, 
    drivers, 
    confirmBooking 
  } = useApp();

  const [step, setStep] = useState<number>(1);
  // Step 1: Model & Trip Details
  // Step 2: Vehicle & Driver Selection (or Driver selection for Model B)
  // Step 3: Fare Breakdown & Preferences
  // Step 4: Demo Razorpay Checkout & Confirmation

  const [paymentMethod, setPaymentMethod] = useState<string>('UPI (Google Pay / PhonePe / Paytm)');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isBookingModalOpen) return null;

  const isModelA = bookingDraft.model === 'vehicle_and_driver';
  const selectedVehicle = vehicles.find((v) => v.id === bookingDraft.selectedVehicleId) || vehicles[0];
  const selectedDriver = drivers.find((d) => d.id === bookingDraft.selectedDriverId) || drivers[0];

  // Price calculations
  const hours = bookingDraft.durationHours;
  const driverCost = selectedDriver.hourlyRate * hours;
  const vehicleCost = isModelA ? selectedVehicle.baseHourlyRate * hours : 0;
  const baseServiceFee = 399;
  const estimatedFuelAllowance = isModelA ? Math.round(hours * 220) : 0;
  const tollsAllowance = Math.round(hours * 50);
  const nightSurge = bookingDraft.startTime.includes('AM') && parseInt(bookingDraft.startTime) < 5 ? 300 : 0;
  const subtotal = baseServiceFee + driverCost + vehicleCost + estimatedFuelAllowance + tollsAllowance + nightSurge;
  const loyaltyDiscount = Math.round(subtotal * 0.05);
  const taxes = Math.round((subtotal - loyaltyDiscount) * 0.05);
  const grandTotal = subtotal - loyaltyDiscount + taxes;

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCompletePayment = () => {
    const booking = confirmBooking(paymentMethod);
    setConfirmedBookingId(booking.id);
    setStep(4);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-grey-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-grey-900 border border-grey-750/90 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-grey-800 flex items-center justify-between bg-grey-950/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400">
                {isModelA ? 'MODEL A — VEHICLE + DRIVER' : 'MODEL B — DRIVER FOR MY OWN CAR'}
              </span>
              <span className="text-xs text-slate-400 font-mono">Step {step} of 4</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              {step === 1 && 'Configure Your Journey Blueprint'}
              {step === 2 && (isModelA ? 'Choose Vehicle & Professional Driver' : 'Configure Your Car & Select Chauffeur')}
              {step === 3 && 'Transparent Fare Breakdown & Preferences'}
              {step === 4 && 'Journey Confirmed & Voucher Issued'}
            </h3>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-2 rounded-xl bg-grey-800 text-slate-400 hover:text-white hover:bg-grey-750 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with dynamic steps */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Model Choice & Trip Logistics */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Model Choice Radio Cards */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Select Booking Category:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => updateBookingDraft({ model: 'vehicle_and_driver' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isModelA
                        ? 'bg-grey-850 border-yellow-400 shadow-neon-yellow'
                        : 'bg-grey-950 border-grey-800 hover:border-grey-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
                        <Car className="w-5 h-5" />
                      </div>
                      {isModelA && <CheckCircle2 className="w-5 h-5 text-yellow-400" />}
                    </div>
                    <div className="text-base font-bold text-white mb-1">Book Vehicle + Chauffeur</div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      Choose from luxury sedans, scenic SUVs, open-top convertibles or EVs paired with certified chauffeurs.
                    </div>
                  </div>

                  <div
                    onClick={() => updateBookingDraft({ model: 'driver_for_my_car' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      !isModelA
                        ? 'bg-grey-850 border-yellow-400 shadow-neon-yellow'
                        : 'bg-grey-950 border-grey-800 hover:border-grey-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      {!isModelA && <CheckCircle2 className="w-5 h-5 text-yellow-400" />}
                    </div>
                    <div className="text-base font-bold text-white mb-1">Hire Driver for My Car</div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      You own a car and want stress-free travel. Hire a verified chauffeur to drive your personal car.
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Logistics Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-grey-950 border border-grey-800">
                  <label className="block text-[11px] uppercase font-mono text-slate-400 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-yellow-400" /> Pickup Address
                  </label>
                  <input
                    type="text"
                    value={bookingDraft.pickup}
                    onChange={(e) => updateBookingDraft({ pickup: e.target.value })}
                    className="w-full bg-transparent text-sm text-white font-medium focus:outline-none"
                    placeholder="e.g. Indiranagar, Bengaluru"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-grey-950 border border-grey-800">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] uppercase font-mono text-slate-400 flex items-center gap-1">
                      <Compass className="w-3 h-3 text-yellow-400" /> Destination
                    </label>
                    <button
                      type="button"
                      onClick={() => updateBookingDraft({ isDestinationFree: !bookingDraft.isDestinationFree })}
                      className="text-[10px] text-yellow-400 underline"
                    >
                      {bookingDraft.isDestinationFree ? 'Set fixed destination' : 'Switch to Destination-Free'}
                    </button>
                  </div>
                  {bookingDraft.isDestinationFree ? (
                    <div className="text-sm font-semibold text-yellow-400">
                      Destination-Free Spontaneous Drive
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={bookingDraft.destination}
                      onChange={(e) => updateBookingDraft({ destination: e.target.value })}
                      className="w-full bg-transparent text-sm text-white font-medium focus:outline-none"
                      placeholder="e.g. Nandi Hills Peak"
                    />
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-grey-950 border border-grey-800">
                  <label className="block text-[11px] uppercase font-mono text-slate-400 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-yellow-400" /> Date & Departure Time
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={bookingDraft.date}
                      onChange={(e) => updateBookingDraft({ date: e.target.value })}
                      className="bg-transparent text-xs text-white focus:outline-none flex-1"
                    />
                    <input
                      type="text"
                      value={bookingDraft.startTime}
                      onChange={(e) => updateBookingDraft({ startTime: e.target.value })}
                      className="w-24 bg-transparent text-xs text-yellow-400 font-mono font-bold focus:outline-none text-right"
                      placeholder="04:30 AM"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-grey-950 border border-grey-800">
                  <label className="block text-[11px] uppercase font-mono text-slate-400 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-yellow-400" /> Duration
                  </label>
                  <select
                    value={bookingDraft.durationHours}
                    onChange={(e) => updateBookingDraft({ durationHours: Number(e.target.value) })}
                    className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                  >
                    <option value={2} className="bg-grey-900">2 Hours (Express City Cruise)</option>
                    <option value={4} className="bg-grey-900">4 Hours (Sunrise / Sunset Half-Day)</option>
                    <option value={6} className="bg-grey-900">6 Hours (Scenic Escape)</option>
                    <option value={8} className="bg-grey-900">8 Hours (Full Mountain Day)</option>
                    <option value={12} className="bg-grey-900">12 Hours (Weekend Explorer)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Vehicle & Driver Selection */}
          {step === 2 && (
            <div className="space-y-6">
              
              {/* MODEL B: USER CAR DETAILS CONFIGURATOR */}
              {!isModelA && (
                <div className="p-4 rounded-2xl bg-grey-950 border border-grey-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-yellow-400 font-semibold">
                    <Car className="w-4 h-4" /> Enter Your Personal Car Specifications
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Vehicle Brand & Model</label>
                      <input
                        type="text"
                        value={bookingDraft.userCar?.brand ? `${bookingDraft.userCar.brand} ${bookingDraft.userCar.model}` : 'BMW 330i M Sport'}
                        onChange={(e) => updateBookingDraft({ 
                          userCar: { ...bookingDraft.userCar!, brand: e.target.value, model: '' } 
                        })}
                        className="w-full p-2.5 rounded-xl bg-grey-900 border border-grey-700 text-white font-medium focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Transmission</label>
                      <select
                        value={bookingDraft.userCar?.transmission || 'Automatic'}
                        onChange={(e) => updateBookingDraft({ 
                          userCar: { ...bookingDraft.userCar!, transmission: e.target.value as any } 
                        })}
                        className="w-full p-2.5 rounded-xl bg-grey-900 border border-grey-700 text-white font-medium focus:outline-none cursor-pointer"
                      >
                        <option value="Automatic">Automatic (Torque Converter / DCT / CVT)</option>
                        <option value="Manual">Manual (Stick Shift with Clutch)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Car Registration No.</label>
                      <input
                        type="text"
                        value={bookingDraft.userCar?.registrationNumber || 'KA 03 MZ 9999'}
                        onChange={(e) => updateBookingDraft({ 
                          userCar: { ...bookingDraft.userCar!, registrationNumber: e.target.value } 
                        })}
                        className="w-full p-2.5 rounded-xl bg-grey-900 border border-grey-700 text-white font-medium focus:outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* MODEL A: VEHICLE SELECTION CARDS */}
              {isModelA && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-yellow-400" /> Choose Verified Fleet Vehicle:
                    </label>
                    <span className="text-xs text-yellow-400 font-mono">
                      {vehicles.length} Available in Bengaluru
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {vehicles.map((veh) => {
                      const isSelected = bookingDraft.selectedVehicleId === veh.id;
                      return (
                        <div
                          key={veh.id}
                          onClick={() => updateBookingDraft({ selectedVehicleId: veh.id })}
                          className={`rounded-2xl border p-3 cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-grey-850 border-yellow-400 shadow-neon-yellow'
                              : 'bg-grey-950/70 border-grey-800 hover:border-grey-700'
                          }`}
                        >
                          <div>
                            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-2">
                              <img src={veh.image} alt={veh.name} className="w-full h-full object-cover" />
                              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-grey-950/80 backdrop-blur-md text-[10px] font-mono text-yellow-400 border border-yellow-400/30">
                                {veh.category}
                              </div>
                            </div>
                            <div className="font-bold text-sm text-white leading-tight mb-1">{veh.name}</div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                              <span>{veh.seats} Seats</span>
                              <span>•</span>
                              <span>{veh.transmission}</span>
                              <span>•</span>
                              <span>{veh.fuelType}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-grey-800/80 flex items-center justify-between">
                            <div>
                              <div className="text-[10px] font-mono text-slate-500">Hourly Rate</div>
                              <div className="text-sm font-bold text-yellow-400 font-display">
                                ₹{veh.baseHourlyRate}/hr
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                              isSelected ? 'bg-yellow-400 text-grey-950 font-bold shadow-neon-yellow' : 'border border-grey-700 text-transparent'
                            }`}>
                              ✓
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* DRIVER SELECTION CARDS */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-yellow-400" /> Select Professional Chauffeur:
                  </label>
                  <span className="text-xs text-slate-400 font-mono">
                    All Aadhaar KYC + Police Cleared
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {drivers.map((drv) => {
                    const isSelected = bookingDraft.selectedDriverId === drv.id;
                    return (
                      <div
                        key={drv.id}
                        onClick={() => updateBookingDraft({ selectedDriverId: drv.id })}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-grey-850 border-yellow-400 shadow-neon-yellow'
                            : 'bg-grey-950/70 border-grey-800 hover:border-grey-700'
                        }`}
                      >
                        <img
                          src={drv.avatar}
                          alt={drv.name}
                          className="w-12 h-12 rounded-xl object-cover border border-grey-700 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <h4 className="text-sm font-bold text-white truncate">{drv.name}</h4>
                            <span className="text-xs font-bold text-yellow-400 font-mono shrink-0">
                              ₹{drv.hourlyRate}/hr
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                            <span className="flex items-center gap-0.5 text-amber-400">
                              <Star className="w-3 h-3 fill-amber-400" /> {drv.rating}
                            </span>
                            <span>•</span>
                            <span>{drv.experienceYears} yrs exp</span>
                            <span>•</span>
                            <span className="text-yellow-400">{drv.reliabilityScore}% Reliability</span>
                          </div>

                          <div className="text-[11px] text-slate-300 truncate mb-1">
                            {drv.specialty}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {drv.badges.slice(0, 2).map((b, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded bg-grey-800 text-[9px] font-mono text-yellow-400 border border-yellow-400/20">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Transparent Price Breakdown & Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              
              {/* Driving Preferences / Notes */}
              <div className="p-4 rounded-2xl bg-grey-950 border border-grey-800">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Special Driving & In-Cabin Preferences:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
                  {[
                    'Smooth & Defensive',
                    'Quiet Cabin Mode',
                    'Curated Jazz / Lo-Fi',
                    'Scenic Route Only',
                    'Sunrise Chai Stop',
                    'Panoramic Sunroof Open',
                    'Zero Jerky Braking',
                    'Pet Friendly'
                  ].map((pref) => {
                    const isChecked = bookingDraft.drivingPreferences?.includes(pref);
                    return (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => {
                          const current = bookingDraft.drivingPreferences || [];
                          const next = isChecked ? current.filter((p) => p !== pref) : [...current, pref];
                          updateBookingDraft({ drivingPreferences: next });
                        }}
                        className={`px-3 py-2 rounded-xl text-left font-medium border transition-colors ${
                          isChecked
                            ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-semibold'
                            : 'bg-grey-900 border-grey-800 text-slate-300 hover:border-grey-700'
                        }`}
                      >
                        {pref}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TRANSPARENT PRICING BREAKDOWN */}
              <div className="p-5 rounded-2xl bg-grey-950 border border-grey-800 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-grey-800">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Krynket Transparent Fare Engine
                  </div>
                  <div className="text-[11px] font-mono text-yellow-400">
                    {hours} Hours Package
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Base Chauffeur Service Fee</span>
                    <span className="font-mono text-white">₹{baseServiceFee}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Professional Chauffeur ({selectedDriver.name} • {hours} hrs @ ₹{selectedDriver.hourlyRate}/hr)
                    </span>
                    <span className="font-mono text-white">₹{driverCost}</span>
                  </div>

                  {isModelA ? (
                    <div className="flex justify-between">
                      <span>
                        Vehicle Rental ({selectedVehicle.name} • {hours} hrs @ ₹{selectedVehicle.baseHourlyRate}/hr)
                      </span>
                      <span className="font-mono text-white">₹{vehicleCost}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-yellow-400">
                      <span>Personal Car Mode: Zero Vehicle Rental Fee</span>
                      <span className="font-mono">₹0</span>
                    </div>
                  )}

                  {isModelA && (
                    <div className="flex justify-between">
                      <span>Fuel & Lubricant Allowance (Estimated {hours * 25} km)</span>
                      <span className="font-mono text-white">₹{estimatedFuelAllowance}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Tolls, Parking & State Transit Allowance</span>
                    <span className="font-mono text-white">₹{tollsAllowance}</span>
                  </div>

                  {nightSurge > 0 && (
                    <div className="flex justify-between text-amber-400">
                      <span>Pre-Dawn Early Window Allowance (Departure before 05:00 AM)</span>
                      <span className="font-mono">₹{nightSurge}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-yellow-400">
                    <span>Krynket Miles Member Privilege Discount (5%)</span>
                    <span className="font-mono">-₹{loyaltyDiscount}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>GST & Statutory Taxes (5%)</span>
                    <span className="font-mono text-slate-300">₹{taxes}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-grey-800 flex items-center justify-between">
                  <div>
                    <div className="text-base font-bold text-white">Total Guaranteed Estimate</div>
                    <div className="text-[10px] text-slate-400">Overtime rate: ₹{selectedDriver.hourlyRate + (isModelA ? 350 : 50)}/hr after {hours}h</div>
                  </div>
                  <div className="text-2xl font-display font-black text-yellow-400">
                    ₹{grandTotal.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Payment Method Selector (Razorpay Ready) */}
              <div className="p-4 rounded-2xl bg-grey-950 border border-grey-800">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Select Demo Payment Method:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  {[
                    { label: 'UPI (GPay / PhonePe / Paytm)', icon: Smartphone },
                    { label: 'Credit / Debit Card (Visa/MC)', icon: CreditCard },
                    { label: 'NetBanking (HDFC / ICICI)', icon: Building2 },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    const isSelected = paymentMethod === pm.label;
                    return (
                      <button
                        key={pm.label}
                        type="button"
                        onClick={() => setPaymentMethod(pm.label)}
                        className={`p-3 rounded-xl border flex items-center gap-2.5 transition-colors ${
                          isSelected
                            ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-semibold shadow-neon-yellow'
                            : 'bg-grey-900 border-grey-800 text-slate-300 hover:border-grey-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-yellow-400" />
                        <span className="truncate">{pm.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  <span>Demo checkout mode. No real bank or credit card charge will be made.</span>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Journey Voucher & Success */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-yellow-400/20 border border-yellow-400 text-yellow-400 flex items-center justify-center mx-auto shadow-neon-yellow">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-yellow-400/15 text-yellow-400 text-xs font-mono font-bold">
                  BOOKING CONFIRMED • VOUCHER ISSUED
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-2">
                  Ready For The Open Road!
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Booking ID <strong className="font-mono text-yellow-400">{confirmedBookingId || 'KM-CONFIRMED'}</strong> has been scheduled in the Krynket Miles Ecosystem.
                </p>
              </div>

              {/* Digital Voucher Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-grey-950 border border-grey-800 text-left space-y-3 text-xs shadow-2xl">
                <div className="flex justify-between items-center pb-2 border-b border-grey-800">
                  <span className="font-mono font-bold text-white text-sm">KRYNKET MILES VOUCHER</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-400">
                    Confirmed
                  </span>
                </div>

                <div className="space-y-1 text-slate-300">
                  <div><strong>Pickup:</strong> {bookingDraft.pickup}</div>
                  <div><strong>Destination:</strong> {bookingDraft.isDestinationFree ? 'Destination-Free Scenic Journey' : bookingDraft.destination}</div>
                  <div><strong>Date & Time:</strong> {bookingDraft.date} at {bookingDraft.startTime} ({hours} Hours)</div>
                  <div><strong>Assigned Chauffeur:</strong> {selectedDriver.name} ({selectedDriver.phone})</div>
                  {isModelA ? (
                    <div><strong>Vehicle:</strong> {selectedVehicle.name} ({selectedVehicle.licensePlate})</div>
                  ) : (
                    <div><strong>Personal Car:</strong> {bookingDraft.userCar?.brand} {bookingDraft.userCar?.model} ({bookingDraft.userCar?.registrationNumber})</div>
                  )}
                  <div><strong>Payment:</strong> Paid ₹{grandTotal.toLocaleString()} via {paymentMethod}</div>
                </div>

                <div className="pt-2 border-t border-grey-800 text-[11px] text-yellow-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  <span>Krynket Safety Shield Telemetry & SOS Emergency ready.</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={closeBookingModal}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-grey-950 font-bold text-xs shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all"
                >
                  Done & Return to App
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="p-4 sm:p-6 border-t border-grey-800 bg-grey-950/80 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl bg-grey-800 hover:bg-grey-750 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              {step === 3 ? (
                <button
                  type="button"
                  onClick={handleCompletePayment}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-grey-950 font-bold text-sm shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Confirm & Authorize (₹{grandTotal.toLocaleString()})</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-grey-950 font-bold text-sm shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
