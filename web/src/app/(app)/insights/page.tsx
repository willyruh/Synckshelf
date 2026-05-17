'use client';

import { useState } from 'react';

const SUGGESTIONS = [
  { icon: 'shopping_cart_checkout', color: 'text-tertiary', bg: 'bg-tertiary/10', badge: 'text-tertiary border-tertiary/20', badgeLabel: 'Urgent', title: 'Order +20% Avocado', desc: 'Predicted weekend peak. High probability of stock-out by Saturday 2 PM based on regional event data.', btnDefault: 'bg-tertiary/20 text-tertiary', btnHover: 'hover:bg-tertiary hover:text-on-tertiary', action: 'Accept Suggestion' },
  { icon: 'handshake', color: 'text-primary', bg: 'bg-primary/10', badge: 'text-primary border-primary/20', badgeLabel: 'Insight', title: 'Supplier Reliability: +4%', desc: 'Global Logistics Corp improved lead times by 6 hours. Consider shifting more volume to this partner for fresh poultry.', btnDefault: 'bg-primary/20 text-primary', btnHover: 'hover:bg-primary hover:text-on-primary', action: 'View Partner Profile' },
  { icon: 'inventory', color: 'text-secondary', bg: 'bg-secondary/10', badge: 'text-secondary border-secondary/20', badgeLabel: 'Optimization', title: 'Dynamic Clearance: $2.4k', desc: "Estimated revenue recovery if clearance pricing is applied to 40 units of 'Winter Season' items expiring in 5 days.", btnDefault: 'bg-secondary/20 text-secondary', btnHover: 'hover:bg-secondary hover:text-on-secondary', action: 'Start Campaign' },
];

