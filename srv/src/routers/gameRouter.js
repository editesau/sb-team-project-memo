import { Router } from 'express'
import {
  getCards, setMatched, startGame, turnCard,
} from '../controllers/gameController.js'
import { checkAuth } from '../middlewares/authMiddleware.js'

export const gameRouter = new Router()

gameRouter.get('/:gameId/cards', checkAuth, getCards)
gameRouter.post('/start', checkAuth, startGame)
gameRouter.post('/:gameId/turn/:cardId', checkAuth, turnCard)
gameRouter.post('/:gameId/restart')
gameRouter.post('/:gameId/match/', checkAuth, setMatched)
