const router = require('express').Router();
const { getUser } = require('../controllers/users');

router.get('/me', getUser);

module.exports = router;
