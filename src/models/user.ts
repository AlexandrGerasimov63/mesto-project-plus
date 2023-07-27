import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail';
import isURL from "validator/lib/isURL";


const AuthError = require('../errors/AuthError')
const bcrypt = require('bcryptjs')

export interface IUser {
  name:string,
  about:string,
  avatar:string,
  email:string,
  password:string
}

interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<mongoose.Document<unknown, any, IUser>>
}


const userShema = new mongoose.Schema<IUser, UserModel>({
  name:{
    type:String,
    minlength:2,
    maxlength:30,
    default:'Жак-Ив Кусто'
  },
  about:{
    type:String,
    minlength:2,
    maxlength:200,
    default:'Исследователь'
  },
  avatar:{
    type:String,
    validate: {
      validator: (v: string) => isURL(v),
      message: 'Не валидная ссылка',
    },
    default:'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validate:{
      validator:(v:string)=>isEmail(v),
      message: 'Не валидный емаил',
    }
  },
  password:{
    type:String,
    required:true,
    select:false
  }
})

userShema.static(
  'findUserByCredentials',
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          throw new AuthError('Неверные почта или пароль');

        }

        return bcrypt
          .compare(password, user.password)
          .then((matched: boolean) => {

            if (!matched) {
              throw new AuthError('Неверные почта или пароль');
            }
            return user;
          });
      });
  }
);


export default mongoose.model<IUser, UserModel>('user', userShema)