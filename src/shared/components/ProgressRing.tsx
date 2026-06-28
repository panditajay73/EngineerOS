type ProgressRingProps = {
  value: number;
  label: string;
  size?: number;
};

export function ProgressRing({ value, label, size = 144 }: ProgressRingProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div
      aria-label={`${label}: ${Math.round(clampedValue)} percent`}
      className="relative grid place-items-center"
      role="img"
      style={{ height: size, width: size }}
    >
      <svg aria-hidden="true" height={size} width={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke="rgba(154, 164, 178, 0.18)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke="#38bdf8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-semibold text-ink">{Math.round(clampedValue)}%</p>
        <p className="mt-1 text-xs text-muted">{label}</p>
      </div>
    </div>
  );
}
