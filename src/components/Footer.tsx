import React from 'react';
import { ShieldCheck, Heart, Compass, Sparkles, PhoneCall, Mail } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-grey-950/75 backdrop-blur-xl border-t border-grey-800/80 pt-16 pb-12 text-grey-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 via-amber-400 to-grey-900 p-0.5 shadow-neon-yellow">
                <div className="w-full h-full bg-grey-950 rounded-[10px] flex items-center justify-center font-display font-black text-lg text-yellow-400 neon-glow-text">
                  KM
                </div>
              </div>
              <div className="font-display font-black text-xl text-white tracking-wider">
                KRYNKET <span className="text-yellow-400 neon-glow-text">MILES</span>
              </div>
            </div>

            <p className="text-grey-400 text-xs leading-relaxed max-w-sm">
              We don’t just take you places. We help you experience the journey. The AI-powered leisure mobility ecosystem for sunrise escapes, scenic mountain roads, midnight drives, and verified professional chauffeurs.
            </p>

            <div className="flex items-center gap-3 pt-1 text-grey-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-yellow-400" /> 100% Aadhaar & DL Verified
              </span>
              <span>•</span>
              <span className="text-yellow-400 font-mono">Zero Surge Pricing</span>
            </div>
          </div>

          {/* Booking Models */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Booking Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-yellow-400 transition-colors">
                  Model A: Vehicle + Driver
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-yellow-400 transition-colors">
                  Model B: Hire Driver for My Car
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('discovery')} className="hover:text-yellow-400 transition-colors">
                  Destination-Free Spontaneous Drives
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('group-trip')} className="hover:text-yellow-400 transition-colors">
                  Smart Group Trip Collaboration
                </button>
              </li>
            </ul>
          </div>

          {/* AI & Discovery */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Ecosystem Intelligence
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('ai-planner')} className="hover:text-yellow-400 transition-colors">
                  Krynket AI Journey Architect
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-yellow-400 transition-colors">
                  Transparent Fare Engine
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('safety')} className="hover:text-yellow-400 transition-colors">
                  Krynket Safety Shield Protocol
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('discovery')} className="hover:text-yellow-400 transition-colors">
                  Scenic Mountain & Coastal Passes
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Emergency & Trust
            </h4>
            <div className="p-3 rounded-2xl bg-grey-900 border border-grey-800 space-y-1.5">
              <div className="text-[11px] text-grey-300 font-bold flex items-center gap-1.5 text-red-400">
                <PhoneCall className="w-3.5 h-3.5" /> India Emergency: 112
              </div>
              <div className="text-[10px] text-grey-400">
                Direct national police, medical & highway rescue dispatch.
              </div>
            </div>

            <div className="text-[11px] text-grey-400">
              Krynket Priority Concierge: <br />
              <strong className="text-white font-mono">+91 80 4992 1100</strong>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-grey-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-grey-500">
          <div>
            © 2026 KRYNKET MILES TECHNOLOGIES PVT. LTD. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-grey-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-grey-300 cursor-pointer">Safety Guidelines</span>
            <span>•</span>
            <span className="hover:text-grey-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="text-yellow-400 font-mono">Cyber Yellow & Titanium Grey UI</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
