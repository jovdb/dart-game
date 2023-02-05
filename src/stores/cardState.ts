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
  currentIndex: number,
  currentCard: IThrowCard,

  actions: {
    nextRandom(): void,
  }

}>((set) => ({
  currentIndex: initialCardIndex,
  currentCard: cardData[initialCardIndex],

  actions: {
    nextRandom() {
      const currentIndex = Math.floor(Math.random() * cardData.length); 
      set({
        currentIndex,
        currentCard: cardData[currentIndex],
      });
    },
  }
}));

export const useCardsActions = () => {
  return useCards(s => s.actions);
}

