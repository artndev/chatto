import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import config from '../config.json'

const socket = io(config.SERVER_URL)
export const useSocketStore = defineStore('socket', () => {
  return { socket }
})
