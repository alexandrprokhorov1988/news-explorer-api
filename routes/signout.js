const router = require('express').Router();
const { signOut } = require('../controllers/signout');

router.post('/', signOut);

module.exports = router;
