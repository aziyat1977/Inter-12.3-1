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

  // CSS Variables based on theme
  const themeStyles = team === Team.Madrid 
    ? {
        '--primary': '#ffffff',
        '--secondary': '#FEBE10',
        '--accent': '#00529F',
        '--bg': '#F0F2F5',
        '--text': '#1a1a1a',
        '--card-bg': '#ffffff',
      }
    : {
        '--primary': '#004D98',
        '--secondary': '#EDBB00',
        '--accent': '#DB0030',
        '--bg': '#1a1a2e',
        '--text': '#ffffff',
        '--card-bg': '#16213e',
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
      className="min-h-screen font-sans text-text transition-colors duration-500 ease-in-out flex flex-col"
      style={{ ...themeStyles, backgroundColor: 'var(--bg)' } as React.CSSProperties}
    >
      {/* Header */}
      <nav className="flex justify-between items-center px-4 py-4 md:px-10 bg-card-bg shadow-md sticky top-0 z-50">
        <div className="font-display text-3xl tracking-widest">
          EL <span className="text-accent">CLÁSICO</span>
        </div>
        <div className="flex gap-2 md:gap-4">
          <Button onClick={toggleTeam} variant="outline" className="text-xs md:text-sm">
             {team === Team.Madrid ? "🛡️ MADRID" : "🛡️ BARCA"}
          </Button>
          <Button 
            onClick={() => setIsTeacher(!isTeacher)} 
            active={isTeacher} 
            className="text-xs md:text-sm"
          >
            {isTeacher ? "👨‍🏫 TEACHER" : "🎓 STUDENT"}
          </Button>
        </div>
      </nav>

      <FactTicker team={team} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 relative overflow-hidden">
        {page === 1 && <PageKickOff onSetTeam={handleSetTeam} isTeacher={isTeacher} />}
        {page === 2 && <PageReading isTeacher={isTeacher} playSound={playSound} />}
        {page === 3 && <PageGrammar isTeacher={isTeacher} playSound={playSound} />}
        {page === 4 && <PageVocab isTeacher={isTeacher} playSound={playSound} />}
        {page === 5 && <PageDebate isTeacher={isTeacher} playSound={playSound} />}
      </main>

      {/* Footer Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-card-bg p-4 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-40 border-t border-text/5">
        <Button 
          onClick={() => changePage(-1)} 
          disabled={page === 1}
          variant="ghost"
          className="text-sm md:text-base"
        >
          <i className="fa fa-arrow-left mr-2"></i> PREV
        </Button>
        
        <div className="font-bold font-display text-xl tracking-widest">
          {page} <span className="text-secondary mx-2">/</span> 5
        </div>

        <Button 
          onClick={() => changePage(1)} 
          disabled={page === 5}
          variant="ghost"
          className="text-sm md:text-base"
        >
          NEXT <i className="fa fa-arrow-right ml-2"></i>
        </Button>
      </div>
    </div>
  );
}

export default App;