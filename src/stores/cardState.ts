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
  return ("task" in data) && ("winScore" in data) && ("arrowText" in data);
}

export function isChallengeCardData(data: CardData): data is IChallengeCard {
  return isThowCardData(data) && "loseScore" in data;
}

const initialCardIndex = 0;

export const useCards = create<{
  throwIndex: number;
  throwCard: IThrowCard;
  isThrowFlipped: boolean;

  challengeIndex: number;
  challengeCard: IChallengeCard;
  isChallengeFlipped: boolean;

  actions: {
    nextThrowCard(): void;
    closeThrowCard(): void;

    nextChallengeCard(): void;
    closeChallengeCard(): void;
  }

}>((set, get) => ({
  throwIndex: initialCardIndex,
  throwCard: throwCards[initialCardIndex],
  isThrowFlipped: false,

  challengeIndex: initialCardIndex,
  challengeCard: challengeCards[initialCardIndex],
  isChallengeFlipped: false,

  actions: {
    nextThrowCard() {
      // if (get().isChallengeFlipped) return;
      const currentThrowIndex = Math.floor(Math.random() * throwCards.length);
      set({
        throwIndex: currentThrowIndex,
        throwCard: throwCards[currentThrowIndex],
        // isChallengeFlipped: false,
        isThrowFlipped: true,
      });
    },

    closeThrowCard() {
      set({
        isThrowFlipped: false,
      });
    },

    nextChallengeCard() {
      // if (get().isThrowFlipped) return;
      const currentChallengeIndex = Math.floor(Math.random() * challengeCards.length);
      set({
        challengeIndex: currentChallengeIndex,
        challengeCard: challengeCards[currentChallengeIndex],
        isChallengeFlipped: true,
        // isThrowFlipped: false,
      });
    },

    closeChallengeCard() {
      set({
        isChallengeFlipped: false,
      });
    }
  }
}));

export const useCardsActions = () => {
  return useCards(s => s.actions);
}
