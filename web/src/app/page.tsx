'use client';

import Link from 'next/link';

export default function SplashPage() {
  return (
    <div className="bg-mesh min-h-screen flex flex-col items-center justify-between overflow-hidden selection:bg-primary/30">
      {/* Cinematic background texture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070d1f]/20 to-[#070d1f]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />
      </div>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-screen-2xl px-4 md:px-8 py-10 flex-grow">
        {/* Intelligence graphic */}
        <div className="relative w-full max-w-sm aspect-square mb-10 flex items-center justify-center">
          {/* Background glows */}
          <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-110" />
          <div className="absolute inset-0 bg-tertiary/10 blur-[100px] rounded-full scale-75 translate-y-10" />

          {/* Main cube card */}
          <div className="relative z-20 w-64 h-64 md:w-72 md:h-72 glass-dark rounded-3xl flex items-center justify-center overflow-hidden ai-purple-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-tertiary/10" />
            {/* Animated grid inside card */}
            <div className="relative z-10 grid grid-cols-4 grid-rows-4 gap-2 p-6 w-full h-full">
              {Array.from({ length: 16 }).map((_, i) => {
                const intensities = [0.8,0.2,0.6,0.1,0.3,0.9,0.4,0.7,0.2,0.5,0.8,0.3,0.6,0.1,0.4,0.7];
                const opacity = intensities[i];
                const isPurple = [1,6,11].includes(i);
                return (
                  <div
                    key={i}
                    className="rounded-sm border"
                    style={{
                      background: isPurple
                        ? `rgba(196,135,255,${opacity * 0.4})`
                        : `rgba(78,222,163,${opacity * 0.3})`,
                      borderColor: isPurple
                        ? `rgba(196,135,255,${opacity * 0.3})`
                        : `rgba(78,222,163,${opacity * 0.2})`,
                      boxShadow: opacity > 0.6
                        ? `0 0 8px ${isPurple ? 'rgba(196,135,255,0.2)' : 'rgba(78,222,163,0.2)'}`
                        : 'none',
                    }}
                  />
                );
              })}
            </div>
            {/* Pulse border */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl animate-pulse scale-90" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070d1f] to-transparent" />
          </div>

          {/* Floating chips */}
          <div className="absolute top-4 -right-6 glass-dark px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-xl border border-white/10 animate-float">
            <span className="material-symbols-outlined text-primary text-[16px]">thermostat</span>
            <span className="font-mono text-[13px] text-on-surface">Freshness: 98%</span>
          </div>
          <div className="absolute bottom-10 -left-10 glass-dark px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-xl border border-white/10" style={{ animationDelay: '1s' }}>
            <span className="material-symbols-outlined text-tertiary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            <span className="font-mono text-[13px] text-on-surface">AI Predicted</span>
          </div>
        </div>

        {/* Branding */}
        <div className="text-center max-w-2xl space-y-4">
          <h1 className="text-2xl md:text-3xl font-black text-primary tracking-tight uppercase mb-1">
            SynckShelf
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight">
            Master Your Inventory.
          </h2>
          <p className="text-base md:text-lg text-on-surface-variant max-w-lg mx-auto leading-relaxed">
            AI-powered intelligence for perishable goods. Reduce waste, maximize profit with predictive logistics.
          </p>
        </div>
      </main>

      {/* CTAs */}
      <footer className="w-full max-w-md px-4 pb-16 space-y-3 z-20">
        <div className="flex flex-col gap-3">
          <Link
            href="/auth/register"
            className="emerald-gradient text-on-primary py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all duration-200"
          >
            Get Started
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <Link
            href="/auth/login"
            className="bg-[#23293c]/50 hover:bg-[#23293c] text-on-surface py-4 px-8 rounded-xl font-medium text-base border border-[#3c4a42]/30 backdrop-blur-md transition-all active:scale-95 text-center"
          >
            Sign In to Existing Account
          </Link>
        </div>

        {/* System status */}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary pulse-emerald" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-on-surface-variant/60">System Active</span>
          </div>
          <div className="w-px h-3 bg-[#3c4a42]/30" />
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[13px] text-on-surface-variant/60">hub</span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-on-surface-variant/60">v2.4.0-Stable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
