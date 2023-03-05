import { Router } from 'express'
import {
  getGameTypes, setMatched, startGame, closeCards, resetGame,
} from '../controllers/gameController.js'
import { checkAuth } from '../middlewares/authMiddleware.js'

export const gameRouter = new Router()

gameRouter.post('/start', checkAuth, startGame)
gameRouter.post('/:gameId/reset', checkAuth, resetGame)
gameRouter.post('/:gameId/close', checkAuth, closeCards)
gameRouter.post('/:gameId/match/', checkAuth, setMatched)
gameRouter.get('/types', checkAuth, getGameTypes)
