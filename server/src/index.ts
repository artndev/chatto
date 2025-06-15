import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
const clientBuildPath = path.join(process.cwd(), '../', 'client', 'dist')
const staticPath = path.join(process.cwd(), '../', 'server', 'src', 'static')

import express from 'express'
import fs from 'fs'
import config from '../config.json' with { type: 'json' }
import { Server } from 'socket.io'
import { createServer } from 'http'

// app.use(
//   cors({
//     origin: config.CLIENT_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// )
const app = express()
const server = createServer(app)
app.use(express.json())
app.use(express.static(clientBuildPath))

const io = new Server(server)
io.on('connection', socket => {
  console.log('User is connected: ', socket.id)

  socket.on('message', msgs => {
    console.log(`User #${socket.id} wrote: `, msgs)
  })

  socket.on('disconnect', () => {
    console.log('User is disconnected: ', socket.id)
  })
})

app.get('/api/static/:id', (req, res) => {
  const filePath = path.join(staticPath, req.params.id)

  if (!fs.existsSync(filePath)) {
    res.sendFile(path.join(staticPath, '404.jpg'))
    return
  }

  res.sendFile(filePath)
})

app.get('/*', (_req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'))
})

const port = process.env.PORT ? Number(process.env.PORT) : config.PORT
server.listen(port, () =>
  console.log(`Server listening on port ${port}\nhttp://localhost:${port}`)
)
