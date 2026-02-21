import React from 'react';

interface SignInButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ onClick, label = "Sign In", className = "" }) => {
  // Default fallback if no specific theme is passed, mostly for safety.
  // Real usage in App.tsx defines specific colors.
  const defaultClass = "bg-gray-900 border-gray-600 text-gray-300 shadow-[0_3px_0_rgb(75,85,99)]";

  return (
    <button
      onClick={onClick}
      className={`
        relative py-2 px-1
        text-xs font-bold uppercase tracking-wide
        rounded-sm 
        border-t border-l border-r 
        transition-all duration-100 ease-in-out
        active:translate-y-[3px] active:shadow-none
        hover:-translate-y-0.5 
        backdrop-blur-sm
        whitespace-nowrap
        flex items-center justify-center
        select-none
        ${className || defaultClass}
      `}
    >
      <span className="drop-shadow-sm">{label}</span>
    </button>
  );
};