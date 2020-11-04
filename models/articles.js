const mongoose = require('mongoose');
const validator = require('validator');

const articleShema = new mongoose.Schema({
  keyword: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  source: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
    validate: {
      validator: (str) => validator.isURL(str),
      message: (props) => `${props.value} некорректный url`,
    },
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator: (str) => validator.isURL(str),
      message: (props) => `${props.value} некорректный url`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('article', articleShema);
