
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface ResultCardProps {
  title: string;
  value: string | number;
  description?: string;
  status?: 'normal' | 'warning' | 'abnormal';
  className?: string;
}

export function ResultCard({ 
  title, 
  value, 
  description, 
  status = 'normal',
  className 
}: ResultCardProps) {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-5 transition-all duration-300",
        "hover:shadow-md hover:-translate-y-1",
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {status && (
          <Badge
            variant={
              status === 'normal' 
                ? 'default' 
                : status === 'warning' 
                  ? 'secondary' 
                  : 'primary'
            }
            className={
              status === 'normal'
                ? 'bg-green-100 text-green-800'
                : status === 'warning'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }
          >
            {status === 'normal' ? 'Normal' : status === 'warning' ? 'Warning' : 'Abnormal'}
          </Badge>
        )}
      </div>
      <div className="flex items-end space-x-1">
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      {description && (
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
