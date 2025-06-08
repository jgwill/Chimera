import React from 'react';

const EmergenceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.23 0-7.83 2.077-10.113 5.217a.75.75 0 0 0 .308 1.025l4.063 2.031a.75.75 0 0 1 .383.906C6.03 14.17 5.25 16.49 5.25 19.5c0 .414.336.75.75.75h12c.414 0 .75-.336.75-.75 0-3.01-.78-5.33-1.391-7.321a.75.75 0 0 1 .383-.906l4.063-2.03a.75.75 0 0 0 .308-1.026C19.83 5.077 16.23 3 12 3Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
  </svg>
);
export default EmergenceIcon;
