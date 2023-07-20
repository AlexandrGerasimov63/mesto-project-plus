import express, {Request, Response} from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import { RequestUser } from "./types/types";

const app = express()
const {PORT=3000}= process.env

mongoose.connect('mongodb://localhost:27017/mestodb')

app.use(express.json())
app.get('/',(req:Request, res:Response)=>{
     res.send('Привет')
  })

app.use('/users', userRouter)
app.use((req, res, next) => {
  const reqUser = req as RequestUser
  reqUser.user = {
    _id: '64b9561630a549709c9939b3' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.listen(PORT, ()=>{
  console.log(`Сервер запущен на ${PORT} порту`)
})