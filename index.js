/*
 * Title: App  
 * Description: Handle All App Related Functionality
 * Author: Md Abdullah
 * Date: 10/19/23
 */


//Dependencies:
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './src/routes/auth.route.js';
import listingRouter from './src/routes/listing.route.js';
import userRouter from './src/routes/user.route.js';

dotenv.config();
const app = express();
app.use(cors({
    origin: 'https://real-estate-client-tau.vercel.app', // Set the origin of your client application
    credentials: true, // Allow credentials
  }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log(`Connected to MongoDB`);
    }).catch((err) => {
        console.log(err);
    })
})




app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.get("/", (req, res) => {
    res.json({"message": "Hello World!"})
})


app.listen()

//Global Error Middleware:
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
