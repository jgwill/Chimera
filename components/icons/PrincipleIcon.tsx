import React from 'react';

const PrincipleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12M3.75 3h-1.5m1.5 0h16.5M3.75 14.25v-11.25C3.75 3 3.75 3 3.75 3M3.75 14.25A2.25 2.25 0 0 0 6 16.5h12M3.75 14.25h16.5m0 0c0 .621-.504 1.125-1.125 1.125H6A2.25 2.25 0 0 0 3.75 16.5M12 3c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125M12 3c0-.621-.504-1.125-1.125-1.125H9.375c-.621 0-1.125.504-1.125 1.125M12 3v1.875m0 0H9.375m2.625 0h2.625m0 0v1.875m0 0h-2.625m2.625 0h-1.5m-1.125-1.875H9.375m1.125 1.875v1.875m0 0H9.375" />
  </svg>
);
export default PrincipleIcon;
