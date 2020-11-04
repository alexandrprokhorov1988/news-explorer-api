const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signin } = require('../controllers/signin');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), signin);

module.exports = router;
