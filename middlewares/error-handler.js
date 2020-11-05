const { isCelebrateError } = require('celebrate');
const { SERVER_ERR } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = isCelebrateError(err) ? 400 : err.statusCode || 500;
  let type;
  if (isCelebrateError(err)) {
    if (err.details.get('body')) {
      type = 'body';
    } else {
      type = 'params';
    }
  }
  const message = isCelebrateError(err) ? err.details.get(type).details[0].message : err.message;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_ERR
        : message,
    });
  next();
};

module.exports = errorHandler;
