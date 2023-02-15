import * as fs from 'fs'
import { v4 as uuid } from 'uuid'
import { imagesPath } from './constants.js'

export const getImagesFiles = (gameType = 'animals') => fs.readdirSync(imagesPath + gameType)
export const generateCards = (size = 10, gameType = 'animals') => {
  const pictures = getImagesFiles(gameType).slice(0, size / 2)
  const cardImages = [...pictures, ...pictures]
  console.log(cardImages)
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
  console.log(cardImages)
  return cards
}
