
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AnimatedGradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function AnimatedGradientButton({ 
  children, 
  onClick, 
  className,
  disabled = false 
}: AnimatedGradientButtonProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <button
      className={cn(
        "relative overflow-hidden px-6 py-3 rounded-full font-medium text-white transition-all duration-300",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset]",
        "bg-primary hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,_0_0_15px_rgba(0,0,0,0.1)]",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        className
      )}
      style={{
        background: !disabled ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 60%)` : '',
        backgroundPosition: 'center',
        backgroundSize: '200% 200%',
        backgroundColor: 'hsl(var(--primary))',
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
