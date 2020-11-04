const router = require('express').Router();
const { signup } = require('../controllers/signup');
const { validateSignup } = require('../middlewares/validations');

router.post('/', validateSignup, signup);

module.exports = router;
