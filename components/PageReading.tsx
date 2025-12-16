import React, { useState } from 'react';
import { TeacherCard } from './TeacherCard';
import { SoundType } from '../types';

interface Props {
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

const QUIZ_QUESTIONS = [
  { id: 1, text: "The first game was played in 1902.", correct: true },
  { id: 2, text: "Fans threw a Pig's Head at Luis Figo.", correct: true },
  { id: 3, text: "The rivalry is only about sport.", correct: false },
  { id: 4, text: "Real Madrid is famous for 'La Masia'.", correct: false },
  { id: 5, text: "Barcelona plays in the Santiago Bernabéu.", correct: false }
];

export const PageReading: React.FC<Props> = ({ isTeacher, playSound }) => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});

  const handleAnswer = (id: number, isTrue: boolean, qCorrect: boolean) => {
    const isCorrect = isTrue === qCorrect;
    setAnswers(prev => ({ ...prev, [id]: isCorrect }));
    playSound(isCorrect ? SoundType.Correct : SoundType.Wrong);
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-slide-in pb-20">
      <h1 className="text-5xl md:text-6xl text-center font-display mb-4 text-shadow-neon">FIRST HALF: READING ⏱️</h1>
      <h2 className="text-secondary text-2xl font-bold mb-8 text-center uppercase tracking-widest">Find Facts in 60 Seconds!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Reading Text - 3D Card */}
        <div className="card-3d bg-card-bg p-8 rounded-3xl border-l-8 border-accent relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl transform rotate-12 group-hover:rotate-45 transition-transform duration-700">📜</div>
          <h3 className="text-2xl font-bold mb-4 border-b-2 border-accent pb-2">HISTORY OF THE RIVALRY</h3>
          <p className="text-lg leading-relaxed text-justify relative z-10">
            Since the first match in <strong>1902</strong>, Real Madrid and FC Barcelona have been enemies. 
            It is a battle of identity. Real Madrid is <span className="bg-secondary/30 px-1 rounded font-bold border-b-2 border-secondary">famous for</span> its 
            "Galacticos" and winning 14 Champions League titles. They play in the Santiago Bernabéu, a massive stadium that holds 85,000 people.
            <br/><br/>
            Barcelona <span className="bg-secondary/30 px-1 rounded font-bold border-b-2 border-secondary">relies on</span> its academy, 
            "La Masia", to produce stars like Messi. The rivalry is intense. In 2002, Barcelona fans were so 
            <span className="bg-secondary/30 px-1 rounded font-bold border-b-2 border-secondary">angry with</span> Luis Figo for moving to Madrid that they threw a 
            <strong className="text-red-500 mx-1 bg-red-100 rounded px-1">pig's head 🐷</strong> at him during a match! Both teams are 
            <span className="bg-secondary/30 px-1 rounded font-bold border-b-2 border-secondary">good at</span> creating drama, but only one can win.
          </p>
        </div>

        {/* Quiz - Penalty Shootout Style */}
        <div className="flex flex-col gap-4 perspective-[1000px]">
          <h3 className="text-2xl font-bold text-center text-white text-shadow-outline mb-2">PENALTY SHOOTOUT</h3>
          {QUIZ_QUESTIONS.map((q, index) => {
            const status = answers[q.id];
            let cardClass = "bg-white text-black";
            if (status === true) cardClass = "bg-green-500 text-white translate-x-4";
            if (status === false) cardClass = "bg-red-500 text-white translate-x-[-1rem] rotate-[-5deg]";

            return (
              <div 
                key={q.id}
                className={`relative p-4 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105 hover:translate-z-4 ${cardClass} flex items-center justify-between`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="font-bold flex-1 mr-4">{index + 1}. {q.text}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAnswer(q.id, true, q.correct)}
                    className="w-10 h-10 rounded-full bg-green-600 text-white font-bold hover:bg-green-400 shadow-md active:scale-90 transition-transform"
                    disabled={status !== undefined}
                  >
                    T
                  </button>
                  <button 
                    onClick={() => handleAnswer(q.id, false, q.correct)}
                    className="w-10 h-10 rounded-full bg-red-600 text-white font-bold hover:bg-red-400 shadow-md active:scale-90 transition-transform"
                    disabled={status !== undefined}
                  >
                    F
                  </button>
                </div>
                {status === true && <div className="absolute -right-2 -top-2 text-2xl animate-pop">⚽</div>}
                {status === false && <div className="absolute -right-2 -top-2 text-2xl animate-pop">🟥</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 bg-card-bg p-6 rounded-2xl shadow-xl border-t-4 border-green-500">
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