import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { ref } from 'vue'

interface socketStoreItem {
  content: string
}

const socket = io()
export const useSocketStore = defineStore('socket', () => {
  const messages = ref([] as socketStoreItem[])

  const addMessage = (content: string) => {
    messages.value = [
      ...messages.value,
      {
        content: content,
      },
    ]

    socket.emit('message', messages.value)
  }

  return { messages, addMessage }
})
