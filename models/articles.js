const mongoose = require('mongoose');
const validator = require('validator');

const articleShema = new mongoose.Schema({
  keyword: {
    type: String,
    require: [true, 'необходимо заполнить поле keyword'],
  },
  title: {
    type: String,
    require: [true, 'необходимо заполнить поле title'],
  },
  text: {
    type: String,
    require: [true, 'необходимо заполнить поле text'],
  },
  date: {
    type: String,
    require: [true, 'необходимо заполнить поле date'],
  },
  source: {
    type: String,
    require: [true, 'необходимо заполнить поле source'],
  },
  link: {
    type: String,
    require: [true, 'необходимо заполнить поле link'],
    validate: {
      validator: (str) => validator.isURL(str),
      message: (props) => `${props.value} некорректный url`,
    },
  },
  image: {
    type: String,
    require: [true, 'необходимо заполнить поле image'],
    validate: {
      validator: (str) => validator.isURL(str),
      message: (props) => `${props.value} некорректный url`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'необходимо заполнить поле owner'],
    ref: 'user',
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('article', articleShema);
