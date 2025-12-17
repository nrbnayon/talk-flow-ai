import { cn } from "@/lib/utils";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { TradeDownIcon, TradeUpIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";

interface StatsCardProps {
  label: string;
  value: string | number;
  trend: number;
  trendLabel?: string;
  className?: string;
  icon?: IconSvgElement;
  image?: string;
}

export function StatsCard({
  label,
  value,
  trend,
  trendLabel = "from last month",
  className,
  icon,
  image,
}: StatsCardProps) {
  const isPositive = trend >= 0;

  return (
    <div
      className={cn(
        "bg-gray px-5 py-4 rounded-md flex flex-col h-full",
        className
      )}
      style={{
        boxShadow: "6px 6px 40px 0px #00000014",
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-secondary text-sm font-medium">{label}</h3>
        {(image || icon) && (
          <div
            className="flex items-center justify-center"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "18px",
              padding: "15px",
              background: "linear-gradient(180deg, #FFFFFF -103.51%, #1E1E1E 100%)",
            }}
          >
            {image ? (
              <Image src={image} alt={label} width={30} height={30} />
            ) : icon ? (
              <HugeiconsIcon
                icon={icon}
                size={30}
                className="text-foreground"
                strokeWidth={1.5}
              />
            ) : null}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 -mt-3">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center gap-1 text-xs mt-2">
          {isPositive ? (
            <HugeiconsIcon
              icon={TradeUpIcon}
              size={20}
              className="text-[#00b69b]"
              strokeWidth={1.5}
            />
          ) : (
            <HugeiconsIcon
              icon={TradeDownIcon}
              size={20}
              className="text-red"
              strokeWidth={1.5}
            />
          )}
          <span
            className={cn(
              "font-medium text-base",
              isPositive ? "text-[#00b69b]" : "text-red"
            )}
          >
            {isPositive ? "+" : ""}
            {trend}%
          </span>
          <span className="text-secondary text-base">
            {isPositive ? "Up" : "Down"} {trendLabel}
          </span>
        </div>
      </div>
    </div>
  );
}