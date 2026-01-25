
import { Word, QuizQuestion, Reward } from './types';

export const COLORS = {
  primary: '#4f46e5', // Indigo
  secondary: '#fbbf24', // Yellow
  success: '#10b981', // Green
  accent: '#a855f7', // Purple
  bgLight: '#f2f6ff',
  bgDark: '#1e1b4b'
};

export const MOCK_WORDS: Word[] = [
  { id: '1', word: 'Apple', image: 'https://picsum.photos/seed/apple/400/300', category: 'Fruits' },
  { id: '2', word: 'Elephant', image: 'https://picsum.photos/seed/elephant/400/300', category: 'Animals' },
  { id: '3', word: 'Rocket', image: 'https://picsum.photos/seed/rocket/400/300', category: 'Space' },
  { id: '4', word: 'Rainbow', image: 'https://picsum.photos/seed/rainbow/400/300', category: 'Nature' },
  { id: '5', word: 'Bicycle', image: 'https://picsum.photos/seed/bicycle/400/300', category: 'Transport' },
  { id: '6', word: 'Star', image: 'https://picsum.photos/seed/star/400/300', category: 'Shapes' },
];

export const MOCK_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What color is a banana?',
    options: ['Red', 'Blue', 'Yellow', 'Green'],
    correctAnswer: 'Yellow'
  },
  {
    id: 'q2',
    question: 'Which animal says "Woof"?',
    options: ['Cat', 'Dog', 'Lion', 'Bird'],
    correctAnswer: 'Dog'
  },
  {
    id: 'q3',
    question: 'How many fingers do we have on one hand?',
    options: ['Three', 'Five', 'Ten', 'Seven'],
    correctAnswer: 'Five'
  }
];

export const MOCK_REWARDS: Reward[] = [
  { id: 'r1', name: 'Starter Star', icon: '⭐', unlocked: true, requirement: 'Join the Academy' },
  { id: 'r2', name: 'Quiz Master', icon: '🏆', unlocked: false, requirement: 'Complete a Quiz' },
  { id: 'r3', name: 'Super Speaker', icon: '🎤', unlocked: false, requirement: 'Use Listen & Repeat' },
  { id: 'r4', name: 'Video Voyager', icon: '🛸', unlocked: false, requirement: 'Watch 5 Videos' },
];
