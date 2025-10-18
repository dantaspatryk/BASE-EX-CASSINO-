import React from 'react';

const ClubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="16" cy="9.5" r="3.5" />
    <circle cx="8" cy="9.5" r="3.5" />
    <circle cx="12" cy="6" r="3.5" />
    <path d="M12 9.5 V 20 M10 20 h 4" />
  </svg>
);

export default ClubIcon;
