import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../context/AppContext';
import { 
  Navigation, 
  AlertTriangle, 
  ShieldAlert, 
  Compass, 
  Coffee, 
  Fuel, 
  RotateCcw,
  Crosshair,
  Radio
} from 'lucide-react';

// Journey coordinates (Indiranagar -> Hebbal -> Devanahalli -> Nandi Hills Peak)
const ROUTE_COORDINATES: [number, number][] = [
  [12.9784, 77.6408], // Indiranagar 100ft Rd
  [13.0033, 77.6245], // Fraser Town
  [13.0358, 77.5970], // Hebbal Flyover
  [13.1007, 77.5963], // Yelahanka
  [13.2417, 77.7138], // Devanahalli Airport corridor
  [13.3702, 77.6835], // Karahalli Cross (Nandi Base)
  [13.3776, 77.6830], // Nandi Foothills hairpin
  [13.3850, 77.6820], // Sunset viewpoint curve
  [13.3900, 77.6815], // Cloud Mist Peak (Destination)
];

// Off-route detour point to demonstrate deviation alarm
const OFF_ROUTE_COORDINATE: [number, number] = [13.2750, 77.6100]; // 5km West into unpaved farm road

// Nearby points of interest along the route
const NEARBY_POIS = [
  { id: 'poi-1', name: 'Nandi Valley Cloud Lookout', category: 'viewpoint', lat: 13.3750, lng: 77.6850, note: 'Panoramic sunrise valley view' },
  { id: 'poi-2', name: 'Artisanal Filter Chai & Bakery', category: 'cafe', lat: 13.2450, lng: 77.7160, note: 'Fresh roasted coffee & breakfast' },
  { id: 'poi-3', name: 'Fast EV DC Charger 60kW', category: 'fuel', lat: 13.1050, lng: 77.6000, note: 'Shell Recharge Hub' },
  { id: 'poi-4', name: 'Highway Trauma Center (Aster)', category: 'hospital', lat: 13.0400, lng: 77.6000, note: '24/7 Emergency response unit' },
  { id: 'poi-5', name: 'Tipu Sultan Fort Lookout', category: 'viewpoint', lat: 13.3880, lng: 77.6825, note: 'Scenic photography stop' },
];

