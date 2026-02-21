import React from 'react';

export const GameTitle: React.FC = () => {
  // Base dimensions (Desktop / High Res reference)
  // Envelope Width: 480px
  // Hook Offset from Center: 220px
  
  return (
    <div className="relative w-full h-48 md:h-64 flex justify-center items-center mt-4 mb-4 select-none overflow-visible pointer-events-none">
      
      {/* 
        Scaling Wrapper 
        - Default scale (mobile): 0.6
        - MD scale: 0.8
        - LG scale: 1.0
        This ensures the UI looks good on all devices without recalculating internal offsets.
      */}
      <div className="relative transform scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 transition-transform duration-300 origin-center">
        
        {/* Swinging Container - Pivot point is relative to this container's center (0,0) */}
        {/* Pivot X = 220px (Hook position), Pivot Y = -300px (Up the line, halved from -600px) */}
        {/* Moved up (-top-16) to shorten visible line and prevent overlap with buttons */}
        <div className="absolute -top-16 left-0 animate-swing origin-[220px_-600px]">
            
            {/* The Fishing Line */}
            {/* X = 220px */}
            {/* Ends at Y=15px */}
            {/* Shortened line: Top -450px (was -900), Height 465px (was 915) */}
            <div className="absolute -top-[450px] left-[220px] w-[2px] h-[465px] bg-white/60 shadow-[0_0_2px_rgba(255,255,255,0.8)] z-10" />

            {/* The Hook Group */}
            {/* Positioned at the end of the line (220px, 15px) */}
            <div className="absolute top-[15px] left-[220px] z-30 pointer-events-none">
                {/* 
                   Hook SVG Wrapper
                   Centered horizontally (-left-6 = -24px, half of w-12/48px)
                   Shifted up slightly (-top-2) so the hook eye aligns with the line end.
                   Increased height to h-24 (96px) for the longer, sharper hook.
                */}
                <div className="absolute -top-2 -left-6 w-12 h-24 filter drop-shadow-md">
                    <svg viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform rotate-[0deg]">
                        <defs>
                            <linearGradient id="hookMetal" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#d1d5db" /> {/* Light Gray */}
                                <stop offset="40%" stopColor="#f9fafb" /> {/* White highlight */}
                                <stop offset="60%" stopColor="#9ca3af" /> {/* Gray */}
                                <stop offset="100%" stopColor="#4b5563" /> {/* Dark Gray */}
                            </linearGradient>
                        </defs>
                        
                        {/* Eye at 25, 6 */}
                        <circle cx="25" cy="6" r="4.5" stroke="url(#hookMetal)" strokeWidth="3" />
                        
                        {/* The Hook Shape: Long Shank, Sharp Bend, Sharp Point */}
                        <path 
                          d="M 25 10 L 25 75 C 25 98, 5 98, 5 75 L 5 60" 
                          stroke="url(#hookMetal)" 
                          strokeWidth="3.5" 
                          strokeLinecap="round" 
                          fill="none"
                        />
                        
                        {/* Barb */}
                        <path d="M 5 60 L 11 68" stroke="url(#hookMetal)" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            {/* The Envelope */}
            {/* 
               Anchored relative to the hook position (220px, 15px).
               We want the envelope's top-right corner (the hole) to hang from the hook's bottom curve.
               New Hook Bottom is approx at 90% of h-24 (96px) => ~86px.
               We shift the envelope down by roughly 70px to hang in the curve.
            */}
            <div 
                className="absolute left-[220px] top-[15px] z-20 transition-transform duration-500 pointer-events-auto"
                style={{
                    // Shift down to hook bottom (approx 70px for new longer hook)
                    // Shift left by full width (100%) so the right edge aligns with X=220
                    // Rotate slightly as it hangs
                    transform: 'translate(-100%, 64px) rotate(-6deg)',
                    transformOrigin: 'top right' // Rotate around the hole
                }}
            >
                <div className="relative bg-[#f2eadd] w-[480px] h-[200px] shadow-2xl rounded-sm border-2 border-[#dcd0b8] flex flex-col items-center justify-center p-6 group hover:rotate-2 transition-transform duration-500 origin-top-right">
                    
                    {/* Envelope Patterns / Texture */}
                    <div className="absolute inset-0 bg-[radial-gradient(#dcd0b8_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />
                    
                    {/* Decoration */}
                    <div className="absolute top-4 left-4 w-16 h-1 bg-red-800/20 transform -rotate-2" />
                    <div className="absolute bottom-4 left-4 w-24 h-24 border-l-4 border-b-4 border-gray-400/10 rounded-bl-3xl" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-row items-center gap-4 transform -rotate-2">
                        <span className="text-7xl font-black text-gray-800 tracking-tighter drop-shadow-sm font-sans whitespace-nowrap">
                        MASTER
                        </span>
                        <span className="text-7xl font-black text-white bg-[#ff5500] px-4 py-1 rounded-sm shadow-md border-2 border-[#cc4400] transform rotate-3 whitespace-nowrap">
                        BAIT
                        </span>
                    </div>

                    {/* Stamp */}
                    <div className="absolute bottom-3 right-6 border-2 border-red-700/40 text-red-700/40 font-bold text-xs px-2 py-1 transform -rotate-12 uppercase tracking-[0.2em] font-mono">
                        Confidential
                    </div>

                    {/* Hook Puncture Hole - Positioned at top right relative to envelope */}
                    {/* Adjusted to align perfectly with the hook visuals */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-black/60 rounded-full blur-[1px]" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border border-gray-500 opacity-50" />
                </div>
            </div>

        </div>
      </div>

      <style>{`
        @keyframes swing {
            0%, 100% { transform: rotate(1.5deg); }
            50% { transform: rotate(-1.5deg); }
        }
        .animate-swing {
             animation: swing 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};