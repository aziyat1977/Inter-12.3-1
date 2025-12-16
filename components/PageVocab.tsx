import React, { useState, useEffect } from 'react';
import { TeacherCard } from './TeacherCard';
import { SoundType } from '../types';

interface Props {
  isTeacher: boolean;
  playSound: (type: SoundType) => void;
}

const PAIRS = [
  {w: "Famous", p: "FOR"},
  {w: "Rely", p: "ON"},
  {w: "Good", p: "AT"},
  {w: "Afraid", p: "OF"},
  {w: "Angry", p: "WITH"},
  {w: "Succeed", p: "IN"},
  {w: "Similar", p: "TO"},
  {w: "Different", p: "FROM"},
  {w: "Interested", p: "IN"}
];

interface CardItem {
  id: string; 
  pairId: number; 
  text: string;
  isSolved: boolean;
  isFlipped: boolean;
  state: 'idle' | 'wrong';
}

export const PageVocab: React.FC<Props> = ({ isTeacher, playSound }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const newCards: CardItem[] = [];
    PAIRS.forEach((pair, idx) => {
      newCards.push({ id: `w-${idx}`, pairId: idx, text: pair.w, isSolved: false, isFlipped: false, state: 'idle' });
      newCards.push({ id: `p-${idx}`, pairId: idx, text: pair.p, isSolved: false, isFlipped: false, state: 'idle' });
    });
    setCards(newCards.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (id: string) => {
    if (isProcessing) return;
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isSolved || clickedCard.isFlipped) return;

    // Flip the clicked card
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));
    playSound(SoundType.Whistle);

    if (!selectedCardId) {
      setSelectedCardId(id);
      return;
    }

    // Check Match
    const firstCard = cards.find(c => c.id === selectedCardId);
    if (!firstCard) return;

    setIsProcessing(true);

    if (firstCard.pairId === clickedCard.pairId) {
      // Match found
      setTimeout(() => {
        playSound(SoundType.Correct);
        setCards(prev => prev.map(c => 
          (c.id === id || c.id === selectedCardId) 
            ? { ...c, isSolved: true } 
            : c
        ));
        setSelectedCardId(null);
        setIsProcessing(false);
      }, 500);
    } else {
      // No Match
      setTimeout(() => {
        playSound(SoundType.Wrong);
        setCards(prev => prev.map(c => 
          (c.id === id || c.id === selectedCardId) 
            ? { ...c, state: 'wrong' } 
            : c
        ));
      }, 500);

      setTimeout(() => {
        setCards(prev => prev.map(c => 
          (c.id === id || c.id === selectedCardId) 
            ? { ...c, isFlipped: false, state: 'idle' } 
            : c
        ));
        setSelectedCardId(null);
        setIsProcessing(false);
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-slide-in">
      <h1 className="text-5xl md:text-6xl text-center font-display mb-4 text-shadow-neon">SECOND HALF: TEAMMATES 🤝</h1>
      <h2 className="text-secondary text-2xl font-bold mb-8 text-center tracking-widest">Connect the Married Words</h2>

      <div className="bg-card-bg/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/10 mb-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 perspective-[1000px]">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`relative h-24 md:h-32 cursor-pointer transition-all duration-500 preserve-3d ${card.isFlipped || card.isSolved ? 'rotate-y-180' : ''}`}
            >
              {/* Back of Card (Hidden initially) */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-lg border-2 border-white/20 flex items-center justify-center backface-hidden hover:border-accent">
                 <span className="text-3xl opacity-20">⚽</span>
              </div>

              {/* Front of Card (Revealed on flip) */}
              <div className={`absolute inset-0 w-full h-full rounded-xl shadow-xl flex items-center justify-center backface-hidden rotate-y-180 border-2 ${
                card.isSolved ? 'bg-green-500 border-green-300' : 
                card.state === 'wrong' ? 'bg-red-500 border-red-300' : 'bg-white border-accent'
              }`}>
                <span className={`font-bold text-sm md:text-lg ${card.isSolved || card.state === 'wrong' ? 'text-white' : 'text-gray-900'}`}>
                  {card.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 card-3d bg-red-600/10 border-2 border-red-500 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-red-500/20 text-9xl font-display">VAR</div>
          <h3 className="text-xl font-bold mb-2 text-red-500 animate-pulse">🟥 RED CARD ALERT</h3>
          <p className="text-lg">Do NOT say: "Good IN football".</p>
          <p className="text-lg">You MUST say: <strong className="text-white bg-red-600 px-2 py-1 rounded">"Good AT football"</strong>.</p>
        </div>

        <div className="flex-1">
          <TeacherCard 
            visible={isTeacher}
            title="VOCAB (25-40 min)"
            items={[
              'Drill pronunciation: "Angry WITH" (person) vs "Angry ABOUT" (situation).',
              'Game logic: 3D Flip Memory Game.'
            ]}
          />
        </div>
      </div>
    </div>
  );
};