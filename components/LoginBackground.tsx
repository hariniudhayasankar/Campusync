
import React from 'react';

const LoginBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base glowing ring */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[var(--accent-primary)]/20 via-[var(--accent-glow)]/10 to-transparent blur-3xl"></div>

        {/* Middle ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[var(--accent-primary)]/30 via-[var(--accent-glow)]/20 to-transparent blur-2xl scale-90"></div>

        {/* Inner intense ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[var(--accent-hover)]/40 via-[var(--accent-primary)]/30 to-transparent blur-xl scale-75"></div>

        {/* Core bright center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 rounded-full bg-[var(--accent-primary)] blur-lg opacity-40"></div>
      </div>

      {/* Upward light beams */}
      {Array.from({ length: 7 }).map((_, i) => {
        const left = 30 + (i * 12) + Math.sin(i) * 3;
        const width = 2 + Math.random() * 2;
        const opacity = 0.15 + Math.random() * 0.15;

        return (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${left}%`,
              width: `${width}px`,
              height: '100%',
              background: `linear-gradient(to top, var(--accent-primary), transparent 100%)`,
              opacity: opacity,
              transform: `translateX(-50%)`,
              filter: 'blur(1px)',
            }}
          />
        );
      })}

      {/* Particle effects around the ring */}
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const radius = 250 + Math.random() * 100;
        const x = 50 + Math.cos(angle) * (radius / 10);
        const y = 85 + Math.sin(angle) * (radius / 20);
        const size = 1 + Math.random() * 2;
        const opacity = 0.2 + Math.random() * 0.3;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-[var(--accent-primary)] animate-pulse"
            style={{
              left: `${x}%`,
              bottom: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              boxShadow: `0 0 ${size * 2}px var(--accent-primary)`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        );
      })}

      {/* Additional sparkle particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = 40 + Math.random() * 20;
        const y = 70 + Math.random() * 15;
        const size = 0.5 + Math.random() * 1.5;

        return (
          <div
            key={`sparkle-${i}`}
            className="absolute rounded-full bg-[var(--accent-glow)]"
            style={{
              left: `${x}%`,
              bottom: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.2 + Math.random() * 0.3,
              boxShadow: `0 0 ${size * 3}px var(--accent-glow)`,
              animation: `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        );
      })}

      <style>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginBackground;
