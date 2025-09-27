import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface SLABadgeProps {
  daysRemaining: number;
  className?: string;
}

export const SLABadge = ({ daysRemaining, className }: SLABadgeProps) => {
  const getVariant = () => {
    if (daysRemaining <= 1) return "destructive";
    if (daysRemaining <= 3) return "outline";
    return "secondary";
  };

  const getText = () => {
    if (daysRemaining === 0) return "Hari ini";
    if (daysRemaining === 1) return "1 hari";
    return `${daysRemaining} hari`;
  };

  return (
    <Badge 
      variant={getVariant()} 
      className={cn("flex items-center gap-1 text-xs", className)}
    >
      <Clock className="h-3 w-3" />
      {getText()}
    </Badge>
  );
};

export default SLABadge;