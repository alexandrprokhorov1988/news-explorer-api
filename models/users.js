const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const { UNAUTORIZED_DATA_ERR, CONFLICT_ERR } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Необходимо заполнить поле email'],
    unique: true,
    validate: {
      validator: (str) => validator.isEmail(str),
      message: (props) => `${props.value} некорректный email`,
    },
  },
  password: {
    type: String,
    require: [true, 'Необходимо заполнить поле password'],
    minlength: [6, 'Минимальная длина поля 6'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Необходимо заполнить поле name'],
    minlength: [2, 'Минимальная длина поля 2'],
    maxLength: [30, 'Максимальная длина поля 30'],
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(UNAUTORIZED_DATA_ERR));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(UNAUTORIZED_DATA_ERR));
          }
          return user;
        });
    });
};

userSchema.statics.registerUser = function (name, email, password) {
  return bcrypt.hash(password, 10)
    .then((hash) => this.create({
      name, email, password: hash,
    })
      .then((user) => user)
      .catch((err) => {
        if (err.name === 'MongoError' || err.code === 11000) {
          throw new ConflictError(CONFLICT_ERR);
        }
      }));
};

module.exports = mongoose.model('user', userSchema);
