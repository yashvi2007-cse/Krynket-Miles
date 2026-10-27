import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking, TripMemory } from '../types';
import { 
  User, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Star, 
  Bookmark, 
  Calendar, 
  IndianRupee, 
  ArrowRight, 
  Camera, 
  Phone,
  CheckCircle2,
  Download,
  AlertCircle
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { 
    bookings, 
    activeTrip, 
    tripMemories, 
    wishlist, 
    destinations, 
    emergencyContacts, 
    openSosModal,
    openBookingModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'memories' | 'wishlist' | 'contacts'>('bookings');
  const [selectedInvoice, setSelectedInvoice] = useState<Booking | null>(null);

  const wishlistedDests = destinations.filter((d) => wishlist.includes(d.id));

  return (
    <div className="py-12 bg-grey-950/70 backdrop-blur-xl border-t border-grey-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-grey-900/80 backdrop-blur-xl border border-grey-700/80 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-400 to-grey-900 p-0.5 shadow-neon-yellow">
              <div className="w-full h-full bg-grey-950 rounded-[14px] flex items-center justify-center font-display font-black text-2xl text-yellow-400 neon-glow-text">
                YS
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Yashvi Surana</h2>
                <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-[10px] font-mono font-bold border border-yellow-400/30">
                  Krynket Black Member
                </span>
              </div>
              <p className="text-xs text-grey-400 font-mono mt-0.5">
                yashvi@krynketmiles.com • +91 99887 76655
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openBookingModal('vehicle_and_driver')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-grey-950 font-bold text-xs shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all"
            >
              + Plan New Journey
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-grey-800 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'bg-yellow-400 text-grey-950 font-bold shadow-neon-yellow'
                : 'text-slate-400 hover:text-white hover:bg-grey-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Bookings & Invoices ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('memories')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'memories'
                ? 'bg-yellow-400 text-grey-950 font-bold shadow-neon-yellow'
                : 'text-slate-400 hover:text-white hover:bg-grey-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> Trip Memory Journal ({tripMemories.length})
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'wishlist'
                ? 'bg-yellow-400 text-grey-950 font-bold shadow-neon-yellow'
                : 'text-slate-400 hover:text-white hover:bg-grey-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" /> Saved Escapes ({wishlistedDests.length})
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'contacts'
                ? 'bg-yellow-400 text-grey-950 font-bold shadow-neon-yellow'
                : 'text-slate-400 hover:text-white hover:bg-grey-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Safety Contacts ({emergencyContacts.length})
          </button>
        </div>

        {/* TAB 1: BOOKINGS & INVOICES */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            {/* Active Trip Banner if currently on a drive */}
            {activeTrip && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-grey-900 via-grey-850 to-grey-900 border-2 border-yellow-400/60 shadow-neon-yellow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-grey-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
                    <span className="text-xs font-mono font-bold text-yellow-400 uppercase">
                      ACTIVE EXPEDITION IN PROGRESS
                    </span>
                    <span className="text-xs text-slate-400 font-mono">#{activeTrip.id}</span>
                  </div>

                  <button
                    onClick={openSosModal}
                    className="px-3 py-1 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-xs font-bold font-mono transition-colors"
                  >
                    SOS Alert
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="text-slate-400 uppercase font-mono text-[10px]">Destination</div>
                    <div className="text-base font-bold text-white mt-0.5">{activeTrip.destination}</div>
                    <div className="text-slate-400 mt-0.5">{activeTrip.durationHours} Hours Scenic</div>
                  </div>

                  <div>
                    <div className="text-slate-400 uppercase font-mono text-[10px]">Chauffeur</div>
                    <div className="text-base font-bold text-yellow-400 mt-0.5">{activeTrip.driver.name}</div>
                    <div className="text-slate-400 mt-0.5">{activeTrip.driver.phone}</div>
                  </div>

                  <div>
                    <div className="text-slate-400 uppercase font-mono text-[10px]">Vehicle</div>
                    <div className="text-base font-bold text-white mt-0.5">{activeTrip.vehicle?.name || 'Customer Personal Car'}</div>
                    <div className="text-slate-400 font-mono mt-0.5">{activeTrip.vehicle?.licensePlate || 'KA 03 MZ 9999'}</div>
                  </div>

                  <div>
                    <div className="text-slate-400 uppercase font-mono text-[10px]">Paid Amount</div>
                    <div className="text-base font-bold text-yellow-400 mt-0.5">₹{activeTrip.fareBreakdown.total.toLocaleString()}</div>
                    <div className="text-slate-400 font-mono mt-0.5">Demo Razorpay UPI</div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings List */}
            <div className="space-y-4">
              <h3 className="text-base font-mono uppercase tracking-wider text-slate-300">
                All Bookings History
              </h3>

              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-2xl bg-grey-900 border border-grey-850 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-grey-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-sm">{booking.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-400 text-[10px] font-mono">
                        {booking.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {booking.bookingModel === 'vehicle_and_driver' ? 'Vehicle + Driver' : 'Driver for My Car'}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-white">
                      {booking.pickupLocation} ➔ {booking.destination}
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-3">
                      <span>{booking.date} at {booking.startTime} ({booking.durationHours}h)</span>
                      <span>•</span>
                      <span>Chauffeur: {booking.driver.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-base font-display font-black text-yellow-400">
                        ₹{booking.fareBreakdown.total.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{booking.paymentStatus}</div>
                    </div>

                    <button
                      onClick={() => setSelectedInvoice(booking)}
                      className="px-3.5 py-2 rounded-xl bg-grey-800 hover:bg-grey-750 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-grey-700"
                    >
                      <FileText className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Digital Invoice</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: TRIP MEMORY JOURNAL */}
        {activeTab === 'memories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tripMemories.map((mem) => (
              <div
                key={mem.id}
                className="p-6 rounded-3xl bg-grey-900 border border-grey-800 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-grey-800">
                  <div>
                    <h4 className="text-lg font-bold text-white">{mem.title}</h4>
                    <span className="text-xs text-slate-400 font-mono">{mem.date} • {mem.hoursDriven} Hours Driven</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span>{mem.review.rating}.0</span>
                  </div>
                </div>

                {/* Photo Strip */}
                <div className="grid grid-cols-2 gap-2 h-44 rounded-2xl overflow-hidden">
                  {mem.photos.map((photo, i) => (
                    <img key={i} src={photo} alt={mem.title} className="w-full h-full object-cover" />
                  ))}
                </div>

                {/* Customer Review Quote */}
                <div className="p-3 rounded-2xl bg-grey-950 border border-grey-800 text-xs italic text-slate-300">
                  "{mem.review.comment}"
                </div>

                {/* Highlights */}
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Journey Highlights:</div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {mem.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SAVED WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedDests.map((dest) => (
              <div
                key={dest.id}
                className="p-4 rounded-3xl bg-grey-900 border border-grey-800 space-y-3"
              >
                <div className="h-40 rounded-2xl overflow-hidden">
                  <img src={dest.image} alt={dest.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-base font-bold text-white">{dest.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{dest.description}</p>
                <div className="pt-2 border-t border-grey-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-yellow-400">~₹{dest.estimatedCost}</span>
                  <button
                    onClick={() => openBookingModal('vehicle_and_driver', dest)}
                    className="px-3 py-1.5 rounded-xl bg-yellow-400 text-grey-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-neon-yellow"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SAFETY CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="p-6 rounded-3xl bg-grey-900 border border-grey-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Registered Emergency Guardians</h3>
            <p className="text-xs text-slate-400">
              These contacts automatically receive live route links when an active trip begins or when SOS is triggered.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {emergencyContacts.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-grey-950 border border-grey-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-white">{c.name}</div>
                    <div className="text-xs text-slate-400">{c.relation}</div>
                    <div className="text-xs font-mono text-yellow-400 mt-0.5">{c.phone}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-yellow-400/15 text-yellow-400 text-[10px] font-mono">
                    Active Guardian
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DIGITAL INVOICE MODAL */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-grey-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-grey-900 border border-grey-750 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-grey-800">
                <div>
                  <span className="text-xs font-mono text-yellow-400 font-bold">TAX INVOICE</span>
                  <h3 className="text-xl font-bold text-white">{selectedInvoice.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 rounded-xl bg-grey-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="font-bold text-white">{selectedInvoice.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup:</span>
                  <span className="text-white">{selectedInvoice.pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="text-white">{selectedInvoice.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assigned Driver:</span>
                  <span className="text-white">{selectedInvoice.driver.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-mono text-white">{selectedInvoice.durationHours} Hours</span>
                </div>

                <div className="pt-3 border-t border-grey-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span>Base Chauffeur Allowance</span>
                    <span className="font-mono text-white">₹{selectedInvoice.fareBreakdown.baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chauffeur Hourly Charges</span>
                    <span className="font-mono text-white">₹{selectedInvoice.fareBreakdown.hourlyDriverCharge}</span>
                  </div>
                  {selectedInvoice.fareBreakdown.vehicleRentalCharge > 0 && (
                    <div className="flex justify-between">
                      <span>Vehicle Rental Charge</span>
                      <span className="font-mono text-white">₹{selectedInvoice.fareBreakdown.vehicleRentalCharge}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Fuel & Toll Allowance</span>
                    <span className="font-mono text-white">₹{selectedInvoice.fareBreakdown.estimatedFuelAllowance + selectedInvoice.fareBreakdown.tollsAndPermits}</span>
                  </div>
                  <div className="flex justify-between text-yellow-400">
                    <span>Loyalty Privilege Discount</span>
                    <span className="font-mono">-₹{selectedInvoice.fareBreakdown.discount}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GST (5%)</span>
                    <span className="font-mono text-slate-300">₹{selectedInvoice.fareBreakdown.taxes}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-grey-800 flex justify-between text-sm font-bold text-white">
                  <span>Grand Total Paid:</span>
                  <span className="font-mono text-yellow-400 font-extrabold text-base">
                    ₹{selectedInvoice.fareBreakdown.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => alert('Demo PDF download triggered.')}
                  className="px-4 py-2 rounded-xl bg-grey-800 hover:bg-grey-750 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-grey-950 font-bold text-xs shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
