import { ReactNode } from 'react';
import { create } from 'zustand'
import { challengeCards, throwCards } from './card-data';

export interface IBox {
  isChallenge: boolean;
  multiply: number;
}

export interface IGame {
  boxes: IBox[];
  actions: {
    /* I character per box:
    Codes:
    0: Empty
    1: x2
    2: x3
    4: Challenge
    5: Challenge x2
    6: Challenge x3
    */
    loadGame(code: string): void
  }
}

const useGameState = create<IGame>((set) => ({
  boxes: [],

  actions: {
    loadGame(code: string) {
      /* Smpmle: 0401402410_4104006140_2040124040_1240420401_4050420601_4040241040
      0: Empty
      1: x2
      2: x3
      4: Challenge
      5: Challenge x2
      6: Challenge x3
      */
      const boxes: IBox[] = code.split("").map(char => ({
        isChallenge: char === "4" || char === "5" || char === "6",
        multiply: char === "1" || char === "5" ? 2 : char === "2" || char === "6" ? 3 : 1,
      }));

      set({
        boxes
      });
    },
  }
}));


// Load from Querystring
const queryString = typeof window !== "undefined" && window.location.search;
const urlParams = queryString && new URLSearchParams(queryString);
const game = urlParams && urlParams.get('game');

useGameState.getState().actions.loadGame(game || "040140241041040061402040124040124042040140504206014040241040");

export const useGameActions = () => {
  return useGameState(s => s.actions);
}

export const useGame = () => {
  const boxes = useGameState(s => s.boxes);
  return {
    boxes,
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
  useGameState.subscribe(
    (value, prevState) => {
      console.log("Game changed:", diff(value, prevState));
    }
  );
}
