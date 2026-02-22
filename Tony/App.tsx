import React, { useState } from 'react';
import { Background } from './components/Background';
import { GameTitle } from './components/GameTitle';
import { StartButton } from './components/StartButton';
import { SettingsOverlay } from './components/SettingsOverlay';
import { Header } from './components/Header';
import { SignInButton } from './components/SignInButton';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <Background>
      {/* Top Right Header Controls */}
      <Header onSettingsClick={toggleSettings} />

      <div className="relative z-10 h-screen w-full flex flex-col items-center overflow-hidden">
            
            {view === 'landing' ? (
              <div className="w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden animate-fade-in">
                  <div className="w-full flex-1 flex flex-col items-center justify-center py-8 min-h-[600px]">
                      
                      <div className="flex flex-col items-center gap-8 md:gap-16 w-full max-w-4xl px-4">
                          {/* The 'Bait' (Logo) hanging */}
                          <div className="transform hover:scale-105 transition-transform duration-300 w-full flex justify-center">
                            <GameTitle />
                          </div>

                          {/* Main Action Area */}
                          {/* Added mt-12 to lower the buttons */}
                          <div className="w-full max-w-[190px] flex flex-col gap-3 mt-20">
                              {/* Main CTA */}
                              <div className="w-full z-10">
                                  <StartButton onClick={() => setView('dashboard')} />
                              </div>

                              {/* Secondary Actions (Login / Signup) */}
                              <div className="flex gap-2 w-full">
                                  <SignInButton 
                                      label="Login" 
                                      onClick={() => console.log('Login')} 
                                      className="flex-1 bg-gray-900/80 border-orange-500/40 text-orange-200 shadow-[0_3px_0_rgb(124,45,18)] hover:bg-orange-900/40 hover:text-white hover:shadow-[0_4px_0_rgb(124,45,18)]"
                                  />
                                  <SignInButton 
                                      label="Sign Up" 
                                      onClick={() => console.log('Sign Up')} 
                                      className="flex-1 bg-gray-900/80 border-purple-500/40 text-purple-200 shadow-[0_3px_0_rgb(88,28,135)] hover:bg-purple-900/40 hover:text-white hover:shadow-[0_4px_0_rgb(88,28,135)]"
                                  />
                              </div>
                          </div>
                      </div>

                  </div>

                  {/* Version Footer */}
                  <div className="w-full py-4 text-purple-200/30 text-xs font-mono text-center shrink-0">
                    v1.0.6-live • MASTER BAIT STUDIOS<br/>
                    FISHING FOR COMPLIMENTS
                  </div>
              </div>
            ) : (
               <Dashboard onBack={() => setView('landing')} />
            )}

      </div>

      {/* Settings Overlay */}
      <SettingsOverlay isOpen={isSettingsOpen} onClose={toggleSettings} />
      
      <style>{`
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </Background>
  );
};

export default App;