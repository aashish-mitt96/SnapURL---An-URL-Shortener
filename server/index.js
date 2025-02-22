import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import urlRoute from './routes/urlRoute.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));

app.use('/api/url', urlRoute)

mongoose
    .connect(process.env.DATABASE)
    .then(()=> console.log("Database Connected Successfully"))
    .catch((error) => console.log("MongoDB Connection error:", error))

const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`Server started on Port: ${PORT}`))