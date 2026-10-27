import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  UserCheck, 
  FileCheck2, 
  MapPin, 
  Radio, 
  Phone, 
  Share2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Info, 
  Coffee, 
  WifiOff, 
  HeartHandshake,
  QrCode,
  Copy,
  Check
} from 'lucide-react';

export const SafetyShield: React.FC = () => {
  const { 
    drivers, 
    activeTrip, 
    emergencyContacts, 
    addEmergencyContact, 
    removeEmergencyContact,
    checkInDueInSeconds,
    completeCheckIn,
    openSosModal,
    isRouteDeviated,
    toggleRouteDeviation
  } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('Friend');
  const [showAddContact, setShowAddContact] = useState(false);

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText('https://krynketmiles.com/live/KM-ACTIVE-001?auth=demo');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    addEmergencyContact({
      name: newContactName.trim(),
      phone: newContactPhone.trim(),
      relation: newContactRelation,
      notifyOnSos: true,
      notifyOnStart: true
    });
    setNewContactName('');
    setNewContactPhone('');
    setShowAddContact(false);
  };

  return (
    <div className="py-12 bg-grey-950/70 backdrop-blur-xl border-t border-grey-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-xs font-mono text-yellow-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span>KRYNKET SAFETY SHIELD PROTOCOL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Safety Architecture & <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-slate-100 neon-glow-text">
                Active Journey Guardian
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openSosModal}
              className="px-5 py-2.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center gap-2 transition-colors"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>Test SOS Emergency Modal</span>
            </button>
          </div>
        </div>

        {/* ACTIVE JOURNEY TELEMETRY & LIVE CHECK-IN STATUS */}
        <div className="p-6 rounded-3xl bg-grey-900/80 backdrop-blur-xl border border-grey-700/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-grey-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-yellow-400 font-semibold mb-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                ACTIVE ESCORT TELEMETRY • TRIP #KM-ACTIVE-001
              </div>
              <h3 className="text-xl font-bold text-white">
                Live Companion HUD & Scheduled Check-in
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyShareLink}
                className="px-3.5 py-2 rounded-xl bg-grey-800 hover:bg-grey-750 text-slate-200 text-xs font-medium border border-grey-700 flex items-center gap-2 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-yellow-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Live Trip Link'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Scheduled Check-in Monitor */}
            <div className="p-4 rounded-2xl bg-grey-950 border border-grey-800 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-yellow-400" /> Scheduled Safety Check-in
                </div>
                <div className="text-xs text-slate-300 mb-4">
                  Krynket Shield prompts periodic confirmations to guarantee passenger comfort and driver alertness.
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-grey-900 border border-grey-800">
                  <span className="text-xs text-slate-400">Next Prompt Due in:</span>
                  <span className="font-mono text-lg font-bold text-yellow-400">
                    {formatTime(checkInDueInSeconds)}
                  </span>
                </div>

                <button
                  onClick={completeCheckIn}
                  className="w-full py-2.5 rounded-xl bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 font-bold text-xs border border-yellow-400/40 flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>I am Safe & Comfortable (Confirm)</span>
                </button>
              </div>
            </div>

            {/* 2. Route Deviation Intelligence */}
            <div className="p-4 rounded-2xl bg-grey-950 border border-grey-800 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                  <Radio className="w-3.5 h-3.5 text-yellow-400" /> Route Deviation Guardian
                </div>
                <div className="text-xs text-slate-300 mb-4">
                  Live comparison of vehicle GPS coordinates against planned route corridor. Triggers instant inquiry if off-track &gt; 2 km.
                </div>
              </div>

              <div className="space-y-3">
                <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                  isRouteDeviated
                    ? 'bg-red-950/60 border-red-500/80 text-red-200'
                    : 'bg-yellow-950/30 border-yellow-500/40 text-yellow-300'
                }`}>
                  <span>Status:</span>
                  <span>{isRouteDeviated ? 'Off-Route Alert Active' : 'Normal Highway Corridor'}</span>
                </div>

                <button
                  onClick={toggleRouteDeviation}
                  className="w-full py-2.5 rounded-xl bg-grey-900 hover:bg-grey-850 text-slate-300 text-xs font-medium border border-grey-800 transition-colors"
                >
                  {isRouteDeviated ? 'Resolve Deviation State' : 'Simulate Off-Route Deviation'}
                </button>
              </div>
            </div>

            {/* 3. Driver Rest & Fatigue Monitor */}
            <div className="p-4 rounded-2xl bg-grey-950 border border-grey-800 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                  <Coffee className="w-3.5 h-3.5 text-yellow-400" /> Fatigue & Rest Compliance
                </div>
                <div className="text-xs text-slate-300 mb-4">
                  Mandatory 15-minute rest break required every 4 continuous hours of driving. Chauffeur fatigue score monitored.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-grey-900 border border-grey-800 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Continuous Drive Time:</span>
                  <span className="font-mono text-white">1h 45m</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Driver Alertness Index:</span>
                  <span className="font-mono text-yellow-400 font-bold">100% (Optimal)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Next Planned Rest Break:</span>
                  <span className="font-mono text-slate-400">In 2h 15m</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4-TIER DRIVER VERIFICATION ECOSYSTEM */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Rigorous Multi-Tier Background Checks
              </div>
              <h3 className="text-2xl font-display font-extrabold text-white">
                Driver Verification Registry
              </h3>
            </div>
            <span className="text-xs font-mono text-yellow-400">
              Official States: Pending • Verified • Rejected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {drivers.map((drv) => (
              <div 
                key={drv.id}
                className="p-4 rounded-2xl bg-grey-900/80 border border-grey-800 space-y-4 hover:border-grey-700 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={drv.avatar}
                    alt={drv.name}
                    className="w-12 h-12 rounded-xl object-cover border border-grey-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white truncate">{drv.name}</h4>
                    <div className="text-[11px] text-slate-400 font-mono">{drv.experienceYears} Years Exp • {drv.city}</div>
                    <div className="mt-1">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        drv.verificationStatus === 'Verified'
                          ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                          : drv.verificationStatus === 'Pending'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {drv.verificationStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Document Status Breakdown */}
                <div className="space-y-1.5 text-xs pt-3 border-t border-grey-800">
                  {drv.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between py-0.5">
                      <span className="text-slate-400 text-[11px] truncate">{doc.name}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        doc.status === 'Verified'
                          ? 'bg-yellow-400/10 text-yellow-400'
                          : doc.status === 'Pending'
                          ? 'bg-amber-500/10 text-amber-300'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-grey-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Reliability Score:</span>
                  <span className="font-mono font-bold text-yellow-400">{drv.reliabilityScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TRUSTED EMERGENCY CONTACTS SECTION */}
        <div className="p-6 rounded-3xl bg-grey-900/90 border border-grey-750/80 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Automated Incident Alert Network
              </div>
              <h3 className="text-xl font-bold text-white">
                Designated Trusted Emergency Contacts
              </h3>
            </div>

            <button
              onClick={() => setShowAddContact(!showAddContact)}
              className="px-4 py-2 rounded-xl bg-grey-800 hover:bg-grey-750 border border-grey-700 text-xs font-semibold text-white transition-colors"
            >
              {showAddContact ? 'Cancel' : '+ Add Trusted Contact'}
            </button>
          </div>

          {/* Add contact form */}
          {showAddContact && (
            <form onSubmit={handleAddContactSubmit} className="mb-6 p-4 rounded-2xl bg-grey-950 border border-grey-800 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 rounded-xl bg-grey-900 border border-grey-700 text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Relationship</label>
                <select
                  value={newContactRelation}
                  onChange={(e) => setNewContactRelation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-grey-900 border border-grey-700 text-white focus:outline-none cursor-pointer"
                >
                  <option value="Spouse / Partner">Spouse / Partner</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Colleague">Colleague</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 rounded-xl bg-grey-900 border border-grey-700 text-white focus:outline-none font-mono"
                  required
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-grey-950 font-bold hover:brightness-110 active:scale-95 transition-all shadow-neon-yellow"
                >
                  Save Contact
                </button>
              </div>
            </form>
          )}

          {/* Contacts List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="p-3.5 rounded-2xl bg-grey-950 border border-grey-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-white">{contact.name}</div>
                  <div className="text-xs text-slate-400">{contact.relation}</div>
                  <div className="text-xs text-yellow-400 font-mono mt-0.5">{contact.phone}</div>
                </div>

                <button
                  onClick={() => removeEmergencyContact(contact.id)}
                  className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SAFETY INTELLIGENCE NOTICES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-grey-900/60 border border-grey-800 text-xs space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <WifiOff className="w-4 h-4" /> Low-Connectivity Mountain Corridors
            </div>
            <p className="text-slate-400 leading-relaxed">
              When travelling through deep forest ghats (e.g. Bisle or Nandi descent), Krynket Shield pre-downloads offline topographic maps and emergency waypoints to the chauffeur terminal.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-grey-900/60 border border-grey-800 text-xs space-y-2">
            <div className="font-bold text-yellow-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Zero Fabricated Verification Guarantee
            </div>
            <p className="text-slate-400 leading-relaxed">
              We never treat an uploaded document as officially verified without Government API (DigiLocker / Parivahan) and local police station character verification.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-grey-900/60 border border-grey-800 text-xs space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4" /> Passenger Feedback & Immediate Re-assignment
            </div>
            <p className="text-slate-400 leading-relaxed">
              If at any point during a trip you feel uncomfortable with the driving style, 1-tap re-routing or vehicle stop request is immediately registered on the driver terminal.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
