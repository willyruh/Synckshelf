import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'purple' | 'ai';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function GlassCard({
  children,
  className,
  variant = 'dark',
  padding = 'lg',
}: GlassCardProps) {
  const paddings = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-6' };

  return (
    <div
      className={cn(
        'rounded-xl',
        variant === 'dark' && 'glass-dark',
        variant === 'purple' && 'glass-purple',
        variant === 'ai' && 'ai-glow-card',
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
