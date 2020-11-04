const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticle, createArticle, deleteArticle } = require('../controllers/articles');
const { validateUrl } = require('../utils/validate');

router.get('/', getArticle);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().trim(true).required(),
    title: Joi.string().trim(true).required(),
    text: Joi.string().trim(true).required(),
    date: Joi.string().trim(true).required(),
    source: Joi.string().trim(true).required(),
    link: Joi.string().trim(true).required().custom(validateUrl, 'custom validation'),
    image: Joi.string().trim(true).required().custom(validateUrl, 'custom validation'),
  }),
}), createArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex(),
  }),
}), deleteArticle);

module.exports = router;
