const { celebrate, Joi } = require('celebrate');

const validateUrl = (value, helpers) => {
  if (!/^(https?:\/\/)?([\d\w.-]+)\.([a-z.]{2,6})(.)*$/.test(value)) {
    return helpers.message(`Некорректный url в поле ${helpers.state.path}`);
  }
  return value;
};

const validatePassword = (value, helpers) => {
  if (value.length < 2) {
    return helpers.message(`Минимальная длина поля ${helpers.state.path} - 2`);
  }
  if (!/^[\d\w/.\S]{2,30}$/.test(value)) {
    return helpers.message(`Недопустимые значения в поле ${helpers.state.path}`);
  }
  return value;
};

const validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().trim(true).required().messages({
      'any.required': 'Поле keyword должно быть заполнено',
      'string.empty': 'Поле keyword не должно быть пустым',
    }),
    title: Joi.string().trim(true).required().messages({
      'any.required': 'Поле title должно быть заполнено',
      'string.empty': 'Поле title не должно быть пустым',
    }),
    text: Joi.string().trim(true).required().messages({
      'any.required': 'Поле text должно быть заполнено',
      'string.empty': 'Поле text не должно быть пустым',
    }),
    date: Joi.string().trim(true).required().messages({
      'any.required': 'Поле date должно быть заполнено',
      'string.empty': 'Поле date не должно быть пустым',
    }),
    source: Joi.string().trim(true).required().messages({
      'any.required': 'Поле source должно быть заполнено',
      'string.empty': 'Поле source не должно быть пустым',
    }),
    link: Joi
      .string()
      .trim(true)
      .required()
      .custom(validateUrl, 'custom validation')
      .messages({
        'any.required': 'Поле link должно быть заполнено',
        'string.empty': 'Поле link не должно быть пустым',
      }),
    image: Joi
      .string()
      .trim(true)
      .required()
      .custom(validateUrl, 'custom validation')
      .messages({
        'any.required': 'Поле image должно быть заполнено',
        'string.empty': 'Поле image не должно быть пустым',
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
    email: Joi
      .string()
      .required()
      .email()
      .trim(true)
      .messages({
        'any.required': 'Поле email должно быть заполнено',
        'string.email': 'Поле email должно быть вида email@email.com',
        'string.empty': 'Поле email не должно быть пустым',
      }),
    password: Joi.string().required().trim(true).messages({
      'any.required': 'Поле password должно быть заполнено',
      'string.empty': 'Поле password не должно быть пустым',
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
        'string.email': 'Поле email должно быть вида email@email.com',
        'string.empty': 'Поле email не должно быть пустым',
      }),
    password: Joi
      .string()
      .required()
      .trim(true)
      .custom(validatePassword, 'custom validation')
      .min(2)
      .messages({
        'any.required': 'Поле password должно быть заполнено',
        'string.empty': 'Поле password не должно быть пустым',
        'string.min': 'Минимальная длина поля password - 2',
      }),
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .trim(true)
      .messages({
        'any.required': 'Поле name должно быть заполнено',
        'string.min': 'Минимальная длина поля name - 2',
        'string.max': 'Максимальная длина name - поля 30',
        'string.empty': 'Поле name не должно быть пустым',
      }),
  }),
});

module.exports = {
  validateCreateArticle,
  validateDeleteArticle,
  validateSignin,
  validateSignup,
};
