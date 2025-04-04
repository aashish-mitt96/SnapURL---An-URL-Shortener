import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRoute from './routes/urlRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Allow requests from your frontend (update URL when deploying frontend to Vercel)
app.use(cors({
    origin: 'https://snap-url-an-url-shortener-7m59.vercel.app/',  // Replace this with your frontend URL
    methods: ['GET', 'POST' , 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Define Routes
app.use('/api/url', urlRoute);

// Fallback route (optional but recommended)
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Database connection
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("Database Connected Successfully"))
    .catch((error) => console.log("MongoDB Connection error:", error));

// Export the app for Vercel deployment (Serverless environment)
export default app;

// Vercel automatically handles the listening part when deploying a serverless function
