import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ConfidenceScoreProps {
  score: number; // 0 to 100
  className?: string;
  showLabel?: boolean;
}

const getConfidenceLevel = (score: number) => {
  if (score >= 80) return { label: "Tinggi", color: "text-success" };
  if (score >= 50) return { label: "Sedang", color: "text-warning" };
  return { label: "Rendah", color: "text-destructive" };
};

const ConfidenceScore = ({ 
  score, 
  className, 
  showLabel = true 
}: ConfidenceScoreProps) => {
  const confidence = getConfidenceLevel(score);
  
  return (
    <div className={cn("space-y-2", className)} data-testid="confidence-score">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Skor Kepercayaan
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{score}%</span>
          {showLabel && (
            <span 
              className={cn("text-xs font-medium", confidence.color)}
              data-testid="confidence-level"
            >
              {confidence.label}
            </span>
          )}
        </div>
      </div>
      
      <Progress 
        value={score} 
        className="h-2"
        data-testid="confidence-progress"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Rendah</span>
        <span>Sedang</span>
        <span>Tinggi</span>
      </div>
    </div>
  );
};

export default ConfidenceScore;