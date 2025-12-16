import React, { useState, useEffect } from 'react';
import { TeacherCard } from './TeacherCard';
import { SoundType } from '../types';

interface Props {
  step: number;
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

const LEVELS = [
  { id: 1, text: "The player SCORED", words: ["SCORED", "player", "The"] },
  { id: 2, text: "The player from Brazil SCORED", words: ["SCORED", "Brazil", "from", "player", "The"] },
  { id: 3, text: "The tiny magician from Argentina SCORED", words: ["SCORED", "Argentina", "from", "magician", "tiny", "The"] }
];

export const PageGrammar: React.FC<Props> = ({ step, isTeacher, playSound }) => {
  const [sentence, setSentence] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<Array<{id: number, text: string, used: boolean}>>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize game based on step (3, 4, 5 map to levels 0, 1, 2)
  useEffect(() => {
    if (step >= 3 && step <= 5) {
      const levelIndex = step - 3;
      const target = LEVELS[levelIndex];
      const shuffled = target.words
        .map((text, i) => ({ id: i, text, used: false }))
        .sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSentence([]);
      setIsSuccess(false);
    }
  }, [step]);

  const handleWordClick = (id: number, text: string) => {
    if (isSuccess) return;
    setAvailableWords(prev => prev.map(w => w.id === id ? { ...w, used: true } : w));
    const newSentence = [...sentence, text];
    setSentence(newSentence);
    playSound(SoundType.Whistle);

    const levelIndex = step - 3;
    const targetSentence = LEVELS[levelIndex].text.split(" ");
    if (newSentence.length === targetSentence.length) {
      if (newSentence.join(" ") === LEVELS[levelIndex].text) {
        setIsSuccess(true);
        playSound(SoundType.Correct);
      } else {
          playSound(SoundType.Wrong);
          setTimeout(() => {
             setSentence([]);
             setAvailableWords(prev => prev.map(w => ({...w, used: false})));
          }, 1000);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center animate-slide-in min-h-[60vh] text-center">
      
      {/* STEP 1: HALFTIME INTRO */}
      {step === 1 && (
        <>
          <h1 className="text-7xl md:text-9xl font-display mb-8 text-shadow-neon">HALFTIME</h1>
          <div className="text-[8rem] my-4">🧠</div>
          <h2 className="text-4xl md:text-6xl font-black text-secondary">TIKI-TAKA GRAMMAR</h2>
          <p className="text-2xl mt-8 max-w-2xl font-bold">"Don't play like a Sunday League team. Build the sentence properly!"</p>
        </>
      )}

      {/* STEP 2: THE RULE */}
      {step === 2 && (
        <div className="card-3d bg-accent/90 p-12 rounded-[3rem] text-white shadow-[0_0_50px_var(--accent)]">
          <h2 className="text-5xl md:text-7xl font-black mb-8 border-b-4 border-white pb-4">THE GOLDEN RULE</h2>
          <div className="flex flex-col gap-8 text-left">
             <div className="bg-black/20 p-6 rounded-2xl">
               <p className="text-2xl font-bold mb-2 opacity-70">SUBJECT (Who?)</p>
               <p className="text-4xl md:text-6xl font-black">The tiny player</p>
             </div>
             <div className="text-6xl text-center">➕</div>
             <div className="bg-black/20 p-6 rounded-2xl">
               <p className="text-2xl font-bold mb-2 opacity-70">VERB (Action)</p>
               <p className="text-4xl md:text-6xl font-black text-secondary">SCORED</p>
             </div>
          </div>
        </div>
      )}

      {/* STEPS 3, 4, 5: GAME LEVELS */}
      {(step >= 3 && step <= 5) && (
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-black mb-8 opacity-60 uppercase tracking-[0.5em]">Level {step - 2}</h2>
          
          {/* Display */}
          <div className={`min-h-[150px] bg-card-bg rounded-3xl flex items-center justify-center p-8 mb-12 shadow-inner border-4 border-white/20 transition-all ${isSuccess ? 'bg-green-500 text-white scale-105' : ''}`}>
             <h3 className="text-4xl md:text-6xl font-black">
               {sentence.length > 0 ? sentence.join(" ") : "..."}
             </h3>
             {isSuccess && <div className="absolute inset-0 flex items-center justify-center text-[10rem] opacity-20 animate-ping">⚽</div>}
          </div>

          {/* Words */}
          <div className="flex flex-wrap gap-4 justify-center">
             {availableWords.map(word => (
               <button
                 key={word.id}
                 onClick={() => !word.used && handleWordClick(word.id, word.text)}
                 className={`text-3xl md:text-5xl font-bold px-8 py-4 rounded-full bg-white text-black shadow-[0_10px_0_rgba(0,0,0,0.2)] active:translate-y-2 active:shadow-none transition-all hover:scale-105 ${word.used ? 'opacity-0 pointer-events-none' : ''}`}
               >
                 {word.text}
               </button>
             ))}
          </div>

          {isSuccess && (
             <div className="mt-12 text-5xl font-black text-secondary animate-bounce">
                GOAL!!!
             </div>
          )}
        </div>
      )}
    </div>
  );
};