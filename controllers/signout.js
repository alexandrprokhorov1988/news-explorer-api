const { SUCCESS_LOGOUT } = require('../utils/constants');

module.exports.signOut = (req, res) => {
  res.cookie('authorization', 'token', {
    maxAge: 0,
    httpOnly: true,
    sameSite: true,
  }).send({ message: SUCCESS_LOGOUT });
};
