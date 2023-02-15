import { Router } from 'express'
import { testFunc } from '../controllers/gameController.js'

export const gameRouter = new Router()

gameRouter.get('/:gameId/cards', testFunc)
gameRouter.post('/:gameId/start')
gameRouter.post('/:gameId/turn/:cardId')
gameRouter.post('/:gameId/restart')
