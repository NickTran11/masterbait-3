import React from 'react';
import { GearIcon } from '../icons/GearIcon';

interface HeaderProps {
    onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
    return (
        <div className="absolute top-0 right-0 p-6 z-50">
            <button 
                onClick={onSettingsClick}
                className="p-3 rounded-full bg-black/30 text-orange-400 hover:text-white hover:bg-orange-500/80 transition-all duration-300 backdrop-blur-sm border border-orange-500/30 shadow-[0_0_15px_rgba(255,165,0,0.3)] hover:shadow-[0_0_25px_rgba(255,165,0,0.6)] group"
                aria-label="Settings"
            >
                <GearIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
            </button>
        </div>
    );
}