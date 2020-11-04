const User = require('../models/users');
const NotFoundError = require('../errors/not-found-err');

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.user })
    .orFail(() => new NotFoundError('Нет пользователя с таким id'))
    .then((user) => res.send(user))
    .catch(next);
};
