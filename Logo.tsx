import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: '#FBBF24'}} />
        <stop offset="100%" style={{stopColor: '#D97706'}} />
      </linearGradient>
      <linearGradient id="red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#BE123C'}} />
        <stop offset="100%" style={{stopColor: '#881337'}} />
      </linearGradient>
      <filter id="drop-shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur"/>
        <feOffset in="blur" dx="1" dy="1" result="offsetBlur"/>
        <feMerge>
          <feMergeNode in="offsetBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <g filter="url(#drop-shadow)">
      {/* Main chip body */}
      <circle cx="50" cy="50" r="48" fill="url(#red-grad)" />
      
      {/* Outer gold ring */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="url(#gold-grad)" strokeWidth="3" />

      {/* White insets on the outer ring */}
      <g fill="#F3F4F6">
        <rect x="42.5" y="4" width="15" height="8" rx="2" />
        <rect x="42.5" y="88" width="15" height="8" rx="2" />
        <rect x="4" y="42.5" width="8" height="15" rx="2" />
        <rect x="88" y="42.5" width="8" height="15" rx="2" />
      </g>

      {/* Inner black circle */}
      <circle cx="50" cy="50" r="32" fill="#111827" />
      
      {/* Inner gold ring */}
      <circle cx="50" cy="50" r="32" fill="none" stroke="url(#gold-grad)" strokeWidth="2" />

      {/* Central AI Spark Icon (four-pointed star) */}
      <polygon
        points="50,30 55,45 70,50 55,55 50,70 45,55 30,50 45,45"
        fill="url(#gold-grad)"
      />
    </g>
  </svg>
);

export default Logo;