import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Car, 
  UserCheck, 
  Compass, 
  Users, 
  Bookmark, 
  Menu, 
  X,
  ChevronDown,
  Lock
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { role, setRole, activeTrip, wishlist, openBookingModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-grey-800/80 bg-grey-950/85 backdrop-blur-2xl transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 via-amber-400 to-grey-900 p-0.5 shadow-neon-yellow">
            <div className="w-full h-full bg-grey-950 rounded-[10px] flex items-center justify-center group-hover:bg-grey-900 transition-colors">
              <span className="font-display font-black text-xl text-yellow-400 tracking-tighter neon-glow-text">KM</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-lg tracking-wider text-slate-100">
                KRYNKET
              </span>
              <span className="font-display font-black text-lg tracking-wider text-yellow-400 neon-glow-text">
                MILES
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 shadow-[0_0_10px_rgba(255,230,0,0.2)]">
                YELLOW
              </span>
            </div>
            <p className="text-[11px] text-grey-400 font-medium tracking-tight -mt-0.5 hidden sm:block">
              Leisure Mobility & Professional Chauffeurs
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-xl transition-all ${
              activeTab === 'home'
                ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 font-semibold shadow-[0_0_12px_rgba(255,230,0,0.15)]'
                : 'text-grey-300 hover:text-white hover:bg-grey-850/70'
            }`}
          >
            Explore
          </button>

          <button
            onClick={() => setActiveTab('ai-planner')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'ai-planner'
                ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 font-semibold shadow-[0_0_12px_rgba(255,230,0,0.15)]'
                : 'text-grey-300 hover:text-white hover:bg-grey-850/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            Krynket AI
          </button>

          <button
            onClick={() => setActiveTab('discovery')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'discovery'
                ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                : 'text-grey-300 hover:text-white hover:bg-grey-850/70'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-grey-400" />
            Scenic Drives
          </button>

          <button
            onClick={() => setActiveTab('group-trip')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'group-trip'
                ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 font-semibold shadow-[0_0_12px_rgba(255,230,0,0.15)]'
                : 'text-grey-300 hover:text-white hover:bg-grey-850/70'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-grey-400" />
            Group Trips
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'safety'
                ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 font-semibold shadow-[0_0_12px_rgba(255,230,0,0.15)]'
                : 'text-grey-300 hover:text-white hover:bg-grey-850/70'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
            Safety Shield
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3 py-2 rounded-xl transition-all ${
              activeTab === 'pricing'
                ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 font-semibold shadow-[0_0_12px_rgba(255,230,0,0.15)]'
                : 'text-grey-300 hover:text-white hover:bg-grey-850/70'
            }`}
          >
            Pricing Engine
          </button>

          {/* Role-specific tab */}
          {role === 'driver' && (
            <button
              onClick={() => setActiveTab('driver-portal')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'driver-portal'
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30 font-semibold'
                  : 'text-grey-300 hover:bg-grey-850/70 hover:text-amber-400'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-amber-400" />
              Driver & Fleet Portal
            </button>
          )}

          {role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin-panel')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'admin-panel'
                  ? 'text-yellow-300 bg-yellow-300/10 border border-yellow-300/30 font-semibold'
                  : 'text-grey-300 hover:bg-grey-850/70 hover:text-yellow-300'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-yellow-300" />
              Admin Control
            </button>
          )}
        </nav>

        {/* Right Action Stack: Active Trip beacon, Wishlist, Persona Switcher, Book Now CTA */}
        <div className="flex items-center gap-3">
          {/* Active Trip Telemetry Pill */}
          {activeTrip && (
            <button
              onClick={() => setActiveTab('customer-dashboard')}
              title="View Active Trip"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/15 border border-yellow-400/40 text-yellow-400 text-xs font-semibold hover:bg-yellow-400/25 transition-all shadow-neon-yellow"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
              </span>
              <span>Active Trip Live</span>
            </button>
          )}

          {/* Wishlist quick link */}
          <button
            onClick={() => setActiveTab('customer-dashboard')}
            title="Saved Destinations & Trips"
            className="relative p-2.5 rounded-xl bg-grey-900 border border-grey-800 text-grey-300 hover:text-white hover:border-grey-700 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 text-grey-950 font-black text-[10px] flex items-center justify-center shadow-neon-yellow">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Interactive Role Switcher: Customer / Driver / Admin */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-grey-900 border border-grey-800 text-xs text-grey-300 cursor-pointer hover:border-grey-700">
              <span className="text-[10px] uppercase font-mono text-grey-500">View as:</span>
              <span className="font-semibold text-white capitalize flex items-center gap-1">
                {role === 'customer' && <span className="text-yellow-400">● Customer</span>}
                {role === 'driver' && <span className="text-amber-400">● Driver / Fleet</span>}
                {role === 'admin' && <span className="text-yellow-300">● Admin</span>}
              </span>
              <ChevronDown className="w-3 h-3 text-grey-500" />
            </div>

            {/* Dropdown Menu for Persona Switch */}
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-grey-900/95 border border-grey-700 shadow-2xl p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-xl">
              <div className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-grey-400 border-b border-grey-800 mb-1">
                Switch Ecosystem Persona
              </div>
              <button
                onClick={() => { setRole('customer'); setActiveTab('home'); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  role === 'customer' ? 'bg-yellow-400/20 text-yellow-400 font-semibold' : 'text-grey-300 hover:bg-grey-800'
                }`}
              >
                <span>Passenger / Customer</span>
                <span className="text-[10px] font-mono text-grey-400">Book & Travel</span>
              </button>
              <button
                onClick={() => { setRole('driver'); setActiveTab('driver-portal'); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  role === 'driver' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-grey-300 hover:bg-grey-800'
                }`}
              >
                <span>Driver & Fleet Partner</span>
                <span className="text-[10px] font-mono text-grey-400">Earnings & Verification</span>
              </button>
              <button
                onClick={() => { setRole('admin'); setActiveTab('admin-panel'); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  role === 'admin' ? 'bg-yellow-400/20 text-yellow-300 font-semibold' : 'text-grey-300 hover:bg-grey-800'
                }`}
              >
                <span>Admin Operations</span>
                <span className="text-[10px] font-mono text-grey-400">KYC & Safety Ops</span>
              </button>
            </div>
          </div>

          {/* Primary Action Button: Open Booking Modal */}
          <button
            onClick={() => openBookingModal('vehicle_and_driver')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 text-grey-950 font-black text-sm shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all"
          >
            Plan Your Drive
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-grey-900 border border-grey-800 text-grey-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 border-b border-grey-800 bg-grey-950/95 backdrop-blur-2xl space-y-2 text-sm">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-grey-200 hover:bg-grey-800"
          >
            Explore
          </button>
          <button
            onClick={() => { setActiveTab('ai-planner'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-yellow-400 flex items-center gap-2 hover:bg-grey-800 font-medium"
          >
            <Sparkles className="w-4 h-4" /> Krynket AI Journey Architect
          </button>
          <button
            onClick={() => { setActiveTab('discovery'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-grey-200 hover:bg-grey-800"
          >
            Scenic Drives & Discovery
          </button>
          <button
            onClick={() => { setActiveTab('safety'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-grey-200 hover:bg-grey-800"
          >
            Safety Shield & SOS
          </button>
          <button
            onClick={() => { setActiveTab('group-trip'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-grey-200 hover:bg-grey-800"
          >
            Group Trip Collaboration
          </button>
          <button
            onClick={() => { setActiveTab('customer-dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-grey-200 hover:bg-grey-800"
          >
            My Bookings & Invoices
          </button>
          <div className="pt-2 border-t border-grey-800 flex flex-col gap-2">
            <button
              onClick={() => { openBookingModal('vehicle_and_driver'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-yellow-400 text-grey-950 font-black text-center shadow-neon-yellow"
            >
              Book Vehicle + Driver
            </button>
            <button
              onClick={() => { openBookingModal('driver_for_my_car'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-grey-900 border border-grey-700 text-white font-semibold text-center hover:border-yellow-400/50"
            >
              Hire Driver for My Car
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
