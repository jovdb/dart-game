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

export function isThrowCardData(data: CardData): data is IThrowCard {
  return ("task" in data) && ("winScore" in data) && ("arrowText" in data);
}

export function isChallengeCardData(data: CardData): data is IChallengeCard {
  return isThrowCardData(data) && "loseScore" in data;
}

const initialCardIndex = 0;


const useCards = create<{
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

}>((set) => ({
  throwIndex: initialCardIndex,
  throwCard: throwCards[initialCardIndex],
  isThrowFlipped: false,

  challengeIndex: initialCardIndex,
  challengeCard: challengeCards[initialCardIndex],
  isChallengeFlipped: false,

  actions: {
    nextThrowCard() {
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

export const useThrowCard = () => {
  const card = useCards(s => s.throwCard);
  const isFlipped = useCards(s => s.isThrowFlipped);
  const {
    nextThrowCard: next,
    closeThrowCard: close,
  } = useCardsActions();

  return {
    card,
    isFlipped,
    next,
    close,
  };
}

export const useChallengeCard = () => {
  const card = useCards(s => s.challengeCard);
  const isFlipped = useCards(s => s.isChallengeFlipped);
  const {
    nextChallengeCard: next,
    closeChallengeCard: close,
  } = useCardsActions();

  return {
    card,
    isFlipped,
    next,
    close,
  };
}


// Add Some console logging
function diff(o1: any, o2: any) {
  // Simple diff: Removes are not detected
  return Object
    .keys(o2)
    .reduce((diff, key) => {
      if (o1[key] === o2[key]) return diff
      return {
        ...diff,
        [key]: {
          from: o2[key],
          to: o1[key],
        }
      }
    }, {});
}

if (process.env.NODE_ENV === "development") {
  useCards.subscribe(
    (value, prevState) => {
      console.log("Card state changed:", diff(value, prevState));
    }
  );
}
