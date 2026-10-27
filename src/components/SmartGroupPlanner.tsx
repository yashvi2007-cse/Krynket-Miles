import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Share2, 
  Sparkles, 
  Check, 
  MapPin, 
  Plus, 
  ThumbsUp, 
  IndianRupee, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Copy
} from 'lucide-react';

export const SmartGroupPlanner: React.FC = () => {
  const { groupTrip, addStopVote, addGroupStop, openBookingModal, updateBookingDraft } = useApp();

  const [copiedInvite, setCopiedInvite] = useState(false);
  const [newStopName, setNewStopName] = useState('');

  const memberCount = groupTrip.members.length;
  const perPersonExpense = Math.round(groupTrip.budgetGoal / memberCount);

  const handleCopyInvite = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2500);
  };

  const handleAddStopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStopName.trim()) return;
    addGroupStop(newStopName.trim());
    setNewStopName('');
  };

  const handleProceedToBooking = () => {
    updateBookingDraft({
      destination: groupTrip.title,
      durationHours: groupTrip.durationHours,
      passengers: memberCount,
      budget: groupTrip.budgetGoal,
      model: 'vehicle_and_driver'
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
              <Users className="w-3.5 h-3.5" />
              <span>SMART GROUP TRIP PLANNER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Collaborative Road Trips. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-slate-100 neon-glow-text">
                Vote On Stops, Split Fares, Hit The Road.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyInvite}
              className="px-4 py-2.5 rounded-xl bg-grey-900 hover:bg-grey-850 border border-grey-700 text-grey-200 text-xs font-medium flex items-center gap-2 transition-colors hover:border-yellow-400/40 shadow-sm"
            >
              {copiedInvite ? <Check className="w-4 h-4 text-yellow-400" /> : <Copy className="w-4 h-4 text-grey-400" />}
              <span>{copiedInvite ? 'Invite Link Copied!' : 'Invite Friends Link'}</span>
            </button>
          </div>
        </div>

        {/* Group Trip Workspace Card */}
        <div className="bg-grey-900/80 backdrop-blur-xl rounded-3xl border border-grey-700/80 p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Top Title & Member Avatars */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-grey-800">
            <div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-400 font-bold border border-yellow-400/30">
                COLLABORATIVE ROOM ACTIVE
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {groupTrip.title}
              </h3>
              <div className="text-xs text-grey-400 mt-1 flex items-center gap-2">
                <span>{groupTrip.durationHours} Hours Scenic</span>
                <span>•</span>
                <span>{groupTrip.selectedVehicleCategory}</span>
              </div>
            </div>

            {/* Members Stack */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                {groupTrip.members.map((m, idx) => (
                  <img
                    key={idx}
                    src={m.avatar}
                    alt={m.name}
                    title={m.name}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-grey-900 object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{memberCount} Friends Joined</div>
                <div className="text-[11px] text-yellow-400 font-mono">3 Confirmed Paid Share</div>
              </div>
            </div>
          </div>

          {/* Fare Splitter Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-grey-950/80 border border-grey-800">
              <div className="text-xs font-mono uppercase text-grey-400 mb-1">
                Total Shared Budget
              </div>
              <div className="text-2xl font-display font-black text-white">
                ₹{groupTrip.budgetGoal.toLocaleString()}
              </div>
              <div className="text-[11px] text-grey-400 mt-1">Includes 8h Chauffeur + Innova Crysta 7-Seater + Fuel</div>
            </div>

            <div className="p-4 rounded-2xl bg-grey-950/80 border border-yellow-400/40 shadow-neon-yellow">
              <div className="text-xs font-mono uppercase text-yellow-400 mb-1 flex items-center gap-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Fair Per-Person Split
              </div>
              <div className="text-2xl font-display font-black text-yellow-400 neon-glow-text">
                ₹{perPersonExpense.toLocaleString()} <span className="text-xs text-grey-400 font-normal">/ person</span>
              </div>
              <div className="text-[11px] text-grey-300 mt-1">Split equally among {memberCount} passengers</div>
            </div>

            <div className="p-4 rounded-2xl bg-grey-950/80 border border-grey-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white mb-0.5">Ready to Lock Itinerary?</div>
                <div className="text-[11px] text-grey-400">All members voted on stops.</div>
              </div>
              <button
                onClick={handleProceedToBooking}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-grey-950 font-black text-xs shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all"
              >
                Book For Group
              </button>
            </div>
          </div>

          {/* Collaborative Stops & Voting Board */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-grey-300">
                Itinerary Waypoints & Friend Voting
              </h4>
              <span className="text-xs text-grey-500 font-mono">
                Click thumbs-up to cast vote
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {groupTrip.stops.map((stop) => (
                <div
                  key={stop.id}
                  className="p-4 rounded-2xl bg-grey-950/80 border border-grey-800 flex items-center justify-between hover:border-grey-700 transition-colors"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="font-bold text-xs text-white leading-snug">{stop.name}</div>
                    <div className="text-[11px] text-grey-400 font-mono mt-0.5">
                      Suggested by {stop.addedBy}
                    </div>
                  </div>

                  <button
                    onClick={() => addStopVote(stop.id)}
                    className="px-3 py-1.5 rounded-xl bg-grey-900 hover:bg-yellow-400/20 text-grey-300 hover:text-yellow-400 border border-grey-700 hover:border-yellow-400/40 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{stop.votes}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Stop Input Form */}
            <form onSubmit={handleAddStopSubmit} className="flex gap-3">
              <input
                type="text"
                value={newStopName}
                onChange={(e) => setNewStopName(e.target.value)}
                placeholder="Suggest a scenic halt (e.g. Hilltop Viewpoint Cafe, Waterfall Lookout)..."
                className="flex-1 p-3 rounded-2xl bg-grey-950/80 border border-grey-800 text-xs text-white placeholder-grey-500 focus:outline-none focus:border-yellow-400"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-grey-850 hover:bg-grey-800 text-white font-bold text-xs border border-grey-700 hover:border-yellow-400/40 flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4 text-yellow-400" />
                <span>Add Stop</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
