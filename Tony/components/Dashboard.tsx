import React from 'react';

interface Level {
  id: number;
  title: string;
  status: 'locked' | 'current' | 'completed';
  yOffset: number; // Offset from vertical center in pixels
}

const levels: Level[] = [
  { id: 1, title: "The Puddle", status: 'completed', yOffset: 0 },
  { id: 2, title: "Local Pond", status: 'completed', yOffset: -60 },
  { id: 3, title: "Rushing River", status: 'current', yOffset: 60 },
  { id: 4, title: "Misty Lake", status: 'locked', yOffset: -30 },
  { id: 5, title: "Deep Ocean", status: 'locked', yOffset: 0 },
];

interface DashboardProps {
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  // Configuration for layout
  const levelSpacing = 220; // Horizontal distance between levels
  const startX = 150;
  const containerHeight = 500; // Internal coordinate height
  const centerY = containerHeight / 2;
  
  // Calculate total width based on the position of the last level plus padding
  // Last level X = startX + (n-1) * spacing
  // We add startX at the end for symmetrical padding
  const totalWidth = startX + ((levels.length - 1) * levelSpacing) + startX;

  // Helper to get coordinates for a level
  const getCoords = (level: Level, index: number) => {
    return {
      x: startX + index * levelSpacing,
      y: centerY + level.yOffset
    };
  };

  // Generate SVG Path
  const generatePath = () => {
    let path = `M ${startX} ${centerY + levels[0].yOffset}`;
    
    for (let i = 0; i < levels.length - 1; i++) {
      const start = getCoords(levels[i], i);
      const end = getCoords(levels[i + 1], i + 1);
      
      // Control points for a smooth Bezier curve (horizontal flow)
      // CP1 pulls to the right from start, CP2 pulls to the left from end
      const cp1 = { x: start.x + levelSpacing * 0.5, y: start.y };
      const cp2 = { x: end.x - levelSpacing * 0.5, y: end.y };
      
      path += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
    }
    return path;
  };

  return (
    <div className="w-full h-full flex flex-col items-center animate-fade-in relative overflow-hidden bg-black/40">
        
      {/* Top Bar */}
      <div className="w-full max-w-6xl p-6 flex items-center justify-between z-20 absolute top-0 left-0 right-0 pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 group backdrop-blur-md bg-black/20"
        >
          <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-bold uppercase text-sm tracking-wider">Back</span>
        </button>
        
        <div className="pointer-events-auto bg-gray-900/80 backdrop-blur border border-purple-500/30 px-4 py-1 rounded-full flex items-center gap-2 shadow-lg">
           <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
           <span className="text-xs font-mono text-purple-200 uppercase tracking-widest">Map View</span>
        </div>
      </div>

      {/* Map Container - Horizontal Scroll */}
      <div className="flex-1 w-full overflow-x-auto overflow-y-hidden relative scrollbar-hide flex items-center">
        
           {/* Inner container must not shrink to ensure coordinate system stays accurate */}
           <div className="relative shrink-0" style={{ width: totalWidth, height: containerHeight }}>
              
              {/* Connection Path (SVG) */}
              <svg 
                  className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0"
                  viewBox={`0 0 ${totalWidth} ${containerHeight}`}
                  preserveAspectRatio="none" 
              >
                  {/* Outer Glow Path */}
                  <path 
                    d={generatePath()} 
                    fill="none" 
                    stroke="#a855f7" 
                    strokeWidth="12" 
                    strokeOpacity="0.1" 
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Dashed Line */}
                  <path 
                    d={generatePath()} 
                    fill="none" 
                    stroke="#d8b4fe" 
                    strokeWidth="4" 
                    strokeDasharray="12 8" 
                    strokeLinecap="round" 
                    className="opacity-40"
                    vectorEffect="non-scaling-stroke"
                  />
              </svg>

              {/* Levels */}
              {levels.map((level, index) => {
                 const coords = getCoords(level, index);
                 const isLocked = level.status === 'locked';
                 const isCurrent = level.status === 'current';
                 const isCompleted = level.status === 'completed';

                 return (
                   <div 
                     key={level.id}
                     className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2 group cursor-pointer"
                     style={{ left: coords.x, top: coords.y }}
                   >
                       {/* Level Node Circle */}
                       <div className={`
                          relative w-24 h-24 rounded-full border-4 flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300
                          ${isLocked 
                             ? 'bg-gray-800 border-gray-600 grayscale opacity-80' 
                             : isCurrent 
                                ? 'bg-gradient-to-br from-orange-400 to-red-600 border-white scale-110 shadow-[0_0_30px_rgba(249,115,22,0.6)]' 
                                : 'bg-purple-600 border-purple-300 hover:scale-105'
                           }
                       `}>
                          
                          {/* Inner Icon / Content */}
                          {isLocked ? (
                             <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                             </svg>
                          ) : isCompleted ? (
                             <div className="flex flex-col items-center text-yellow-300">
                               <svg className="w-12 h-12 filter drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                               </svg>
                             </div>
                          ) : (
                             /* Current Level - Play Icon */
                             <svg className="w-12 h-12 text-white fill-current ml-1 animate-pulse" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                             </svg>
                          )}

                          {/* Shine Effect */}
                          {!isLocked && (
                             <div className="absolute top-0 right-0 w-full h-full rounded-full bg-gradient-to-bl from-white/30 to-transparent pointer-events-none" />
                          )}
                          
                          {/* Current Level Ripple */}
                          {isCurrent && (
                             <div className="absolute inset-0 rounded-full border-2 border-orange-500 animate-ping opacity-75 pointer-events-none" />
                          )}

                          {/* Stars for Completed */}
                          {isCompleted && (
                             <div className="absolute -top-3 w-full flex justify-center gap-1">
                                <div className="text-yellow-400 text-sm drop-shadow-md">★</div>
                                <div className="text-yellow-400 text-base -mt-1 drop-shadow-md">★</div>
                                <div className="text-yellow-400 text-sm drop-shadow-md">★</div>
                             </div>
                          )}
                       </div>

                       {/* Tooltip / Label */}
                       <div className={`
                          absolute top-28
                          bg-gray-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-md border border-gray-700 whitespace-nowrap backdrop-blur-sm shadow-xl transition-all duration-300
                          ${isCurrent ? 'opacity-100 scale-100 border-orange-500/50 text-orange-200' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'}
                       `}>
                          <span className="text-gray-400 mr-2 uppercase text-[10px] tracking-wider">Lvl {level.id}</span>
                          {level.title}
                       </div>
                   </div>
                 );
              })}
           </div>

      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};