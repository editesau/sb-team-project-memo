import { Server } from 'socket.io'
import { CORS_ORIGIN, SOCKET_PATH } from '../helpers/constants.js'
import { socketAuthMiddleware } from '../middlewares/authMiddleware.js'

const registerListeners = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.handshake.address} connected`)
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
