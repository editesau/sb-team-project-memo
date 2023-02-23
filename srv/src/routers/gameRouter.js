import { Router } from 'express'
import {
  getCards, getGameTypes, setMatched, startGame, openCard, closeCard,
} from '../controllers/gameController.js'
import { checkAuth } from '../middlewares/authMiddleware.js'

export const gameRouter = new Router()

gameRouter.get('/:gameId/cards', checkAuth, getCards)
gameRouter.post('/start', checkAuth, startGame)
gameRouter.post('/:gameId/open/:cardId', checkAuth, openCard)
gameRouter.post('/:gameId/close/:cardId', checkAuth, closeCard)
gameRouter.post('/:gameId/match/', checkAuth, setMatched)
gameRouter.get('/types', checkAuth, getGameTypes)
