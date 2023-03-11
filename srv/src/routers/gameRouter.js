import { Router } from 'express'
import {
  getGameTypes, startGame, resetGame,
} from '../controllers/gameController.js'
import { checkAuth } from '../middlewares/authMiddleware.js'

export const gameRouter = new Router()

gameRouter.post('/start', checkAuth, startGame)
gameRouter.post('/:gameId/reset', checkAuth, resetGame)
gameRouter.get('/types', checkAuth, getGameTypes)
