import { create } from "zustand";

export interface IUserGameState {
    userName: string;
    score: number;
}

export interface IGameState {
    users: IUserGameState[];
    userIndex: number;
    actions: {
        setNextUser(): void;
    }
}

const useGameStore = create<IGameState>((set) => ({
    users: [
        {
            userName: "Dominiek",
            score: 12,
        },
        {
            userName: "Nicolas",
            score: 329,
        }
    ],
    userIndex: 0,
    actions: {
        setNextUser() {
            set((prev) => ({ userIndex: (prev.userIndex + 1) % prev.users.length }));
        }
    }
}));

export function useUserIndex() {
    return useGameStore((state) => state.userIndex);
}


export function useUsers() {
    return useGameStore((state) => state.users);
}

export function useUser(userIndex: number) {
    return useGameStore((state) => state.users[userIndex]);
}

export function useActiveUser() {
    return useGameStore((state) => state.users.at(state.userIndex));
}

export function useGameActions() {
    return useGameStore((state) => state.actions);
}
