import { Server } from 'socket.io'

const registerListeners = (io) => {
  io.on('connection', (socket) => {
    console.log(`New socket connected from ${socket.handshake.address}`)
  })
}
export const initializeSocketService = (httpServer) => {
  const io = new Server(httpServer)
  registerListeners(io)
}
