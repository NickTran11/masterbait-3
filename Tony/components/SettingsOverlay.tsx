import React, { useEffect } from 'react';
import { GearIcon } from '../icons/GearIcon';

interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsOverlay: React.FC<SettingsOverlayProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (~~
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-gray-900 border border-purple-500/50 rounded-lg shadow-[0_0_50px_rgba(147,51,234,0.3)] animate-scale-in overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-900/50 to-gray-900 border-b border-purple-500/30">
          <div className="flex items-center gap-3">
             <GearIcon className="text-orange-500 w-6 h-6 animate-spin-slow" />
             <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Settings</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
            {/* Setting Item 1 */}
            <div className="flex items-center justify-between">
                <span className="text-purple-200 font-medium">Master Volume</span>
                <input type="range" className="w-32 accent-orange-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
            </div>

            {/* Setting Item 2 */}
            <div className="flex items-center justify-between">
                <span className="text-purple-200 font-medium">Music</span>
                <div className="w-12 h-6 bg-orange-600 rounded-full flex items-center p-1 cursor-pointer justify-end">
                    <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </div>
            </div>

            {/* Setting Item 3 */}
            <div className="flex items-center justify-between">
                <span className="text-purple-200 font-medium">SFX</span>
                <div className="w-12 h-6 bg-gray-700 rounded-full flex items-center p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-gray-400 rounded-full shadow-md" />
                </div>
            </div>

             {/* Setting Item 4 */}
             <div className="flex items-center justify-between">
                <span className="text-purple-200 font-medium">Graphics Quality</span>
                <select className="bg-gray-800 border border-purple-500/30 text-white rounded p-1 text-sm focus:outline-none focus:border-orange-500">
                    <option>Low</option>
                    <option>Medium</option>
                    <option selected>High</option>
                    <option>Ultra</option>
                </select>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-purple-500/20 bg-black/20 text-center">
            <button 
                onClick={onClose}
                className="text-orange-400 hover:text-orange-300 text-sm font-bold uppercase tracking-wider hover:underline"
            >
                Close Menu
            </button>
        </div>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-spin-slow { animation: spin 4s linear infinite; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { 
            from { opacity: 0; transform: scale(0.95) translateY(10px); } 
            to { opacity: 1; transform: scale(1) translateY(0); } 
        }
      `}</style>
    </div>
  );
};