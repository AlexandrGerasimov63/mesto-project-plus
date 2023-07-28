import { celebrate, Joi } from 'celebrate';
import { regExp } from '../utils/constant';

export const getByIdValidate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});

export const updateUserValidate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
});

export const updateAvatarValidate = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().regex(regExp),
    }),
});





