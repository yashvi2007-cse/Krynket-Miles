import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookingModel, JourneyMood } from '../types';
import { 
  Car, 
  UserCheck, 
  Compass, 
  Sparkles, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee, 
  Sunrise, 
  Sunset, 
  Moon, 
  ArrowRight,
  Shield,
  CheckCircle2,
  Sliders,
  Zap
} from 'lucide-react';

interface HeroProps {
  onExploreExperiences: () => void;
  onOpenAiPlanner: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreExperiences, onOpenAiPlanner }) => {
  const { bookingDraft, updateBookingDraft, openBookingModal } = useApp();

  const [activeModel, setActiveModel] = useState<BookingModel>(bookingDraft.model);
  const [destinationFree, setDestinationFree] = useState<boolean>(bookingDraft.isDestinationFree);

  // Time preset badges for quick departure windows
  const departurePresets = [
    { label: 'Sunrise Escape', time: '04:30 AM', icon: Sunrise, mood: 'Peaceful' as JourneyMood, desc: 'Beat the dawn fog' },
    { label: 'Sunset Stories', time: '04:00 PM', icon: Sunset, mood: 'Romantic' as JourneyMood, desc: 'Golden hour coastal' },
    { label: 'Midnight Miles', time: '11:00 PM', icon: Moon, mood: 'Midnight' as JourneyMood, desc: 'Zero traffic skyline' },
    { label: 'Spontaneous Outing', time: '09:00 AM', icon: Zap, mood: 'Friends' as JourneyMood, desc: 'Weekend explorer' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBookingDraft({
      model: activeModel,
      isDestinationFree: destinationFree,
    });
    openBookingModal(activeModel);
  };

  return (
    <div className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background Ambient Glow & Automotive Gradient Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-yellow-400/10 blur-[140px]" />
        <div className="absolute top-32 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[160px]" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-grey-700/20 blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-center">

          <button 
            onClick={onOpenAiPlanner}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-xs text-yellow-400 hover:bg-yellow-400/20 hover:border-yellow-400/60 transition-all backdrop-blur-md shadow-[0_0_15px_rgba(255,230,0,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            <span>Try Krynket AI Journey Architect</span>
          </button>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-[1.08] mb-6">
            THE ROAD IS YOURS. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-white neon-glow-text">
              WE MAKE THE JOURNEY.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-grey-300 max-w-2xl mx-auto leading-relaxed font-normal">
            From spontaneous midnight loops to breathtaking sunrise escapes, discover a vibrant, smarter way to experience every mile.
          </p>

          {/* Direct CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openBookingModal('vehicle_and_driver')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 text-grey-950 font-black text-base shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 group"
            >
              <Car className="w-5 h-5 text-grey-950 group-hover:rotate-6 transition-transform" />
              <span>Plan Your Drive</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => openBookingModal('driver_for_my_car')}
              className="px-6 py-3.5 rounded-2xl bg-grey-900/90 border border-grey-700 hover:border-yellow-400/60 text-white font-semibold text-base shadow-glass hover:bg-grey-850 hover:shadow-neon-yellow active:scale-95 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <UserCheck className="w-5 h-5 text-yellow-400" />
              <span>Hire a Professional Driver</span>
            </button>

            <button
              onClick={onExploreExperiences}
              className="px-5 py-3.5 rounded-2xl bg-grey-900/70 border border-grey-800 text-grey-300 hover:text-white hover:border-grey-600 font-medium text-base transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-grey-400" />
              <span>Explore Experiences</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE BOOKING SEARCH PANEL */}
        <div className="max-w-5xl mx-auto bg-grey-900/80 backdrop-blur-2xl rounded-3xl border border-grey-700/80 p-4 sm:p-6 shadow-2xl relative">
          
          {/* Top Model Switcher Tabs: Model A vs Model B */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-grey-800">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-grey-950/90 border border-grey-800">
              <button
                type="button"
                onClick={() => { setActiveModel('vehicle_and_driver'); updateBookingDraft({ model: 'vehicle_and_driver' }); }}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeModel === 'vehicle_and_driver'
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-grey-950 shadow-neon-yellow font-bold'
                    : 'text-grey-400 hover:text-white'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>Model A: Vehicle + Driver</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveModel('driver_for_my_car'); updateBookingDraft({ model: 'driver_for_my_car' }); }}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeModel === 'driver_for_my_car'
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-grey-950 shadow-neon-yellow font-bold'
                    : 'text-grey-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Model B: Driver for My Own Car</span>
              </button>
            </div>

            {/* Destination-Free Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const nextVal = !destinationFree;
                  setDestinationFree(nextVal);
                  updateBookingDraft({ isDestinationFree: nextVal });
                }}
                className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                  destinationFree
                    ? 'bg-yellow-400/15 border-yellow-400/60 text-yellow-400 font-semibold shadow-[0_0_15px_rgba(255,230,0,0.2)]'
                    : 'bg-grey-950/90 border-grey-800 text-grey-400 hover:text-white'
                }`}
              >
                <Compass className={`w-3.5 h-3.5 ${destinationFree ? 'text-yellow-400 animate-spin' : ''}`} />
                <span>Destination-Free Mode</span>
                {destinationFree && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-neon-yellow" />}
              </button>
            </div>
          </div>

          {/* Quick Departure Window Presets */}
          <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-mono text-grey-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-400" /> Smart Windows:
            </span>
            {departurePresets.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => updateBookingDraft({ startTime: preset.time, mood: preset.mood })}
                  className={`px-3 py-1.5 rounded-xl text-xs shrink-0 flex items-center gap-1.5 transition-colors border ${
                    bookingDraft.startTime === preset.time
                      ? 'bg-yellow-400/15 border-yellow-400 text-yellow-400 font-semibold shadow-[0_0_12px_rgba(255,230,0,0.25)]'
                      : 'bg-grey-950/70 border-grey-800/80 text-grey-300 hover:border-grey-700'
                  }`}
                >
                  <Icon className="w-3 h-3 text-amber-400" />
                  <span>{preset.label}</span>
                  <span className="font-mono text-[10px] text-grey-400">({preset.time})</span>
                </button>
              );
            })}
          </div>

          {/* Booking Inputs Grid */}
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* 1. Pickup Location */}
              <div className="p-3 rounded-2xl bg-grey-950/80 border border-grey-800 focus-within:border-yellow-400 transition-colors">
                <label className="block text-[11px] uppercase font-mono tracking-wider text-grey-400 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-yellow-400" /> Pickup Location
                </label>
                <input
                  type="text"
                  value={bookingDraft.pickup}
                  onChange={(e) => updateBookingDraft({ pickup: e.target.value })}
                  placeholder="e.g. Indiranagar, Bengaluru"
                  className="w-full bg-transparent text-sm text-white font-medium focus:outline-none placeholder-grey-500"
                />
              </div>

              {/* 2. Destination or Destination-Free prompt */}
              <div className="p-3 rounded-2xl bg-grey-950/80 border border-grey-800 focus-within:border-yellow-400 transition-colors">
                <label className="block text-[11px] uppercase font-mono tracking-wider text-grey-400 mb-1 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-yellow-400" />
                  {destinationFree ? 'Exploration Mode' : 'Destination'}
                </label>
                {destinationFree ? (
                  <div className="text-sm font-semibold text-yellow-400 flex items-center justify-between">
                    <span>Roaming Without Fixed End</span>
                    <span className="text-[10px] font-mono text-grey-400">Time-based</span>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={bookingDraft.destination}
                    onChange={(e) => updateBookingDraft({ destination: e.target.value })}
                    placeholder="e.g. Nandi Hills / ECR Coastal"
                    className="w-full bg-transparent text-sm text-white font-medium focus:outline-none placeholder-grey-500"
                  />
                )}
              </div>

              {/* 3. Date & Start Time */}
              <div className="p-3 rounded-2xl bg-grey-950/80 border border-grey-800 focus-within:border-yellow-400 transition-colors">
                <label className="block text-[11px] uppercase font-mono tracking-wider text-grey-400 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-yellow-400" /> Date & Departure
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={bookingDraft.date}
                    onChange={(e) => updateBookingDraft({ date: e.target.value })}
                    className="bg-transparent text-xs text-white font-medium focus:outline-none flex-1"
                  />
                  <input
                    type="text"
                    value={bookingDraft.startTime}
                    onChange={(e) => updateBookingDraft({ startTime: e.target.value })}
                    placeholder="04:30 AM"
                    className="w-20 bg-transparent text-xs text-yellow-400 font-mono font-semibold focus:outline-none text-right"
                  />
                </div>
              </div>

              {/* 4. Duration Selector */}
              <div className="p-3 rounded-2xl bg-grey-950/80 border border-grey-800 focus-within:border-yellow-400 transition-colors">
                <label className="block text-[11px] uppercase font-mono tracking-wider text-grey-400 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-yellow-400" /> Duration
                </label>
                <select
                  value={bookingDraft.durationHours}
                  onChange={(e) => updateBookingDraft({ durationHours: Number(e.target.value) })}
                  className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value={2} className="bg-grey-900 text-white">2 Hours (Express Cruise)</option>
                  <option value={4} className="bg-grey-900 text-white">4 Hours (Sunrise / Sunset Half)</option>
                  <option value={6} className="bg-grey-900 text-white">6 Hours (Scenic Escape)</option>
                  <option value={8} className="bg-grey-900 text-white">8 Hours (Full Mountain Day)</option>
                  <option value={12} className="bg-grey-900 text-white">12 Hours (Weekend Roadtrip)</option>
                </select>
              </div>
            </div>

            {/* Secondary parameters: Passengers, Budget Guardian, Submit */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-4 text-xs text-grey-300">
                <div className="flex items-center gap-1.5 bg-grey-950/90 px-3 py-1.5 rounded-xl border border-grey-800">
                  <Users className="w-3.5 h-3.5 text-grey-400" />
                  <span>Passengers:</span>
                  <select
                    value={bookingDraft.passengers}
                    onChange={(e) => updateBookingDraft({ passengers: Number(e.target.value) })}
                    className="bg-transparent font-bold text-white focus:outline-none cursor-pointer"
                  >
                    <option value={1} className="bg-grey-900">1 Solo</option>
                    <option value={2} className="bg-grey-900">2 Couple</option>
                    <option value={4} className="bg-grey-900">4 Friends</option>
                    <option value={6} className="bg-grey-900">6 Family</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-grey-950/90 px-3 py-1.5 rounded-xl border border-grey-800">
                  <IndianRupee className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Target Budget:</span>
                  <span className="font-mono font-bold text-white">₹{bookingDraft.budget.toLocaleString()}</span>
                  <input
                    type="range"
                    min="1500"
                    max="15000"
                    step="500"
                    value={bookingDraft.budget}
                    onChange={(e) => updateBookingDraft({ budget: Number(e.target.value) })}
                    className="w-20 accent-yellow-400 cursor-pointer ml-1"
                  />
                </div>
              </div>

              {/* Find Match & Proceed Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 text-grey-950 font-black text-sm shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Find Matching Drivers & Cars</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* Live Ecosystem Commitments Bar */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-grey-900/60 backdrop-blur-md border border-grey-800/80 text-center hover:border-yellow-400/40 transition-all">
            <div className="font-display font-extrabold text-lg text-yellow-400 neon-glow-text">100% Verified</div>
            <div className="text-xs text-grey-400">KYC, Commercial DL & Police Cleared</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-grey-900/60 backdrop-blur-md border border-grey-800/80 text-center hover:border-grey-700 transition-all">
            <div className="font-display font-extrabold text-lg text-white">Two Models</div>
            <div className="text-xs text-grey-400">Book Car + Driver OR Driver for Your Car</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-grey-900/60 backdrop-blur-md border border-grey-800/80 text-center hover:border-amber-400/40 transition-all">
            <div className="font-display font-extrabold text-lg text-amber-400 neon-glow-text">Destination-Free</div>
            <div className="text-xs text-grey-400">Spontaneous Drives by Hours & Mood</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-grey-900/60 backdrop-blur-md border border-grey-800/80 text-center hover:border-grey-700 transition-all">
            <div className="font-display font-extrabold text-lg text-white">Transparent Fare</div>
            <div className="text-xs text-grey-400">Zero Surge Traps • Clear Overtime Engine</div>
          </div>
        </div>

      </div>
    </div>
  );
};
