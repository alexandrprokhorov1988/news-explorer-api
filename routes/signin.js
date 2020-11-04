const router = require('express').Router();
const { signin } = require('../controllers/signin');
const { validateSignin } = require('../middlewares/validations');

router.post('/', validateSignin, signin);

module.exports = router;
