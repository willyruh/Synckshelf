'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'grid_view' },
  { href: '/inventory', label: 'Inventory', icon: 'inventory_2' },
  { href: '/alerts', label: 'Alerts', icon: 'notifications_active' },
  { href: '/insights', label: 'Insights', icon: 'psychology' },
  { href: '/suppliers', label: 'Suppliers', icon: 'local_shipping' },
  { href: '/branches', label: 'Branches', icon: 'store' },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-60 bg-[#0c1324]/95 backdrop-blur-xl border-r border-white/8 z-40 pt-20 pb-6">
      {/* Logo area */}
      <div className="absolute top-0 left-0 w-full h-16 flex items-center px-5 border-b border-white/8">
        <span className="material-symbols-outlined text-primary text-2xl mr-2">
          inventory_2
        </span>
        <span className="font-bold text-xl text-primary tracking-tight">
          SynckShelf
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                active
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'
              )}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{
                  fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              <span className={cn('text-sm font-medium', active && 'font-semibold')}>
                {item.label}
              </span>
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-emerald" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="px-4 pt-4 border-t border-white/8">
        <div className="glass-dark rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary shadow-emerald pulse-emerald" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant/60">
              System Active
            </span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant/40">
            <span className="material-symbols-outlined text-[14px]">hub</span>
            <span className="text-[11px] font-semibold tracking-wider uppercase">
              v2.4.0-Stable
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
