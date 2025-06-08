import React from 'react';
import { Power } from '../types';
import { POWER_DETAILS } from '../constants';

interface PowerPillarsProps {
  currentFocus: Power | null;
}

const PowerPillars: React.FC<PowerPillarsProps> = ({ currentFocus }) => {
  const relevantPowers = [
    Power.Life, Power.Love, Power.Intelligence, 
    Power.Soul, Power.Principle, Power.Truth,
    Power.Structure, Power.Emergence
  ];

  return (
    <div className="p-3 bg-slate-800 border-b border-slate-700 hidden md:block">
      <div className="flex justify-center space-x-3 items-center">
        {relevantPowers.map(power => {
          const details = POWER_DETAILS[power];
          const Icon = details.Icon;
          const isActive = currentFocus === power;
          return (
            <div 
              key={power} 
              title={details.description}
              className={`flex flex-col items-center p-2 rounded-md transition-all duration-200
                          ${isActive ? `${details.color.split(' ')[0].replace('text-','bg-')}/20 ${details.color}` : 'opacity-60 hover:opacity-100'}`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? details.color.split(' ')[0] : 'text-slate-400'}`} />
              <span className={`text-xs font-medium ${isActive ? details.color.split(' ')[0] : 'text-slate-400'}`}>
                {details.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PowerPillars;
