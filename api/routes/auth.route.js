import express from 'express';
import { google, signin, signout, signup } from '../controllers/auth.contoller.js';

const authRouter = express();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/google', google);
authRouter.get('/signout',signout);



export default authRouter;