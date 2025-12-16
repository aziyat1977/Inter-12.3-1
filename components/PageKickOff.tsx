import React from 'react';
import { Team } from '../types';
import { TeacherCard } from './TeacherCard';

interface Props {
  onSetTeam: (team: Team) => void;
  isTeacher: boolean;
}

export const PageKickOff: React.FC<Props> = ({ onSetTeam, isTeacher }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center animate-slide-in min-h-[80vh]">
      <h1 className="text-5xl md:text-8xl text-center font-display mb-8 leading-none drop-shadow-2xl transform translate-z-10">
        THE KICK OFF <span className="inline-block animate-bounce-slow text-accent">⚽</span>
      </h1>
      <h2 className="text-secondary text-2xl md:text-4xl font-bold mb-16 text-center tracking-widest uppercase drop-shadow-lg">
        Choose Your Destiny
      </h2>

      <div className="flex flex-col md:flex-row gap-12 md:gap-32 items-center justify-center w-full mb-16 preserve-3d">
        {/* Madrid Card */}
        <div 
          onClick={() => onSetTeam(Team.Madrid)}
          className="group relative w-64 h-80 cursor-pointer preserve-3d transition-transform duration-500 hover:scale-110"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white transform transition-transform group-hover:rotate-y-12 group-hover:-rotate-x-12">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center transform translate-z-[50px] group-hover:translate-z-[80px] transition-transform duration-500">
            <div className="text-9xl mb-6 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] group-hover:animate-float">👑</div>
            <h3 className="text-3xl font-display text-gray-800 bg-white/80 px-4 py-1 rounded shadow-lg">REAL MADRID</h3>
          </div>
        </div>

        <div className="text-7xl font-display text-secondary animate-pulse-slow relative z-10 transform hover:scale-150 transition-transform">
          <span className="text-shadow-neon">VS</span>
        </div>

        {/* Barca Card */}
        <div 
          onClick={() => onSetTeam(Team.Barca)}
          className="group relative w-64 h-80 cursor-pointer preserve-3d transition-transform duration-500 hover:scale-110"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#004D98] to-[#DB0030] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-[#EDBB00] transform transition-transform group-hover:-rotate-y-12 group-hover:rotate-x-12">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center transform translate-z-[50px] group-hover:translate-z-[80px] transition-transform duration-500">
            <div className="text-9xl mb-6 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] group-hover:animate-float-delayed">🦁</div>
            <h3 className="text-3xl font-display text-white bg-black/30 px-4 py-1 rounded shadow-lg backdrop-blur-sm">BARCELONA</h3>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-card-bg/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 transform hover:translate-z-10 transition-transform">
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
           <p className="text-center text-lg italic opacity-80 animate-pulse text-shadow-outline">Select a team card to enter the stadium!</p>
        )}
      </div>
    </div>
  );
};