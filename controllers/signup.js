const User = require('../models/users');
const BadRequestError = require('../errors/bad-reques-err');
const { BAD_REQUEST_ERR } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  return User.registerUser(name, email, password)
    .then((user) => {
      if (!user) {
        throw new BadRequestError(BAD_REQUEST_ERR);
      }
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};
