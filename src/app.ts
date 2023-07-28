import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { RequestUser } from "./types/types";
import  errorHandler  from "./middlewares/ErrorHeandler";
import authRouter from './routes/auth';
import Auth from './middlewares/Auth';
import { requestLogger, errorLogger } from './middlewares/Logger';
import { errors } from 'celebrate';

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.json());
app.use(requestLogger)

app.use(authRouter)
app.use(Auth)
app.use("/users", userRouter);
app.use('/cards', cardsRouter);
app.use(errorLogger)
app.use(errors())
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
// '$2a$05$YnAdtmol5S1d1bPHYWH2NeRlEbAwDNp/hDU9T1s.KiYKRayBZ9zBa'
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGMyNzVhNmYxMmM5MjM2ZDhmOTY3YzIiLCJpYXQiOjE2OTA0NjU4MDcsImV4cCI6MTY5MDQ3MzAwN30.LokgdBuV-0AmmwerzmeQeZN1lQplvzsalwfQvN5rQIk"