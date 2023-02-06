import { ReactNode } from 'react';
import { create } from 'zustand'
import { challengeCards, throwCards } from './card-data';

export interface IThrowCard {
  task: ReactNode;
  winScore: number;
  arrowText: string;
}

export interface IChallengeCard {
  task: ReactNode;
  winScore: number;
  loseScore: number;
  skipScore: number;
  arrowText: string;
}

export type CardData = IThrowCard | IChallengeCard;

export function isThowCardData(data: CardData): data is IThrowCard {
  return !("loseScore" in data);
}

export function isChallengeCardData(data: CardData): data is IChallengeCard {
  return "loseScore" in data;
}


const initialCardIndex = 0;

export const useCards = create<{
  currentThrowIndex: number,
  currentThrowCard: IThrowCard,

  currentChallengeIndex: number,
  currentChallengeCard: IChallengeCard,

  actions: {
    nextThrowCard(): void,
    nextChallengeCard(): void,
  }

}>((set) => ({
  currentThrowIndex: initialCardIndex,
  currentThrowCard: throwCards[initialCardIndex],

  currentChallengeIndex: initialCardIndex,
  currentChallengeCard: challengeCards[initialCardIndex],

  actions: {
    nextThrowCard() {
      const currentThrowIndex = Math.floor(Math.random() * throwCards.length);
      set({
        currentThrowIndex,
        currentThrowCard: throwCards[currentThrowIndex],
      });
    },
    nextChallengeCard() {
      const currentChallengeIndex = Math.floor(Math.random() * challengeCards.length);
      set({
        currentChallengeIndex,
        currentChallengeCard: challengeCards[currentChallengeIndex],
      });
    },
  }
}));

export const useCardsActions = () => {
  return useCards(s => s.actions);
}

