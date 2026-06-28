import type { HeatMapCell } from "@/features/dashboard/data/dashboardData";

type StudyHeatMapProps = {
  cells: HeatMapCell[];
};

const intensityStyles: Record<HeatMapCell["intensity"], string> = {
  0: "bg-panel-soft",
  1: "bg-brand/20",
  2: "bg-brand/40",
  3: "bg-success/55",
  4: "bg-warning/85"
};

export function StudyHeatMap({ cells }: StudyHeatMapProps) {
  return (
    <div className="grid grid-cols-7 gap-2" role="img" aria-label="Study consistency heat map">
      {cells.map((cell) => (
        <span
          className={`aspect-square rounded border border-white/5 ${intensityStyles[cell.intensity]}`}
          key={cell.id}
        />
      ))}
    </div>
  );
}
