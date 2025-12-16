import React, { useState } from 'react';
import { TeacherCard } from './TeacherCard';
import { Button } from './Button';
import { SoundType } from '../types';

interface Props {
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

const ARGUMENTS = [
  "Argue about the Trophies!",
  "Argue about the Academies (La Masia vs Castillia)!",
  "Argue about the Legends (Messi vs Ronaldo)!",
  "Argue about the Stadiums (Camp Nou vs Bernabeu)!"
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
    }, 2000);

    setTimeout(() => {
      setVarStatus('result');
      playSound(SoundType.Correct);
    }, 4000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-in pb-24">
      <h1 className="text-4xl md:text-5xl text-center font-display mb-4">FINAL WHISTLE: DEBATE 🎙️</h1>
      <h2 className="text-secondary text-xl md:text-2xl font-bold mb-8 text-center">President Perez vs President Laporta</h2>

      <div className="bg-card-bg p-6 md:p-8 rounded-2xl shadow-xl border-l-8 border-accent mb-6">
        <h3 className="text-xl font-bold mb-4">YOUR MISSION</h3>
        <p className="mb-2"><strong className="text-accent">Student A:</strong> Real Madrid President.</p>
        <p className="mb-4"><strong className="text-secondary">Student B:</strong> Barcelona President.</p>
        <hr className="border-text/10 my-4"/>
        <p className="font-bold mb-2">Checklist:</p>
        <ul className="space-y-1">
          <li>✅ Use 3 "Teammate Words" (Famous for, Good at...)</li>
          <li>✅ Use 1 "Tiki-Taka Subject" (The player from...)</li>
        </ul>
      </div>

      <div className="flex flex-col items-center gap-4 mb-8">
        <Button onClick={generateArgument} className="w-full md:w-auto text-lg py-4">
          GENERATE ARGUMENT IDEA
        </Button>
        {argument && (
          <div className="text-xl md:text-2xl font-bold text-secondary text-center animate-bounce-slow mt-4">
            {argument}
          </div>
        )}
      </div>

      {varStatus !== 'hidden' && (
        <div className="bg-black text-white font-mono p-6 rounded-xl border-4 border-gray-800 text-center mb-6 animate-flicker shadow-2xl">
          <h3 className="text-2xl mb-4">🖥️ VAR CHECK</h3>
          {varStatus === 'checking' && <p className="text-xl">DECISION PENDING...</p>}
          {varStatus === 'result' && (
            <div>
               <p className="text-red-500 font-bold mb-2 text-lg">❌ ERROR DETECTED: REPORTED SPEECH!</p>
               <p className="text-green-500 font-bold text-lg">✅ CORRECTION: "HE SAID IT WAS..."</p>
            </div>
          )}
        </div>
      )}

      {isTeacher && (
         <div className="text-center mb-6">
            <button 
              onClick={triggerVar}
              className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors border border-gray-700"
            >
              TEACHER: TRIGGER VAR CHECK
            </button>
         </div>
      )}

      <div className="bg-card-bg p-6 rounded-2xl shadow-xl border-l-8 border-accent">
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