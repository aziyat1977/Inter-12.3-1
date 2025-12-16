import React from 'react';
import { Team } from '../types';
import { TeacherCard } from './TeacherCard';

interface Props {
  step: number;
  onSetTeam: (team: Team) => void;
  isTeacher: boolean;
  team: Team;
}

export const PageKickOff: React.FC<Props> = ({ step, onSetTeam, isTeacher, team }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center animate-slide-in min-h-[60vh]">
      
      {/* STEP 1: TITLE SCREEN */}
      {step === 1 && (
        <div className="text-center transform hover:scale-105 transition-transform duration-500">
          <h1 className="text-8xl md:text-[10rem] font-display leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] text-transparent bg-clip-text bg-gradient-to-b from-text to-gray-500">
            EL<br/><span className="text-accent drop-shadow-[0_0_30px_var(--accent)]">CLÁSICO</span>
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-secondary mt-8 tracking-[1em] animate-pulse">
            ENGLISH
          </p>
        </div>
      )}

      {/* STEP 2: CHOOSE TEAM */}
      {step === 2 && (
        <div className="flex flex-col items-center w-full">
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-center text-shadow-outline">CHOOSE YOUR SIDE</h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-center justify-center w-full preserve-3d">
            <div onClick={() => onSetTeam(Team.Madrid)} className="group cursor-pointer transform transition-all hover:scale-110">
              <div className="text-[8rem] md:text-[10rem] filter drop-shadow-2xl group-hover:rotate-12 transition-transform">👑</div>
              <div className="text-2xl font-black text-center mt-4 bg-white/20 rounded-lg py-2 backdrop-blur-md">MADRID</div>
            </div>
            <div className="text-6xl font-black text-secondary animate-bounce">VS</div>
            <div onClick={() => onSetTeam(Team.Barca)} className="group cursor-pointer transform transition-all hover:scale-110">
              <div className="text-[8rem] md:text-[10rem] filter drop-shadow-2xl group-hover:-rotate-12 transition-transform">🦁</div>
              <div className="text-2xl font-black text-center mt-4 bg-white/20 rounded-lg py-2 backdrop-blur-md">BARCA</div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: WELCOME */}
      {step === 3 && (
        <div className="text-center animate-pop">
           <div className="text-[8rem] mb-4">{team === Team.Madrid ? '👑' : '🦁'}</div>
           <h2 className="text-5xl md:text-7xl font-black mb-4">WELCOME TO</h2>
           <h1 className="text-6xl md:text-8xl font-display text-accent mb-8">
             {team === Team.Madrid ? 'THE BERNABEU' : 'CAMP NOU'}
           </h1>
           <p className="text-2xl md:text-3xl font-bold opacity-80 max-w-2xl mx-auto">
             "Where legends are made and dreams come true."
           </p>
        </div>
      )}

      {/* STEP 4: THE MISSION */}
      {step === 4 && (
        <div className="text-center max-w-4xl card-3d bg-card-bg p-12 rounded-[3rem] border-4 border-accent">
          <h2 className="text-4xl md:text-6xl font-black mb-8 underline decoration-secondary decoration-wavy">THE MISSION</h2>
          <p className="text-2xl md:text-4xl font-bold leading-relaxed mb-8">
            Today is not just a game.<br/>
            It is a battle of <span className="text-accent text-5xl">WORDS</span>.
          </p>
          <div className="text-xl md:text-2xl bg-black/5 p-6 rounded-xl">
             🏆 Goal: Defeat the rival president in the final debate.
          </div>
        </div>
      )}

      {/* STEP 5: WARM UP */}
      {step === 5 && (
        <div className="w-full max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-12 text-secondary">WARM UP</h2>
          <div className="card-3d bg-card-bg p-8 rounded-3xl border-l-8 border-green-500 shadow-2xl">
             <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl">🏃</span>
                <h3 className="text-3xl font-bold">TEACHER INSTRUCTIONS</h3>
             </div>
             <ul className="space-y-6 text-2xl font-bold opacity-80">
                <li>1. Ask: "Who is the best player ever?"</li>
                <li>2. Teach action: "SIUUU" vs "Messi Ears"</li>
                <li>3. Define: "Rivalry" (Uzbekistan vs ?)</li>
             </ul>
             <TeacherCard visible={isTeacher} title="Guide" items={["Check understanding of 'Rivalry'", "Elicit 'Enemy', 'Competition'"]} />
          </div>
        </div>
      )}
    </div>
  );
};