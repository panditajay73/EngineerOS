export type WeeklyHour = {
  day: string;
  hours: number;
};

export type HeatMapCell = {
  id: string;
  intensity: 0 | 1 | 2 | 3 | 4;
};

export const weeklyHours: WeeklyHour[] = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 2.5 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 2 },
  { day: "Fri", hours: 3.5 },
  { day: "Sat", hours: 7 },
  { day: "Sun", hours: 6 }
];

export const heatMapCells: HeatMapCell[] = Array.from({ length: 42 }, (_, index) => {
  const intensity = [1, 3, 2, 0, 4, 2, 3][index % 7] ?? 0;
  return {
    id: `study-day-${index + 1}`,
    intensity: intensity as HeatMapCell["intensity"]
  };
});
