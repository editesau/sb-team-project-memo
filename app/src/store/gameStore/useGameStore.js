import { create } from 'zustand'

export const useGameStore = create((set) => ({
  gameId: null,
  gameType: JSON.parse(localStorage.getItem('gameType')) || '',
  addGameId: (gameIdFromBd) => set(() => ({
    gameId: gameIdFromBd,
  })),
  changeGameType: (gameType) => set(() => ({
    gameType,
  })),
}))
