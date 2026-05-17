'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'grid_view' },
  { href: '/inventory', label: 'Inventory', icon: 'inventory_2' },
  { href: '/alerts', label: 'Alerts', icon: 'notifications_active' },
  { href: '/insights', label: 'Insights', icon: 'psychology' },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-[#151b2d]/90 backdrop-blur-2xl border-t border-white/10 shadow-nav rounded-t-xl md:hidden">
      {navItems.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center transition-all active:scale-90 duration-300',
              active
                ? 'bg-primary-container text-on-primary-container rounded-xl px-4 py-1 shadow-emerald'
                : 'text-on-surface-variant/70 hover:text-primary'
            )}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {item.icon}
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase mt-0.5">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
