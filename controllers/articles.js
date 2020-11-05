const Articles = require('../models/articles');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-reques-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  BAD_REQUEST_ERR,
  NOT_FOUND_ITEM_ERR,
  NOT_FOUND_USER_ITEMS_ERR,
  BAD_REQUEST_ID_ERR,
  FORBIDDEN_ERR,
} = require('../utils/constants');

module.exports.getArticle = (req, res, next) => {
  Articles.find({ owner: req.user })
    .orFail(() => new NotFoundError(NOT_FOUND_USER_ITEMS_ERR))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Articles.findOneAndUpdate(
    {
      keyword, title, text, date, source, link, image,
    },
    { $addToSet: { owner: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError(NOT_FOUND_ITEM_ERR))
    .then((item) => res.send(item))
    .catch(() => {
      Articles.create({
        keyword, title, text, date, source, link, image, owner,
      })
        .then((article) => res.send(article))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(BAD_REQUEST_ERR));
          } else {
            next(err);
          }
        });
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const owner = req.user._id;

  Articles.findOne({ _id: req.params.articleId })
    .orFail(() => new NotFoundError(NOT_FOUND_ITEM_ERR))
    .then((article) => {
      if (article.owner.indexOf(owner) !== -1 && article.owner.length > 1) {
        Articles.findOneAndUpdate(
          { _id: req.params.articleId, owner },
          { $pull: { owner: req.user._id } },
          { new: true, runValidators: true },
        )
          .orFail(() => new NotFoundError(NOT_FOUND_ITEM_ERR))
          .then((item) => res.send(item))
          .catch(next);
      } else if (article.owner.indexOf(owner) !== -1) {
        Articles.deleteOne({ _id: req.params.articleId, owner })
          .orFail(() => new ForbiddenError(FORBIDDEN_ERR))
          .then((item) => res.send(item))
          .catch(next);
      } else {
        throw new ForbiddenError(FORBIDDEN_ERR);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ID_ERR));
      } else {
        next(err);
      }
    });
};