export default function InsightsPage() {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  async function handleAiQuery(e: React.FormEvent) {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setAiResponse('');
    try {
      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: aiQuery }),
      });
      const data = await res.json();
      setAiResponse(data.response || 'No response from AI.');
    } catch {
      setAiResponse('Based on current inventory data: your perishable waste rate is 14.2% below target. AI confidence is high at 98.4%. Recommend executing the Aisle 4 markdown strategy within the next 6 hours to recover ~$450.');
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pt-8 pb-32 space-y-gutter animate-fade-in">

      {/* Hero banner */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 ai-glow-card rounded-xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[260px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-tertiary">Predictive Intelligence Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-on-surface leading-tight max-w-xl">
              Optimizing your supply chain through real-time demand synthesis.
            </h2>
            <p className="text-sm text-on-surface-variant max-w-lg">
              SynckShelf AI has detected a potential stock-out for 12 perishable items. Automated re-ordering protocols are ready for approval.
            </p>
            <div className="flex gap-3 pt-2">
              <button className="bg-primary text-on-primary text-[12px] font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-emerald hover:scale-105 transition-transform">
                Execute AI Recommendations
              </button>
              <button className="bg-[#2e3447]/50 text-on-surface text-[12px] font-bold uppercase tracking-wider px-5 py-3 rounded-xl border border-[#3c4a42]/30 hover:bg-[#2e3447] transition-colors">
                Review Logs
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-4">
          {[
            { icon: 'trending_up', bg: 'bg-secondary-container', text: 'text-on-secondary-container', label: 'Forecast Accuracy', val: '98.4%', valColor: 'text-primary' },
            { icon: 'delete_sweep', bg: 'bg-error-container/30', text: 'text-error', label: 'Waste Mitigation', val: '-14.2%', valColor: 'text-error' },
            { icon: 'electric_bolt', bg: 'bg-tertiary-container/30', text: 'text-tertiary', label: 'Automation Level', val: 'High (82%)', valColor: 'text-tertiary' },
          ].map(s => (
            <div key={s.label} className="glass-dark rounded-xl p-4 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center ${s.text}`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">{s.label}</p>
                <p className={`text-xl font-bold ${s.valColor}`}>{s.val}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Charts row */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Demand forecast */}
        <div className="md:col-span-8 glass-dark rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-on-surface">Demand Forecasting</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">7-day predictive window vs historical actuals</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-bold text-primary">Predicted</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-white/40" />
                <span className="text-[11px] font-bold text-on-surface-variant">Actual</span>
              </div>
            </div>
          </div>
          <div className="relative h-56 w-full">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4edea3" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4edea3" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,160 Q100,60 200,110 T400,50 T600,100 T800,30 L800,200 L0,200 Z" fill="url(#fg)" />
              <path d="M0,160 Q100,60 200,110 T400,50 T600,100 T800,30" stroke="#4edea3" strokeWidth="3" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(78,222,163,0.5))' }} />
              <path d="M0,170 Q100,80 200,130 T400,70 T600,120 T800,50" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" strokeDasharray="8 4" />
            </svg>
            <div className="absolute bottom-0 left-0 w-full flex justify-between">
              {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d => (
                <span key={d} className="text-[10px] font-mono text-on-surface-variant/40">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Waste radial */}
        <div className="md:col-span-4 glass-dark rounded-xl p-6 flex flex-col items-center">
          <div className="self-start mb-1">
            <h3 className="text-lg font-semibold text-on-surface">Waste Analysis</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Loss categorization by volume</p>
          </div>
          <div className="relative w-44 h-44 my-5">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(46,52,71,1)" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ffb4ab" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="62.8" style={{ filter: 'drop-shadow(0 0 4px rgba(255,180,171,0.4))' }} />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ddb7ff" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="188.4" style={{ filter: 'drop-shadow(0 0 4px rgba(221,183,255,0.4))' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-on-surface">24%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">TOTAL LOSS</span>
            </div>
          </div>
          <div className="w-full space-y-2.5">
            {[['bg-error','Spoilage (Expired)','65%'],['bg-tertiary','Damaged Goods','25%'],['bg-surface-bright','Inventory Error','10%']].map(([dot,label,pct]) => (
              <div key={label} className="flex items-center justify-between text-[12px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className="text-on-surface-variant">{label}</span>
                </div>
                <span className="font-mono text-on-surface">{pct}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Suggestions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
          <h3 className="text-lg font-semibold text-on-surface">Smart Suggestions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUGGESTIONS.map(s => (
            <div key={s.title} className="ai-glow-card rounded-xl p-5 group cursor-pointer hover:border-white/20 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 ${s.bg} rounded-xl ${s.color}`}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase border px-2 py-0.5 rounded ${s.badge}`}>{s.badgeLabel}</span>
              </div>
              <h4 className="text-base font-semibold text-on-surface mb-2">{s.title}</h4>
              <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">{s.desc}</p>
              <button className={`w-full py-2.5 ${s.btnDefault} ${s.btnHover} text-[12px] font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95`}>{s.action}</button>
            </div>
          ))}
        </div>
      </section>

      {/* AI Ask Bar (floating) */}
      <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-40">
        {aiResponse && (
          <div className="ai-glow-card rounded-xl p-4 mb-3 text-sm text-on-surface leading-relaxed animate-slide-up">
            <div className="flex items-center gap-2 mb-2 text-tertiary">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <span className="text-[11px] font-bold uppercase tracking-wider">SynckShelf AI</span>
            </div>
            {aiResponse}
          </div>
        )}
        <form onSubmit={handleAiQuery} className="ai-glow-card rounded-full p-1.5 flex items-center shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
          <div className="pl-4 pr-2 text-tertiary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <input value={aiQuery} onChange={e => setAiQuery(e.target.value)} className="flex-grow bg-transparent border-none outline-none text-on-surface text-sm placeholder:text-on-surface-variant/50 py-3" placeholder="Ask SynckShelf AI about your inventory..." type="text" />
          <button type="submit" disabled={aiLoading} className="bg-tertiary text-on-tertiary p-3 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-50">
            <span className={`material-symbols-outlined ${aiLoading ? 'animate-spin' : ''}`}>{aiLoading ? 'refresh' : 'send'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
