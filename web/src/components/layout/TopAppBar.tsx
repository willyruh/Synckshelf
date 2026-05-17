'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TopAppBarProps {
  storeName?: string;
  branchName?: string;
  showSearch?: boolean;
}

export default function TopAppBar({
  storeName = 'SynckShelf',
  branchName = 'Main Street Hub',
}: TopAppBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="bg-[#0c1324]/80 backdrop-blur-xl border-b border-white/10 shadow-sm shadow-primary/5 flex justify-between items-center px-4 md:px-8 w-full z-50 h-16 sticky top-0">
      {/* Left: logo + branch */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 bg-primary-container flex items-center justify-center md:hidden">
          <span className="material-symbols-outlined text-on-primary-container text-[18px]">
            inventory_2
          </span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-primary tracking-tight leading-tight">
            {storeName}
          </h1>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-[13px]">location_on</span>
            <span className="text-[11px] font-semibold tracking-wider uppercase">
              {branchName}
            </span>
            <span className="material-symbols-outlined text-[13px]">expand_more</span>
          </div>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors active:scale-95 duration-200 text-primary relative"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error pulse-critical" />
          </button>

          {/* Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 glass-dark rounded-xl border border-white/10 shadow-card z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                <span className="text-sm font-semibold text-on-surface">Notifications</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  3 New
                </span>
              </div>
              {[
                { icon: 'timer', color: 'text-error', text: '48 products expiring in 24h', time: '2m ago' },
                { icon: 'psychology', color: 'text-tertiary', text: 'AI recommends 20% markdown on Aisle 4', time: '15m ago' },
                { icon: 'eco', color: 'text-primary', text: 'Waste reduced 12% month-over-month', time: '1h ago' },
              ].map((n, i) => (
                <div key={i} className="flex gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                  <span className={cn('material-symbols-outlined text-[18px] mt-0.5', n.color)}>{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-on-surface leading-snug">{n.text}</p>
                    <p className="text-[11px] text-on-surface-variant/60 mt-0.5 font-mono">{n.time}</p>
                  </div>
                </div>
              ))}
              <div className="px-4 py-2.5">
                <Link href="/alerts" className="text-[12px] font-semibold text-primary hover:underline" onClick={() => setNotifOpen(false)}>
                  View all alerts →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <Link href="/settings" className="p-2 rounded-full hover:bg-primary/10 transition-colors active:scale-95 duration-200 text-primary">
          <span className="material-symbols-outlined">settings_suggest</span>
        </Link>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary-container border border-primary/30 flex items-center justify-center ml-1">
          <span className="material-symbols-outlined text-[16px] text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
            person
          </span>
        </div>
      </div>
    </header>
  );
}
