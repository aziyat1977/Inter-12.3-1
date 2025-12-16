export enum Team {
  Madrid = 'madrid',
  Barca = 'barca'
}

export enum SoundType {
  Whistle = 'whistle',
  Correct = 'correct',
  Wrong = 'wrong'
}

export interface VocabPair {
  id: number;
  text: string;
  type: 'root' | 'pair';
  matchId: number;
}
