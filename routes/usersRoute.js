const usersController = require('../controllers/usersController');

const router = require('express').Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);


module.exports = router;