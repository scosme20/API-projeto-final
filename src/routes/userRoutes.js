import { Router } from "express";
import userController from "../controllers/userController.js";

const userRouter = Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.get('/:id', userController.getUserById)
userRouter.put('/edit/:id', userController.edit)
userRouter.delete('/remove', userController.removeUser)

export { userRouter }