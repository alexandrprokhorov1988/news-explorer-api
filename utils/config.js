require('dotenv').config();
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const { NODE_ENV, JWT_SECRET, PORT = 3000 } = process.env;
const KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const DB_NAME = 'mongodb://localhost:27017/newsexplorerdb';
const DB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const CORS_OPTIONS = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

module.exports = {
  limiter,
  KEY,
  DB_NAME,
  DB_OPTIONS,
  PORT,
  CORS_OPTIONS,
};
