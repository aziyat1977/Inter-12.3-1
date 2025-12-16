import React, { useState, useEffect } from 'react';
import { Team, SoundType } from './types';
import { useAudio } from './hooks/useAudio';
import { Button } from './components/Button';
import { FactTicker } from './components/FactTicker';
import { PageKickOff } from './components/PageKickOff';
import { PageReading } from './components/PageReading';
import { PageGrammar } from './components/PageGrammar';
import { PageVocab } from './components/PageVocab';
import { PageDebate } from './components/PageDebate';

function App() {
  const [team, setTeam] = useState<Team>(Team.Madrid);
  const [page, setPage] = useState(1);
  const [isTeacher, setIsTeacher] = useState(false);
  const { playSound } = useAudio();

  // Vivid Neon Theme Colors
  const themeStyles = team === Team.Madrid 
    ? {
        '--primary': '#ffffff',
        '--secondary': '#FFD700', // Electric Gold
        '--accent': '#00C2FF', // Cyan
        '--neon-glow': 'rgba(0, 194, 255, 0.5)',
        '--bg': '#F0F4F8',
        '--text': '#1a1a1a',
        '--card-bg': 'rgba(255, 255, 255, 0.95)',
        '--gradient': 'linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)'
      }
    : {
        '--primary': '#0F172A',
        '--secondary': '#FFE600', // Bright Yellow
        '--accent': '#FF0055', // Neon Pink/Red
        '--neon-glow': 'rgba(255, 0, 85, 0.5)',
        '--bg': '#0B1120',
        '--text': '#ffffff',
        '--card-bg': 'rgba(30, 41, 59, 0.95)',
        '--gradient': 'linear-gradient(135deg, #0f172a 0%, #331d2c 100%)'
      };

  const toggleTeam = () => {
    setTeam(prev => prev === Team.Madrid ? Team.Barca : Team.Madrid);
  };

  const handleSetTeam = (newTeam: Team) => {
    setTeam(newTeam);
    setPage(2);
    playSound(SoundType.Whistle);
  };

  const changePage = (dir: number) => {
    const newPage = Math.max(1, Math.min(5, page + dir));
    if (newPage !== page) {
      setPage(newPage);
      playSound(SoundType.Whistle);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="min-h-screen font-sans text-text transition-colors duration-700 ease-in-out flex flex-col overflow-hidden relative"
      style={{ ...themeStyles, background: 'var(--gradient)' } as React.CSSProperties}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 animate-float ${team === Team.Madrid ? 'bg-accent' : 'bg-blue-900'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-30 animate-float-delayed ${team === Team.Madrid ? 'bg-secondary' : 'bg-accent'}`}></div>
      </div>

      {/* Header */}
      <nav className="flex justify-between items-center px-4 py-4 md:px-10 bg-card-bg/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/10 preserve-3d">
        <div className="font-display text-4xl tracking-widest text-shadow-outline transform hover:scale-105 transition-transform cursor-default">
          EL <span className="text-accent drop-shadow-[0_0_10px_var(--accent)]">CLÁSICO</span>
        </div>
        <div className="flex gap-2 md:gap-4">
          <Button onClick={toggleTeam} variant="outline" className="text-xs md:text-sm shadow-lg hover:shadow-accent/50">
             {team === Team.Madrid ? "🛡️ MADRID" : "🛡️ BARCA"}
          </Button>
          <Button 
            onClick={() => setIsTeacher(!isTeacher)} 
            active={isTeacher} 
            className="text-xs md:text-sm shadow-lg"
          >
            {isTeacher ? "👨‍🏫 TEACHER" : "🎓 STUDENT"}
          </Button>
        </div>
      </nav>

      <FactTicker team={team} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 relative z-10 perspective-[2000px]">
        {page === 1 && <PageKickOff onSetTeam={handleSetTeam} isTeacher={isTeacher} />}
        {page === 2 && <PageReading isTeacher={isTeacher} playSound={playSound} />}
        {page === 3 && <PageGrammar isTeacher={isTeacher} playSound={playSound} />}
        {page === 4 && <PageVocab isTeacher={isTeacher} playSound={playSound} />}
        {page === 5 && <PageDebate isTeacher={isTeacher} playSound={playSound} />}
      </main>

      {/* Footer Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-card-bg/90 backdrop-blur-md p-4 flex justify-between items-center shadow-[0_-5px_30px_rgba(0,0,0,0.2)] z-40 border-t border-accent/20">
        <Button 
          onClick={() => changePage(-1)} 
          disabled={page === 1}
          variant="ghost"
          className="text-sm md:text-base hover:translate-x-[-5px]"
        >
          <i className="fa fa-arrow-left mr-2"></i> PREV
        </Button>
        
        <div className="font-bold font-display text-2xl tracking-widest text-shadow-outline">
          {page} <span className="text-secondary mx-2">/</span> 5
        </div>

        <Button 
          onClick={() => changePage(1)} 
          disabled={page === 5}
          variant="ghost"
          className="text-sm md:text-base hover:translate-x-[5px]"
        >
          NEXT <i className="fa fa-arrow-right ml-2"></i>
        </Button>
      </div>
    </div>
  );
}

export default App;