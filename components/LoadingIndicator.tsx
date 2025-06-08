import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-400"></div>
      <p className="ml-3 text-slate-300">The Weaver is spinning new threads...</p>
    </div>
  );
};

export default LoadingIndicator;
