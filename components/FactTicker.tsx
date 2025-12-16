import React, { useEffect, useState } from 'react';
import { Team } from '../types';

interface FactTickerProps {
  team: Team;
}

const FACTS = {
  [Team.Madrid]: [
    "🏆 Real Madrid has 14 UCL titles!",
    "⚽ Founded in 1902.",
    "🏟️ Bernabeu holds 81,000 fans."
  ],
  [Team.Barca]: [
    "🏆 Messi scored 672 goals!",
    "🏟️ Camp Nou holds 99,000 fans.",
    "⚽ La Masia is the best academy."
  ]
};

export const FactTicker: React.FC<FactTickerProps> = ({ team }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % FACTS[team].length);
    }, 4000);
    return () => clearInterval(interval);
  }, [team]);

  return (
    <div className="fixed bottom-20 right-5 bg-secondary text-black px-5 py-2 rounded-full font-bold shadow-lg animate-bounce-slow z-50 max-w-[300px] text-center text-sm md:text-base border-2 border-black/10">
      {FACTS[team][index]}
    </div>
  );
};