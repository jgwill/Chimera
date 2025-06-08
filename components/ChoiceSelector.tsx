import React from 'react';
import { StoryChoice, Power } from '../types';
import { POWER_DETAILS } from '../constants';

interface ChoiceSelectorProps {
  choices: StoryChoice[];
  onSelectChoice: (choice: StoryChoice) => void;
  isLoading: boolean;
}

const ChoiceSelector: React.FC<ChoiceSelectorProps> = ({ choices, onSelectChoice, isLoading }) => {
  if (isLoading && choices.length === 0) {
    return (
      <div className="p-4 text-center text-slate-400">
        <p>The Weaver ponders the next thread...</p>
      </div>
    );
  }
  
  if (choices.length === 0 && !isLoading) {
    return (
        <div className="p-4 text-center text-slate-400">
            <p>The tapestry of this path is complete for now. Restart to explore anew.</p>
        </div>
    );
  }


  return (
    <div className="p-4 border-t border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      <p className="text-sm text-slate-300 mb-3 font-medium text-center">Choose The Weaver's next step:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {choices.map((choice) => {
          const powerMeta = POWER_DETAILS[choice.power] || POWER_DETAILS[Power.None];
          const Icon = powerMeta.Icon;
          return (
            <button
              key={choice.id}
              onClick={() => onSelectChoice(choice)}
              disabled={isLoading}
              className={`w-full p-3 border ${powerMeta.color} rounded-lg shadow-md hover:shadow-lg 
                          bg-slate-700 hover:bg-slate-600/70 transition-all duration-150 ease-in-out 
                          focus:outline-none focus:ring-2 focus:ring-opacity-50 ${powerMeta.color.replace('text-', 'focus:ring-')}
                          disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-left`}
            >
              <Icon className={`w-5 h-5 mr-3 flex-shrink-0 ${powerMeta.color.split(' ')[0]}`} />
              <span className="text-sm text-slate-100">{choice.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChoiceSelector;
