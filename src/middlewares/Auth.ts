import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ISessionRequest } from '../types/types';

const AuthError = require('../errors/AuthError');

export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  // console.log(authorization)
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходима авторизация'));
  } else {
    // извлечём токен
    const token = authorization.replace('Bearer ', '');

    let payload;

    try {
    // попытаемся верифицировать токен
      payload = jwt.verify(token, 'secret');
    } catch (err) {
      // отправим ошибку, если не получилось
      next(new AuthError('Необходима авторизация'));
    }
    req.user = payload; // записываем пейлоуд в объект запроса
    next();
  }
};
