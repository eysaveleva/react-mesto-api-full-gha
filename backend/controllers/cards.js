const Card = require('../models/card');

const {
  RIGHT_CODE,
  CREATED_CODE,
} = require('../config/config');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .populate(['likes'])
    .then((cards) => res.status(RIGHT_CODE).send(cards))
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED_CODE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Невозможно удалить чужую карточку'));
      }
      return Card.deleteOne(card);
    })
    .then((card) => {
      res.status(RIGHT_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректнй _id карточки'));
      }
      return next(err);
    });
};

const updateLikes = (req, res, next, newData) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    newData,
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    })
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(RIGHT_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректнй _id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const countLikes = { $addToSet: { likes: req.user._id } };
  return updateLikes(req, res, next, countLikes);
};

module.exports.dislikeCard = (req, res, next) => {
  const countLikes = { $pull: { likes: req.user._id } };
  return updateLikes(req, res, next, countLikes);
};
