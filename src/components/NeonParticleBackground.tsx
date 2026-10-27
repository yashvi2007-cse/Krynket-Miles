import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Zap, Magnet, Wind, RefreshCw, EyeOff } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  glowColor: string;
  alpha: number;
  isSpark?: boolean;
  life?: number;
  maxLife?: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

type ParticleMode = 'push' | 'pull' | 'vortex';

export const NeonParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<ParticleMode>('push');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.2);
  const [isHudMinimized, setIsHudMinimized] = useState<boolean>(false);
  const [particleCount, setParticleCount] = useState<number>(0);
  const [burstCount, setBurstCount] = useState<number>(0);

  // Keep ref of mode & speed multiplier so animation loop has instant access
  const modeRef = useRef<ParticleMode>(mode);
  const speedRef = useRef<number>(speedMultiplier);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  // Trigger manual burst
  const triggerBurst = (originX?: number, originY?: number) => {
    setBurstCount((prev) => prev + 1);
    if ((window as any).__krynketTriggerShockwave) {
      (window as any).__krynketTriggerShockwave(originX, originY);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse with velocity tracking for fluid wave movement
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      radius: 180,
      isDown: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouse.isDown = true;
      createShockwave(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      mouse.isDown = false;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isDown = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    // Color palette: Cyber Neon Yellow & Warm Amber + Cool Metallic Titanium Grey
    const yellowColors = [
      { fill: '#FFE600', glow: 'rgba(255, 230, 0, 0.95)' },  // Cyber Neon Yellow
      { fill: '#FFD600', glow: 'rgba(255, 214, 0, 0.9)' },   // Electric Yellow
      { fill: '#F59E0B', glow: 'rgba(245, 158, 11, 0.85)' },  // Warm Amber Gold
      { fill: '#FFF01F', glow: 'rgba(255, 240, 31, 0.9)' },   // Laser Yellow
      { fill: '#8A99B4', glow: 'rgba(138, 153, 180, 0.7)' },  // Titanium Grey Dust
      { fill: '#CBD5E1', glow: 'rgba(203, 213, 225, 0.65)' }, // Silver Titanium Grey
    ];

    let particles: Particle[] = [];
    let shockwaves: Shockwave[] = [];
    let sparks: Particle[] = [];

    const createShockwave = (x: number, y: number) => {
      const colors = ['#FFE600', '#FFD600', '#F59E0B'];
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      shockwaves.push({
        x,
        y,
        radius: 5,
        maxRadius: 220,
        alpha: 0.95,
        color: chosenColor,
      });

      // Spawn luminous spark fragments that blast out dynamically
      const sparkCount = 20;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 3;
        const colorObj = yellowColors[Math.floor(Math.random() * yellowColors.length)];
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2.5 + 1.2,
          baseRadius: 2,
          color: colorObj.fill,
          glowColor: colorObj.glow,
          alpha: 1,
          isSpark: true,
          life: 0,
          maxLife: Math.floor(Math.random() * 35 + 25),
        });
      }
    };

    // Expose shockwave trigger to component scope
    (window as any).__krynketTriggerShockwave = (originX?: number, originY?: number) => {
      const x = originX !== undefined ? originX : width / 2;
      const y = originY !== undefined ? originY : height / 3;
      createShockwave(x, y);
    };

    const initParticles = () => {
      particles = [];
      // Calculate dense yet 60fps-smooth particle count
      const computed = Math.floor((width * height) / 10000);
      const count = Math.min(Math.max(computed, 65), 140);
      setParticleCount(count);

      for (let i = 0; i < count; i++) {
        const colorObj = yellowColors[Math.floor(Math.random() * yellowColors.length)];
        const radius = Math.random() * 2.8 + 1.2;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          radius,
          baseRadius: radius,
          color: colorObj.fill,
          glowColor: colorObj.glow,
          alpha: Math.random() * 0.55 + 0.35,
        });
      }
    };

    initParticles();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const currentMode = modeRef.current;
      const speedMult = speedRef.current;

      // 1. Process Shockwaves
      for (let sIdx = shockwaves.length - 1; sIdx >= 0; sIdx--) {
        const sw = shockwaves[sIdx];
        sw.radius += 5.5;
        sw.alpha *= 0.94;

        if (sw.alpha > 0.02 && sw.radius < sw.maxRadius) {
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = 2.5 * sw.alpha;
          ctx.shadowColor = sw.color;
          ctx.shadowBlur = 18;
          ctx.globalAlpha = sw.alpha;
          ctx.stroke();

          // Push particles away as shockwave expands through them
          for (let p of particles) {
            const dx = p.x - sw.x;
            const dy = p.y - sw.y;
            const dist = Math.hypot(dx, dy);
            if (Math.abs(dist - sw.radius) < 25) {
              const pushForce = 3.5 * sw.alpha;
              const angle = Math.atan2(dy, dx);
              p.vx += Math.cos(angle) * pushForce;
              p.vy += Math.sin(angle) * pushForce;
              p.radius = p.baseRadius * 1.8;
            }
          }
        } else {
          shockwaves.splice(sIdx, 1);
        }
      }

      // 2. Process Sparks
      for (let spIdx = sparks.length - 1; spIdx >= 0; spIdx--) {
        const spark = sparks[spIdx];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.94;
        spark.vy *= 0.94;
        spark.life = (spark.life || 0) + 1;
        spark.alpha = 1 - (spark.life / (spark.maxLife || 40));

        if (spark.alpha > 0.05) {
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
          ctx.fillStyle = spark.color;
          ctx.shadowColor = spark.glowColor;
          ctx.shadowBlur = 14;
          ctx.globalAlpha = spark.alpha;
          ctx.fill();
        } else {
          sparks.splice(spIdx, 1);
        }
      }

      // 3. Process Main Interactive Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply Velocity with multiplier
        p.x += p.vx * speedMult;
        p.y += p.vy * speedMult;

        // Gentle friction to prevent runaway speeds
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Ensure minimum baseline drift so particles stay in motion
        if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.15;
        if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.15;

        // Seamless bounce or wrap around boundaries
        if (p.x < 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx);
        } else if (p.x > width) {
          p.x = width;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy = Math.abs(p.vy);
        } else if (p.y > height) {
          p.y = height;
          p.vy = -Math.abs(p.vy);
        }

        // Mouse Physics Interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius && mouse.x > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);

          if (currentMode === 'push') {
            // Repel / Kinetic Push: particles scatter away with fluid motion
            const pushMultiplier = mouse.isDown ? 5.5 : 3.2;
            p.vx -= Math.cos(angle) * force * pushMultiplier;
            p.vy -= Math.sin(angle) * force * pushMultiplier;
            p.radius = p.baseRadius * (1 + force * 1.6);
          } else if (currentMode === 'pull') {
            // Attract / Gravitational Vortex: particles are pulled into the cursor
            const pullMultiplier = mouse.isDown ? 4.5 : 2.5;
            p.vx += Math.cos(angle) * force * pullMultiplier;
            p.vy += Math.sin(angle) * force * pullMultiplier;
            p.radius = p.baseRadius * (1 + force * 1.8);
          } else if (currentMode === 'vortex') {
            // Swirl: particles orbit tangentially around cursor
            const swirlAngle = angle + Math.PI / 2;
            const swirlStrength = force * 3.5;
            p.vx += Math.cos(swirlAngle) * swirlStrength - Math.cos(angle) * 0.4;
            p.vy += Math.sin(swirlAngle) * swirlStrength - Math.sin(angle) * 0.4;
            p.radius = p.baseRadius * (1 + force * 1.5);
          }

          // Impart mouse movement velocity if cursor is sweeping fast
          if (Math.abs(mouse.vx) > 2 || Math.abs(mouse.vy) > 2) {
            p.vx += mouse.vx * 0.08 * force;
            p.vy += mouse.vy * 0.08 * force;
          }
        } else {
          // Gradually return to resting size
          p.radius = p.radius * 0.95 + p.baseRadius * 0.05;
        }

        // Draw particle with luminous glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 14;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby particles with luminous Yellow Constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDistance = 135;

          if (dist2 < maxDistance) {
            const lineAlpha = (1 - dist2 / maxDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = lineAlpha;
            ctx.shadowBlur = 6;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw dynamic laser tether to cursor if within range
        if (dist < mouse.radius && mouse.x > 0) {
          const tetherAlpha = (1 - dist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = currentMode === 'push' ? '#FFE600' : currentMode === 'pull' ? '#FFD600' : '#F59E0B';
          ctx.globalAlpha = tetherAlpha;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = '#FFE600';
          ctx.shadowBlur = 10;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      delete (window as any).__krynketTriggerShockwave;
    };
  }, []);

  return (
    <>
      {/* Background Canvas Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Deep Slate Grey Titanium Gradient Foundation */}
        <div className="absolute inset-0 bg-[#080A0E] bg-gradient-to-b from-[#080A0E] via-[#0F1217] to-[#0A0D13]" />

        {/* Ambient Pulsing Yellow & Amber Glow Blobs for Depth */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-yellow-400/10 blur-[180px] animate-pulse-subtle pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-amber-500/8 blur-[190px] pointer-events-none" />
        <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-yellow-300/8 blur-[180px] pointer-events-none" />

        {/* Subtle Cyber Yellow Geometric Grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#FFE600 1px, transparent 1px), linear-gradient(90deg, #FFE600 1px, transparent 1px)`,
            backgroundSize: '54px 54px',
          }}
        />

        {/* Interactive Kinetic Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      </div>

      {/* Floating Yellow Particle Interactive Controller HUD */}
      <aside aria-label="Yellow Background Controls" className="fixed bottom-5 left-5 z-40">
        {isHudMinimized ? (
          <button
            onClick={() => setIsHudMinimized(false)}
            className="p-3 rounded-2xl bg-grey-900/95 border border-yellow-400/40 shadow-neon-yellow text-yellow-400 hover:bg-grey-850 hover:scale-105 transition-all flex items-center gap-2 group backdrop-blur-xl"
            title="Expand Particle Physics Controls"
          >
            <Sparkles className="w-4 h-4 animate-spin text-yellow-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white group-hover:text-yellow-400 transition-colors">
              Yellow Particles
            </span>
          </button>
        ) : (
          <div className="p-3.5 rounded-3xl bg-grey-900/95 border border-grey-700 shadow-2xl backdrop-blur-2xl text-slate-200 w-72 space-y-3 transition-all">
            {/* HUD Header */}
            <div className="flex items-center justify-between border-b border-grey-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                <span className="font-display font-black text-xs tracking-wider text-white">
                  YELLOW PARTICLE ENGINE
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/30">
                  {particleCount} Active
                </span>
                <button
                  onClick={() => setIsHudMinimized(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-grey-800 transition-colors"
                  title="Minimize HUD"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Instruction Badge */}
            <p className="text-[11px] text-grey-400 leading-tight">
              Move cursor to disperse particles. <br />
              <span className="text-yellow-400 font-medium">Click anywhere</span> to blast a yellow shockwave!
            </p>

            {/* Mode Switcher Buttons */}
            <div>
              <div className="text-[10px] font-mono uppercase text-grey-400 mb-1.5 flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span>Motion Dynamic:</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setMode('push')}
                  className={`px-2 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                    mode === 'push'
                      ? 'bg-yellow-400 text-grey-950 font-bold shadow-neon-yellow'
                      : 'bg-grey-800/80 text-slate-300 hover:bg-grey-750 hover:text-white'
                  }`}
                >
                  <Wind className="w-3 h-3" />
                  <span>Push</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('pull')}
                  className={`px-2 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                    mode === 'pull'
                      ? 'bg-amber-400 text-grey-950 font-bold shadow-md'
                      : 'bg-grey-800/80 text-slate-300 hover:bg-grey-750 hover:text-white'
                  }`}
                >
                  <Magnet className="w-3 h-3" />
                  <span>Pull</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('vortex')}
                  className={`px-2 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                    mode === 'vortex'
                      ? 'bg-yellow-300 text-grey-950 font-bold shadow-md'
                      : 'bg-grey-800/80 text-slate-300 hover:bg-grey-750 hover:text-white'
                  }`}
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Swirl</span>
                </button>
              </div>
            </div>

            {/* Quick Shockwave Burst Button */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => triggerBurst()}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 text-grey-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-neon-yellow hover:brightness-110 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Blast Yellow Shockwave</span>
              </button>

              <button
                type="button"
                onClick={() => setSpeedMultiplier((prev) => (prev >= 2 ? 0.8 : prev + 0.4))}
                className="px-2.5 py-2 rounded-xl bg-grey-800 hover:bg-grey-750 border border-grey-700 text-xs font-mono text-yellow-400 font-bold"
                title="Toggle Particle Velocity"
              >
                {speedMultiplier.toFixed(1)}x
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
