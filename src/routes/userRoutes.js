import { Router } from "express";
import userController from "../controllers/userController.js";

const userRouter = Router()

userRouter.post('/auth/register', userController.register)
userRouter.post('/auth/login', userController.login)
userRouter.get('/users/:id', userController.getUserById)
userRouter.put('/users/:id', userController.edit)
userRouter.delete('/users/:id', userController.removeUserById)

export default userRouter;