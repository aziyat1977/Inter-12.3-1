import React from 'react';
import { Team } from '../types';
import { TeacherCard } from './TeacherCard';

interface Props {
  onSetTeam: (team: Team) => void;
  isTeacher: boolean;
}

export const PageKickOff: React.FC<Props> = ({ onSetTeam, isTeacher }) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center animate-slide-in">
      <h1 className="text-4xl md:text-6xl text-center font-display mb-4 leading-none">
        THE KICK OFF <span className="text-5xl align-middle">⚽</span>
      </h1>
      <h2 className="text-secondary text-2xl md:text-3xl font-bold mb-12 text-center">
        Choose Your Allegiance
      </h2>

      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center w-full mb-12">
        <div 
          onClick={() => onSetTeam(Team.Madrid)}
          className="group text-center cursor-pointer transition-transform hover:scale-110"
        >
          <div className="text-8xl mb-4 drop-shadow-xl transition-transform group-hover:rotate-12">👑</div>
          <h3 className="text-2xl font-bold bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">REAL MADRID</h3>
        </div>

        <div className="text-6xl font-display text-secondary animate-pulse-slow">VS</div>

        <div 
          onClick={() => onSetTeam(Team.Barca)}
          className="group text-center cursor-pointer transition-transform hover:scale-110"
        >
          <div className="text-8xl mb-4 drop-shadow-xl transition-transform group-hover:-rotate-12">🦁</div>
          <h3 className="text-2xl font-bold bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">BARCELONA</h3>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-card-bg p-8 rounded-2xl shadow-xl border-l-8 border-accent">
        <TeacherCard 
          visible={isTeacher}
          title="LEAD-IN (0-5 min)"
          items={[
            'Action: Do the "Siuuu" jump vs Messi "Ear" pose.',
            'Ask: "Who plays for Madrid? Who for Barca?"',
            'Concept: Define "RIVALRY". Does your country have one?'
          ]}
        />
        {!isTeacher && (
           <p className="text-center text-lg italic opacity-80">Select a team logo to begin the match!</p>
        )}
      </div>
    </div>
  );
};