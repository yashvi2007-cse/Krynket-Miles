import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScenicDestination, JourneyMood } from '../types';
import { 
  Compass, 
  Heart, 
  MapPin, 
  Clock, 
  Navigation, 
  IndianRupee, 
  ArrowRight, 
  Sunrise, 
  Sunset, 
  Moon, 
  Sparkles,
  SlidersHorizontal,
  CloudSun
} from 'lucide-react';

export const DiscoverySection: React.FC = () => {
  const { destinations, wishlist, toggleWishlist, openBookingModal } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxDistance, setMaxDistance] = useState<number>(300);

  const categories = [
    'All',
    'Sunrise Escape',
    'Sunset Stories',
    'Midnight Miles',
    'Scenic Mountain Routes',
    'Weekend Wanderer'
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    const matchesDistance = dest.distanceKm <= maxDistance;
    return matchesCategory && matchesDistance;
  });

  const handleBookDestination = (dest: ScenicDestination) => {
    openBookingModal('vehicle_and_driver', dest);
  };

  return (
    <section className="py-12 bg-grey-950/70 backdrop-blur-xl border-t border-grey-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-xs font-mono text-yellow-400 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>KRYNKET DISCOVERY & SCENIC TRAILS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Curated Scenic Escapes. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-white neon-glow-text">
                Handpicked By Veteran Route Navigators.
              </span>
            </h2>
          </div>
          <p className="text-sm text-grey-400 max-w-md">
            Pristine mountain passes, ocean-side highways, and night city loops with optimal departure windows and scenic tea stops.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-yellow-400 text-grey-950 font-bold border-yellow-400 shadow-neon-yellow'
                    : 'bg-grey-900 border-grey-800 text-grey-300 hover:text-white hover:border-grey-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Max Distance Slider */}
          <div className="flex items-center gap-3 bg-grey-900/90 px-3.5 py-1.5 rounded-xl border border-grey-800 text-xs">
            <span className="text-grey-400 font-mono">Max Dist:</span>
            <span className="font-bold text-white font-mono">{maxDistance} km</span>
            <input
              type="range"
              min="50"
              max="300"
              step="25"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-24 accent-yellow-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const isWishlisted = wishlist.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="rounded-3xl bg-grey-900/75 backdrop-blur-md border border-grey-800 hover:border-yellow-400/50 overflow-hidden flex flex-col justify-between shadow-xl transition-all group hover:shadow-neon-card"
              >
                <div>
                  {/* Photo with badges */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-grey-950 via-grey-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-grey-950/80 backdrop-blur-md text-[10px] font-mono text-yellow-400 border border-yellow-400/40 shadow-[0_0_10px_rgba(255,230,0,0.2)]">
                      {dest.category}
                    </div>

                    <button
                      onClick={() => toggleWishlist(dest.id)}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-grey-950/80 backdrop-blur-md border border-grey-700 text-grey-300 hover:text-red-400 transition-colors"
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : ''}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-grey-200">
                      <span className="flex items-center gap-1 font-mono">
                        <Navigation className="w-3.5 h-3.5 text-yellow-400" /> {dest.distanceKm} km
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> {dest.durationHours} Hours
                      </span>
                      <span className="font-mono text-yellow-400 font-bold">
                        ~₹{dest.estimatedCost}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors leading-snug">
                      {dest.title}
                    </h3>
                    <p className="text-xs text-grey-400 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Best departure window */}
                    <div className="p-2.5 rounded-xl bg-grey-950/90 border border-grey-800 text-[11px] text-grey-300 flex items-center gap-2">
                      <Sunrise className="w-4 h-4 text-yellow-400 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-mono text-grey-500 block">Departure Window:</span>
                        <span className="font-semibold text-white">{dest.bestDepartureWindow}</span>
                      </div>
                    </div>

                    {/* Scenic stops preview */}
                    <div className="pt-2">
                      <div className="text-[10px] uppercase font-mono text-grey-500 mb-1.5">
                        Scenic Halts En-Route:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {dest.scenicStops.map((stop, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-grey-950 text-[10px] text-grey-300 border border-grey-800">
                            {stop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleBookDestination(dest)}
                    className="w-full py-3 rounded-2xl bg-grey-850 hover:bg-yellow-400 hover:text-grey-950 text-white font-bold text-xs border border-grey-700 hover:border-yellow-400 flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-neon-yellow"
                  >
                    <span>Book This Scenic Drive</span>
                    <ArrowRight className="w-4 h-4" />
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
