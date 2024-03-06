import { Router } from "express";
import UserController from "../controllers/UserController.js";

const userRouter = Router()

userRouter.post('/auth/signUp', UserController.signUp)
userRouter.post('/auth/signIn', UserController.signIn)
userRouter.get('/:id', UserController.getUserById)
userRouter.put('/:id', UserController.editUserById)
userRouter.delete('/:id', UserController.removeUserById)

export default userRouter;