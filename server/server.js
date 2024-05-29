import express from "express"
import session from "express-session"
import mongoose from "mongoose"
import * as dotenv from 'dotenv'
import apiRegister from "./apiRegister.js"

dotenv.config()

const server = express()
const port = 3000

server.use(express.json())
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
mongoose.connect(process.env.CONNECTION_STRING)

apiRegister(server)

server.listen(port, () => console.log(`Listening on port http://localhost:${port}`))