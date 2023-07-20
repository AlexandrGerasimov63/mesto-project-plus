import { Request, Response, NextFunction } from "express";
import user from "../models/user";

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

export const getUserById = (req: Request, res:Response, next: NextFunction) =>{
  user.findById(req.params.id)
  .then((data)=>{
    res.status(200).send(data)
  })
  .catch((err)=>{
    res.send(`Произошла ошибка`)
    next(err)
  })
}
// export default createUser
