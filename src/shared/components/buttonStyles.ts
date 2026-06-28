import { cn } from "@/shared/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger";
export type ButtonSize = "sm" | "md" | "icon";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const baseStyles =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-brand/60 bg-brand text-slate-950 shadow-sm shadow-brand/20 hover:bg-sky-300",
  secondary:
    "border-border bg-panel-soft text-ink hover:border-brand/40 hover:bg-panel",
  ghost: "border-transparent bg-transparent text-muted hover:bg-panel-soft hover:text-ink",
  outline:
    "border-border bg-transparent text-ink hover:border-brand/50 hover:bg-brand/10",
  danger:
    "border-danger/50 bg-danger/15 text-rose-100 hover:border-danger hover:bg-danger/25"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  icon: "h-10 w-10"
};

export function buttonClassName({
  variant = "secondary",
  size = "md",
  className
}: ButtonStyleOptions) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}
