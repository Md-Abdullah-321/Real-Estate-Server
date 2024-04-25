import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './src/routes/auth.route.js';
import listingRouter from './src/routes/listing.route.js';
import userRouter from './src/routes/user.route.js';
import { verifyToken } from './src/utils/verifyUser.js';

const app = express();

// Load environment variables
dotenv.config();

// Configure CORS
const allowedOrigin = 'https://real-estate-client-tau.vercel.app';
app.use(cors({
    origin: allowedOrigin,
    credentials: true, // Allow cookies with CORS
}));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/api/user', userRouter); // User routes
app.use('/api/auth', authRouter); // Authentication routes
app.use('/api/listing', listingRouter); // Listing routes

// Token verification middleware for API routes
app.use('/api', verifyToken);

// Default route
app.get("/", (req, res) => {
    res.json({"message": "Hello World!"});
});

// Handle preflight requests
app.options('*', cors());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log(`Connected to MongoDB`);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Global Error Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
