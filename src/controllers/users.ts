import { Request, Response, NextFunction } from "express";
import user from "../models/user";
import { RequestUser } from "types/types";
import { Error } from "mongoose";
const  NotFoundError  = require("../errors/NotFoundError");
const  NotValidData = require('../errors/NotValidError')

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((data) => {
      res.status(200).send({ message: data });
    })
    .catch(err=>{
      if (err.name === 'CastError') {
        next(new NotValidData("Не валидные данные"))
      } else {
        next(err);
      }
    })
};

export const allUsers = (req: Request, res: Response, next: NextFunction) => {
  user
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next)
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  user

    .findById(req.params.id)
    .then((data) => {

      res.status(200).send(data);
    })
    .catch(err=>{
      if (err.name === 'CastError') {
        next(new NotFoundError("Пользователь не найден"))
      } else {
        next(err);
      }
    })
};

export const updateUserInfo = (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  const updateName = req.body.name;
  const updateAbout = req.body.about;
  user
    .findOneAndUpdate(req.user, { name: updateName, about: updateAbout },{ new: true, runValidators: true })
    .orFail(()=>{
      throw new NotFoundError('Пользователь не найден')
    })
    .then(() => {
      res.status(200).send({ message: "Пользователь обновлен" });
    })
    .catch((err) => {
      if(err.name === 'CastError'){
      next(new NotValidData('Не верные данные'))
      } else {
        next(err)
      }
    });
};

export const updateUserAvatar = (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  const updateAvatar = req.body.avatar;
   user
    .findOneAndUpdate(req.user, { avatar: updateAvatar },{ new: true, runValidators: true })
    .orFail(()=>{
      throw new NotFoundError('Пользователь не найден')
    })
    .then(() => {

      res.status(200).send({ message: "Аватар обновлен" });
    })
    .catch((err) => {
      if(err.name === 'CastError'){
      next(new NotValidData('Не верные данные'))
      } else {
        next(err)
      }
    });
};
