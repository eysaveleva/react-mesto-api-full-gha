const { celebrate, Joi } = require('celebrate');
const { REGULAR_URL, REGULAR_ID } = require('../config/config');

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateAddUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGULAR_URL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).required().regex(REGULAR_ID),
  }),
});

module.exports.validateUpdateProfileInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateUpdateProfileAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(REGULAR_URL),
  }),
});

module.exports.validateAddCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(REGULAR_URL),
  }),
});

module.exports.validateUpdateCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().regex(REGULAR_ID),
  }),
});
