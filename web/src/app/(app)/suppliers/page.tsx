'use client';

import { useState } from 'react';

const SUPPLIERS = [
  { id: 1, name: 'Green Valley Farms', category: 'Produce', reliability: 96, leadTime: '2 days', activeOrders: 3, totalValue: 12400, status: 'active', lastDelivery: '2 hours ago' },
  { id: 2, name: 'Global Logistics Corp', category: 'Poultry & Meat', reliability: 92, leadTime: '1 day', activeOrders: 1, totalValue: 8200, status: 'active', lastDelivery: '1 day ago' },
  { id: 3, name: 'Nordic Dairy Co.', category: 'Dairy', reliability: 88, leadTime: '3 days', activeOrders: 2, totalValue: 5600, status: 'active', lastDelivery: '3 days ago' },
  { id: 4, name: 'Heritage Bakehouse', category: 'Bakery', reliability: 78, leadTime: '1 day', activeOrders: 0, totalValue: 2100, status: 'delayed', lastDelivery: '5 days ago' },
];

const ORDERS = [
  { id: 'PO-8821', supplier: 'Green Valley Farms', items: 'Greek Yogurt (200 units)', status: 'delivered', date: new Date().toISOString(), value: 640 },
  { id: 'PO-8820', supplier: 'Global Logistics Corp', items: 'Chicken Breast (80kg)', status: 'in_transit', date: new Date(Date.now() - 86400000).toISOString(), value: 960 },
  { id: 'PO-8819', supplier: 'Nordic Dairy Co.', items: 'Whole Milk (300 cartons)', status: 'pending', date: new Date(Date.now() - 172800000).toISOString(), value: 540 },
  { id: 'PO-8818', supplier: 'Heritage Bakehouse', items: 'Sourdough Loaves (60 units)', status: 'delayed', date: new Date(Date.now() - 259200000).toISOString(), value: 390 },
];

const statusConfig = {
  delivered: { label: 'Delivered', icon: 'check_circle', cls: 'text-primary bg-primary/10 border-primary/20' },
  in_transit: { label: 'In Transit', icon: 'local_shipping', cls: 'text-secondary bg-secondary/10 border-secondary/20' },
  pending: { label: 'Pending', icon: 'schedule', cls: 'text-on-surface-variant bg-white/5 border-white/10' },
  delayed: { label: 'Delayed', icon: 'warning', cls: 'text-error bg-error/10 border-error/20' },
};

export default function SuppliersPage() {
  const [tab, setTab] = useState<'suppliers'|'orders'>('suppliers');
  const [showNewOrder, setShowNewOrder] = useState(false);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pt-6 pb-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Supplier Management</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Manage partners, track orders, monitor reliability</p>
        </div>
        <button onClick={() => setShowNewOrder(true)} className="emerald-gradient text-on-primary px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Purchase Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['handshake','Active Suppliers','4','text-primary'],
          ['local_shipping','In Transit','1','text-secondary'],
          ['warning','Delayed','1','text-error'],
          ['payments','Monthly Spend','$26,300','text-tertiary'],
        ].map(([icon,label,val,color]) => (
          <div key={label} className="glass-dark rounded-xl p-4">
            <span className={`material-symbols-outlined ${color}`}>{icon}</span>
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mt-2">{label}</p>
            <p className={`text-xl font-bold mt-0.5 ${color}`}>{val}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 glass-dark rounded-xl p-1 w-fit">
        {(['suppliers','orders'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all ${tab === t ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
            {t === 'suppliers' ? 'Suppliers' : 'Purchase Orders'}
          </button>
        ))}
      </div>

      {tab === 'suppliers' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SUPPLIERS.map(s => (
            <div key={s.id} className="glass-dark rounded-xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-on-surface">{s.name}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{s.category}</p>
                </div>
                <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full border ${s.status === 'active' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-error/10 text-error border-error/20'}`}>
                  {s.status === 'active' ? '● Active' : '⚠ Delayed'}
                </span>
              </div>

              {/* Reliability bar */}
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                  <span>Reliability Score</span>
                  <span className="text-primary font-mono">{s.reliability}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#2e3447] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${s.reliability}%`, background: s.reliability > 90 ? '#4edea3' : s.reliability > 80 ? '#ddb7ff' : '#ffb4ab' }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[['schedule', s.leadTime, 'Lead Time'], ['receipt_long', s.activeOrders.toString(), 'Active Orders'], ['payments', `$${s.totalValue.toLocaleString()}`, 'Total Value']].map(([icon, val, label]) => (
                  <div key={label} className="text-center p-2 rounded-xl bg-[#151b2d]/50">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{icon}</span>
                    <p className="font-mono text-sm text-on-surface font-bold mt-1">{val}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-on-surface-variant/60">Last delivery: {s.lastDelivery}</span>
                <button className="text-primary text-[12px] font-bold hover:underline">View Profile →</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-dark rounded-xl overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>{['PO Number','Supplier','Items','Status','Date','Value'].map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {ORDERS.map(o => {
                const sc = statusConfig[o.status as keyof typeof statusConfig];
                return (
                  <tr key={o.id}>
                    <td><span className="font-mono text-xs text-primary">{o.id}</span></td>
                    <td><span className="text-sm text-on-surface">{o.supplier}</span></td>
                    <td><span className="text-xs text-on-surface-variant">{o.items}</span></td>
                    <td>
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase px-2 py-0.5 rounded border ${sc.cls}`}>
                        <span className="material-symbols-outlined text-[12px]">{sc.icon}</span>
                        {sc.label}
                      </span>
                    </td>
                    <td><span className="font-mono text-xs text-on-surface-variant">{new Date(o.date).toLocaleDateString()}</span></td>
                    <td><span className="font-mono text-sm text-primary">${o.value}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* New Order Modal */}
      {showNewOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-dark rounded-2xl p-6 w-full max-w-md border border-white/10 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-on-surface">New Purchase Order</h3>
              <button onClick={() => setShowNewOrder(false)} className="p-2 rounded-full hover:bg-white/10 text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">Supplier</label>
                <select className="input-dark pl-4 appearance-none">
                  {SUPPLIERS.map(s => <option key={s.id}>{s.name}</option>)}
                </select>
              </div>
              {[['Items','text','e.g. Greek Yogurt 200 units'],['Quantity','number','0'],['Expected Delivery','date','']].map(([label, type, placeholder]) => (
                <div key={label}>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">{label}</label>
                  <input type={type} placeholder={placeholder} className="input-dark pl-4" />
                </div>
              ))}
              <button className="emerald-gradient w-full py-3 rounded-xl font-bold text-on-primary mt-2 active:scale-95 transition-all">
                Create Purchase Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
