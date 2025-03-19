
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SampleImageProps {
  src: string;
  alt: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function SampleImage({ src, alt, label, onClick, className }: SampleImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "group cursor-pointer rounded-xl overflow-hidden subtle-shadow transition-all duration-300",
        "hover:shadow-md hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-square w-full relative bg-muted/30 overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={src} 
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
            !isLoaded && "opacity-0",
            isLoaded && "opacity-100"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <div className="p-3 text-center bg-white">
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
