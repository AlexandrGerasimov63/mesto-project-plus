import { Request, Response, NextFunction } from "express";
import { RequestUser } from "types/types";
import card from "../models/card";
const NotFoundError  = require("../errors/NotFoundError");
const NotValidData = require('../errors/NotValidError')
const NotAccessError = require('../errors/NotAccess')

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

// export const deleteCard = (
//   req: RequestUser,
//   res: Response,
//   next: NextFunction
// ) => {
//   card
//     .findOneAndRemove({ _id: req.params.cardId })
//     .orFail(new Error("не корректный ID"))
//     .then(() => res.status(200).send({ message: "Карточка удалена" }))
//     .catch((err) => next(err));
// };

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = (req as RequestUser).user?._id;
  try {
    const cardUser = await card.findOne({ _id: cardId });
    if (!cardUser) {
      return next(new NotFoundError('Не удалось найти карточку'));
    }
    if (cardUser.owner.toString() !== userId?.toString()) {
      return next(new NotAccessError('Нет прав для удаления карточки'));
    }
    const result = await card.deleteOne({ _id: cardId });
    if (result.deletedCount === 1) {
      return res.send({ statusCard: 'deleted', data: cardUser });
    }
    return next(new NotFoundError('Не удалось найти карточку'));
  } catch {
    next();
  }
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
    .orFail(() => {
      throw new NotFoundError('Карточка с данным id не найдена');
    })
    .then(() => res.send({ message: 'Лайк поставлен' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValidData('Не валидный id'));
      } else {
        next(err);
      }
    });
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

