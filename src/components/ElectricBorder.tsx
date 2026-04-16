import { ReactNode } from 'react';

interface ElectricBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
  duration?: number;
  color?: string;
  colorFrom?: string;
  colorTo?: string;
  showOnHover?: boolean;
}

const ElectricBorder = ({
  children,
  className = '',
  borderRadius = '1rem',
  duration = 3,
  color,
  colorFrom = 'hsl(190, 90%, 50%)',
  colorTo = 'hsl(330, 80%, 60%)',
  showOnHover = true,
}: ElectricBorderProps) => {
  const gradient = color 
    ? `conic-gradient(from 0deg, ${color}, transparent 30%, transparent 70%, ${color})` 
    : `conic-gradient(from 0deg, ${colorFrom}, ${colorTo}, ${colorFrom})`;

  return (
    <div 
      className={`relative group ${className}`} 
      style={{ borderRadius }}
    >
      {/* Animated border container */}
      <div
        className={`absolute inset-[-2px] rounded-[inherit] overflow-hidden transition-opacity duration-300 ${
          showOnHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }`}
        style={{ borderRadius }}
      >
        {/* Spinning gradient */}
        <div
          className="absolute inset-[-50%] animate-spin"
          style={{
            background: gradient,
            animationDuration: `${duration}s`,
          }}
        />
      </div>

      {/* Content container with background */}
      <div 
        className="relative z-10 h-full w-full bg-card"
        style={{ borderRadius }}
      >
        {children}
      </div>

      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 rounded-[inherit] blur-xl transition-opacity duration-500 ${
          showOnHover ? 'opacity-0 group-hover:opacity-30' : 'opacity-20'
        }`}
        style={{
          background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
          borderRadius,
        }}
      />
    </div>
  );
};

export default ElectricBorder;
