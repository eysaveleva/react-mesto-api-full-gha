const cardRouter = require('express').Router();
const { validateAddCard, validateUpdateCard } = require('../middlewares/validation');
const {
  addCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', validateAddCard, addCard);
cardRouter.delete('/:cardId', validateUpdateCard, deleteCard);
cardRouter.put('/:cardId/likes', validateUpdateCard, likeCard);
cardRouter.delete('/:cardId/likes', validateUpdateCard, dislikeCard);

module.exports = { cardRouter };
