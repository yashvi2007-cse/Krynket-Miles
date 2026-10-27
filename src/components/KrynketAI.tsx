import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JourneyMood } from '../types';
import { 
  Sparkles, 
  Send, 
  Compass, 
  Sunrise, 
  Sunset, 
  Moon, 
  Mountain, 
  Heart, 
  Users, 
  Coffee, 
  CloudSun, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Clock,
  Navigation,
  RotateCw,
  BookmarkPlus
} from 'lucide-react';

interface ItineraryResult {
  title: string;
  subtitle: string;
  mood: JourneyMood;
  departureWindow: string;
  durationHours: number;
  distanceKm: number;
  recommendedVehicle: string;
  estimatedPrice: number;
  scenicRouteDescription: string;
  suggestedStops: { name: string; type: string; time: string; highlight: string }[];
  weatherIntelligence: {
    temp: string;
    condition: string;
    recommendation: string;
    isSimulated: boolean;
  };
  safetyConsiderations: string[];
}

export const KrynketAI: React.FC = () => {
  const { openBookingModal, updateBookingDraft } = useApp();

  const [prompt, setPrompt] = useState<string>(
    'I want a peaceful 4-hour sunrise drive near Bengaluru with my friends under ₹3,000.'
  );
  const [selectedMood, setSelectedMood] = useState<JourneyMood>('Peaceful');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Preset Experience cards
  const presetExperiences = [
    { title: 'Sunrise Escape', mood: 'Peaceful' as JourneyMood, icon: Sunrise, prompt: 'A magical sunrise drive above the clouds with hot filter coffee on the way.' },
    { title: 'Sunset Stories', mood: 'Romantic' as JourneyMood, icon: Sunset, prompt: 'A romantic coastal sunset drive with ocean breeze and quiet viewpoints.' },
    { title: 'Midnight Miles', mood: 'Midnight' as JourneyMood, icon: Moon, prompt: 'A midnight de-stress expressway cruise with zero traffic and city skylines.' },
    { title: 'Weekend Wanderer', mood: 'Adventure' as JourneyMood, icon: Mountain, prompt: 'A spirited 8-hour mountain getaway exploring lush green valleys and waterfalls.' },
    { title: 'Scenic Mountain Routes', mood: 'Exploration' as JourneyMood, icon: Compass, prompt: 'A twisty ghat road journey with misty coffee plantations and estate stops.' },
    { title: 'Peaceful Solo Drive', mood: 'Peaceful' as JourneyMood, icon: Heart, prompt: 'A tranquil solo drive to disconnect from work, breathe fresh air, and listen to music.' },
    { title: 'Friends’ Road Trip', mood: 'Friends' as JourneyMood, icon: Users, prompt: 'A lively group roadtrip with music, roadside breakfast stops, and scenic photo spots.' },
  ];

  // Active generated itinerary
  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryResult>({
    title: 'Nandi Hills Cloud Mist Peak Sunrise Cruise',
    subtitle: 'Golden Dawn Overlook & Heritage Breakfast Boulevard',
    mood: 'Peaceful',
    departureWindow: '04:15 AM - 04:45 AM (Sunrise at 06:05 AM)',
    durationHours: 4,
    distanceKm: 64,
    recommendedVehicle: 'Comfort SUV (Hyundai Creta) or Comfort Sedan (Honda City)',
    estimatedPrice: 1750,
    scenicRouteDescription: 'Begin from city limits via Hebbal Elevated Expressway into Bellary Road. Take the scenic Devanahalli heritage bypass to avoid truck traffic, then gently climb the 40 winding curves through Nandi Forest Reserve.',
    suggestedStops: [
      { name: 'Devanahalli Heritage Checkpost', type: 'Scenic View', time: '05:10 AM', highlight: 'Clear pre-dawn starry skies' },
      { name: 'Tipu’s Drop 360° Mist Overlook', type: 'Panoramic Viewpoint', time: '05:55 AM', highlight: 'Sun breaking through low-altitude cloud cover' },
      { name: 'Channarayana Swamy Artisan Filter Coffee', type: 'Rest Stop', time: '07:15 AM', highlight: 'Fresh steaming South Indian filter coffee & hot vadas' }
    ],
    weatherIntelligence: {
      temp: '16°C at summit',
      condition: 'Dense early fog clearing into golden sun',
      recommendation: 'Pack light jackets. Driver will use high-power fog lamps on mountain ascent.',
      isSimulated: true
    },
    safetyConsiderations: [
      'Mountain hairpin curves have active speed governor guidance (max 40 km/h).',
      'Defensive driving certified chauffeur assigned for low-visibility pre-dawn mist.',
      '24/7 Krynket Safety Shield telemetry & emergency contact SMS broadcast active.'
    ]
  });

  const handleGenerate = (customPrompt?: string) => {
    const textToUse = customPrompt || prompt;
    setIsGenerating(true);
    setSavedSuccess(false);

    // Simulate AI reasoning and itinerary tailoring
    setTimeout(() => {
      let newItinerary: ItineraryResult;

      if (textToUse.toLowerCase().includes('sunset') || selectedMood === 'Romantic') {
        newItinerary = {
          title: 'ECR Twilight Ocean Promenade',
          subtitle: 'Golden Hour Coastal Boulevard & Artisan Seaboard Cafes',
          mood: 'Romantic',
          departureWindow: '03:45 PM - 04:15 PM (Sunset at 06:18 PM)',
          durationHours: 6,
          distanceKm: 130,
          recommendedVehicle: 'Comfort Sedan (Honda City) or Electric SUV (Tata Nexon EV)',
          estimatedPrice: 2200,
          scenicRouteDescription: 'Coast along sweeping double-lane tarmac with gentle sea breezes. Stop for beachside coconut water before arriving at a private sunset cliff vantage.',
          suggestedStops: [
            { name: 'Covelong Surf Point Overlook', type: 'Coastal View', time: '04:50 PM', highlight: 'Ocean spray & tranquil sea sound' },
            { name: 'Shore Temple Golden Hour Vista', type: 'Heritage', time: '05:45 PM', highlight: 'Spectacular magenta sky reflections' },
            { name: 'Artisan Waterfront Espresso Lounge', type: 'Dining', time: '07:00 PM', highlight: 'Handcrafted pastries and mocktails' }
          ],
          weatherIntelligence: {
            temp: '26°C coastal breeze',
            condition: 'Clear horizon, low humidity',
            recommendation: 'Ideal for open-top driving. Sun protection recommended before 05:30 PM.',
            isSimulated: true
          },
          safetyConsiderations: [
            'Coastal crosswinds monitored; vehicle stability control active.',
            'Verified chauffeur experienced in two-lane highway night returns.',
            'Planned fuel and rest stops confirmed before departure.'
          ]
        };
      } else if (textToUse.toLowerCase().includes('midnight') || selectedMood === 'Midnight') {
        newItinerary = {
          title: 'Metropolitan Midnight Horizon De-Stress Tour',
          subtitle: 'Zero-Traffic Expressways, Neon Skylines & Quiet Reflection',
          mood: 'Midnight',
          departureWindow: '10:45 PM - 11:30 PM',
          durationHours: 3,
          distanceKm: 85,
          recommendedVehicle: 'Comfort Sedan (Honda City) or Electric SUV (Tata Nexon EV)',
          estimatedPrice: 1350,
          scenicRouteDescription: 'Glide effortlessly across the empty elevated expressway loops. Ambient lighting in vehicle set to soft azure, with acoustic chill music.',
          suggestedStops: [
            { name: 'Aeropolis Elevated Helix', type: 'Skyline Overlook', time: '11:20 PM', highlight: 'Panoramic view of lighted airport tarmac' },
            { name: '24/7 Chai & Croissant Pavilion', type: 'Night Refreshment', time: '12:15 AM', highlight: 'Gourmet saffron tea in ceramic kulhads' }
          ],
          weatherIntelligence: {
            temp: '18°C cool night air',
            condition: 'Crystal clear starry skies',
            recommendation: 'Roll windows down on express stretches for fresh breeze.',
            isSimulated: true
          },
          safetyConsiderations: [
            'Chauffeur certified with night vision and zero fatigue checklist.',
            'Automated 30-minute passenger safety check-in prompt active.',
            'Instant SOS button mapped directly to 112 emergency services.'
          ]
        };
      } else {
        newItinerary = {
          title: 'Sakleshpur Cloud Mist Plantation Passage',
          subtitle: 'Rainforest Canopy Curves, Star Fort & Cascading Streams',
          mood: selectedMood,
          departureWindow: '05:45 AM - 06:15 AM',
          durationHours: 8,
          distanceKm: 210,
          recommendedVehicle: 'Adventure 4x4 (Mahindra Thar) or Toyota Innova Crysta',
          estimatedPrice: 3200,
          scenicRouteDescription: 'Ascend into lush Western Ghats evergreen belts with crisp rainforest air and babbling brooks along every winding bend.',
          suggestedStops: [
            { name: 'Highway Swathi Delicacy Breakfast', type: 'Breakfast Stop', time: '07:30 AM', highlight: 'Famous crispy butter dosas & filter coffee' },
            { name: 'Manjarabad Star Fort Ridge', type: 'Historical Overlook', time: '10:00 AM', highlight: 'Star-shaped fort with 360-degree valley view' },
            { name: 'Estate Cardamom Tea Gazebo', type: 'Relaxation', time: '01:30 PM', highlight: 'Fresh estate-grown black tea and quiet forest canopy' }
          ],
          weatherIntelligence: {
            temp: '20°C mild mist',
            condition: 'Passing monsoon clouds with occasional drizzle',
            recommendation: 'Carry waterproof light shell. Vehicle equipped with all-terrain air suspension.',
            isSimulated: true
          },
          safetyConsiderations: [
            'Wet ghat road curves require defensive braking; driver holds high-altitude badge.',
            'Emergency offline GPS coordinates pre-cached in system.',
            'Safety shield check-in prompt scheduled every 45 minutes.'
          ]
        };
      }

      setGeneratedItinerary(newItinerary);
      setIsGenerating(false);
    }, 900);
  };

  const handleBookItinerary = () => {
    updateBookingDraft({
      destination: generatedItinerary.title,
      durationHours: generatedItinerary.durationHours,
      mood: generatedItinerary.mood,
      budget: generatedItinerary.estimatedPrice,
      isDestinationFree: false
    });
    openBookingModal('vehicle_and_driver');
  };

  const handleSaveItinerary = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <section className="py-12 bg-grey-950/70 backdrop-blur-xl border-t border-grey-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-xs font-mono text-yellow-400 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>KRYNKET AI — Your Personal Journey Architect</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Describe Your Dream Drive. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-slate-100 neon-glow-text">
                AI Architect Builds The Perfect Route.
              </span>
            </h2>
          </div>
          <p className="text-sm text-grey-400 max-w-md">
            Natural language trip synthesis with sunrise/sunset timing, vehicle matching, scenic halts and transparent budget calculation.
          </p>
        </div>

        {/* Preset Experiences Carousels */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <span>Or select a signature curated experience:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
            {presetExperiences.map((preset) => {
              const Icon = preset.icon;
              const isSelected = selectedMood === preset.mood;
              return (
                <button
                  key={preset.title}
                  onClick={() => {
                    setSelectedMood(preset.mood);
                    setPrompt(preset.prompt);
                    handleGenerate(preset.prompt);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all group ${
                    isSelected
                      ? 'bg-grey-900 border-yellow-400/70 shadow-neon-yellow'
                      : 'bg-grey-900/60 border-grey-800/80 hover:border-grey-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                    isSelected ? 'bg-yellow-400 text-grey-950 font-bold' : 'bg-grey-800 text-slate-300 group-hover:text-yellow-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-white leading-tight mb-1">{preset.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono capitalize">{preset.mood}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Natural Language Prompt Input Bar */}
        <div className="bg-grey-900/90 rounded-3xl border border-grey-750/80 p-3 sm:p-4 shadow-glass mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-grey-950/80 rounded-2xl border border-grey-800">
              <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 animate-pulse" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="e.g. I want a 4-hour peaceful sunrise drive near Bengaluru with friends under ₹3,000..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
              />
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-grey-950 font-bold text-sm shadow-neon-yellow hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Route...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Synthesize Itinerary</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI GENERATED ITINERARY CARD */}
        {generatedItinerary && (
          <div className="bg-grey-900/80 rounded-3xl border border-grey-750/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top Itinerary Badge Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-grey-800">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 text-xs font-mono font-semibold">
                    AI Architect Recommended Route
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-grey-800 text-slate-300 text-xs font-medium">
                    Mood: {generatedItinerary.mood}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Departure: {generatedItinerary.departureWindow}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {generatedItinerary.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {generatedItinerary.subtitle}
                </p>
              </div>

              {/* Price & Action Button Stack */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-grey-950 px-4 py-2.5 rounded-2xl border border-grey-800 text-right">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Estimated Total Fare</div>
                  <div className="text-xl font-display font-black text-yellow-400">
                    ₹{generatedItinerary.estimatedPrice.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={handleSaveItinerary}
                  className="px-4 py-3 rounded-2xl bg-grey-800 hover:bg-grey-750 border border-grey-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400">Saved to Plans!</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-4 h-4" />
                      <span>Save Itinerary</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBookItinerary}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-grey-950 font-bold text-sm shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Book this Itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-grey-800">
              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-yellow-400" /> Duration
                </div>
                <div className="text-base font-bold text-white mt-0.5">
                  {generatedItinerary.durationHours} Hours Leisure
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-yellow-400" /> Estimated Distance
                </div>
                <div className="text-base font-bold text-white mt-0.5">
                  {generatedItinerary.distanceKm} km Roundtrip
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-yellow-400" /> Suggested Vehicle
                </div>
                <div className="text-base font-bold text-white mt-0.5 truncate">
                  {generatedItinerary.recommendedVehicle}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1">
                  <CloudSun className="w-3.5 h-3.5 text-yellow-400" /> Weather Intelligence
                </div>
                <div className="text-base font-bold text-yellow-400 mt-0.5">
                  {generatedItinerary.weatherIntelligence.temp}
                </div>
              </div>
            </div>

            {/* Scenic Route Details & Stops Timeline */}
            <div className="py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Route Summary */}
              <div className="lg:col-span-1 space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-yellow-400 mb-2">
                    Scenic Route Blueprint
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {generatedItinerary.scenicRouteDescription}
                  </p>
                </div>

                {/* Weather note (clearly labelled sample data) */}
                <div className="p-3.5 rounded-2xl bg-grey-950/70 border border-grey-800 text-xs">
                  <div className="text-slate-400 font-mono text-[10px] uppercase mb-1 flex items-center justify-between">
                    <span>Weather Guidance</span>
                    <span className="text-[9px] text-slate-500 font-mono">(Sample Simulation)</span>
                  </div>
                  <div className="text-white font-medium mb-1">
                    {generatedItinerary.weatherIntelligence.condition}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {generatedItinerary.weatherIntelligence.recommendation}
                  </div>
                </div>

                {/* Safety considerations */}
                <div className="p-3.5 rounded-2xl bg-yellow-950/20 border border-yellow-500/30 text-xs">
                  <div className="text-yellow-400 font-semibold flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400" /> Safety Shield Intelligence
                  </div>
                  <ul className="space-y-1.5 text-slate-300 text-[11px]">
                    {generatedItinerary.safetyConsiderations.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-yellow-400 font-bold">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggested Stops Timeline */}
              <div className="lg:col-span-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-yellow-400 mb-4">
                  Curated Waypoint Timeline & Scenic Breaks
                </h4>

                <div className="space-y-3">
                  {generatedItinerary.suggestedStops.map((stop, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-2xl bg-grey-950/80 border border-grey-800 flex items-start gap-4 hover:border-grey-700 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-grey-900 border border-grey-700 flex items-center justify-center text-yellow-400 font-mono font-bold text-xs shrink-0">
                        0{idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h5 className="text-sm font-bold text-white">{stop.name}</h5>
                          <span className="text-xs font-mono text-yellow-400 font-semibold">{stop.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                          <span className="px-1.5 py-0.5 rounded bg-grey-800 text-[10px] uppercase font-mono text-slate-300">
                            {stop.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">
                          {stop.highlight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
