
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default',
  className 
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === 'default' && "bg-muted text-muted-foreground",
        variant === 'primary' && "bg-primary text-primary-foreground",
        variant === 'secondary' && "bg-secondary text-secondary-foreground",
        variant === 'outline' && "border border-muted bg-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
