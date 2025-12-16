import React, { useState } from 'react';
import { TeacherCard } from './TeacherCard';
import { Button } from './Button';
import { SoundType } from '../types';

interface Props {
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

const ARGUMENTS = [
  "Argue about the Trophies! (14 vs 5 UCL)",
  "Argue about the Academies! (La Masia vs La Fabrica)",
  "Argue about the Legends! (Messi vs Ronaldo)",
  "Argue about the Stadiums! (Camp Nou vs Bernabeu)"
];

export const PageDebate: React.FC<Props> = ({ isTeacher, playSound }) => {
  const [argument, setArgument] = useState<string>("");
  const [varStatus, setVarStatus] = useState<'hidden' | 'checking' | 'result'>('hidden');

  const generateArgument = () => {
    const random = ARGUMENTS[Math.floor(Math.random() * ARGUMENTS.length)];
    setArgument(random);
    playSound(SoundType.Whistle);
  };

  const triggerVar = () => {
    setVarStatus('checking');
    playSound(SoundType.Whistle);
    
    setTimeout(() => {
      playSound(SoundType.Wrong);
    }, 2500);

    setTimeout(() => {
      setVarStatus('result');
      playSound(SoundType.Correct);
    }, 4500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-in pb-24">
      <h1 className="text-5xl md:text-6xl text-center font-display mb-4 text-shadow-neon">FINAL WHISTLE: DEBATE 🎙️</h1>
      <h2 className="text-secondary text-2xl font-bold mb-8 text-center tracking-widest">President Perez vs President Laporta</h2>

      <div className="card-3d bg-card-bg p-8 rounded-3xl border-t-8 border-accent mb-8 shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 text-center underline decoration-wavy decoration-secondary">YOUR MISSION</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
            <p className="mb-2 text-xl">👤 <strong className="text-accent">Student A:</strong></p>
            <p className="text-lg">Real Madrid President.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
            <p className="mb-2 text-xl">👤 <strong className="text-secondary">Student B:</strong></p>
            <p className="text-lg">Barcelona President.</p>
          </div>
        </div>
        <div className="mt-6 bg-accent/10 p-4 rounded-xl">
          <p className="font-bold mb-2 text-accent">CHECKLIST ✅</p>
          <ul className="space-y-2 text-lg">
            <li>• Use 3 "Teammate Words" (Famous for, Good at...)</li>
            <li>• Use 1 "Tiki-Taka Subject" (The player from...)</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mb-12">
        <Button onClick={generateArgument} className="w-full md:w-auto text-xl py-4 px-12 shadow-[0_0_20px_var(--accent)] animate-pulse">
          GENERATE TOPIC
        </Button>
        {argument && (
          <div className="text-2xl md:text-4xl font-display text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary animate-pop text-center drop-shadow-sm">
            {argument}
          </div>
        )}
      </div>

      {varStatus !== 'hidden' && (
        <div className="relative overflow-hidden bg-black text-green-400 font-mono p-8 rounded-xl border-4 border-gray-800 text-center mb-8 shadow-[0_0_50px_rgba(0,255,0,0.2)]">
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
          
          <h3 className="text-3xl mb-6 relative z-10 flex justify-center items-center gap-4">
             <span className="animate-pulse text-red-500">●</span> VAR CHECK <span className="animate-pulse text-red-500">●</span>
          </h3>
          
          {varStatus === 'checking' && (
            <div className="relative z-10">
              <p className="text-2xl animate-glitch">ANALYZING SPEECH PATTERNS...</p>
              <div className="w-full h-2 bg-gray-800 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-[width_2s_ease-in-out_infinite] w-full"></div>
              </div>
            </div>
          )}
          
          {varStatus === 'result' && (
            <div className="relative z-10 animate-pop">
               <div className="border-2 border-red-500 bg-red-900/20 p-4 mb-4 rounded">
                 <p className="text-red-500 font-bold text-xl uppercase tracking-widest">❌ Error Detected</p>
                 <p className="text-white">Reported Speech Violation</p>
               </div>
               <div className="border-2 border-green-500 bg-green-900/20 p-4 rounded">
                 <p className="text-green-500 font-bold text-xl uppercase tracking-widest">✅ Correction</p>
                 <p className="text-white text-2xl">"He said it WAS..."</p>
               </div>
            </div>
          )}
        </div>
      )}

      {isTeacher && (
         <div className="text-center mb-8 perspective-[1000px]">
            <button 
              onClick={triggerVar}
              className="group relative bg-black text-white px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">📺 TEACHER: TRIGGER VAR</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
         </div>
      )}

      <div className="card-3d bg-card-bg p-6 rounded-2xl shadow-xl border-l-8 border-accent">
        <TeacherCard 
          visible={isTeacher}
          title="FEEDBACK"
          items={[
            'Listen for "He said that Real Madrid IS..."',
            'Correct to: "He said that Real Madrid WAS..." (Backshifting).',
            'Award points for passion!'
          ]}
        />
      </div>
    </div>
  );
};