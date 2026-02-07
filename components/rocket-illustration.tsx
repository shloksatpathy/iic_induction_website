"use client";

export function RocketIllustration() {
  return (
    <div className="animate-float relative" aria-hidden="true">
      <svg
        width="120"
        height="180"
        viewBox="0 0 120 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
      >
        {/* Rocket body */}
        <path
          d="M60 10 C60 10, 85 50, 85 100 L85 130 L35 130 L35 100 C35 50, 60 10, 60 10Z"
          fill="hsl(0 0% 12%)"
          stroke="hsl(0 0% 30%)"
          strokeWidth="1.5"
        />
        {/* Window */}
        <circle
          cx="60"
          cy="70"
          r="12"
          fill="hsl(0 0% 5%)"
          stroke="hsl(0 0% 40%)"
          strokeWidth="1.5"
        />
        <circle cx="60" cy="70" r="8" fill="hsl(0 0% 8%)" />
        <circle cx="56" cy="66" r="2" fill="hsl(0 0% 30%)" />
        {/* Nose cone highlight */}
        <path
          d="M60 14 C60 14, 50 45, 48 70"
          stroke="hsl(0 0% 25%)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Fins */}
        <path
          d="M35 110 L15 145 L35 135Z"
          fill="hsl(0 0% 15%)"
          stroke="hsl(0 0% 30%)"
          strokeWidth="1"
        />
        <path
          d="M85 110 L105 145 L85 135Z"
          fill="hsl(0 0% 15%)"
          stroke="hsl(0 0% 30%)"
          strokeWidth="1"
        />
        {/* Nozzle */}
        <rect
          x="42"
          y="130"
          width="36"
          height="8"
          rx="2"
          fill="hsl(0 0% 18%)"
          stroke="hsl(0 0% 30%)"
          strokeWidth="1"
        />
        {/* Exhaust glow */}
        <ellipse cx="60" cy="155" rx="14" ry="20" fill="hsl(0 0% 20%)" opacity="0.3">
          <animate
            attributeName="ry"
            values="18;24;18"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.2;0.4;0.2"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="60" cy="150" rx="8" ry="12" fill="hsl(0 0% 35%)" opacity="0.4">
          <animate
            attributeName="ry"
            values="10;16;10"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.5;0.3"
            dur="1s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>
    </div>
  );
}
