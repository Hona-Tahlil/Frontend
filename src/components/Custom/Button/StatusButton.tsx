import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { SitterStatus } from "@/data/sitterConstants";

type Props = {
  status: SitterStatus;
  currentStatus: SitterStatus;
  onClick: () => void;
};

const statusConfig: Record<
  SitterStatus,
  {
    label: string;
    activeClass: string;
    inactiveClass: string;
  }
> = {
  accepted: {
    label: "تایید شده",
    activeClass: "bg-green-500 text-white",
    inactiveClass:
      "border border-green-500 text-green-700 hover:bg-green-50 bg-transparent",
  },
  pending: {
    label: "در حال انتظار",
    activeClass: "bg-yellow-400 text-white",
    inactiveClass:
      "border border-yellow-400 text-yellow-600 hover:bg-yellow-50 bg-transparent",
  },
  rejected: {
    label: "رد شده",
    activeClass: "bg-red-500 text-white",
    inactiveClass:
      "border border-red-500 text-red-600 hover:bg-red-50 bg-transparent",
  },
};

export function StatusButton({ status, currentStatus, onClick }: Props) {
  const isActive = status === currentStatus;
  const cfg = statusConfig[status];

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "w-full rounded-full py-2 text-small font-bold",
        isActive ? cfg.activeClass : cfg.inactiveClass,
      )}
      onClick={onClick}
    >
      {cfg.label}
    </Button>
  );
}
