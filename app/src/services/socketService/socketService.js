import { io } from 'socket.io-client'
import { getTokenFromLS } from '../../tools/helpers/helperFunctions.js'
import api from '../Api/Api.js'

let socket

const removeListeners = () => {
  socket.off('CARDS_LOADED')
  socket.off('CARD_OPENED')
  socket.off('MISMATCH')
  socket.off('MATCHED')
  socket.off('LOCK_BOARD')
  socket.off('UNLOCK_BOARD')
}
export const closeSocket = () => {
  removeListeners()
  socket.disconnect()
}
const registerListeners = (setGameCards, setGameType, updateCard, mismatchCards, matchCards, setIsBoardLocked, setIsFinished) => {
  socket.on('connect_error', async (err) => {
    if (err.message === 'Unauthorized') {
      const refreshResponse = await api.refreshTokens()
      const { accessToken } = await refreshResponse.json()
      api.setToken(accessToken)
      socket.auth.token = getTokenFromLS()
      socket.connect()
    }
  })
  socket.on('GAME_LOADED', ({ cards, gameType, state }) => {
    setGameCards(cards)
    setGameType(gameType)
    if (state === 'FINISHED') setIsFinished(true)
  })
  socket.on('CARD_OPENED', (card) => {
    updateCard(card)
  })
  socket.on('MISMATCH', (cardIds) => {
    mismatchCards(cardIds)
  })
  socket.on('MATCHED', (cardIds) => {
    matchCards(cardIds)
  })
  socket.on('LOCK_BOARD', () => {
    setIsBoardLocked(true)
  })
  socket.on('UNLOCK_BOARD', () => {
    setIsBoardLocked(false)
  })
  socket.on('GAME_FINISHED', () => {
    setIsFinished(true)
  })
}

export const initializeSocket = (setGameCards, setGameType, updateCard, mismatchCards, matchCards, setIsBoardLocked, setIsFinished) => {
  socket = io('ws://localhost:5050', {
    path: '/game_socket',
    auth: { token: getTokenFromLS() },
    transports: ['websocket'],
  })
  registerListeners(setGameCards, setGameType, updateCard, mismatchCards, matchCards, setIsBoardLocked, setIsFinished)
}

export const socketGetGame = (gameId) => {
  socket.emit('GET_GAME', gameId)
}

export const socketOpenCard = (gameId, cardId) => {
  socket.emit('OPEN_CARD', { gameId, cardId })
}
