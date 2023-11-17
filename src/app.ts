require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes'

const PORT = process.env.PORT
const HOST = process.env.HOST

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/user', UserRoutes);


export default app

// @ts-ignore

app.listen(PORT, HOST, () => {
  console.log(`Running on: https://${HOST}:${PORT}`)
})
