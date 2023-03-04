import { io } from 'socket.io-client'
import { getTokenFromLS } from '../../tools/helpers/helperFunctions.js'

let socket
const registerListeners = () => {
}
export const initializeSocket = () => {
  socket = io('ws://127.0.0.1:5050', { path: '/game_socket', auth: { token: getTokenFromLS() } })
  registerListeners(socket)
}

export const closeSocket = () => {
  socket.disconnect()
}
