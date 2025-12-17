import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { TradeDownIcon, TradeUpIcon } from "@hugeicons/core-free-icons";

interface StatsCardProps {
  label: string;
  value: string | number;
  trend: number;
  trendLabel?: string;
  className?: string;
}

export function StatsCard({
  label,
  value,
  trend,
  trendLabel,
  className,
}: StatsCardProps) {
  const isPositive = trend >= 0;

  return (
    <div
      className={cn(
        "bg-gray dark:bg-gray-800 p-6 rounded-md shadow-none border border-[#E9EAEB] dark:border-gray-700 flex flex-col justify-between h-full",
        className
      )}
    >
      <h3 className="text-primary dark:text-gray-400 text-sm font-medium mb-2">
        {label}
      </h3>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-primary dark:text-gray-50">
          {value}
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span
            className={cn(
              "font-medium",
              isPositive ? "text-green-500" : "text-secondary"
            )}
          >
            {isPositive ? "+" : ""}
            {trend}%
          </span>
          {isPositive ? (
            <HugeiconsIcon
              icon={TradeUpIcon}
              size={24}
              className="text-green-500"
              strokeWidth={1.5}
            />
          ) : (
            <HugeiconsIcon
              icon={TradeDownIcon}
              size={24}
              className="text-secondary"
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  );
}
