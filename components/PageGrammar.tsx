import React, { useState, useEffect } from 'react';
import { TeacherCard } from './TeacherCard';
import { Button } from './Button';
import { SoundType } from '../types';

interface Props {
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

const CORRECT_SEQUENCE = ["The", "young", "player", "from", "Brazil", "SCORED"];

export const PageGrammar: React.FC<Props> = ({ isTeacher, playSound }) => {
  const [sentence, setSentence] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<Array<{id: number, text: string, used: boolean}>>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetGame = () => {
    const words = ["SCORED", "Brazil", "from", "player", "young", "The"];
    const shuffled = words
      .map((text, i) => ({ id: i, text, used: false }))
      .sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSentence([]);
    setIsSuccess(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const handleWordClick = (id: number, text: string) => {
    if (isSuccess) return;
    
    setAvailableWords(prev => prev.map(w => w.id === id ? { ...w, used: true } : w));
    const newSentence = [...sentence, text];
    setSentence(newSentence);
    playSound(SoundType.Whistle);

    if (newSentence.length === CORRECT_SEQUENCE.length) {
      if (newSentence[newSentence.length - 1] === "SCORED") {
        setIsSuccess(true);
        playSound(SoundType.Correct);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-in">
      <h1 className="text-4xl md:text-5xl text-center font-display mb-4">HALFTIME: TIKI-TAKA 🧠</h1>
      <h2 className="text-secondary text-xl md:text-2xl font-bold mb-4 text-center">Build the "Champions League" Sentence</h2>
      <p className="text-center mb-8 opacity-80">Don't be a Sunday League player. Build the subject BEFORE the verb!</p>

      <div className="bg-card-bg p-6 md:p-8 rounded-2xl shadow-xl border-l-8 border-accent mb-6">
        <div className="relative bg-green-600 border-4 border-white p-8 rounded-lg w-full text-center overflow-hidden mb-6 min-h-[150px] flex items-center justify-center">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/50 transform -translate-y-1/2"></div>
          <div className="absolute w-24 h-24 border-2 border-white/50 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className={`relative z-10 text-2xl md:text-3xl font-bold px-6 py-4 rounded-xl transition-colors duration-500 ${isSuccess ? 'bg-white text-green-700 shadow-2xl scale-110' : 'bg-black/40 text-white'}`}>
            {sentence.length > 0 ? sentence.join(" ") : "..."}
            {isSuccess && <span className="block text-sm mt-2">GOAL! ⚽</span>}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap justify-center mb-8">
          {availableWords.map((word) => (
            <button
              key={word.id}
              onClick={() => !word.used && handleWordClick(word.id, word.text)}
              disabled={word.used}
              className={`px-4 py-2 bg-white text-black font-bold rounded-full shadow-[0_4px_0_#ccc] active:shadow-none active:translate-y-1 transition-all ${
                word.used ? 'opacity-0 pointer-events-none' : 'hover:scale-105'
              }`}
            >
              {word.text}
            </button>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={resetGame} variant="outline">Reset Play</Button>
        </div>
      </div>

      <div className="bg-card-bg p-6 rounded-2xl shadow-xl border-l-8 border-accent mb-6">
        <h3 className="text-xl font-bold mb-2">THE RULE:</h3>
        <p className="mb-1">❌ <strong>Sunday League:</strong> [Messi] scored.</p>
        <p className="mb-2">🏆 <strong>Champions League:</strong> [The tiny magician from Argentina] scored.</p>
        <p className="italic text-sm opacity-70">Everything before the verb is the SUBJECT.</p>
      </div>

      <div className="bg-card-bg p-6 rounded-2xl shadow-xl border-l-8 border-accent">
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