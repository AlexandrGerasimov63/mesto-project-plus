import { Request, Response, NextFunction } from "express";
import user from "../models/user";
import { RequestUser } from "types/types";
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
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.send(`Произошла ошибка`);
      next(err);
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
