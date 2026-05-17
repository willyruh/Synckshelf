interface HealthScoreCircleProps {
  score: number;
  label?: string;
  size?: number;
}

export default function HealthScoreCircle({
  score,
  label = 'HEALTH SCORE',
  size = 192,
}: HealthScoreCircleProps) {
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 80 ? '#4edea3' : score >= 50 ? '#ddb7ff' : '#ffb4ab';

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="w-full h-full -rotate-90"
        viewBox="0 0 192 192"
        fill="none"
      >
        {/* Track */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        {/* Progress */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 10px ${color}80)`,
            transition: 'stroke-dashoffset 1s ease',
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <span
          className="font-bold leading-none"
          style={{ fontSize: size * 0.23, color }}
        >
          {score}%
        </span>
        <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/70 mt-1">
          {label}
        </span>
      </div>

      {/* Ping ring */}
      <div className="absolute w-full h-full rounded-full border border-primary/20 animate-ping opacity-20" />
    </div>
  );
}
