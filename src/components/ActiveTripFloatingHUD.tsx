import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Navigation, 
  Radio, 
  AlertTriangle, 
  ShieldAlert, 
  ChevronUp, 
  ChevronDown, 
  Clock, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export const ActiveTripFloatingHUD: React.FC = () => {
  const { 
    activeTrip, 
    tripProgress, 
    simulatedSpeed, 
    isRouteDeviated, 
    openSosModal, 
    checkInDueInSeconds, 
    completeCheckIn 
  } = useApp();

  const [expanded, setExpanded] = useState<boolean>(false);

  if (!activeTrip) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm w-full transition-all">
      <div className={`rounded-3xl border shadow-2xl backdrop-blur-xl p-4 transition-all ${
        isRouteDeviated
          ? 'bg-red-950/90 border-red-500 shadow-red-950/50'
          : 'bg-grey-900/95 border-yellow-400/40 shadow-neon-yellow'
      }`}>
        
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <img
                src={activeTrip.driver.avatar}
                alt={activeTrip.driver.name}
                className="w-10 h-10 rounded-xl object-cover border border-grey-700"
              />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 absolute -bottom-0.5 -right-0.5 border-2 border-grey-900 animate-pulse" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-yellow-400 uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
                Live Escort
              </div>
              <div className="text-xs font-bold text-white truncate">{activeTrip.driver.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct SOS Trigger */}
            <button
              onClick={openSosModal}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs uppercase shadow-md flex items-center gap-1 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>

            {/* Expand / Collapse toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-xl bg-grey-800 text-slate-300 hover:text-white"
            >
              {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Quick status bar */}
        <div className="mt-3 pt-2.5 border-t border-grey-800 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-yellow-400 animate-pulse" />
            <span>Speed: <strong className="text-white font-mono">{simulatedSpeed}</strong> km/h</span>
          </div>

          <div className="text-slate-400">
            Progress: <strong className="text-yellow-400 font-mono">{tripProgress}%</strong>
          </div>

          <div className="text-slate-400">
            Check-in: <strong className="text-white font-mono">{formatTime(checkInDueInSeconds)}</strong>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-grey-950 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isRouteDeviated ? 'bg-red-500' : 'bg-yellow-400'
            }`}
            style={{ width: `${tripProgress}%` }}
          />
        </div>

        {/* Expanded Telemetry Drawer */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-grey-800/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Destination:</span>
              <span className="text-white font-medium truncate max-w-[180px]">{activeTrip.destination}</span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span>Vehicle:</span>
              <span className="text-white font-mono">{activeTrip.vehicle?.name || 'Personal Car'}</span>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={completeCheckIn}
                className="flex-1 py-1.5 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 font-semibold text-[11px] border border-yellow-400/30 flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirm Safe</span>
              </button>

              <a
                href={`tel:${activeTrip.driver.phone}`}
                className="px-3 py-1.5 rounded-lg bg-grey-800 hover:bg-grey-750 text-white font-semibold text-[11px] flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3 text-yellow-400" />
                <span>Call Chauffeur</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
