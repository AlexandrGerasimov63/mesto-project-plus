import { Router } from "express";
import { login, createUser } from "../controllers/users";
import { signinValidation, signupValidation } from "../validation/authValidation";
export const authRouter = Router()

authRouter.post('/signin',signinValidation, login);
authRouter.post('/signup',signupValidation, createUser);

export default authRouter