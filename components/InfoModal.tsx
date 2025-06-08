import React from 'react';
import { PROJECT_CHIMERA_INFO } from '../constants';
import BookOpenIcon from './icons/BookOpenIcon';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 p-6 md:p-8 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-slate-700"
        onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
      >
        <div className="flex items-center mb-4">
          <BookOpenIcon className="w-8 h-8 text-sky-400 mr-3" />
          <h2 className="text-2xl font-semibold text-sky-300">{PROJECT_CHIMERA_INFO.title}</h2>
        </div>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          {PROJECT_CHIMERA_INFO.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full"
        >
          Return to the Journey
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
