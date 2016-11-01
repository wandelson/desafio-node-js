var express = require('express');

var userController = require('..//controllers/userController');

var router = express.Router();

var auth = require('..//security/auth')

router.get('/users/:id' ,auth.authorize, userController.getById);

router.post('/signin',userController.signin);

router.post('/singup',userController.singup);

module.exports = router;