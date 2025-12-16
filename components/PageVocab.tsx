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
  {w: "Succeed", p: "IN"}
];

interface CardItem {
  id: string; // unique ID for the card
  pairId: number; // ID of the pair logic
  text: string;
  isSolved: boolean;
  state: 'idle' | 'selected' | 'wrong';
}

export const PageVocab: React.FC<Props> = ({ isTeacher, playSound }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Init game
    const newCards: CardItem[] = [];
    PAIRS.forEach((pair, idx) => {
      newCards.push({ id: `w-${idx}`, pairId: idx, text: pair.w, isSolved: false, state: 'idle' });
      newCards.push({ id: `p-${idx}`, pairId: idx, text: pair.p, isSolved: false, state: 'idle' });
    });
    setCards(newCards.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (id: string) => {
    if (isProcessing) return;
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isSolved) return;

    // If first selection
    if (!selectedCardId) {
      setSelectedCardId(id);
      setCards(prev => prev.map(c => c.id === id ? { ...c, state: 'selected' } : c));
      return;
    }

    // If clicked same card
    if (selectedCardId === id) return;

    // If second selection
    const firstCard = cards.find(c => c.id === selectedCardId);
    if (!firstCard) return;

    setIsProcessing(true);

    if (firstCard.pairId === clickedCard.pairId) {
      // Match
      playSound(SoundType.Correct);
      setCards(prev => prev.map(c => 
        (c.id === id || c.id === selectedCardId) 
          ? { ...c, isSolved: true, state: 'idle' } 
          : c
      ));
      setSelectedCardId(null);
      setIsProcessing(false);
    } else {
      // No Match
      playSound(SoundType.Wrong);
      setCards(prev => prev.map(c => 
        (c.id === id || c.id === selectedCardId) 
          ? { ...c, state: 'wrong' } 
          : c
      ));

      setTimeout(() => {
        setCards(prev => prev.map(c => 
          (c.id === id || c.id === selectedCardId) 
            ? { ...c, state: 'idle' } 
            : c
        ));
        setSelectedCardId(null);
        setIsProcessing(false);
      }, 800);
    }
  };

  const getCardStyle = (card: CardItem) => {
    if (card.isSolved) return "bg-accent text-white border-transparent cursor-default opacity-50";
    if (card.state === 'selected') return "bg-secondary text-black scale-105 shadow-lg border-secondary";
    if (card.state === 'wrong') return "bg-red-500 text-white animate-flicker border-red-500";
    return "bg-bg text-text border-text hover:border-accent hover:text-accent cursor-pointer";
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-in">
      <h1 className="text-4xl md:text-5xl text-center font-display mb-4">SECOND HALF: TEAMMATES 🤝</h1>
      <h2 className="text-secondary text-xl md:text-2xl font-bold mb-8 text-center">Connect the Married Words</h2>

      <div className="bg-card-bg p-6 rounded-2xl shadow-xl border-l-8 border-accent mb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`p-4 md:p-6 text-center font-bold rounded-xl border-2 transition-all duration-300 ${getCardStyle(card)}`}
            >
              {card.text}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card-bg p-6 rounded-2xl shadow-xl border-l-8 border-red-500 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">🟥</div>
        <h3 className="text-xl font-bold mb-2 text-red-500">🟥 RED CARD ALERT</h3>
        <p className="text-lg">Do NOT say: "Good IN football".</p>
        <p className="text-lg">You MUST say: <strong className="text-accent">"Good AT football"</strong>.</p>
      </div>

      <div className="bg-card-bg p-6 rounded-2xl shadow-xl border-l-8 border-accent">
        <TeacherCard 
          visible={isTeacher}
          title="VOCAB (25-40 min)"
          items={[
            'Drill pronunciation: "Angry WITH" (person) vs "Angry ABOUT" (situation).',
            'Correct the "Good IN" mistake aggressively (Red Card simulation).'
          ]}
        />
      </div>
    </div>
  );
};