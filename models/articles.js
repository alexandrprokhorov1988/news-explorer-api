const mongoose = require('mongoose');
const validator = require('validator');

const articleShema = new mongoose.Schema({
  keyword: {
    type: String,
    require: [true, 'Необходимо заполнить поле keyword'],
  },
  title: {
    type: String,
    require: [true, 'Необходимо заполнить поле title'],
  },
  text: {
    type: String,
    require: [true, 'Необходимо заполнить поле text'],
  },
  date: {
    type: String,
    require: [true, 'Необходимо заполнить поле date'],
  },
  source: {
    type: String,
    require: [true, 'Необходимо заполнить поле source'],
  },
  link: {
    type: String,
    require: [true, 'Необходимо заполнить поле link'],
    validate: {
      validator: (str) => validator.isURL(str),
      message: (props) => `${props.value} некорректный url`,
    },
  },
  image: {
    type: String,
    require: [true, 'Необходимо заполнить поле image'],
    validate: {
      validator: (str) => validator.isURL(str),
      message: (props) => `${props.value} некорректный url`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Необходимо заполнить поле owner'],
    ref: 'user',
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('article', articleShema);
