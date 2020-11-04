const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signup } = require('../controllers/signup');
const { validatePassword } = require('../utils/validate');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().trim(true),
    password: Joi.string().required().trim(true).custom(validatePassword, 'custom validation'),
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .trim(true),
  }),
}), signup);

module.exports = router;
