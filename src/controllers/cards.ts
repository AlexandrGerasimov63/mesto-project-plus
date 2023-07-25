import { Request, Response, NextFunction } from "express";
import { RequestUser } from "types/types";
import card from "../models/card";
const  NotFoundError  = require("../errors/NotFoundError");
const  NotValidData = require('../errors/NotValidError')


export const getAllCards = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  card
    .find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

export const createCard = (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const userId = req.user?._id;
  card
    .create({ name, link, owner: userId })
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

export const deleteCard = (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  card
    .findOneAndRemove({ _id: req.params.cardId })
    .orFail(new Error("не корректный ID"))
    .then(() => res.status(200).send({ message: "Карточка удалена" }))
    .catch((err) => next(err));
};

export const likeCard = (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true }
    )
    .then(() => res.send({ message: "Лайк поставлен" }))
    .catch((err) => next(err));
};

export const dislikeCard = (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {

  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true }
    )
    .then(() => res.send({ message: "Лайк удален" }))
    .catch((err) => next(err));
};

