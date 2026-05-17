'use client';

import { useState } from 'react';
import StatusBadge from '@/components/ui/StatusBadge';

type Urgency = 'critical' | 'warning' | 'safe';
interface Product { id: number; name: string; batch: string; timeLeft: string; risk: number; urgency: Urgency; health: number; image: string; }

const PRODUCTS: Product[] = [
  { id: 1, name: 'Organic Strawberries (250g)', batch: 'ST-2940-X', timeLeft: '14 hours left', risk: 92, urgency: 'critical', health: 8, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80' },
  { id: 2, name: 'Greek Yogurt - Plain', batch: 'YG-8821-B', timeLeft: '2.5 days left', risk: 45, urgency: 'warning', health: 45, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
  { id: 3, name: 'Ribeye Steak - Prime', batch: 'MT-0044-Z', timeLeft: '6 hours left', risk: 98, urgency: 'critical', health: 4, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: 4, name: 'Artisan Sourdough', batch: 'BK-5520-A', timeLeft: '8 days left', risk: 5, urgency: 'safe', health: 92, image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&q=80' },
  { id: 5, name: 'Free-Range Chicken Breast', batch: 'CH-3310-F', timeLeft: '18 hours left', risk: 88, urgency: 'critical', health: 12, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80' },
  { id: 6, name: 'Organic Baby Spinach', batch: 'SP-7741-G', timeLeft: '3 days left', risk: 38, urgency: 'warning', health: 52, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80' },
];

const healthBar = (pct: number, urgency: Urgency) => {
  const colors = { critical: 'from-error to-error-container', warning: 'from-tertiary to-tertiary-container', safe: 'from-primary to-primary-container' };
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight text-outline">
        <span>Shelf Life Health</span>
        <span>{urgency === 'critical' ? 'Critical' : urgency === 'warning' ? 'Degrading' : 'Optimal'}</span>
      </div>
      <div className="h-1.5 w-full bg-[#2e3447] rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${colors[urgency]} rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default function AlertsPage() {
  const [filter, setFilter] = useState<'all' | Urgency>('all');
  const [search, setSearch] = useState('');

  const filtered = PRODUCTS.filter(p => {
    const matchFilter = filter === 'all' || p.urgency === filter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.batch.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = { critical: PRODUCTS.filter(p => p.urgency === 'critical').length, warning: PRODUCTS.filter(p => p.urgency === 'warning').length, safe: PRODUCTS.filter(p => p.urgency === 'safe').length };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pt-8 pb-8 animate-fade-in">
      {/* Search + scan */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-dark" placeholder="Search product name, SKU, or batch..." type="text" />
        </div>
        <button className="bg-primary text-on-primary-container px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-emerald active:scale-95 transition-transform">
          <span className="material-symbols-outlined">barcode_scanner</span>
          <span className="text-[12px] font-bold uppercase tracking-wider">Quick Scan</span>
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-[11px] font-bold uppercase tracking-widest text-outline mr-2">Urgency Levels</span>
        {([['all','All Items','',0],['critical','Critical (Today)','text-error',counts.critical],['warning','Warning (2-3 Days)','text-tertiary',counts.warning],['safe','Safe','text-primary',counts.safe]] as const).map(([val, label, cls, count]) => (
          <button key={val} onClick={() => setFilter(val as typeof filter)}
            className={`px-4 py-2 rounded-full glass-dark flex items-center gap-2 active:scale-95 transition-all border ${filter === val ? 'bg-white/10 border-white/20' : 'border-white/5 hover:bg-white/5'} ${cls}`}>
            {val !== 'all' && <span className={`w-2 h-2 rounded-full ${val === 'critical' ? 'bg-error pulse-critical' : val === 'warning' ? 'bg-tertiary' : 'bg-primary'}`} />}
            <span className="text-[12px] font-bold">{label}</span>
            {count > 0 && <span className="text-[10px] opacity-60">({count})</span>}
          </button>
        ))}
      </div>

      {/* AI Insight banner */}
      <div className="ai-glow-card rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-tertiary mt-0.5">psychology</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-tertiary">Predictive Insight</span>
            </div>
            <h3 className="font-semibold text-on-surface">High Waste Probability — Poultry Section (A4)</h3>
            <p className="text-sm text-on-surface-variant mt-1">Current sell-through rate is 15% below threshold. AI recommends immediate 20% discount on batches expiring within 48h to avoid <span className="text-primary font-semibold">$1,240</span> loss.</p>
          </div>
        </div>
        <button className="bg-tertiary-container text-on-tertiary-container px-5 py-2.5 rounded-xl font-bold text-[12px] uppercase tracking-wider whitespace-nowrap flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          Execute Bulk Discount
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(p => (
          <div key={p.id} className="glass-dark rounded-2xl overflow-hidden flex flex-col group">
            <div className="relative h-44 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className={`absolute top-4 left-4 font-mono text-[13px] px-3 py-1 rounded-lg flex items-center gap-2 ${p.urgency === 'critical' ? 'bg-error text-on-error' : p.urgency === 'warning' ? 'bg-tertiary text-on-tertiary' : 'bg-primary text-on-primary'}`}>
                <span className="material-symbols-outlined text-[16px]">{p.urgency === 'critical' ? 'timer' : p.urgency === 'warning' ? 'event' : 'check_circle'}</span>
                {p.timeLeft}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1324] to-transparent opacity-60" />
            </div>
            <div className="p-5 space-y-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-on-surface">{p.name}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Batch: {p.batch}</p>
                </div>
                <StatusBadge urgency={p.urgency} label={`Risk: ${p.risk}%`} pulse={false} />
              </div>
              {healthBar(p.health, p.urgency)}
              <div className="grid grid-cols-3 gap-2 mt-auto">
                {[['sell','Discount','hover:bg-primary/20 hover:text-primary'],['move_item','Transfer','hover:bg-tertiary/20 hover:text-tertiary'],['delete','Remove','hover:bg-error/20 hover:text-error']].map(([icon, label, cls]) => (
                  <button key={label} className={`flex flex-col items-center p-2 rounded-xl bg-[#191f31] transition-all active:scale-95 ${cls}`}>
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    <span className="text-[10px] font-bold mt-1">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
