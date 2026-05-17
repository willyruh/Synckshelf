'use client';

import { useState, useEffect } from 'react';
import HealthScoreCircle from '@/components/ui/HealthScoreCircle';
import KPICard from '@/components/ui/KPICard';
import { formatDateTime } from '@/lib/utils';

const FEED_ITEMS = [
  { id: 1, type: 'inbound', title: 'Inventory Inbound', desc: 'Main Street Hub received 450 units of "Organic Kale". Logged to Row C4.', time: new Date().toISOString(), color: 'bg-primary' },
  { id: 2, type: 'ai', title: 'AI Anomaly Alert', desc: 'Unusual demand spike predicted for "Gluten-Free Oats" in the next 24 hours.', time: new Date(Date.now() - 3600000).toISOString(), color: 'bg-tertiary' },
  { id: 3, type: 'adjustment', title: 'Stock Adjustment', desc: "Manager 'Sarah K.' manually adjusted stock levels for SKU #4920.", time: new Date(Date.now() - 7200000).toISOString(), color: 'bg-secondary' },
  { id: 4, type: 'alert', title: 'Expiry Alert', desc: '12 units of "Ribeye Steak - Prime" expire in 6 hours.', time: new Date(Date.now() - 9000000).toISOString(), color: 'bg-error' },
];

const BARS = [30, 45, 60, 50, 85, 95, 65, 40, 20, 35, 55, 75];

export default function DashboardPage() {
  const [liveTime, setLiveTime] = useState('');
  const [aiExecuted, setAiExecuted] = useState(false);

  useEffect(() => {
    const tick = () => setLiveTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-6 space-y-6 animate-fade-in">
      {/* Hero */}
      <section className="glass-dark rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <HealthScoreCircle score={84} size={192} />
        <div className="flex-1 space-y-4 w-full">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl font-semibold text-on-surface">Operational Insight</h2>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider border border-primary/20">Optimal Status</span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Inventory levels across 1,240 SKUs are within 5% of predicted demand. High efficiency detected in cold-chain logistics.
          </p>
          <div className="flex gap-3">
            {[['Uptime','99.98%'],['AI Confidence','High'],['Active SKUs','1,240']].map(([label, val]) => (
              <div key={label} className="flex-1 p-3 rounded-xl bg-[#23293c]/50 border border-white/5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">{label}</span>
                <span className="font-mono text-sm text-primary">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard icon="timer" value="48" label="Products Expiring" sublabel="48h Window" accent="error" />
        <KPICard icon="eco" value="12%" label="Waste Reduced" sublabel="Month-over-Month" accent="primary" />
        <KPICard icon="trending_up" value="High" label="Predicted Demand" sublabel="Predictive Load" accent="tertiary" />
      </section>

      {/* Feed + AI */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <section className="lg:col-span-3 glass-dark rounded-xl p-6 flex flex-col" style={{ maxHeight: 420 }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-on-surface">Operational Feed</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary pulse-emerald" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Live</span>
              <span className="font-mono text-[11px] text-on-surface-variant/60 ml-1">{liveTime}</span>
            </div>
          </div>
          <div className="overflow-y-auto space-y-3 pr-1 flex-1">
            {FEED_ITEMS.map(item => (
              <div key={item.id} className={`flex gap-3 p-3 rounded-xl bg-[#151b2d]/40 border border-white/5 ${item.type === 'ai' ? 'border-l-4 border-l-tertiary/50' : item.type === 'alert' ? 'border-l-4 border-l-error/50' : ''}`}>
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold text-sm text-on-surface">{item.title}</span>
                    <span className="font-mono text-[11px] text-on-surface-variant/60 shrink-0">{formatDateTime(item.time)}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2 glass-purple rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-tertiary">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span className="text-[11px] font-bold uppercase tracking-widest">AI Intelligence</span>
            </div>
            <h2 className="text-xl font-semibold text-on-surface leading-tight">Markdown Fresh Produce</h2>
            <p className="text-sm text-on-surface-variant/80 leading-relaxed">
              Inventory analytics suggest a 25% markdown on high-perishables in Aisle 4 to mitigate a predicted $450 loss before Friday evening.
            </p>
          </div>
          <div className="pt-5 relative z-10">
            <button
              onClick={() => setAiExecuted(true)}
              className={`w-full py-3 font-bold text-[12px] uppercase tracking-wider rounded-xl transition-all active:scale-95 ${aiExecuted ? 'bg-primary text-on-primary' : 'bg-tertiary-container text-on-tertiary-container hover:brightness-110'}`}
            >
              {aiExecuted ? '✓ Strategy Executed' : 'Execute Strategy'}
            </button>
          </div>
        </section>
      </div>

      {/* Demand chart */}
      <section className="glass-dark rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-on-surface">Real-Time Demand Visualization</h2>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-on-surface-variant/60">{liveTime}</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">LIVE</span>
          </div>
        </div>
        <div className="h-40 w-full flex items-end gap-1.5">
          {BARS.map((h, i) => (
            <div key={i} className="flex-1">
              <div className="w-full rounded-t-sm transition-all duration-700"
                style={{ height: `${h * 1.5}px`, background: `rgba(78,222,163,${h/100})`, boxShadow: h > 80 ? '0 0 15px rgba(78,222,163,0.3)' : 'none' }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {['6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'].map(t => (
            <span key={t} className="text-[10px] font-mono text-on-surface-variant/40">{t}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
