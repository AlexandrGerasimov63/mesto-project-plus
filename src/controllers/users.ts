import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import user from '../models/user';
import { RequestUser } from '../types/types';

const bcrypt = require('bcryptjs');
const NotFoundError = require('../errors/NotFoundError');
const NotValidData = require('../errors/NotValidError');
const NotUnique = require('../errors/NotUnique');

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 5)
    .then((hash: string) => {
      user
        .create(
          {
            name, about, avatar, email, password: hash,
          },
        )
        .then(() => res.status(201).send(
          {
            message: name, about, avatar, email,
          },
        ))
        .catch((err) => {
          if (err.name === 'CastError' || err.name === 'ValidationError') {
            return next(new NotValidData('Не валидные данные'));
          }
          if (err.code === 11000) {
            return next(new NotUnique('Такой емаил уже занят'));
          }
          return next(err);
        });
    })
    .catch(next);
};

export const allUsers = (req: Request, res: Response, next: NextFunction) => {
  user
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  user
    .findById(req.params.id)
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValidData('Не правильные данные'));
      }
      return next(err);
    });
};

export const updateUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateName = req.body.name;
  const updateAbout = req.body.about;
  const userId = (req as RequestUser).user?._id;
  user
    .findOneAndUpdate(
      { _id: userId },
      { name: updateName, about: updateAbout },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then(() => {
      res.status(200).send({ message: 'Пользователь обновлен' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidData('Не верные данные'));
      }
      return next(err);
    });
};

export const updateUserAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateAvatar = req.body.avatar;
  const userId = (req as RequestUser).user?._id;
  user
    .findOneAndUpdate(
      { _id: userId },
      { avatar: updateAvatar },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then(() => {
      res.status(200).send({ message: 'Аватар обновлен' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidData('Не верные данные'));
      }
      return next(err);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return user
    .findUserByCredentials(email, password)
    .then((users) => {
      const id = String(users._id);
      const token = jwt.sign({ _id: id }, 'secret', {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

export const getMe = async (
  req: RequestUser,
  res: Response,
  next: NextFunction,
) => {
  await user
    .findById(req.user?._id)

    .orFail(() => {
      throw new NotFoundError('Пользователь с данным id не найден');
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValidData('Не валидный id'));
      }
      return next(err);
    });
};
