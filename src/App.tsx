import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveMap } from './components/InteractiveMap';
import { KrynketAI } from './components/KrynketAI';
import { TwoBookingFlowsModal } from './components/TwoBookingFlowsModal';
import { SafetyShield } from './components/SafetyShield';
import { SosEmergencyModal } from './components/SosEmergencyModal';
import { SmartPricingEngine } from './components/SmartPricingEngine';
import { DiscoverySection } from './components/DiscoverySection';
import { SmartGroupPlanner } from './components/SmartGroupPlanner';
import { CustomerDashboard } from './components/CustomerDashboard';
import { DriverEcosystemDashboard } from './components/DriverEcosystemDashboard';
import { AdminControlCenter } from './components/AdminControlCenter';
import { ActiveTripFloatingHUD } from './components/ActiveTripFloatingHUD';
import { Footer } from './components/Footer';
import { NeonParticleBackground } from './components/NeonParticleBackground';
import { 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Car, 
  UserCheck, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  Heart
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { role, openBookingModal } = useApp();
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-slate-100 selection:bg-yellow-400/30 selection:text-white">
      {/* Floating Interactive Neon Particle Background */}
      <NeonParticleBackground />

      {/* Top Glass Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Cinematic Hero & Quick Booking */}
            <Hero 
              onExploreExperiences={() => {
                const el = document.getElementById('scenic-discovery');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAiPlanner={() => setActiveTab('ai-planner')}
            />

            {/* Live Interactive Journey Map Section */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-xs font-mono text-yellow-400 mb-2">
                    <Compass className="w-3.5 h-3.5 text-yellow-400" />
                    <span>INTERACTIVE JOURNEY RADAR & LIVE TELEMETRY</span>
                  </div>
                  <h2 className="text-3xl font-display font-black text-white">
                    Live Route Navigation & Deviation Detection
                  </h2>
                </div>
                <p className="text-xs text-slate-400 max-w-sm">
                  Simulate live GPS movement, nearby scenic viewpoints, fuel stations, hospitals, and off-route safety alarms.
                </p>
              </div>

              <InteractiveMap />
            </section>

            {/* Curated Scenic Discovery */}
            <div id="scenic-discovery">
              <DiscoverySection />
            </div>

            {/* Smart Pricing Engine */}
            <SmartPricingEngine />

            {/* Group Roadtrip Collaboration Preview */}
            <SmartGroupPlanner />

            {/* Safety Shield Overview */}
            <SafetyShield />

            {/* Customer Testimonials & Experiential Philosophy */}
            <section className="py-16 bg-grey-950/65 backdrop-blur-xl border-t border-grey-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-3xl mx-auto">
                  <span className="text-xs font-mono uppercase tracking-widest text-yellow-400 neon-glow-text">
                    THE KRYNKET EXPERIENCE
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-2">
                    "We Don't Just Take You Places. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-white">
                      We Help You Experience The Journey."
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      quote: "I hired Vikramjit for my Honda City for a late-night drive to airport loops. His smooth chauffeuring and calm demeanor was the perfect therapy after a grueling 70-hour sprint.",
                      author: "Ananya Deshmukh",
                      role: "Fintech Founder, Bengaluru",
                      trip: "Model B: Driver for My Own Car"
                    },
                    {
                      quote: "Booked the Toyota Innova Crysta for our family sunrise trip to Nandi Hills. The ride was wonderfully comfortable and Captain Raghuveer had hot artisanal filter coffee ready at the peak.",
                      author: "Dr. Vikramaditya Sen",
                      role: "Surgeon, Indiranagar",
                      trip: "Model A: Vehicle + Driver"
                    },
                    {
                      quote: "The Destination-Free mode is an absolute gamechanger. We booked 6 hours on a Sunday afternoon, told the AI our mood was 'Peaceful', and experienced the most scenic backroads ever in a Creta.",
                      author: "Pooja & Siddharth",
                      role: "Architects, Whitefield",
                      trip: "Destination-Free Spontaneous Drive"
                    }
                  ].map((testi, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-grey-900/75 backdrop-blur-md border border-grey-800 hover:border-yellow-400/40 transition-all space-y-4">
                      <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{testi.quote}"
                      </p>
                      <div className="pt-3 border-t border-grey-800/80">
                        <div className="font-bold text-sm text-white">{testi.author}</div>
                        <div className="text-[11px] text-slate-400">{testi.role}</div>
                        <div className="text-[10px] text-yellow-400 font-mono mt-1">{testi.trip}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final CTA Banner */}
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-grey-900/90 via-grey-850/90 to-grey-900/90 backdrop-blur-xl border border-yellow-400/40 shadow-neon-yellow flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                      Ready For A Different Kind Of Journey?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                      Book a clean, comfortable vehicle with a verified chauffeur, or hire a professional driver for your personal car today.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => openBookingModal('vehicle_and_driver')}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-grey-950 font-bold text-sm shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all"
                    >
                      Plan Your Drive Now
                    </button>
                    <button
                      onClick={() => openBookingModal('driver_for_my_car')}
                      className="px-6 py-3.5 rounded-2xl bg-grey-900/90 border border-grey-700 text-white font-semibold text-sm hover:border-yellow-400/50 transition-all"
                    >
                      Hire Driver for My Car
                    </button>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* Specialized Views */}
        {activeTab === 'ai-planner' && (
          <div>
            <KrynketAI />
            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl font-bold text-white mb-4">Interactive Route Radar</h3>
              <InteractiveMap />
            </div>
          </div>
        )}

        {activeTab === 'discovery' && (
          <div>
            <DiscoverySection />
            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl font-bold text-white mb-4">Scenic Route Preview & Nearby POIs</h3>
              <InteractiveMap />
            </div>
          </div>
        )}

        {activeTab === 'group-trip' && <SmartGroupPlanner />}
        {activeTab === 'safety' && <SafetyShield />}
        {activeTab === 'pricing' && <SmartPricingEngine />}
        {activeTab === 'customer-dashboard' && <CustomerDashboard />}
        {activeTab === 'driver-portal' && <DriverEcosystemDashboard />}
        {activeTab === 'admin-panel' && <AdminControlCenter />}
      </main>

      {/* Floating Active Trip HUD (Always visible when a journey is active) */}
      <ActiveTripFloatingHUD />

      {/* Modals */}
      <TwoBookingFlowsModal />
      <SosEmergencyModal />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
