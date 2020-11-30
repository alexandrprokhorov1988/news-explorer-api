const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { UNAUTORIZED_ERR } = require('../utils/constants');
const { KEY } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    throw new UnauthorizedError(UNAUTORIZED_ERR);
  }
  let payload;

  try {
    payload = jwt.verify(authorization, KEY);
  } catch (e) {
    throw new UnauthorizedError(UNAUTORIZED_ERR);
  }

  req.user = payload;
  next();
};
