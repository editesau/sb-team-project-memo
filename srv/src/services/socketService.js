import { Server } from 'socket.io'
import { CORS_ORIGIN } from '../helpers/constants.js'

const registerListeners = (io) => {
  io.on('connection', (socket) => {
    console.log(`New socket connected from ${socket.handshake.address}`)
  })
}
export const initializeSocketService = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: CORS_ORIGIN,
      credentials: true,
    },
  })
  registerListeners(io)
}
