import * as fs from 'fs'
import { v4 as uuid } from 'uuid'
import { imagesPath } from './constants.js'

const getImagesFiles = (gameType) => fs.readdirSync(imagesPath + gameType)

export const generateCards = (size, gameType) => {
  const pictures = getImagesFiles(gameType).slice(0, size / 2)
  const cardImages = [...pictures, ...pictures]
  cardImages.sort(() => Math.random() - 0.5)
  const cards = []
  for (let i = 0; i < size; i++) {
    cards.push({
      id: uuid(),
      picture: cardImages.pop(),
      isOpen: false,
      isMatched: false,
    })
  }
  return cards
}

export const filterCards = (cards) => cards.map((card) => {
  if (card.isOpen || card.isMatched) return card
  const { picture, ...returnedCard } = card
  return returnedCard
})

export const turnCard = (cards, cardId) => cards.map((card) => {
  if (!card.isOpen && card.id === cardId) {
    return {
      ...card,
      isOpen: true,
    }
  }
  return card
})

export const setMatchedCards = (cards, cardIds) => cards.map((card) => {
  console.log(cardIds)
  if (card.isOpen && cardIds.includes(card.id)) {
    return {
      ...card,
      isOpen: true,
      isMatched: true,
    }
  }
  return card
})

export const getTypesDir = () => fs.readdirSync(imagesPath)
