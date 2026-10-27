import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookingModel } from '../types';
import { 
  Calculator, 
  Car, 
  UserCheck, 
  Clock, 
  Navigation, 
  ShieldCheck, 
  Info, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Receipt
} from 'lucide-react';

export const SmartPricingEngine: React.FC = () => {
  const { vehicles, drivers, openBookingModal, updateBookingDraft } = useApp();

  const [model, setModel] = useState<BookingModel>('vehicle_and_driver');
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState<string>('Comfort SUV');
  const [hours, setHours] = useState<number>(4);
  const [distanceKm, setDistanceKm] = useState<number>(100);
  const [isEarlyMorningOrNight, setIsEarlyMorningOrNight] = useState<boolean>(false);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);

  // Fare calculation metrics
  const isDriverOnly = model === 'driver_for_my_car';

  const baseBookingFee = 150; // INR platform & coordination charge
  const driverHourlyRate = isDriverOnly ? 200 : 150; // INR per hr
  
  // Average vehicle hourly rates per category
  const vehicleRates: Record<string, { hourly: number; includedKmPerHr: number; extraKmRate: number }> = {
    'Comfort Sedan': { hourly: 280, includedKmPerHr: 20, extraKmRate: 14 },
    'Comfort SUV': { hourly: 350, includedKmPerHr: 22, extraKmRate: 16 },
    'Electric SUV': { hourly: 320, includedKmPerHr: 25, extraKmRate: 15 },
    'Adventure 4x4': { hourly: 420, includedKmPerHr: 20, extraKmRate: 18 },
    'Family 7-Seater': { hourly: 450, includedKmPerHr: 22, extraKmRate: 18 },
  };

  const selectedTier = vehicleRates[selectedVehicleCategory] || vehicleRates['Comfort SUV'];
  const vehicleHourlyRate = isDriverOnly ? 0 : selectedTier.hourly;

  const includedKm = isDriverOnly ? 999 : hours * selectedTier.includedKmPerHr;
  const extraKm = Math.max(0, distanceKm - includedKm);
  const extraKmRate = isDriverOnly ? 0 : selectedTier.extraKmRate;
  const extraKmCharge = extraKm * extraKmRate;

  const driverCharge = hours * driverHourlyRate;
  const vehicleCharge = hours * vehicleHourlyRate;
  const fuelAllowance = isDriverOnly ? 0 : distanceKm * 9; // INR ~9/km estimated fuel
  const tollAndPermitAllowance = 150; // standard scenic checkpoint permit
  const nightSurge = isEarlyMorningOrNight ? 450 : 0; // flat dawn/dusk convenience allowance
  const overtimeRatePerHour = isDriverOnly ? 400 : selectedTier.hourly + 350;
  const totalOvertimeEstimate = overtimeHours * overtimeRatePerHour;

  const subtotal = baseBookingFee + driverCharge + vehicleCharge + fuelAllowance + extraKmCharge + tollAndPermitAllowance + nightSurge;
  const privilegeDiscount = Math.round(subtotal * 0.05); // 5% discount for demo
  const taxableTotal = subtotal - privilegeDiscount;
  const gst = Math.round(taxableTotal * 0.05); // 5% transport service GST
  const totalFare = taxableTotal + gst;

  const handleBookPackage = () => {
    updateBookingDraft({
      model,
      durationHours: hours,
      budget: totalFare,
      startTime: isEarlyMorningOrNight ? '04:30 AM' : '09:00 AM'
    });
    openBookingModal(model);
  };

  return (
    <section className="py-12 bg-grey-950/70 backdrop-blur-xl border-t border-grey-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-xs font-mono text-yellow-400 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>KRYNKET SMART PRICING ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Honest, Transparent Fare Calculator. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-white neon-glow-text">
                No Hidden Surges. Zero Guesswork.
              </span>
            </h2>
          </div>
          <p className="text-sm text-grey-400 max-w-md">
            Simulate journey duration, vehicle tier, and driver allowances. See the complete penny-accurate price breakdown before booking.
          </p>
        </div>

        {/* PACKAGE QUICK TIERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Sunrise Express', hours: 2, dist: 50, tag: 'Quick Escape', desc: 'Short sprint for morning chai and panoramic photo stops.' },
            { name: 'Half-Day Scenic', hours: 4, dist: 100, tag: 'Most Popular', desc: 'Ideal for Nandi Hills, coastal dawn or sunset drives.' },
            { name: 'Full Mountain Day', hours: 8, dist: 220, tag: 'High-Altitude', desc: 'Perfect for Ghat roads, Sakleshpur or Mysore trails.' },
            { name: 'Weekend Expedition', hours: 12, dist: 350, tag: 'Maximum Freedom', desc: 'Full-day roadtrip with multi-point stops and friends.' },
          ].map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => { setHours(pkg.hours); setDistanceKm(pkg.dist); }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                hours === pkg.hours
                  ? 'bg-grey-900 border-yellow-400 shadow-neon-card'
                  : 'bg-grey-900/60 border-grey-800 hover:border-grey-700 hover:bg-grey-900/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-400 border border-yellow-400/30">
                  {pkg.tag}
                </span>
                <span className="text-xs text-grey-400 font-mono">{pkg.hours} Hours</span>
              </div>
              <h4 className="font-bold text-base text-white mb-1">{pkg.name}</h4>
              <p className="text-xs text-grey-400 leading-relaxed mb-3">{pkg.desc}</p>
              <div className="text-[11px] text-yellow-400 font-semibold flex items-center gap-1">
                <span>Includes {pkg.dist} km</span>
              </div>
            </div>
          ))}
        </div>

        {/* INTERACTIVE CALCULATOR ENGINE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-grey-900/80 backdrop-blur-xl rounded-3xl border border-grey-700/80 p-6 sm:p-8 space-y-6">
            
            {/* Booking Model Switch */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-grey-400 mb-2">
                Select Model:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setModel('vehicle_and_driver')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                    model === 'vehicle_and_driver'
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-grey-950 font-bold shadow-neon-yellow'
                      : 'bg-grey-950/80 border-grey-800 text-grey-400 hover:text-white'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>Model A: Vehicle + Driver</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModel('driver_for_my_car')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                    model === 'driver_for_my_car'
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-grey-950 font-bold shadow-neon-yellow'
                      : 'bg-grey-950/80 border-grey-800 text-grey-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Model B: Driver for My Car</span>
                </button>
              </div>
            </div>

            {/* Vehicle Category (If Model A) */}
            {!isDriverOnly && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-grey-400 mb-2">
                  Vehicle Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    'Comfort Sedan',
                    'Comfort SUV',
                    'Electric SUV',
                    'Adventure 4x4',
                    'Family 7-Seater'
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedVehicleCategory(cat)}
                      className={`p-2.5 rounded-xl border text-center transition-colors truncate ${
                        selectedVehicleCategory === cat
                          ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-semibold shadow-[0_0_12px_rgba(255,230,0,0.2)]'
                          : 'bg-grey-950/80 border-grey-800 text-grey-300 hover:border-grey-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Duration Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono uppercase text-grey-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-yellow-400" /> Journey Duration:
                </span>
                <span className="font-bold text-white font-mono text-sm">{hours} Hours</span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                step="1"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-yellow-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-grey-500 font-mono mt-1">
                <span>2h (Min)</span>
                <span>4h</span>
                <span>8h (Half Day)</span>
                <span>12h (Full Day)</span>
                <span>16h</span>
              </div>
            </div>

            {/* Distance Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono uppercase text-grey-400 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-amber-400" /> Estimated Distance:
                </span>
                <span className="font-bold text-white font-mono text-sm">{distanceKm} km</span>
              </div>
              <input
                type="range"
                min="30"
                max="400"
                step="10"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-yellow-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-grey-500 font-mono mt-1">
                <span>30 km</span>
                <span>Included: {includedKm} km</span>
                <span>{extraKm > 0 ? `+${extraKm} km extra` : 'No extra km fee'}</span>
                <span>400 km</span>
              </div>
            </div>

            {/* Time Window (Early morning / Late night surge toggle) */}
            <div className="p-3.5 rounded-2xl bg-grey-950/80 border border-grey-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Pre-Dawn / Midnight Departure</div>
                <div className="text-[11px] text-grey-400">Departure between 11:00 PM and 05:00 AM</div>
              </div>
              <button
                type="button"
                onClick={() => setIsEarlyMorningOrNight(!isEarlyMorningOrNight)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  isEarlyMorningOrNight ? 'bg-yellow-400 shadow-neon-yellow' : 'bg-grey-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-grey-950 absolute top-0.5 transition-transform ${
                  isEarlyMorningOrNight ? 'left-6.5' : 'left-0.5'
                }`} />
              </button>
            </div>

            {/* Overtime Calculator */}
            <div className="p-4 rounded-2xl bg-grey-950/80 border border-grey-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase text-grey-400">Overtime Protection Simulator:</span>
                <span className="font-mono text-yellow-400 font-bold">₹{overtimeRatePerHour}/hr flat</span>
              </div>
              <p className="text-[11px] text-grey-400">
                If your scenic journey extends past {hours} hours, overtime requires in-app customer confirmation.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs text-grey-300">Simulate +{overtimeHours} Overtime Hour(s):</span>
                <span className="text-xs font-mono font-bold text-white">+₹{totalOvertimeEstimate}</span>
              </div>
            </div>

          </div>

          {/* Breakdown Card Column */}
          <div className="lg:col-span-5 bg-grey-900/85 backdrop-blur-2xl rounded-3xl border border-grey-700/80 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="pb-4 border-b border-grey-800">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                GUARANTEED ESTIMATE
              </span>
              <div className="text-3xl font-display font-black text-white mt-2">
                ₹{totalFare.toLocaleString()}
              </div>
              <p className="text-xs text-grey-400 mt-1">
                For {hours} Hours • {distanceKm} km • {isDriverOnly ? 'Personal Car + Chauffeur' : selectedVehicleCategory}
              </p>
            </div>

            {/* Itemized Line Items */}
            <div className="space-y-2.5 text-xs text-grey-300">
              <div className="flex justify-between">
                <span>Base Platform Escort Charge</span>
                <span className="font-mono text-white">₹{baseBookingFee}</span>
              </div>

              <div className="flex justify-between">
                <span>Professional Chauffeur ({hours}h @ ₹{driverHourlyRate}/h)</span>
                <span className="font-mono text-white">₹{driverCharge}</span>
              </div>

              {!isDriverOnly ? (
                <div className="flex justify-between">
                  <span>Vehicle Hire ({hours}h @ ₹{vehicleHourlyRate}/h)</span>
                  <span className="font-mono text-white">₹{vehicleCharge}</span>
                </div>
              ) : (
                <div className="flex justify-between text-yellow-400">
                  <span>Own Car Hire: Zero Fleet Rental</span>
                  <span className="font-mono">₹0</span>
                </div>
              )}

              {!isDriverOnly && (
                <div className="flex justify-between">
                  <span>Fuel Allowance ({distanceKm} km @ ₹9/km)</span>
                  <span className="font-mono text-white">₹{fuelAllowance}</span>
                </div>
              )}

              {extraKmCharge > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Additional Kilometres ({extraKm} km @ ₹{extraKmRate}/km)</span>
                  <span className="font-mono">₹{extraKmCharge}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Tolls & Scenic Checkpost Allowance</span>
                <span className="font-mono text-white">₹{tollAndPermitAllowance}</span>
              </div>

              {nightSurge > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>Early Morning / Midnight Window Fee</span>
                  <span className="font-mono">₹{nightSurge}</span>
                </div>
              )}

              <div className="flex justify-between text-yellow-400 pt-2 border-t border-grey-800">
                <span>Krynket Loyalty Privilege (5%)</span>
                <span className="font-mono">-₹{privilegeDiscount}</span>
              </div>

              <div className="flex justify-between text-grey-400">
                <span>Statutory GST (5%)</span>
                <span className="font-mono text-grey-300">₹{gst}</span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="p-4 rounded-2xl bg-grey-950/80 border border-grey-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Total Guaranteed Fare</div>
                <div className="text-[10px] text-grey-500 font-mono">No unexpected surge multiplies</div>
              </div>
              <div className="text-xl font-display font-black text-yellow-400 neon-glow-text">
                ₹{totalFare.toLocaleString()}
              </div>
            </div>

            {/* Instant Book CTA */}
            <button
              onClick={handleBookPackage}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 text-grey-950 font-black text-sm shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all text-center"
            >
              Book this {hours}-Hour Package
            </button>

            <div className="text-[10px] text-grey-500 font-mono text-center flex items-center justify-center gap-1">
              <Info className="w-3 h-3" />
              <span>Configurable demo rates. Clearly distinct from third-party cab surge algorithms.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
