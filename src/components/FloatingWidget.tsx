import { useState, useRef, useEffect } from "react";
import { Flame, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingWidgetProps {
  onToggle: () => void;
  isExpanded: boolean;
}

export const FloatingWidget = ({ onToggle, isExpanded }: FloatingWidgetProps) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!widgetRef.current) return;
    
    const rect = widgetRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  if (isExpanded) {
    return (
      <div
        ref={widgetRef}
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999,
        }}
        className={cn(
          "cursor-move select-none",
          isDragging && "cursor-grabbing"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-card hover:bg-card/80 border-2 border-primary shadow-glow-red"
          onMouseDown={handleMouseDown}
          onClick={onToggle}
        >
          <Minimize2 className="h-5 w-5 text-primary" />
        </Button>
      </div>
    );
  }

  return (
    <div
      ref={widgetRef}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
      }}
      className={cn(
        "cursor-move select-none",
        isDragging && "cursor-grabbing"
      )}
      onMouseDown={handleMouseDown}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-16 w-16 rounded-full bg-gradient-fire hover:scale-110 transition-transform shadow-glow-red animate-pulse-glow"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <Flame className="h-8 w-8 text-white animate-float" />
      </Button>
    </div>
  );
};

