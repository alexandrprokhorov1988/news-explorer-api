module.exports.validateUrl = (value, helpers) => {
  if (!/^(https?:\/\/)?([\d\w.-]+)\.([a-z.]{2,6})(.)*$/.test(value)) {
    return helpers.message('Некорректный url');
  }
  return value;
};

module.exports.validatePassword = (value, helpers) => {
  if (!/^[\d\w/.\S]{2,30}$/.test(value)) {
    return helpers.message('Недопустимые значения');
  }
  return value;
};
