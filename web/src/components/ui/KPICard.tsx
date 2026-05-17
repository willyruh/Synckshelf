import { cn } from '@/lib/utils';

interface KPICardProps {
  icon: string;
  value: string;
  label: string;
  sublabel?: string;
  accent?: 'error' | 'primary' | 'tertiary' | 'secondary';
}

const accentMap = {
  error: { border: 'border-l-error', icon: 'text-error', badge: 'bg-error/10 text-error border-error/20' },
  primary: { border: 'border-l-primary', icon: 'text-primary', badge: 'bg-primary/10 text-primary border-primary/20' },
  tertiary: { border: 'border-l-tertiary', icon: 'text-tertiary', badge: 'bg-tertiary/10 text-tertiary border-tertiary/20' },
  secondary: { border: 'border-l-secondary', icon: 'text-secondary', badge: 'bg-secondary/10 text-secondary border-secondary/20' },
};

export default function KPICard({ icon, value, label, sublabel, accent = 'primary' }: KPICardProps) {
  const a = accentMap[accent];
  return (
    <div className={cn('glass-dark p-6 rounded-xl border-l-4', a.border)}>
      <div className="flex justify-between items-start mb-4">
        <span className={cn('material-symbols-outlined', a.icon)}>{icon}</span>
        {sublabel && (
          <span className={cn('text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border', a.badge)}>
            {sublabel}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-on-surface mb-1">{value}</h3>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">{label}</p>
    </div>
  );
}
