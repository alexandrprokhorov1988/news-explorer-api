const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { isCelebrateError } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { NOT_FOUND_ERR } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-err');
const {
  limiter,
  DB_NAME,
  DB_OPTIONS,
  PORT,
} = require('./utils/config');

const app = express();

mongoose.connect(DB_NAME, DB_OPTIONS);

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(cookieParser());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(() => {
  throw new NotFoundError(NOT_FOUND_ERR);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = isCelebrateError(err) ? 400 : err.statusCode || 500;
  const message = isCelebrateError(err) ? err.details.get('body').details[0].message : err.message;
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
