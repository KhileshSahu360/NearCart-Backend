import express from 'express'
import { registerUser, loginUser, uploadPhoto } from '../controller/user.controller.js';
import { upload } from '../middlewares/multer.middlewares.js';

const userRouter = express.Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/upload').post(upload.single("photo"), uploadPhoto)

export default userRouter;