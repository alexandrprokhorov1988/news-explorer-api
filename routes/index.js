const router = require('express').Router();
const auth = require('../middlewares/auth');
const users = require('./users');
const articles = require('./articles');
const signin = require('./signin');
const signup = require('./signup');

router.use('/users', auth, users);
router.use('/articles', auth, articles);
router.use('/signin', signin);
router.use('/signup', signup);

module.exports = router;
