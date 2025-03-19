
import { cn } from "@/lib/utils";
import { useEffect, useRef } from 'react';

interface ResultsChartProps {
  id: string;
  title: string;
  className?: string;
}

export function ResultsChart({ 
  id, 
  title,
  className 
}: ResultsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-5 animate-fade-up",
        className
      )}
    >
      <h3 className="text-md font-medium mb-3">{title}</h3>
      <div className="w-full">
        <canvas ref={canvasRef} id={id}></canvas>
      </div>
    </div>
  );
}
