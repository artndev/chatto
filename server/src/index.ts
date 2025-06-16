import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import config from '../config.json' with { type: 'json' }
import db from './db.js'

const app = express()
const server = createServer(app)
app.use(express.json())

const io = new Server(server, {
  cors: {
    origin: config.CLIENT_URL,
  },
})

io.on('connection', socket => {
  console.log('User is connected: ', socket.id)

  socket.on('user:join', username => {
    socket.username = username
    socket.room = 'global'

    db.usernames[username] = username
    socket.join('global')

    socket.emit('user:announce', 'SERVER', "You have connected to 'global'")
    socket.broadcast
      .to('global')
      .emit('user:announce', 'SERVER', `@${username} has joined this room`)

    io.sockets.to('global').emit('room:update_usernames', db.usernames)
    socket.emit('room:update_rooms', db.rooms, 'global')
  })

  // create message for sender automatically on client side
  socket.on('user:message', data => {
    socket.broadcast
      .to(socket.room!)
      .emit('message:received', socket.username, data)
  })

  socket.on('room:switch', room => {
    socket.leave(socket.room!)
    socket.join(room)

    socket.broadcast
      .to(socket.room!)
      .emit('user:announce', 'SERVER', `@${socket.username} has left`)

    socket.room = room
    socket.emit('user:announce', 'SERVER', `You have connected to '${room}'`)
    socket.broadcast
      .to(room)
      .emit('user:announce', 'SERVER', `@${socket.username} has joined`)

    io.sockets.to(room).emit('room:update_usernames', db.usernames)
    socket.emit('room:update_rooms', db.rooms, room)
  })

  socket.on('disconnect', () => {
    delete db.usernames[socket.username!]
    socket.leave(socket.room!)

    socket.broadcast
      .to(socket.room!)
      .emit('user:announce', 'SERVER', `@${socket.username} has left`)

    io.sockets.to(socket.room!).emit('room:update_usernames', db.usernames)
    socket.emit('room:update_rooms', db.rooms, null)

    console.log('User is disconnected: ', socket.id)
  })
})

const port = process.env.PORT ? Number(process.env.PORT) : config.PORT
server.listen(port, () =>
  console.log(`Server listening on port ${port}\nhttp://localhost:${port}`)
)
