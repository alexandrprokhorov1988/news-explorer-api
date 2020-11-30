const router = require('express').Router();
const { getArticle, createArticle, deleteArticle } = require('../controllers/articles');
const { validateCreateArticle, validateDeleteArticle } = require('../middlewares/validations');

router.get('/', getArticle);
router.post('/', validateCreateArticle, createArticle);
router.delete('/:articleId', validateDeleteArticle, deleteArticle);

module.exports = router;
