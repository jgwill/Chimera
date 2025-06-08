import React from 'react';

const TruthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5a10.5 10.5 0 1 0 10.5 10.5A10.512 10.512 0 0 0 12 1.5Zm0 2.25a8.25 8.25 0 1 1-8.25 8.25A8.259 8.259 0 0 1 12 3.75Zm0 3a.75.75 0 0 0-.75.75V12a.75.75 0 0 0 1.5 0V7.5a.75.75 0 0 0-.75-.75Zm0 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
  </svg>
);
export default TruthIcon;
