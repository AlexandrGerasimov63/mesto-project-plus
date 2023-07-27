import { Router } from "express";
import {allUsers, getUserById, updateUserInfo, updateUserAvatar, getMe } from "../controllers/users";

export const userRouter = Router();
export default userRouter;


userRouter.get('/', allUsers)
userRouter.get('/me', getMe)
userRouter.get('/:id',getUserById)
userRouter.patch('/me', updateUserInfo)
userRouter.patch('/me/avatar', updateUserAvatar)
