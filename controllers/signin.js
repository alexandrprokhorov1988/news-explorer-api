const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { KEY } = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorized-err');
const { BAD_REQUEST_ERR, SUCCESS_LOGIN } = require('../utils/constants');

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(BAD_REQUEST_ERR);
      }
      const token = jwt.sign(
        { _id: user._id },
        KEY,
        { expiresIn: '7d' },
      );
      res.cookie('authorization', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: SUCCESS_LOGIN });
    })
    .catch(next);
};