export const InteractiveMap: React.FC = () => {
  const { 
    tripProgress, 
    simulatedSpeed, 
    isGpsSimulating, 
    toggleGpsSimulation,
    isRouteDeviated, 
    toggleRouteDeviation,
    openSosModal 
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const carMarkerRef = useRef<L.Marker | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const deviationPolylineRef = useRef<L.Polyline | null>(null);
  const poiLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Interpolate car coordinate according to progress (0% -> 100%)
  const getCurrentCarPosition = (): [number, number] => {
    if (isRouteDeviated) {
      return OFF_ROUTE_COORDINATE;
    }

    const totalSegments = ROUTE_COORDINATES.length - 1;
    const progressFraction = Math.min(Math.max(tripProgress / 100, 0), 1);
    const floatIndex = progressFraction * totalSegments;
    const segmentIndex = Math.min(Math.floor(floatIndex), totalSegments - 1);
    const segmentProgress = floatIndex - segmentIndex;

    const start = ROUTE_COORDINATES[segmentIndex];
    const end = ROUTE_COORDINATES[segmentIndex + 1];

    const lat = start[0] + (end[0] - start[0]) * segmentProgress;
    const lng = start[1] + (end[1] - start[1]) * segmentProgress;
    return [lat, lng];
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [13.1700, 77.6500],
        zoom: 11,
        zoomControl: false,
        attributionControl: false
      });

      // Pure White Clean OpenStreetMap tiles - 100% Free, NO API key required, NO watermark
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
      }).addTo(map);

      // Route polyline (Vibrant high-contrast amber/yellow route for white background)
      const routeLine = L.polyline(ROUTE_COORDINATES, {
        color: '#D97706',
        weight: 6,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);
      routePolylineRef.current = routeLine;

      // Start & Finish Markers
      const startIcon = L.divIcon({
        className: 'custom-start-marker',
        html: `<div class="w-8 h-8 rounded-full bg-grey-900 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 text-xs font-black shadow-lg">A</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      L.marker(ROUTE_COORDINATES[0], { icon: startIcon })
        .addTo(map)
        .bindPopup('<div class="text-slate-900 font-sans p-1"><strong>Pickup:</strong> Indiranagar 100ft Rd</div>');

      const endIcon = L.divIcon({
        className: 'custom-end-marker',
        html: `<div class="w-8 h-8 rounded-full bg-yellow-400 border-2 border-grey-900 text-grey-950 flex items-center justify-center font-black text-xs shadow-lg">B</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      L.marker(ROUTE_COORDINATES[ROUTE_COORDINATES.length - 1], { icon: endIcon })
        .addTo(map)
        .bindPopup('<div class="text-slate-900 font-sans p-1"><strong>Destination:</strong> Nandi Hills Cloud Mist Peak</div>');

      // Car GPS Marker
      const carPos = getCurrentCarPosition();
      const carIcon = L.divIcon({
        className: 'custom-car-marker',
        html: `<div class="relative flex items-center justify-center">
                <span class="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-yellow-400 opacity-75"></span>
                <div class="w-9 h-9 rounded-full bg-yellow-400 border-2 border-grey-900 text-grey-950 flex items-center justify-center font-bold shadow-xl transform -rotate-45">
                  🚘
                </div>
              </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });
      const carMarker = L.marker(carPos, { icon: carIcon }).addTo(map);
      carMarkerRef.current = carMarker;

      // POI layer
      poiLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup if needed
    };
  }, []);

  // Update Car Marker position on simulation tick
  useEffect(() => {
    if (!carMarkerRef.current || !mapInstanceRef.current) return;
    const newPos = getCurrentCarPosition();
    carMarkerRef.current.setLatLng(newPos);

    if (isRouteDeviated) {
      if (!deviationPolylineRef.current) {
        deviationPolylineRef.current = L.polyline([ROUTE_COORDINATES[4], OFF_ROUTE_COORDINATE], {
          color: '#EF4444',
          weight: 4,
          dashArray: '6, 6'
        }).addTo(mapInstanceRef.current);
      }
    } else {
      if (deviationPolylineRef.current) {
        deviationPolylineRef.current.remove();
        deviationPolylineRef.current = null;
      }
    }
  }, [tripProgress, isRouteDeviated]);

  // Update POIs according to filter
  useEffect(() => {
    if (!poiLayerRef.current) return;
    poiLayerRef.current.clearLayers();

    const filtered = NEARBY_POIS.filter(
      (p) => activeFilter === 'all' || p.category === activeFilter
    );

    filtered.forEach((poi) => {
      let iconHtml = '📍';
      let bgColor = 'bg-grey-900 text-yellow-400 border-yellow-500';

      if (poi.category === 'viewpoint') {
        iconHtml = '🌄';
        bgColor = 'bg-amber-500 text-grey-950 border-amber-600';
      } else if (poi.category === 'fuel') {
        iconHtml = '⚡';
        bgColor = 'bg-yellow-400 text-grey-950 border-yellow-500';
      } else if (poi.category === 'cafe') {
        iconHtml = '☕';
        bgColor = 'bg-orange-500 text-white border-orange-600';
      } else if (poi.category === 'hospital') {
        iconHtml = '🏥';
        bgColor = 'bg-red-500 text-white border-red-600';
      }

      const icon = L.divIcon({
        className: 'custom-poi-marker',
        html: `<div class="w-7 h-7 rounded-lg ${bgColor} border flex items-center justify-center text-xs shadow-md cursor-pointer hover:scale-125 transition-transform font-bold">${iconHtml}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([poi.lat, poi.lng], { icon });
      marker.bindPopup(`
        <div class="text-grey-950 font-sans p-1 text-xs">
          <div class="font-bold text-sm text-grey-900 mb-0.5">${poi.name}</div>
          <div class="text-slate-600 mb-1">${poi.note}</div>
          <span class="inline-block px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-900 font-mono uppercase font-bold text-[10px]">${poi.category}</span>
        </div>
      `);
      poiLayerRef.current?.addLayer(marker);
    });
  }, [activeFilter]);

  const recenterCar = () => {
    if (mapInstanceRef.current && carMarkerRef.current) {
      mapInstanceRef.current.setView(carMarkerRef.current.getLatLng(), 13, { animate: true });
    }
  };

  return (
    <div className="relative w-full h-[540px] rounded-3xl overflow-hidden border-2 border-grey-700 shadow-2xl bg-white">
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0 bg-white" />

      {/* Top Overlay: Route Navigation & Status Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Route HUD Badge */}
        <div className="pointer-events-auto bg-grey-900/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-grey-700 shadow-2xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-400">
            <Navigation className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-yellow-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
              Live Route Telemetry (Simulated)
            </div>
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              Indiranagar ➔ Nandi Hills Peak
              <span className="text-xs font-normal text-grey-400 font-mono">(62 km • 4h Scenic)</span>
            </div>
          </div>
        </div>

        {/* Deviation / Safety Alert Pill */}
        {isRouteDeviated ? (
          <div className="pointer-events-auto animate-bounce bg-red-950/95 border border-red-500 text-red-200 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-md">
            <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-red-100 flex items-center gap-1">
                ROUTE DEVIATION DETECTED
              </div>
              <div className="text-[11px] text-red-300">Vehicle is 4.8 km off-route on an unpaved corridor</div>
            </div>
            <button
              onClick={openSosModal}
              className="ml-2 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase transition-colors"
            >
              Verify SOS
            </button>
          </div>
        ) : (
          <div className="pointer-events-auto bg-grey-900/95 backdrop-blur-xl px-3.5 py-2 rounded-2xl border border-grey-700 text-xs flex items-center gap-3 shadow-2xl">
            <div className="flex items-center gap-1.5 text-yellow-400 font-medium">
              <Radio className="w-3.5 h-3.5 animate-pulse text-yellow-400" />
              <span>Speed: <strong className="font-mono text-white text-sm">{simulatedSpeed}</strong> km/h</span>
            </div>
            <div className="h-3 w-px bg-grey-700" />
            <div className="text-grey-300">
              Trip Progress: <strong className="font-mono text-yellow-400">{tripProgress}%</strong>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* POI Layer Filters */}
        <div className="pointer-events-auto bg-grey-900/95 backdrop-blur-xl p-1.5 rounded-2xl border border-grey-700 shadow-2xl flex items-center gap-1 text-xs">
          <span className="text-[11px] text-grey-400 px-2 font-medium flex items-center gap-1">
            <Compass className="w-3 h-3 text-yellow-400" /> Explore Nearby:
          </span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-xl font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-yellow-400 text-grey-950 font-bold shadow-md'
                : 'text-grey-300 hover:text-white hover:bg-grey-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('viewpoint')}
            className={`px-2.5 py-1 rounded-xl font-medium transition-all flex items-center gap-1 ${
              activeFilter === 'viewpoint'
                ? 'bg-amber-400 text-grey-950 font-bold shadow-md'
                : 'text-grey-300 hover:text-white hover:bg-grey-800'
            }`}
          >
            🌄 Viewpoints
          </button>
          <button
            onClick={() => setActiveFilter('cafe')}
            className={`px-2.5 py-1 rounded-xl font-medium transition-all flex items-center gap-1 ${
              activeFilter === 'cafe'
                ? 'bg-yellow-300 text-grey-950 font-bold shadow-md'
                : 'text-grey-300 hover:text-white hover:bg-grey-800'
            }`}
          >
            <Coffee className="w-3 h-3" /> Cafes & Rest
          </button>
          <button
            onClick={() => setActiveFilter('fuel')}
            className={`px-2.5 py-1 rounded-xl font-medium transition-all flex items-center gap-1 ${
              activeFilter === 'fuel'
                ? 'bg-yellow-400 text-grey-950 font-bold shadow-md'
                : 'text-grey-300 hover:text-white hover:bg-grey-800'
            }`}
          >
            <Fuel className="w-3 h-3" /> EV / Fuel
          </button>
          <button
            onClick={() => setActiveFilter('hospital')}
            className={`px-2.5 py-1 rounded-xl font-medium transition-all flex items-center gap-1 ${
              activeFilter === 'hospital'
                ? 'bg-red-400 text-white font-bold shadow-md'
                : 'text-grey-300 hover:text-white hover:bg-grey-800'
            }`}
          >
            🏥 Hospitals
          </button>
        </div>

        {/* Simulation Toggles */}
        <div className="pointer-events-auto bg-grey-900/95 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-grey-700 shadow-2xl flex items-center gap-2 text-xs">
          <button
            onClick={recenterCar}
            title="Recenter Map on Vehicle"
            className="p-1.5 rounded-xl bg-grey-800 hover:bg-grey-700 text-grey-300 hover:text-yellow-400 transition-colors"
          >
            <Crosshair className="w-4 h-4" />
          </button>

          <button
            onClick={toggleGpsSimulation}
            className={`px-2.5 py-1 rounded-xl font-medium flex items-center gap-1.5 transition-colors ${
              isGpsSimulating 
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/50 shadow-[0_0_10px_rgba(255,230,0,0.2)]' 
                : 'bg-grey-800 text-grey-400 hover:text-white'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            {isGpsSimulating ? 'Pause GPS Sim' : 'Resume GPS Sim'}
          </button>

          <button
            onClick={toggleRouteDeviation}
            className={`px-2.5 py-1 rounded-xl font-medium flex items-center gap-1.5 transition-colors ${
              isRouteDeviated 
                ? 'bg-red-500 text-white font-semibold' 
                : 'bg-grey-800 text-amber-300 hover:bg-grey-700 border border-amber-500/30'
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            {isRouteDeviated ? 'Resolve Deviation' : 'Simulate Off-Route Alert'}
          </button>
        </div>
      </div>
    </div>
  );
};
