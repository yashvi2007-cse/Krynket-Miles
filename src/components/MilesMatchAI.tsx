import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle, Driver } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Car, 
  UserCheck, 
  Zap, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface MatchPair {
  id: string;
  vehicle: Vehicle;
  driver: Driver;
  matchScore: number; // 0-100%
  matchReason: string;
  terrainSuitability: string;
  totalHourlyFare: number;
  suitabilityTags: string[];
}

export const MilesMatchAI: React.FC = () => {
  const { vehicles, drivers, openBookingModal, updateBookingDraft } = useApp();
  const [selectedPairId, setSelectedPairId] = useState<string>('pair-1');

  // Intelligent algorithmic pairings
  const matchPairs: MatchPair[] = [
    {
      id: 'pair-1',
      vehicle: vehicles[0], // Mercedes-Benz E-Class
      driver: drivers[0],   // Vikramjit Singh
      matchScore: 98,
      matchReason: 'Vikramjit holds advanced VIP Executive defensive driving certification, perfectly complementing the E-Class suspension for smooth night drives.',
      terrainSuitability: 'Airport Loop, Outer Ring Road, Midnight Skyline',
      totalHourlyFare: vehicles[0].baseHourlyRate + drivers[0].hourlyRate,
      suitabilityTags: ['VIP Velvet Cruise', 'Silent Cabin', 'Late Night']
    },
    {
      id: 'pair-2',
      vehicle: vehicles[1], // Land Rover Defender
      driver: drivers[1],   // Raghuveer Gowda
      matchScore: 96,
      matchReason: 'Raghuveer has 11 years navigating Western Ghats mist routes, paired with the Defender terrain response system for zero-slip hairpins.',
      terrainSuitability: 'Nandi Hills Cloud Mist, Sakleshpur Ghats',
      totalHourlyFare: vehicles[1].baseHourlyRate + drivers[1].hourlyRate,
      suitabilityTags: ['Sunrise Fog Expert', '4x4 Off-Road', 'Mountain Pass']
    },
    {
      id: 'pair-3',
      vehicle: vehicles[2], // BMW i4 M-Sport
      driver: drivers[2],   // Farhan Akhtar
      matchScore: 94,
      matchReason: 'Farhan is EV drivetrain certified with regenerative braking telemetry mastery, ensuring instant torque delivery and optimal battery range.',
      terrainSuitability: 'Mysuru Expressway, ECR Coastal GT',
      totalHourlyFare: vehicles[2].baseHourlyRate + drivers[2].hourlyRate,
      suitabilityTags: ['Electric GT', 'Instant Torque', 'Coastal Run']
    }
  ];

  const handleBookSelectedMatch = (pair: MatchPair) => {
    updateBookingDraft({
      model: 'vehicle_and_driver',
      selectedVehicleId: pair.vehicle.id,
      selectedDriverId: pair.driver.id,
    });
    openBookingModal('vehicle_and_driver');
  };

  return (
    <section className="py-12 bg-grey-950/70 backdrop-blur-xl border-t border-grey-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-xs font-mono text-yellow-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MILES MATCH — AI CHAUFFEUR & VEHICLE ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Explainable Match Scores. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-white neon-glow-text">
                The Perfect Car Paired With The Right Chauffeur.
              </span>
            </h2>
          </div>
          <p className="text-sm text-grey-400 max-w-md">
            MilesMatch analyzes vehicle dynamics, terrain requirements, driver certifications, and driving styles to recommend symbiotic pairings.
          </p>
        </div>

        {/* Top 3 Side-by-Side Match Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {matchPairs.map((pair, idx) => {
            const isSelected = selectedPairId === pair.id;
            return (
              <div
                key={pair.id}
                onClick={() => setSelectedPairId(pair.id)}
                className={`rounded-3xl border p-6 flex flex-col justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-grey-900/90 border-yellow-400 shadow-neon-card'
                    : 'bg-grey-900/60 border-grey-800 hover:border-grey-700 hover:bg-grey-900/80'
                }`}
              >
                <div>
                  {/* Match Score Badge */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-grey-800">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-grey-800 border border-grey-700 flex items-center justify-center font-mono font-bold text-xs text-white">
                        0{idx + 1}
                      </span>
                      <span className="text-xs uppercase font-mono tracking-wider text-grey-400">
                        MilesMatch AI
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/15 border border-yellow-400/40 text-yellow-400 font-bold text-sm shadow-[0_0_12px_rgba(255,230,0,0.2)]">
                      <Zap className="w-3.5 h-3.5 fill-yellow-400" />
                      <span>{pair.matchScore}% Match</span>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-grey-800">
                    <img src={pair.vehicle.image} alt={pair.vehicle.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-grey-950/80 backdrop-blur-md text-[11px] font-mono text-white border border-grey-700">
                      {pair.vehicle.category}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-grey-950/90 backdrop-blur-md text-xs font-bold text-yellow-400 border border-yellow-400/40 font-mono shadow-[0_0_10px_rgba(255,230,0,0.2)]">
                      ₹{pair.vehicle.baseHourlyRate}/hr
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {pair.vehicle.name}
                  </h3>

                  {/* Driver Preview */}
                  <div className="p-3 rounded-2xl bg-grey-950/80 border border-grey-800 flex items-center gap-3 mb-4">
                    <img
                      src={pair.driver.avatar}
                      alt={pair.driver.name}
                      className="w-11 h-11 rounded-xl object-cover border border-grey-700 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-white truncate">{pair.driver.name}</div>
                      <div className="text-[11px] text-grey-400 flex items-center gap-1.5 mt-0.5">
                        <span className="flex items-center text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" /> {pair.driver.rating}
                        </span>
                        <span>•</span>
                        <span className="text-yellow-400 font-mono">{pair.driver.reliabilityScore}% Reliability</span>
                      </div>
                    </div>
                  </div>

                  {/* Explainable Match Reason */}
                  <div className="p-3.5 rounded-2xl bg-grey-950/90 border border-grey-800/80 text-xs text-grey-300 leading-relaxed mb-4">
                    <span className="font-mono text-[10px] uppercase text-yellow-400 font-semibold block mb-1">
                      Why this Match?
                    </span>
                    {pair.matchReason}
                  </div>

                  {/* Suitability Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pair.suitabilityTags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-grey-800 text-[10px] text-grey-300 font-mono border border-grey-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-grey-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-grey-500 uppercase">Combined Rate</div>
                    <div className="text-lg font-black text-yellow-400 font-display neon-glow-text">
                      ₹{pair.totalHourlyFare}/hr
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookSelectedMatch(pair);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 text-grey-950 font-black text-xs shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Select Pair</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
