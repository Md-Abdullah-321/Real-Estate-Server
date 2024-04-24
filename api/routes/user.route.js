/*
 * Title: User Router 
 * Description: Handle Alle User Router.
 * Author: Md Abdullah
 * Date: 10/14/23
 */


//Dependencies:
import express from 'express';
import { deleteUser, getUser, getUserListing, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const userRouter = express.Router();


//Routes:
userRouter.get('/test', test);
userRouter.get('/listings/:id',verifyToken, getUserListing);
userRouter.post('/update/:id', verifyToken, updateUser);
userRouter.delete('/delete/:id', verifyToken, deleteUser);
userRouter.get('/:id', verifyToken, getUser);
export default userRouter;