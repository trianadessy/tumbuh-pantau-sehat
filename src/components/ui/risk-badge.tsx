import { cn } from "@/lib/utils";

type RiskLevel = "normal" | "berisiko" | "stunting";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
  children?: React.ReactNode;
}

const riskConfig = {
  normal: {
    label: "Normal",
    bgColor: "bg-status-normal",
    textColor: "text-status-normal-foreground",
  },
  berisiko: {
    label: "Berisiko",
    bgColor: "bg-status-risk",
    textColor: "text-status-risk-foreground",
  },
  stunting: {
    label: "Stunting",
    bgColor: "bg-status-stunting",
    textColor: "text-status-stunting-foreground",
  },
};

const RiskBadge = ({ level, className, children }: RiskBadgeProps) => {
  const config = riskConfig[level];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
      data-testid={`risk-badge-${level}`}
    >
      {children || config.label}
    </span>
  );
};

export default RiskBadge;
export type { RiskLevel };