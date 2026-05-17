import { cn } from '@/lib/utils';

type Urgency = 'critical' | 'warning' | 'safe';

interface StatusBadgeProps {
  urgency: Urgency;
  label?: string;
  pulse?: boolean;
  className?: string;
}

const config: Record<Urgency, { dot: string; text: string; border: string; bg: string }> = {
  critical: {
    dot: 'bg-error pulse-critical',
    text: 'text-error',
    border: 'border-error/30',
    bg: 'bg-error/10',
  },
  warning: {
    dot: 'bg-tertiary',
    text: 'text-tertiary',
    border: 'border-tertiary/30',
    bg: 'bg-tertiary/10',
  },
  safe: {
    dot: 'bg-primary pulse-emerald',
    text: 'text-primary',
    border: 'border-primary/30',
    bg: 'bg-primary/10',
  },
};

export default function StatusBadge({ urgency, label, pulse = true, className }: StatusBadgeProps) {
  const c = config[urgency];
  const defaultLabel = urgency === 'critical' ? 'Critical' : urgency === 'warning' ? 'Warning' : 'Safe';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-dark text-[11px] font-bold uppercase tracking-wider',
        c.text, c.border, c.bg,
        className
      )}
    >
      <span className={cn('w-2 h-2 rounded-full', c.dot)} />
      {label ?? defaultLabel}
    </span>
  );
}
