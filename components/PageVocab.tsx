import React, { useState, useEffect } from 'react';
import { TeacherCard } from './TeacherCard';
import { SoundType } from '../types';

interface Props {
  step: number;
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

const PAIRS_1 = [{w: "Famous", p: "FOR"}, {w: "Rely", p: "ON"}, {w: "Good", p: "AT"}];
const PAIRS_2 = [{w: "Angry", p: "WITH"}, {w: "Afraid", p: "OF"}, {w: "Similar", p: "TO"}];

interface CardItem {
  id: string; 
  pairId: number; 
  text: string;
  isSolved: boolean;
  isFlipped: boolean;
  state: 'idle' | 'wrong';
}

export const PageVocab: React.FC<Props> = ({ step, isTeacher, playSound }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    let currentPairs = [];
    if (step === 3) currentPairs = PAIRS_1;
    if (step === 4) currentPairs = PAIRS_2;
    if (step === 5) currentPairs = [...PAIRS_1, ...PAIRS_2];

    if (currentPairs.length > 0) {
      const newCards: CardItem[] = [];
      currentPairs.forEach((pair, idx) => {
        newCards.push({ id: `w-${idx}`, pairId: idx, text: pair.w, isSolved: false, isFlipped: false, state: 'idle' });
        newCards.push({ id: `p-${idx}`, pairId: idx, text: pair.p, isSolved: false, isFlipped: false, state: 'idle' });
      });
      setCards(newCards.sort(() => Math.random() - 0.5));
      setSelectedCardId(null);
    }
  }, [step]);

  const handleCardClick = (id: string) => {
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isSolved || clickedCard.isFlipped) return;

    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));
    
    if (!selectedCardId) {
      setSelectedCardId(id);
    } else {
      const firstCard = cards.find(c => c.id === selectedCardId);
      if (firstCard && firstCard.pairId === clickedCard.pairId) {
        playSound(SoundType.Correct);
        setCards(prev => prev.map(c => (c.id === id || c.id === selectedCardId) ? { ...c, isSolved: true } : c));
        setSelectedCardId(null);
      } else {
        playSound(SoundType.Wrong);
        setTimeout(() => {
          setCards(prev => prev.map(c => (c.id === id || c.id === selectedCardId) ? { ...c, isFlipped: false } : c));
          setSelectedCardId(null);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center animate-slide-in min-h-[60vh] text-center">
      
      {/* STEP 1: INTRO */}
      {step === 1 && (
        <>
           <h1 className="text-7xl md:text-9xl font-display mb-8 text-shadow-neon">SECOND HALF</h1>
           <h2 className="text-4xl md:text-6xl font-black text-accent">TEAMMATES</h2>
           <p className="text-2xl mt-8 max-w-2xl font-bold">"Some words are married. They never play alone."</p>
        </>
      )}

      {/* STEP 2: RED CARD RULE */}
      {step === 2 && (
        <div className="card-3d bg-red-600 p-12 rounded-[3rem] text-white shadow-[0_0_60px_red] animate-pulse">
           <div className="text-[8rem] mb-4">🟥</div>
           <h2 className="text-6xl md:text-8xl font-black mb-8">RED CARD!</h2>
           <p className="text-4xl md:text-5xl font-bold mb-4 line-through opacity-50">"Good IN football"</p>
           <p className="text-5xl md:text-7xl font-black bg-white text-red-600 px-8 py-4 rounded-xl transform rotate-[-2deg]">"Good AT football"</p>
        </div>
      )}

      {/* STEPS 3, 4, 5: MEMORY GAME */}
      {(step >= 3 && step <= 5) && (
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-black mb-12 opacity-60">MATCH THE PAIRS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {cards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`h-40 cursor-pointer perspective-[1000px] group`}
              >
                <div className={`relative w-full h-full transition-all duration-500 transform preserve-3d ${card.isFlipped || card.isSolved ? 'rotate-y-180' : ''}`}>
                  {/* Back */}
                  <div className="absolute inset-0 bg-white/10 border-4 border-white/30 rounded-3xl flex items-center justify-center backface-hidden group-hover:bg-white/20">
                    <span className="text-5xl opacity-50">⚽</span>
                  </div>
                  {/* Front */}
                  <div className={`absolute inset-0 rounded-3xl flex items-center justify-center backface-hidden rotate-y-180 ${card.isSolved ? 'bg-green-500 text-white' : 'bg-white text-black'}`}>
                    <span className="text-3xl md:text-4xl font-black">{card.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};