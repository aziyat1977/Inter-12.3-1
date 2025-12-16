import React, { useState } from 'react';
import { TeacherCard } from './TeacherCard';
import { SoundType } from '../types';

interface Props {
  step: number;
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

export const PageReading: React.FC<Props> = ({ step, isTeacher, playSound }) => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});

  const handleAnswer = (id: number, isTrue: boolean, qCorrect: boolean) => {
    const isCorrect = isTrue === qCorrect;
    setAnswers(prev => ({ ...prev, [id]: isCorrect }));
    playSound(isCorrect ? SoundType.Correct : SoundType.Wrong);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center animate-slide-in min-h-[60vh] text-center">
      
      {/* STEP 1: INTRO */}
      {step === 1 && (
        <>
          <h1 className="text-7xl md:text-9xl font-display mb-8 text-shadow-neon">FIRST HALF</h1>
          <div className="text-[10rem] animate-spin-slow my-8">⏱️</div>
          <h2 className="text-4xl md:text-6xl font-black bg-white/10 px-8 py-4 rounded-2xl backdrop-blur-md">
            READING CHALLENGE
          </h2>
        </>
      )}

      {/* STEP 2: READING PART 1 */}
      {step === 2 && (
        <div className="max-w-4xl card-3d bg-card-bg p-12 rounded-[3rem] border-t-8 border-accent">
           <h2 className="text-3xl md:text-5xl font-black mb-8 text-accent">HISTORY (1902)</h2>
           <p className="text-3xl md:text-5xl leading-snug font-bold">
             Since <span className="text-secondary scale-110 inline-block">1902</span>, Real Madrid and Barcelona have been enemies.
           </p>
           <p className="text-2xl md:text-4xl mt-8 opacity-80">
             It is a battle of identity.
           </p>
        </div>
      )}

      {/* STEP 3: READING PART 2 */}
      {step === 3 && (
        <div className="max-w-4xl card-3d bg-card-bg p-12 rounded-[3rem] border-t-8 border-red-500">
           <h2 className="text-3xl md:text-5xl font-black mb-8 text-red-500">THE PIG'S HEAD 🐷</h2>
           <p className="text-3xl md:text-5xl leading-snug font-bold">
             Fans were <span className="text-accent underline">angry with</span> Luis Figo.
           </p>
           <p className="text-2xl md:text-4xl mt-8">
             They threw a <span className="bg-red-500 text-white px-4 rounded">pig's head</span> at him!
           </p>
        </div>
      )}

      {/* STEP 4: QUESTION 1 */}
      {step === 4 && (
        <div className="w-full max-w-4xl">
           <h2 className="text-4xl md:text-6xl font-black mb-12">PENALTY SHOT #1</h2>
           <div className="card-3d bg-card-bg p-10 rounded-[2rem] shadow-2xl">
              <p className="text-3xl md:text-5xl font-bold mb-12">
                "The first game was played in 1902."
              </p>
              <div className="flex justify-center gap-8">
                <button 
                  onClick={() => handleAnswer(1, true, true)}
                  className={`px-12 py-6 text-4xl font-black rounded-2xl transition-all transform hover:scale-110 ${answers[1] === true ? 'bg-green-500 text-white' : 'bg-white text-green-600 border-4 border-green-600'}`}
                >
                  TRUE
                </button>
                <button 
                  onClick={() => handleAnswer(1, false, true)}
                  className={`px-12 py-6 text-4xl font-black rounded-2xl transition-all transform hover:scale-110 ${answers[1] === false ? 'bg-red-500 text-white' : 'bg-white text-red-600 border-4 border-red-600'}`}
                >
                  FALSE
                </button>
              </div>
           </div>
        </div>
      )}

      {/* STEP 5: QUESTION 2 */}
      {step === 5 && (
         <div className="w-full max-w-4xl">
           <h2 className="text-4xl md:text-6xl font-black mb-12">PENALTY SHOT #2</h2>
           <div className="card-3d bg-card-bg p-10 rounded-[2rem] shadow-2xl">
              <p className="text-3xl md:text-5xl font-bold mb-12">
                "Fans threw a chicken at Luis Figo."
              </p>
              <div className="flex justify-center gap-8">
                <button 
                  onClick={() => handleAnswer(2, true, false)}
                  className={`px-12 py-6 text-4xl font-black rounded-2xl transition-all transform hover:scale-110 ${answers[2] === false ? 'bg-green-500 text-white' : 'bg-white text-green-600 border-4 border-green-600'}`}
                >
                  TRUE
                </button>
                <button 
                  onClick={() => handleAnswer(2, false, false)}
                  className={`px-12 py-6 text-4xl font-black rounded-2xl transition-all transform hover:scale-110 ${answers[2] === true ? 'bg-red-500 text-white' : 'bg-white text-red-600 border-4 border-red-600'}`}
                >
                  FALSE
                </button>
              </div>
           </div>
           {answers[2] === true && <div className="text-4xl font-black text-green-500 mt-8 animate-bounce">CORRECT! IT WAS A PIG! 🐷</div>}
        </div>
      )}
    </div>
  );
};