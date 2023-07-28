import { Router } from "express";
import {allUsers, getUserById, updateUserInfo, updateUserAvatar, getMe } from "../controllers/users";
import {getByIdValidate, updateUserValidate, updateAvatarValidate} from "../validation/userValidation"

export const userRouter = Router();
export default userRouter;


userRouter.get('/', allUsers)
userRouter.get('/me', getMe)
userRouter.get('/:id',getByIdValidate,getUserById)
userRouter.patch('/me',updateUserValidate, updateUserInfo)
userRouter.patch('/me/avatar',updateAvatarValidate, updateUserAvatar)
