const User = require('../models/users');
const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND_USER_ERR } = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.user })
    .orFail(() => new NotFoundError(NOT_FOUND_USER_ERR))
    .then((user) => res.send(user))
    .catch(next);
};
