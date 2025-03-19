
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Container({ children, className, id }: ContainerProps) {
  return (
    <div
      id={id}
      className={cn(
        "w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </div>
  );
}
