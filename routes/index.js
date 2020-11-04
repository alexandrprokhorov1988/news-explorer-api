const router = require('express').Router();
const users = require('./users');
const articles = require('./articles');
const signin = require('./signin');
const signup = require('./signup');
const signout = require('./signout');
const auth = require('../middlewares/auth');

router.use('/users', auth, users);
router.use('/articles', auth, articles);
router.use('/signin', signin);
router.use('/signup', signup);
router.use('/signout', signout);

module.exports = router;
