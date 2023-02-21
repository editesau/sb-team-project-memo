import { create } from 'zustand'

export const useGameStore = create((set) => ({
  gameId: null,
  addGameId: (gameIdFromBd) => set(() => ({
    gameId: gameIdFromBd,
  })),
}))
