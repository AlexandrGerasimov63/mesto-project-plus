import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { userRouter } from './routes/users';
import { cardsRouter } from './routes/cards';
import errorHandler from './middlewares/ErrorHeandler';
import { authRouter } from './routes/auth';
import Auth from './middlewares/Auth';
import { requestLogger, errorLogger } from './middlewares/Logger';

const app = express();
const { PORT = 3000 } = process.env;
const NotFoundError = require('./errors/NotFoundError');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(requestLogger);

app.use(authRouter);
app.use(Auth);
app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
