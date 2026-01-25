
export enum Section {
  VIDEOS = 'VIDEOS',
  WORDS = 'WORDS',
  QUIZ = 'QUIZ',
  LISTEN = 'LISTEN',
  REWARDS = 'REWARDS'
}

export interface Word {
  id: string;
  word: string;
  image: string;
  category: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Reward {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  requirement: string;
}
