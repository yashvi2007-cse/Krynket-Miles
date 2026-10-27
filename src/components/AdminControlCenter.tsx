import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  Users, 
  UserCheck, 
  Car, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  IndianRupee,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminControlCenter: React.FC = () => {
  const { drivers, updateDriverStatus, vehicles, bookings } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'verifications' | 'fleet' | 'incidents' | 'kpis'>('verifications');

  // Interactive verification action
  const handleApproveDriver = (driverId: string) => {
    updateDriverStatus(driverId, 'Verified');
  };

  const handleRejectDriver = (driverId: string) => {
    updateDriverStatus(driverId, 'Rejected');
  };

  return (
    <div className="py-12 bg-grey-950/70 backdrop-blur-xl border-t border-grey-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-charcoal-900/90 border border-purple-500/30 shadow-2xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400 mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>KRYNKET ADMIN OPERATIONS CONTROL CENTER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Platform Governance & Safety Auditing
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-charcoal-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveAdminTab('verifications')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeAdminTab === 'verifications'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Verification Queue
            </button>
            <button
              onClick={() => setActiveAdminTab('fleet')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeAdminTab === 'fleet'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Fleet Catalog
            </button>
            <button
              onClick={() => setActiveAdminTab('incidents')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeAdminTab === 'incidents'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Safety Incidents
            </button>
          </div>
        </div>

        {/* TOP LEVEL PLATFORM KPIS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-grey-900 border border-grey-800">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-yellow-400" /> Total Registered Customers
            </div>
            <div className="text-2xl font-display font-extrabold text-white mt-1">12,480</div>
            <div className="text-[11px] text-yellow-400 mt-1 font-mono">+14% MoM Growth</div>
          </div>

          <div className="p-4 rounded-2xl bg-grey-900 border border-grey-800">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-yellow-400" /> Verified Chauffeurs
            </div>
            <div className="text-2xl font-display font-extrabold text-white mt-1">184</div>
            <div className="text-[11px] text-amber-400 mt-1 font-mono">1 Pending Verification</div>
          </div>

          <div className="p-4 rounded-2xl bg-grey-900 border border-grey-800">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-amber-300" /> Fleet Units Hosted
            </div>
            <div className="text-2xl font-display font-extrabold text-white mt-1">42</div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">Luxury Sedans & SUVs</div>
          </div>

          <div className="p-4 rounded-2xl bg-grey-900 border border-grey-800">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-yellow-400" /> Monthly Gross GMV
            </div>
            <div className="text-2xl font-display font-extrabold text-yellow-400 mt-1">₹48.2L</div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">Demo Metrics (Realistic)</div>
          </div>
        </div>

        {/* TAB 1: VERIFICATION QUEUE WITH LIVE ACTIONS */}
        {activeAdminTab === 'verifications' && (
          <div className="p-6 rounded-3xl bg-grey-900 border border-grey-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-grey-800">
              <div>
                <h3 className="text-lg font-bold text-white">Chauffeur KYC & Identity Queue</h3>
                <p className="text-xs text-slate-400">
                  Review applicant documents and update official registry status.
                </p>
              </div>
              <span className="text-xs font-mono text-yellow-400">
                Action Required: {drivers.filter((d) => d.verificationStatus === 'Pending').length} Pending
              </span>
            </div>

            <div className="space-y-4">
              {drivers.map((drv) => (
                <div
                  key={drv.id}
                  className="p-5 rounded-2xl bg-grey-950 border border-grey-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={drv.avatar}
                      alt={drv.name}
                      className="w-12 h-12 rounded-xl object-cover border border-grey-700 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{drv.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          drv.verificationStatus === 'Verified'
                            ? 'bg-yellow-400/20 text-yellow-400'
                            : drv.verificationStatus === 'Pending'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {drv.verificationStatus}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {drv.experienceYears} Years Exp • {drv.specialty} • {drv.city}
                      </div>

                      {/* Documents snippet */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {drv.documents.map((d) => (
                          <span key={d.id} className="text-[10px] font-mono px-2 py-0.5 rounded bg-grey-900 border border-grey-800 text-slate-300">
                            {d.name}: <strong className="text-yellow-400">{d.status}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Approve / Reject Controls */}
                  <div className="flex items-center gap-2">
                    {drv.verificationStatus !== 'Verified' && (
                      <button
                        onClick={() => handleApproveDriver(drv.id)}
                        className="px-4 py-2 rounded-xl bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 border border-yellow-400/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Verification</span>
                      </button>
                    )}

                    {drv.verificationStatus !== 'Rejected' && (
                      <button
                        onClick={() => handleRejectDriver(drv.id)}
                        className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject Documents</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: FLEET CATALOG */}
        {activeAdminTab === 'fleet' && (
          <div className="p-6 rounded-3xl bg-grey-900 border border-grey-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Active Fleet Vehicles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {vehicles.map((v) => (
                <div key={v.id} className="p-4 rounded-2xl bg-grey-950 border border-grey-800 space-y-2">
                  <div className="font-bold text-sm text-white">{v.name}</div>
                  <div className="text-slate-400 font-mono">{v.category} • {v.licensePlate}</div>
                  <div className="text-yellow-400 font-mono font-bold">₹{v.baseHourlyRate}/hr</div>
                  <div className="text-[10px] text-slate-500">Status: Verified Fleet Listing</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SAFETY INCIDENTS */}
        {activeAdminTab === 'incidents' && (
          <div className="p-6 rounded-3xl bg-grey-900 border border-grey-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Emergency Response Audit Logs</h3>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-grey-950 border border-grey-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-yellow-400">INC-2026-9041 • Route Deviation Check</div>
                  <div className="text-slate-400 mt-0.5">Customer requested verification check near Bellary bypass. Chauffeur confirmed safe brief halt.</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-yellow-400/20 text-yellow-400 font-mono text-[10px]">
                  Resolved
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-grey-950 border border-grey-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">INC-2026-8812 • Flat Tyre Assistance</div>
                  <div className="text-slate-400 mt-0.5">Quick spare change completed in 12 minutes by Chauffeur Raghuveer. Trip completed without delay.</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-yellow-400/20 text-yellow-400 font-mono text-[10px]">
                  Closed
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
