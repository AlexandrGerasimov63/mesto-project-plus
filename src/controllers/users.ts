import { Request, Response, NextFunction } from "express";
import user from "../models/user";
import { RequestUser } from "types/types";
import { ERROR_DEFUALT_CODE, NOT_FOUND_CODE } from "../constants/statuscode";
import { ERROR_DEFUALT_CODE_REQUEST, NOT_FOUND_CODE_REQUEST, CAST_ERROR } from "../constants/errors";
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((data) => {
      res.status(200).send({ message: data });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

export const allUsers = (req: Request, res: Response, next: NextFunction) => {
  user
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  user
    .findById(req.params.id)
    .orFail(new Error(`NotValidId`))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err.message)
      if(err.name === CAST_ERROR){
      res.status(NOT_FOUND_CODE).send({messenge:NOT_FOUND_CODE_REQUEST})
      next(err.name)
    } else{
      res.status(ERROR_DEFUALT_CODE).send({messenge:ERROR_DEFUALT_CODE_REQUEST})
      next()}

    });
};

export const updateUserInfo = (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  const updateName = req.body.name;
  const updateAbout = req.body.about;
  user
    .findOneAndUpdate(req.user, { name: updateName, about: updateAbout })
    .then(() => {
      res.status(200).send({ messange: "Пользователь обновлен" });
    })
    .catch((err) => next(err));
};

export const updateUserAvatar = (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  const updateAvatar = req.body.avatar;
  user
    .findOneAndUpdate(req.user, { avatar: updateAvatar })
    .then(() => {
      res.status(200).send({ message: "Аватар обновлен" });
    })
    .catch((err) => next(err));
};
