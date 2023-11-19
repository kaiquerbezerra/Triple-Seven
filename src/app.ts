require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes'
import TaskRoutes from './routes/TaskRoutes'
import SprintRoutes from './routes/SprintRoutes'
import BoardRoutes from './routes/BoardRoutes'

const PORT = process.env.PORT
const HOST = process.env.HOST

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/user', UserRoutes);
//app.use('/task', TaskRoutes);
//app.use('/sprint', SprintRoutes);
//app.use('/board', BoardRoutes);

export default app

// @ts-ignore

app.listen(PORT, HOST, () => {
  console.log(`Running on: https://${HOST}:${PORT}`)
})
