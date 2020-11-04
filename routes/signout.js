const router = require('express').Router();
const { signout } = require('../controllers/signout');

router.post('/', signout);

module.exports = router;
