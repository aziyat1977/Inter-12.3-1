import React, { useState } from 'react';
import { TeacherCard } from './TeacherCard';
import { SoundType } from '../types';

interface Props {
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

export const PageReading: React.FC<Props> = ({ isTeacher, playSound }) => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});

  const handleAnswer = (id: number, correct: boolean) => {
    setAnswers(prev => ({ ...prev, [id]: correct }));
    playSound(correct ? SoundType.Correct : SoundType.Wrong);
  };

  const getBtnStyle = (id: number) => {
    const status = answers[id];
    if (status === true) return "bg-green-600 text-white border-green-600";
    if (status === false) return "bg-red-500 text-white border-red-500 animate-[shake_0.5s]";
    return "bg-transparent text-text border-accent hover:bg-accent hover:text-white";
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-in">
      <h1 className="text-4xl md:text-5xl text-center font-display mb-4">FIRST HALF: READING ⏱️</h1>
      <h2 className="text-secondary text-xl md:text-2xl font-bold mb-8 text-center">Find 3 Facts in 60 Seconds!</h2>

      <div className="bg-card-bg p-6 md:p-8 rounded-2xl shadow-xl border-l-8 border-accent mb-6">
        <h3 className="text-xl font-bold mb-4 border-b pb-2 border-text/10">📜 HISTORY OF THE RIVALRY</h3>
        <p className="text-lg leading-relaxed text-justify">
          Since the first match in <strong>1902</strong>, Real Madrid and FC Barcelona have been enemies. 
          It is a battle of identity. Real Madrid is <span className="bg-secondary/30 px-1 rounded font-bold">famous for</span> its 
          "Galacticos" and winning 14 Champions League titles. They play in the Santiago Bernabéu, a massive stadium that holds 85,000 people.
          <br/><br/>
          Barcelona <span className="bg-secondary/30 px-1 rounded font-bold">relies on</span> its academy, 
          "La Masia", to produce stars like Messi. The rivalry is intense. In 2002, Barcelona fans were so 
          <span className="bg-secondary/30 px-1 rounded font-bold">angry with</span> Luis Figo for moving to Madrid that they threw a 
          <strong className="text-red-500 mx-1">pig's head 🐷</strong> at him during a match! Both teams are 
          <span className="bg-secondary/30 px-1 rounded font-bold">good at</span> creating drama, but only one can win.
        </p>
      </div>

      <div className="bg-card-bg p-6 rounded-2xl shadow-xl border-l-8 border-accent mb-6">
        <h3 className="text-xl font-bold mb-4">QUICK QUIZ</h3>
        <div className="flex flex-col gap-3">
          <button 
            className={`w-full p-3 rounded-lg border-2 font-bold text-left transition-all ${getBtnStyle(1)}`}
            onClick={() => handleAnswer(1, true)}
          >
            1. The first game was played in 1902. {answers[1] === true && "✅"} {answers[1] === false && "❌"}
          </button>
          <button 
            className={`w-full p-3 rounded-lg border-2 font-bold text-left transition-all ${getBtnStyle(2)}`}
            onClick={() => handleAnswer(2, true)}
          >
            2. Fans threw a Pig's Head at Luis Figo. {answers[2] === true && "✅"} {answers[2] === false && "❌"}
          </button>
          <button 
            className={`w-full p-3 rounded-lg border-2 font-bold text-left transition-all ${getBtnStyle(3)}`}
            onClick={() => handleAnswer(3, false)}
          >
            3. The rivalry is only about sport. {answers[3] === true && "✅"} {answers[3] === false && "❌"}
          </button>
        </div>
      </div>

      <div className="bg-card-bg p-6 rounded-2xl shadow-xl border-l-8 border-accent">
        <TeacherCard 
          visible={isTeacher}
          title="READING (5-15 min)"
          items={[
            'Set a timer for 60 seconds.',
            'Ask CCQs: "Does it rely only on football?" (No, politics/history).',
            'Focus on bold phrases (collocations).'
          ]}
        />
      </div>
    </div>
  );
};