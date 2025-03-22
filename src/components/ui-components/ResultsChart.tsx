
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

  useEffect(() => {
    if (canvasRef.current) {
      console.log(`Canvas ready for chart: ${id}`);
    }
  }, [id]);

  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-5 animate-fade-up opacity-100",
        className
      )}
      style={{ animationDuration: '0.5s' }}
    >
      <h3 className="text-md font-medium mb-3">{title}</h3>
      <div className="w-full h-[250px] relative">
        <canvas 
          ref={canvasRef} 
          id={id} 
          width="400" 
          height="250"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            opacity: 1,
            transition: 'opacity 0.3s ease-in'
          }}
        ></canvas>
      </div>
    </div>
  );
}
