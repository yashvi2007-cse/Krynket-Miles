import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle } from '../types';
import { 
  Car, 
  UserCheck, 
  DollarSign, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Plus, 
  IndianRupee, 
  Star, 
  ShieldCheck, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  UploadCloud
} from 'lucide-react';

export const DriverEcosystemDashboard: React.FC = () => {
  const { drivers, vehicles, addNewVehicleListing } = useApp();

  const [activePartnerTab, setActivePartnerTab] = useState<'driver' | 'fleet_owner'>('driver');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadedDocName, setUploadedDocName] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // New vehicle form state
  const [showAddVehicleModal, setShowAddVehicleModal] = useState<boolean>(false);
  const [newVehName, setNewVehName] = useState<string>('');
  const [newVehCategory, setNewVehCategory] = useState<Vehicle['category']>('Scenic SUV');
  const [newVehRate, setNewVehRate] = useState<number>(1250);
  const [newVehSeats, setNewVehSeats] = useState<number>(5);
  const [newVehPlate, setNewVehPlate] = useState<string>('KA 01 EK 7700');
  const [newVehTransmission, setNewVehTransmission] = useState<'Automatic' | 'Manual'>('Automatic');

  const currentDriver = drivers[0]; // Captain Raghuveer

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedDocName) return;
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadModal(false);
      setUploadedDocName('');
    }, 2000);
  };

  const handleAddVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehName.trim()) return;

    addNewVehicleListing({
      name: newVehName.trim(),
      category: newVehCategory,
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
      seats: newVehSeats,
      transmission: newVehTransmission,
      fuelType: 'Diesel',
      baseHourlyRate: newVehRate,
      includedKmPerHour: 25,
      extraKmRate: 35,
      features: ['Panoramic Sunroof', 'Air Purification', '360 Camera'],
      luggageCapacity: 4,
      licensePlate: newVehPlate,
      color: 'Midnight Obsidian',
      specs: {
        sunroof: true,
        soundSystem: 'Hi-Fi Audio',
        groundClearance: '210 mm',
        enginePower: '200 bhp'
      }
    });

    setShowAddVehicleModal(false);
    setNewVehName('');
  };

  return (
    <div className="py-12 bg-grey-950/70 backdrop-blur-xl border-t border-grey-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Sub-persona switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-charcoal-900/90 border border-slate-700/80 shadow-2xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 mb-2">
              <UserCheck className="w-3.5 h-3.5" />
              <span>KRYNKET PARTNER ECOSYSTEM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Partner Terminal & Fleet Management
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-charcoal-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActivePartnerTab('driver')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activePartnerTab === 'driver'
                  ? 'bg-amber-400 text-charcoal-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Chauffeur Terminal
            </button>
            <button
              onClick={() => setActivePartnerTab('fleet_owner')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activePartnerTab === 'fleet_owner'
                  ? 'bg-amber-400 text-charcoal-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Fleet Owner Listings
            </button>
          </div>
        </div>

        {/* DRIVER / CHAUFFEUR TAB */}
        {activePartnerTab === 'driver' && (
          <div className="space-y-6">
            
            {/* Online Status & Live Earnings Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Online switch card */}
              <div className="p-5 rounded-2xl bg-grey-900 border border-grey-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Dispatch Readiness</div>
                  <div className={`text-base font-bold ${isOnline ? 'text-yellow-400' : 'text-slate-400'}`}>
                    {isOnline ? '● Ready For Drives' : '○ Offline / Resting'}
                  </div>
                </div>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className="p-1 rounded-full text-slate-300"
                >
                  {isOnline ? (
                    <ToggleRight className="w-8 h-8 text-yellow-400" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-600" />
                  )}
                </button>
              </div>

              {/* Today's Earnings */}
              <div className="p-5 rounded-2xl bg-grey-900 border border-grey-800">
                <div className="text-[10px] font-mono uppercase text-slate-400">Today's Payout</div>
                <div className="text-2xl font-display font-black text-white mt-0.5">₹2,800</div>
                <div className="text-[11px] text-yellow-400 font-mono mt-0.5">2 Trips Completed</div>
              </div>

              {/* Weekly Earnings */}
              <div className="p-5 rounded-2xl bg-grey-900 border border-grey-800">
                <div className="text-[10px] font-mono uppercase text-slate-400">Weekly Payout</div>
                <div className="text-2xl font-display font-black text-yellow-400 mt-0.5">₹21,450</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">Next settlement on Friday</div>
              </div>

              {/* Reliability Rating */}
              <div className="p-5 rounded-2xl bg-grey-900 border border-grey-800">
                <div className="text-[10px] font-mono uppercase text-slate-400">Chauffeur Rating</div>
                <div className="text-2xl font-display font-black text-yellow-400 mt-0.5 flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400" /> {currentDriver.rating}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {currentDriver.totalTrips} Total Escorts
                </div>
              </div>
            </div>

            {/* Upcoming Trip Assigned Card */}
            <div className="p-6 rounded-3xl bg-grey-900 border border-grey-750/80 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-grey-800">
                <span className="text-xs font-mono uppercase text-yellow-400 font-bold">
                  UPCOMING ASSIGNED TRIP • DISPATCH QUEUE
                </span>
                <span className="text-xs text-slate-400 font-mono">Trip #KM-2026-9921</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                <div>
                  <div className="text-slate-400 uppercase font-mono text-[10px]">Customer & Pickup</div>
                  <div className="font-bold text-white text-sm mt-0.5">Yashvi Surana</div>
                  <div className="text-slate-400">Indiranagar 100ft Road, Bengaluru</div>
                </div>

                <div>
                  <div className="text-slate-400 uppercase font-mono text-[10px]">Destination & Time</div>
                  <div className="font-bold text-white text-sm mt-0.5">Nandi Hills Sunrise Point</div>
                  <div className="text-slate-400">Tomorrow at 04:30 AM (4 Hours)</div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => alert('Customer contacted via in-app terminal.')}
                    className="px-4 py-2 rounded-xl bg-grey-800 hover:bg-grey-750 text-white text-xs font-semibold border border-grey-700"
                  >
                    Call Customer
                  </button>
                  <button
                    onClick={() => alert('Trip dispatch confirmed.')}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-grey-950 font-bold text-xs shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all"
                  >
                    Confirm Dispatch
                  </button>
                </div>
              </div>
            </div>

            {/* Driver Verification Status & Document Upload */}
            <div className="p-6 rounded-3xl bg-grey-900 border border-grey-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Verification Status & Credentials</h3>
                  <p className="text-xs text-slate-400">All submitted documents are cross-checked with Government & Police databases.</p>
                </div>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 rounded-xl bg-grey-800 hover:bg-grey-750 text-xs font-semibold text-white border border-grey-700 flex items-center gap-1.5"
                >
                  <UploadCloud className="w-4 h-4 text-yellow-400" />
                  <span>Submit Document</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {currentDriver.documents.map((doc) => (
                  <div key={doc.id} className="p-4 rounded-2xl bg-grey-950 border border-grey-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-slate-400">{doc.type}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-400 font-bold">
                        {doc.status}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-white truncate">{doc.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono truncate">{doc.documentNumber}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* FLEET OWNER TAB */}
        {activePartnerTab === 'fleet_owner' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Your Listed Fleet Vehicles</h3>
                <p className="text-xs text-slate-400">Earn monthly returns by hosting verified premium vehicles in the Krynket Miles Ecosystem.</p>
              </div>
              <button
                onClick={() => setShowAddVehicleModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-grey-950 font-bold text-xs shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ List New Vehicle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((veh) => (
                <div key={veh.id} className="p-4 rounded-3xl bg-grey-900 border border-grey-800 space-y-3 shadow-xl">
                  <div className="h-44 rounded-2xl overflow-hidden relative">
                    <img src={veh.image} alt={veh.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-grey-950/80 text-[10px] font-mono text-yellow-400">
                      {veh.verificationStatus}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white truncate">{veh.name}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{veh.category}</span>
                    <span className="font-mono text-white font-bold">₹{veh.baseHourlyRate}/hr</span>
                  </div>
                  <div className="pt-2 border-t border-grey-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">{veh.licensePlate}</span>
                    <span className="text-yellow-400 font-semibold">Active & Bookable</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: SUBMIT DRIVER DOCUMENT */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-grey-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-grey-900 border border-grey-750 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Upload Verification Document</h3>
              <p className="text-xs text-slate-400">Simulate submission of commercial badge or character verification certificate.</p>
              
              <form onSubmit={handleDocumentSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Document Title (e.g. Hill Driving Endorsement)"
                  value={uploadedDocName}
                  onChange={(e) => setUploadedDocName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-grey-950 border border-grey-700 text-xs text-white focus:outline-none"
                  required
                />

                <div className="border-2 border-dashed border-grey-700 rounded-2xl p-6 text-center text-xs text-slate-400">
                  <UploadCloud className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <span>Click to browse or drop certificate PDF/JPG (Demo)</span>
                </div>

                {uploadSuccess && (
                  <div className="text-xs text-yellow-400 text-center font-bold">
                    ✓ Document submitted for Admin KYC queue!
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl bg-grey-800 text-xs text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-grey-950 font-bold text-xs shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: LIST NEW FLEET VEHICLE */}
        {showAddVehicleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-charcoal-900 border border-slate-700 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">List Your Vehicle on Krynket Miles</h3>
              
              <form onSubmit={handleAddVehicleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Vehicle Make & Model</label>
                  <input
                    type="text"
                    value={newVehName}
                    onChange={(e) => setNewVehName(e.target.value)}
                    placeholder="e.g. BMW X5 xDrive40i M Sport"
                    className="w-full p-2.5 rounded-xl bg-charcoal-950 border border-slate-700 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <select
                      value={newVehCategory}
                      onChange={(e) => setNewVehCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-charcoal-950 border border-slate-700 text-white"
                    >
                      <option value="Scenic SUV">Scenic SUV</option>
                      <option value="Luxury Sedan">Luxury Sedan</option>
                      <option value="Electric GT">Electric GT</option>
                      <option value="Open Top / Convertible">Open Top / Convertible</option>
                      <option value="Premium MPV">Premium MPV</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Hourly Rental Rate (₹)</label>
                    <input
                      type="number"
                      value={newVehRate}
                      onChange={(e) => setNewVehRate(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-charcoal-950 border border-slate-700 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Registration Plate</label>
                    <input
                      type="text"
                      value={newVehPlate}
                      onChange={(e) => setNewVehPlate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-charcoal-950 border border-slate-700 text-white uppercase font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Seats</label>
                    <input
                      type="number"
                      value={newVehSeats}
                      onChange={(e) => setNewVehSeats(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-charcoal-950 border border-slate-700 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddVehicleModal(false)}
                    className="px-4 py-2 rounded-xl bg-charcoal-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-400 text-charcoal-950 font-bold"
                  >
                    Save & Publish Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
