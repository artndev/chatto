import 'socket.io'

declare module 'socket.io' {
  interface Socket {
    username?: string
    room?: string
  }
}

export {}
