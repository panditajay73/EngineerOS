import { useQuery } from "@tanstack/react-query";

import {
  heatMapCells,
  weeklyHours
} from "@/features/dashboard/data/dashboardData";

export function useDashboardPlan() {
  return useQuery({
    queryKey: ["dashboard-plan"],
    queryFn: async () => ({
      heatMapCells,
      weeklyHours
    }),
    staleTime: Number.POSITIVE_INFINITY
  });
}
