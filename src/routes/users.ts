import { Router } from "express";
import { createUser, allUsers, getUserById, updateUserInfo, updateUserAvatar } from "../controllers/users";

export const userRouter = Router();
export default userRouter;

userRouter.post('/', createUser)
userRouter.get('/', allUsers)
userRouter.get('/:id',getUserById)
userRouter.patch('/me', updateUserInfo)
userRouter.patch('/me/avatar', updateUserAvatar)