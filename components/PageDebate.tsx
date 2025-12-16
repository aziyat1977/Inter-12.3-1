import React, { useState } from 'react';
import { TeacherCard } from './TeacherCard';
import { Button } from './Button';
import { SoundType } from '../types';

interface Props {
  step: number;
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

const TOPICS = [
  "Who has better trophies?",
  "Messi or Ronaldo?",
  "Camp Nou or Bernabeu?",
  "La Masia or La Fabrica?"
];

export const PageDebate: React.FC<Props> = ({ step, isTeacher, playSound }) => {
  const [topic, setTopic] = useState("");
  const [varState, setVarState] = useState(0); // 0: idle, 1: checking, 2: result

  const rollTopic = () => {
    setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);
    playSound(SoundType.Whistle);
  };

  const runVar = () => {
    setVarState(1);
    playSound(SoundType.Whistle);
    setTimeout(() => {
       setVarState(2);
       playSound(SoundType.Wrong);
    }, 3000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center animate-slide-in min-h-[60vh] text-center">
      
      {/* STEP 1: INTRO */}
      {step === 1 && (
        <>
          <h1 className="text-7xl md:text-9xl font-display mb-8 text-shadow-neon">FINAL WHISTLE</h1>
          <div className="text-[8rem] my-4">🎙️</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase">The Presidential Debate</h2>
        </>
      )}

      {/* STEP 2: ROLES */}
      {step === 2 && (
        <div className="flex flex-col md:flex-row gap-12 w-full max-w-6xl">
           <div className="flex-1 card-3d bg-white text-black p-12 rounded-[3rem]">
              <div className="text-6xl mb-4">👤 A</div>
              <h3 className="text-4xl font-black mb-4">PEREZ</h3>
              <p className="text-2xl opacity-70">"Real Madrid is the king of Europe!"</p>
           </div>
           <div className="flex-1 card-3d bg-black text-white p-12 rounded-[3rem]">
              <div className="text-6xl mb-4">👤 B</div>
              <h3 className="text-4xl font-black mb-4">LAPORTA</h3>
              <p className="text-2xl opacity-70">"Barcelona is more than a club!"</p>
           </div>
        </div>
      )}

      {/* STEP 3: TOPIC */}
      {step === 3 && (
        <div className="w-full max-w-4xl">
           <h2 className="text-4xl md:text-6xl font-black mb-12">YOUR TOPIC</h2>
           <div className="card-3d bg-card-bg p-12 rounded-[3rem] border-4 border-accent min-h-[300px] flex items-center justify-center flex-col">
              {topic ? (
                <h3 className="text-5xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary animate-pop">{topic}</h3>
              ) : (
                <p className="text-3xl opacity-50">Ready to argue?</p>
              )}
              <Button onClick={rollTopic} className="mt-12 text-2xl py-6 px-12 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-105">
                GENERATE
              </Button>
           </div>
        </div>
      )}

      {/* STEP 4: VAR CHECK */}
      {step === 4 && (
        <div className="w-full max-w-4xl">
           <div className={`transition-all duration-500 bg-black border-4 border-gray-800 p-12 rounded-[3rem] relative overflow-hidden ${varState === 1 ? 'animate-pulse' : ''}`}>
              <h2 className="text-5xl md:text-7xl font-mono text-green-500 mb-8 z-10 relative">VAR CHECK</h2>
              
              {varState === 0 && (
                <Button onClick={runVar} className="text-2xl py-6 px-12 bg-white text-black z-10 relative">
                  CHECK LANGUAGE
                </Button>
              )}

              {varState === 1 && (
                <div className="text-4xl font-mono text-white animate-glitch z-10 relative">
                   SCANNING SPEECH...
                </div>
              )}

              {varState === 2 && (
                <div className="z-10 relative animate-pop">
                   <div className="text-red-500 text-6xl font-black mb-4">❌ ERROR</div>
                   <p className="text-3xl text-white">He said Madrid <span className="underline decoration-red-500">IS</span> the best...</p>
                   <p className="text-green-500 text-4xl font-black mt-8">✅ CORRECTION</p>
                   <p className="text-3xl text-white">He said Madrid <span className="underline decoration-green-500">WAS</span> the best...</p>
                </div>
              )}
              
              {/* Scanlines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,6px_100%] pointer-events-none opacity-20"></div>
           </div>
        </div>
      )}

      {/* STEP 5: FULL TIME */}
      {step === 5 && (
        <div className="text-center animate-pop">
           <div className="text-[10rem] mb-8">🏆</div>
           <h1 className="text-8xl md:text-[10rem] font-display text-secondary text-shadow-neon">FULL TIME</h1>
           <p className="text-4xl font-bold mt-8">Great job, Champion!</p>
        </div>
      )}

    </div>
  );
};