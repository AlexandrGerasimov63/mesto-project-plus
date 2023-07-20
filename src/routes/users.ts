import { Router } from "express";
import { createUser, allUsers, getUserById } from "../controllers/users";

export const userRouter = Router();
export default userRouter;

userRouter.post('/', createUser)
userRouter.get('/', allUsers)
userRouter.get('/:id',getUserById)