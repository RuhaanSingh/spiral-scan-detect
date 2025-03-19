
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export function FeatureCard({ icon, title, description, className, delay = 0 }: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-6 hover-lift animate-fade-up", 
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {icon && <div className="mb-4 text-primary">{icon}</div>}
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
