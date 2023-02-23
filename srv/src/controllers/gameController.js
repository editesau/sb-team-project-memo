import { filterCards, generateCards, getTypesDir } from '../helpers/gameLogic/gameLogicFunctions.js'
import {
  dbCreateGame, dbGetGameCards, dbSetMatched, dbOpenCard,
} from '../db/dbActions.js'

export const getCards = async (req, res) => {
  const gameId = req.params.gameId
  const userId = req.userId
  try {
    const game = await dbGetGameCards(userId, gameId)
    if (game) {
      const returnedCards = filterCards(game.cards)
      res.json(returnedCards)
    } else {
      res.status(400).json({ message: 'Cant find game' })
    }
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}

export const startGame = async (req, res) => {
  const userId = req.userId
  const size = req.body.level
  const gameType = req.body.gameType
  const cards = generateCards(+size, gameType)
  try {
    const game = await dbCreateGame(userId, cards)
    res.json({ gameId: game._id })
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}

export const openCard = async (req, res) => {
  const gameId = req.params.gameId
  const cardId = req.params.cardId
  const userId = req.userId
  try {
    const game = await dbOpenCard(userId, gameId, cardId)
    if (game) {
      const cardToReturn = filterCards(game.cards).find((card) => card.id === cardId)
      res.json(cardToReturn)
    } else {
      res.status(400).json({ message: 'Cant find data' })
    }
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}

export const setMatched = async (req, res) => {
  const gameId = req.params.gameId
  const userId = req.userId
  const cardIds = req.body.cardIds

  try {
    const game = await dbSetMatched(userId, gameId, cardIds)
    if (game) {
      res.sendStatus(200)
    } else {
      res.status(400).json({ message: 'Cant find data' })
    }
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}

export const getGameTypes = async (req, res) => {
  try {
    const types = getTypesDir()
    res.json({ types })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
