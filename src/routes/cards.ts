import { Router } from "express";
import { getAllCards, createCard, deleteCard, likeCard, dislikeCard } from "../controllers/cards";
import { createCardValidate, updateCardValidate } from "../validation/cardsValidation";

export const cardsRouter= Router();

cardsRouter.get('/', getAllCards);
cardsRouter.post('/',createCardValidate, createCard)
cardsRouter.put('/:cardId/likes',updateCardValidate, likeCard)
cardsRouter.delete('/:cardId/likes',updateCardValidate, dislikeCard)
cardsRouter.delete('/:cardId',updateCardValidate, deleteCard)
export default cardsRouter