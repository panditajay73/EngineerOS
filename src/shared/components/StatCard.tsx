import type { LucideIcon } from "lucide-react";

import { Card } from "@/shared/components/Card";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: "brand" | "success" | "warning" | "danger";
};

const toneStyles: Record<NonNullable<StatCardProps["tone"]>, string> = {
  brand: "bg-brand/12 text-brand",
  success: "bg-success/12 text-success",
  warning: "bg-warning/12 text-warning",
  danger: "bg-danger/12 text-danger"
};

export function StatCard({
  icon: Icon,
  label,
  value,
  tone = "brand"
}: StatCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
        </div>
        <span className={`rounded-md p-2.5 ${toneStyles[tone]}`}>
          <Icon aria-hidden="true" size={20} />
        </span>
      </div>
    </Card>
  );
}
