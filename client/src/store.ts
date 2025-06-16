import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

const socket = io()
export const useSocketStore = defineStore('socket', () => {
  const sendMessage = (content: string, roomId: string) => {
    socket.emit('message', {
      content: content,
      roomId: roomId,
    })
  }

  return { sendMessage }
})
