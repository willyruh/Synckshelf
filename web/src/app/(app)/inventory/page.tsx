'use client';

import { useState } from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatDate } from '@/lib/utils';

interface Item { id: number; sku: string; name: string; category: string; quantity: number; unit: string; expiryDate: string; location: string; urgency: 'critical'|'warning'|'safe'; cost: number; }

const INVENTORY: Item[] = [
  { id: 1, sku: 'SKU-4920', name: 'Organic Kale', category: 'Produce', quantity: 450, unit: 'units', expiryDate: new Date(Date.now() + 86400000 * 2).toISOString(), location: 'Row C4', urgency: 'warning', cost: 2.50 },
  { id: 2, sku: 'SKU-3310', name: 'Free-Range Chicken Breast', category: 'Meat', quantity: 120, unit: 'kg', expiryDate: new Date(Date.now() + 3600000 * 18).toISOString(), location: 'Cold A1', urgency: 'critical', cost: 12.00 },
  { id: 3, sku: 'SKU-8821', name: 'Greek Yogurt - Plain', category: 'Dairy', quantity: 200, unit: 'units', expiryDate: new Date(Date.now() + 86400000 * 2.5).toISOString(), location: 'Cold B2', urgency: 'warning', cost: 3.20 },
  { id: 4, sku: 'SKU-5520', name: 'Artisan Sourdough', category: 'Bakery', quantity: 85, unit: 'loaves', expiryDate: new Date(Date.now() + 86400000 * 8).toISOString(), location: 'Shelf D3', urgency: 'safe', cost: 6.50 },
  { id: 5, sku: 'SKU-7741', name: 'Organic Baby Spinach', category: 'Produce', quantity: 340, unit: 'bags', expiryDate: new Date(Date.now() + 86400000 * 3).toISOString(), location: 'Cold A3', urgency: 'warning', cost: 4.00 },
  { id: 6, sku: 'SKU-0044', name: 'Ribeye Steak - Prime', category: 'Meat', quantity: 40, unit: 'kg', expiryDate: new Date(Date.now() + 3600000 * 6).toISOString(), location: 'Cold A2', urgency: 'critical', cost: 28.00 },
  { id: 7, sku: 'SKU-2940', name: 'Organic Strawberries (250g)', category: 'Produce', quantity: 96, unit: 'packs', expiryDate: new Date(Date.now() + 3600000 * 14).toISOString(), location: 'Cold B1', urgency: 'critical', cost: 5.50 },
  { id: 8, sku: 'SKU-6610', name: 'Whole Milk (1L)', category: 'Dairy', quantity: 280, unit: 'cartons', expiryDate: new Date(Date.now() + 86400000 * 6).toISOString(), location: 'Cold B3', urgency: 'safe', cost: 1.80 },
];

const CATEGORIES = ['All', 'Produce', 'Meat', 'Dairy', 'Bakery'];

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [urgency, setUrgency] = useState('all');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = INVENTORY.filter(i => {
    const mSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase());
    const mCat = category === 'All' || i.category === category;
    const mUrg = urgency === 'all' || i.urgency === urgency;
    return mSearch && mCat && mUrg;
  });

  const totalValue = INVENTORY.reduce((s, i) => s + i.quantity * i.cost, 0);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pt-6 pb-8 space-y-6 animate-fade-in">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['inventory_2','Total SKUs','1,240','text-primary'],
          ['timer','Expiring Soon',INVENTORY.filter(i=>i.urgency==='critical').length.toString(),'text-error'],
          ['eco','Healthy Items',INVENTORY.filter(i=>i.urgency==='safe').length.toString(),'text-primary'],
          ['payments','Total Value',`$${totalValue.toLocaleString('en-US',{maximumFractionDigits:0})}`,'text-tertiary'],
        ].map(([icon,label,val,color])=>(
          <div key={label} className="glass-dark rounded-xl p-4">
            <span className={`material-symbols-outlined ${color} text-[20px]`}>{icon}</span>
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mt-2">{label}</p>
            <p className={`text-xl font-bold mt-0.5 ${color}`}>{val}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} className="input-dark" placeholder="Search by name or SKU..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setCategory(c)} className={`px-3 py-2 rounded-xl text-[12px] font-bold transition-all ${category===c ? 'bg-primary text-on-primary' : 'glass-dark text-on-surface-variant hover:text-on-surface'}`}>{c}</button>
          ))}
        </div>
        <select value={urgency} onChange={e=>setUrgency(e.target.value)} className="bg-[#191f31] border border-[#3c4a42]/50 text-on-surface rounded-xl px-3 py-3 text-sm outline-none cursor-pointer">
          <option value="all">All Urgency</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="safe">Safe</option>
        </select>
        <button onClick={()=>setShowAdd(true)} className="emerald-gradient text-on-primary px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Item
        </button>
      </div>

      {/* Table */}
      <div className="glass-dark rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                {['SKU','Product','Category','Quantity','Expiry Date','Location','Status','Actions'].map(h=>(
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(item=>(
                <tr key={item.id}>
                  <td><span className="font-mono text-xs text-on-surface-variant">{item.sku}</span></td>
                  <td><span className="font-medium text-on-surface">{item.name}</span></td>
                  <td><span className="text-xs text-on-surface-variant">{item.category}</span></td>
                  <td><span className="font-mono text-sm text-primary">{item.quantity} {item.unit}</span></td>
                  <td><span className="font-mono text-xs text-on-surface-variant">{formatDate(item.expiryDate)}</span></td>
                  <td><span className="text-xs text-on-surface-variant">{item.location}</span></td>
                  <td><StatusBadge urgency={item.urgency} pulse={false} className="text-[10px]" /></td>
                  <td>
                    <div className="flex items-center gap-1">
                      {[['edit','Edit'],['move_item','Move'],['delete','Delete']].map(([icon,label])=>(
                        <button key={label} title={label} className="p-1.5 rounded-lg hover:bg-white/10 text-on-surface-variant hover:text-on-surface transition-all">
                          <span className="material-symbols-outlined text-[16px]">{icon}</span>
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-on-surface-variant">Showing {filtered.length} of {INVENTORY.length} items</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 glass-dark rounded-lg text-xs text-on-surface-variant hover:text-on-surface transition-colors">Previous</button>
            <button className="px-3 py-1.5 glass-dark rounded-lg text-xs text-on-surface-variant hover:text-on-surface transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Add Item modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-dark rounded-2xl p-6 w-full max-w-md border border-white/10 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-on-surface">Add Inventory Item</h3>
              <button onClick={()=>setShowAdd(false)} className="p-2 rounded-full hover:bg-white/10 text-on-surface-variant"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="space-y-3">
              {[['Product Name','text','product'],['SKU','text','sku'],['Quantity','number','qty'],['Expiry Date','date','expiry'],['Location','text','location']].map(([label,type,key])=>(
                <div key={key}>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">{label}</label>
                  <input type={type} className="input-dark pl-4" placeholder={`Enter ${label.toLowerCase()}`} />
                </div>
              ))}
              <button className="emerald-gradient w-full py-3 rounded-xl font-bold text-on-primary mt-2 active:scale-95 transition-all">
                Add to Inventory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
