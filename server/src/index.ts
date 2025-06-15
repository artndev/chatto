import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
const clientBuildPath = path.join(process.cwd(), '../', 'client', 'dist')
const staticPath = path.join(process.cwd(), '../', 'server', 'src', 'static')

import express from 'express'
import fs from 'fs'
import config from '../config.json' with { type: 'json' }

const app = express()
// app.use(
//   cors({
//     origin: config.CLIENT_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// )
app.use(express.json())
app.use(express.static(clientBuildPath))

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
app.listen(port, () =>
  console.log(`Server listening on port ${port}\nhttp://localhost:${port}`)
)
