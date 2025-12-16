import React, { useState, useEffect } from 'react';
import { TeacherCard } from './TeacherCard';
import { Button } from './Button';
import { SoundType } from '../types';

interface Props {
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

const LEVELS = [
  { id: 1, text: "The young player from Brazil SCORED", words: ["SCORED", "Brazil", "from", "player", "young", "The"] },
  { id: 2, text: "The loud fans in the stadium CHEERED", words: ["CHEERED", "stadium", "the", "in", "fans", "loud", "The"] },
  { id: 3, text: "A dangerous striker with great speed ATTACKED", words: ["ATTACKED", "speed", "great", "with", "striker", "dangerous", "A"] }
];

export const PageGrammar: React.FC<Props> = ({ isTeacher, playSound }) => {
  const [level, setLevel] = useState(0);
  const [sentence, setSentence] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<Array<{id: number, text: string, used: boolean}>>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const initLevel = (lvlIdx: number) => {
    const target = LEVELS[lvlIdx];
    const shuffled = target.words
      .map((text, i) => ({ id: i, text, used: false }))
      .sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSentence([]);
    setIsSuccess(false);
  };

  useEffect(() => {
    initLevel(level);
  }, [level]);

  const handleWordClick = (id: number, text: string) => {
    if (isSuccess) return;
    
    setAvailableWords(prev => prev.map(w => w.id === id ? { ...w, used: true } : w));
    const newSentence = [...sentence, text];
    setSentence(newSentence);
    playSound(SoundType.Whistle);

    const targetSentence = LEVELS[level].text.split(" ");
    if (newSentence.length === targetSentence.length) {
      // Simple check of last word (verb) logic or full match
      // For this specific design, we check if the last word is the uppercase VERB
      const lastWord = newSentence[newSentence.length - 1];
      if (lastWord === lastWord.toUpperCase() && lastWord.length > 3) {
        setIsSuccess(true);
        playSound(SoundType.Correct);
      }
    }
  };

  const nextLevel = () => {
    if (level < LEVELS.length - 1) {
      setLevel(level + 1);
    } else {
      setLevel(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-in">
      <h1 className="text-5xl md:text-6xl text-center font-display mb-4 text-shadow-neon">HALFTIME: TIKI-TAKA 🧠</h1>
      <h2 className="text-secondary text-2xl font-bold mb-4 text-center tracking-widest">Build the "Champions League" Sentence</h2>
      
      <div className="flex justify-center mb-6">
        <div className="bg-black/20 rounded-full p-1 flex gap-2">
           {LEVELS.map((l, idx) => (
             <button 
              key={l.id} 
              onClick={() => setLevel(idx)}
              className={`w-10 h-10 rounded-full font-bold transition-all ${level === idx ? 'bg-accent text-white scale-110 shadow-neon' : 'bg-white/10 text-white hover:bg-white/30'}`}
             >
               {l.id}
             </button>
           ))}
        </div>
      </div>

      <div className="card-3d bg-green-600 border-8 border-white/20 p-8 rounded-3xl shadow-2xl mb-8 relative overflow-hidden">
        {/* Field Markings */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 border-4 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Display Area */}
        <div className={`relative z-10 min-h-[120px] flex items-center justify-center mb-8 transition-all duration-500 ${isSuccess ? 'scale-110' : ''}`}>
          <div className="bg-black/40 backdrop-blur-md px-8 py-6 rounded-2xl border-2 border-white/30 shadow-lg text-center">
             <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
               {sentence.length > 0 ? sentence.join(" ") : <span className="opacity-50 italic">Tap the ball-words to pass...</span>}
             </span>
             {isSuccess && (
               <div className="absolute -top-6 -right-6 bg-yellow-400 text-black font-display text-4xl px-4 py-2 rotate-12 shadow-xl animate-pop">
                 GOAL!
               </div>
             )}
          </div>
        </div>

        {/* Word Balls */}
        <div className="relative z-10 flex gap-4 flex-wrap justify-center perspective-[1000px]">
          {availableWords.map((word) => (
            <button
              key={word.id}
              onClick={() => !word.used && handleWordClick(word.id, word.text)}
              disabled={word.used}
              className={`
                w-auto min-w-[80px] px-6 py-3 rounded-full font-bold text-lg
                bg-gradient-to-b from-white to-gray-200 text-gray-800
                shadow-[0_6px_0_#bbb,0_10px_10px_rgba(0,0,0,0.3)]
                transform transition-all duration-200
                active:translate-y-2 active:shadow-none
                hover:-translate-y-1 hover:brightness-110
                ${word.used ? 'opacity-0 scale-0 pointer-events-none' : 'scale-100'}
              `}
            >
              {word.text}
            </button>
          ))}
        </div>
        
        {isSuccess && (
          <div className="text-center mt-8">
            <Button onClick={nextLevel} className="animate-bounce shadow-xl bg-white text-green-700 hover:bg-gray-100">
              NEXT PLAY <i className="fas fa-arrow-right"></i>
            </Button>
          </div>
        )}

        <div className="absolute bottom-4 right-4">
           <Button onClick={() => initLevel(level)} variant="ghost" className="text-white/50 hover:text-white text-sm">
             <i className="fas fa-undo"></i> Reset
           </Button>
        </div>
      </div>

      <div className="card-3d bg-card-bg p-6 rounded-2xl shadow-xl border-l-8 border-accent">
        <h3 className="text-xl font-bold mb-2 text-accent">THE TACTIC BOARD:</h3>
        <p className="mb-2 text-lg">❌ <strong>Sunday League:</strong> [Messi] scored.</p>
        <p className="mb-2 text-lg">🏆 <strong>Champions League:</strong> [The tiny magician from Argentina] scored.</p>
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-text to-transparent opacity-20 my-4"></div>
        <TeacherCard 
          visible={isTeacher}
          title="GRAMMAR (15-25 min)"
          items={[
            'Draw the diagram: [Big Subject] + [Verb].',
            'Drill the concept: Add adjectives and relative clauses to expand the subject.'
          ]}
        />
      </div>
    </div>
  );
};