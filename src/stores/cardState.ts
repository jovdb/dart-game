import { ReactNode } from 'react';
import { create } from 'zustand'
import { cardData } from './card-data';

export interface IThrowCard {
  task: ReactNode;
  winScore: number;
  arrowText: string;
}


const initialCardIndex = 0; 

export const useCards = create<{
  currentThrowIndex: number,
  currentThrowCard: IThrowCard,

  currentChallengeIndex: number,
  currentChallengeCard: IThrowCard,
  
  actions: {
    nextThrowCard(): void,
    nextChallengeCard(): void,
  }

}>((set) => ({
  currentThrowIndex: initialCardIndex,
  currentThrowCard: cardData[initialCardIndex],

  currentChallengeIndex: initialCardIndex,
  currentChallengeCard: cardData[initialCardIndex],

  actions: {
    nextThrowCard() {
      const currentThrowIndex = Math.floor(Math.random() * cardData.length); 
      set({
        currentThrowIndex,
        currentThrowCard: cardData[currentThrowIndex],
      });
    },
    nextChallengeCard() {
      const currentChallengeIndex = Math.floor(Math.random() * cardData.length); 
      set({
        currentChallengeIndex,
        currentChallengeCard: cardData[currentChallengeIndex],
      });
    },
  }
}));

export const useCardsActions = () => {
  return useCards(s => s.actions);
}

