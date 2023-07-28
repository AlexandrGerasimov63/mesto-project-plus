import { regExp } from "../utils/constant";

const { celebrate, Joi } = require('celebrate');

export const createCardValidate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(regExp),
    }),
});

export const updateCardValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});