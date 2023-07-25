import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { RequestUser } from "./types/types";
import  errorHandler  from "./middlewares/ErrorHeandler";

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.json());
app.use((req, res, next) => {
  const reqUser = req as RequestUser;
  reqUser.user = {
    _id: "64b9561630a549709c9939b3", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("Привет");
});

app.use("/users", userRouter);
app.use('/cards', cardsRouter)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
