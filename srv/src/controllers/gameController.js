import { filterCards, generateCards, getTypesDir } from '../helpers/gameLogic/gameLogicFunctions.js'
import {
  dbCreateGame, dbSetMatched, dbCloseCards, dbResetGame,
} from '../db/dbActions.js'

export const startGame = async (req, res) => {
  const userId = req.userId
  const size = req.body.level
  const gameType = req.body.gameType
  const cards = generateCards(+size, gameType)
  try {
    const game = await dbCreateGame(userId, cards, gameType)
    res.json({ gameId: game._id, gameType: game.type })
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}

export const closeCards = async (req, res) => {
  const gameId = req.params.gameId
  const cardIds = req.body.cardIds
  const userId = req.userId
  try {
    const game = await dbCloseCards(userId, gameId, cardIds)
    if (game) {
      const cardToReturn = filterCards(game.cards).find((card) => cardIds.includes(card.id))
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

export const resetGame = async (req, res) => {
  const gameId = req.params.gameId
  const userId = req.userId
  try {
    const game = await dbResetGame(userId, gameId)
    if (game) {
      res.sendStatus(200)
    } else {
      res.status(400).json({ message: 'Cant find data' })
    }
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}
