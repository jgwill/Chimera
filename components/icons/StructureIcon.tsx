import React from 'react';

const StructureIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75L20.25 20.25M3.75 20.25L20.25 3.75M3 12h18M12 3v18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 7.5H13.5V10.5H10.5V7.5Z M10.5 13.5H13.5V16.5H10.5V13.5Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10.5H10.5V13.5H7.5V10.5Z M13.5 10.5H16.5V13.5H13.5V10.5Z" />
  </svg>
);
export default StructureIcon;
