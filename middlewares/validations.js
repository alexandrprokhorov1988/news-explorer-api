const { celebrate, Joi } = require('celebrate');

const validateUrl = (value, helpers) => {
  if (!/^(https?:\/\/)?([\d\w.-]+)\.([a-z.]{2,6})(.)*$/.test(value)) {
    return helpers.message('Некорректный url');
  }
  return value;
};

const validatePassword = (value, helpers) => {
  if (!/^[\d\w/.\S]{2,30}$/.test(value)) {
    return helpers.message('Недопустимые значения');
  }
  return value;
};

const validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().trim(true).required().messages({
      'any.required': 'Поле keyword должно быть заполнено',
    }),
    title: Joi.string().trim(true).required().messages({
      'any.required': 'Поле title должно быть заполнено',
    }),
    text: Joi.string().trim(true).required().messages({
      'any.required': 'Поле text должно быть заполнено',
    }),
    date: Joi.string().trim(true).required().messages({
      'any.required': 'Поле date должно быть заполнено',
    }),
    source: Joi.string().trim(true).required().messages({
      'any.required': 'Поле source должно быть заполнено',
    }),
    link: Joi
      .string()
      .trim(true)
      .required()
      .custom(validateUrl, 'custom validation')
      .messages({
        'any.required': 'Поле link должно быть заполнено',
      }),
    image: Joi
      .string()
      .trim(true)
      .required()
      .custom(validateUrl, 'custom validation')
      .messages({
        'any.required': 'Поле image должно быть заполнено',
      }),
  }),
});

const validateDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().messages({
      'string.hex': 'Id не является допустимой шестнадцатеричной строкой',
    }),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Поле email должно быть заполнено',
      'string.email': 'Поле email должно быть валидным',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Поле password должно быть заполнено',
    }),
    name: Joi.string().required().messages({
      'any.required': 'Поле name должно быть заполнено',
    }),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .trim(true)
      .messages({
        'any.required': 'Поле email должно быть заполнено',
        'string.email': 'Поле email должно быть валидным',
      }),
    password: Joi
      .string()
      .required()
      .trim(true)
      .custom(validatePassword, 'custom validation')
      .messages({
        'any.required': 'Поле password должно быть заполнено',
      }),
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .trim(true)
      .messages({
        'any.required': 'Поле name должно быть заполнено',
        'string.min': 'Минимальная длина поля 2',
        'string.max': 'Максимальная длина поля 30',
      }),
  }),
});

module.exports = {
  validateCreateArticle,
  validateDeleteArticle,
  validateSignin,
  validateSignup,
};
