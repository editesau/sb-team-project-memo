import { Server } from 'socket.io'
import { CORS_ORIGIN, SOCKET_PATH } from '../helpers/constants.js'
import { socketAuthMiddleware } from '../middlewares/authMiddleware.js'
import {
  dbCloseCards, dbFinishGame, dbGetGame, dbOpenCard, dbSetMatched,
} from '../db/dbActions.js'
import { filterCards } from '../helpers/gameLogic/gameLogicFunctions.js'

const registerListeners = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} connected, now connected: ${io.engine.clientsCount}`)
    socket.on('GET_GAME', async (gameId) => {
      const game = await dbGetGame(socket.userId, gameId)
      socket.emit('GAME_LOADED', { cards: filterCards(game.cards), gameType: game.type, state: game.state })
    })
    socket.on('OPEN_CARD', async ({ gameId, cardId }) => {
      socket.emit('LOCK_BOARD')
      const game = await dbGetGame(socket.userId, gameId)
      if (game) {
        if (!game.openedCards.length) {
          const afterOpenGame = await dbOpenCard(socket.userId, gameId, cardId)
          const cardToReturn = filterCards(afterOpenGame.cards).find((card) => card.id === cardId)
          socket.emit('CARD_OPENED', cardToReturn)
          socket.emit('UNLOCK_BOARD')
        } else if (game.openedCards.length === 1) {
          const afterOpenGame = await dbOpenCard(socket.userId, gameId, cardId)
          const cardToReturn = filterCards(afterOpenGame.cards).find((card) => card.id === cardId)
          socket.emit('CARD_OPENED', cardToReturn)
          const [first, second] = afterOpenGame.openedCards
          if (first.picture === second.picture) {
            const afterMatched = await dbSetMatched(socket.userId, gameId, [first.id, second.id])
            const isFinished = afterMatched.cards.every((card) => card.isMatched)
            setTimeout(async () => {
              socket.emit('MATCHED', [first.id, second.id])
              socket.emit('UNLOCK_BOARD')
              if (isFinished) {
                await dbFinishGame(socket.userId, gameId, 'FINISHED')
                socket.emit('GAME_FINISHED')
              }
            }, 700)
          } else {
            await dbCloseCards(socket.userId, gameId, [first.id, second.id])
            setTimeout(() => {
              socket.emit('MISMATCH', [first.id, second.id])
              socket.emit('UNLOCK_BOARD')
            }, 2000)
          }
        }
      } else {
        socket.emit('ERROR', { message: 'Filed to open card' })
      }
    })
  })
}
export const initializeSocketService = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: CORS_ORIGIN,
      credentials: true,
    },
    path: SOCKET_PATH,
  })
  io.use(socketAuthMiddleware)
  registerListeners(io)
}
