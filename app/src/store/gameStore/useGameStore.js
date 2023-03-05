import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useGameStore = create(devtools((set) => ({
  cards: [],
  gameId: null,
  isBoardLocked: false,
  setGameType: (gameType) => set(() => ({
    gameType,
  })),
  setGameCards: (cards) => set(() => ({ cards })),
  updateCard: (newCard) => set((state) => ({
    cards: state.cards.map((card) => {
      if (newCard.id === card.id) {
        return {
          ...card,
          ...newCard,
        }
      }
      return card
    }),
  })),
  mismatchCards: (cardsIds) => set((state) => ({
    cards: state.cards.map((card) => {
      if (cardsIds.includes(card.id)) {
        return {
          ...card,
          isOpen: false,
        }
      }
      return card
    }),
  })),
  matchCards: (cardsIds) => set((state) => ({
    cards: state.cards.map((card) => {
      if (cardsIds.includes(card.id)) {
        return {
          ...card,
          isOpen: false,
          isMatched: true,
        }
      }
      return card
    }),
  })),
  setIsBoardLocked: (value) => set(() => ({ isBoardLocked: value })),
})))
