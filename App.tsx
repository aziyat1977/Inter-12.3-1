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
  const [section, setSection] = useState(1);
  const [step, setStep] = useState(1);
  const [isTeacher, setIsTeacher] = useState(false);
  const { playSound } = useAudio();

  // Vivid Neon Theme Colors
  const themeStyles = team === Team.Madrid 
    ? {
        '--primary': '#ffffff',
        '--secondary': '#FFD700', // Electric Gold
        '--accent': '#00C2FF', // Cyan
        '--neon-glow': 'rgba(0, 194, 255, 0.8)',
        '--bg': '#F0F4F8',
        '--text': '#1a1a1a',
        '--card-bg': 'rgba(255, 255, 255, 0.90)',
        '--gradient': 'linear-gradient(135deg, #ffffff 0%, #d4fcff 100%)'
      }
    : {
        '--primary': '#0F172A',
        '--secondary': '#FFE600', // Bright Yellow
        '--accent': '#FF0055', // Neon Pink/Red
        '--neon-glow': 'rgba(255, 0, 85, 0.8)',
        '--bg': '#0B1120',
        '--text': '#ffffff',
        '--card-bg': 'rgba(20, 20, 40, 0.90)',
        '--gradient': 'linear-gradient(135deg, #0f172a 0%, #2a0a18 100%)'
      };

  const toggleTeam = () => {
    setTeam(prev => prev === Team.Madrid ? Team.Barca : Team.Madrid);
    playSound(SoundType.Whistle);
  };

  const handleSetTeam = (newTeam: Team) => {
    setTeam(newTeam);
    changePage(1); // Go to next step
    playSound(SoundType.Correct);
  };

  const changePage = (dir: number) => {
    let newStep = step + dir;
    let newSection = section;

    if (newStep > 5) {
      newStep = 1;
      newSection = Math.min(newSection + 1, 5);
    } else if (newStep < 1) {
      if (newSection > 1) {
        newSection--;
        newStep = 5;
      } else {
        newStep = 1;
      }
    }

    if (newSection !== section || newStep !== step) {
      setSection(newSection);
      setStep(newStep);
      playSound(SoundType.Whistle);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalProgress = ((section - 1) * 5 + step) / 25 * 100;

  return (
    <div 
      className="min-h-screen font-sans text-text transition-colors duration-700 ease-in-out flex flex-col overflow-hidden relative"
      style={{ ...themeStyles, background: 'var(--gradient)' } as React.CSSProperties}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-40 animate-float ${team === Team.Madrid ? 'bg-accent' : 'bg-blue-900'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-40 animate-float-delayed ${team === Team.Madrid ? 'bg-secondary' : 'bg-accent'}`}></div>
      </div>

      {/* Header */}
      <nav className="flex justify-between items-center px-4 py-4 md:px-8 bg-card-bg/50 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-white/20 preserve-3d">
        <div className="font-display text-3xl md:text-5xl tracking-widest text-shadow-outline cursor-default z-50">
          EL <span className="text-accent drop-shadow-[0_0_15px_var(--accent)]">CLÁSICO</span>
        </div>
        <div className="flex gap-2 md:gap-4 z-50">
          <Button onClick={toggleTeam} variant="outline" className="text-xs md:text-sm shadow-lg hover:shadow-accent/50 border-2 font-black">
             {team === Team.Madrid ? "👑 MADRID" : "🦁 BARCA"}
          </Button>
          <Button 
            onClick={() => setIsTeacher(!isTeacher)} 
            active={isTeacher} 
            className="text-xs md:text-sm shadow-lg font-black"
          >
            {isTeacher ? "👨‍🏫 TEACHER" : "🎓 STUDENT"}
          </Button>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-black/10 z-50">
        <div 
          className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
          style={{ width: `${totalProgress}%` }}
        ></div>
      </div>

      <FactTicker team={team} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 relative z-10 perspective-[2000px] flex flex-col justify-center">
        {section === 1 && <PageKickOff step={step} onSetTeam={handleSetTeam} isTeacher={isTeacher} team={team} />}
        {section === 2 && <PageReading step={step} isTeacher={isTeacher} playSound={playSound} />}
        {section === 3 && <PageGrammar step={step} isTeacher={isTeacher} playSound={playSound} />}
        {section === 4 && <PageVocab step={step} isTeacher={isTeacher} playSound={playSound} />}
        {section === 5 && <PageDebate step={step} isTeacher={isTeacher} playSound={playSound} />}
      </main>

      {/* Footer Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-card-bg/80 backdrop-blur-xl p-4 flex justify-between items-center shadow-[0_-5px_40px_rgba(0,0,0,0.3)] z-40 border-t border-accent/30">
        <Button 
          onClick={() => changePage(-1)} 
          disabled={section === 1 && step === 1}
          variant="ghost"
          className="text-lg md:text-xl font-black hover:-translate-x-2"
        >
          <i className="fa fa-arrow-left mr-2"></i> BACK
        </Button>
        
        <div className="font-black font-display text-3xl tracking-widest text-shadow-outline opacity-80">
          {section}-{step}
        </div>

        <Button 
          onClick={() => changePage(1)} 
          disabled={section === 5 && step === 5}
          variant="ghost"
          className="text-lg md:text-xl font-black hover:translate-x-2"
        >
          NEXT <i className="fa fa-arrow-right ml-2"></i>
        </Button>
      </div>
    </div>
  );
}

export default App;