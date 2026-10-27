import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  AlertTriangle, 
  PhoneCall, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  Radio, 
  MapPin, 
  UserCheck, 
  Clock, 
  Info,
  RotateCcw
} from 'lucide-react';

export const SosEmergencyModal: React.FC = () => {
  const { 
    isSosModalOpen, 
    closeSosModal, 
    sosStatus, 
    triggerSosAlert, 
    resetSosAlert, 
    emergencyContacts, 
    activeTrip 
  } = useApp();

  const [incidentReported, setIncidentReported] = useState<boolean>(false);
  const [incidentId, setIncidentId] = useState<string>('INC-2026-9041');

  if (!isSosModalOpen) return null;

  const handleTriggerEmergency = () => {
    triggerSosAlert();
    setIncidentReported(true);
    setIncidentId(`INC-${Date.now().toString().slice(-6)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-red-950/80 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-grey-950 border-2 border-red-500 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-100">
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500 animate-pulse">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Krynket SOS Rapid Emergency Response System
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white">
                Emergency Assistance Portal
              </h3>
            </div>
          </div>

          <button
            onClick={closeSosModal}
            className="p-2 rounded-xl bg-grey-900 border border-grey-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core SOS Status State */}
        {sosStatus !== 'triggered' ? (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-grey-900/90 border border-grey-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Active Trip Telemetry Ready
              </div>
              <div><strong>Vehicle:</strong> {activeTrip?.vehicle?.name || 'Customer Personal Vehicle'} ({activeTrip?.vehicle?.licensePlate || 'KA 03 MZ 9999'})</div>
              <div><strong>Chauffeur:</strong> {activeTrip?.driver?.name} ({activeTrip?.driver?.phone})</div>
              <div><strong>GPS Coordinates:</strong> 13.2005° N, 77.6980° E (Bellary Highway Corridor)</div>
            </div>

            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-xs text-red-200">
              <p className="font-bold mb-1">Activating Emergency Broadcast will immediately:</p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-red-300">
                <li>Simulate an automated SMS with real-time GPS location to {emergencyContacts.length} trusted contacts.</li>
                <li>Connect you directly to national emergency services (112 India).</li>
                <li>Record a priority incident ticket in the Krynket Safety Shield audit log.</li>
              </ul>
            </div>

            {/* Direct Trigger Action Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleTriggerEmergency}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-base shadow-lg shadow-red-600/40 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>BROADCAST SOS ALERT</span>
              </button>

              <a
                href="tel:112"
                className="w-full py-4 px-6 rounded-2xl bg-grey-900 border border-grey-700 hover:border-grey-500 text-white font-bold text-base flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-5 h-5 text-yellow-400" />
                <span>Call 112 Directly</span>
              </a>
            </div>

            {/* Simulated Disclosure */}
            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 justify-center">
              <Info className="w-3.5 h-3.5" />
              <span>Simulated Prototype Mode. Does not contact actual law enforcement without real dial.</span>
            </div>
          </div>
        ) : (
          /* SOS Triggered State */
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500 text-center space-y-2">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-mono font-bold animate-pulse">
                SOS BROADCAST ACTIVE • INCIDENT #{incidentId}
              </span>
              <h4 className="text-xl font-bold text-white">Emergency Broadcast Dispatched</h4>
              <p className="text-xs text-red-200">
                Live location link has been broadcast to all registered trusted emergency contacts.
              </p>
            </div>

            {/* Broadcast Details Table */}
            <div className="p-4 rounded-2xl bg-grey-900 border border-grey-800 space-y-3 text-xs">
              <div className="font-bold text-white flex items-center justify-between pb-2 border-b border-grey-800">
                <span>Emergency Broadcast Recipients</span>
                <span className="text-yellow-400 font-mono text-[10px]">SMS Sent (Simulated)</span>
              </div>

              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between py-1 text-slate-300">
                  <div>
                    <div className="font-semibold text-white">{contact.name} ({contact.relation})</div>
                    <div className="text-[11px] text-slate-400 font-mono">{contact.phone}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-400 text-[10px] font-mono">
                    ✓ Notified
                  </span>
                </div>
              ))}
            </div>

            {/* Immediate Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <a
                href="tel:112"
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Police / Medical (112)</span>
              </a>

              <button
                onClick={resetSosAlert}
                className="px-5 py-3 rounded-xl bg-grey-800 hover:bg-grey-700 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Cancel / False Alarm</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
