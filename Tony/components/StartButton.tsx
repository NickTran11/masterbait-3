import React from 'react';

interface StartButtonProps {
  onClick: () => void;
}

export const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full touch-manipulation focus:outline-none select-none"
    >
      <div className="
        relative z-10 w-full
        py-2 px-3
        bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700
        text-white text-sm font-bold uppercase tracking-widest
        rounded-sm
        border-t border-l border-r border-orange-400
        shadow-[0_4px_0_rgb(124,45,18),0_8px_15px_rgba(0,0,0,0.3)]
        transition-all duration-150 ease-in-out
        active:shadow-none active:translate-y-[4px]
        hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_5px_0_rgb(124,45,18),0_12px_20px_rgba(0,0,0,0.4)]
        flex items-center justify-center gap-2 whitespace-nowrap
      ">
        <span className="relative z-10 drop-shadow-sm flex items-center gap-2 text-shadow">
            Start Game
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform filter drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
        </span>
        
        {/* Top Gloss */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      </div>
    </button>
  );
};