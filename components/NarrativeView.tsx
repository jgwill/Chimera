import React, { useRef, useEffect } from 'react';
import { StorySegment, Power } from '../types';
import { POWER_DETAILS } from '../constants';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface NarrativeViewProps {
  segments: StorySegment[];
}

const NarrativeView: React.FC<NarrativeViewProps> = ({ segments }) => {
  const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [segments]);

  const getPowerMeta = (power: Power) => POWER_DETAILS[power] || POWER_DETAILS[Power.None];

  return (
    <div className="p-4 md:p-6 space-y-4 overflow-y-auto h-[calc(100%-4rem)] flex-grow bg-slate-800 rounded-lg shadow-inner">
      {segments.map((segment, index) => {
        const powerMeta = getPowerMeta(segment.powerInFocus);
        const Icon = powerMeta.Icon;
        return (
          <div
            key={segment.id}
            className={`flex animate-fadeIn ${segment.isUserChoice ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xl p-3 rounded-lg shadow ${
                segment.isUserChoice
                  ? `bg-sky-600 text-white rounded-br-none`
                  : `bg-slate-700 text-slate-200 rounded-bl-none`
              }`}
            >
              {!segment.isUserChoice && (
                <div className="flex items-center mb-1">
                  <Icon className={`w-4 h-4 mr-2 ${powerMeta.color.split(' ')[0]}`} />
                  <span className={`text-xs font-semibold ${powerMeta.color.split(' ')[0]}`}>
                    {powerMeta.name}
                  </span>
                </div>
              )}
               {segment.isUserChoice && (
                <div className="flex items-center mb-1 text-xs font-semibold text-sky-200">
                  <ChevronRightIcon className="w-4 h-4 mr-1" />
                  Your Path (Focus: {powerMeta.name})
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{segment.text}</p>
              <p className="text-xs text-slate-400 mt-2 text-right">
                {segment.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default NarrativeView;